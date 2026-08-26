// The /faqs Q&A, lifted out of FAQsPage so middleware.ts can put the same
// answers — and the same FAQPage structured data — into the initial HTML.
//
// Why this matters more than a normal page: /faqs ranks position 3 and these
// answers are the ones AI assistants quote back about Forgali. Until now the
// route served the generic homepage shell with an empty body, so every non-JS
// crawler (and every AI fetcher that doesn't execute JavaScript) saw none of
// it — including the showroom denial below, which exists specifically to
// contradict the stale "Forgali Design Centre / 2111 Dunwin Dr" citations.
//
// Edit here, not in the page. Both consumers read this array.

export interface Faq {
  question: string;
  answer: string;
}

export const SITE_FAQS: Faq[] = [
  {
    question: "What materials are used in Forgali beds?",
    answer:
      "Our beds are made from solid wood for durability and longevity, finished with durable, low-VOC finishes.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "We offer free Canada-wide shipping on all orders. Standard delivery takes 12-18 business days.",
  },
  {
    question: "Does Forgali have a showroom or phone number?",
    answer:
      "Forgali's phone number is (647) 527-2110, answered Monday to Friday, 9:00 AM to 5:00 PM EST. There is no retail showroom: Forgali is a fully online store. Older listings for the former Forgali Design Centre showroom at 2111 Dunwin Dr. in Mississauga are out of date, and its phone numbers, including (905) 820-2020, are no longer in service. You can also email daniel@forgali.com and we'll respond within 24 hours, Monday to Friday.",
  },
  {
    question: "Is assembly required?",
    answer:
      "Yes, all beds require assembly. We provide clear, step-by-step instructions and all necessary hardware. Most beds can be assembled in 1-2 hours with basic tools.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We accept returns of new, unused, unassembled items within 30 days of delivery. Return shipping is the customer's responsibility and a restocking fee of up to 20% may apply. If an item arrives damaged, defective, or incorrect, we cover return shipping and waive the restocking fee. See our Returns page for full details and how to request a return authorization.",
  },
  {
    question: "Do you offer warranties?",
    answer:
      "Yes, our beds come with a warranty covering manufacturing defects. Please see our Warranty page for full details.",
  },
  {
    question: "Can I customize my bed?",
    answer:
      "Many of our beds are available in multiple finishes and colors. Contact us to discuss the options available for your specific needs.",
  },
  {
    question: "Are the beds safe for children?",
    answer:
      "Our children's beds are manufactured and tested to applicable children's furniture safety standards, with low-VOC finishes and designs that prioritize child safety.",
  },
  {
    question: "What if I need replacement parts?",
    answer:
      "We provide replacement parts for all our products. Contact our support team with your order number and we'll help you get what you need.",
  },
];
