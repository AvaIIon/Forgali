import { Link } from "@/i18n/router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { GUIDES, GUIDES_INDEX_SEO } from "@/lib/guides";

// /guides — index of the buying guides. Copy from src/lib/guides.ts; the
// middleware renders the same list into the initial HTML.
const GuidesIndexPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={GUIDES_INDEX_SEO.title}
        description={GUIDES_INDEX_SEO.description}
        path={GUIDES_INDEX_SEO.path}
      />
      <Header />

      <div className="bg-gradient-to-b from-brand-tint to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {GUIDES_INDEX_SEO.h1}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            {GUIDES_INDEX_SEO.lead}
          </p>
        </div>
      </div>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {GUIDES.map((g) => (
            <Link
              key={g.slug}
              to={`/guides/${g.slug}`}
              className="block bg-brand-tint rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <h2 className="font-bold text-lg mb-2 text-brand">{g.h1}</h2>
              <p className="text-muted-foreground text-sm">{g.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GuidesIndexPage;
