// Unique download link registry (per product/bundle slug).
// Swap these URLs for your real hosted PDFs (Cloud storage, Drive links, etc.).
export const downloadLinks: Record<string, string> = {
  "lost-island-multiplication": "https://cdn.edventureprintables.com/downloads/lost-island-multiplication.pdf",
  "coral-reef-addition": "https://cdn.edventureprintables.com/downloads/coral-reef-addition.pdf",
  "galactic-multiplication": "https://cdn.edventureprintables.com/downloads/galactic-multiplication.pdf",
  "unicorn-subtraction": "https://cdn.edventureprintables.com/downloads/unicorn-subtraction.pdf",
  "fairytale-time": "https://cdn.edventureprintables.com/downloads/fairytale-time.pdf",
  "kraken-fractions": "https://cdn.edventureprintables.com/downloads/kraken-fractions.pdf",
  "pirate-times-tables": "https://cdn.edventureprintables.com/downloads/pirate-times-tables.pdf",
  "doubloon-money": "https://cdn.edventureprintables.com/downloads/doubloon-money.pdf",
  "compass-time": "https://cdn.edventureprintables.com/downloads/compass-time.pdf",
  "all-adventures-collection": "https://cdn.edventureprintables.com/downloads/all-adventures-collection.zip",
  "pirate-maths-collection": "https://cdn.edventureprintables.com/downloads/pirate-maths-collection.zip",
  "year-3-bundle": "https://cdn.edventureprintables.com/downloads/year-3-bundle.zip",
  "year-4-bundle": "https://cdn.edventureprintables.com/downloads/year-4-bundle.zip",
  "times-tables-bundle": "https://cdn.edventureprintables.com/downloads/times-tables-bundle.zip",
  "addition-bundle": "https://cdn.edventureprintables.com/downloads/addition-bundle.zip",
  "money-time-bundle": "https://cdn.edventureprintables.com/downloads/money-time-bundle.zip",
};

export function getDownloadLink(slug: string | undefined | null): string | null {
  if (!slug) return null;
  return downloadLinks[slug] ?? null;
}
