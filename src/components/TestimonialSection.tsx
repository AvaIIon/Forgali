import { Star } from "lucide-react";
import playhouseImg from "@/assets/playhouse.png";

export const TestimonialSection = () => {
  return (
    <section className="bg-secondary py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-12">Gifts to Rave About</h2>
        
        <div className="flex items-center gap-12">
          {/* Testimonial card */}
          <div className="flex-1 bg-background rounded-xl p-8 shadow-sm">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <h3 className="text-lg font-bold mb-3">My daughters love this playhouse!</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              "I bought this playhouse for my two young daughters for an early Christmas present. 
              The happy screams of 'Wow, this is awesome' from my daughter made it all worth it! 
              They've really enjoyed it. Thanks so much!!!"
            </p>
            <p className="text-sm text-muted-foreground mb-6">- Ang</p>
            
            <div className="border-t pt-6">
              <p className="font-medium text-sm mb-1">
                Cozy Escape Playhouse - Navy - Installation Available
              </p>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-primary font-bold">$1,099.99</span>
                <span className="text-muted-foreground line-through text-sm">$1,399.99</span>
              </div>
              <button className="border border-foreground rounded-full px-6 py-2 text-sm font-medium hover:bg-foreground hover:text-background transition-colors">
                shop now
              </button>
            </div>
          </div>
          
          {/* Product image */}
          <div className="flex-1">
            <img 
              src={playhouseImg} 
              alt="Cozy Escape Playhouse" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
