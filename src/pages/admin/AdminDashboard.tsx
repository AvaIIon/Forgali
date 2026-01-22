import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadProducts } from "@/services/productService";
import { Product } from "@/data/products";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, DollarSign, Tag, TrendingDown } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    productsOnSale: 0,
    totalRevenue: 0,
    averagePrice: 0,
  });

  useEffect(() => {
    const updateProducts = () => {
      const loadedProducts = loadProducts();
      setProducts(loadedProducts);
      
      const onSale = loadedProducts.filter((p) => p.badge === "sale").length;
      const totalRevenue = loadedProducts.reduce((sum, p) => sum + p.price, 0);
      const avgPrice = loadedProducts.length > 0 ? totalRevenue / loadedProducts.length : 0;

      setStats({
        totalProducts: loadedProducts.length,
        productsOnSale: onSale,
        totalRevenue,
        averagePrice: Math.round(avgPrice),
      });
    };

    updateProducts();
    window.addEventListener("productsUpdated", updateProducts);

    return () => {
      window.removeEventListener("productsUpdated", updateProducts);
    };
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome to your admin dashboard. Manage your products and sales from here.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                Products in your store
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Sale</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.productsOnSale}</div>
              <p className="text-xs text-muted-foreground">
                Products currently on sale
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Price</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.averagePrice}</div>
              <p className="text-xs text-muted-foreground">
                Average product price
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Total inventory value
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks for managing your store
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link
                to="/admin/products"
                className="block w-full text-left px-4 py-3 rounded-lg border hover:bg-muted transition-colors"
              >
                <div className="font-medium">Manage Products</div>
                <div className="text-sm text-muted-foreground">
                  Add, edit, or remove products
                </div>
              </Link>
              <Link
                to="/admin/sales"
                className="block w-full text-left px-4 py-3 rounded-lg border hover:bg-muted transition-colors"
              >
                <div className="font-medium">Manage Sales</div>
                <div className="text-sm text-muted-foreground">
                  Apply discounts and promotions
                </div>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest changes to your store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Activity tracking coming soon...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
