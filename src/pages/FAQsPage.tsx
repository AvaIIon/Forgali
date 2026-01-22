import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQsPage = () => {
  const faqs = [
    {
      question: "What materials are used in Forgali beds?",
      answer: "All Forgali beds are made from premium solid wood, ensuring durability and longevity. We use sustainably sourced materials and non-toxic finishes safe for children."
    },
    {
      question: "How long does shipping take?",
      answer: "We offer free Canada-wide shipping on all orders. Standard delivery takes 5-10 business days. Express shipping options are available at checkout."
    },
    {
      question: "Is assembly required?",
      answer: "Yes, all beds require assembly. We provide clear, step-by-step instructions and all necessary hardware. Most beds can be assembled in 1-2 hours with basic tools."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unused items in original packaging. Custom or personalized items are not eligible for return. Please contact us for return authorization."
    },
    {
      question: "Do you offer warranties?",
      answer: "Yes, all Forgali beds come with a comprehensive warranty covering manufacturing defects. Please see our Warranty page for full details."
    },
    {
      question: "Can I customize my bed?",
      answer: "Many of our beds are available in multiple finishes and colors. Contact us to discuss custom options for your specific needs."
    },
    {
      question: "Are the beds safe for children?",
      answer: "Absolutely. All our beds meet or exceed Canadian safety standards. We use non-toxic finishes and ensure all designs prioritize child safety."
    },
    {
      question: "What if I need replacement parts?",
      answer: "We provide replacement parts for all our products. Contact our support team with your order number and we'll help you get what you need."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
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
