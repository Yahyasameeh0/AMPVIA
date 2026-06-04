import { useEffect, useRef, useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      navigate(`/contact?email=${encodeURIComponent(email)}`);
    }, 600);
  };

  return (
    <section ref={sectionRef} className="relative py-24 md:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/cta-electrical-grid.jpg"
          alt="Modern electrical infrastructure and lighting systems"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-crimson-dark/90 via-crimson-dark/60 to-crimson-dark/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <div className={`transition-all duration-1000 custom-expo ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
            Get Started Today
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Power Your Vision
          </h2>

          <p className="text-base md:text-xl text-white/80 mb-10 max-w-xl mx-auto">
            Request a consultation and discover how AMPVIA can transform your electrical infrastructure.
          </p>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
            <div className={`relative bg-white rounded-full overflow-hidden shadow-2xl transition-all duration-300 ${isSubmitted ? 'ring-4 ring-green-400/40' : ''}`}>
              <div className="flex items-center min-w-0">
                <div className="pl-4 shrink-0 text-crimson/50">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your business email"
                  required
                  className="min-w-0 flex-1 px-3 py-4 bg-transparent text-crimson-dark placeholder:text-gray-400 focus:outline-none text-sm"
                />
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className={`shrink-0 m-1.5 px-4 sm:px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-1.5 text-sm whitespace-nowrap ${
                    isSubmitted ? 'bg-green-500 text-white' : 'bg-crimson text-white hover:bg-crimson-dark'
                  }`}
                >
                  {isSubmitted ? (
                    <><Check className="w-4 h-4" /> Sent!</>
                  ) : (
                    <>Get Quote <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </div>
          </form>

          <p className="text-white/60 text-sm mt-6">
            Free consultation • No obligations • Fast response within 24 hours
          </p>
        </div>

        {/* Social Proof */}
        <div
          className={`flex items-center justify-center gap-6 mt-12 transition-all duration-1000 custom-expo ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '0.3s' }}
        >
          <div className="flex -space-x-3">
            {['/avatar-ahmed.jpg', '/avatar-mohamed.jpg', '/avatar-fatma.jpg'].map((avatar, i) => (
              <img key={i} src={avatar} alt="Client"
                className="w-10 h-10 rounded-full border-2 border-crimson-dark object-cover" />
            ))}
          </div>
          <div className="text-white/80 text-sm">
            <span className="font-semibold text-white">500+</span> companies trust AMPVIA
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
