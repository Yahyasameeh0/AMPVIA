import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  features: string[];
}

interface CartItem extends Product {
  quantity: number;
}

interface AppState {
  // Theme
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Favorites
  favorites: number[];
  toggleFavorite: (productId: number) => void;
  
  // Notifications
  notification: { message: string; type: 'success' | 'error' | 'info' } | null;
  showNotification: (message: string, type: 'success' | 'error' | 'info') => void;
  hideNotification: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      
      // Cart
      cart: [],
      addToCart: (product) => {
        const cart = get().cart;
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
        
        get().showNotification(`${product.name} added to cart!`, 'success');
      },
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item.id !== productId) });
        get().showNotification('Item removed from cart', 'info');
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map(item =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ cart: [] }),
      
      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      // Favorites
      favorites: [],
      toggleFavorite: (productId) => {
        const favorites = get().favorites;
        if (favorites.includes(productId)) {
          set({ favorites: favorites.filter(id => id !== productId) });
          get().showNotification('Removed from favorites', 'info');
        } else {
          set({ favorites: [...favorites, productId] });
          get().showNotification('Added to favorites!', 'success');
        }
      },
      
      // Notifications
      notification: null,
      showNotification: (message, type) => {
        set({ notification: { message, type } });
        setTimeout(() => get().hideNotification(), 3000);
      },
      hideNotification: () => set({ notification: null }),
    }),
    {
      name: 'ampvia-storage',
      partialize: (state) => ({
        theme: state.theme,
        cart: state.cart,
        favorites: state.favorites,
      }),
    }
  )
);
