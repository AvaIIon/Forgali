import { useLocation } from "react-router-dom";
import { useLocale } from "@/i18n/LocaleContext";
import { LOCALES, switchLocalePath, type Locale } from "@/i18n/locale";

const LABEL: Record<Locale, string> = { en: "EN", fr: "FR" };
const NAME: Record<Locale, string> = { en: "English", fr: "Français" };

/**
 * EN | FR toggle. Plain anchors on purpose: a language switch is a full page
 * load, so the module-level Storefront caches and every rendered string start
 * over in the new language instead of mixing the two.
 */
export const LanguageSwitcher = ({ className = "" }: { className?: string }) => {
  const { pathname, search, hash } = useLocation();
  const { locale, t } = useLocale();

  return (
    <nav aria-label={t("language")} className={`flex items-center gap-1 text-sm ${className}`}>
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && (
            <span aria-hidden="true" className="text-muted-foreground">
              |
            </span>
          )}
          {l === locale ? (
            <span aria-current="page" lang={l} title={NAME[l]} className="font-semibold">
              {LABEL[l]}
            </span>
          ) : (
            <a
              href={switchLocalePath(pathname, l, search, hash)}
              lang={l}
              hrefLang={l}
              title={NAME[l]}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {LABEL[l]}
            </a>
          )}
        </span>
      ))}
    </nav>
  );
};
