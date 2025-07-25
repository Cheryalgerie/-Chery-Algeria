import { useStore } from "@/lib/store";

const categories = [
  { id: "all", label: "All" },
  { id: "dresses", label: "Dresses" },
  { id: "tops", label: "Tops" },
  { id: "bottoms", label: "Bottoms" },
  { id: "accessories", label: "Accessories" },
  { id: "shoes", label: "Shoes" },
  { id: "outerwear", label: "Outerwear" },
];

export default function CategoryNavigation() {
  const { activeCategory, setActiveCategory } = useStore();

  return (
    <div className="categories flex justify-center gap-5 py-6 px-4 bg-gradient-to-r from-card to-secondary overflow-x-auto">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className={`category-item px-6 py-3 border-2 border-transparent text-white text-sm font-semibold tracking-wider uppercase whitespace-nowrap flex-shrink-0 transition-all duration-300 ${
            activeCategory === category.id ? "active" : ""
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
