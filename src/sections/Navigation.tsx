import { useState } from 'react';
import { Menu, X, Search, ShoppingBag, Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useDark } from '../context/DarkContext';
import SearchModal from '../components/SearchModal';

interface NavigationProps { scrollY: number; }

const Navigation = ({ scrollY }: NavigationProps) => {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count, open: openCart }   = useCart();
  const { dark, toggle }            = useDark();
  const location = useLocation();

  const isScrolled = scrollY > 50;

  const navLinks = [
    { name: 'Home',     href: '/' },
    { name: 'Products', href: '/#categories' },
    { name: 'Solutions',href: '/#products' },
    { name: 'Projects', href: '/#destinations' },
    { name: 'About',    href: '/#about' },
  ];

  const handleAnchor = (href: string) => {
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      if (location.pathname !== '/') { window.location.href = href; return; }
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const textColor = isScrolled
    ? 'text-crimson-dark dark:text-white'
    : 'text-white';

  const iconBtn = `p-2 rounded-full transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/10 ${textColor}`;

  return (
    <>
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}

      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 custom-expo ${
        isScrolled
          ? 'w-[95%] max-w-6xl nav-glass shadow-card rounded-full py-3 px-6'
          : 'w-full max-w-7xl py-4 px-6 bg-transparent'
      }`}>
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" data-hover className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-crimson rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <img src="/logo0.png" alt="AMPVIA" className="w-5 h-5 object-contain" onError={e => { (e.target as HTMLImageElement).style.display='none'; }} />
            </div>
            <span className={`font-bold text-lg tracking-tight transition-colors duration-300 ${textColor}`}
              style={{ fontFamily: '"DM Serif Display", serif' }}>
              AMPVIA
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map(l => (
              l.href.startsWith('/#')
                ? <a key={l.name} href={l.href}
                    onClick={e => { e.preventDefault(); handleAnchor(l.href); }}
                    data-hover
                    className={`text-sm font-medium transition-all duration-300 hover:opacity-60 relative group ${textColor}`}>
                    {l.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full" />
                  </a>
                : <Link key={l.name} to={l.href} data-hover
                    className={`text-sm font-medium transition-all duration-300 hover:opacity-60 relative group ${textColor}`}>
                    {l.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full" />
                  </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <button onClick={() => setSearchOpen(true)} data-hover className={iconBtn} aria-label="Search">
              <Search className="w-5 h-5" />
            </button>

            {/* Dark mode */}
            <button onClick={toggle} data-hover className={iconBtn} aria-label="Toggle dark mode">
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Cart */}
            <button onClick={openCart} data-hover className={`${iconBtn} relative`} aria-label="Cart">
              <ShoppingBag className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-crimson text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>

            {/* Mobile menu */}
            <button onClick={() => setMenuOpen(!menuOpen)} data-hover className={`md:hidden ${iconBtn}`} aria-label="Menu">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden absolute top-full left-0 right-0 mt-2 nav-glass rounded-2xl overflow-hidden transition-all duration-300 custom-expo ${
          menuOpen ? 'max-h-80 opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'
        }`}>
          <div className="py-4 px-6 space-y-1">
            {navLinks.map(l => (
              l.href.startsWith('/#')
                ? <a key={l.name} href={l.href}
                    onClick={e => { e.preventDefault(); handleAnchor(l.href); }}
                    className="block py-2.5 text-crimson-dark dark:text-white font-medium hover:text-crimson transition-colors">
                    {l.name}
                  </a>
                : <Link key={l.name} to={l.href} onClick={() => setMenuOpen(false)}
                    className="block py-2.5 text-crimson-dark dark:text-white font-medium hover:text-crimson transition-colors">
                    {l.name}
                  </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
