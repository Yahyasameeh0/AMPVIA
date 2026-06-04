import { useEffect, useRef, useState } from 'react';
import { Zap, Shield, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Main Distribution Board', description: 'Industrial-grade main distribution panels with advanced protection systems.', specs: 'Up to 4000A', voltage: '380–415V', certification: 'IEC 61439', image: '/product-mdb.jpg', href: '/distribution-panels' },
  { id: 2, name: 'LED Architectural Lighting', description: 'Energy-efficient architectural lighting solutions with smart control systems.', specs: '50,000+ hours', voltage: '220–240V', certification: 'CE, RoHS', image: '/product-led.jpg', href: '/lighting-solutions' },
  { id: 3, name: 'Power Cables', description: 'High-performance power cables for residential and industrial applications.', specs: '1.5mm² – 300mm²', voltage: 'Up to 33kV', certification: 'IEC 60502', image: '/product-cables.jpg', href: '/cables-wiring' },
  { id: 4, name: 'Industrial Control Systems', description: 'Comprehensive control and automation solutions for complex industrial environments.', specs: 'PLC / SCADA', voltage: '24V – 415V', certification: 'UL, CE', image: '/product-control.jpg', href: '/industrial-systems' },
];

const Products = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  return (
    <section id="products" ref={ref} className="py-28 md:py-36 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 transition-all duration-900 custom-expo ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <span className="section-label mb-5 block">Featured Products</span>
            <h2 className="display-text text-crimson-dark" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}>
              Built to <em className="display-italic">last</em>
            </h2>
          </div>
          <Link to="/distribution-panels" data-hover
            className="inline-flex items-center gap-2 text-crimson font-medium text-sm hover:gap-4 transition-all duration-300">
            View all products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {products.map((p, i) => (
            <Link to={p.href} key={p.id} data-hover
              className={`group relative bg-white rounded-3xl overflow-hidden border border-gray-100 card-lift transition-all duration-800 custom-expo ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${0.1 + i * 0.1}s` }}>

              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: '220px' }}>
                <img src={p.image} alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Cert badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-crimson" />
                    <span className="text-xs font-semibold text-crimson-dark">{p.certification}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <h3 className="display-text text-crimson-dark mb-2" style={{ fontSize: '1.35rem' }}>{p.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{p.description}</p>

                <div className="flex items-center gap-6 mb-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Zap className="w-4 h-4 text-crimson" />{p.voltage}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-crimson" />{p.specs}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-crimson font-semibold text-sm group-hover:gap-4 flex items-center gap-2 transition-all duration-300">
                    Get Quote <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="w-10 h-10 rounded-full bg-crimson/8 flex items-center justify-center group-hover:bg-crimson transition-colors duration-300">
                    <ArrowRight className="w-4 h-4 text-crimson group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
