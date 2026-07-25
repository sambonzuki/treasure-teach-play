import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout/success")({
  head: () => ({
    meta: [
      { title: "Order confirmed — Math Adventure Printables" },
      { name: "description", content: "Thanks for your order! Your printables are on the way." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <div className="min-h-dvh bg-warm-white text-navy">
      <SiteNav />
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16 text-center">
        <div className="mx-auto mb-6 grid size-24 place-items-center rounded-full bg-emerald text-5xl shadow-xl">🎉</div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold">Treasure secured!</h1>
        <p className="mt-3 text-navy/70">
          Your payment was successful. Check your inbox for your instant PDF download links.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/shop" className="rounded-2xl bg-ocean px-6 py-3 font-bold text-white shadow-lg shadow-ocean/30">Keep exploring</Link>
          <Link to="/" className="rounded-2xl border border-navy/10 bg-white px-6 py-3 font-bold text-navy hover:bg-sand-soft">Back home</Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
