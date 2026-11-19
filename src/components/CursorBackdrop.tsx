import { useEffect, useRef, useState } from 'react';

interface CursorBackdropProps {
  isDark: boolean;
}

export function CursorBackdrop({ isDark }: CursorBackdropProps) {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mediaReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mediaFinePointer = window.matchMedia('(pointer: fine)');

    if (mediaReduced.matches || !mediaFinePointer.matches) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    let targetX = window.innerWidth * 0.55;
    let targetY = window.innerHeight * 0.3;
    let currentX = targetX;
    let currentY = targetY;
    let rafId = 0;

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX - 280}px, ${currentY - 280}px, 0)`;
      }

      if (gridRef.current) {
        gridRef.current.style.maskImage = `radial-gradient(280px circle at ${currentX}px ${currentY}px, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 45%, transparent 78%)`;
        gridRef.current.style.webkitMaskImage = `radial-gradient(280px circle at ${currentX}px ${currentY}px, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 45%, transparent 78%)`;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Subtle Architectural Drafting Grid Spotlight revealed around cursor */}
      <div
        ref={gridRef}
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(to right, rgba(228, 228, 231, 0.11) 1px, transparent 1px), linear-gradient(to bottom, rgba(228, 228, 231, 0.11) 1px, transparent 1px)'
            : 'linear-gradient(to right, rgba(20, 20, 20, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(20, 20, 20, 0.08) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Smooth Specular Brushed-Silver & Faint Signal-Orange Ambient Glow */}
      <div
        ref={glowRef}
        className="w-[560px] h-[560px] rounded-full will-change-transform"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(212, 212, 216, 0.14) 0%, rgba(240, 78, 0, 0.08) 38%, rgba(13, 13, 15, 0) 70%)'
            : 'radial-gradient(circle, rgba(255, 255, 255, 0.85) 0%, rgba(161, 161, 170, 0.22) 38%, rgba(240, 78, 0, 0.06) 56%, rgba(244, 244, 242, 0) 74%)',
        }}
      />
    </div>
  );
}
