import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { pinterestPage } from "@/lib/pinterest";

/**
 * Sends a Pinterest 'page' on every client-side route change — same job, and
 * same rules, as MetaPixel beside it.
 *
 * initPinterestTag() (main.tsx) already sent the entry page's 'page', so the
 * first render is skipped or every landing page would count twice. Keyed on
 * pathname only: query-string changes (category filters, ?room= tabs) are not
 * navigations.
 *
 * A no-op whenever PINTEREST_TAG_ID in src/lib/pinterest.ts is empty.
 */
export const PinterestTag = () => {
  const { pathname } = useLocation();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    pinterestPage();
  }, [pathname]);

  return null;
};

export default PinterestTag;
