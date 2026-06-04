import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface DarkCtx { dark: boolean; toggle: () => void; }
const Ctx = createContext<DarkCtx>({ dark: false, toggle: () => {} });

export const DarkProvider = ({ children }: { children: ReactNode }) => {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('ampvia-dark') === 'true' ||
      (!localStorage.getItem('ampvia-dark') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('ampvia-dark', String(dark));
  }, [dark]);

  return <Ctx.Provider value={{ dark, toggle: () => setDark(d => !d) }}>{children}</Ctx.Provider>;
};

export const useDark = () => useContext(Ctx);
