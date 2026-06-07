import { useEffect, useRef, useState } from 'react';
import { Zap, Shield, Award, ArrowRight, ShoppingBag, GitCompare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';

const products = [
  { id: 1, name: 'Main Distribution Board', description: 'Industrial-grade main distribution panels with advanced protection systems.', specs: 'Up to 4000A', voltage: '380–415V', certification: 'IEC 61439', image: '/product-mdb.jpg', href: '/distribution-panels', category: 'Distribution Panels' },
  { id: 2, name: 'LED Architectural Lighting', description: 'Energy-efficient architectural lighting solutions with smart control systems.', specs: '50,000+ hours', voltage: '220–240V', certification: 'CE, RoHS', image: '/product-led.jpg', href: '/lighting-solutions', category: 'Lighting Solutions' },
  { id: 3, name: 'Power Cables', description: 'High-performance power cables for residential and industrial applications.', specs: '1.5mm² – 300mm²', voltage: 'Up to 33kV', certification: 'IEC 60502', image: '/product-cables.jpg', href: '/cables-wiring', category: 'Cables & Wiring' },
  { id: 4, name: 'Industrial Control Systems', description: 'Comprehensive control and automation solutions for complex industrial environments.', specs: 'PLC / SCADA', voltage: '24V – 415V', certification: 'UL, CE', image: '/product-control.jpg', href: '/industrial-systems', category: 'Industrial Systems' },
];

const Products = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const { add, open: openCart } = useCart();
  const { add: addCompare, remove: removeCompare, has: hasCompare } = useCompare();

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  const handleGetQuote = (e: React.MouseEvent, p: typeof products[0]) => {
    e.preventDefault();
    e.stopPropagation();
    add({ id: `product-${p.id}`, name: p.name, category: p.category, image: p.image, href: p.href });
    openCart();
  };

  const handleCompare = (e: React.MouseEvent, p: typeof products[0]) => {
    e.preventDefault();
    e.stopPropagation();
    const cid = `product-${p.id}`;
    if (hasCompare(cid)) {
      removeCompare(cid);
    } else {
      addCompare({
        id: cid,
        name: p.name,
        category: p.category,
        image: p.image,
        href: p.href,
        specs: p.specs,
        voltage: p.voltage,
        certification: p.certification,
        description: p.description,
      });
    }
  };

  return (
    <section id="products" ref={ref} className="py-28 md:py-36 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 transition-all duration-900 custom-expo ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <span className="section-label mb-5 block">Featured Products</span>
            <h2 className="display-text text-crimson-dark dark:text-white" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}>
              Built to <em className="display-italic">last</em>
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-xs text-gray-400 flex items-center gap-1.5">
              <GitCompare className="w-3.5 h-3.5 text-crimson" />
              Select up to 3 products to compare
            </p>
            <Link to="/distribution-panels" data-hover
              className="inline-flex items-center gap-2 text-crimson font-medium text-sm hover:gap-4 transition-all duration-300">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Products grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {products.map((p, i) => {
            const cid = `product-${p.id}`;
            const inCompare = hasCompare(cid);
            return (
              <div key={p.id}
                className={`group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border transition-all duration-800 custom-expo card-lift ${
                  inCompare
                    ? 'border-crimson/40 ring-2 ring-crimson/20'
                    : 'border-gray-100 dark:border-gray-700'
                } ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${0.1 + i * 0.1}s` }}>

                {/* Compare badge */}
                {inCompare && (
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-crimson text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg">
                    <GitCompare className="w-3 h-3" />
                    Comparing
                  </div>
                )}

                {/* Image */}
                <Link to={p.href} data-hover className="block relative overflow-hidden" style={{ height: '220px' }}>
                  <img src={p.image} alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-crimson" />
                      <span className="text-xs font-semibold text-crimson-dark">{p.certification}</span>
                    </div>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-7">
                  <Link to={p.href} data-hover>
                    <h3 className="display-text text-crimson-dark dark:text-white mb-2 hover:text-crimson transition-colors" style={{ fontSize: '1.35rem' }}>{p.name}</h3>
                  </Link>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">{p.description}</p>

                  <div className="flex items-center gap-6 mb-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Zap className="w-4 h-4 text-crimson" />{p.voltage}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Shield className="w-4 h-4 text-crimson" />{p.specs}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <button
                      data-hover
                      onClick={(e) => handleGetQuote(e, p)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-crimson text-white text-sm font-semibold rounded-full hover:bg-crimson-dark transition-colors duration-300"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Get Quote
                    </button>

                    <div className="flex items-center gap-2">
                      {/* Compare toggle */}
                      <button
                        data-hover
                        onClick={(e) => handleCompare(e, p)}
                        aria-label={inCompare ? 'Remove from comparison' : 'Add to comparison'}
                        className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold rounded-full border transition-all duration-300 ${
                          inCompare
                            ? 'bg-crimson/10 border-crimson/30 text-crimson'
                            : 'border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-crimson/30 hover:text-crimson hover:bg-crimson/5'
                        }`}
                      >
                        <GitCompare className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{inCompare ? 'Added' : 'Compare'}</span>
                      </button>

                      <Link to={p.href} data-hover
                        className="w-10 h-10 rounded-full bg-crimson/8 flex items-center justify-center hover:bg-crimson transition-colors duration-300 group/btn flex-shrink-0">
                        <ArrowRight className="w-4 h-4 text-crimson group-hover/btn:text-white transition-colors duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
