import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { getProductBySlug, products } from "@/lib/catalog";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Pack not found" }, { name: "robots", content: "noindex" }] };
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.title} — Math Adventure Printables` },
        { name: "description", content: product.description },
        { property: "og:title", content: product.title },
        { property: "og:description", content: product.description },
        { property: "og:image", content: product.image },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="min-h-dvh grid place-items-center bg-warm-white">
      <div className="text-center px-6">
        <div className="text-6xl mb-4">🧭</div>
        <h1 className="font-display text-3xl">Pack not found</h1>
        <Link to="/shop" className="mt-4 inline-block text-ocean font-bold underline">Back to shop</Link>
      </div>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const price = product.salePrice ?? product.price;
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <div className="min-h-dvh bg-warm-white text-navy">
      <SiteNav />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <nav className="mb-6 text-sm text-navy/60">
          <Link to="/" className="hover:text-ocean">Home</Link> <span className="mx-1">/</span>{" "}
          <Link to="/shop" className="hover:text-ocean">Shop</Link> <span className="mx-1">/</span>{" "}
          <span className="text-navy font-medium">{product.title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Preview gallery */}
          <div>
            <div className="overflow-hidden rounded-3xl bg-sand-soft ring-1 ring-navy/5">
              <img
                src={product.image}
                alt={product.title}
                width={900}
                height={900}
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  className={`aspect-square overflow-hidden rounded-2xl ring-2 ${i === 0 ? "ring-ocean" : "ring-navy/10 hover:ring-navy/30"}`}
                >
                  <img src={product.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-dashed border-navy/15 bg-white p-4 text-center text-sm text-navy/60">
              📖 Click any thumbnail to flip through a preview
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex flex-wrap gap-2">
              {product.badge && (
                <span className="rounded-full bg-emerald px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white">
                  {product.badge}
                </span>
              )}
              <span className="rounded-full bg-sand-soft px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-navy">
                Age {product.age}
              </span>
              <span className="rounded-full bg-sand-soft px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-navy">
                {product.year}
              </span>
              <span className="rounded-full bg-sand-soft px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-navy">
                {product.subject}
              </span>
            </div>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl font-extrabold text-navy leading-tight">
              {product.title}
            </h1>
            <div className="mt-3 flex items-center gap-3 text-sm">
              <span className="text-gold text-lg">★★★★★</span>
              <span className="font-bold">{product.rating.toFixed(1)}</span>
              <span className="text-navy/50">({product.reviews} reviews)</span>
            </div>
            <p className="mt-5 text-lg leading-relaxed text-navy/75">{product.description}</p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-5xl font-extrabold text-navy">£{price.toFixed(2)}</span>
              {product.salePrice && (
                <>
                  <span className="text-xl text-navy/40 line-through">£{product.price.toFixed(2)}</span>
                  <span className="rounded-full bg-coral px-2.5 py-1 text-[10px] font-extrabold uppercase text-white">Save {Math.round((1 - product.salePrice / product.price) * 100)}%</span>
                </>
              )}
            </div>
            <div className="mt-2 text-sm font-bold uppercase tracking-wider text-emerald">
              ⚡ Instant download · PDF
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button className="flex-1 rounded-2xl bg-ocean px-7 py-4 font-display text-lg font-extrabold text-white shadow-xl shadow-ocean/30 transition-transform hover:-translate-y-0.5">
                Add to cart
              </button>
              <button className="flex-1 rounded-2xl bg-gold px-7 py-4 font-display text-lg font-extrabold text-navy shadow-xl shadow-gold/30 transition-transform hover:-translate-y-0.5">
                Buy now
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              {[
                { i: "📄", l: `${product.pages} pages` },
                { i: "🎯", l: product.difficulty },
                { i: "🏫", l: "Curriculum" },
                { i: "♾️", l: "Reusable" },
              ].map((t) => (
                <div key={t.l} className="rounded-2xl border border-navy/5 bg-white p-3">
                  <div className="text-xl">{t.i}</div>
                  <div className="mt-1 font-bold text-navy">{t.l}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-navy/5 bg-white p-6">
              <h3 className="font-display text-xl font-extrabold text-navy">Skills covered</h3>
              <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.skills.map((s: string) => (
                  <li key={s} className="flex items-center gap-2 text-navy/80">
                    <span className="text-emerald">✓</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-3xl border border-navy/5 bg-white p-6">
              <h3 className="font-display text-xl font-extrabold text-navy">What's included</h3>
              <ul className="mt-3 space-y-2 text-navy/80">
                <li>📕 High-resolution printable PDF ({product.pages} pages)</li>
                <li>🔑 Answer key for parents &amp; teachers</li>
                <li>🏅 Printable reward certificate</li>
                <li>📱 Optimised for A4 &amp; US Letter</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Frequently bought together */}
        <section className="mt-20">
          <h2 className="font-display text-3xl font-extrabold text-navy">Frequently bought together</h2>
          <div className="mt-6 rounded-3xl border border-navy/5 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {[product, ...related.slice(0, 2)].map((p, i) => (
                <div key={p.slug} className="flex items-center gap-3">
                  {i > 0 && <span className="font-display text-2xl text-navy/40">+</span>}
                  <img src={p.image} alt={p.title} className="size-20 rounded-xl object-cover ring-1 ring-navy/10" />
                </div>
              ))}
              <div className="ml-auto text-right">
                <div className="text-sm text-navy/60">Bundle price</div>
                <div className="font-display text-3xl font-extrabold text-ocean">
                  £{(price + (related[0].salePrice ?? related[0].price) + (related[1].salePrice ?? related[1].price)).toFixed(2)}
                </div>
                <button className="mt-2 rounded-2xl bg-navy px-5 py-2.5 text-sm font-bold text-white hover:bg-ocean-deep">
                  Add all three
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="mt-20 mb-16">
          <h2 className="font-display text-3xl font-extrabold text-navy">You may also love</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </section>
      </div>

      {/* Sticky add to cart */}
      <div className="sticky bottom-0 z-40 border-t border-navy/10 bg-warm-white/95 backdrop-blur-md px-4 sm:px-6 py-3 shadow-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <img src={product.image} alt="" className="size-12 shrink-0 rounded-xl object-cover" />
            <div className="min-w-0">
              <div className="truncate font-display font-extrabold text-navy">{product.title}</div>
              <div className="font-bold text-ocean">£{price.toFixed(2)}</div>
            </div>
          </div>
          <button className="shrink-0 rounded-2xl bg-coral px-5 sm:px-7 py-3 font-display font-extrabold text-white shadow-lg shadow-coral/30 hover:scale-105 transition-transform">
            Add to cart
          </button>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
