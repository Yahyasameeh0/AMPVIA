import { useEffect, useRef, useState } from 'react';
import { Globe as GlobeIcon, MapPin, Building2, Users, TrendingUp } from 'lucide-react';

const LOCATIONS = [
  { name: 'Cairo', country: 'Egypt', lat: 30.04, lng: 31.24, hq: true, projects: 180 },
  { name: 'Dubai', country: 'UAE', lat: 25.20, lng: 55.27, projects: 45 },
  { name: 'Riyadh', country: 'Saudi Arabia', lat: 24.71, lng: 46.68, projects: 62 },
  { name: 'Jeddah', country: 'Saudi Arabia', lat: 21.49, lng: 39.18, projects: 28 },
  { name: 'Doha', country: 'Qatar', lat: 25.29, lng: 51.52, projects: 24 },
  { name: 'Kuwait City', country: 'Kuwait', lat: 29.38, lng: 47.97, projects: 19 },
  { name: 'Muscat', country: 'Oman', lat: 23.59, lng: 58.38, projects: 15 },
  { name: 'London', country: 'UK', lat: 51.51, lng: -0.13, projects: 32 },
  { name: 'Frankfurt', country: 'Germany', lat: 50.11, lng: 8.68, projects: 18 },
  { name: 'Paris', country: 'France', lat: 48.86, lng: 2.35, projects: 14 },
  { name: 'Singapore', country: 'Singapore', lat: 1.35, lng: 103.82, projects: 22 },
  { name: 'Kuala Lumpur', country: 'Malaysia', lat: 3.14, lng: 101.69, projects: 16 },
  { name: 'Mumbai', country: 'India', lat: 19.08, lng: 72.88, projects: 21 },
  { name: 'Nairobi', country: 'Kenya', lat: -1.29, lng: 36.82, projects: 12 },
  { name: 'Lagos', country: 'Nigeria', lat: 6.52, lng: 3.38, projects: 9 },
];

const HQ_IDX = 0;

const STATS = [
  { label: 'Projects Delivered', value: 500, icon: Building2 },
  { label: 'Countries Served', value: 15, icon: GlobeIcon },
  { label: 'Years Experience', value: 28, icon: TrendingUp },
  { label: 'Global Partners', value: 120, icon: Users },
];

function project(lat: number, lng: number, rotation: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + rotation) * (Math.PI / 180);
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return { x, y, z, visible: z > -radius * 0.2 };
}

function bezierPoint(t: number, p0: number, p1: number, p2: number) {
  const mt = 1 - t;
  return mt * mt * p0 + 2 * mt * t * p1 + t * t * p2;
}

const Globe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const rotRef = useRef(-25);
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);
  const [vis, setVis] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animatedStats, setAnimatedStats] = useState(STATS.map(() => 0));

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect(); } }, { threshold: 0.1 });
    if (sectionRef.current) ob.observe(sectionRef.current);
    return () => ob.disconnect();
  }, []);

  useEffect(() => {
    if (!vis) return;
    const startTime = Date.now();
    const duration = 2000;
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedStats(STATS.map(s => Math.floor(s.value * eased)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [vis]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = Math.min(600, window.innerWidth - 48);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const R = size / 2 - 30;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // Gradient globe fill
      const gradient = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, 0, cx, cy, R);
      gradient.addColorStop(0, 'rgba(139, 17, 25, 0.08)');
      gradient.addColorStop(0.5, 'rgba(100, 13, 20, 0.04)');
      gradient.addColorStop(1, 'rgba(100, 13, 20, 0.01)');

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Outer glow ring
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(100, 13, 20, 0.15)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner atmosphere
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.98, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(139, 17, 25, 0.06)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Latitude lines (more of them)
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath();
        let started = false;
        for (let lng = -180; lng <= 180; lng += 2) {
          const p = project(lat, lng, rotRef.current, R * 0.98);
          if (p.visible) {
            const sx = cx + p.x;
            const sy = cy - p.y;
            if (!started) { ctx.moveTo(sx, sy); started = true; }
            else ctx.lineTo(sx, sy);
          } else { started = false; }
        }
        ctx.strokeStyle = lat === 0 ? 'rgba(100, 13, 20, 0.12)' : 'rgba(100, 13, 20, 0.05)';
        ctx.lineWidth = lat === 0 ? 0.8 : 0.3;
        ctx.stroke();
      }

      // Longitude lines
      for (let lng = -180; lng < 180; lng += 30) {
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 2) {
          const p = project(lat, lng, rotRef.current, R * 0.98);
          if (p.visible) {
            const sx = cx + p.x;
            const sy = cy - p.y;
            if (!started) { ctx.moveTo(sx, sy); started = true; }
            else ctx.lineTo(sx, sy);
          } else { started = false; }
        }
        ctx.strokeStyle = 'rgba(100, 13, 20, 0.05)';
        ctx.lineWidth = 0.3;
        ctx.stroke();
      }

      // Connection arcs from HQ to all other locations
      const hqLoc = LOCATIONS[HQ_IDX];
      const hqProj = project(hqLoc.lat, hqLoc.lng, rotRef.current, R * 0.98);

      LOCATIONS.forEach((loc, idx) => {
        if (idx === HQ_IDX) return;
        if (!hqProj.visible) return;

        const p = project(loc.lat, loc.lng, rotRef.current, R * 0.98);
        if (!p.visible) return;

        const sx1 = cx + hqProj.x;
        const sy1 = cy - hqProj.y;
        const sx2 = cx + p.x;
        const sy2 = cy - p.y;

        // Control point for arc (midpoint with height)
        const mx = (sx1 + sx2) / 2;
        const my = (sy1 + sy2) / 2;
        const dist = Math.hypot(sx2 - sx1, sy2 - sy1);
        const arcHeight = -dist * 0.4;
        const ctrlY = my + arcHeight;

        const isHovered = hoveredLocation === idx || hoveredLocation === HQ_IDX;

        ctx.beginPath();
        ctx.moveTo(sx1, sy1);
        ctx.quadraticCurveTo(mx, ctrlY, sx2, sy2);
        ctx.strokeStyle = isHovered ? 'rgba(139, 17, 25, 0.4)' : 'rgba(100, 13, 20, 0.08)';
        ctx.lineWidth = isHovered ? 1.5 : 0.8;
        ctx.stroke();

        // Animated dot along arc
        const t = ((Date.now() / 2000) + idx * 0.1) % 1;
        const dotX = bezierPoint(t, sx1, mx, sx2);
        const dotY = bezierPoint(t, sy1, ctrlY, sy2);

        ctx.beginPath();
        ctx.arc(dotX, dotY, isHovered ? 2.5 : 1.5, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? 'rgba(139, 17, 25, 0.6)' : 'rgba(139, 17, 25, 0.25)';
        ctx.fill();
      });

      // Location dots
      LOCATIONS.forEach((loc, idx) => {
        const p = project(loc.lat, loc.lng, rotRef.current, R * 0.98);
        if (!p.visible) return;

        const sx = cx + p.x;
        const sy = cy - p.y;
        const depth = (p.z + R) / (2 * R);
        const isHovered = hoveredLocation === idx;
        const isHQ = loc.hq;
        const baseSize = isHQ ? 6 : 3.5;

        // Pulse animation for hovered or HQ
        if (isHovered || isHQ) {
          const pulsePhase = ((Date.now() / (isHQ ? 1500 : 1000)) + idx) % 1;
          const pulseR = baseSize + pulsePhase * 12;
          const pulseAlpha = (1 - pulsePhase) * (isHQ ? 0.15 : 0.2);

          ctx.beginPath();
          ctx.arc(sx, sy, pulseR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139, 17, 25, ${pulseAlpha})`;
          ctx.fill();
        }

        // Outer glow
        ctx.beginPath();
        ctx.arc(sx, sy, isHovered ? 10 : (isHQ ? 8 : 5.5), 0, Math.PI * 2);
        ctx.fillStyle = isHQ ? 'rgba(139, 17, 25, 0.25)' : `rgba(139, 17, 25, ${0.1 + depth * 0.15})`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(sx, sy, isHovered ? 5 : (isHQ ? 4.5 : 3), 0, Math.PI * 2);
        ctx.fillStyle = isHQ ? '#640D14' : 'rgba(100, 13, 20, 0.8)';
        ctx.fill();

        // White center for HQ
        if (isHQ) {
          ctx.beginPath();
          ctx.arc(sx, sy, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#fff';
          ctx.fill();
        }

        // Label
        if (isHQ || isHovered) {
          const labelX = sx + 10;
          const labelY = sy;

          // Background
          ctx.font = `${isHQ ? '600' : '500'} ${isHQ ? 12 : 10}px Outfit, sans-serif`;
          const textW = ctx.measureText(loc.name).width;
          const padX = 6, padY = 3;

          ctx.fillStyle = isHQ ? 'rgba(100, 13, 20, 0.9)' : 'rgba(255,255,255,0.9)';
          ctx.beginPath();
          ctx.roundRect(labelX - padX, labelY - 8 - padY, textW + padX * 2, 14 + padY * 2, 4);
          ctx.fill();

          // Text
          ctx.fillStyle = isHQ ? '#fff' : '#640D14';
          ctx.textAlign = 'left';
          ctx.fillText(loc.name, labelX, labelY + 2);
        }
      });

      rotRef.current += 0.12;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [hoveredLocation]);

  const handleCanvasMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const size = Math.min(600, window.innerWidth - 48);
    const cx = size / 2, R = size / 2 - 30;

    let closest = -1;
    let closestDist = Infinity;

    LOCATIONS.forEach((loc, idx) => {
      const p = project(loc.lat, loc.lng, rotRef.current, R * 0.98);
      if (!p.visible) return;
      const sx = cx + p.x;
      const sy = cx - p.y;
      const d = Math.hypot(mx - sx, my - sy);
      if (d < (loc.hq ? 25 : 18) && d < closestDist) { closest = idx; closestDist = d; }
    });

    if (closest !== hoveredLocation) {
      setHoveredLocation(closest >= 0 ? closest : null);
    }
  };

  const hoveredData = hoveredLocation !== null ? LOCATIONS[hoveredLocation] : null;

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-crimson/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-crimson/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Stats bar */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 transition-all duration-700 delay-100 custom-expo ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {STATS.map((stat, idx) => (
            <div key={stat.label} className="text-center p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-soft border border-gray-100 dark:border-gray-700">
              <stat.icon className="w-5 h-5 text-crimson mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-crimson-dark dark:text-white" style={{ fontFamily: '"DM Serif Display", serif' }}>
                {animatedStats[idx]}+
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 transition-all duration-700 custom-expo ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Text content */}
          <div className="flex-1 max-w-lg">
            <span className="section-label mb-4 block">Global Reach</span>
            <h2 className="display-text text-crimson-dark dark:text-white mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}>
              Powering projects across <em className="display-italic">15 countries</em>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
              From our headquarters in Cairo, AMPVIA has delivered certified electrical solutions to major projects across the Middle East, Europe, Africa, and Asia — partner with a truly global team.
            </p>

            {/* Hovered location card */}
            <div className="min-h-[120px]">
              {hoveredData ? (
                <div className="bg-crimson/5 border border-crimson/20 rounded-2xl p-5 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-crimson" />
                    <span className="font-semibold text-crimson-dark dark:text-white">{hoveredData.name}</span>
                    {hoveredData.hq && <span className="text-[10px] bg-crimson text-white px-2 py-0.5 rounded-full">HQ</span>}
                    <span className="text-xs text-gray-400">{hoveredData.country}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-crimson" />
                      {hoveredData.projects} projects
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-400 flex items-center gap-2">
                  <GlobeIcon className="w-4 h-4" />
                  Hover over a location to see details
                </div>
              )}
            </div>

            {/* Location list */}
            <div className="grid grid-cols-2 gap-2">
              {LOCATIONS.slice(0, 8).map((loc, idx) => (
                <button
                  key={loc.name}
                  onMouseEnter={() => setHoveredLocation(idx)}
                  onMouseLeave={() => setHoveredLocation(null)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                    hoveredLocation === idx
                      ? 'bg-crimson/10 border-crimson/30 border'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent'
                  }`}
                >
                  <MapPin className={`w-3 h-3 flex-shrink-0 ${hoveredLocation === idx || loc.hq ? 'text-crimson' : 'text-gray-300'}`} />
                  <span className={`text-xs font-medium truncate ${hoveredLocation === idx ? 'text-crimson' : 'text-gray-600 dark:text-gray-300'}`}>
                    {loc.name}
                    {loc.hq && <span className="text-[9px] text-crimson ml-1">HQ</span>}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Globe */}
          <div className="flex-shrink-0 relative">
            <div className="absolute -inset-8 bg-crimson/5 rounded-full blur-2xl pointer-events-none animate-pulse-soft" />
            <canvas
              ref={canvasRef}
              onMouseMove={handleCanvasMove}
              onMouseLeave={() => setHoveredLocation(null)}
              className="relative cursor-pointer"
              style={{ width: 'min(600px, calc(100vw - 48px))', height: 'min(600px, calc(100vw - 48px))', maxWidth: 600, maxHeight: 600 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Globe;
