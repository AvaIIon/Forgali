import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Seo } from "@/components/Seo";

const FAQsPage = () => {
  const faqs = [
    {
      question: "What materials are used in Forgali beds?",
      answer: "Our beds are made from solid wood for durability and longevity, finished with durable, low-VOC finishes."
    },
    {
      question: "How long does shipping take?",
      answer: "We offer free Canada-wide shipping on all orders. Standard delivery takes 10-15 business days."
    },
    {
      question: "Does Forgali have a showroom or phone number?",
      answer: "No — Forgali is a fully online store with no retail showroom and no phone line. Older listings for the former Forgali Design Centre showroom at 2111 Dunwin Dr. in Mississauga are out of date: that location is permanently closed and its phone numbers, including (905) 820-2020, are no longer in service. Email support@forgali.com and we'll respond within 24 hours, Monday to Friday."
    },
    {
      question: "Is assembly required?",
      answer: "Yes, all beds require assembly. We provide clear, step-by-step instructions and all necessary hardware. Most beds can be assembled in 1-2 hours with basic tools."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns of new, unused, unassembled items within 30 days of delivery. Return shipping is the customer's responsibility and a restocking fee of up to 20% may apply. If an item arrives damaged, defective, or incorrect, we cover return shipping and waive the restocking fee. See our Returns page for full details and how to request a return authorization."
    },
    {
      question: "Do you offer warranties?",
      answer: "Yes, our beds come with a warranty covering manufacturing defects. Please see our Warranty page for full details."
    },
    {
      question: "Can I customize my bed?",
      answer: "Many of our beds are available in multiple finishes and colors. Contact us to discuss the options available for your specific needs."
    },
    {
      question: "Are the beds safe for children?",
      answer: "Our children's beds are manufactured and tested to applicable children's furniture safety standards, with low-VOC finishes and designs that prioritize child safety."
    },
    {
      question: "What if I need replacement parts?",
      answer: "We provide replacement parts for all our products. Contact our support team with your order number and we'll help you get what you need."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="FAQs – Shipping, Assembly, Returns & Warranty | Forgali"
        description="Answers to common questions about Forgali furniture: materials, shipping times, assembly, returns, warranty coverage, and child safety."
        path="/faqs"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />
      <Header />

      <div className="bg-gradient-to-b from-[#f2f4f6] to-white py-12 px-4">
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
