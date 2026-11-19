import { motion } from 'motion/react';

interface SectionSeparatorProps {
  /** Alignment origin of the hairline draw-in animation */
  origin?: 'left' | 'center' | 'right';
  /** Slight delay offset for the brushed-silver sheen sweep (in seconds) */
  sheenDelay?: number;
  /** Optional subtle surface background behind the full-bleed track */
  surface?: 'transparent' | 'paper' | 'dark-top';
  /** Optional index tick mark offset position along the container rail */
  datumAlign?: 'left' | 'center' | 'right';
}

export function SectionSeparator({
  origin = 'center',
  sheenDelay = 0,
  surface = 'transparent',
  datumAlign = 'center',
}: SectionSeparatorProps) {
  const originClass =
    origin === 'left'
      ? 'origin-left'
      : origin === 'right'
        ? 'origin-right'
        : 'origin-center';

  const datumPositionClass =
    datumAlign === 'left'
      ? 'justify-start'
      : datumAlign === 'right'
        ? 'justify-end'
        : 'justify-center';

  const bgClass =
    surface === 'paper'
      ? 'bg-[#FAFAF9]/85 dark:bg-[#111114]/85'
      : surface === 'dark-top'
        ? 'bg-gradient-to-b from-transparent via-[#141414]/5 to-[#141414] dark:via-white/5 dark:to-[#16161A]'
        : '';

  return (
    <div
      aria-hidden="true"
      className={`relative z-10 w-full overflow-x-clip ${bgClass}`}
    >
      {/* Full-bleed architectural hairline track */}
      <div className="relative h-px w-full overflow-hidden">
        <motion.div
          initial={{ scaleX: 0, opacity: 0.35 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full w-full ${originClass} bg-[#141414]/12 dark:bg-white/12`}
        />

        {/* Subtle continuous brushed-silver specular sweep */}
        <div
          style={{ animationDelay: `${sheenDelay}s` }}
          className="animate-separator-sheen pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-[#A1A1AA]/75 dark:via-white/55 to-transparent"
        />
      </div>

      {/* Container-aligned brushed-silver datum notch */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2`}
      >
        <div
          className={`max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex ${datumPositionClass}`}
        >
          <motion.div
            initial={{ opacity: 0, scaleX: 0.4 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-1"
          >
            <span className="block w-5 h-[5px] rounded-[1px] bg-silver-brushed border border-[#141414]/20 dark:border-white/25" />
            <span className="block w-[5px] h-[5px] rounded-[1px] bg-[#F04E00]" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
