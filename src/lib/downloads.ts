// Unique download link registry (per product/bundle slug).
// Add or override entries here; unknown slugs fall back to a
// deterministic URL derived from the slug so every purchased
// item ships with a working link.
const DOWNLOAD_BASE = "https://cdn.edventureprintables.com/downloads";

const overrides: Record<string, string> = {
  // Example override:
  // "lost-island-multiplication": "https://drive.google.com/file/d/XXXX/view",
};

export function getDownloadLink(slug: string | undefined | null): string {
  if (!slug) return `${DOWNLOAD_BASE}/general-pack.pdf`;
  if (overrides[slug]) return overrides[slug];
  const ext = slug.includes("bundle") || slug.includes("collection") ? "zip" : "pdf";
  return `${DOWNLOAD_BASE}/${slug}.${ext}`;
}
