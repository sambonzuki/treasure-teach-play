/**
 * Stripe webhook: POST /api/stripe-webhook
 *
 * Fulfils orders independently of the success page (covers customers who
 * close the browser right after paying). Configure the endpoint in the
 * Stripe dashboard with the `checkout.session.completed` event and set
 * STRIPE_WEBHOOK_SECRET. Idempotent against the success-page trigger via
 * the session's metadata.fulfilled flag.
 */
import { createFileRoute } from "@tanstack/react-router";
import Stripe from "stripe";
import { fulfillStripeSession } from "@/lib/fulfillment";

export const Route = createFileRoute("/api/stripe-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env.STRIPE_SECRET_KEY;
        const secret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!key || !secret) {
          console.error("[webhook] STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET not configured");
          return new Response("not configured", { status: 500 });
        }
        const signature = request.headers.get("stripe-signature");
        if (!signature) return new Response("missing signature", { status: 400 });

        let event: Stripe.Event;
        try {
          const body = await request.text();
          event = new Stripe(key).webhooks.constructEvent(body, signature, secret);
        } catch (err) {
          console.error("[webhook] signature verification failed:", err);
          return new Response("invalid signature", { status: 400 });
        }

        if (event.type === "checkout.session.completed") {
          const session = event.data.object as Stripe.Checkout.Session;
          const host = request.headers.get("origin") ?? request.headers.get("host") ?? "";
          const proto = (request.headers.get("x-forwarded-proto") ?? "https").split(",")[0];
          const origin = host.startsWith("http") ? host : `${proto}://${host}`;
          try {
            const result = await fulfillStripeSession(session.id, origin);
            console.log(`[webhook] fulfill ${session.id}:`, result);
          } catch (err) {
            console.error(`[webhook] fulfillment failed for ${session.id}:`, err);
            return new Response("fulfillment failed", { status: 500 });
          }
        }
        return new Response("ok");
      },
    },
  },
});
