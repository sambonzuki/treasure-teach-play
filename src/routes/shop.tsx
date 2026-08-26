import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/catalog";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Printable Maths Resources — Edventure Printables" },
      {
        name: "description",
        content:
          "Browse curriculum-aligned printable maths packs by age, year, subject and theme. Instant download.",
      },
      { property: "og:title", content: "Shop Printable Maths Resources" },
      {
        property: "og:description",
        content: "Filter by age, year, subject, topic, difficulty and theme.",
      },
    ],
  }),
  component: ShopPage,
});

const ages = ["All", "7–8", "7–9", "8–9", "8–10", "9–10", "10–11"];
const years = ["All", "Year 3–4", "Year 4–5", "Year 5–6"];
const subjects = ["All", "Multiplication", "Number"];
const themes = ["All", "Pirate", "Unicorns", "Space"];
const kinds = ["All", "Mystery", "Review", "Get Ahead"];
const difficulties = ["All", "Easy", "Medium", "Challenge"];
const sorts = ["Featured", "Price: Low to High", "Price: High to Low"] as const;

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="mb-2 font-display text-sm font-extrabold uppercase tracking-wider text-navy/70">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
              value === o
                ? "bg-ocean text-white"
                : "bg-white text-navy/70 hover:bg-sand-soft ring-1 ring-navy/10"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function ShopPage() {
  const [q, setQ] = useState("");
  const [age, setAge] = useState("All");
  const [year, setYear] = useState("All");
  const [subject, setSubject] = useState("All");
  const [theme, setTheme] = useState("All");
  const [kind, setKind] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Featured");

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (
        q &&
        !p.title.toLowerCase().includes(q.toLowerCase()) &&
        !p.subject.toLowerCase().includes(q.toLowerCase())
      )
        return false;
      if (age !== "All" && p.age !== age) return false;
      if (year !== "All" && p.year !== year) return false;
      if (subject !== "All" && p.subject !== subject) return false;
      if (theme !== "All" && p.theme !== theme) return false;
      if (kind !== "All" && p.kind !== kind) return false;
      if (difficulty !== "All" && p.difficulty !== difficulty) return false;
      return true;
    });
    if (sort === "Price: Low to High")
      list = [...list].sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    if (sort === "Price: High to Low")
      list = [...list].sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    return list;
  }, [q, age, year, subject, theme, kind, difficulty, sort]);

  return (
    <div className="min-h-dvh bg-warm-white text-navy">
      <SiteNav />
      <header className="border-b border-navy/5 bg-sand-soft/40 px-4 sm:px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-sm font-bold uppercase tracking-widest text-ocean">Shop</div>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-extrabold text-navy">
            All printable Edventures
          </h1>
          <p className="mt-3 max-w-2xl text-navy/70 text-lg">
            Browse every pack — filter by age, year, subject, theme and difficulty.
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 py-10 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6 rounded-3xl border border-navy/5 bg-white p-6 shadow-sm h-fit lg:sticky lg:top-24">
          <div>
            <label className="mb-2 block font-display text-sm font-extrabold uppercase tracking-wider text-navy/70">
              Search
            </label>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search packs…"
              className="w-full rounded-xl border-2 border-navy/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-ocean"
            />
          </div>
          <FilterGroup label="Age" options={ages} value={age} onChange={setAge} />
          <FilterGroup label="Year" options={years} value={year} onChange={setYear} />
          <FilterGroup label="Pack Type" options={kinds} value={kind} onChange={setKind} />
          <FilterGroup label="Subject" options={subjects} value={subject} onChange={setSubject} />
          <FilterGroup label="Theme" options={themes} value={theme} onChange={setTheme} />
          <FilterGroup
            label="Difficulty"
            options={difficulties}
            value={difficulty}
            onChange={setDifficulty}
          />
        </aside>

        <div>
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-sm text-navy/60">
              Showing <span className="font-bold text-navy">{filtered.length}</span> of{" "}
              {products.length} packs
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-bold text-navy/70">Sort:</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="rounded-xl border-2 border-navy/10 bg-white px-3 py-2 text-sm font-medium outline-none focus:border-ocean"
              >
                {sorts.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-navy/10 bg-white p-16 text-center">
              <div className="text-5xl mb-4">🧭</div>
              <h3 className="font-display text-xl font-extrabold">No packs match that quest.</h3>
              <p className="mt-2 text-navy/60">Try clearing a filter or search term.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
