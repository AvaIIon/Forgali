import { Link } from "react-router-dom";
import { getProxiedImage } from "@/lib/imageProxy";

// Brand-statement block — replaces the old bed-only "Why Choose Forgali?"
// value-prop cards. The four trust icons already live in GuaranteeStrip near
// the top of the page, so this block is copy + image only to avoid repeating
// them.
export const BrandStatement = () => {
  return (
    <section className="py-16 px-4 bg-[#f2f4f6]/60">
      <div className="max-w-7xl mx-auto grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="text-center md:text-left">
          <h2 className="mb-4 text-3xl font-bold">Furniture Built to Live With</h2>
          <p className="mx-auto mb-6 max-w-xl leading-relaxed text-muted-foreground md:mx-0">
            We design solid wood pieces for real life — the kind that looks great in
            your space, holds up to everyday use, and skips the &ldquo;how is it{" "}
            <em>that</em> expensive?&rdquo; price tag. Good design and real quality
            shouldn&rsquo;t feel out of reach, so ours are designed smart, priced
            fair, and made to last.
          </p>
          <div className="flex flex-col items-center gap-3 md:items-start">
            <Link to="/category/dining">
              <button className="rounded-full bg-[#4A647C] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#3A5066]">
                Shop the Collection
              </button>
            </Link>
            <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-[#4A647C] hover:underline">
              Learn more about Forgali →
            </Link>
          </div>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[#f2f4f6]">
          <img
            src={getProxiedImage(
              "https://cdn.shopify.com/s/files/1/0972/6492/6995/files/2600425900-014__1_25f566d3-2d94-4b5f-a5dc-1a1fe4172f1b.jpg?v=1783608426",
            )}
            alt="Plank+Beam Arcata solid wood console table"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default BrandStatement;
