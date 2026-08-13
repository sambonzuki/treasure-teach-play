/**
 * fulfillment.ts — server-only order fulfillment.
 *
 * After a successful Stripe payment, emails the customer a branded
 * thank-you note containing their order-specific download links (see
 * downloads.ts — each link is signed and works MAX_DOWNLOADS times).
 * The same links are shown on the /checkout/success page.
 *
 * Bundles expand to one link per contained pack. Idempotent: the Stripe
 * session is marked metadata.fulfilled="true" after a successful send.
 *
 * Required env: STRIPE_SECRET_KEY, SENDGRID_API_KEY, DOWNLOAD_SECRET.
 * Optional env: FULFILLMENT_FROM (default orders@edventureprintables.com),
 *               FULFILLMENT_FROM_NAME (default "Edventure Printables").
 */
import Stripe from "stripe";
import { products } from "./catalog";
import { makeDownloadUrl, MAX_DOWNLOADS } from "./downloads";

/** Bundle slug -> the pack slugs it contains. */
export const BUNDLE_CONTENTS: Record<string, string[]> = {
  "treasure-island-complete-collection": [
    "treasure-island-times-tables-mystery",
    "treasure-island-shipshape-review",
    "treasure-island-uncharted-waters",
    "treasure-island-great-review-voyage",
    "treasure-island-beyond-the-horizon",
    "treasure-island-great-reckoning",
    "treasure-island-final-ascent",
  ],
  "unicorn-isles-complete-collection": [
    "unicorn-isles-times-tables-mystery",
    "unicorn-isles-rainbow-review",
    "unicorn-isles-uncharted-skies",
    "unicorn-isles-great-sparkle-voyage",
    "unicorn-isles-beyond-the-rainbow",
    "unicorn-isles-rainbow-reckoning",
    "unicorn-isles-starlight-ascent",
  ],
  "galaxy-maths-complete-collection": [
    "galaxy-maths-times-tables-mystery",
    "galaxy-maths-orbit-review",
    "galaxy-maths-uncharted-planets",
    "galaxy-maths-great-galaxy-voyage",
    "galaxy-maths-beyond-the-stars",
    "galaxy-maths-galactic-reckoning",
    "galaxy-maths-lunar-ascent",
  ],
};
BUNDLE_CONTENTS["every-world-mega-collection"] = Object.values(BUNDLE_CONTENTS).flat();

export const titleForSlug = (slug: string) => products.find((p) => p.slug === slug)?.title ?? slug;

/** Expand bundles and dedupe, preserving order. */
export function expandSlugs(slugs: Array<string | null>): string[] {
  const out: string[] = [];
  for (const s of slugs) {
    if (!s) continue;
    for (const p of BUNDLE_CONTENTS[s] ?? [s]) {
      if (!out.includes(p)) out.push(p);
    }
  }
  return out;
}

export type LinkItem = { title: string; slug: string; url: string; qty: number };

/** Per-pack items with signed download URLs (bundles expanded). */
export function itemsWithLinks(
  origin: string,
  sessionId: string,
  items: Array<{ title: string; slug: string | null; qty: number }>,
): LinkItem[] {
  const slugs = expandSlugs(items.map((i) => i.slug));
  return slugs.map((slug) => ({
    title: titleForSlug(slug),
    slug,
    url: makeDownloadUrl(origin, sessionId, slug),
    qty: 1,
  }));
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function buildEmailHtml(items: LinkItem[]): string {
  const rows = items
    .map(
      (it) => `<tr>
        <td style="padding:10px 14px;border-bottom:1px solid #f0e8d8;font-weight:600;color:#1A2E44">${esc(it.title)}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #f0e8d8;text-align:right">
          <a href="${it.url}" style="display:inline-block;background:#0077BE;color:#ffffff;font-weight:700;text-decoration:none;padding:8px 14px;border-radius:10px">Download PDF</a>
        </td>
      </tr>`,
    )
    .join("");
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#FBF3DF;font-family:'Segoe UI',Arial,sans-serif;color:#1A2E44">
  <div style="max-width:560px;margin:0 auto;padding:32px 16px">
    <div style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 6px 24px rgba(26,46,68,.08)">
      <div style="background:linear-gradient(135deg,#0077BE,#1A2E44);padding:28px 28px 24px;color:#fff">
        <div style="font-size:26px;font-weight:800">Treasure secured! 🏴‍☠️</div>
        <div style="opacity:.85;margin-top:6px">Thank you for your Edventure Printables order.</div>
      </div>
      <div style="padding:24px 28px">
        <p style="margin:0 0 16px">Your printables are ready — each <strong>Download PDF</strong> button below saves one pack. Print at home or school, and reprint as often as you like.</p>
        <table style="width:100%;border-collapse:collapse;margin:8px 0 16px">${rows}</table>
        <p style="margin:0 0 4px;font-size:14px;color:#5b6b7f">Each link works <strong>${MAX_DOWNLOADS} times</strong> — keep this email as your backup. Any trouble? Just reply and we'll help.</p>
      </div>
      <div style="background:#FBF3DF;padding:16px 28px;font-size:13px;color:#5b6b7f">
        Happy adventuring,<br/><strong>The Edventure Printables crew</strong>
      </div>
    </div>
    <p style="text-align:center;font-size:12px;color:#9aa5b1;margin-top:16px">
      Edventure Printables · printable maths Edventures · single family/classroom licence
    </p>
  </div>
</body></html>`;
}

function buildEmailText(items: LinkItem[]): string {
  const lines = items.map((it) => `- ${it.title}:\n  ${it.url}`).join("\n");
  return `Treasure secured!\n\nThank you for your Edventure Printables order. Your printables are ready — each link below downloads one pack (works ${MAX_DOWNLOADS} times).\n\n${lines}\n\nKeep this email as your backup. Any trouble? Just reply and we'll help.\n\nHappy adventuring,\nThe Edventure Printables crew`;
}

async function sendGridSend(opts: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<void> {
  const key = process.env.SENDGRID_API_KEY;
  if (!key) throw new Error("SENDGRID_API_KEY is not configured");
  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      authorization: `Bearer ${key}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: opts.to }] }],
      from: {
        email: process.env.FULFILLMENT_FROM ?? "orders@edventureprintables.com",
        name: process.env.FULFILLMENT_FROM_NAME ?? "Edventure Printables",
      },
      subject: opts.subject,
      content: [
        { type: "text/plain", value: opts.text },
        { type: "text/html", value: opts.html },
      ],
    }),
  });
  if (!res.ok) {
    throw new Error(`SendGrid send failed (${res.status}): ${await res.text()}`);
  }
}

export type FulfillResult = {
  sent: boolean;
  reason?: string;
  links?: number;
  email?: string | null;
};

/**
 * Send the thank-you + download-links email for a paid Stripe checkout
 * session. Idempotent via the session's metadata.fulfilled flag.
 */
export async function fulfillStripeSession(
  sessionId: string,
  origin: string,
): Promise<FulfillResult> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");
  const stripe = new Stripe(key);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });
  if (session.payment_status !== "paid") {
    return { sent: false, reason: "not-paid" };
  }
  if (session.metadata?.fulfilled === "true") {
    return { sent: false, reason: "already-fulfilled" };
  }
  const email = session.customer_details?.email ?? session.customer_email ?? null;
  if (!email) {
    return { sent: false, reason: "no-email" };
  }

  const items = (session.line_items?.data ?? []).map((li) => {
    const product = li.price?.product as Stripe.Product | null;
    return {
      title: product?.name ?? li.description ?? "Your printable",
      slug: (product?.metadata?.slug as string | undefined) ?? null,
      qty: li.quantity ?? 1,
    };
  });
  const links = itemsWithLinks(origin, sessionId, items);

  await sendGridSend({
    to: email,
    subject: "Your Edventure Printables are ready 🏴‍☠️ (download links inside)",
    html: buildEmailHtml(links),
    text: buildEmailText(links),
  });

  try {
    await stripe.checkout.sessions.update(sessionId, {
      metadata: { ...session.metadata, fulfilled: "true" },
    });
  } catch (err) {
    // email already sent; worst case a manual retrigger duplicates it
    console.error("[fulfillment] could not mark session fulfilled:", err);
  }
  return { sent: true, links: links.length, email };
}
