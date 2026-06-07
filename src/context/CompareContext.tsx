import { createContext, useContext, useState, type ReactNode } from 'react';

export interface CompareProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  href: string;
  specs: string;
  voltage: string;
  certification: string;
  description: string;
}

interface CompareCtx {
  items: CompareProduct[];
  add: (product: CompareProduct) => void;
  remove: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const Ctx = createContext<CompareCtx | null>(null);

const MAX = 3;

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CompareProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const add = (product: CompareProduct) => {
    setItems(prev => {
      if (prev.find(i => i.id === product.id)) return prev;
      if (prev.length >= MAX) return prev;
      return [...prev, product];
    });
  };

  const remove = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
  const clear  = () => { setItems([]); setIsOpen(false); };
  const has    = (id: string) => items.some(i => i.id === id);

  return (
    <Ctx.Provider value={{ items, add, remove, clear, has, isOpen, openModal: () => setIsOpen(true), closeModal: () => setIsOpen(false) }}>
      {children}
    </Ctx.Provider>
  );
};

export const useCompare = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCompare must be inside CompareProvider');
  return ctx;
};
