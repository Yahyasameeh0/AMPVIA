import { useEffect, useRef, useState } from 'react';
import { Globe as GlobeIcon, MapPin } from 'lucide-react';

const LOCATIONS = [
  { name: 'Cairo', country: 'Egypt', lat: 30.04, lng: 31.24 },
  { name: 'Dubai', country: 'UAE', lat: 25.20, lng: 55.27 },
  { name: 'Riyadh', country: 'Saudi Arabia', lat: 24.71, lng: 46.68 },
  { name: 'London', country: 'UK', lat: 51.51, lng: -0.13 },
  { name: 'Singapore', country: 'Singapore', lat: 1.35, lng: 103.82 },
];

const LAT_LINES = [-60, -30, 0, 30, 60];
const LNG_LINES = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150, 180];

function project(lat: number, lng: number, rotation: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + rotation) * (Math.PI / 180);
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return { x, y, z, visible: z > 0 };
}

const Globe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const rotRef = useRef(0);
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);
  const [vis, setVis] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect(); } }, { threshold: 0.15 });
    if (sectionRef.current) ob.observe(sectionRef.current);
    return () => ob.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 420;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const R = size / 2 - 20;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // Globe outline circle (subtle)
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(100, 13, 20, 0.06)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Latitude lines
      LAT_LINES.forEach(lat => {
        ctx.beginPath();
        let started = false;
        for (let lng = -180; lng <= 180; lng += 3) {
          const p = project(lat, lng, rotRef.current, R);
          if (p.visible) {
            const sx = cx + p.x;
            const sy = cy - p.y;
            if (!started) { ctx.moveTo(sx, sy); started = true; }
            else ctx.lineTo(sx, sy);
          } else { started = false; }
        }
        ctx.strokeStyle = 'rgba(100, 13, 20, 0.07)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Longitude lines
      LNG_LINES.forEach(lng => {
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 3) {
          const p = project(lat, lng, rotRef.current, R);
          if (p.visible) {
            const sx = cx + p.x;
            const sy = cy - p.y;
            if (!started) { ctx.moveTo(sx, sy); started = true; }
            else ctx.lineTo(sx, sy);
          } else { started = false; }
        }
        ctx.strokeStyle = 'rgba(100, 13, 20, 0.07)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Location dots
      LOCATIONS.forEach((loc, idx) => {
        const p = project(loc.lat, loc.lng, rotRef.current, R);
        if (!p.visible) return;
        const sx = cx + p.x;
        const sy = cy - p.y;
        const depth = (p.z + R) / (2 * R);
        const isHovered = hoveredLocation === idx;

        // Pulse ring
        if (isHovered) {
          ctx.beginPath();
          ctx.arc(sx, sy, 12, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(100, 13, 20, 0.1)';
          ctx.fill();
        }

        // Glow
        ctx.beginPath();
        ctx.arc(sx, sy, isHovered ? 7 : 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 17, 25, ${0.2 + depth * 0.3})`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(sx, sy, isHovered ? 4 : 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 13, 20, ${0.5 + depth * 0.5})`;
        ctx.fill();

        // Label
        if (isHovered || depth > 0.5) {
          ctx.font = `${isHovered ? '600' : '500'} ${isHovered ? 11 : 9}px Outfit, sans-serif`;
          ctx.fillStyle = `rgba(100, 13, 20, ${isHovered ? 0.9 : 0.4 + depth * 0.4})`;
          ctx.textAlign = 'left';
          ctx.fillText(loc.name, sx + 8, sy + 3);
        }
      });

      rotRef.current += 0.15;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [hoveredLocation]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const cx = 210, R = 190;

    let closest = -1;
    let closestDist = Infinity;

    LOCATIONS.forEach((loc, idx) => {
      const p = project(loc.lat, loc.lng, rotRef.current, R);
      if (!p.visible) return;
      const sx = cx + p.x;
      const sy = cx - p.y;
      const d = Math.hypot(mx - sx, my - sy);
      if (d < 20 && d < closestDist) { closest = idx; closestDist = d; }
    });

    setHoveredLocation(closest >= 0 ? (hoveredLocation === closest ? null : closest) : null);
  };

  return (
    <section ref={sectionRef} className="py-28 md:py-36 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-20 transition-all duration-900 custom-expo ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Text content */}
          <div className="flex-1 max-w-xl">
            <span className="section-label mb-5 block">Global Reach</span>
            <h2 className="display-text text-crimson-dark dark:text-white mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Powering projects <em className="display-italic">worldwide</em>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
              From our headquarters in Cairo, AMPVIA delivers certified electrical solutions across the Middle East, Europe, and Asia. Our network spans 5 countries and continues to grow.
            </p>

            <div className="space-y-4">
              {LOCATIONS.map((loc, idx) => (
                <div
                  key={loc.name}
                  onMouseEnter={() => setHoveredLocation(idx)}
                  onMouseLeave={() => setHoveredLocation(null)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                    hoveredLocation === idx
                      ? 'border-crimson/30 bg-crimson/5'
                      : 'border-gray-100 dark:border-gray-800 hover:border-crimson/20 hover:bg-crimson/3'
                  }`}
                >
                  <MapPin className={`w-4 h-4 flex-shrink-0 ${hoveredLocation === idx ? 'text-crimson' : 'text-gray-400'}`} />
                  <div>
                    <span className={`text-sm font-semibold ${hoveredLocation === idx ? 'text-crimson' : 'text-crimson-dark dark:text-white'}`}>{loc.name}</span>
                    <span className="text-xs text-gray-400 ml-2">{loc.country}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Globe */}
          <div className="flex-shrink-0 relative">
            <div className="absolute -inset-10 bg-crimson/3 rounded-full blur-3xl pointer-events-none" />
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="relative cursor-pointer"
              style={{ width: 420, height: 420 }}
            />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[10px] text-gray-400">
              <GlobeIcon className="w-3 h-3" />
              Interactive — click to explore
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Globe;
