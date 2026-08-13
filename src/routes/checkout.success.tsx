import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { useCart } from "@/lib/cart";
import { getOrderDownloads, fulfillOrder } from "@/lib/order.functions";

type OrderState = {
  paid: boolean;
  email: string | null;
  items: Array<{ title: string; slug: string | null; url: string; qty: number }>;
};

export const Route = createFileRoute("/checkout/success")({
  validateSearch: (s: Record<string, unknown>) => ({
    session_id: typeof s.session_id === "string" ? s.session_id : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Order confirmed — Edventure Printables" },
      {
        name: "description",
        content: "Thanks for your order! Your printables are ready to download.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const { clear } = useCart();
  const { session_id } = useSearch({ from: "/checkout/success" });
  const fetchOrder = useServerFn(getOrderDownloads);
  const triggerFulfillment = useServerFn(fulfillOrder);
  const [order, setOrder] = useState<OrderState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clear();
  }, [clear]);

  useEffect(() => {
    let cancelled = false;
    if (!session_id) {
      setLoading(false);
      return;
    }
    // Fire-and-forget: send the thank-you email with PDFs attached.
    // Idempotent server-side, so refreshes never resend.
    triggerFulfillment({ data: { sessionId: session_id } }).catch((e) =>
      console.error("fulfillment trigger failed", e),
    );
    (async () => {
      try {
        const res = await fetchOrder({ data: { sessionId: session_id } });
        if (!cancelled) setOrder(res as OrderState);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Couldn't load your downloads.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [session_id, fetchOrder, triggerFulfillment]);

  return (
    <div className="min-h-dvh bg-warm-white text-navy">
      <SiteNav />
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16 text-center">
        <div className="mx-auto mb-6 grid size-24 place-items-center rounded-full bg-emerald text-5xl shadow-xl">
          🎉
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold">Treasure secured!</h1>
        <p className="mt-3 text-navy/70">
          Your payment was successful
          {order?.email
            ? ` — the same download links were just emailed to ${order.email}.`
            : " — the same download links were just emailed to you."}
        </p>

        <div className="mt-8 rounded-3xl border border-navy/5 bg-white p-6 shadow-lg text-left">
          <h2 className="font-display text-xl font-extrabold text-navy">Your downloads</h2>
          <p className="mt-1 text-sm text-navy/60">
            Each link is unique to your order and works 5 times — the same links are in your order
            email, so keep that handy.
          </p>

          {loading && (
            <div className="mt-5 animate-pulse space-y-3">
              <div className="h-14 rounded-xl bg-sand-soft" />
              <div className="h-14 rounded-xl bg-sand-soft" />
            </div>
          )}

          {!loading && error && (
            <div className="mt-5 rounded-xl border border-coral/30 bg-coral/5 px-4 py-3 text-sm font-medium text-coral">
              {error}
            </div>
          )}

          {!loading && !error && !session_id && (
            <div className="mt-5 rounded-xl border border-navy/10 bg-sand-soft/50 px-4 py-3 text-sm text-navy/70">
              No order reference found. If you've just paid, check your inbox — your download links
              are on the way.
            </div>
          )}

          {!loading && !error && order && (
            <ul className="mt-5 space-y-3">
              {order.items.map((it, idx) => (
                <li
                  key={`${it.slug}-${idx}`}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-navy/5 bg-sand-soft/40 px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="truncate font-bold text-navy">{it.title}</div>
                    <div className="text-xs text-navy/60">Qty {it.qty}</div>
                  </div>
                  <a
                    href={it.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-ocean px-4 py-2 text-sm font-bold text-white shadow hover:bg-ocean-deep"
                  >
                    ⬇ Download
                  </a>
                </li>
              ))}
              {order.items.length === 0 && (
                <li className="rounded-xl border border-navy/10 bg-sand-soft/50 px-4 py-3 text-sm text-navy/70">
                  We received your payment. Your download links will arrive by email shortly.
                </li>
              )}
            </ul>
          )}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/shop"
            className="rounded-2xl bg-ocean px-6 py-3 font-bold text-white shadow-lg shadow-ocean/30"
          >
            Keep exploring
          </Link>
          <Link
            to="/"
            className="rounded-2xl border border-navy/10 bg-white px-6 py-3 font-bold text-navy hover:bg-sand-soft"
          >
            Back home
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
