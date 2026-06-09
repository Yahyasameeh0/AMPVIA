import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface WishlistItem {
  id: string;
  name: string;
  category: string;
  image: string;
  href: string;
}

interface WishlistCtx {
  items: WishlistItem[];
  count: number;
  add: (item: WishlistItem) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const Ctx = createContext<WishlistCtx | null>(null);
const KEY = 'ampvia-wishlist';

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
    catch { return []; }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(items)); }, [items]);

  const add = (item: WishlistItem) => {
    setItems(prev => prev.find(i => i.id === item.id) ? prev : [...prev, item]);
  };
  const remove = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
  const has  = (id: string) => items.some(i => i.id === id);
  const clear = () => setItems([]);
  const count = items.length;

  return (
    <Ctx.Provider value={{ items, count, add, remove, has, clear, isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
    </Ctx.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useWishlist must be inside WishlistProvider');
  return ctx;
};
