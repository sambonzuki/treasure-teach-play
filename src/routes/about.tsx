import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import heroImg from "@/assets/hero-island.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Math Adventure Printables — Teacher-created maths resources" },
      { name: "description", content: "Teacher-created, curriculum-aligned printable maths for children aged 5–10. Original artwork, instant downloads, commercial-quality design." },
      { property: "og:title", content: "About Math Adventure Printables" },
      { property: "og:description", content: "Teacher-created, curriculum-aligned printable maths for children aged 5–10." },
    ],
  }),
  component: AboutPage,
});

const pillars = [
  { icon: "👩‍🏫", title: "Teacher-created", body: "Every pack is designed and reviewed by qualified primary teachers before it reaches your child." },
  { icon: "📚", title: "Curriculum aligned", body: "Mapped to the UK National Curriculum for KS1 & KS2 — with US and international equivalents noted." },
  { icon: "🎨", title: "Original artwork", body: "No stock cliparts. Every illustration is hand-drawn by our in-house design crew." },
  { icon: "⚡", title: "Instant downloads", body: "PDF delivered the moment you check out. No shipping fees, no delays." },
  { icon: "💎", title: "Premium quality", body: "Print-shop-ready files, tested on home and school printers so what you see is what you get." },
  { icon: "🌱", title: "Made to grow with you", body: "New collections monthly — pirate, space, dinosaurs, jungle, magic and more." },
];

function AboutPage() {
  return (
    <div className="min-h-dvh bg-warm-white text-navy">
      <SiteNav />

      <header className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 items-center">
          <div>
            <span className="inline-block rounded-full bg-ocean/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-ocean">
              Our story
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-6xl font-extrabold leading-tight">
              Learning is better when it feels like an <span className="text-ocean">adventure</span>.
            </h1>
            <p className="mt-5 text-lg text-navy/70">
              Math Adventure Printables started at a kitchen table, when a Year 3 teacher and a designer decided their kids deserved better than the fifteenth photocopied worksheet of the week. Today, our packs reach classrooms and homeschools across the world.
            </p>
            <Link to="/shop" className="mt-6 inline-block rounded-2xl bg-ocean px-7 py-4 font-display text-lg font-extrabold text-white shadow-lg shadow-ocean/25 hover:-translate-y-0.5 transition-transform">
              Explore our shop
            </Link>
          </div>
          <div className="relative">
            <img src={heroImg} alt="" className="animate-rock aspect-square w-full rounded-[36px] object-cover shadow-2xl ring-1 ring-navy/5" />
          </div>
        </div>
      </header>

      <section className="px-4 sm:px-6 py-16 sm:py-20 bg-sand-soft/50">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold">What makes us different</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-3xl bg-white p-7 shadow-sm border border-navy/5 card-lift">
                <div className="grid size-12 place-items-center rounded-2xl bg-sand-soft text-2xl mb-4">{p.icon}</div>
                <h3 className="font-display text-xl font-extrabold">{p.title}</h3>
                <p className="mt-2 text-navy/70">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold">Made for the whole crew</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { i: "🏠", t: "Parents", d: "After-school practice that doesn't feel like homework." },
              { i: "🏫", t: "Teachers", d: "Ready-to-print resources that save you hours of prep." },
              { i: "📖", t: "Homeschoolers", d: "A full curriculum thread wrapped in story." },
            ].map((t) => (
              <div key={t.t} className="rounded-3xl border-2 border-sand p-6">
                <div className="text-4xl">{t.i}</div>
                <div className="mt-3 font-display text-xl font-extrabold">{t.t}</div>
                <p className="mt-2 text-navy/70 text-sm">{t.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
