// Same design, different size, separate Shopify products — e.g. "Plank & Beam
// Lido Round Dining Table - 38"" and "... - 47"". Shopify holds them as two
// products (each with a single-value "Table Size" option), so a shopper on one
// page never saw that the other size exists. This module finds the sibling
// products in the catalogue so the product page can render ONE size row whose
// pills link across the products, the way the finish swatches switch variants.
//
// Grouping rule: identical English title once the trailing size is removed,
// same category, and not on the exclusion list. No Shopify data entry needed —
// a new size added in Shopify joins its group on the next catalogue load.
// Shared by the product page (runtime) and middleware.ts (crawler HTML), so
// nothing React- or browser-specific lives here.

export interface SizeSiblingInput {
  handle: string;
  /** English title (on a translated storefront pass the English one). */
  title: string;
  /** Category slug; siblings must match it so a title clash across categories never links. */
  category?: string | null;
}

export interface SizeSibling<T extends SizeSiblingInput = SizeSiblingInput> {
  handle: string;
  size: number;
  item: T;
}

// Trailing size token: ` - 47"`, ` 46.25"`, ` -24"`, ` - 72 in`, ` - 30 inch`.
const TRAILING_SIZE_RE = /\s*[-–]?\s*(\d+(?:\.\d+)?)\s*(?:"|”|''|in\.?|inch(?:es)?)\s*$/i;

/** Option axes the size row stands in for ("Table Size", "Bench Size", "Size", "Length"). */
export const isSizeLikeOption = (name: string): boolean => /\b(size|length)\b/i.test(name);

/** Split `Plank & Beam Lido Round Dining Table - 47"` into base + size; null when there is no trailing size. */
export const parseSizeTitle = (title: string): { base: string; size: number } | null => {
  const m = TRAILING_SIZE_RE.exec(title);
  if (!m) return null;
  const size = parseFloat(m[1]);
  if (!Number.isFinite(size) || size <= 0) return null;
  const base = title.slice(0, m.index).trim().replace(/\s+/g, " ").toLowerCase();
  return base ? { base, size } : null;
};

// Same base title but a different design — NOT one piece in two sizes. The two
// Mid-Century Modern side tables (23" angled legs with a White and Pecan
// finish, 24" clean lines) are different P&B items that share a name.
export const SIZE_SIBLING_EXCLUDE: ReadonlySet<string> = new Set([
  "mid-century-modern-side-table-23",
  "mid-century-modern-side-table-24",
]);

/**
 * The size group `current` belongs to, smallest first and including `current`
 * itself; empty when it has no sibling, so callers can render nothing.
 */
export function findSizeSiblings<T extends SizeSiblingInput>(current: T, all: readonly T[]): Array<SizeSibling<T>> {
  if (SIZE_SIBLING_EXCLUDE.has(current.handle)) return [];
  const own = parseSizeTitle(current.title);
  if (!own) return [];
  const seen = new Set<string>();
  const group: Array<SizeSibling<T>> = [];
  for (const item of all) {
    if (seen.has(item.handle) || SIZE_SIBLING_EXCLUDE.has(item.handle)) continue;
    if ((item.category ?? null) !== (current.category ?? null)) continue;
    const parsed = parseSizeTitle(item.title);
    if (!parsed || parsed.base !== own.base) continue;
    seen.add(item.handle);
    group.push({ handle: item.handle, size: parsed.size, item });
  }
  if (!seen.has(current.handle)) group.push({ handle: current.handle, size: own.size, item: current });
  if (group.length < 2) return [];
  return group.sort((a, b) => a.size - b.size || a.handle.localeCompare(b.handle));
}

/** Pill text: 47" in English, 47 po in French (Canadian French writes inches as "po"). */
export const sizeLabel = (size: number, locale: string): string => (locale === "fr" ? `${size} po` : `${size}"`);
