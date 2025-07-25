import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";
import LandingOverlay from "@/components/landing-overlay";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import CategoryNavigation from "@/components/category-navigation";
import ProductGrid from "@/components/product-grid";
import SearchModal from "@/components/search-modal";
import HeroSection from "@/components/hero-section";

export default function Home() {
  const { isLandingVisible, setLandingVisible, isSidebarOpen, setSidebarOpen } = useStore();

  useEffect(() => {
    // Auto-hide landing after 3 seconds
    const timer = setTimeout(() => {
      setLandingVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [setLandingVisible]);

  return (
    <div className="min-h-screen">
      <AnimatePresence>
        {isLandingVisible && <LandingOverlay />}
      </AnimatePresence>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <Sidebar />
      <SearchModal />

      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLandingVisible ? 0 : 1 }}
        transition={{ delay: 0.5 }}
      >
        <Header />
        <CategoryNavigation />
        <ProductGrid />

        {/* Footer */}
        <footer className="text-center py-8 text-gray-500 text-sm border-t border-gray-800 bg-black">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
              <div>
                <h4 className="text-white font-bold mb-4">Customer Service</h4>
                <div className="space-y-2">
                  <p>Contact Us</p>
                  <p>Size Guide</p>
                  <p>Returns & Exchanges</p>
                </div>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">About SABWEAR</h4>
                <div className="space-y-2">
                  <p>Our Story</p>
                  <p>Careers</p>
                  <p>Press</p>
                </div>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Follow Us</h4>
                <div className="flex justify-center space-x-4">
                  <i className="fab fa-instagram text-xl hover:text-white cursor-pointer"></i>
                  <i className="fab fa-facebook text-xl hover:text-white cursor-pointer"></i>
                  <i className="fab fa-twitter text-xl hover:text-white cursor-pointer"></i>
                </div>
              </div>
            </div>
            <p>&copy; 2024 SABWEAR. All rights reserved. Premium Fashion Redefined.</p>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}
