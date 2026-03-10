import { ProductCard } from "@/components/product/ProductCard";
import { SearchAndFilter } from "@/components/product/SearchAndFilter";
import { useApp } from "@/context/AppContext";
import { useProducts } from "@/hooks/use-products";

export default function ProductsPage() {
  const { state } = useApp();
  const products = useProducts();

  const filteredProducts = products.filter((product) => {
    // Search filter
    const matchesSearch =
      product.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(state.searchTerm.toLowerCase()) ||
      product.tags.some((tag) => tag.includes(state.searchTerm));

    // Category filter
    const matchesCategory =
      state.selectedCategory === "all" ||
      product.categories.includes(state.selectedCategory);

    // Price filter
    const matchesPrice =
      product.price >= state.priceRange[0] &&
      product.price <= state.priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-foreground mb-8 text-center">
          جميع المنتجات
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SearchAndFilter />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-muted-foreground">
                عرض{" "}
                <span className="font-bold text-primary">
                  {filteredProducts.length}
                </span>{" "}
                منتج
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">
                  لا توجد منتجات تطابق البحث
                </p>
                <p className="text-sm text-muted-foreground">
                  جرب تغيير الفلاتر أو البحث عن شيء آخر
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
