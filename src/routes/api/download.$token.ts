/**
 * GET /api/download/<token> — serve one purchased PDF.
 *
 * The token is order+product specific and HMAC-signed (see downloads.ts).
 * Each token may be used MAX_DOWNLOADS times (default 5); usage is tracked
 * server-side in fulfillment/usage.json. PDFs stream from PDF_DIR
 * (gitignored, uploaded to the server manually) — never committed to git.
 */
import { createFileRoute } from "@tanstack/react-router";
import { promises as fs } from "node:fs";
import path from "node:path";
import { products } from "@/lib/catalog";
import { verifyToken, recordUse, PDF_DIR, MAX_DOWNLOADS } from "@/lib/downloads";

function htmlPage(title: string, body: string): string {
  return `<!doctype html><html><body style="font-family:'Segoe UI',Arial,sans-serif;background:#FBF3DF;color:#1A2E44;display:grid;place-items:center;min-height:100vh;margin:0">
    <div style="background:#fff;border-radius:20px;padding:40px;max-width:420px;text-align:center;box-shadow:0 6px 24px rgba(26,46,68,.08)">
      <div style="font-size:40px">🏴‍☠️</div>
      <h1 style="font-size:22px;margin:12px 0 8px">${title}</h1>
      <p style="margin:0;color:#5b6b7f">${body}</p>
    </div></body></html>`;
}

function fail(status: number, title: string, body: string): Response {
  return new Response(htmlPage(title, body), {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export const Route = createFileRoute("/api/download/$token")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const parsed = verifyToken(params.token);
        if (!parsed) {
          return fail(
            403,
            "That link doesn't look right",
            "This download link is invalid. Please use the links from your order email.",
          );
        }

        const use = await recordUse(parsed.sig);
        if (!use.ok) {
          return fail(
            410,
            "Download limit reached",
            `This link has already been used ${MAX_DOWNLOADS} times. Reply to your order email and we'll sort you out.`,
          );
        }

        // slug comes from the signed token; strip anything path-like anyway
        const slug = parsed.slug.replace(/[^a-z0-9-]/g, "");
        const file = path.resolve(process.cwd(), PDF_DIR, `${slug}.pdf`);
        let data: Uint8Array;
        try {
          data = new Uint8Array(await fs.readFile(file));
        } catch {
          return fail(
            404,
            "Pack not found",
            "We couldn't find that file on the server — reply to your order email and we'll help.",
          );
        }

        const title = products.find((p) => p.slug === slug)?.title ?? slug;
        return new Response(data as unknown as BodyInit, {
          headers: {
            "content-type": "application/pdf",
            "content-length": String(data.length),
            "content-disposition": `attachment; filename="${title.replace(/"/g, "")}.pdf"`,
            "cache-control": "private, no-store",
          },
        });
      },
    },
  },
});
