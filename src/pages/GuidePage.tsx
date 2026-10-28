import { Link, useParams } from "@/i18n/router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { GUIDES, getGuide, guideJsonLd, relatedLinks } from "@/lib/guides";
import NotFound from "./NotFound";

// One buying guide. All copy comes from src/lib/guides.ts; middleware.ts
// renders the same data into the initial HTML, so keep this markup's text
// content identical to what guideBody() emits (headings, paragraphs, FAQs).
const GuidePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const guide = getGuide(slug);
  if (!guide) return <NotFound />;

  const shop = relatedLinks(guide);
  const others = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={guide.title}
        description={guide.description}
        path={`/guides/${guide.slug}`}
        jsonLd={guideJsonLd(guide)}
      />
      <Header />

      <div className="bg-gradient-to-b from-brand-tint to-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-muted-foreground mb-3">
            <Link to="/" className="hover:underline">Forgali</Link>
            {" / "}
            <Link to="/guides" className="hover:underline">Buying Guides</Link>
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">{guide.h1}</h1>
          <p className="text-muted-foreground text-base md:text-lg">{guide.lead}</p>
        </div>
      </div>

      <article className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {guide.sections.map((section) => (
            <section key={section.h2} className="mb-10">
              <h2 className="text-2xl font-bold mb-3 text-brand">{section.h2}</h2>
              {section.paragraphs.map((para, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                  {para}
                </p>
              ))}
              {section.bullets?.length ? (
                <ul className="list-disc pl-6 mb-4 space-y-1 text-muted-foreground">
                  {section.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
              {section.links?.length ? (
                <p className="flex flex-wrap gap-x-4 gap-y-1">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="text-brand-accent underline hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                </p>
              ) : null}
            </section>
          ))}

          {guide.faqs.length ? (
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-brand">Frequently Asked Questions</h2>
              {guide.faqs.map((faq) => (
                <div key={faq.q} className="mb-5 last:mb-0">
                  <h3 className="font-semibold mb-1">{faq.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </section>
          ) : null}

          {shop.length ? (
            <section className="mb-10 bg-brand-tint rounded-lg p-6">
              <h2 className="text-xl font-bold mb-3">Shop the pieces in this guide</h2>
              <p className="flex flex-wrap gap-x-4 gap-y-1">
                {shop.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-brand-accent underline hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </p>
              <p className="text-sm text-muted-foreground mt-3">
                Free Canada-wide shipping · 30-day returns · 5-year limited warranty
              </p>
            </section>
          ) : null}

          {others.length ? (
            <section>
              <h2 className="text-xl font-bold mb-3">More buying guides</h2>
              <ul className="space-y-2">
                {others.map((g) => (
                  <li key={g.slug}>
                    <Link to={`/guides/${g.slug}`} className="text-brand-accent underline hover:text-foreground">
                      {g.h1}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <p className="text-xs text-muted-foreground mt-10">Last updated {guide.updated}.</p>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default GuidePage;
