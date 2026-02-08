import { useEffect, useRef, useState } from 'react';
import { Award, Users, Zap, Shield } from 'lucide-react';

const stats = [
  { icon: Users, value: '500+', label: 'Projects Completed' },
  { icon: Award, value: '28+', label: 'Years Experience' },
  { icon: Zap, value: '100%', label: 'Quality Certified' },
  { icon: Shield, value: '99.5%', label: 'Client Satisfaction' },
];

const About = () => {
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
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 bg-gray-light relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div
            className={`relative transition-all duration-1000 custom-expo ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative">
              {/* Main Image with Morphing Mask */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-card border border-gray-200">
                <img
                  src="/about-facility.jpg"
                  alt="AMPVIA electrical distribution facility and warehouse"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-crimson text-white rounded-2xl p-6 shadow-lg animate-float">
                <div className="text-center">
                  <span className="text-3xl font-bold block">28+</span>
                  <span className="text-sm opacity-90">Years in Business</span>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-crimson/20 rounded-2xl" />
              <div className="absolute -z-10 top-8 -left-8 w-full h-full bg-crimson/10 rounded-[2rem]" />
            </div>
          </div>

          {/* Content Side */}
          <div
            className={`transition-all duration-1000 custom-expo ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            <span className="inline-block px-4 py-1.5 bg-crimson/10 text-crimson text-sm font-medium rounded-full mb-4">
              About AMPVIA
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-crimson-dark mb-6 leading-tight">
              Leading the industry in electrical excellence
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Since 1995, AMPVIA has been at the forefront of electrical distribution, 
              lighting solutions, and industrial power systems. We combine cutting-edge 
              technology with decades of expertise to deliver unmatched quality and 
              reliability to our clients across Egypt and the Middle East.
            </p>

            <p className="text-gray-600 mb-10 leading-relaxed">
              Our mission is to power progress through innovative electrical solutions. 
              From residential installations to large-scale industrial projects, we provide 
              comprehensive support with certified products that meet international standards. 
              Your vision, powered by our expertise.
            </p>

            <a
              href="#products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-crimson text-white font-semibold rounded-full transition-all duration-300 hover:bg-crimson-dark hover:shadow-lg hover:scale-105"
            >
              Explore Our Solutions
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Stats Row */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-crimson/10 transition-all duration-1000 custom-expo ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: '0.4s' }}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center group"
              style={{ transitionDelay: `${0.5 + index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-crimson/10 rounded-2xl mb-4 group-hover:bg-crimson group-hover:text-white transition-all duration-300">
                <stat.icon className="w-6 h-6 text-crimson group-hover:text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-crimson-dark mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
