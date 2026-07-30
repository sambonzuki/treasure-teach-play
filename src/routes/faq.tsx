import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Edventure Printables" },
      { name: "description", content: "Answers on printing, licence, refunds, instant downloads, compatibility, homeschool and teacher use." },
      { property: "og:title", content: "Edventure Printables — FAQ" },
      { property: "og:description", content: "Printing, licence, refunds, instant downloads, compatibility and more." },
    ],
  }),
  component: FaqPage,
});

const groups = [
  {
    title: "Printing",
    items: [
      { q: "What paper size are the printables?", a: "Every pack is optimised for both A4 and US Letter — the same file works in the UK, US, EU and beyond." },
      { q: "Do I need a colour printer?", a: "Colour looks best, but every pack is designed to remain legible and beautiful in black-and-white too." },
      { q: "Can I use a print shop?", a: "Absolutely. The PDFs are high-resolution and print-shop ready." },
    ],
  },
  {
    title: "Licence",
    items: [
      { q: "Can I use these in my classroom?", a: "Yes — the standard licence covers one classroom or one household. Contact us for a school-wide site licence." },
      { q: "Can I share the files with a colleague?", a: "Please don't share the files directly — send them our way and we'll happily set them up with their own licence." },
      { q: "Can I resell my printouts?", a: "The licence is for personal or classroom use only, not resale." },
    ],
  },
  {
    title: "Refunds",
    items: [
      { q: "What's your refund policy?", a: "We offer a 30-day happiness guarantee. If a pack isn't a fit for your family or class, email us for a full refund." },
    ],
  },
  {
    title: "Instant downloads",
    items: [
      { q: "How do I get my pack?", a: "You'll receive a download link via email within seconds of purchase. It never expires." },
      { q: "I didn't get my email — help!", a: "Check your spam folder for a message from hello@edventureprintables.shop. Still nothing? Message us and we'll resend it manually." },
    ],
  },
  {
    title: "Compatibility",
    items: [
      { q: "Which devices work?", a: "Any device that can open a PDF — laptops, tablets, phones, Chromebooks and iPads all work." },
    ],
  },
  {
    title: "Homeschool & Teachers",
    items: [
      { q: "Do you have curriculum planning tools?", a: "Yes — every pack lists the specific curriculum objectives it covers so you can slot it into your plans." },
      { q: "Do you offer school bulk pricing?", a: "We do. Contact us for details on school and MAT-wide licences." },
    ],
  },
];

function FaqPage() {
  return (
    <div className="min-h-dvh bg-warm-white text-navy">
      <SiteNav />

      <header className="border-b border-navy/5 bg-sand-soft/40 px-4 sm:px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-sm font-bold uppercase tracking-widest text-ocean">Help centre</div>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-extrabold">Frequently asked questions</h1>
          <p className="mt-3 text-navy/70 text-lg">Everything you need to know before you set sail.</p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 space-y-10">
        {groups.map((g) => (
          <section key={g.title}>
            <h2 className="mb-4 font-display text-2xl font-extrabold text-ocean">{g.title}</h2>
            <div className="space-y-3">
              {g.items.map((f) => (
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
          </section>
        ))}
      </div>

      <SiteFooter />
    </div>
  );
}
