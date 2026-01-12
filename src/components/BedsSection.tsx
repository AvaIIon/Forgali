import independentImg from "@/assets/independent-sleepers.png";
import sharedImg from "@/assets/shared-spaces.png";

export const BedsSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10">
          Beds That Fit Your Family's Setup
        </h2>
        
        <div className="grid grid-cols-2 gap-8">
          {/* Independent Sleepers */}
          <div className="text-center">
            <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4">
              <img 
                src={independentImg} 
                alt="Independent Sleepers" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold mb-2">Independent Sleepers</h3>
            <p className="text-muted-foreground text-sm mb-4 max-w-sm mx-auto">
              Give them a space that's all theirs — from first big-kid floor beds to stylish singles, daybeds, and dreamy canopies.
            </p>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
              Shop Now
            </button>
          </div>
          
          {/* Shared Spaces */}
          <div className="text-center">
            <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4">
              <img 
                src={sharedImg} 
                alt="Shared Spaces" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold mb-2">Shared Spaces</h3>
            <p className="text-muted-foreground text-sm mb-4 max-w-sm mx-auto">
              Bunks, lofts, and trundles designed for siblings, sleepovers, and all the extra fun that comes with sharing.
            </p>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
