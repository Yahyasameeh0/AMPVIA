import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero = () => {
  const heroRef  = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded]   = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId); };
  }, []);

  const parallax = scrollY * 0.28;
  const fade     = Math.max(0, 1 - scrollY / 550);

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 h-[115%]" style={{ transform: `translateY(${parallax}px)` }}>
        <img
          src="/hero-electrical.jpg"
          alt="AMPVIA — electrical infrastructure"
          className={`w-full h-full object-cover transition-all duration-1200 ${loaded ? 'scale-100 blur-0' : 'scale-110 blur-md'}`}
        />
        {/* Layered overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/30 to-crimson-dark/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-crimson-dark/80 via-transparent to-transparent" />
      </div>

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E\")" }} />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div key={i}
            className="absolute rounded-full bg-white/20 animate-float"
            style={{
              width:  `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              left:  `${8 + i * 8}%`,
              top:   `${15 + (i * 17) % 65}%`,
              animationDelay:    `${i * 0.4}s`,
              animationDuration: `${5 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Grid lines decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-6 lg:px-20 pt-24 pb-16" style={{ opacity: fade }}>

        {/* Label */}
        <div className={`mb-8 transition-all duration-1000 custom-expo ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0.15s' }}>
          <span className="section-label-white">Electrical Excellence Since 1995</span>
        </div>

        {/* Headline */}
        <h1 className="display-text text-white max-w-4xl mb-8" style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}>
          {['Powering', 'Your'].map((word, wi) => (
            <span key={wi} className="block overflow-hidden">
              <span className={`block transition-all duration-1000 custom-expo ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                style={{ transitionDelay: `${0.25 + wi * 0.12}s` }}>
                {wi === 1
                  ? <><em className="display-italic not-italic" style={{ color: '#e87a80' }}>Your</em></>
                  : word}
              </span>
            </span>
          ))}
          <span className="block overflow-hidden">
            <span className={`block display-italic transition-all duration-1000 custom-expo ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
              style={{ transitionDelay: '0.49s', color: '#e87a80' }}>
              Vision.
            </span>
          </span>
        </h1>

        {/* Description */}
        <p className={`text-white/75 max-w-xl mb-12 leading-relaxed text-lg transition-all duration-1000 custom-expo ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0.62s', fontWeight: 300 }}>
          Leading supplier of electrical distribution panels, architectural lighting, and industrial power systems — excellence in every connection.
        </p>

        {/* CTAs */}
        <div className={`flex flex-wrap items-center gap-5 transition-all duration-1000 custom-expo ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0.75s' }}>
          <a href="#products"
            className="group relative px-8 py-4 bg-white text-crimson-dark font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-deep hover:scale-105"
            data-hover>
            <span className="relative z-10 flex items-center gap-2">
              Explore Solutions
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-crimson-light scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100 opacity-10" />
          </a>
          <a href="#categories"
            className="px-8 py-4 border border-white/40 text-white font-medium rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/70"
            data-hover>
            View Products
          </a>
        </div>

        {/* Stats row */}
        <div className={`flex flex-wrap gap-12 mt-20 pt-12 border-t border-white/15 transition-all duration-1000 custom-expo ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0.9s' }}>
          {[['500+','Projects Completed'],['28+','Years Experience'],['99.5%','Client Satisfaction']].map(([num, label]) => (
            <div key={label}>
              <div className="display-text text-white" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>{num}</div>
              <div className="text-white/50 text-sm mt-1" style={{ letterSpacing: '0.05em' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ transitionDelay: '1.2s' }}>
        <a href="#categories" className="flex flex-col items-center text-white/50 hover:text-white/80 transition-colors" data-hover>
          <span className="text-xs tracking-widest uppercase mb-3">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
