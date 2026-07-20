import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Scrolls the window to the top whenever the route path changes (e.g. clicking
 * a "You May Also Like" card at the bottom of a product page previously landed
 * the customer at the bottom of the next page). Back/forward (POP) navigations
 * are left alone so the browser can restore the previous scroll position, and
 * query-only changes (Smart Deals ?room= tabs) don't trigger a jump.
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType]);

  return null;
};

export default ScrollToTop;
