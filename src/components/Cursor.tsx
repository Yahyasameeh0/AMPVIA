import { useEffect, useRef } from 'react';

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(hover: none)').matches ||
   window.matchMedia('(pointer: coarse)').matches);

const Cursor = () => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTouchDevice()) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // show elements
    dot.style.opacity  = '1';
    ring.style.opacity = '1';

    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    let raf: number;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };

    const tick = () => {
      dot.style.left  = `${mx}px`;
      dot.style.top   = `${my}px`;
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.left = `${rx}px`;
      ring.style.top  = `${ry}px`;
      raf = requestAnimationFrame(tick);
    };

    const onEnter = () => { dot.classList.add('hovered'); ring.classList.add('hovered'); };
    const onLeave = () => { dot.classList.remove('hovered'); ring.classList.remove('hovered'); };

    const attachHover = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    attachHover();
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);

    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  if (isTouchDevice()) return null;

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  style={{ opacity: 0 }} />
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} />
    </>
  );
};

export default Cursor;
