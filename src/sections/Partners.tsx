import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const partners = [
  { id: 1, name: 'Siemens', logo: '/partner-siemens.svg' },
  { id: 2, name: 'Schneider Electric', logo: '/partner-schneider.svg' },
  { id: 3, name: 'ABB', logo: '/partner-abb.svg' },
  { id: 4, name: 'Legrand', logo: '/partner-legrand.svg' },
  { id: 5, name: 'Philips', logo: '/partner-philips.svg' },
  { id: 6, name: 'Eaton', logo: '/partner-eaton.svg' },
];

export default function Partners() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      ref={sectionRef}
      className="py-16 bg-white dark:bg-gray-dark transition-colors border-t border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-crimson/10 text-crimson text-sm font-medium rounded-full mb-4">
            Our Partners
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-crimson-dark dark:text-white">
            Trusted by Industry Leaders
          </h2>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all duration-500 group"
            >
              <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                {/* Placeholder for partner logo */}
                <div className="w-24 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 text-center px-2">
                    {partner.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
