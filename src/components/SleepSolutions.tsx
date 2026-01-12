import { ArrowRight } from "lucide-react";
import bunkBedsImg from "@/assets/bunk-beds.png";
import floorBedsImg from "@/assets/floor-beds.png";

const categories = [
  { name: "Bunk Beds", image: bunkBedsImg },
  { name: "Single Beds", image: bunkBedsImg },
  { name: "Loft Beds", image: floorBedsImg },
  { name: "Floor Beds", image: floorBedsImg },
];

export const SleepSolutions = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10">
          Sleep Solutions You've Been Searching For!
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.name} className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden rounded-lg mb-3">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex items-center gap-2 justify-start">
                <span className="text-sm font-medium">{category.name}</span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
