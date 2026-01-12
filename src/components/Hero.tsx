import heroImage from "@/assets/hero-image.png";

export const Hero = () => {
  return (
    <section className="relative w-full h-[500px] overflow-hidden">
      <img 
        src={heroImage} 
        alt="Kids playing in kitchen" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      <div className="absolute bottom-16 left-16">
        <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded mb-2">
          TRANSFORM THEIR ROOM
        </span>
        <h2 className="text-white text-4xl font-bold mb-6">
          Solid Wood Beds Parents Trust, and Kids Love
        </h2>
        <div className="flex gap-3">
          <button className="bg-white text-foreground px-6 py-2.5 rounded-full text-sm font-medium border border-foreground hover:bg-gray-100 transition-colors">
            shop deals
          </button>
          <button className="bg-foreground text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors">
            shop best sellers
          </button>
        </div>
      </div>
    </section>
  );
};
