/**
 * downloads.ts — server-side, order-specific download links with a
 * per-link usage cap.
 *
 * Link shape:  <origin>/api/download/<token>
 * Token:       base64url("<sessionId>:<slug>") + "." + HMAC-SHA256(payload)
 *              → deterministic per (order, product), so the success page
 *              and the fulfillment email always show the SAME links.
 * Usage cap:   each token may be used MAX_DOWNLOADS times (default 5).
 *              Counts live in fulfillment/usage.json (gitignored,
 *              server-local state), keyed by the token signature.
 *
 * PDFs are served from PDF_DIR (default fulfillment/pdfs/, gitignored —
 * upload the pack PDFs there on the server). Files are named <slug>.pdf,
 * so no product→file config table is needed.
 *
 * Required env: DOWNLOAD_SECRET (any long random string).
 */
import { createHmac } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

export const MAX_DOWNLOADS = Number(process.env.MAX_DOWNLOADS ?? 5);
export const PDF_DIR = process.env.PDF_DIR ?? "fulfillment/pdfs";

const USAGE_FILE = "fulfillment/usage.json";

function secret(): string {
  const s = process.env.DOWNLOAD_SECRET;
  if (!s) throw new Error("DOWNLOAD_SECRET is not configured");
  return s;
}

function b64url(s: string): string {
  return Buffer.from(s, "utf8").toString("base64url");
}

function unb64url(s: string): string {
  return Buffer.from(s, "base64url").toString("utf8");
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function makeToken(sessionId: string, slug: string): string {
  const payload = b64url(`${sessionId}:${slug}`);
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(
  token: string,
): { sessionId: string; slug: string; sig: string } | null {
  const dot = token.indexOf(".");
  if (dot <= 0) return null;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = sign(payload);
  // constant-time-ish compare
  if (expected.length !== sig.length) return null;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  if (diff !== 0) return null;
  const decoded = unb64url(payload);
  const sep = decoded.indexOf(":");
  if (sep <= 0) return null;
  return { sessionId: decoded.slice(0, sep), slug: decoded.slice(sep + 1), sig };
}

type UsageTable = Record<string, { n: number }>;

async function readUsage(): Promise<UsageTable> {
  try {
    return JSON.parse(await fs.readFile(USAGE_FILE, "utf8"));
  } catch {
    return {};
  }
}

async function writeUsage(table: UsageTable): Promise<void> {
  const tmp = `${USAGE_FILE}.tmp`;
  await fs.mkdir(path.dirname(USAGE_FILE), { recursive: true });
  await fs.writeFile(tmp, JSON.stringify(table));
  await fs.rename(tmp, USAGE_FILE);
}

/**
 * Check + record one use of a token. Returns remaining uses, or null when
 * the cap is already exhausted. (Counts every request, cancelled or not —
 * downloads are idempotent so re-requesting the same file is one "use".)
 */
export async function recordUse(
  sig: string,
): Promise<{ ok: boolean; uses: number; remaining: number }> {
  const table = await readUsage();
  const uses = (table[sig]?.n ?? 0) + 1;
  table[sig] = { n: uses };
  await writeUsage(table);
  return { ok: uses <= MAX_DOWNLOADS, uses, remaining: Math.max(0, MAX_DOWNLOADS - uses) };
}

export async function getUses(sig: string): Promise<number> {
  return (await readUsage())[sig]?.n ?? 0;
}

export function makeDownloadUrl(origin: string, sessionId: string, slug: string): string {
  return `${origin}/api/download/${makeToken(sessionId, slug)}`;
}
