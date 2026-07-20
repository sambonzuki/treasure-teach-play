import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Math Adventure Printables" },
      { name: "description", content: "Get in touch — questions on packs, licensing, bulk orders and school licences." },
      { property: "og:title", content: "Contact Math Adventure Printables" },
      { property: "og:description", content: "We'd love to hear from you." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-dvh bg-warm-white text-navy">
      <SiteNav />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <div className="text-sm font-bold uppercase tracking-widest text-ocean">Contact</div>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-extrabold">Come aboard — we'd love to chat.</h1>
          <p className="mt-4 text-lg text-navy/70">
            Questions about a pack, licensing, or a bulk school order? Drop us a line and we'll reply within one working day.
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-sand-soft text-lg">📧</span>
              <div>
                <div className="font-bold">Email</div>
                <a href="mailto:hello@mathadventure.co" className="text-ocean hover:underline">hello@mathadventure.co</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-sand-soft text-lg">⏰</span>
              <div>
                <div className="font-bold">Response time</div>
                <div className="text-navy/70">Within one working day (usually much faster)</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-sand-soft text-lg">🏫</span>
              <div>
                <div className="font-bold">School licences</div>
                <div className="text-navy/70">Bulk pricing available for schools and MATs</div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="font-bold mb-3">Follow the quest</div>
            <div className="flex gap-3">
              {["Instagram", "Facebook", "Pinterest", "TikTok"].map((s) => (
                <a key={s} href="#" aria-label={s} className="grid size-11 place-items-center rounded-full bg-navy text-white hover:bg-ocean transition-colors">
                  {s.charAt(0)}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-navy/5 bg-white p-6 sm:p-8 shadow-xl shadow-navy/5">
          {sent ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">🪙</div>
              <h2 className="font-display text-2xl font-extrabold">Message sent!</h2>
              <p className="mt-2 text-navy/70">We'll reply within one working day.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-bold mb-1.5">Name</label>
                <input required className="w-full rounded-xl border-2 border-navy/10 bg-white px-4 py-3 outline-none focus:border-ocean" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1.5">Email</label>
                <input required type="email" className="w-full rounded-xl border-2 border-navy/10 bg-white px-4 py-3 outline-none focus:border-ocean" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1.5">I am a…</label>
                <select className="w-full rounded-xl border-2 border-navy/10 bg-white px-4 py-3 outline-none focus:border-ocean">
                  <option>Parent</option>
                  <option>Teacher</option>
                  <option>Homeschool educator</option>
                  <option>Tutor</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1.5">Message</label>
                <textarea required rows={5} className="w-full rounded-xl border-2 border-navy/10 bg-white px-4 py-3 outline-none focus:border-ocean" placeholder="How can we help?" />
              </div>
              <button type="submit" className="w-full rounded-2xl bg-ocean px-7 py-4 font-display text-lg font-extrabold text-white shadow-lg shadow-ocean/25 hover:-translate-y-0.5 transition-transform">
                Send message
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Newsletter */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 bg-sand-soft/50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-extrabold">Get the newsletter</h2>
          <p className="mt-2 text-navy/70">Weekly free printables and first look at new collections.</p>
          <form className="mt-6 flex flex-col sm:flex-row gap-3">
            <input required type="email" placeholder="you@example.com" className="min-w-0 flex-1 rounded-2xl border-2 border-navy/10 bg-white px-5 py-4 outline-none focus:border-ocean" />
            <button className="rounded-2xl bg-navy px-7 py-4 font-display font-extrabold text-white hover:bg-ocean-deep">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
