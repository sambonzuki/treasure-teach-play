import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-navy/5 bg-warm-white pt-16 sm:pt-20 pb-10 px-4 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4 md:gap-12">
        <div className="md:col-span-2">
          <div className="mb-5 flex items-center gap-2">
            <div className="grid size-9 place-items-center rounded-full bg-gold shadow-sm">
              <span className="text-lg">🪙</span>
            </div>
            <span className="font-display text-xl font-extrabold text-ocean">Math Adventure</span>
          </div>
          <p className="max-w-sm text-navy/60">
            Premium, teacher-created printable maths resources that turn every worksheet into a treasure hunt.
          </p>
          <form className="mt-6 flex max-w-md gap-2">
            <input
              type="email"
              placeholder="you@example.com"
              className="min-w-0 flex-1 rounded-2xl border-2 border-navy/10 bg-white px-4 py-3 text-sm outline-none focus:border-ocean"
            />
            <button className="shrink-0 rounded-2xl bg-navy px-5 py-3 text-sm font-bold text-white hover:bg-ocean-deep">
              Join Crew
            </button>
          </form>
        </div>
        <div>
          <h5 className="mb-5 font-display text-base font-extrabold uppercase tracking-wider text-navy">Shop</h5>
          <ul className="space-y-3 text-navy/70 font-medium">
            <li><Link to="/shop" className="hover:text-ocean">All Resources</Link></li>
            <li><Link to="/bundles" className="hover:text-ocean">Bundles</Link></li>
            <li><Link to="/shop" className="hover:text-ocean">Best Sellers</Link></li>
            <li><Link to="/shop" className="hover:text-ocean">New Arrivals</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="mb-5 font-display text-base font-extrabold uppercase tracking-wider text-navy">Support</h5>
          <ul className="space-y-3 text-navy/70 font-medium">
            <li><Link to="/faq" className="hover:text-ocean">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-ocean">Contact</Link></li>
            <li><Link to="/about" className="hover:text-ocean">About Us</Link></li>
            <li><Link to="/faq" className="hover:text-ocean">Licensing</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-14 max-w-7xl border-t border-navy/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-navy/50">
        <div>&copy; {new Date().getFullYear()} Math Adventure Printables. Made with 🪙 for young explorers.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-ocean">Privacy</a>
          <a href="#" className="hover:text-ocean">Terms</a>
          <a href="#" className="hover:text-ocean">Refunds</a>
        </div>
      </div>
    </footer>
  );
}
