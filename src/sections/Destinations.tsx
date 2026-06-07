import { useEffect, useRef, useState } from 'react';
import { MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  location: string;
  rating: number;
  image: string;
  description: string;
  category: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: 'Cairo Tower Illumination',
    location: 'Cairo, Egypt',
    rating: 5.0,
    image: '/project-tower.jpg',
    description: 'Architectural LED lighting for iconic landmark',
    category: 'Lighting',
  },
  {
    id: 2,
    name: 'Industrial Complex Power',
    location: 'Suez, Egypt',
    rating: 4.9,
    image: '/project-industrial.jpg',
    description: 'Complete electrical distribution for factory',
    category: 'Industrial',
  },
  {
    id: 3,
    name: 'Commercial Mall System',
    location: 'Alexandria, Egypt',
    rating: 4.9,
    image: '/project-mall.jpg',
    description: 'Smart lighting and power management',
    category: 'Commercial',
  },
  {
    id: 4,
    name: 'Residential Tower',
    location: 'New Cairo, Egypt',
    rating: 4.8,
    image: '/project-residential.jpg',
    description: 'Full electrical infrastructure installation',
    category: 'Residential',
  },
  {
    id: 5,
    name: 'Stadium Lighting',
    location: 'Giza, Egypt',
    rating: 5.0,
    image: '/project-stadium.jpg',
    description: 'High-performance sports lighting system',
    category: 'Sports',
  },
  {
    id: 6,
    name: 'Hospital Power Backup',
    location: 'Cairo, Egypt',
    rating: 5.0,
    image: '/project-hospital.jpg',
    description: 'Critical power distribution and UPS systems',
    category: 'Healthcare',
  },
];

const Destinations = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons();
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  return (
    <section
      id="destinations"
      ref={sectionRef}
      className="py-24 md:py-32 bg-crimson-dark relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between mb-12 transition-all duration-1000 custom-expo ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-sm font-medium rounded-full mb-4">
              Our Work
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Featured Projects
            </h2>
            <p className="text-white/70 mt-4 max-w-lg">
              Explore our portfolio of successful electrical installations across diverse sectors.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-6 md:mt-0">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center transition-all duration-300 ${
                canScrollLeft
                  ? 'text-white hover:bg-white hover:text-crimson-dark'
                  : 'text-white/30 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center transition-all duration-300 ${
                canScrollRight
                  ? 'text-white hover:bg-white hover:text-crimson-dark'
                  : 'text-white/30 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Project Gallery */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-8 px-6 scrollbar-hide horizontal-scroll"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`flex-shrink-0 w-72 transition-all duration-700 custom-expo ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <div className="block group">
              {/* Project Card */}
              <div className="polaroid rounded-sm rotate-0 hover:rotate-1 transition-transform duration-300">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Rating Badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-crimson fill-crimson" />
                    <span className="text-sm font-semibold text-crimson-dark">{project.rating}</span>
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-3 right-3 bg-crimson/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <span className="text-xs font-semibold text-white">{project.category}</span>
                  </div>
                </div>

                {/* Caption */}
                <div className="p-4 pt-3">
                  <div className="flex items-center gap-1.5 text-gray-600 mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-xs">{project.location}</span>
                  </div>
                  <h3 className="font-bold text-crimson-dark text-lg group-hover:text-crimson transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Destinations;
