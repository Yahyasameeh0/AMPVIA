import { Zap } from 'lucide-react';

const items = [
  'Distribution Panels', 'Architectural Lighting', 'Cables & Wiring',
  'Industrial Systems', 'Power Solutions', 'IEC Certified',
  'Quality Assured', 'Cairo, Egypt', '28+ Years Experience',
];

interface MarqueeStripProps {
  dark?: boolean;
}

const MarqueeStrip = ({ dark = false }: MarqueeStripProps) => {
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden py-4 border-y ${dark ? 'bg-crimson-dark border-white/10' : 'bg-crimson border-crimson-dark/20'}`}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-6 px-6 whitespace-nowrap">
            <Zap className="w-3.5 h-3.5 text-white/60 flex-shrink-0" />
            <span className={`text-xs font-semibold tracking-widest uppercase ${dark ? 'text-white/50' : 'text-white/80'}`}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;
