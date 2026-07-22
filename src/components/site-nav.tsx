import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const links = [
    { to: "/shop", label: "Shop" },
    { to: "/bundles", label: "Bundles" },
    { to: "/about", label: "About" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact" },
  ] as const;

  return (
    <>
      <div className="bg-navy py-2 px-4 text-center text-xs sm:text-sm font-medium tracking-wide text-warm-white">
        <span className="mr-2">✨</span>
        Weekend Flash Sale — Buy 3 bundles, save 40%
        <Link to="/bundles" className="ml-3 text-gold underline decoration-2 underline-offset-4 hover:text-white">
          Grab the deal
        </Link>
      </div>

      <nav className="sticky top-0 z-50 border-b border-navy/5 bg-warm-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 py-3 sm:py-4">
          <Link to="/" className="group flex min-w-0 items-center gap-2">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-gold shadow-md transition-transform group-hover:rotate-12">
              <span className="text-2xl leading-none">🪙</span>
            </div>
            <div className="min-w-0 leading-tight">
              <div className="truncate font-display text-lg sm:text-xl font-extrabold text-ocean">
                Math Adventure
              </div>
              <div className="hidden sm:block text-[10px] font-semibold uppercase tracking-widest text-navy/50">
                Printables
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8 font-soft font-bold text-navy/80">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="transition-colors hover:text-ocean"
                activeProps={{ className: "text-ocean" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button aria-label="Search" className="grid size-10 place-items-center rounded-full border border-navy/10 text-navy transition-colors hover:bg-sand-soft">
              <span aria-hidden>🔍</span>
            </button>
            <Link to="/cart" aria-label="Cart" className="relative grid size-10 place-items-center rounded-full border border-navy/10 text-navy transition-colors hover:bg-sand-soft">
              <span aria-hidden>🛒</span>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 grid size-5 place-items-center rounded-full bg-coral text-[10px] font-bold text-white">{count}</span>
              )}
            </Link>
            <Link
              to="/shop"
              className="hidden sm:inline-flex rounded-full bg-coral px-5 py-2.5 font-bold text-white shadow-lg shadow-coral/25 transition-transform hover:scale-105"
            >
              Shop Now
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="lg:hidden grid size-10 place-items-center rounded-full border border-navy/10 text-navy"
            >
              <span aria-hidden>{open ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden border-t border-navy/5 bg-warm-white">
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 font-soft font-bold text-navy/80 hover:bg-sand-soft"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
