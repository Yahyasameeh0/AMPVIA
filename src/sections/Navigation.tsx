import { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, ShoppingBag, Moon, Sun, ChevronDown, MessageSquare, Hop as Home, Zap, Building2, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useDark } from '../context/DarkContext';
import SearchModal from '../components/SearchModal';

interface NavChild {
  name: string;
  href: string;
  desc?: string;
}

interface NavLink {
  name: string;
  href: string;
  children?: NavChild[];
}

const NAV_LINKS: NavLink[] = [
  {
    name: 'Products',
    href: '#products',
    children: [
      { name: 'Distribution Panels', href: '/distribution-panels', desc: 'MDB, SDB, floor standing panels' },
      { name: 'Lighting Solutions', href: '/lighting-solutions', desc: 'LED architectural & industrial lighting' },
      { name: 'Cables & Wiring', href: '/cables-wiring', desc: 'Low & medium voltage cables' },
      { name: 'Industrial Systems', href: '/industrial-systems', desc: 'MCC, VSD, PLC/SCADA, UPS' },
    ],
  },
  {
    name: 'Solutions',
    href: '#solutions',
    children: [
      { name: 'Our Projects', href: '/#destinations', desc: 'Featured installations' },
      { name: 'Technical Support', href: '/technical-support', desc: 'FAQs & on-site service' },
      { name: 'Certifications', href: '/certifications', desc: 'IEC, CE, RoHS, ISO 9001' },
      { name: 'Documentation', href: '/documentation', desc: 'Datasheets & manuals' },
    ],
  },
  { name: 'About', href: '/mission' },
  { name: 'Contact', href: '/contact' },
];

interface NavigationProps { scrollY: number; }

const Navigation = ({ scrollY }: NavigationProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const megaTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const { count, open: openCart } = useCart();
  const { dark, toggle } = useDark();
  const location = useLocation();

  const isScrolled = scrollY > 50;
  const isHome = location.pathname === '/';

  const textColor = isScrolled
    ? 'text-crimson-dark dark:text-white'
    : 'text-white';

  const iconBtn = `p-2 rounded-full transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/10 ${textColor}`;

  const closeMobileMenu = () => setMenuOpen(false);

  const handleMegaEnter = (name: string) => {
    clearTimeout(megaTimer.current);
    setMegaOpen(name);
  };

  const handleMegaLeave = () => {
    megaTimer.current = setTimeout(() => setMegaOpen(null), 150);
  };

  const handleAnchor = (href: string) => {
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      if (location.pathname !== '/') {
        window.location.href = href;
        return;
      }
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
    setMegaOpen(null);
  };

  useEffect(() => { setMegaOpen(null); setMenuOpen(false); }, [location.pathname]);

  return (
    <>
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}

      {/* Backdrop for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 custom-expo ${
        isScrolled
          ? 'w-[95%] max-w-6xl nav-glass shadow-card rounded-full py-3 px-6'
          : 'w-full max-w-7xl py-4 px-6 bg-transparent'
      }`}>
        {/* Accent line */}
        {isScrolled && (
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-crimson/20 to-transparent" />
        )}

        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" data-hover className="flex items-center gap-2.5 group" onClick={closeMobileMenu}>
            <div className="w-9 h-9 bg-crimson rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <img src="/logo0.png" alt="AMPVIA" className="w-5 h-5 object-contain" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>
            <span className={`font-bold text-lg tracking-tight transition-colors duration-300 ${textColor}`}
              style={{ fontFamily: '"DM Serif Display", serif' }}>
              AMPVIA
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(l => (
              l.children ? (
                <div
                  key={l.name}
                  className="relative"
                  onMouseEnter={() => handleMegaEnter(l.name)}
                  onMouseLeave={handleMegaLeave}
                >
                  <button
                    data-hover
                    className={`flex items-center gap-1 text-sm font-medium transition-all duration-300 px-3 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 ${textColor} ${megaOpen === l.name ? 'bg-black/5 dark:bg-white/5' : ''}`}
                  >
                    {l.name}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${megaOpen === l.name ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Mega dropdown */}
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 transition-all duration-300 custom-expo ${
                    megaOpen === l.name
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}>
                    <div className="nav-glass rounded-2xl shadow-card p-2">
                      {l.children.map(child => (
                        child.href.startsWith('/#') ? (
                          <a
                            key={child.name}
                            href={child.href}
                            onClick={e => { e.preventDefault(); handleAnchor(child.href); }}
                            className="flex items-start gap-3 px-4 py-3 rounded-xl hover:bg-crimson/5 dark:hover:bg-white/5 transition-colors group"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-crimson-dark dark:text-white">{child.name}</p>
                              {child.desc && <p className="text-xs text-gray-400 mt-0.5">{child.desc}</p>}
                            </div>
                          </a>
                        ) : (
                          <Link
                            key={child.name}
                            to={child.href}
                            onClick={() => setMegaOpen(null)}
                            className="flex items-start gap-3 px-4 py-3 rounded-xl hover:bg-crimson/5 dark:hover:bg-white/5 transition-colors group"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-crimson-dark dark:text-white">{child.name}</p>
                              {child.desc && <p className="text-xs text-gray-400 mt-0.5">{child.desc}</p>}
                            </div>
                          </Link>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                l.href.startsWith('/#') ? (
                  <a
                    key={l.name}
                    href={l.href}
                    onClick={e => { e.preventDefault(); handleAnchor(l.href); }}
                    data-hover
                    className={`text-sm font-medium transition-all duration-300 px-3 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 hover:opacity-100 relative ${textColor}`}
                  >
                    {l.name}
                  </a>
                ) : (
                  <Link
                    key={l.name}
                    to={l.href}
                    data-hover
                    className={`text-sm font-medium transition-all duration-300 px-3 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 relative ${textColor} ${
                      location.pathname === l.href ? 'bg-black/5 dark:bg-white/5' : ''
                    }`}
                  >
                    {l.name}
                    {location.pathname === l.href && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-crimson rounded-full" />
                    )}
                  </Link>
                )
              )
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button onClick={() => setSearchOpen(true)} data-hover className={iconBtn} aria-label="Search">
              <Search className="w-5 h-5" />
            </button>

            <button onClick={toggle} data-hover className={iconBtn} aria-label="Toggle dark mode">
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button onClick={openCart} data-hover className={`${iconBtn} relative`} aria-label="Cart">
              <ShoppingBag className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-crimson text-white text-[10px] rounded-full flex items-center justify-center font-bold animate-scale-in">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>

            {/* Request Quote CTA - desktop only */}
            <Link
              to="/contact"
              className="hidden lg:inline-flex items-center gap-2 ml-2 px-5 py-2 bg-crimson text-white text-sm font-semibold rounded-full hover:bg-crimson-dark transition-colors duration-300"
            >
              <MessageSquare className="w-4 h-4" />
              Get Quote
            </Link>

            {/* Mobile menu button */}
            <button onClick={() => setMenuOpen(!menuOpen)} data-hover className={`lg:hidden ${iconBtn}`} aria-label="Menu">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <div className={`lg:hidden absolute top-full left-0 right-0 mt-2 nav-glass rounded-2xl overflow-hidden transition-all duration-300 custom-expo ${
          menuOpen ? 'max-h-[80vh] opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'
        }`}>
          <div className="py-3 px-4 space-y-1 overflow-y-auto max-h-[70vh]">
            {NAV_LINKS.map(l => (
              l.children ? (
                <div key={l.name} className="space-y-1">
                  <p className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">{l.name}</p>
                  {l.children.map(child => (
                    child.href.startsWith('/#') ? (
                      <a
                        key={child.name}
                        href={child.href}
                        onClick={e => { e.preventDefault(); handleAnchor(child.href); }}
                        className="block px-3 py-2.5 rounded-xl text-crimson-dark dark:text-white font-medium hover:bg-crimson/5 dark:hover:bg-white/5 transition-colors"
                      >
                        {child.name}
                        {child.desc && <span className="block text-xs text-gray-400 font-normal">{child.desc}</span>}
                      </a>
                    ) : (
                      <Link
                        key={child.name}
                        to={child.href}
                        onClick={closeMobileMenu}
                        className={`block px-3 py-2.5 rounded-xl font-medium transition-colors ${
                          location.pathname === child.href
                            ? 'bg-crimson/10 text-crimson'
                            : 'text-crimson-dark dark:text-white hover:bg-crimson/5 dark:hover:bg-white/5'
                        }`}
                      >
                        {child.name}
                        {child.desc && <span className="block text-xs text-gray-400 font-normal">{child.desc}</span>}
                      </Link>
                    )
                  ))}
                </div>
              ) : (
                l.href.startsWith('/#') ? (
                  <a
                    key={l.name}
                    href={l.href}
                    onClick={e => { e.preventDefault(); handleAnchor(l.href); }}
                    className="block px-3 py-2.5 rounded-xl text-crimson-dark dark:text-white font-medium hover:bg-crimson/5 dark:hover:bg-white/5 transition-colors"
                  >
                    {l.name}
                  </a>
                ) : (
                  <Link
                    key={l.name}
                    to={l.href}
                    onClick={closeMobileMenu}
                    className={`block px-3 py-2.5 rounded-xl font-medium transition-colors ${
                      location.pathname === l.href
                        ? 'bg-crimson/10 text-crimson'
                        : 'text-crimson-dark dark:text-white hover:bg-crimson/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {l.name}
                  </Link>
                )
              )
            ))}

            {/* Mobile CTA */}
            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="flex items-center justify-center gap-2 mt-4 px-5 py-3 bg-crimson text-white font-semibold rounded-full hover:bg-crimson-dark transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Get a Quote
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden nav-glass border-t border-gray-200/10 safe-area-bottom">
        <div className="flex items-center justify-around h-16">
          {([
            { name: 'Home',     href: '/',                  Icon: Home,      isAnchor: false },
            { name: 'Products', href: '/distribution-panels', Icon: Zap,     isAnchor: false },
            { name: 'Projects', href: '/#destinations',      Icon: Building2, isAnchor: true  },
            { name: 'Contact',  href: '/contact',            Icon: Phone,     isAnchor: false },
          ] as const).map(item => {
            const isActive = item.isAnchor
              ? isHome
              : location.pathname === item.href;
            const cls = `flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
              isActive ? 'text-crimson' : 'text-gray-500 dark:text-gray-400'
            }`;
            return item.isAnchor ? (
              <a
                key={item.name}
                href={item.href}
                onClick={e => { e.preventDefault(); handleAnchor(item.href); }}
                className={cls}
              >
                <item.Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.name}</span>
              </a>
            ) : (
              <Link key={item.name} to={item.href} className={cls}>
                <item.Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navigation;
