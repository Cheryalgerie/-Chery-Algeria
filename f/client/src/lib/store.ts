import { create } from 'zustand';

interface StoreState {
  isSidebarOpen: boolean;
  isSearchOpen: boolean;
  isLandingVisible: boolean;
  activeCategory: string;
  searchQuery: string;
  setSidebarOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setLandingVisible: (visible: boolean) => void;
  setActiveCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  isSidebarOpen: false,
  isSearchOpen: false,
  isLandingVisible: true,
  activeCategory: 'all',
  searchQuery: '',
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setLandingVisible: (visible) => set({ isLandingVisible: visible }),
  setActiveCategory: (category) => set({ activeCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
