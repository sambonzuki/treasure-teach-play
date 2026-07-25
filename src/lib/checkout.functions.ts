import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import Stripe from "stripe";

type LineItem = {
  slug: string;
  title: string;
  image?: string;
  price: number; // GBP
  qty: number;
};

export const createStripeCheckout = createServerFn({ method: "POST" })
  .inputValidator((data: { items: LineItem[]; email?: string }) => {
    if (!data || !Array.isArray(data.items) || data.items.length === 0) {
      throw new Error("Cart is empty");
    }
    for (const i of data.items) {
      if (typeof i.price !== "number" || i.price <= 0) throw new Error("Invalid price");
      if (typeof i.qty !== "number" || i.qty <= 0) throw new Error("Invalid qty");
      if (typeof i.title !== "string" || !i.title) throw new Error("Invalid title");
    }
    return data;
  })
  .handler(async ({ data }) => {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");
    const stripe = new Stripe(key);

    const host = getRequestHeader("origin") ?? getRequestHeader("host");
    const proto = (getRequestHeader("x-forwarded-proto") ?? "https").split(",")[0];
    const origin = host?.startsWith("http") ? host : `${proto}://${host}`;

    // Auto discount: 10% off when 3+ items in cart (matches UI)
    const totalQty = data.items.reduce((a, i) => a + i.qty, 0);
    const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = [];
    if (totalQty >= 3) {
      const coupon = await stripe.coupons.create({
        percent_off: 10,
        duration: "once",
        name: "Bundle discount (3+ items)",
      });
      discounts.push({ coupon: coupon.id });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: data.items.map((i) => ({
        quantity: i.qty,
        price_data: {
          currency: "gbp",
          unit_amount: Math.round(i.price * 100),
          product_data: {
            name: i.title,
            images: i.image && i.image.startsWith("http") ? [i.image] : undefined,
            metadata: { slug: i.slug },
          },
        },
      })),
      discounts: discounts.length ? discounts : undefined,
      customer_email: data.email || undefined,
      allow_promotion_codes: discounts.length === 0,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
    });

    return { url: session.url };
  });
