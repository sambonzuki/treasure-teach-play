/// <reference types="vite/client" />
import bundleEdventuresImg from "@/assets/product-bundle-edventures.jpg";

export type Product = {
  slug: string;
  title: string;
  subject: string;
  topic: string;
  age: string;
  year: string;
  difficulty: "Easy" | "Medium" | "Challenge";
  theme: string;
  kind: "Mystery" | "Review" | "Get Ahead";
  kindLabel: string;
  pages: number;
  price: number;
  salePrice?: number;
  badge?: "Best Seller" | "New" | "Sale" | "Bundle" | "Teacher Favourite";
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  skills: string[];
  description: string;
};

// Cover + gallery art is generated from the real pack PDFs (see
// src/assets/covers and src/assets/gallery); resolved at build time.
const coverImgs = import.meta.glob("../assets/covers/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const galleryImgs = import.meta.glob("../assets/gallery/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function coverFor(slug: string): string {
  return coverImgs[`../assets/covers/${slug}.jpg`];
}
function imagesFor(slug: string): string[] {
  return [
    coverFor(slug),
    galleryImgs[`../assets/gallery/${slug}-2.jpg`],
    galleryImgs[`../assets/gallery/${slug}-3.jpg`],
    galleryImgs[`../assets/gallery/${slug}-4.jpg`],
  ];
}

type ProductData = Omit<Product, "image" | "images">;

// Every pack is a 32-page story-led adventure: six missions, a progress-map
// tracker, six clue numbers to collect, a final code-word to decode and a
// printable certificate. Questions are identical across themes — only the
// world, characters and artwork change. price = full RRP, salePrice = now.
const FULL = 8.95;
const NOW = 5.95;

const productData: ProductData[] = [
  // ── Times Tables Mystery (Year 3–4) ─────────────────────────────────────
  {
    slug: "treasure-island-times-tables-mystery",
    title: "Treasure Island Times Tables Mystery",
    subject: "Multiplication",
    topic: "Times Tables",
    age: "7–9",
    year: "Year 3–4",
    difficulty: "Medium",
    theme: "Pirate",
    kind: "Mystery",
    kindLabel: "Year 3–4 Mystery",
    pages: 32,
    price: FULL,
    salePrice: NOW,
    badge: "Best Seller",
    rating: 5.0,
    reviews: 24,
    skills: [
      "2, 3, 4, 5, 8 & 10 times tables",
      "Mazes, codes & logic puzzles",
      "Colour-by-answer",
      "Clue-word finale & certificate",
    ],
    description:
      "Captain Crooked Hook has hidden his treasure — and only a true Times Tables Detective can find it! Six story missions cover the 2, 3, 4, 5, 8 and 10 times tables through mazes, code-crackers, colour-by-answer pictures and logic puzzles, ending in a clue-word reveal and a printable certificate.",
  },
  {
    slug: "unicorn-isles-times-tables-mystery",
    title: "Unicorn Isles Times Tables Mystery",
    subject: "Multiplication",
    topic: "Times Tables",
    age: "7–9",
    year: "Year 3–4",
    difficulty: "Medium",
    theme: "Unicorns",
    kind: "Mystery",
    kindLabel: "Year 3–4 Mystery",
    pages: 32,
    price: FULL,
    salePrice: NOW,
    badge: "New",
    rating: 5.0,
    reviews: 11,
    skills: [
      "2, 3, 4, 5, 8 & 10 times tables",
      "Mazes, codes & logic puzzles",
      "Colour-by-answer",
      "Clue-word finale & certificate",
    ],
    description:
      "A sparkling mystery across the Unicorn Isles! With Pip the Foal at their side, your child solves six story missions covering the 2, 3, 4, 5, 8 and 10 times tables through mazes, code-crackers, colour-by-answer pictures and logic puzzles, ending in a clue-word reveal and a printable certificate.",
  },
  {
    slug: "galaxy-maths-times-tables-mystery",
    title: "Galaxy Maths Times Tables Mystery",
    subject: "Multiplication",
    topic: "Times Tables",
    age: "7–9",
    year: "Year 3–4",
    difficulty: "Medium",
    theme: "Space",
    kind: "Mystery",
    kindLabel: "Year 3–4 Mystery",
    pages: 32,
    price: FULL,
    salePrice: NOW,
    badge: "New",
    rating: 5.0,
    reviews: 9,
    skills: [
      "2, 3, 4, 5, 8 & 10 times tables",
      "Mazes, codes & logic puzzles",
      "Colour-by-answer",
      "Clue-word finale & certificate",
    ],
    description:
      "A maths mystery on the moon! Six lunar missions with Commander Nova and Zorp the alien cover the 2, 3, 4, 5, 8 and 10 times tables through mazes, code-crackers, colour-by-answer pictures and logic puzzles, ending in a clue-word reveal and a printable certificate.",
  },

  // ── Year 3 Review (Year 3 into Year 4) ──────────────────────────────────
  {
    slug: "treasure-island-shipshape-review",
    title: "Treasure Island: The Shipshape Review",
    subject: "Number",
    topic: "Number & Fractions",
    age: "7–8",
    year: "Year 3–4",
    difficulty: "Medium",
    theme: "Pirate",
    kind: "Review",
    kindLabel: "Year 3 Review",
    pages: 32,
    price: FULL,
    salePrice: NOW,
    rating: 5.0,
    reviews: 7,
    skills: [
      "Place value to 1000",
      "Column addition & subtraction",
      "3, 4 & 8 times tables with division",
      "Tenths & fractions of amounts",
    ],
    description:
      "Captain Crooked Hook wants proof that his crew is shipshape! Six review missions cover the whole Year 3 number curriculum — place value to 1000, mental and column addition and subtraction, the 3, 4 and 8 times tables with division, and tenths and fractions of amounts.",
  },
  {
    slug: "unicorn-isles-rainbow-review",
    title: "Unicorn Isles: The Rainbow Review",
    subject: "Number",
    topic: "Number & Fractions",
    age: "7–8",
    year: "Year 3–4",
    difficulty: "Medium",
    theme: "Unicorns",
    kind: "Review",
    kindLabel: "Year 3 Review",
    pages: 32,
    price: FULL,
    salePrice: NOW,
    badge: "New",
    rating: 5.0,
    reviews: 6,
    skills: [
      "Place value to 1000",
      "Column addition & subtraction",
      "3, 4 & 8 times tables with division",
      "Tenths & fractions of amounts",
    ],
    description:
      "Queen Stardust wants proof that her helpers are sparkle-shape! Six review missions cover the whole Year 3 number curriculum — place value to 1000, mental and column addition and subtraction, the 3, 4 and 8 times tables with division, and tenths and fractions of amounts.",
  },
  {
    slug: "galaxy-maths-orbit-review",
    title: "Galaxy Maths: The Orbit Review",
    subject: "Number",
    topic: "Number & Fractions",
    age: "7–8",
    year: "Year 3–4",
    difficulty: "Medium",
    theme: "Space",
    kind: "Review",
    kindLabel: "Year 3 Review",
    pages: 32,
    price: FULL,
    salePrice: NOW,
    badge: "New",
    rating: 5.0,
    reviews: 5,
    skills: [
      "Place value to 1000",
      "Column addition & subtraction",
      "3, 4 & 8 times tables with division",
      "Tenths & fractions of amounts",
    ],
    description:
      "Commander Nova's crew must pass the Orbit Review before they can fly on! Six review missions cover the whole Year 3 number curriculum — place value to 1000, mental and column addition and subtraction, the 3, 4 and 8 times tables with division, and tenths and fractions of amounts.",
  },

  // ── Year 4 Get Ahead (Year 3 into Year 4) ───────────────────────────────
  {
    slug: "treasure-island-uncharted-waters",
    title: "Treasure Island: Uncharted Waters",
    subject: "Multiplication",
    topic: "Times Tables",
    age: "7–9",
    year: "Year 3–4",
    difficulty: "Challenge",
    theme: "Pirate",
    kind: "Get Ahead",
    kindLabel: "Year 4 Get Ahead",
    pages: 32,
    price: FULL,
    salePrice: NOW,
    rating: 5.0,
    reviews: 8,
    skills: [
      "6, 7, 9, 11 & 12 times tables",
      "Factor pairs & multiples",
      "Multiply & divide by 10 and 100",
      "First formal written methods",
    ],
    description:
      "Sail beyond the known map and get ahead of Year 4! Six preview missions introduce the 6, 7, 9, 11 and 12 times tables, factor pairs and multiples, multiplying and dividing by 10 and 100, and the first formal written methods — so September holds no surprises.",
  },
  {
    slug: "unicorn-isles-uncharted-skies",
    title: "Unicorn Isles: Uncharted Skies",
    subject: "Multiplication",
    topic: "Times Tables",
    age: "7–9",
    year: "Year 3–4",
    difficulty: "Challenge",
    theme: "Unicorns",
    kind: "Get Ahead",
    kindLabel: "Year 4 Get Ahead",
    pages: 32,
    price: FULL,
    salePrice: NOW,
    badge: "New",
    rating: 5.0,
    reviews: 6,
    skills: [
      "6, 7, 9, 11 & 12 times tables",
      "Factor pairs & multiples",
      "Multiply & divide by 10 and 100",
      "First formal written methods",
    ],
    description:
      "Fly beyond the rainbow and get ahead of Year 4! Six preview missions introduce the 6, 7, 9, 11 and 12 times tables, factor pairs and multiples, multiplying and dividing by 10 and 100, and the first formal written methods — so September holds no surprises.",
  },
  {
    slug: "galaxy-maths-uncharted-planets",
    title: "Galaxy Maths: Uncharted Planets",
    subject: "Multiplication",
    topic: "Times Tables",
    age: "7–9",
    year: "Year 3–4",
    difficulty: "Challenge",
    theme: "Space",
    kind: "Get Ahead",
    kindLabel: "Year 4 Get Ahead",
    pages: 32,
    price: FULL,
    salePrice: NOW,
    badge: "New",
    rating: 5.0,
    reviews: 5,
    skills: [
      "6, 7, 9, 11 & 12 times tables",
      "Factor pairs & multiples",
      "Multiply & divide by 10 and 100",
      "First formal written methods",
    ],
    description:
      "Blast off to uncharted planets and get ahead of Year 4! Six preview missions introduce the 6, 7, 9, 11 and 12 times tables, factor pairs and multiples, multiplying and dividing by 10 and 100, and the first formal written methods — so September holds no surprises.",
  },

  // ── Year 4 Review (Year 4 into Year 5) ──────────────────────────────────
  {
    slug: "treasure-island-great-review-voyage",
    title: "Treasure Island: The Great Review Voyage",
    subject: "Multiplication",
    topic: "Times Tables",
    age: "8–9",
    year: "Year 4–5",
    difficulty: "Medium",
    theme: "Pirate",
    kind: "Review",
    kindLabel: "Year 4 Review",
    pages: 32,
    price: FULL,
    salePrice: NOW,
    rating: 5.0,
    reviews: 10,
    skills: [
      "All times tables to 12 × 12",
      "Factor pairs & commutativity",
      "Formal written methods",
      "Word & correspondence problems",
    ],
    description:
      "Any old sea-dog can find treasure — only a master can count it! Six review missions revisit everything Year 4 should know: all times tables to 12 × 12, factor pairs, multiplying three numbers, formal written methods and tricky correspondence problems.",
  },
  {
    slug: "unicorn-isles-great-sparkle-voyage",
    title: "Unicorn Isles: The Great Sparkle Voyage",
    subject: "Multiplication",
    topic: "Times Tables",
    age: "8–9",
    year: "Year 4–5",
    difficulty: "Medium",
    theme: "Unicorns",
    kind: "Review",
    kindLabel: "Year 4 Review",
    pages: 32,
    price: FULL,
    salePrice: NOW,
    badge: "New",
    rating: 5.0,
    reviews: 7,
    skills: [
      "All times tables to 12 × 12",
      "Factor pairs & commutativity",
      "Formal written methods",
      "Word & correspondence problems",
    ],
    description:
      "Queen Stardust is back — and she wants proof that you remember everything! Six review missions revisit everything Year 4 should know: all times tables to 12 × 12, factor pairs, multiplying three numbers, formal written methods and tricky correspondence problems.",
  },
  {
    slug: "galaxy-maths-great-galaxy-voyage",
    title: "Galaxy Maths: The Great Galaxy Voyage",
    subject: "Multiplication",
    topic: "Times Tables",
    age: "8–9",
    year: "Year 4–5",
    difficulty: "Medium",
    theme: "Space",
    kind: "Review",
    kindLabel: "Year 4 Review",
    pages: 32,
    price: FULL,
    salePrice: NOW,
    badge: "New",
    rating: 5.0,
    reviews: 6,
    skills: [
      "All times tables to 12 × 12",
      "Factor pairs & commutativity",
      "Formal written methods",
      "Word & correspondence problems",
    ],
    description:
      "Commander Nova is back — and she wants proof that you remember everything! Six review missions revisit everything Year 4 should know: all times tables to 12 × 12, factor pairs, multiplying three numbers, formal written methods and tricky correspondence problems.",
  },

  // ── Year 5 Get Ahead (Year 4 into Year 5) ───────────────────────────────
  {
    slug: "treasure-island-beyond-the-horizon",
    title: "Treasure Island: Beyond the Horizon",
    subject: "Multiplication",
    topic: "Factors & Primes",
    age: "8–10",
    year: "Year 4–5",
    difficulty: "Challenge",
    theme: "Pirate",
    kind: "Get Ahead",
    kindLabel: "Year 5 Get Ahead",
    pages: 32,
    price: FULL,
    salePrice: NOW,
    rating: 5.0,
    reviews: 7,
    skills: [
      "Multiples & factor pairs",
      "Multiply & divide by 10, 100, 1000",
      "Prime, square & cube numbers",
      "Formal long multiplication",
    ],
    description:
      "Chase the horizon and arrive in Year 5 already ahead! Six preview missions introduce multiples and factor pairs, multiplying and dividing by 10, 100 and 1000, prime and composite numbers, square and cube numbers and formal long multiplication.",
  },
  {
    slug: "unicorn-isles-beyond-the-rainbow",
    title: "Unicorn Isles: Beyond the Rainbow",
    subject: "Multiplication",
    topic: "Factors & Primes",
    age: "8–10",
    year: "Year 4–5",
    difficulty: "Challenge",
    theme: "Unicorns",
    kind: "Get Ahead",
    kindLabel: "Year 5 Get Ahead",
    pages: 32,
    price: FULL,
    salePrice: NOW,
    badge: "New",
    rating: 5.0,
    reviews: 5,
    skills: [
      "Multiples & factor pairs",
      "Multiply & divide by 10, 100, 1000",
      "Prime, square & cube numbers",
      "Formal long multiplication",
    ],
    description:
      "Soar past the end of the rainbow and arrive in Year 5 already ahead! Six preview missions introduce multiples and factor pairs, multiplying and dividing by 10, 100 and 1000, prime and composite numbers, square and cube numbers and formal long multiplication.",
  },
  {
    slug: "galaxy-maths-beyond-the-stars",
    title: "Galaxy Maths: Beyond the Stars",
    subject: "Multiplication",
    topic: "Factors & Primes",
    age: "8–10",
    year: "Year 4–5",
    difficulty: "Challenge",
    theme: "Space",
    kind: "Get Ahead",
    kindLabel: "Year 5 Get Ahead",
    pages: 32,
    price: FULL,
    salePrice: NOW,
    badge: "New",
    rating: 5.0,
    reviews: 5,
    skills: [
      "Multiples & factor pairs",
      "Multiply & divide by 10, 100, 1000",
      "Prime, square & cube numbers",
      "Formal long multiplication",
    ],
    description:
      "Push beyond the stars and arrive in Year 5 already ahead! Six preview missions introduce multiples and factor pairs, multiplying and dividing by 10, 100 and 1000, prime and composite numbers, square and cube numbers and formal long multiplication.",
  },

  // ── Year 5 Review (Year 5 into Year 6) ──────────────────────────────────
  {
    slug: "treasure-island-great-reckoning",
    title: "Treasure Island: The Great Reckoning",
    subject: "Multiplication",
    topic: "Factors & Primes",
    age: "9–10",
    year: "Year 5–6",
    difficulty: "Medium",
    theme: "Pirate",
    kind: "Review",
    kindLabel: "Year 5 Review",
    pages: 32,
    price: FULL,
    salePrice: NOW,
    rating: 5.0,
    reviews: 6,
    skills: [
      "Factors & multiples",
      "Primes, squares, cubes & roots",
      "Multiply & divide by 10, 100, 1000",
      "Formal long multiplication",
    ],
    description:
      "The Captain calls a final count before Year 6! Six review missions revisit the whole Year 5 multiplication strand — factors and multiples, prime and composite numbers, powers of 10, squares, cubes and roots, and formal long multiplication.",
  },
  {
    slug: "unicorn-isles-rainbow-reckoning",
    title: "Unicorn Isles: The Rainbow Reckoning",
    subject: "Multiplication",
    topic: "Factors & Primes",
    age: "9–10",
    year: "Year 5–6",
    difficulty: "Medium",
    theme: "Unicorns",
    kind: "Review",
    kindLabel: "Year 5 Review",
    pages: 32,
    price: FULL,
    salePrice: NOW,
    badge: "New",
    rating: 5.0,
    reviews: 4,
    skills: [
      "Factors & multiples",
      "Primes, squares, cubes & roots",
      "Multiply & divide by 10, 100, 1000",
      "Formal long multiplication",
    ],
    description:
      "Queen Stardust calls a final count before Year 6! Six review missions revisit the whole Year 5 multiplication strand — factors and multiples, prime and composite numbers, powers of 10, squares, cubes and roots, and formal long multiplication.",
  },
  {
    slug: "galaxy-maths-galactic-reckoning",
    title: "Galaxy Maths: The Galactic Reckoning",
    subject: "Multiplication",
    topic: "Factors & Primes",
    age: "9–10",
    year: "Year 5–6",
    difficulty: "Medium",
    theme: "Space",
    kind: "Review",
    kindLabel: "Year 5 Review",
    pages: 32,
    price: FULL,
    salePrice: NOW,
    badge: "New",
    rating: 5.0,
    reviews: 4,
    skills: [
      "Factors & multiples",
      "Primes, squares, cubes & roots",
      "Multiply & divide by 10, 100, 1000",
      "Formal long multiplication",
    ],
    description:
      "Commander Nova calls a final count before Year 6! Six review missions revisit the whole Year 5 multiplication strand — factors and multiples, prime and composite numbers, powers of 10, squares, cubes and roots, and formal long multiplication.",
  },

  // ── Year 6 Get Ahead (Year 5 into Year 6) ───────────────────────────────
  {
    slug: "treasure-island-final-ascent",
    title: "Treasure Island: The Final Ascent",
    subject: "Multiplication",
    topic: "Written Methods",
    age: "10–11",
    year: "Year 5–6",
    difficulty: "Challenge",
    theme: "Pirate",
    kind: "Get Ahead",
    kindLabel: "Year 6 Get Ahead",
    pages: 32,
    price: FULL,
    salePrice: NOW,
    rating: 5.0,
    reviews: 5,
    skills: [
      "Common factors & multiples",
      "Prime factorisation",
      "Order of operations",
      "4-digit × 2-digit & decimal multiplication",
    ],
    description:
      "The summit climb before Year 6! Six preview missions introduce common factors and multiples, prime factorisation, order of operations, long multiplication up to 4-digit × 2-digit and decimal multiplication — the full Year 6 toolkit.",
  },
  {
    slug: "unicorn-isles-starlight-ascent",
    title: "Unicorn Isles: The Starlight Ascent",
    subject: "Multiplication",
    topic: "Written Methods",
    age: "10–11",
    year: "Year 5–6",
    difficulty: "Challenge",
    theme: "Unicorns",
    kind: "Get Ahead",
    kindLabel: "Year 6 Get Ahead",
    pages: 32,
    price: FULL,
    salePrice: NOW,
    badge: "New",
    rating: 5.0,
    reviews: 4,
    skills: [
      "Common factors & multiples",
      "Prime factorisation",
      "Order of operations",
      "4-digit × 2-digit & decimal multiplication",
    ],
    description:
      "Climb to the starlit summit before Year 6! Six preview missions introduce common factors and multiples, prime factorisation, order of operations, long multiplication up to 4-digit × 2-digit and decimal multiplication — the full Year 6 toolkit.",
  },
  {
    slug: "galaxy-maths-lunar-ascent",
    title: "Galaxy Maths: The Lunar Ascent",
    subject: "Multiplication",
    topic: "Written Methods",
    age: "10–11",
    year: "Year 5–6",
    difficulty: "Challenge",
    theme: "Space",
    kind: "Get Ahead",
    kindLabel: "Year 6 Get Ahead",
    pages: 32,
    price: FULL,
    salePrice: NOW,
    badge: "New",
    rating: 5.0,
    reviews: 3,
    skills: [
      "Common factors & multiples",
      "Prime factorisation",
      "Order of operations",
      "4-digit × 2-digit & decimal multiplication",
    ],
    description:
      "Make the lunar ascent before Year 6! Six preview missions introduce common factors and multiples, prime factorisation, order of operations, long multiplication up to 4-digit × 2-digit and decimal multiplication — the full Year 6 toolkit.",
  },
];

export const products: Product[] = productData.map((p) => ({
  ...p,
  image: coverFor(p.slug),
  images: imagesFor(p.slug),
}));

export const bundles = [
  {
    slug: "treasure-island-complete-collection",
    title: "Treasure Island Complete Collection",
    tagline: "All seven pirate adventures — every quest from Year 3 to Year 6",
    price: 25,
    original: 62.65,
    saving: "60%",
    includes: [
      "Times Tables Mystery",
      "The Shipshape Review",
      "Uncharted Waters",
      "The Great Review Voyage",
      "Beyond the Horizon",
      "The Great Reckoning",
      "The Final Ascent",
    ],
    image: coverFor("treasure-island-times-tables-mystery"),
    color: "from-ocean to-navy",
    pages: 224,
  },
  {
    slug: "unicorn-isles-complete-collection",
    title: "Unicorn Isles Complete Collection",
    tagline: "All seven unicorn adventures — every quest from Year 3 to Year 6",
    price: 25,
    original: 62.65,
    saving: "60%",
    includes: [
      "Times Tables Mystery",
      "The Rainbow Review",
      "Uncharted Skies",
      "The Great Sparkle Voyage",
      "Beyond the Rainbow",
      "The Rainbow Reckoning",
      "The Starlight Ascent",
    ],
    image: coverFor("unicorn-isles-times-tables-mystery"),
    color: "from-coral to-gold",
    pages: 224,
  },
  {
    slug: "galaxy-maths-complete-collection",
    title: "Galaxy Maths Complete Collection",
    tagline: "All seven space adventures — every quest from Year 3 to Year 6",
    price: 25,
    original: 62.65,
    saving: "60%",
    includes: [
      "Times Tables Mystery",
      "The Orbit Review",
      "Uncharted Planets",
      "The Great Galaxy Voyage",
      "Beyond the Stars",
      "The Galactic Reckoning",
      "The Lunar Ascent",
    ],
    image: coverFor("galaxy-maths-times-tables-mystery"),
    color: "from-navy to-ocean",
    pages: 224,
  },
  {
    slug: "every-world-mega-collection",
    title: "The Every-World Mega Collection",
    tagline: "Pirates, unicorns and space — all 21 adventures in one download",
    price: 62,
    original: 187.95,
    saving: "67%",
    includes: ["Treasure Island (7 packs)", "Unicorn Isles (7 packs)", "Galaxy Maths (7 packs)"],
    image: bundleEdventuresImg,
    color: "from-emerald to-ocean",
    pages: 672,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const kindRibbonColor: Record<Product["kind"], string> = {
  Mystery: "bg-gold text-navy",
  Review: "bg-emerald text-white",
  "Get Ahead": "bg-coral text-white",
};
