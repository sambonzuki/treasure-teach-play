import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Math Adventure Printables" },
      { name: "description", content: "Complete your order to instantly download your pirate maths printables." },
      { property: "og:title", content: "Checkout — Math Adventure Printables" },
      { property: "og:description", content: "Complete your order and get instant PDF downloads." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, count, clear } = useCart();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState<{ order: string; email: string } | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    card: "",
    exp: "",
    cvc: "",
    country: "United Kingdom",
  });

  const discount = count >= 3 ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setProcessing(true);
    setTimeout(() => {
      const order = "MAP-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      setDone({ order, email: form.email });
      clear();
      setProcessing(false);
    }, 1200);
  };

  if (done) {
    return (
      <div className="min-h-dvh bg-warm-white text-navy">
        <SiteNav />
        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16 text-center">
          <div className="mx-auto mb-6 grid size-24 place-items-center rounded-full bg-emerald text-5xl shadow-xl">🎉</div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold">Treasure secured!</h1>
          <p className="mt-3 text-navy/70">
            Order <span className="font-mono font-bold text-navy">{done.order}</span> is on the way to{" "}
            <span className="font-bold text-navy">{done.email}</span>. Check your inbox for instant PDF download links.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/shop" className="rounded-2xl bg-ocean px-6 py-3 font-bold text-white shadow-lg shadow-ocean/30">Keep exploring</Link>
            <Link to="/" className="rounded-2xl border border-navy/10 bg-white px-6 py-3 font-bold text-navy hover:bg-sand-soft">Back home</Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

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
        <p className="mt-2 text-navy/70">Fill in your details — your printables are delivered instantly.</p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            {/* Contact */}
            <div className="rounded-3xl border border-navy/5 bg-white p-6 shadow-sm">
              <h2 className="font-display text-xl font-extrabold text-navy">Contact</h2>
              <p className="text-sm text-navy/60">Where should we send your downloads?</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} />
                <input required type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} />
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-3xl border border-navy/5 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-extrabold text-navy">Payment</h2>
                <span className="text-xs font-bold text-emerald">🔒 Secured</span>
              </div>
              <div className="mt-4 space-y-3">
                <input required placeholder="Card number  •  1234 1234 1234 1234" inputMode="numeric" value={form.card} onChange={(e) => setForm({ ...form, card: e.target.value })} className={input} />
                <div className="grid grid-cols-2 gap-3">
                  <input required placeholder="MM / YY" value={form.exp} onChange={(e) => setForm({ ...form, exp: e.target.value })} className={input} />
                  <input required placeholder="CVC" value={form.cvc} onChange={(e) => setForm({ ...form, cvc: e.target.value })} className={input} />
                </div>
                <select value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className={input}>
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>Ireland</option>
                  <option>Other</option>
                </select>
              </div>
              <p className="mt-3 text-xs text-navy/50">
                Demo checkout — no real card is charged. Wire this up to Lovable Payments to accept real orders.
              </p>
            </div>
          </div>

          {/* Summary */}
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
                <div className="flex justify-between text-emerald"><span>Bundle discount</span><span className="font-bold">−£{discount.toFixed(2)}</span></div>
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
              {processing ? "Processing…" : `Pay £${total.toFixed(2)}`}
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
