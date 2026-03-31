import { useEffect, useRef, useState } from 'react';
import { Zap, Shield, Award, ArrowRight, Search } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { ProductCard } from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/ProductCardSkeleton';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  features: string[];
  image: string;
  images?: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: 'LED Panel Light 60x60',
    category: 'Lighting',
    price: '$45.99',
    description: 'High-efficiency LED panel light for commercial and residential applications.',
    features: ['Energy Saving', '50,000 hours lifespan', 'Dimmable'],
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558402529-d2638a7023e9?w=800&h=800&fit=crop',
    ],
  },
  {
    id: 2,
    name: 'Smart Circuit Breaker',
    category: 'Protection',
    price: '$89.99',
    description: 'Intelligent circuit breaker with remote monitoring and control capabilities.',
    features: ['WiFi Enabled', 'Overload Protection', 'Mobile App'],
    image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=800&h=800&fit=crop',
    ],
  },
  {
    id: 3,
    name: 'Industrial Cable 10mm',
    category: 'Cables',
    price: '$129.99',
    description: 'Heavy-duty industrial power cable for high-voltage applications.',
    features: ['Fire Resistant', 'UV Protected', 'IEC Certified'],
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=500&h=500&fit=crop',
  },
  {
    id: 4,
    name: 'Smart Switch Panel',
    category: 'Controls',
    price: '$159.99',
    description: 'Touch-sensitive smart switch panel with voice control integration.',
    features: ['Voice Control', 'Touch Screen', 'Scene Modes'],
    image: 'https://images.unsplash.com/photo-1558002038-1091a1661116?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1558002038-1091a1661116?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1518640467707-6811cf404fb9?w=800&h=800&fit=crop',
    ],
  },
  {
    id: 5,
    name: 'LED Flood Light 100W',
    category: 'Lighting',
    price: '$79.99',
    description: 'Powerful outdoor flood light with adjustable brightness settings.',
    features: ['IP65 Waterproof', 'Motion Sensor', 'Energy Efficient'],
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&h=500&fit=crop',
  },
  {
    id: 6,
    name: 'Distribution Box 24-Way',
    category: 'Protection',
    price: '$199.99',
    description: 'Professional distribution box with 24 ways for residential use.',
    features: ['Modular Design', 'Easy Installation', 'Safety Certified'],
    image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=500&h=500&fit=crop',
  },
];

const categories = ['All', 'Lighting', 'Protection', 'Cables', 'Controls'];

const Products = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const searchQuery = useAppStore((state) => state.searchQuery);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

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

    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-24 md:py-32 bg-gray-light relative overflow-hidden dark:bg-gray-900"
    >
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-crimson/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-crimson/10 text-crimson text-sm font-medium rounded-full mb-4">
            Featured Solutions
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-crimson-dark dark:text-white mb-4">
            Premium Products
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Discover our range of high-quality electrical products for all your needs
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-crimson text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-crimson/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => useAppStore.getState().setSearchQuery(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-crimson focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : filteredProducts.length > 0
            ? filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No products found matching your search.
                </p>
                <button
                  onClick={() => {
                    useAppStore.getState().setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="mt-4 text-crimson font-medium hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-crimson font-medium hover:gap-3 transition-all duration-300"
          >
            View all products
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
