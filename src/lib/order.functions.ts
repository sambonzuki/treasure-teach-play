import { createServerFn } from "@tanstack/react-start";
import Stripe from "stripe";
import { getDownloadLink } from "./downloads";

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
      return { paid: false, email: null as string | null, items: [] as Array<{ title: string; slug: string | null; url: string; qty: number }> };
    }

    const items = (session.line_items?.data ?? []).map((li) => {
      const product = li.price?.product as Stripe.Product | null;
      const slug = (product?.metadata?.slug as string | undefined) ?? null;
      return {
        title: product?.name ?? li.description ?? "Your printable",
        slug,
        url: getDownloadLink(slug),
        qty: li.quantity ?? 1,
      };
    });

    return {
      paid: true,
      email: session.customer_details?.email ?? session.customer_email ?? null,
      items,
    };
  });
