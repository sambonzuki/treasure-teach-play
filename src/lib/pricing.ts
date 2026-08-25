/**
 * pricing.ts — single source of truth for the volume discount.
 *
 * 3+ items in the cart → 10% off, applied per unit. The per-unit
 * rounding here is exactly what Stripe charges, so the cart UI,
 * checkout UI and the Stripe session must all use these helpers
 * (Stripe forbids combining `discounts` with `allow_promotion_codes`,
 * so the discount is baked into unit prices and promo codes stay
 * available on every order).
 */
export const BUNDLE_MIN_ITEMS = 3;
export const BUNDLE_OFF = 0.1;

export const bundleActiveFor = (count: number) => count >= BUNDLE_MIN_ITEMS;

/** Unit price after the volume discount (pence-exact). */
export function unitPrice(price: number, bundleActive: boolean): number {
  return bundleActive ? Math.round(price * 100 * (1 - BUNDLE_OFF)) / 100 : price;
}

export function cartTotals(
  items: Array<{ price: number; qty: number }>,
  count: number,
): { subtotal: number; discount: number; total: number; bundleActive: boolean } {
  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);
  const bundleActive = bundleActiveFor(count);
  const total = items.reduce((a, i) => a + unitPrice(i.price, bundleActive) * i.qty, 0);
  return { subtotal, discount: subtotal - total, total, bundleActive };
}
