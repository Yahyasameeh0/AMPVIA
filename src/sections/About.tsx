import { useEffect, useRef, useState } from 'react';
import { Award, Users, Zap, Shield } from 'lucide-react';

const stats = [
  { icon: Users, value: 500,  suffix: '+', label: 'Projects Completed' },
  { icon: Award, value: 28,   suffix: '+', label: 'Years Experience' },
  { icon: Zap,   value: 100,  suffix: '%', label: 'Quality Certified' },
  { icon: Shield,value: 99.5, suffix: '%', label: 'Client Satisfaction' },
];

const useCounter = (target: number, active: boolean, duration = 1600) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(parseFloat((target * ease).toFixed(target % 1 !== 0 ? 1 : 0)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
};

const StatItem = ({ stat, active }: { stat: typeof stats[0]; active: boolean }) => {
  const count = useCounter(stat.value, active);
  return (
    <div className="group text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-crimson/8 mb-5 group-hover:bg-crimson transition-colors duration-300">
        <stat.icon className="w-6 h-6 text-crimson group-hover:text-white transition-colors duration-300" />
      </div>
      <div className="counter-num">{count}{stat.suffix}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
    </div>
  );
};

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="py-28 md:py-36 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image column */}
          <div className={`relative transition-all duration-1000 custom-expo ${vis ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden shadow-deep aspect-[4/3]">
              <img src="/about-facility.jpg" alt="AMPVIA facility" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-crimson-dark/30 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-7 -right-7 bg-crimson-dark text-white rounded-2xl px-7 py-5 shadow-deep animate-float">
              <div className="display-text text-white text-4xl leading-none">28+</div>
              <div className="text-white/60 text-xs mt-1 tracking-wider uppercase">Years</div>
            </div>

            {/* Corner decoration */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border border-crimson/20 rounded-2xl" />
            <div className="absolute -z-10 top-6 -left-6 w-full h-full bg-crimson/6 rounded-3xl" />
          </div>

          {/* Text column */}
          <div className={`transition-all duration-1000 custom-expo ${vis ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
            style={{ transitionDelay: '0.2s' }}>
            <span className="section-label mb-6 block">About AMPVIA</span>

            <h2 className="display-text text-crimson-dark mb-8" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              Leading the industry<br />
              in electrical <em className="display-italic">excellence</em>
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
              Since 1995, AMPVIA has been at the forefront of electrical distribution, lighting solutions, and industrial power systems. We combine cutting-edge technology with decades of expertise to deliver unmatched quality across Egypt and the Middle East.
            </p>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-10 text-sm">
              From residential installations to large-scale industrial projects — comprehensive support with internationally certified products.
            </p>

            <a href="#products" data-hover
              className="inline-flex items-center gap-3 group">
              <span className="w-12 h-12 rounded-full bg-crimson flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Zap className="w-5 h-5 text-white" />
              </span>
              <span className="font-semibold text-crimson-dark group-hover:text-crimson transition-colors">Explore our solutions</span>
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-10 mt-24 pt-16 border-t border-gray-100 dark:border-gray-800 transition-all duration-1000 custom-expo ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '0.4s' }}>
          {stats.map(s => <StatItem key={s.label} stat={s} active={vis} />)}
        </div>
      </div>
    </section>
  );
};

export default About;
