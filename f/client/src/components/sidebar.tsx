import { motion } from "framer-motion";
import { useStore } from "@/lib/store";

export default function Sidebar() {
  const { isSidebarOpen, setSidebarOpen } = useStore();

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "Categories", href: "#categories" },
    { label: "New Arrivals", href: "#new-arrivals" },
    { label: "Sale", href: "#sale" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.div
      className="sidebar fixed top-0 left-0 w-64 h-full z-50 p-6 flex flex-col gap-4"
      initial={{ x: -260 }}
      animate={{ x: isSidebarOpen ? 0 : -260 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="text-center mb-6">
        <h3 className="text-white font-montserrat font-bold text-lg">Menu</h3>
      </div>
      {menuItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={() => setSidebarOpen(false)}
          className="text-white no-underline font-bold text-base transition-colors duration-200 p-3 rounded hover:bg-gray-600"
        >
          {item.label}
        </a>
      ))}
    </motion.div>
  );
}
