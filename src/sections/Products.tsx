import { useEffect, useRef, useState } from 'react';
import { Zap, Shield, Award, ArrowRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  specs: string;
  voltage: string;
  certification: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Main Distribution Board',
    description: 'Industrial-grade main distribution panels with advanced protection systems.',
    specs: 'Up to 4000A',
    voltage: '380-415V',
    certification: 'IEC 61439',
    image: '/product-mdb.jpg',
  },
  {
    id: 2,
    name: 'LED Architectural Lighting',
    description: 'Energy-efficient architectural lighting solutions with smart control systems.',
    specs: '50,000+ hours',
    voltage: '220-240V',
    certification: 'CE, RoHS',
    image: '/product-led.jpg',
  },
  {
    id: 3,
    name: 'Power Cables',
    description: 'High-performance power cables for residential and industrial applications.',
    specs: '1.5mm² - 300mm²',
    voltage: 'Up to 33kV',
    certification: 'IEC 60502',
    image: '/product-cables.jpg',
  },
  {
    id: 4,
    name: 'Industrial Control Systems',
    description: 'Complete automation and control solutions for industrial facilities.',
    specs: 'PLC & SCADA',
    voltage: '24-480V',
    certification: 'UL, CE',
    image: '/product-control.jpg',
  },
];

const Products = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-24 md:py-32 bg-gray-light relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-crimson/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between mb-16 transition-all duration-1000 custom-expo ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <span className="inline-block px-4 py-1.5 bg-crimson/10 text-crimson text-sm font-medium rounded-full mb-4">
              Featured Solutions
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-crimson-dark">
              Premium Products
            </h2>
          </div>
          <a
            href="#"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-crimson font-medium hover:gap-3 transition-all duration-300"
          >
            View all products
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`transition-all duration-700 custom-expo ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div
                className={`group relative bg-white rounded-3xl overflow-hidden shadow-soft transition-all duration-500 border border-gray-200 ${
                  hoveredId !== null && hoveredId !== product.id ? 'opacity-50' : 'opacity-100'
                }`}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Certification Badge - Reveals on Hover */}
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-crimson" />
                      <span className="text-crimson-dark font-semibold text-sm">{product.certification}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs bg-crimson/10 text-crimson px-3 py-1 rounded-full">
                      <Zap className="w-3.5 h-3.5" />
                      {product.voltage}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs bg-crimson/10 text-crimson px-3 py-1 rounded-full">
                      <Shield className="w-3.5 h-3.5" />
                      {product.specs}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-crimson-dark mb-2 group-hover:text-crimson transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <div className="text-crimson-dark">
                      <span className="text-sm font-medium text-gray-600">Certified</span>
                      <p className="text-lg font-bold text-crimson">{product.certification}</p>
                    </div>
                    <button className="px-6 py-3 bg-crimson text-white font-semibold rounded-full transition-all duration-300 hover:bg-crimson-dark hover:shadow-lg transform group-hover:scale-105">
                      Get Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
