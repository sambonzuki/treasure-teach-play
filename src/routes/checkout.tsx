import { createFileRoute, Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { useCart } from "@/lib/cart";
import { cartTotals } from "@/lib/pricing";
import { createStripeCheckout } from "@/lib/checkout.functions";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Edventure Printables" },
      { name: "description", content: "Complete your order to instantly download your maths Edventure printables." },
      { property: "og:title", content: "Checkout — Edventure Printables" },
      { property: "og:description", content: "Complete your order and get instant PDF downloads." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, count } = useCart();
  const navigate = useNavigate();
  const pathname = useLocation({ select: (l) => l.pathname });
  const startCheckout = useServerFn(createStripeCheckout);
  const [processing, setProcessing] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  // /checkout is the parent of /checkout/success — render the child route
  // (order confirmation) instead of the checkout form when nested.
  if (pathname !== "/checkout") {
    return <Outlet />;
  }

  const { discount, total } = cartTotals(items, count);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setProcessing(true);
    setError(null);
    try {
      const res = await startCheckout({
        data: {
          email: email || undefined,
          items: items.map((i) => ({
            slug: i.slug,
            title: i.title,
            price: i.price,
            qty: i.qty,
          })),
        },
      });
      if (res?.url) {
        window.location.href = res.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-dvh bg-warm-white text-navy">
        <SiteNav />
        <div className="mx-auto max-w-xl px-4 sm:px-6 py-16 text-center">
          <div className="text-6xl mb-4">🏴‍☠️</div>
          <h1 className="font-display text-3xl font-extrabold">No treasure to check out</h1>
          <p className="mt-2 text-navy/70">Your cart is empty.</p>
          <button onClick={() => navigate({ to: "/shop" })} className="mt-6 rounded-2xl bg-ocean px-6 py-3 font-bold text-white shadow-lg">
            Browse the shop
          </button>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const input = "w-full rounded-xl border border-navy/15 bg-white px-4 py-3 font-medium text-navy placeholder:text-navy/40 focus:border-ocean focus:outline-none focus:ring-2 focus:ring-ocean/20";

  return (
    <div className="min-h-dvh bg-warm-white text-navy">
      <SiteNav />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold">Checkout</h1>
        <p className="mt-2 text-navy/70">You'll be redirected to Stripe's secure checkout to complete payment.</p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-navy/5 bg-white p-6 shadow-sm">
              <h2 className="font-display text-xl font-extrabold text-navy">Contact</h2>
              <p className="text-sm text-navy/60">Where should we send your downloads? (optional — you can also add it on Stripe)</p>
              <div className="mt-4">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={input}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-navy/5 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-extrabold text-navy">Payment</h2>
                <span className="text-xs font-bold text-emerald">🔒 Secured by Stripe</span>
              </div>
              <p className="mt-3 text-sm text-navy/70">
                Click <strong>Pay</strong> to be taken to Stripe's hosted checkout. Cards, Apple Pay,
                Google Pay and Link are all supported.
              </p>
              {error && (
                <div className="mt-4 rounded-xl border border-coral/30 bg-coral/5 px-4 py-3 text-sm font-medium text-coral">
                  {error}
                </div>
              )}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 h-fit rounded-3xl border border-navy/5 bg-white p-6 shadow-lg">
            <h2 className="font-display text-xl font-extrabold text-navy">Order ({count})</h2>
            <div className="mt-4 space-y-3 max-h-64 overflow-auto pr-1">
              {items.map((i) => (
                <div key={i.slug} className="flex items-center gap-3">
                  <img src={i.image} alt="" className="size-12 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-bold text-navy">{i.title}</div>
                    <div className="text-xs text-navy/60">Qty {i.qty}</div>
                  </div>
                  <div className="text-sm font-bold text-navy">£{(i.price * i.qty).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 border-t border-navy/10 pt-4 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span className="font-bold">£{subtotal.toFixed(2)}</span></div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald"><span>Bundle discount (10%)</span><span className="font-bold">−£{discount.toFixed(2)}</span></div>
              )}
              <div className="flex justify-between"><span>Delivery</span><span className="font-bold text-emerald">FREE</span></div>
            </div>
            <div className="mt-4 flex items-baseline justify-between border-t border-navy/10 pt-4">
              <span className="font-display text-lg font-extrabold">Total</span>
              <span className="font-display text-3xl font-extrabold text-navy">£{total.toFixed(2)}</span>
            </div>
            <button
              type="submit"
              disabled={processing}
              className="mt-5 flex w-full items-center justify-center rounded-2xl bg-coral px-6 py-4 font-display text-lg font-extrabold text-white shadow-xl shadow-coral/30 transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {processing ? "Redirecting to Stripe…" : `Pay £${total.toFixed(2)}`}
            </button>
            <Link to="/cart" className="mt-3 flex w-full items-center justify-center text-sm font-bold text-navy/70 hover:text-ocean">
              ← Back to cart
            </Link>
          </aside>
        </form>
      </div>
      <SiteFooter />
    </div>
  );
}
