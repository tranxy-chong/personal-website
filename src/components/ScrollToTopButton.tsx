import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const heroEl = document.querySelector<HTMLElement>('[data-hero-section]');
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // Appear once the user has scrolled past the hero section bottom
        setVisible(rect.bottom <= 80);
      } else {
        // Fallback threshold for non-home pages such as Works
        setVisible(window.scrollY > 420);
      }
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility, { passive: true });
    window.addEventListener('hashchange', updateVisibility);

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
      window.removeEventListener('hashchange', updateVisibility);
    };
  }, []);

  const handleScrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleScrollToTop}
          aria-label="Scroll to top"
          title="Scroll to top"
          initial={{ opacity: 0, y: 12, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.92 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-20 right-4 sm:bottom-[5.25rem] sm:right-6 z-40 w-11 h-11 rounded-full overflow-hidden bg-[#E4E4E7] dark:bg-[#1E1E24] border border-[#141414]/25 dark:border-white/25 text-[#141414] dark:text-[#F4F4F2] shadow-lg hover:bg-[#F04E00] dark:hover:bg-[#F04E00] hover:text-white hover:border-[#F04E00] transition-colors duration-150 flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F04E00]"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-silver-brushed dark:opacity-0 group-hover:opacity-0 transition-opacity duration-150 pointer-events-none"
          />
          <ArrowUp className="relative z-10 w-4 h-4" strokeWidth={2.25} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
