import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export function Cursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [clicked, setClicked] = useState(false);

  const springCfg = { damping: 22, stiffness: 280, mass: 0.6 };
  const rx = useSpring(-200, springCfg);
  const ry = useSpring(-200, springCfg);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      rx.set(e.clientX);
      ry.set(e.clientY);
      setIsHidden(false);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      setIsPointer(
        !!(el?.closest('a, button, [role="button"], input, textarea, select, [data-cursor]'))
      );
    };
    const onLeave = () => setIsHidden(true);
    const onEnter = () => setIsHidden(false);
    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <>
      {/* Dot — snaps instantly */}
      <div
        className="fixed pointer-events-none"
        style={{
          zIndex: 99999,
          left: pos.x - 4,
          top: pos.y - 4,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#FF6B00',
          opacity: isHidden ? 0 : isPointer ? 0 : 1,
          transform: clicked ? 'scale(2)' : 'scale(1)',
          transition: 'opacity 0.25s, transform 0.1s',
          boxShadow: '0 0 10px rgba(255,107,0,0.7)',
        }}
      />

      {/* Ring — lags with spring */}
      <motion.div
        className="fixed pointer-events-none rounded-full"
        style={{
          zIndex: 99998,
          x: rx,
          y: ry,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isHidden ? 0 : 1,
          width: isPointer ? 44 : clicked ? 20 : 28,
          height: isPointer ? 44 : clicked ? 20 : 28,
          border: `1.5px solid ${isPointer ? '#FF6B00' : 'rgba(255,107,0,0.55)'}`,
          background: isPointer ? 'rgba(255,107,0,0.08)' : 'transparent',
          boxShadow: isPointer
            ? '0 0 20px rgba(255,107,0,0.35), inset 0 0 8px rgba(255,107,0,0.1)'
            : '0 0 6px rgba(255,107,0,0.12)',
          transition: 'width 0.18s ease, height 0.18s ease, border-color 0.18s, box-shadow 0.18s, opacity 0.25s',
        }}
      />

      {/* Subtle glow halo */}
      <motion.div
        className="fixed pointer-events-none rounded-full"
        style={{
          zIndex: 99997,
          x: rx,
          y: ry,
          translateX: '-50%',
          translateY: '-50%',
          width: 80,
          height: 80,
          background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%)',
          opacity: isHidden ? 0 : 0.7,
          transition: 'opacity 0.3s',
        }}
      />
    </>
  );
}
