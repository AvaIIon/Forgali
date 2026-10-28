// Drop-in replacement for "react-router-dom" inside src/components and
// src/pages: identical exports, except <Link> and useNavigate() prefix
// internal paths with the current locale (/fr). Pages keep writing
// locale-free paths ("/category/dining"); the prefix is added in one place.
import { forwardRef } from "react";
import {
  Link as RouterLink,
  useNavigate as useRouterNavigate,
  type LinkProps,
  type NavigateFunction,
  type NavigateOptions,
  type To,
} from "react-router-dom";
import { useLocale } from "./LocaleContext";

export * from "react-router-dom";

function localizeTo(to: To, lp: (path: string) => string): To {
  if (typeof to === "string") return lp(to);
  return to.pathname ? { ...to, pathname: lp(to.pathname) } : to;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function LocaleLink({ to, ...rest }, ref) {
  const { lp } = useLocale();
  return <RouterLink ref={ref} to={localizeTo(to, lp)} {...rest} />;
});

export function useNavigate(): NavigateFunction {
  const navigate = useRouterNavigate();
  const { lp } = useLocale();
  const localized = ((to: To | number, options?: NavigateOptions) => {
    if (typeof to === "number") return navigate(to);
    return navigate(localizeTo(to, lp), options);
  }) as NavigateFunction;
  return localized;
}
