import { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    role: 'Project Manager',
    company: 'Orascom Construction',
    avatar: '/avatar-ahmed.jpg',
    content: 'AMPVIA provided exceptional electrical solutions for our commercial tower project. Their distribution panels are world-class, and the technical support team was always available. Highly professional service throughout.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Mohamed Salah',
    role: 'Facility Director',
    company: 'Cairo International Airport',
    avatar: '/avatar-mohamed.jpg',
    content: 'The architectural lighting system AMPVIA installed exceeded our expectations. Energy-efficient, beautiful aesthetics, and perfectly integrated with our facility management system. Outstanding quality!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Fatma Mahmoud',
    role: 'Chief Engineer',
    company: 'Alexandria Hospitals',
    avatar: '/avatar-fatma.jpg',
    content: 'For critical healthcare facilities, reliability is non-negotiable. AMPVIA\'s power distribution and backup systems have performed flawlessly for 3 years. Their certifications speak for themselves.',
    rating: 5,
  },
];

const Testimonials = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-white dark:bg-gray-950 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-crimson/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 custom-expo ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 bg-crimson/10 text-crimson text-sm font-medium rounded-full mb-4">
            Client Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-crimson-dark mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Join hundreds of satisfied clients who rely on AMPVIA for their electrical infrastructure needs.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`relative transition-all duration-700 custom-expo ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-soft h-full card-lift border border-gray-200 dark:border-gray-700">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-crimson rounded-2xl flex items-center justify-center">
                  <Quote className="w-5 h-5 text-white" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-crimson fill-crimson" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-crimson/20"
                  />
                  <div>
                    <h4 className="font-bold text-crimson-dark">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                    <p className="text-xs text-crimson font-medium mt-0.5">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div
          className={`flex flex-wrap items-center justify-center gap-8 mt-16 pt-16 border-t border-crimson/10 transition-all duration-1000 custom-expo ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.6s' }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-crimson-dark">4.9</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
          </div>
          <div className="w-px h-12 bg-crimson/20 hidden sm:block" />
          <div className="text-center">
            <div className="text-3xl font-bold text-crimson-dark dark:text-white">500+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Projects Delivered</div>
          </div>
          <div className="w-px h-12 bg-crimson/20 hidden sm:block" />
          <div className="text-center">
            <div className="text-3xl font-bold text-crimson-dark dark:text-white">99%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Client Retention</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
