import { type Product, type InsertProduct, type CartItem, type InsertCartItem } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Product methods
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  
  // Cart methods
  getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  removeFromCart(id: string): Promise<void>;
  updateCartItemQuantity(id: string, quantity: number): Promise<CartItem | undefined>;
  clearCart(sessionId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private cartItems: Map<string, CartItem>;

  constructor() {
    this.products = new Map();
    this.cartItems = new Map();
    this.seedProducts();
  }

  private seedProducts() {
    const sampleProducts: Product[] = [
      {
        id: "1",
        name: "Elegant Evening Dress",
        price: "299.99",
        originalPrice: "429.99",
        category: "dresses",
        imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        onSale: true,
        description: "Premium evening dress perfect for special occasions"
      },
      {
        id: "2",
        name: "Designer Silk Blouse",
        price: "179.99",
        originalPrice: null,
        category: "tops",
        imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        onSale: false,
        description: "Luxurious silk blouse with elegant design"
      },
      {
        id: "3",
        name: "Premium Denim Jeans",
        price: "149.99",
        originalPrice: null,
        category: "bottoms",
        imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        onSale: false,
        description: "High-quality denim jeans with perfect fit"
      },
      {
        id: "4",
        name: "Luxury Leather Handbag",
        price: "399.99",
        originalPrice: "499.99",
        category: "accessories",
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        onSale: true,
        description: "Premium leather handbag with timeless design"
      },
      {
        id: "5",
        name: "Designer High Heels",
        price: "229.99",
        originalPrice: null,
        category: "shoes",
        imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        onSale: false,
        description: "Elegant high heels for sophisticated style"
      },
      {
        id: "6",
        name: "Cashmere Sweater",
        price: "259.99",
        originalPrice: null,
        category: "tops",
        imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        onSale: false,
        description: "Soft cashmere sweater for ultimate comfort"
      },
      {
        id: "7",
        name: "Premium Leather Jacket",
        price: "449.99",
        originalPrice: null,
        category: "outerwear",
        imageUrl: "https://images.unsplash.com/photo-1520975954732-35dd22299614?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        onSale: false,
        description: "Classic leather jacket with modern appeal"
      },
      {
        id: "8",
        name: "Designer Watch",
        price: "799.99",
        originalPrice: "939.99",
        category: "accessories",
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        onSale: true,
        description: "Luxury designer watch with precise movement"
      },
      {
        id: "9",
        name: "Luxury Silk Scarf",
        price: "89.99",
        originalPrice: null,
        category: "accessories",
        imageUrl: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        onSale: false,
        description: "Elegant silk scarf with artistic pattern"
      },
      {
        id: "10",
        name: "Classic Trench Coat",
        price: "349.99",
        originalPrice: null,
        category: "outerwear",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        onSale: false,
        description: "Timeless trench coat for any season"
      },
      {
        id: "11",
        name: "Statement Necklace",
        price: "159.99",
        originalPrice: null,
        category: "accessories",
        imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        onSale: false,
        description: "Bold statement necklace for special occasions"
      },
      {
        id: "12",
        name: "Designer Sneakers",
        price: "329.99",
        originalPrice: null,
        category: "shoes",
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        onSale: false,
        description: "Premium designer sneakers for casual luxury"
      }
    ];

    sampleProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      product => 
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery) ||
        (product.description && product.description.toLowerCase().includes(lowercaseQuery))
    );
  }

  async getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]> {
    const items = Array.from(this.cartItems.values()).filter(
      item => item.sessionId === sessionId
    );
    
    return items.map(item => {
      const product = this.products.get(item.productId);
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }
      return { ...item, product };
    });
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItem = Array.from(this.cartItems.values()).find(
      item => item.productId === insertItem.productId && item.sessionId === insertItem.sessionId
    );

    if (existingItem) {
      // Update quantity
      existingItem.quantity += insertItem.quantity || 1;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    }

    const id = randomUUID();
    const cartItem: CartItem = { 
      ...insertItem, 
      id,
      quantity: insertItem.quantity || 1
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async removeFromCart(id: string): Promise<void> {
    this.cartItems.delete(id);
  }

  async updateCartItemQuantity(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      this.cartItems.set(id, item);
      return item;
    }
    return undefined;
  }

  async clearCart(sessionId: string): Promise<void> {
    const itemsToDelete = Array.from(this.cartItems.entries())
      .filter(([_, item]) => item.sessionId === sessionId)
      .map(([id, _]) => id);
    
    itemsToDelete.forEach(id => this.cartItems.delete(id));
  }
}

export const storage = new MemStorage();
