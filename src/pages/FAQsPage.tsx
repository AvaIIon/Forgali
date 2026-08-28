import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Seo } from "@/components/Seo";
import { seoProps } from "@/lib/staticPageSeo";
import { SITE_FAQS } from "@/lib/siteFaqs";
import { faqPageJsonLd } from "@/lib/categorySeo";

const FAQsPage = () => {
  const faqs = SITE_FAQS;

  return (
    <div className="min-h-screen bg-background">
      <Seo
        {...seoProps("/faqs")}
        // Same helper middleware.ts uses, so the schema in the initial HTML and
        // the schema after hydration are byte-identical.
        jsonLd={faqPageJsonLd(faqs.map((f) => ({ q: f.question, a: f.answer })))}
      />
      <Header />

      <div className="bg-gradient-to-b from-brand-tint to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Find answers to common questions about our products, shipping, and policies.
          </p>
        </div>
      </div>
      
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-background border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default FAQsPage;
