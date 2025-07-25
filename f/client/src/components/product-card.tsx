import { Link } from "wouter";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.originalPrice && parseFloat(product.originalPrice) > parseFloat(product.price);
  const discountPercentage = hasDiscount 
    ? Math.round(((parseFloat(product.originalPrice!) - parseFloat(product.price)) / parseFloat(product.originalPrice!)) * 100)
    : 0;

  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="product-card overflow-hidden cursor-pointer">
        {product.onSale && (
          <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-bold z-10">
            {discountPercentage > 0 ? `${discountPercentage}% OFF` : 'SALE'}
          </div>
        )}
        
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-80 object-cover"
        />
        
        <div className="p-4">
          <h3 className="text-black font-medium text-lg mb-2">
            {product.name}
          </h3>
          
          <div className="text-gray-600 mb-3">
            <span className="text-lg font-bold text-black">
              ${product.price}
            </span>
            {hasDiscount && (
              <span className="ml-2 line-through text-sm">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
