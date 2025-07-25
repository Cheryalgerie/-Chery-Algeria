import { useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@shared/schema";

const sizes = ["S", "M", "L", "XL", "XXL"];

export default function ProductDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">المنتج غير موجود</h2>
          <Link href="/" className="text-gray-400 hover:text-white">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  const hasDiscount = product.originalPrice && parseFloat(product.originalPrice) > parseFloat(product.price);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-white hover:text-gray-400">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-montserrat font-bold">SABWEAR</h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-[600px] object-cover rounded-lg"
            />
          </motion.div>

          {/* Product Details */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">
                SABWEAR
              </p>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-bold">
                  DA {parseFloat(product.price).toLocaleString()}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-gray-400 line-through">
                    DA {parseFloat(product.originalPrice!).toLocaleString()}
                  </span>
                )}
              </div>

              <div className="text-sm text-gray-400 mb-6">
                <span>Taxes included. </span>
                <span className="underline cursor-pointer">Shipping</span>
                <span> calculated at checkout.</span>
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-medium mb-4">SIZE</h3>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full border-2 font-medium transition-all ${
                      selectedSize === size
                        ? "bg-white text-black border-white"
                        : "border-gray-600 text-white hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-medium mb-4">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-600 rounded flex items-center justify-center hover:border-gray-400 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="text-lg min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-600 rounded flex items-center justify-center hover:border-gray-400 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Size Guide */}
            <div>
              <button className="text-white underline hover:text-gray-300 transition-colors">
                SIZE GUIDE
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <motion.button
                onClick={() => setLocation(`/checkout/${id}`)}
                disabled={!selectedSize}
                className="w-full py-4 bg-white text-black font-bold text-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                شراء الآن
              </motion.button>
            </div>

            {/* Security Icons */}
            <div className="pt-6">
              <p className="text-center text-gray-400 mb-4">Secure checkout with</p>
              <div className="flex justify-center gap-3">
                <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  VISA
                </div>
                <div className="w-12 h-8 bg-red-500 rounded flex items-center justify-center">
                  <div className="w-6 h-6 bg-red-600 rounded-full"></div>
                </div>
                <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs">
                  AMEX
                </div>
                <div className="w-12 h-8 bg-blue-700 rounded flex items-center justify-center text-white text-xs">
                  PAY
                </div>
                <div className="w-12 h-8 bg-gray-600 rounded flex items-center justify-center text-white text-xs">
                  CIB
                </div>
                <div className="w-12 h-8 bg-orange-500 rounded flex items-center justify-center text-white text-xs">
                  CCP
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}