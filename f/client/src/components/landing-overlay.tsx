import { motion } from "framer-motion";
import { useStore } from "@/lib/store";

export default function LandingOverlay() {
  const { setLandingVisible } = useStore();

  const handleShopNow = () => {
    setLandingVisible(false);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6">
        <div className="flex items-center justify-between">
          <div className="w-6"></div> {/* Spacer for center alignment */}
          <motion.h1 
            className="text-3xl font-bold text-black tracking-wider"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            SABWEAR
            <sup className="text-xs">®</sup>
          </motion.h1>
          <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center">
            <span className="text-black text-sm font-bold">0</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
        {/* Model Figure */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative flex justify-center order-2 lg:order-1"
        >
          <div className="relative">
            {/* Model silhouette with styling similar to image */}
            <div className="relative w-80 h-[600px]">
              {/* Head */}
              <motion.div 
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gray-700 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              />
              
              {/* Hair/dreads */}
              <motion.div 
                className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gray-800 rounded-full opacity-80"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              />
              
              {/* Top (hoodie/sweatshirt) */}
              <motion.div 
                className="absolute top-20 left-1/2 transform -translate-x-1/2 w-56 h-72 bg-gray-900 rounded-t-3xl"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              />
              
              {/* Bottom (pants) */}
              <motion.div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-48 h-80 bg-black"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              />
              
              {/* Shoes */}
              <motion.div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-12 bg-white rounded-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Text and CTA */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-left order-1 lg:order-2"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <motion.button
              className="bg-black text-white px-8 py-4 text-lg font-semibold tracking-wider hover:bg-gray-800 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              onClick={handleShopNow}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SHOP NOW
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
