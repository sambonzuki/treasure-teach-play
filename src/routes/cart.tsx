import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { useCart, bundleToCartItem, productToCartItem } from "@/lib/cart";
import { bundles, products } from "@/lib/catalog";
import { cartTotals } from "@/lib/pricing";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Edventure Printables" },
      { name: "description", content: "Review your printable pirate maths packs and complete your order in seconds." },
      { property: "og:title", content: "Your Cart — Edventure Printables" },
      { property: "og:description", content: "Review your printable pirate maths packs and check out." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal, add, count } = useCart();

  // Suggest a bundle: the biggest saving one they don't already have
  const cartSlugs = new Set(items.map((i) => i.slug));
  const suggestedBundles = bundles.filter((b) => !cartSlugs.has(b.slug)).slice(0, 2);
  const suggestedProducts = products.filter((p) => !cartSlugs.has(p.slug)).slice(0, 3);

  // Volume discount: 3+ items = 10% off (per-unit rounding matches Stripe)
  const { discount, total } = cartTotals(items, count);

  return (
    <div className="min-h-dvh bg-warm-white text-navy">
      <SiteNav />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold">Your treasure chest</h1>
        <p className="mt-2 text-navy/70">{count === 0 ? "Your chest is empty — set sail and grab a pack." : `${count} item${count > 1 ? "s" : ""} ready for an Edventure.`}</p>

        {items.length === 0 ? (
          <div className="mt-10 rounded-3xl border-2 border-dashed border-navy/15 bg-white p-12 text-center">
            <div className="text-6xl mb-4">🏴‍☠️</div>
            <p className="font-display text-2xl font-extrabold">Nothing in the chest yet</p>
            <Link to="/shop" className="mt-6 inline-flex rounded-2xl bg-ocean px-6 py-3 font-bold text-white shadow-lg shadow-ocean/30">
              Browse the shop
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* Line items */}
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.slug} className="flex gap-4 rounded-2xl border border-navy/5 bg-white p-4 shadow-sm">
                  <img src={item.image} alt={item.title} className="size-24 shrink-0 rounded-xl object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-ocean">
                          {item.kind === "bundle" ? "Bundle" : "Printable pack"}
                        </div>
                        <div className="font-display font-extrabold text-navy leading-tight">{item.title}</div>
                      </div>
                      <button onClick={() => remove(item.slug)} className="text-xs font-bold text-navy/50 hover:text-coral" aria-label={`Remove ${item.title}`}>
                        Remove
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="inline-flex items-center rounded-full border border-navy/10 bg-sand-soft">
                        <button onClick={() => setQty(item.slug, item.qty - 1)} className="grid size-8 place-items-center font-bold text-navy hover:text-ocean" aria-label="Decrease">−</button>
                        <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
                        <button onClick={() => setQty(item.slug, item.qty + 1)} className="grid size-8 place-items-center font-bold text-navy hover:text-ocean" aria-label="Increase">+</button>
                      </div>
                      <div className="font-display text-xl font-extrabold text-navy">£{(item.price * item.qty).toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Bundle upsell inside cart */}
              {suggestedBundles.length > 0 && (
                <div className="rounded-3xl border-2 border-dashed border-gold bg-gold/10 p-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">💰</span>
                    <h2 className="font-display text-xl font-extrabold text-navy">Add a bundle & save big</h2>
                  </div>
                  <p className="mt-1 text-sm text-navy/70">Buy a themed collection for a fraction of the price.</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {suggestedBundles.map((b) => (
                      <div key={b.slug} className="flex items-center gap-3 rounded-2xl bg-white p-3">
                        <img src={b.image} alt={b.title} className="size-16 shrink-0 rounded-xl object-cover" />
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-display font-extrabold text-navy">{b.title}</div>
                          <div className="text-xs">
                            <span className="font-bold text-ocean">£{b.price.toFixed(2)}</span>{" "}
                            <span className="text-navy/40 line-through">£{b.original.toFixed(2)}</span>{" "}
                            <span className="font-bold text-emerald">Save {b.saving}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => { const it = bundleToCartItem(b.slug); if (it) add(it); }}
                          className="shrink-0 rounded-full bg-navy px-3 py-1.5 text-xs font-bold text-white hover:bg-ocean-deep"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {suggestedProducts.length > 0 && (
                <div className="rounded-3xl border border-navy/5 bg-white p-5">
                  <h2 className="font-display text-xl font-extrabold text-navy">Complete the set</h2>
                  <p className="text-sm text-navy/60">Explorers who bought these also love:</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {suggestedProducts.map((p) => (
                      <div key={p.slug} className="rounded-2xl border border-navy/5 p-3">
                        <img src={p.image} alt={p.title} className="aspect-square w-full rounded-xl object-cover" />
                        <div className="mt-2 text-sm font-bold text-navy leading-tight">{p.title}</div>
                        <div className="mt-1 text-xs text-ocean font-bold">£{(p.salePrice ?? p.price).toFixed(2)}</div>
                        <button
                          onClick={() => { const it = productToCartItem(p.slug); if (it) add(it); }}
                          className="mt-2 w-full rounded-xl bg-sand-soft px-3 py-2 text-xs font-bold text-navy hover:bg-gold hover:text-navy"
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Summary */}
            <aside className="lg:sticky lg:top-24 h-fit rounded-3xl border border-navy/5 bg-white p-6 shadow-lg">
              <h2 className="font-display text-2xl font-extrabold text-navy">Order summary</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span className="font-bold">£{subtotal.toFixed(2)}</span></div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald">
                    <span>3+ item discount (10%)</span><span className="font-bold">−£{discount.toFixed(2)}</span>
                  </div>
                )}
                {discount === 0 && count > 0 && (
                  <div className="rounded-xl bg-gold/20 p-2 text-xs font-bold text-navy">
                    ✨ Add {3 - count} more item{3 - count > 1 ? "s" : ""} to unlock 10% off
                  </div>
                )}
                <div className="flex justify-between"><span>Delivery</span><span className="font-bold text-emerald">FREE · instant</span></div>
              </div>
              <div className="mt-4 flex items-baseline justify-between border-t border-navy/10 pt-4">
                <span className="font-display text-lg font-extrabold">Total</span>
                <span className="font-display text-3xl font-extrabold text-navy">£{total.toFixed(2)}</span>
              </div>
              <Link
                to="/checkout"
                className="mt-5 flex w-full items-center justify-center rounded-2xl bg-coral px-6 py-4 font-display text-lg font-extrabold text-white shadow-xl shadow-coral/30 transition-transform hover:-translate-y-0.5"
              >
                Checkout →
              </Link>
              <Link to="/shop" className="mt-3 flex w-full items-center justify-center rounded-2xl border border-navy/10 px-6 py-3 text-sm font-bold text-navy hover:bg-sand-soft">
                Continue shopping
              </Link>
              <div className="mt-4 text-center text-xs text-navy/50">🔒 Secure checkout · Instant PDF delivery</div>
            </aside>
          </div>
        )}
      </div>

      <SiteFooter />
    </div>
  );
}
