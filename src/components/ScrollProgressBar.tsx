import { useEffect, useState, type RefObject } from 'react';

interface ScrollProgressBarProps {
  /** Optional scroll container ref. Defaults to tracking window scroll when omitted. */
  containerRef?: RefObject<HTMLElement | null>;
  /** Z-index utility class (e.g. z-50 for pages, z-[60] above modal backdrops) */
  zIndexClass?: string;
  /** Accessible label for screen readers */
  label?: string;
  /** Re-trigger measurement when layout/content height changes */
  recalcKey?: string | number;
}

export function ScrollProgressBar({
  containerRef,
  zIndexClass = 'z-50',
  label = 'Reading progress',
  recalcKey,
}: ScrollProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = containerRef?.current ?? null;

    const updateProgress = () => {
      if (containerRef) {
        const el = containerRef.current;
        if (!el) return;
        const maxScroll = el.scrollHeight - el.clientHeight;
        if (maxScroll <= 2) {
          setProgress(1);
          return;
        }
        const ratio = Math.min(1, Math.max(0, el.scrollTop / maxScroll));
        setProgress(ratio);
      } else {
        const doc = document.documentElement;
        const maxScroll = doc.scrollHeight - window.innerHeight;
        if (maxScroll <= 2) {
          setProgress(0);
          return;
        }
        const ratio = Math.min(1, Math.max(0, window.scrollY / maxScroll));
        setProgress(ratio);
      }
    };

    updateProgress();

    const scrollTarget: HTMLElement | Window = target ?? window;
    scrollTarget.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      const observeTarget = target ?? document.body;
      resizeObserver = new ResizeObserver(updateProgress);
      resizeObserver.observe(observeTarget);
    }

    return () => {
      scrollTarget.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      resizeObserver?.disconnect();
    };
  }, [containerRef, recalcKey]);

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      className={`fixed top-0 left-0 right-0 ${zIndexClass} h-[3px] bg-[#141414]/10 dark:bg-white/12 pointer-events-none overflow-hidden`}
    >
      <div
        className="h-full w-full origin-left bg-[#F04E00] transition-transform duration-75 ease-out will-change-transform relative"
        style={{ transform: `scaleX(${progress})` }}
      >
        <span
          aria-hidden="true"
          className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-r from-[#F04E00] to-[#F4F4F5]"
        />
      </div>
    </div>
  );
}
