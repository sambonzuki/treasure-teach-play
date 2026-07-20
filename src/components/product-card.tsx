import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/catalog";

const badgeColor: Record<NonNullable<Product["badge"]>, string> = {
  "Best Seller": "bg-emerald text-white",
  "New": "bg-coral text-white",
  "Sale": "bg-gold text-navy",
  "Bundle": "bg-gold text-navy",
  "Teacher Favourite": "bg-navy text-white",
};

export function ProductCard({ product }: { product: Product }) {
  const price = product.salePrice ?? product.price;
  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white p-3 shadow-[0_4px_20px_-8px_rgba(26,46,68,0.15)] card-lift"
    >
      <div className="relative mb-4 overflow-hidden rounded-2xl bg-sand-soft">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          width={900}
          height={900}
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.badge && (
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${badgeColor[product.badge]}`}>
              {product.badge}
            </span>
          )}
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-navy">
            {product.year}
          </span>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col px-2 pb-2">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-ocean">
          {product.subject} · Age {product.age}
        </div>
        <h3 className="mb-2 font-display text-lg sm:text-xl font-extrabold leading-tight text-navy group-hover:text-ocean">
          {product.title}
        </h3>
        <div className="mb-4 flex items-center gap-2 text-xs text-navy/60 font-medium">
          <span>📄 {product.pages} pages</span>
          <span>·</span>
          <span>⭐ {product.rating.toFixed(1)} ({product.reviews})</span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-extrabold text-navy">£{price.toFixed(2)}</span>
              {product.salePrice && (
                <span className="text-sm text-navy/40 line-through">£{product.price.toFixed(2)}</span>
              )}
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald">
              Instant download
            </span>
          </div>
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-navy text-white transition-all group-hover:bg-ocean group-hover:scale-110">
            <span aria-hidden>🛒</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
