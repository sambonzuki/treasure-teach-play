import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import Stripe from "stripe";
import { fulfillStripeSession, itemsWithLinks } from "./fulfillment";

function requestOrigin(): string {
  const host = getRequestHeader("origin") ?? getRequestHeader("host");
  const proto = (getRequestHeader("x-forwarded-proto") ?? "https").split(",")[0];
  return host?.startsWith("http") ? host : `${proto}://${host}`;
}

export const getOrderDownloads = createServerFn({ method: "GET" })
  .inputValidator((data: { sessionId: string }) => {
    if (!data?.sessionId || typeof data.sessionId !== "string") {
      throw new Error("Missing session id");
    }
    return data;
  })
  .handler(async ({ data }) => {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");
    const stripe = new Stripe(key);

    const session = await stripe.checkout.sessions.retrieve(data.sessionId, {
      expand: ["line_items", "line_items.data.price.product"],
    });

    if (session.payment_status !== "paid") {
      return {
        paid: false,
        email: null as string | null,
        items: [] as Array<{ title: string; slug: string | null; url: string; qty: number }>,
      };
    }

    const lineItems = (session.line_items?.data ?? []).map((li) => {
      const product = li.price?.product as Stripe.Product | null;
      return {
        title: product?.name ?? li.description ?? "Your printable",
        slug: (product?.metadata?.slug as string | undefined) ?? null,
        qty: li.quantity ?? 1,
      };
    });

    // Bundles expand to one signed link per contained pack; links are
    // order+product specific and capped at MAX_DOWNLOADS uses each.
    const items = itemsWithLinks(requestOrigin(), data.sessionId, lineItems);

    return {
      paid: true,
      email: session.customer_details?.email ?? session.customer_email ?? null,
      items,
    };
  });

/**
 * Trigger fulfillment (thank-you email with the same download links).
 * Idempotent — safe to call on every success-page load.
 */
export const fulfillOrder = createServerFn({ method: "POST" })
  .inputValidator((data: { sessionId: string }) => {
    if (!data?.sessionId || typeof data.sessionId !== "string") {
      throw new Error("Missing session id");
    }
    return data;
  })
  .handler(async ({ data }) => {
    try {
      return await fulfillStripeSession(data.sessionId, requestOrigin());
    } catch (err) {
      // Never break the success page because the email failed
      console.error("[fulfillment] send failed:", err);
      return { sent: false, reason: err instanceof Error ? err.message : "send-failed" };
    }
  });
