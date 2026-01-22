import { useEffect, useState } from "react";
import { Product } from "@/data/products";
import { loadProducts, applySale, removeSale } from "@/services/productService";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tag, Percent, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AdminSales = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  useEffect(() => {
    const updateProducts = () => {
      setProducts(loadProducts());
    };
    updateProducts();
    window.addEventListener("productsUpdated", updateProducts);
    return () => window.removeEventListener("productsUpdated", updateProducts);
  }, []);

  const handleSelectProduct = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedProducts.size === products.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(products.map((p) => p.id)));
    }
  };

  const handleApplySale = () => {
    if (selectedProducts.size === 0) {
      alert("Please select at least one product");
      return;
    }
    if (discountPercent <= 0 || discountPercent >= 100) {
      alert("Please enter a valid discount percentage (1-99)");
      return;
    }
    applySale(Array.from(selectedProducts), discountPercent);
    setIsDialogOpen(false);
    setSelectedProducts(new Set());
    setDiscountPercent(0);
  };

  const handleRemoveSale = () => {
    if (selectedProducts.size === 0) {
      alert("Please select at least one product");
      return;
    }
    if (confirm("Are you sure you want to remove the sale from selected products?")) {
      removeSale(Array.from(selectedProducts));
      setSelectedProducts(new Set());
    }
  };

  const getDiscountAmount = (product: Product) => {
    if (!product.originalPrice) return 0;
    return product.originalPrice - product.price;
  };

  const getDiscountPercent = (product: Product) => {
    if (!product.originalPrice) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  const productsOnSale = products.filter((p) => p.badge === "sale");

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Sales Management</h1>
            <p className="text-muted-foreground mt-2">
              Apply discounts and manage sales for your products
            </p>
          </div>
          <div className="flex gap-2">
            {selectedProducts.size > 0 && (
              <>
                <Button
                  variant="outline"
                  onClick={handleRemoveSale}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove Sale ({selectedProducts.size})
                </Button>
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="bg-[#4A647C] hover:bg-[#3A5066]"
                >
                  <Percent className="w-4 h-4 mr-2" />
                  Apply Discount ({selectedProducts.size})
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Products on Sale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productsOnSale.length}</div>
              <p className="text-xs text-muted-foreground">Active sales</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Selected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{selectedProducts.size}</div>
              <p className="text-xs text-muted-foreground">Products selected</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">In catalog</p>
            </CardContent>
          </Card>
        </div>

        {/* Products Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedProducts.size === products.length && products.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Original Price</TableHead>
                  <TableHead>Current Price</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => {
                  const isOnSale = product.badge === "sale";
                  const discount = getDiscountAmount(product);
                  const discountPercent = getDiscountPercent(product);
                  const isSelected = selectedProducts.has(product.id);

                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleSelectProduct(product.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        {product.originalPrice ? (
                          <span className="line-through text-muted-foreground">
                            ${product.originalPrice}
                          </span>
                        ) : (
                          <span>${product.price}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className={isOnSale ? "text-[#4A647C] font-medium" : ""}>
                          ${product.price}
                        </span>
                      </TableCell>
                      <TableCell>
                        {isOnSale && product.originalPrice ? (
                          <div className="flex items-center gap-2">
                            <span className="text-[#4A647C] font-medium">
                              -{discountPercent}%
                            </span>
                            <span className="text-sm text-muted-foreground">
                              (-${discount})
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {isOnSale ? (
                          <span className="px-2 py-1 text-xs rounded-full bg-[#4A647C]/10 text-[#4A647C]">
                            On Sale
                          </span>
                        ) : (
                          <span className="text-muted-foreground">Regular</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Apply Discount Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apply Discount</DialogTitle>
              <DialogDescription>
                Apply a percentage discount to {selectedProducts.size} selected product(s)
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="discount">Discount Percentage</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="discount"
                    type="number"
                    min="1"
                    max="99"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(Number(e.target.value))}
                    placeholder="Enter discount %"
                  />
                  <span className="text-muted-foreground">%</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter a percentage between 1 and 99
                </p>
              </div>
              <Alert>
                <Tag className="h-4 w-4" />
                <AlertDescription>
                  This will update the price of {selectedProducts.size} product(s) and mark them
                  with a "Sale" badge.
                </AlertDescription>
              </Alert>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleApplySale}
                className="bg-[#4A647C] hover:bg-[#3A5066]"
              >
                Apply Discount
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminSales;
