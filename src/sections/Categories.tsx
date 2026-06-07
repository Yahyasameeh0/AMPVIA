import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Distribution Panels', image: '/category-panels.jpg',    count: 48, href: '/distribution-panels', tag: '01' },
  { name: 'Architectural Lighting', image: '/category-lighting.jpg', count: 62, href: '/lighting-solutions',  tag: '02' },
  { name: 'Cables & Wiring',    image: '/category-cables.jpg',    count: 95, href: '/cables-wiring',        tag: '03' },
  { name: 'Industrial Solutions', image: '/category-industrial.jpg', count: 38, href: '/industrial-systems',  tag: '04' },
];

const Categories = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  return (
    <section id="categories" ref={ref} className="py-28 md:py-36 bg-white dark:bg-gray-950 relative overflow-hidden">

      {/* Decorative large number */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none dark:opacity-[0.03]"
        style={{ fontFamily: '"DM Serif Display", serif', fontSize: 'clamp(10rem, 20vw, 18rem)', lineHeight: 1, color: '#F5F5F5', fontWeight: 400 }}>
        04
      </div>

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8 transition-all duration-900 custom-expo ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <span className="section-label mb-5 block">Our Product Range</span>
            <h2 className="display-text text-crimson-dark" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}>
              Comprehensive<br />
              <em className="display-italic">Solutions</em>
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed text-sm md:text-base">
            Industry-leading electrical products and systems for residential, commercial, and industrial applications.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <Link to={cat.href} key={cat.name} data-hover
              className={`group relative block rounded-2xl overflow-hidden transition-all duration-800 custom-expo ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${0.1 + i * 0.08}s`, aspectRatio: '3/4' }}>

              {/* Image */}
              <div className="absolute inset-0 image-zoom">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" loading="lazy" />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-400 group-hover:opacity-90" />

              {/* Tag */}
              <div className="absolute top-5 left-5 text-white/40 font-semibold text-xs tracking-widest"
                style={{ fontFamily: '"DM Serif Display", serif', fontSize: '0.7rem' }}>
                {cat.tag}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-white/60 text-xs tracking-widest uppercase mb-2">{cat.count} products</p>
                    <h3 className="display-text text-white transition-all duration-300" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>
                      {cat.name}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-400">
                    <ArrowRight className="w-4 h-4 text-white" />
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

export default Categories;
