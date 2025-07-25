import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/lib/store";
import ProductCard from "@/components/product-card";
import type { Product } from "@shared/schema";

export default function ProductGrid() {
  const { activeCategory } = useStore();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: activeCategory === "all" ? ["/api/products"] : ["/api/products/category", activeCategory],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="products grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8 max-w-7xl mx-auto">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
