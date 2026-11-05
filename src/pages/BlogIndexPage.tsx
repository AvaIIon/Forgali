import { Link } from "@/i18n/router";
import { useLocale } from "@/i18n/LocaleContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cdnImage, cdnSrcSet } from "@/lib/imageProxy";
import { useBlogArticles } from "@/hooks/useBlog";
import { BLOG_INDEX_SEO, articlePath, blogIndexJsonLd, formatPostDate } from "@/lib/blog";

const CARD_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

// /blog — every published post of the Shopify blog, newest first. The posts
// come from Shopify (src/lib/blog.ts), so unlike the guides index this page
// has loading, error and empty states; middleware.ts renders the same list
// into the initial HTML for crawlers.
const BlogIndexPage = () => {
  const { locale, t } = useLocale();
  const seo = BLOG_INDEX_SEO[locale];
  const { data: posts, isPending, isError } = useBlogArticles();

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={seo.title}
        description={seo.description}
        path={seo.path}
        jsonLd={blogIndexJsonLd(locale)}
      />
      <Header />

      <div className="bg-gradient-to-b from-brand-tint to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{seo.h1}</h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">{seo.lead}</p>
        </div>
      </div>

      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {isPending ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" aria-busy="true">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-[3/2] w-full rounded-lg" />
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <p className="text-center text-muted-foreground">{t("blog.loadError")}</p>
          ) : !posts?.length ? (
            <div className="max-w-xl mx-auto text-center">
              <p className="text-lg font-semibold mb-2">{t("blog.empty")}</p>
              <p className="text-muted-foreground mb-6">{t("blog.emptyGuides")}</p>
              <Button asChild variant="outline">
                <Link to="/guides">{t("blog.emptyCta")}</Link>
              </Button>
            </div>
          ) : (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 list-none p-0 m-0">
              {posts.map((post) => (
                <li key={post.handle}>
                  <Link to={articlePath(post)} className="group block h-full">
                    <div className="aspect-[3/2] w-full overflow-hidden rounded-lg bg-brand-tint mb-4">
                      {post.image ? (
                        <img
                          src={cdnImage(post.image.url, 800)}
                          srcSet={cdnSrcSet(post.image.url, [400, 800, 1200])}
                          sizes={CARD_SIZES}
                          alt={post.image.alt || post.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      ) : null}
                    </div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt, locale)}</time>
                    </p>
                    <h2 className="text-lg font-bold text-foreground group-hover:text-brand mb-2">{post.title}</h2>
                    {post.excerpt ? (
                      <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogIndexPage;
