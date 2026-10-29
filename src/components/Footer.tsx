import { Link } from "@/i18n/router";
import { useLocale } from "@/i18n/LocaleContext";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export const Footer = () => {
  const { t } = useLocale();
  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="max-w-rail mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex flex-col">
            <img
              src="/forgali-logo-light.png"
              alt="Forgali"
              className="h-8 w-auto"
              width={1670}
              height={335}
            />
            <span className="text-[10px] text-background/60 tracking-[0.2em] mt-1">
              {t("common.tagline")}
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4">{t("footer.shop")}</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/category/bunk-beds" className="hover:text-background">{t("nav.bunkBeds")}</Link></li>
              <li><Link to="/category/loft-beds" className="hover:text-background">{t("nav.loftBeds")}</Link></li>
              <li><Link to="/category/single-beds" className="hover:text-background">{t("nav.singleBeds")}</Link></li>
              <li><Link to="/category/dining" className="hover:text-background">{t("nav.dining")}</Link></li>
              <li><Link to="/category/living" className="hover:text-background">{t("nav.living")}</Link></li>
              <li><Link to="/category/accessories" className="hover:text-background">{t("footer.accessories")}</Link></li>
              <li><Link to="/smart-deals" className="hover:text-background">{t("nav.smartDeals")}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">{t("footer.support")}</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/contact" className="hover:text-background">{t("footer.contactUs")}</Link></li>
              <li><Link to="/faqs" className="hover:text-background">{t("footer.faqs")}</Link></li>
              <li><Link to="/shipping" className="hover:text-background">{t("footer.shippingInfo")}</Link></li>
              <li><Link to="/returns" className="hover:text-background">{t("footer.returns")}</Link></li>
              <li><Link to="/assembly" className="hover:text-background">{t("footer.assemblyGuide")}</Link></li>
              <li><Link to="/guides" className="hover:text-background">{t("footer.buyingGuides")}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">{t("footer.company")}</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/about" className="hover:text-background">{t("footer.aboutForgali")}</Link></li>
              <li><Link to="/warranty" className="hover:text-background">{t("footer.warranty")}</Link></li>
              <li><Link to="/safety-standards" className="hover:text-background">{t("footer.safetyStandards")}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">{t("footer.followUs")}</h4>
            {/* Static brand marks — no profile URLs exist yet, so don't make
                them look clickable (trust-eroding dead links) */}
            <div className="flex gap-4">
              <Facebook className="w-5 h-5 text-background/70" />
              <Instagram className="w-5 h-5 text-background/70" />
              <Twitter className="w-5 h-5 text-background/70" />
              <Youtube className="w-5 h-5 text-background/70" />
            </div>
          </div>
        </div>
        
        <div className="border-t border-background/20 pt-8 text-center text-sm text-background/50 space-y-2">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link to="/privacy" className="hover:text-background">{t("footer.privacy")}</Link>
            <span aria-hidden>·</span>
            <Link to="/terms" className="hover:text-background">{t("footer.terms")}</Link>
          </div>
          <p>{t("footer.copyright")}</p>
          <p>{t("footer.poweredBy")}</p>
        </div>
      </div>
    </footer>
  );
};
