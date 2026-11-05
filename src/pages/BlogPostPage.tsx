import { Link, useParams } from "@/i18n/router";
import { useLocale } from "@/i18n/LocaleContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Skeleton } from "@/components/ui/skeleton";
import { cdnImage, cdnSrcSet } from "@/lib/imageProxy";
import { useBlogArticle, useBlogArticles } from "@/hooks/useBlog";
import {
  articleDescription,
  articleJsonLd,
  articlePath,
  articleTitleTag,
  formatPostDate,
} from "@/lib/blog";
import NotFound from "./NotFound";

// /blog/<handle> — one Shopify blog post. The body is rendered as authored in
// Shopify admin (the store's own content, not visitor input), styled by the
// typography plugin's `prose` classes. middleware.ts renders the same post
// into the initial HTML; keep the visible text here in step with blogPostBody().
const BlogPostPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const { locale, t } = useLocale();
  const { data: post, isPending, isError } = useBlogArticle(handle);
  const { data: posts } = useBlogArticles();

  // Shopify answered and has no such post (hidden, deleted or a typo).
  if (!isPending && !isError && !post) return <NotFound />;

  const others = (posts ?? []).filter((p) => p.handle !== handle).slice(0, 4);
  const dateLabel = post ? formatPostDate(post.publishedAt, locale) : "";

  return (
    <div className="min-h-screen bg-background">
      {post ? (
        <Seo
          title={articleTitleTag(post)}
          description={articleDescription(post)}
          path={articlePath(post)}
          image={post.image?.url}
          jsonLd={articleJsonLd(post)}
        />
      ) : null}
      <Header />

      <div className="bg-gradient-to-b from-brand-tint to-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-muted-foreground mb-3">
            <Link to="/" className="hover:underline">Forgali</Link>
            {" / "}
            <Link to="/blog" className="hover:underline">{t("footer.blog")}</Link>
          </p>
          {post ? (
            <>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">{post.title}</h1>
              <p className="text-sm text-muted-foreground">
                {dateLabel ? <time dateTime={post.publishedAt}>{dateLabel}</time> : null}
                {dateLabel && post.author ? " · " : null}
                {post.author ? t("blog.by", { name: post.author }) : null}
              </p>
            </>
          ) : isError ? (
            <p className="text-muted-foreground">{t("blog.loadError")}</p>
          ) : (
            <div className="space-y-3" aria-busy="true">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-40" />
            </div>
          )}
        </div>
      </div>

      <article className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {post ? (
            <>
              {post.image ? (
                <img
                  src={cdnImage(post.image.url, 1200)}
                  srcSet={cdnSrcSet(post.image.url, [800, 1200, 1600])}
                  sizes="(max-width: 768px) 100vw, 768px"
                  alt={post.image.alt || post.title}
                  width={post.image.width ?? undefined}
                  height={post.image.height ?? undefined}
                  className="w-full h-auto rounded-lg mb-10"
                />
              ) : null}
              <div
                className="prose prose-neutral max-w-none prose-headings:text-brand prose-a:text-brand-accent hover:prose-a:text-foreground prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />
            </>
          ) : isPending ? (
            <div className="space-y-4" aria-busy="true">
              <Skeleton className="aspect-[3/2] w-full rounded-lg" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          ) : null}

          {others.length ? (
            <section className="mt-14 pt-10 border-t border-border">
              <h2 className="text-xl font-bold mb-4">{t("blog.more")}</h2>
              <ul className="space-y-3">
                {others.map((p) => (
                  <li key={p.handle}>
                    <Link to={articlePath(p)} className="text-brand-accent underline hover:text-foreground">
                      {p.title}
                    </Link>
                    <span className="text-sm text-muted-foreground"> · {formatPostDate(p.publishedAt, locale)}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <p className="mt-10">
            <Link to="/blog" className="text-brand-accent underline hover:text-foreground">
              {t("blog.all")}
            </Link>
          </p>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
