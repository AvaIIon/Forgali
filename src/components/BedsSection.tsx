import independentImg from "@/assets/independent-sleepers.png";
import sharedImg from "@/assets/shared-spaces.png";

export const BedsSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10">
          Why Choose Forgali?
        </h2>
        
        <div className="grid grid-cols-2 gap-8">
          {/* Solid Wood Construction */}
          <div className="text-center">
            <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4">
              <img 
                src={independentImg} 
                alt="Solid Wood Construction" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold mb-2">Solid Wood Construction</h3>
            <p className="text-muted-foreground text-sm mb-4 max-w-sm mx-auto">
              Built to last with premium solid wood materials. Safety tested and warrantied for your peace of mind.
            </p>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
              Shop Bunk Beds
            </button>
          </div>
          
          {/* Easy Assembly */}
          <div className="text-center">
            <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4">
              <img 
                src={sharedImg} 
                alt="Easy Assembly" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold mb-2">Easy Assembly & Free Shipping</h3>
            <p className="text-muted-foreground text-sm mb-4 max-w-sm mx-auto">
              Clear instructions for hassle-free setup. Free Canada-wide shipping on all orders.
            </p>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
              Shop Loft Beds
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
