import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products, bundles } from "./catalog";

export type CartItem = {
  slug: string;
  kind: "product" | "bundle";
  title: string;
  image: string;
  price: number;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "map-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add: CartCtx["add"] = (item, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((p) => p.slug === item.slug);
      if (found) return prev.map((p) => (p.slug === item.slug ? { ...p, qty: p.qty + qty } : p));
      return [...prev, { ...item, qty }];
    });
  };
  const remove = (slug: string) => setItems((p) => p.filter((i) => i.slug !== slug));
  const setQty = (slug: string, qty: number) =>
    setItems((p) => (qty <= 0 ? p.filter((i) => i.slug !== slug) : p.map((i) => (i.slug === slug ? { ...i, qty } : i))));
  const clear = () => setItems([]);

  const count = items.reduce((a, i) => a + i.qty, 0);
  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);

  return <Ctx.Provider value={{ items, add, remove, setQty, clear, count, subtotal }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}

export function productToCartItem(slug: string): Omit<CartItem, "qty"> | null {
  const p = products.find((x) => x.slug === slug);
  if (!p) return null;
  return { slug: p.slug, kind: "product", title: p.title, image: p.image, price: p.salePrice ?? p.price };
}
export function bundleToCartItem(slug: string): Omit<CartItem, "qty"> | null {
  const b = bundles.find((x) => x.slug === slug);
  if (!b) return null;
  return { slug: b.slug, kind: "bundle", title: b.title, image: b.image, price: b.price };
}
