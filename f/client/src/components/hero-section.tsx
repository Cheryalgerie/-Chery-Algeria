import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-right order-2 lg:order-1"
        >
          <motion.h1 
            className="text-5xl lg:text-7xl font-bold text-black mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            SABWEAR
            <span className="block text-3xl lg:text-4xl font-normal text-gray-600 mt-2">
              مجموعة الصيف الجديدة
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-md mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            اكتشف أحدث الأزياء العصرية والأنيقة من مجموعتنا الحصرية
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="#collection">
              <motion.button 
                className="bg-black text-white px-8 py-4 text-lg font-semibold flex items-center gap-3 mx-auto lg:mx-0 hover:bg-gray-800 transition-colors group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                تسوق الآن
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div 
            className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-black">500+</div>
              <div>منتج متنوع</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-black">1000+</div>
              <div>عميل راضي</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-black">24/7</div>
              <div>خدمة العملاء</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Model Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative order-1 lg:order-2"
        >
          <div className="relative">
            {/* Model Image Area */}
            <div className="relative w-full h-[600px] lg:h-[700px] bg-gray-200 overflow-hidden">
              {/* Background with pattern */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-300"></div>
              
              {/* Model placeholder with outfit styling */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-[500px]">
                {/* Body silhouette */}
                <div className="relative w-full h-full">
                  {/* Top (shirt/hoodie) */}
                  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-48 h-64 bg-gray-800 rounded-t-3xl rounded-b-lg opacity-80"></div>
                  {/* Bottom (pants) */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-80 bg-gray-900 opacity-80"></div>
                  {/* Head */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gray-700 rounded-full opacity-70"></div>
                  {/* Shoes */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-white rounded-lg"></div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute top-10 right-10 w-20 h-20 bg-black opacity-10 rounded-full"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360] 
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
              <motion.div 
                className="absolute bottom-20 left-10 w-12 h-12 bg-black opacity-10 rounded-full"
                animate={{ 
                  y: [0, -20, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
            </div>

            {/* Sale Badge */}
            <motion.div 
              className="absolute bottom-8 left-8 bg-black text-white px-6 py-3 font-bold text-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              SUMMER SALE
              <div className="text-sm font-normal">خصم حتى 40%</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-black rounded-full flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-1 h-3 bg-black rounded-full mt-2"></div>
        </motion.div>
      </motion.div>
    </section>
  );
}