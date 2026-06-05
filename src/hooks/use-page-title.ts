import { useEffect } from 'react';

export const usePageTitle = (title: string) => {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    return () => { document.title = prev; };
  }, [title]);
};

export const useScrollToTop = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
};
