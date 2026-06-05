import { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '+201270967959';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const FloatingButtons = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const h = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', h, { passive: true });
    h();
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-5 z-30 flex flex-col items-center gap-3">
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`w-11 h-11 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg flex items-center justify-center text-gray-500 hover:text-crimson hover:border-crimson/30 transition-all duration-300 ${
          showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* WhatsApp */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
      </a>
    </div>
  );
};

export default FloatingButtons;
