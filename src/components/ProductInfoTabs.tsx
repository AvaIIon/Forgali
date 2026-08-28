import { Link } from "react-router-dom";
import { Check, Truck, RotateCcw, Wrench } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConvertedProduct } from "@/services/shopifyService";

/**
 * The full-width Details / Description / Shipping block that sits under the buy
 * box on every PDP.
 *
 * DETAILS pairs the manufacturer's dimension table with the product highlights;
 * the loose `specs.*` fields (material, weight capacity, recommended mattress,
 * assembly) are folded into the same table so a product never shows two
 * competing spec lists. DESCRIPTION prefers the authored `specs.overview` and
 * falls back to the Shopify description, so a product with no overview written
 * yet still renders a full tab rather than an empty one. SHIPPING is the same
 * copy for every product and is always present, which is why the section
 * renders even when a product has no spec data at all.
 */

const DELIVERY_WINDOW = "12-18 business days";

interface Props {
  product: ConvertedProduct;
}

export const ProductInfoTabs = ({ product }: Props) => {
  const specs = product.specs || {};

  // Extra rows come after the physical dimensions so the table always reads
  // Length / Width / Height / Weight first, the way the spec sheet does.
  const extraRows = [
    specs.material && { label: "Material", value: specs.material },
    specs.weightCapacity && { label: "Weight capacity", value: specs.weightCapacity },
    specs.recommendedMattress && { label: "Recommended mattress", value: specs.recommendedMattress },
    specs.assembly && { label: "Assembly", value: specs.assembly },
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  const rows = [
    ...(specs.dimensionTable ?? []).map(r => ({
      label: r.label,
      value: r.unit ? `${r.value} ${r.unit}` : r.value,
    })),
    ...extraRows,
  ];

  const highlights = specs.highlights ?? [];
  // `specs.dimensions` is the older free-text field. It only earns a place when
  // there is no structured table, otherwise it repeats what the table just said.
  const dimensionsNote = rows.length === 0 ? specs.dimensions : undefined;
  const description = specs.overview || product.description;

  const hasDetails = rows.length > 0 || highlights.length > 0 || !!dimensionsNote;

  const triggerClass =
    "rounded-none border-b-2 border-transparent bg-transparent px-2 py-3 text-xs sm:text-sm " +
    "font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors " +
    "hover:text-foreground data-[state=active]:border-brand data-[state=active]:bg-transparent " +
    "data-[state=active]:text-foreground data-[state=active]:shadow-none";

  return (
    <section className="border-t border-border bg-secondary/30">
      <div className="max-w-rail mx-auto px-4 py-10 md:py-14">
        <Tabs defaultValue={hasDetails ? "details" : "description"} className="w-full">
          <TabsList className="h-auto w-full justify-between gap-1 overflow-x-auto rounded-none border-b border-border bg-transparent p-0 sm:justify-center sm:gap-10">
            {hasDetails && (
              <TabsTrigger value="details" className={triggerClass}>
                Details
              </TabsTrigger>
            )}
            {description && (
              <TabsTrigger value="description" className={triggerClass}>
                Description
              </TabsTrigger>
            )}
            {/* All three labels have to fit 375px without the strip scrolling,
                or the last tab is simply never seen on a phone. */}
            <TabsTrigger value="shipping" className={triggerClass}>
              <span className="sm:hidden">Shipping</span>
              <span className="hidden sm:inline">Shipping Information</span>
            </TabsTrigger>
          </TabsList>

          {hasDetails && (
            <TabsContent value="details" className="mt-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-14">
                <div>
                  {rows.length > 0 && (
                    <dl className="text-sm">
                      {rows.map(row => (
                        <div
                          key={row.label}
                          className="grid grid-cols-2 gap-4 border-b border-border py-3"
                        >
                          <dt className="font-semibold text-foreground">{row.label}</dt>
                          <dd className="tracking-wide text-muted-foreground">{row.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {dimensionsNote && (
                    <p className="whitespace-pre-line text-sm text-muted-foreground">{dimensionsNote}</p>
                  )}
                </div>
                {highlights.length > 0 && (
                  <ul className="space-y-3">
                    {highlights.map(item => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-positive" />
                        <span className="text-sm leading-relaxed text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </TabsContent>
          )}

          {description && (
            <TabsContent value="description" className="mt-8">
              <p className="max-w-3xl whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </TabsContent>
          )}

          <TabsContent value="shipping" className="mt-8">
            <div className="grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <Truck className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-positive" />
                <div>
                  <p className="text-sm font-semibold">Free Canada-wide shipping</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Standard delivery is {DELIVERY_WINDOW} from the day your order is placed.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-positive" />
                <div>
                  <p className="text-sm font-semibold">30-day returns</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Return an unused item in its original packaging within 30 days of delivery.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Wrench className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-positive" />
                <div>
                  <p className="text-sm font-semibold">Flat-packed for assembly</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Hardware, tools and step-by-step instructions are included in the box.
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-6 text-sm">
              <Link to="/shipping" className="text-brand-accent hover:underline">
                Shipping details
              </Link>
              {" · "}
              <Link to="/returns" className="text-brand-accent hover:underline">
                Returns policy
              </Link>
              {" · "}
              <Link to="/assembly" className="text-brand-accent hover:underline">
                Assembly guide
              </Link>
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
