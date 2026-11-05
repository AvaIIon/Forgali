// Blog — the site's second editorial section, beside the buying guides
// (src/lib/guides.ts), linked from the footer's Company column.
//
// Unlike the guides, the posts are NOT in this repo. They are Shopify blog
// articles (Shopify admin > Content > Blog posts, in the blog whose handle is
// BLOG_HANDLE), so a post can be written, scheduled, edited or hidden in
// Shopify without a deploy, and Translate & Adapt can give it a French
// version that @inContext(language: FR) returns on /fr/blog. The Storefront
// API only returns published, visible articles, so a hidden or scheduled post
// is simply absent here.
//
// This module is the one place that knows the Storefront shape. It is shared
// by the SPA (BlogIndexPage / BlogPostPage through hooks/useBlog.ts) and by
// middleware.ts, which reads the same posts at the edge and renders them into
// the initial HTML for crawlers and link previews. Keep it free of React and
// of anything that touches `window` or import.meta — the middleware imports
// it directly.

import { INTL_LOCALE, SHOPIFY_LANGUAGE, type Locale } from "../i18n/locale";

/**
 * Handle of the Shopify blog the site reads. Shopify created it as "News";
 * renaming the blog in admin keeps the handle, deleting it empties /blog.
 */
export const BLOG_HANDLE = "news";
/** Posts fetched for the index page and the "more from the blog" lists. */
export const BLOG_LIST_MAX = 50;

// Public Storefront token — committed on purpose; src/services/shopifyService.ts
// explains why. Duplicated rather than imported so the edge bundle never pulls
// that module's import.meta.env / window references in. Keep the two in sync.
const PUBLIC_STOREFRONT_TOKEN = "a657d35533c14d8ad23c908b75c56427";
const STORE_DOMAIN = "kjrq9s-yp.myshopify.com";
const API_VERSION = "2025-01";
const STOREFRONT_URL = `https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;

const SITE = "https://www.forgali.com";

export interface BlogArticle {
  handle: string;
  title: string;
  /** Plain-text summary: the article's excerpt, else the opening of its body. */
  excerpt: string;
  /** Article body as authored in Shopify. Empty on list items. */
  contentHtml: string;
  /** ISO 8601. */
  publishedAt: string;
  author: string | null;
  tags: string[];
  image: { url: string; alt: string; width: number | null; height: number | null } | null;
  seoTitle: string | null;
  seoDescription: string | null;
}

// ---------------------------------------------------------------------------
// Storefront API
// ---------------------------------------------------------------------------

// `summary` is the plain-text body cut by Shopify, used when no excerpt was
// written. @inContext is written out here (not added by shopifyService's
// withStorefrontLanguage) because the middleware never loads that module.
const CARD_FIELDS = `
  handle
  title
  excerpt
  summary: content(truncateAt: 240)
  publishedAt
  tags
  authorV2 { name }
  image { url altText width height }
  seo { title description }
`;

const LIST_QUERY = `
  query blogArticles($blog: String!, $first: Int!, $language: LanguageCode!) @inContext(language: $language, country: CA) {
    blog(handle: $blog) {
      articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
        edges { node { ${CARD_FIELDS} } }
      }
    }
  }
`;

const ARTICLE_QUERY = `
  query blogArticle($blog: String!, $handle: String!, $language: LanguageCode!) @inContext(language: $language, country: CA) {
    blog(handle: $blog) {
      articleByHandle(handle: $handle) { ${CARD_FIELDS} contentHtml }
    }
  }
`;

interface ArticleNode {
  handle: string;
  title: string;
  excerpt: string | null;
  summary: string | null;
  contentHtml?: string | null;
  publishedAt: string;
  tags: string[] | null;
  authorV2: { name: string | null } | null;
  image: { url: string; altText: string | null; width: number | null; height: number | null } | null;
  seo: { title: string | null; description: string | null } | null;
}

const collapse = (s: string): string => s.replace(/\s+/g, " ").trim();

const toArticle = (n: ArticleNode): BlogArticle => ({
  handle: n.handle,
  title: collapse(n.title ?? ""),
  excerpt: collapse(n.excerpt || n.summary || ""),
  contentHtml: n.contentHtml ?? "",
  publishedAt: n.publishedAt,
  author: n.authorV2?.name ? collapse(n.authorV2.name) : null,
  tags: Array.isArray(n.tags) ? n.tags : [],
  image: n.image?.url
    ? {
        url: n.image.url,
        alt: n.image.altText ?? "",
        width: n.image.width ?? null,
        height: n.image.height ?? null,
      }
    : null,
  seoTitle: n.seo?.title ? collapse(n.seo.title) : null,
  seoDescription: n.seo?.description ? collapse(n.seo.description) : null,
});

export interface BlogFetchOptions {
  /** Abort after this many ms (the edge sets one; the browser lets the request run). */
  timeoutMs?: number;
}

const timeoutSignal = (ms?: number): AbortSignal | undefined => {
  if (!ms) return undefined;
  try {
    return AbortSignal.timeout(ms);
  } catch {
    return undefined;
  }
};

// Throws on any failure (network, HTTP, GraphQL errors) so callers can tell an
// outage from "no such post": the SPA shows an error state, the middleware
// falls through to the plain shell.
async function storefront<T>(
  query: string,
  variables: Record<string, unknown>,
  opts: BlogFetchOptions
): Promise<T> {
  const res = await fetch(STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": PUBLIC_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    signal: timeoutSignal(opts.timeoutMs),
  });
  if (!res.ok) throw new Error(`Storefront API HTTP ${res.status}`);
  const json = (await res.json()) as { data?: T; errors?: Array<{ message: string }> };
  if (json.errors?.length) throw new Error(`Storefront API: ${json.errors.map((e) => e.message).join(", ")}`);
  if (!json.data) throw new Error("Storefront API: empty response");
  return json.data;
}

/** Published posts, newest first. A missing blog is "no posts", not an outage. */
export async function fetchBlogArticles(locale: Locale, opts: BlogFetchOptions = {}): Promise<BlogArticle[]> {
  const data = await storefront<{ blog: { articles: { edges: Array<{ node: ArticleNode }> } } | null }>(
    LIST_QUERY,
    { blog: BLOG_HANDLE, first: BLOG_LIST_MAX, language: SHOPIFY_LANGUAGE[locale] },
    opts
  );
  return (data.blog?.articles.edges ?? [])
    .map((e) => toArticle(e.node))
    .filter((a) => a.handle && a.title);
}

/** One post with its body, or null when Shopify has no visible article by that handle. */
export async function fetchBlogArticle(
  handle: string,
  locale: Locale,
  opts: BlogFetchOptions = {}
): Promise<BlogArticle | null> {
  const data = await storefront<{ blog: { articleByHandle: ArticleNode | null } | null }>(
    ARTICLE_QUERY,
    { blog: BLOG_HANDLE, handle, language: SHOPIFY_LANGUAGE[locale] },
    opts
  );
  const node = data.blog?.articleByHandle ?? null;
  return node ? toArticle(node) : null;
}

// ---------------------------------------------------------------------------
// Head + copy shared by the SPA pages and middleware.ts
// ---------------------------------------------------------------------------

export const articlePath = (a: BlogArticle | string): string =>
  `/blog/${typeof a === "string" ? a : a.handle}`;

/** <title>: Shopify's SEO title when set, else the headline, with the brand suffix the rest of the site uses. */
export const articleTitleTag = (a: BlogArticle): string => {
  const base = a.seoTitle || a.title;
  return /forgali/i.test(base) ? base : `${base} | Forgali`;
};

const truncate = (s: string, max: number): string => {
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  const at = cut.lastIndexOf(" ");
  return `${at > max * 0.6 ? cut.slice(0, at) : cut}…`;
};

/** Meta description: Shopify's SEO description when set, else the excerpt, cut to meta length. */
export const articleDescription = (a: BlogArticle): string =>
  truncate(a.seoDescription || a.excerpt, 160);

/** "November 4, 2026" / "4 novembre 2026" in the store's time zone; "" for an unparseable date. */
export const formatPostDate = (iso: string, locale: Locale): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  try {
    return new Intl.DateTimeFormat(INTL_LOCALE[locale], {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "America/Toronto",
    }).format(d);
  } catch {
    return iso.slice(0, 10);
  }
};

export interface BlogIndexSeo {
  title: string;
  description: string;
  path: string;
  h1: string;
  lead: string;
}

// Both languages here (unlike the guides, still Phase 4 of the French work)
// because the posts themselves arrive translated from Shopify, so the /fr/blog
// page can be fully French for the price of five strings.
export const BLOG_INDEX_SEO: Record<Locale, BlogIndexSeo> = {
  en: {
    title: "Blog – Solid Wood Furniture Ideas, Sizing & Care Tips | Forgali",
    description:
      "Room ideas, sizing help, care tips and news from Forgali, a Canadian solid wood furniture shop: bunk and loft beds, dining tables, benches, stools and living room pieces, shipped free across Canada.",
    path: "/blog",
    h1: "The Forgali Blog",
    lead: "Room ideas, sizing help, care tips and what's new at Forgali, written for Canadian homes.",
  },
  fr: {
    title: "Blogue – Idées, dimensions et entretien des meubles en bois massif | Forgali",
    description:
      "Idées d'aménagement, conseils de dimensions, entretien et nouveautés de Forgali, boutique canadienne de meubles en bois massif : lits superposés et mezzanines, tables, bancs, tabourets et meubles de salon, livrés gratuitement partout au Canada.",
    path: "/blog",
    h1: "Le blogue Forgali",
    lead: "Idées d'aménagement, conseils de dimensions, entretien et nouveautés de Forgali, pensés pour les maisons canadiennes.",
  },
};

export const blogIndexJsonLd = (locale: Locale): Array<Record<string, unknown>> => [
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: BLOG_INDEX_SEO[locale].h1,
    description: BLOG_INDEX_SEO[locale].description,
    url: `${SITE}/blog`,
    publisher: { "@type": "Organization", name: "Forgali", url: SITE },
  },
];

/**
 * BlogPosting + BreadcrumbList for one post. Shared by BlogPostPage and
 * middleware.ts so the injected and hydrated schema are byte-identical.
 */
export const articleJsonLd = (a: BlogArticle): Array<Record<string, unknown>> => {
  const url = `${SITE}${articlePath(a)}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: a.title,
      description: articleDescription(a),
      ...(a.image ? { image: a.image.url } : {}),
      datePublished: a.publishedAt,
      mainEntityOfPage: url,
      url,
      author: a.author
        ? { "@type": "Person", name: a.author }
        : { "@type": "Organization", name: "Forgali", url: SITE },
      publisher: { "@type": "Organization", name: "Forgali", url: SITE },
      ...(a.tags.length ? { keywords: a.tags.join(", ") } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Forgali", item: SITE },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
        { "@type": "ListItem", position: 3, name: a.title, item: url },
      ],
    },
  ];
};
