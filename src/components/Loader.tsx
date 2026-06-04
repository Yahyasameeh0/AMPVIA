import { useEffect, useState } from 'react';

const Loader = ({ onDone }: { onDone: () => void }) => {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setHiding(true);
      setTimeout(onDone, 800);
    }, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  const letters = ['A','M','P','V','I','A'];

  return (
    <div className={`loader ${hiding ? 'hidden' : ''}`}>
      {/* Animated bar */}
      <div className="loader-bar" />

      {/* Logo letters */}
      <div className="loader-logo" style={{ overflow: 'hidden' }}>
        {letters.map((l, i) => (
          <span key={i} style={{ display: 'inline-block', animationDelay: `${0.08 * i + 0.2}s` }}>
            {l}
          </span>
        ))}
      </div>

      {/* Subtitle */}
      <p style={{
        position: 'absolute', bottom: '2.5rem',
        left: '50%', transform: 'translateX(-50%)',
        color: 'rgba(255,255,255,0.4)',
        fontSize: '0.7rem', letterSpacing: '0.25em',
        textTransform: 'uppercase', whiteSpace: 'nowrap',
        animation: 'fadeUp 0.8s 1.2s cubic-bezier(0.16,1,0.3,1) both',
      }}>
        Electrical Excellence
      </p>
    </div>
  );
};

export default Loader;
