import { Link, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo title="Page Not Found | Forgali" path={location.pathname} noindex />
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-24 px-4 text-center">
        <p className="text-6xl font-bold text-brand">404</p>
        <h1 className="mt-4 text-2xl font-bold">We couldn't find that page</h1>
        <p className="mt-2 text-muted-foreground max-w-md">
          The link may be broken or the page may have moved — but there's plenty more to explore.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Button asChild>
            {/* client-side nav (not a full reload) so the SPA state survives */}
            <Link to="/">Back to Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/category/dining">Shop Dining</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/category/bedroom">Shop Bedroom</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
