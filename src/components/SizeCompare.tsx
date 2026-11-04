import { useEffect, useMemo, useState } from "react";
import { Link } from "@/i18n/router";
import { useLocale } from "@/i18n/LocaleContext";
import { dimensionUnit } from "@/i18n/messages";
import { ChevronRight } from "lucide-react";
import { ConvertedProduct, DimensionRow, fetchDimensionTables } from "@/services/shopifyService";

/**
 * "Compare sizes" for coffee and console tables.
 *
 * Each size of a model is its own Shopify product (forma-coffee-table-40 / -48 /
 * -54), so a shopper on one size had no way to see the others side by side.
 * Session replays showed people bouncing between sizes and opening Details on
 * each one. This lists every in-stock size of the same model with L x W x H and
 * price, and links straight to it.
 *
 * Siblings are found by handle: the model is the handle with its trailing size
 * suffix removed ("-40", "-46-25"), so "classic-console-table-with-shelf-36"
 * never mixes with the plain "classic-console-table-*" family.
 */

const COMPARABLE = /-(coffee|console)-table/;
const SIZE_SUFFIX = /-(\d+(?:-\d+)?)$/;

const familyOf = (handle: string) => handle.replace(SIZE_SUFFIX, "");
const sizeOf = (handle: string) => {
  const m = handle.match(SIZE_SUFFIX);
  return m ? parseFloat(m[1].replace("-", ".")) : NaN;
};

// Session-wide cache so moving between sizes doesn't refetch the same tables.
const dimsCache = new Map<string, DimensionRow[] | null>();

const pick = (rows: DimensionRow[] | null | undefined, ...labels: string[]) =>
  rows?.find(r => labels.some(l => r.label.toLowerCase().startsWith(l)));

interface Props {
  product: ConvertedProduct;
  allProducts: ConvertedProduct[];
}

export const SizeCompare = ({ product, allProducts }: Props) => {
  const { t, money, locale } = useLocale();

  const sizes = useMemo(() => {
    if (!COMPARABLE.test(product.handle) || !SIZE_SUFFIX.test(product.handle)) return [];
    const family = familyOf(product.handle);
    const list = allProducts.filter(
      p =>
        SIZE_SUFFIX.test(p.handle) &&
        familyOf(p.handle) === family &&
        (p.handle === product.handle || p.availableForSale)
    );
    // The list query can lag behind the detail fetch; make sure the page's own
    // product is always in its own comparison.
    if (!list.some(p => p.handle === product.handle)) list.push(product);
    return list.sort((a, b) => sizeOf(a.handle) - sizeOf(b.handle));
  }, [product, allProducts]);

  const handles = sizes.map(p => p.handle).join(",");
  const [dims, setDims] = useState<Record<string, DimensionRow[] | null> | null>(null);

  useEffect(() => {
    if (sizes.length < 2) return;
    let cancelled = false;
    const wanted = sizes.map(p => p.handle);
    const missing = wanted.filter(h => !dimsCache.has(h));
    const done = () => {
      if (!cancelled) setDims(Object.fromEntries(wanted.map(h => [h, dimsCache.get(h) ?? null])));
    };
    if (missing.length === 0) {
      done();
      return;
    }
    fetchDimensionTables(missing)
      .then(found => missing.forEach(h => dimsCache.set(h, found[h] ?? null)))
      .catch(() => missing.forEach(h => dimsCache.set(h, null)))
      .finally(done);
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handles]);

  // Wait for the dimensions so the block appears once, complete, instead of
  // popping in with empty cells.
  if (sizes.length < 2 || !dims) return null;

  const sizeLabel = (handle: string) => {
    const n = String(sizeOf(handle));
    return locale === "fr" ? `${n.replace(".", ",")}\u00a0po` : `${n}"`;
  };

  const dimsLabel = (handle: string) => {
    const rows = dims[handle];
    const l = pick(rows, "length", "diameter");
    const w = pick(rows, "width", "diameter");
    const h = pick(rows, "height");
    if (!l || !h) return "-";
    const unit = dimensionUnit(locale, (h.unit || l.unit || "IN").toUpperCase());
    return `${l.value} × ${(w ?? l).value} × ${h.value} ${unit}`;
  };

  return (
    <div className="pt-4 border-t border-border">
      <h2 className="font-semibold mb-3">{t("pdp.compareSizes")}</h2>
      <div className="rounded-lg border border-border overflow-hidden text-sm">
        <div className="grid grid-cols-[4.5rem_1fr_auto] gap-3 px-3 py-2 bg-secondary text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <span>{t("pdp.compareSize")}</span>
          <span>{t("pdp.compareDims")}</span>
          <span className="text-right">{t("pdp.comparePrice")}</span>
        </div>
        {sizes.map(p => {
          const current = p.handle === product.handle;
          const cells = (
            <>
              <span className="font-semibold text-foreground leading-tight">
                {sizeLabel(p.handle)}
                {current && (
                  <span className="block text-[11px] font-normal text-muted-foreground">{t("pdp.compareViewing")}</span>
                )}
              </span>
              <span className="text-muted-foreground tabular-nums">{dimsLabel(p.handle)}</span>
              <span className="flex items-center justify-end gap-1 font-semibold text-brand-accent whitespace-nowrap">
                {p.fromPrice ? t("from") : ""}
                {money(p.price)}
                {!current && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              </span>
            </>
          );
          const rowClass =
            "grid grid-cols-[4.5rem_1fr_auto] gap-3 items-center px-3 py-3 border-t border-border";
          return current ? (
            <div key={p.handle} className={`${rowClass} bg-brand/5`} aria-current="page">
              {cells}
            </div>
          ) : (
            <Link key={p.handle} to={`/product/${p.handle}`} className={`${rowClass} hover:bg-secondary/60 transition-colors`}>
              {cells}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
