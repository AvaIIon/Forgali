import { useQuery } from "@tanstack/react-query";
import { useLocale } from "@/i18n/LocaleContext";
import { fetchBlogArticle, fetchBlogArticles } from "@/lib/blog";

// Blog data for the SPA pages, through the QueryClientProvider App.tsx already
// mounts. Keyed by locale so /fr/blog gets Shopify's French version of a post
// when one exists. Five-minute freshness matches the product cache.
const STALE_MS = 5 * 60 * 1000;

export const useBlogArticles = () => {
  const { locale } = useLocale();
  return useQuery({
    queryKey: ["blog", "list", locale],
    queryFn: () => fetchBlogArticles(locale),
    staleTime: STALE_MS,
    retry: 1,
  });
};

/** `data` is null (not undefined) once Shopify has answered that no such post exists. */
export const useBlogArticle = (handle: string | undefined) => {
  const { locale } = useLocale();
  return useQuery({
    queryKey: ["blog", "article", locale, handle ?? ""],
    queryFn: () => fetchBlogArticle(handle ?? "", locale),
    enabled: Boolean(handle),
    staleTime: STALE_MS,
    retry: 1,
  });
};
