import { useState } from 'react';
import { Menu, X, Search, ShoppingBag } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

interface NavigationProps {
  scrollY: number;
}

const Navigation = ({ scrollY }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Products', href: '#categories' },
    { name: 'Solutions', href: '#products' },
    { name: 'Projects', href: '#destinations' },
    { name: 'About', href: '#about' },
  ];

  const isScrolled = scrollY > 50;

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 custom-expo ${
        isScrolled
          ? 'w-[95%] max-w-6xl nav-glass shadow-card rounded-full py-3 px-6'
          : 'w-full max-w-7xl py-4 px-6 bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-crimson rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            {/* تغيير من SVG إلى PNG */}
            <img 
              src="/logo.png" 
              alt="AMPVIA Logo" 
              className="w-5 h-5 object-contain"
            />
          </div>
          <span className={`font-bold text-lg tracking-tight transition-colors duration-300 ${
            isScrolled ? 'text-crimson-dark' : 'text-white'
          }`}>
            AMPVIA
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-all duration-300 hover:opacity-70 relative group ${
                isScrolled ? 'text-crimson-dark' : 'text-white'
              }`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <button
            className={`p-2 rounded-full transition-all duration-300 hover:bg-white/10 ${
              isScrolled ? 'text-crimson-dark' : 'text-white'
            }`}
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <button
            className={`p-2 rounded-full transition-all duration-300 hover:bg-white/10 relative ${
              isScrolled ? 'text-crimson-dark' : 'text-white'
            }`}
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-crimson text-white text-xs rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-full transition-all duration-300 hover:bg-white/10 ${
              isScrolled ? 'text-crimson-dark' : 'text-white'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 mt-2 nav-glass rounded-2xl overflow-hidden transition-all duration-300 custom-expo ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="py-4 px-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block py-2 text-crimson-dark font-medium hover:text-crimson transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;