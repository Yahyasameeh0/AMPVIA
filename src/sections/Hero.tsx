import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;
  const opacityFade = Math.max(0, 1 - scrollY / 600);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden grain-overlay"
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 w-full h-[120%] hero-parallax"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <img
          src="/hero-electrical.jpg"
          alt="Modern electrical distribution panel with architectural lighting"
          className={`w-full h-full object-cover transition-all duration-1000 ${
            isLoaded ? 'scale-100 blur-0' : 'scale-110 blur-sm'
          }`}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-crimson-dark/60" />
      </div>

      {/* Floating Light Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center"
        style={{ opacity: opacityFade }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight transition-all duration-1000 custom-expo ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            Powering Your
            <br />
            <span className="text-crimson-light">Vision</span>
          </h1>

          {/* Description */}
          <p
            className={`text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-1000 custom-expo ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.4s' }}
          >
            Leading supplier of electrical distribution panels, architectural lighting solutions, 
            and industrial electrical systems. Excellence in every connection.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 custom-expo ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.6s' }}
          >
            <a
              href="#products"
              className="group relative px-8 py-4 bg-crimson text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Solutions
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-crimson-dark transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </a>
            <a
              href="#categories"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30 transition-all duration-300 hover:bg-white/20 hover:scale-105"
            >
              View Products
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1s' }}
        >
          <a
            href="#categories"
            className="flex flex-col items-center text-white/70 hover:text-white transition-colors"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
