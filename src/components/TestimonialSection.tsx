import { Star } from "lucide-react";
import playhouseImg from "@/assets/playhouse.png";

export const TestimonialSection = () => {
  return (
    <section className="bg-secondary py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-12">Best Selling Products</h2>
        
        <div className="flex items-center gap-12">
          {/* Testimonial card */}
          <div className="flex-1 bg-background rounded-xl p-8 shadow-sm">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <h3 className="text-lg font-bold mb-3">Amazing quality bunk bed!</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              "We purchased the Full Over Full Bunk Bed for our boys and it exceeded all expectations! 
              The solid wood construction is incredibly sturdy and the assembly was straightforward. 
              Our kids absolutely love it. Highly recommend!"
            </p>
            <p className="text-sm text-muted-foreground mb-6">- Sarah M.</p>
            
            <div className="border-t pt-6">
              <p className="font-medium text-sm mb-1">
                Max and Lily Queen Over Queen Bunk Bed
              </p>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-primary font-bold">$1,214.41</span>
                <span className="text-muted-foreground line-through text-sm">$1,550.00</span>
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
              alt="Queen Over Queen Bunk Bed" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
