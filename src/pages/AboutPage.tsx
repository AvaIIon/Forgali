import { Link } from "@/i18n/router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuaranteeStrip } from "@/components/GuaranteeStrip";
import { Seo } from "@/components/Seo";
import { seoProps } from "@/lib/staticPageSeo";
import {
  TreePine,
  ShieldCheck,
  Weight,
  Bolt,
  Ruler,
  Leaf,
  Truck,
  PackageCheck,
  Wrench,
  RotateCcw,
  BadgeCheck,
  Mail,
  ArrowRight,
} from "lucide-react";
import { cdnImage, cdnSrcSet } from "@/lib/imageProxy";
import { useLocale } from "@/i18n/LocaleContext";
import type { MessageKey } from "@/i18n/messages";

// The About page is where both shoppers and AI answer engines go to decide what
// this company actually is — it was three short paragraphs and linked nowhere.
// Every number and claim below is grounded in the live catalog
// (src/data/product-meta.json) or in the policy pages it links to; nothing here
// invents a founding date, a team size, or a certification we can't point at.
// The copy itself lives in src/i18n/messages.ts under about.*; these arrays
// only pair each dictionary key with its icon, image and link.

const WHAT_WE_CARRY: Array<{ title: MessageKey; body: MessageKey; href: string; cta: MessageKey; image: string; alt: MessageKey }> = [
  {
    title: "about.carry1Title",
    body: "about.carry1Body",
    href: "/category/bunk-beds",
    cta: "about.carry1Cta",
    image:
      "https://cdn.shopify.com/s/files/1/0972/6492/6995/files/4cd2a236-190201-182__1.jpg?v=1773961974",
    alt: "about.carry1Alt",
  },
  {
    title: "about.carry2Title",
    body: "about.carry2Body",
    href: "/category/dining",
    cta: "about.carry2Cta",
    image:
      "https://cdn.shopify.com/s/files/1/0972/6492/6995/files/3400388400-155__1.jpg?v=1783608444",
    alt: "about.carry2Alt",
  },
  {
    title: "about.carry3Title",
    body: "about.carry3Body",
    href: "/category/accessories",
    cta: "about.carry3Cta",
    image:
      "https://cdn.shopify.com/s/files/1/0972/6492/6995/files/d46c26e8-max-and-lily-full-over-full-bunk-bed-with-storage-in-white.jpg?v=1773961859",
    alt: "about.carry3Alt",
  },
];

const BUILD_SPECS: Array<{ icon: typeof TreePine; title: MessageKey; body: MessageKey }> = [
  { icon: TreePine, title: "about.spec1Title", body: "about.spec1Body" },
  { icon: Leaf, title: "about.spec2Title", body: "about.spec2Body" },
  { icon: Weight, title: "about.spec3Title", body: "about.spec3Body" },
  { icon: Bolt, title: "about.spec4Title", body: "about.spec4Body" },
  { icon: ShieldCheck, title: "about.spec5Title", body: "about.spec5Body" },
  { icon: Ruler, title: "about.spec6Title", body: "about.spec6Body" },
];

const HOW_IT_WORKS: Array<{ icon: typeof Truck; title: MessageKey; body: MessageKey; link: { to: string; label: MessageKey } }> = [
  { icon: Truck, title: "about.how1Title", body: "about.how1Body", link: { to: "/shipping", label: "about.how1Link" } },
  { icon: PackageCheck, title: "about.how2Title", body: "about.how2Body", link: { to: "/shipping", label: "about.how2Link" } },
  { icon: Wrench, title: "about.how3Title", body: "about.how3Body", link: { to: "/assembly", label: "about.how3Link" } },
  { icon: RotateCcw, title: "about.how4Title", body: "about.how4Body", link: { to: "/returns", label: "about.how4Link" } },
  { icon: BadgeCheck, title: "about.how5Title", body: "about.how5Body", link: { to: "/warranty", label: "about.how5Link" } },
];

const AboutPage = () => {
  const { t } = useLocale();
  return (
    <div className="min-h-screen bg-background">
      <Seo
        {...seoProps("/about")}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": "https://www.forgali.com/about#webpage",
          url: "https://www.forgali.com/about",
          name: "About Forgali",
          description:
            "Forgali is an online-only Canadian retailer of solid wood kids' beds and Plank & Beam dining and living furniture, shipping free across Canada.",
          isPartOf: { "@id": "https://www.forgali.com/#website" },
          // References the Organization declared once in index.html rather than
          // redeclaring it — same @id, so the graph merges instead of conflicting.
          about: { "@id": "https://www.forgali.com/#organization" },
        }}
      />
      <Header />

      <div className="bg-gradient-to-b from-brand-tint to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("about.title")}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            {t("about.lead")}
          </p>
        </div>
      </div>

      <GuaranteeStrip />

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="max-w-rail mx-auto grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <h2 className="text-3xl font-bold mb-4">{t("about.storyTitle")}</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                {t("about.story1a")}{" "}
                <strong className="text-foreground font-semibold">
                  Forgali Design Centre
                </strong>
                {t("about.story1b")}
              </p>
              <p>
                {t("about.story2")}
              </p>
              <p>
                {t("about.story3")}
              </p>
            </div>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-brand-tint">
            <img
              src="https://cdn.shopify.com/s/files/1/0972/6492/6995/files/62468465-180427-002__1.jpg?v=1773962209"
              alt={t("about.storyAlt")}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* What We Carry */}
      <section className="border-y border-border bg-brand-tint/60 py-16 px-4">
        <div className="max-w-rail mx-auto">
          <div className="max-w-2xl mb-10">
            <h2 className="text-3xl font-bold mb-3">{t("about.carryTitle")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("about.carryLead")}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {WHAT_WE_CARRY.map((c) => (
              <div
                key={c.title}
                className="flex flex-col overflow-hidden rounded-xl bg-background border border-border"
              >
                <div className="aspect-[16/10] overflow-hidden bg-brand-tint">
                  <img
                    src={cdnImage(c.image, 700)}
                    srcSet={cdnSrcSet(c.image, [400, 700, 1000])}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    alt={t(c.alt)}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold mb-2">{t(c.title)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {t(c.body)}
                  </p>
                  <Link
                    to={c.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-accent hover:underline"
                  >
                    {t(c.cta)}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Build quality */}
      <section className="py-16 px-4">
        <div className="max-w-rail mx-auto">
          <div className="max-w-2xl mb-10">
            <h2 className="text-3xl font-bold mb-3">
              {t("about.buildTitle")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("about.buildLead")}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BUILD_SPECS.map((s) => (
              <div key={s.title} className="rounded-lg bg-brand-tint p-6">
                <s.icon className="w-8 h-8 text-brand mb-3" />
                <h3 className="font-bold mb-2">{t(s.title)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(s.body)}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            {t("about.safetyMore1")}{" "}
            <Link
              to="/safety-standards"
              className="text-brand-accent hover:underline font-medium"
            >
              {t("footer.safetyStandards")}
            </Link>
            {t("about.safetyMore2")}
          </p>
        </div>
      </section>

      {/* How buying from us works */}
      <section className="border-t border-border bg-secondary/20 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-3">{t("about.howTitle")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("about.howLead")}
            </p>
          </div>
          <ol className="space-y-6">
            {HOW_IT_WORKS.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10">
                  <step.icon className="h-6 w-6 text-brand" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">
                    <span className="text-muted-foreground/60 mr-2">
                      {i + 1}.
                    </span>
                    {t(step.title)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(step.body)}
                  </p>
                  <Link
                    to={step.link.to}
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand-accent hover:underline"
                  >
                    {t(step.link.label)}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Where we are / how to reach us */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-3">{t("about.findTitle")}</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {t("about.findBody")}
          </p>

          <div className="rounded-lg bg-brand-tint p-6 mb-6">
            <Mail className="w-8 h-8 text-brand mb-3" />
            <h3 className="font-bold text-lg mb-1">
              <a
                href="mailto:daniel@forgali.com"
                className="text-brand-accent hover:underline"
              >
                daniel@forgali.com
              </a>
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("about.respond")}{" "}
              <Link to="/contact" className="text-brand-accent hover:underline">
                {t("about.sendMessage")}
              </Link>
            </p>
          </div>

          {/* Legacy directory listings still surface the closed Design Centre
              showroom and dead phone numbers in AI answers and local search.
              Stating it plainly here, on the page those systems read first,
              matches /contact, /faqs and public/llms.txt. */}
          <div className="rounded-lg border-l-4 border-brand bg-brand-tint p-6">
            <p className="font-bold mb-2">{t("about.noteTitle")}</p>
            <p className="text-sm text-muted-foreground">
              {t("about.noteBody")}{" "}
              <a
                href="mailto:daniel@forgali.com"
                className="text-brand-accent hover:underline"
              >
                daniel@forgali.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-border bg-brand-tint/60 py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            {t("brand.title")}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {t("about.ctaBody")}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/category/bunk-beds">
              <button className="rounded-full bg-brand px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-hover">
                {t("about.shopBeds")}
              </button>
            </Link>
            <Link to="/category/dining">
              <button className="rounded-full bg-background border border-border px-8 py-3 text-sm font-medium transition-colors hover:bg-brand-tint-hover">
                {t("hero.ctaDining")}
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
