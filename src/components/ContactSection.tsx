import { Headphones } from "lucide-react";

export const ContactSection = () => {
  return (
    <section className="bg-secondary py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-background rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Headphones className="w-6 h-6 text-foreground" />
            <h3 className="text-lg font-bold">Contact Us</h3>
          </div>
          
          <p className="text-muted-foreground text-sm mb-6">
            From bedtime to playtime, our friendly team is here to make sure everything goes smoothly. 
            Reach out anytime during business hours M-F, 9 AM - 6 PM EST!
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-primary text-primary-foreground py-3 rounded-full font-medium hover:bg-primary/90 transition-colors">
              Chat Now
            </button>
            <button className="border border-foreground text-foreground py-3 rounded-full font-medium hover:bg-foreground hover:text-background transition-colors">
              Call Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
