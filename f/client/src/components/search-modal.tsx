import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/lib/store";
import type { Product } from "@shared/schema";

export default function SearchModal() {
  const { isSearchOpen, setSearchOpen, setActiveCategory } = useStore();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: searchResults = [] } = useQuery<Product[]>({
    queryKey: ["/api/products/search", searchQuery],
    enabled: searchQuery.length > 0,
    queryFn: async () => {
      const response = await fetch(`/api/products/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error('Search failed');
      return response.json();
    },
  });

  const handleSearchResultClick = (category: string) => {
    setSearchOpen(false);
    setActiveCategory(category);
    setSearchQuery("");
  };

  const handleClose = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          className="search-modal fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg p-8 max-w-md w-full mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-black font-montserrat font-bold text-xl">Search Products</h3>
              <button onClick={handleClose} className="text-black hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-black"
              autoFocus
            />
            
            <div className="mt-4 max-h-60 overflow-y-auto">
              {searchQuery && searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSearchResultClick(product.category)}
                    className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                  >
                    <h4 className="font-medium text-black">{product.name}</h4>
                    <p className="text-gray-600 text-sm">${product.price}</p>
                  </div>
                ))
              ) : searchQuery ? (
                <div className="p-2 text-gray-500">No products found</div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
