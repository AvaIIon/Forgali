import { Link } from "react-router-dom";

// Helper to get proxied image URL
const getProxiedImage = (url: string): string => {
  if (!url || !url.startsWith('http')) return url;
  if (import.meta.env.DEV) {
    try {
      const urlObj = new URL(url);
      return `/api/images${urlObj.pathname}${urlObj.search}`;
    } catch {
      return url;
    }
  }
  return url;
};

export const BedsSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10">
          Why Choose Forgali?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Solid Wood Construction */}
          <div className="text-center">
            <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4">
              <img 
                src={getProxiedImage("https://bedsmart.ca/wp-content/uploads/2022/06/2875.jpg")} 
                alt="Solid Wood Construction" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold mb-2">Solid Wood Construction</h3>
            <p className="text-muted-foreground text-sm mb-4 max-w-sm mx-auto">
              Built to last with premium solid wood materials. Safety tested and warrantied for your peace of mind.
            </p>
            <Link to="/category/bunk-beds">
              <button className="bg-[#4A647C] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#3A5066] transition-colors">
                Shop Bunk Beds
              </button>
            </Link>
          </div>
          
          {/* Easy Assembly */}
          <div className="text-center">
            <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4">
              <img 
                src={getProxiedImage("https://bedsmart.ca/wp-content/uploads/2024/05/uber-slam-ns__5-1024x1024.jpg")} 
                alt="Easy Assembly" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold mb-2">Easy Assembly & Free Shipping</h3>
            <p className="text-muted-foreground text-sm mb-4 max-w-sm mx-auto">
              Clear instructions for hassle-free setup. Free Canada-wide shipping on all orders.
            </p>
            <Link to="/category/loft-beds">
              <button className="bg-[#4A647C] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#3A5066] transition-colors">
                Shop Loft Beds
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
