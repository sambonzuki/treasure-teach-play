import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { bundles } from "@/lib/catalog";

export const Route = createFileRoute("/bundles")({
  head: () => ({
    meta: [
      { title: "Bundles — Save up to 45% | Math Adventure Printables" },
      { name: "description", content: "Save up to 45% with curated pirate maths bundles. Year 3, Year 4, times tables, addition and complete-collection packs." },
      { property: "og:title", content: "Bundles — Save up to 45%" },
      { property: "og:description", content: "Curated pirate maths bundles for parents, teachers and homeschoolers." },
    ],
  }),
  component: BundlesPage,
});

function BundlesPage() {
  return (
    <div className="min-h-dvh bg-warm-white text-navy">
      <SiteNav />

      <header className="relative overflow-hidden border-b border-navy/5 bg-gradient-to-br from-ocean to-navy px-4 sm:px-6 py-16 sm:py-24 text-white">
        <div className="absolute -top-20 -right-20 size-72 rounded-full bg-gold/30 blur-3xl" />
        <div className="mx-auto max-w-4xl text-center relative">
          <span className="inline-block rounded-full bg-gold px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-navy">
            🏴‍☠️ Bigger bundles, bigger savings
          </span>
          <h1 className="mt-5 font-display text-4xl sm:text-6xl font-extrabold leading-tight">
            Save up to <span className="text-gold">45%</span> with our bundles
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-white/80">
            Hand-curated collections that cover a full year, a whole topic, or every core skill in one download.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-6 sm:gap-8 md:grid-cols-2">
        {bundles.map((b) => (
          <div key={b.slug} className="group overflow-hidden rounded-3xl bg-white shadow-xl shadow-navy/5 ring-1 ring-navy/5 card-lift">
            <div className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${b.color}`}>
              <img
                src={b.image}
                alt={b.title}
                loading="lazy"
                className="h-full w-full object-cover opacity-90 mix-blend-luminosity transition-transform group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="rounded-full bg-gold px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-navy shadow-lg">
                  Save {b.saving}
                </span>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="text-xs font-bold uppercase tracking-widest text-ocean">{b.pages}+ pages</div>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-navy">{b.title}</h2>
              <p className="mt-2 text-navy/70">{b.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {b.includes.map((s) => (
                  <span key={s} className="rounded-full bg-sand-soft px-2.5 py-1 text-xs font-bold text-navy">{s}</span>
                ))}
              </div>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl font-extrabold text-navy">£{b.price}</span>
                    <span className="text-navy/40 line-through">£{b.original}</span>
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald mt-1">
                    ⚡ Instant download
                  </div>
                </div>
                <button className="rounded-2xl bg-ocean px-5 py-3 font-display font-extrabold text-white shadow-lg shadow-ocean/25 hover:-translate-y-0.5 transition-transform">
                  Grab bundle
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="px-4 sm:px-6 py-16 sm:py-20 bg-sand-soft/50">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold">Building your own bundle?</h2>
          <p className="mt-3 text-lg text-navy/70">Mix &amp; match any packs — the more you add, the more you save.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { t: "Buy 2", d: "15% off" },
              { t: "Buy 3", d: "25% off" },
              { t: "Buy 5", d: "40% off" },
            ].map((t) => (
              <div key={t.t} className="rounded-3xl bg-white p-6 shadow-sm border border-navy/5">
                <div className="text-xs font-bold uppercase tracking-widest text-ocean">{t.t}</div>
                <div className="mt-1 font-display text-4xl font-extrabold text-navy">{t.d}</div>
              </div>
            ))}
          </div>
          <Link to="/shop" className="mt-8 inline-block rounded-2xl bg-navy px-7 py-4 font-display text-lg font-extrabold text-white hover:bg-ocean-deep">
            Start shopping
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
