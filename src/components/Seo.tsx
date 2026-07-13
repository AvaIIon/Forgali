import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.forgali.com";
const DEFAULT_IMAGE =
  "https://cdn.shopify.com/s/files/1/0972/6492/6995/files/forgali-logo-dark.png?v=1783621771";

interface SeoProps {
  title: string;
  description?: string;
  /** Path only, e.g. "/category/dining". Used for canonical + og:url. */
  path?: string;
  image?: string;
  type?: "website" | "product";
  noindex?: boolean;
  /** Optional JSON-LD structured data object(s). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Per-route <head> manager. Sets title, meta description, canonical, and
 * Open Graph / Twitter tags so each route is indexable with its own metadata
 * (the SPA previously served one static <head> for every URL).
 */
export const Seo = ({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  jsonLd,
}: SeoProps) => {
  const url = `${SITE_URL}${path}`;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
