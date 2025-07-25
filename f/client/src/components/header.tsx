import { Search, Menu, ShoppingCart } from "lucide-react";
import { useStore } from "@/lib/store";

export default function Header() {
  const { setSidebarOpen, setSearchOpen } = useStore();

  return (
    <header className="relative p-4">
      <div className="flex items-center justify-between">
        {/* Menu Icon */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-white hover:text-gray-400 transition-colors"
        >
          <Menu size={24} />
        </button>

        {/* Logo and Title */}
        <div className="flex items-center justify-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
            alt="SABWEAR Logo"
            className="logo-spin-animation w-20 h-20 rounded-full"
          />
          <h1 className="text-3xl font-montserrat font-bold text-white tracking-wider">
            SABWEAR
          </h1>
        </div>

        {/* Search and Cart Icons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="text-white hover:text-gray-400 transition-colors"
          >
            <Search size={20} />
          </button>
          <div className="text-white cursor-default">
            <ShoppingCart size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
