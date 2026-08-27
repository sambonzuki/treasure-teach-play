import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-edventures.jpg";
import freebieImg from "@/assets/freebie-pack.jpg";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { products, bundles } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Edventure Printables — Learning Through Edventure" },
      { name: "description", content: "Turn maths practice into an Edventure. Premium printable maths activities children aged 5–10 actually love." },
      { property: "og:title", content: "Edventure Printables — Learning Through Edventure" },
      { property: "og:description", content: "Turn maths practice into an Edventure. Premium printable maths activities children aged 5–10 actually love." },
    ],
  }),
  component: Home,
});

const benefits = [
  { icon: "🎯", title: "Curriculum aligned", body: "Mapped to the UK primary maths curriculum, Year 1 through Year 6." },
  { icon: "🎨", title: "Fun activities", body: "Story-led quests, colour-by-answer and puzzles kids actually finish." },
  { icon: "⚡", title: "No prep", body: "Print, hand over, done. We save you hours every week." },
  { icon: "📥", title: "Instant download", body: "Delivered to your inbox in seconds. No shipping, no waiting." },
  { icon: "♾️", title: "Reusable forever", body: "Laminate a copy or reprint for every child in your class." },
  { icon: "💪", title: "Builds confidence", body: "Small wins, big rewards. Every quest ends with a badge." },
];

const offers = [
  { emoji: "🪙", tier: "Buy 2", save: "15% off", body: "Add any 2 packs — discount at checkout." },
  { emoji: "💰", tier: "Buy 3", save: "25% off", body: "Three quests for the price of two-and-a-bit." },
  { emoji: "🏴‍☠️", tier: "Buy 5", save: "40% off", body: "Kit out the whole term with maximum savings." },
];

const reviews = [
  {
    name: "Sarah M.",
    role: "Parent of two",
    text: "My 7-year-old asks to do these instead of the tablet. That's the whole review.",
  },
  {
    name: "Mr. Patel",
    role: "Year 3 Teacher",
    text: "Beautifully designed and genuinely on-curriculum. Cover work sorted for the whole half-term.",
  },
  {
    name: "Jenna R.",
    role: "Homeschool mum",
    text: "The pirate theme carries our whole maths block. Worth every penny — and then some.",
  },
];

const faqs = [
  { q: "How does the instant download work?", a: "You receive a PDF via email within seconds of purchase. Print at home, at school or via any print shop." },
  { q: "Which curriculum are the packs aligned to?", a: "All packs follow the UK National Curriculum for primary maths (KS1 & KS2) and are equally usable in US and international classrooms." },
  { q: "Can I use these in my classroom?", a: "Yes — the standard licence covers one classroom or one household. School-wide licences are available on request." },
  { q: "What if my child isn't enjoying it?", a: "We offer a 30-day happiness guarantee. Not a fit? Email us and we'll refund your order." },
];

export default function Home() {
  return (
    <div className="min-h-dvh bg-warm-white font-body text-navy">
      <SiteNav />

      {/* Hero */}
      <header className="relative overflow-hidden px-4 sm:px-6 pt-10 sm:pt-16 pb-20 sm:pb-24">
        <div className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="pointer-events-none absolute top-40 right-0 size-72 rounded-full bg-coral/20 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-12 items-center relative">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald">
              <span>⭐</span> Teacher-created &amp; curriculum aligned
            </span>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-navy text-balance">
              Turn maths practice into an <span className="text-ocean">Edventure</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg sm:text-xl leading-relaxed text-navy/70">
              Themed printable maths activities — pirates, space, unicorns and more Edventures on the way — designed by teachers, loved by children aged 5–10.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <Link
                to="/shop"
                className="rounded-2xl bg-ocean px-7 sm:px-9 py-4 sm:py-5 font-display text-lg sm:text-xl font-extrabold text-white shadow-xl shadow-ocean/30 transition-all hover:-translate-y-1"
              >
                Shop Now
              </Link>
              <Link
                to="/bundles"
                className="rounded-2xl border-2 border-navy bg-white px-7 sm:px-9 py-4 sm:py-5 font-display text-lg sm:text-xl font-extrabold text-navy transition-all hover:bg-sand-soft"
              >
                See Bundles
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-navy/60">
              <div className="flex items-center gap-1.5">
                <span className="text-gold text-lg">★★★★★</span>
                <span className="font-bold">4.9/5</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[36px] bg-sand-soft shadow-2xl shadow-navy/10 ring-1 ring-navy/5">
              <img
                src={heroImg}
                alt="Illustrated pirate ship sailing towards a treasure island with floating gold coins"
                width={1400}
                height={1400}
                className="animate-rock aspect-square w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 sm:-left-8 animate-float grid size-16 sm:size-20 place-items-center rounded-full bg-gold text-2xl sm:text-3xl shadow-xl ring-4 ring-warm-white">
              🪙
            </div>
            <div className="absolute -top-4 -right-4 animate-spin-slow grid size-16 sm:size-20 place-items-center rounded-full bg-white text-2xl sm:text-3xl shadow-xl ring-4 ring-warm-white">
              🧭
            </div>
          </div>
        </div>
      </header>

      {/* Trust bar */}
      <section className="bg-navy px-4 sm:px-6 py-6 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-around gap-4 sm:gap-6 text-xs sm:text-sm font-bold uppercase tracking-widest text-white/80">
          <span className="flex items-center gap-2"><span className="text-gold">✓</span> Curriculum aligned</span>
          <span className="flex items-center gap-2"><span className="text-gold">✓</span> Instant download</span>
          <span className="flex items-center gap-2"><span className="text-gold">✓</span> Print &amp; reuse</span>
          <span className="flex items-center gap-2"><span className="text-gold">✓</span> Teacher approved</span>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 sm:px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy">Why parents love our resources</h2>
            <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gold" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-3xl border border-navy/5 bg-white p-7 shadow-sm card-lift">
                <div className="mb-4 grid size-12 place-items-center rounded-2xl bg-sand-soft text-2xl">{b.icon}</div>
                <h3 className="font-display text-xl font-extrabold text-navy">{b.title}</h3>
                <p className="mt-2 text-navy/70 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-sand-soft/50 px-4 sm:px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy">Featured Edventures</h2>
              <p className="mt-2 text-navy/60">Our best-selling printable packs, ready for instant download.</p>
            </div>
            <Link to="/shop" className="font-bold text-ocean underline decoration-2 underline-offset-4 hover:text-navy">
              View all resources →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Bundle feature */}
      <section className="px-4 sm:px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-gradient-to-br from-ocean to-navy shadow-2xl shadow-ocean/20">
          <div className="grid lg:grid-cols-2 items-center">
            <div className="p-8 sm:p-12 lg:p-16 text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-navy">
                🏴‍☠️ Save {bundles[0].saving}
              </span>
              <h2 className="mt-6 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                {bundles[0].title}
              </h2>
              <p className="mt-4 max-w-lg text-white/80 text-lg">
                224 pages of pirate adventure — every Treasure Island quest from the Year 3–4 mystery to the Year 6 summit climb.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {bundles[0].includes.map((s) => (
                  <span key={s} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white ring-1 ring-white/20">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-4xl sm:text-5xl font-extrabold text-gold">£{bundles[0].price}</span>
                  <span className="text-white/50 line-through text-lg">£{bundles[0].original.toFixed(2)}</span>
                </div>
                <Link
                  to="/bundles"
                  className="rounded-2xl bg-gold px-7 py-4 font-display text-lg font-extrabold text-navy transition-transform hover:scale-105"
                >
                  Grab the bundle
                </Link>
              </div>
            </div>
            <div className="relative min-h-[300px] lg:min-h-full">
              <img
                src={bundles[0].image}
                alt="Treasure Island complete collection"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Offers */}
      <section className="px-4 sm:px-6 py-20 sm:py-24 bg-sand-soft/50">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-coral/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-coral">
              🎉 Limited time
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-navy">The more you explore, the more you save</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {offers.map((o, i) => (
              <div
                key={o.tier}
                className={`relative overflow-hidden rounded-3xl p-8 shadow-xl card-lift ${
                  i === 1 ? "bg-navy text-white" : "bg-white text-navy"
                }`}
              >
                <div className="mb-4 text-4xl">{o.emoji}</div>
                <div className={`text-sm font-bold uppercase tracking-widest ${i === 1 ? "text-gold" : "text-ocean"}`}>
                  {o.tier}
                </div>
                <div className="mt-2 font-display text-4xl font-extrabold">{o.save}</div>
                <p className={`mt-3 ${i === 1 ? "text-white/70" : "text-navy/70"}`}>{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      




      {/* FAQ */}
      <section className="px-4 sm:px-6 py-20 sm:py-24 bg-sand-soft/50">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy">Frequently asked</h2>
            <p className="mt-2 text-navy/60">Quick answers before you set sail.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-navy/5 bg-white p-5 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-extrabold text-navy">
                  {f.q}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sand-soft text-ocean transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-navy/70 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/faq" className="font-bold text-ocean underline decoration-2 underline-offset-4">
              See all FAQs →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
