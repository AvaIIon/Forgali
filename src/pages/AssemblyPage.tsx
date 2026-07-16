import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Users, Drill, LayoutGrid, BookOpen, Clock } from "lucide-react";

const tips = [
  {
    icon: Users,
    title: "Bring a Second Pair of Hands",
    text: "Solid pine makes our furniture beautiful — and the boxes large and heavy. Two adults make moving and building far easier.",
  },
  {
    icon: Drill,
    title: "Charge the Power Drill",
    text: "Everything can be built with the included hand tools, but a power drill makes assembly noticeably faster.",
  },
  {
    icon: LayoutGrid,
    title: "Clear the Room First",
    text: "Give yourself plenty of floor space to lay out panels and hardware before you start building.",
  },
  {
    icon: BookOpen,
    title: "Read Before You Build",
    text: "Skim the illustrated instructions first to understand the design — it prevents the classic backwards-headboard restart.",
  },
  {
    icon: Clock,
    title: "Set Aside 2–3 Hours",
    text: "From nightstands to staircase bunks, assembly time varies. Most beds take a relaxed afternoon.",
  },
];

const AssemblyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Assembly Guide – Tips & Instructions | Forgali"
        description="Get ready to build: assembly tips for solid wood furniture, typical build times, and how to get replacement instructions for your model."
        path="/assembly"
      />
      <Header />

      <div className="bg-gradient-to-b from-[#f2f4f6] to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Assembly Guide
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Every Forgali piece arrives flat-packed with illustrated instructions and all
            the hardware you need. Here's how to make build day easy.
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-[#f2f4f6] rounded-lg p-6">
                <Icon className="w-8 h-8 text-[#4A647C] mb-4" />
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm">{text}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Need Your Instructions Again?</h2>
            <p className="text-muted-foreground mb-3">
              Printed step-by-step instructions are included in every box. If yours have
              gone missing, email{" "}
              <a href="mailto:support@forgali.com" className="text-primary hover:underline">support@forgali.com</a>{" "}
              with your order number and the product name, and we'll send you the PDF for
              your exact model — usually within 24 hours.
            </p>
            <p className="text-muted-foreground">
              Missing hardware or a damaged part? See{" "}
              <Link to="/returns" className="text-primary hover:underline">Returns &amp; Missing Parts</Link> —
              we'll ship replacements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Build It Safe</h2>
            <p className="text-muted-foreground">
              Follow the guardrail, mattress-height, and age recommendations in your
              instructions — they matter, especially for bunk and loft beds. Read more on
              our <Link to="/safety-standards" className="text-primary hover:underline">Safety Standards</Link> page.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AssemblyPage;
