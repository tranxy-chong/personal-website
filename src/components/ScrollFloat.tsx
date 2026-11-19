import { useMemo, useRef, type ElementType, type RefObject } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';

export interface ScrollFloatProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  scrollContainerRef?: RefObject<HTMLElement | null>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  stagger?: number;
  scrollStart?: string;
  scrollEnd?: string;
  yOffset?: number;
  scaleYStart?: number;
  scaleXStart?: number;
}

interface ScrollFloatCharProps {
  char: string;
  progress: MotionValue<number>;
  rangeStart: number;
  rangeEnd: number;
  yOffset: number;
  scaleYStart: number;
  scaleXStart: number;
  textClassName: string;
}

function ScrollFloatChar({
  char,
  progress,
  rangeStart,
  rangeEnd,
  yOffset,
  scaleYStart,
  scaleXStart,
  textClassName,
}: ScrollFloatCharProps) {
  const opacity = useTransform(progress, [rangeStart, rangeEnd], [0, 1]);
  const y = useTransform(progress, [rangeStart, rangeEnd], [yOffset, 0]);
  const scaleY = useTransform(
    progress,
    [rangeStart, rangeEnd],
    [scaleYStart, 1]
  );
  const scaleX = useTransform(
    progress,
    [rangeStart, rangeEnd],
    [scaleXStart, 1]
  );

  return (
    <motion.span
      style={{
        opacity,
        y,
        scaleY,
        scaleX,
        transformOrigin: '50% 0%',
      }}
      className={`inline-block will-change-transform ${textClassName}`}
    >
      {char}
    </motion.span>
  );
}

export function ScrollFloat({
  children,
  as = 'h2',
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  stagger = 0.03,
  scrollStart = 'start 94%',
  scrollEnd = 'start 52%',
  yOffset = 38,
  scaleYStart = 2.1,
  scaleXStart = 0.74,
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainerRef,
    offset: [scrollStart as never, scrollEnd as never],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: Math.max(90, Math.round(180 / Math.max(0.4, animationDuration))),
    damping: 26,
    mass: 0.55,
  });

  const { words, totalChars } = useMemo(() => {
    const tokens = children.split(/(\s+)/);
    let charCounter = 0;
    const mapped = tokens.map((token) => {
      if (/^\s+$/.test(token)) {
        return { isSpace: true as const, value: token, chars: [] };
      }
      const chars = Array.from(token).map((ch) => ({
        char: ch,
        index: charCounter++,
      }));
      return { isSpace: false as const, value: token, chars };
    });
    return { words: mapped, totalChars: Math.max(1, charCounter) };
  }, [children]);

  const Component = as as ElementType;

  // Compute staggered character window inside [0, 1]
  const spanWindow = Math.min(0.55, Math.max(0.28, 0.45 / Math.max(0.5, animationDuration)));
  const maxStaggerSpan = Math.min(1 - spanWindow, totalChars * stagger);

  return (
    <Component
      ref={containerRef}
      aria-label={children}
      className={`overflow-hidden py-0.5 ${containerClassName}`}
    >
      {prefersReducedMotion ? (
        <span className={textClassName}>{children}</span>
      ) : (
        <span aria-hidden="true" className="inline-block">
          {words.map((token, tokenIdx) => {
            if (token.isSpace) {
              return <span key={`sp-${tokenIdx}`}> </span>;
            }
            return (
              <span
                key={`w-${tokenIdx}`}
                className="inline-block whitespace-nowrap"
              >
                {token.chars.map(({ char, index }) => {
                  const ratio =
                    totalChars > 1 ? index / (totalChars - 1) : 0;
                  const rangeStart = ratio * maxStaggerSpan;
                  const rangeEnd = Math.min(1, rangeStart + spanWindow);

                  return (
                    <ScrollFloatChar
                      key={`c-${index}`}
                      char={char}
                      progress={smoothProgress}
                      rangeStart={rangeStart}
                      rangeEnd={rangeEnd}
                      yOffset={yOffset}
                      scaleYStart={scaleYStart}
                      scaleXStart={scaleXStart}
                      textClassName={textClassName}
                    />
                  );
                })}
              </span>
            );
          })}
        </span>
      )}
    </Component>
  );
}
