import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';

export interface TrueFocusProps {
  sentence?: string;
  separator?: string;
  focusStyle?: 'brackets' | 'box' | 'underline' | 'highlight';
  borderColor?: string;
  highlightColor?: string;
  glowColor?: string;
  focusScale?: number;
  blurAmount?: number;
  unfocusedOpacity?: number;
  easing?: 'smooth' | 'spring';
  order?: 'sequential' | 'random';
  manualMode?: boolean;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  cornerSize?: number;
  borderWidth?: number;
  className?: string;
}

interface FocusRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function TrueFocus({
  sentence = 'True Focus',
  separator = ' ',
  focusStyle = 'brackets',
  borderColor = 'green',
  highlightColor,
  glowColor = 'transparent',
  focusScale = 1,
  blurAmount = 5,
  unfocusedOpacity = 1,
  easing = 'smooth',
  order = 'sequential',
  manualMode = false,
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  cornerSize = 16,
  borderWidth = 3,
  className = '',
}: TrueFocusProps) {
  const words = useMemo(
    () => sentence.split(separator).filter((w) => w.length > 0),
    [sentence, separator]
  );

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [focusRect, setFocusRect] = useState<FocusRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const containerRef = useRef<HTMLSpanElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [sentence, separator]);

  useEffect(() => {
    if (manualMode || words.length <= 1) return;

    const intervalMs = Math.max(
      250,
      (animationDuration + pauseBetweenAnimations) * 1000
    );

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => {
        if (order === 'random') {
          let next = Math.floor(Math.random() * words.length);
          if (next === prev) {
            next = (prev + 1) % words.length;
          }
          return next;
        }
        return (prev + 1) % words.length;
      });
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [
    manualMode,
    words.length,
    animationDuration,
    pauseBetweenAnimations,
    order,
  ]);

  const measureActiveWord = useCallback(() => {
    const activeEl = wordRefs.current[currentIndex];
    const containerEl = containerRef.current;
    if (!activeEl || !containerEl) return;

    const padX = focusStyle === 'underline' ? 2 : 8;
    const padY = focusStyle === 'underline' ? 3 : 3;

    const rawW = activeEl.offsetWidth;
    const rawH = activeEl.offsetHeight;
    const scaledW = rawW * focusScale;
    const scaledH = rawH * focusScale;

    setFocusRect({
      x: activeEl.offsetLeft - (scaledW - rawW) / 2 - padX,
      y: activeEl.offsetTop - (scaledH - rawH) / 2 - padY,
      width: scaledW + padX * 2,
      height: scaledH + padY * 2,
    });
  }, [currentIndex, focusScale, focusStyle]);

  useEffect(() => {
    measureActiveWord();

    const containerEl = containerRef.current;
    if (!containerEl || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measureActiveWord);
      return () => window.removeEventListener('resize', measureActiveWord);
    }

    const observer = new ResizeObserver(() => {
      measureActiveWord();
    });
    observer.observe(containerEl);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        measureActiveWord();
      });
    }

    return () => observer.disconnect();
  }, [measureActiveWord, words]);

  const frameTransition =
    easing === 'spring'
      ? {
          type: 'spring' as const,
          stiffness: 240,
          damping: 22,
          mass: 0.9,
        }
      : {
          duration: animationDuration,
          ease: [0.22, 1, 0.36, 1] as const,
        };

  const hasGlow = glowColor && glowColor !== 'transparent';
  const resolvedHighlight = highlightColor || borderColor;

  return (
    <span
      ref={containerRef}
      className={`relative inline-flex flex-wrap items-baseline gap-x-[0.26em] gap-y-[0.12em] select-none ${className}`}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={`${word}-${index}`}
            ref={(el) => {
              wordRefs.current[index] = el;
            }}
            onMouseEnter={
              manualMode ? () => setCurrentIndex(index) : undefined
            }
            onFocus={manualMode ? () => setCurrentIndex(index) : undefined}
            tabIndex={manualMode ? 0 : undefined}
            className={`relative z-10 inline-block will-change-[filter,opacity,transform] ${
              manualMode ? 'cursor-pointer' : ''
            }`}
            style={{
              filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
              opacity: isActive ? 1 : unfocusedOpacity,
              transform: `scale(${isActive ? focusScale : 1})`,
              transformOrigin: 'center center',
              transition: `filter ${animationDuration}s ease, opacity ${animationDuration}s ease, transform ${animationDuration}s ease`,
            }}
          >
            {word}
          </span>
        );
      })}

      {focusRect.width > 0 && focusRect.height > 0 && (
        <motion.span
          aria-hidden="true"
          className={`pointer-events-none absolute top-0 left-0 ${
            focusStyle === 'highlight' ? 'z-0' : 'z-20'
          }`}
          initial={false}
          animate={{
            x: focusRect.x,
            y: focusRect.y,
            width: focusRect.width,
            height: focusRect.height,
          }}
          transition={frameTransition}
        >
          {focusStyle === 'brackets' && (
            <>
              {/* Top-left bracket */}
              <span
                className="absolute top-0 left-0 rounded-tl-[2px]"
                style={{
                  width: cornerSize,
                  height: cornerSize,
                  borderTop: `${borderWidth}px solid ${borderColor}`,
                  borderLeft: `${borderWidth}px solid ${borderColor}`,
                  filter: hasGlow
                    ? `drop-shadow(0 0 6px ${glowColor})`
                    : undefined,
                }}
              />
              {/* Top-right bracket */}
              <span
                className="absolute top-0 right-0 rounded-tr-[2px]"
                style={{
                  width: cornerSize,
                  height: cornerSize,
                  borderTop: `${borderWidth}px solid ${borderColor}`,
                  borderRight: `${borderWidth}px solid ${borderColor}`,
                  filter: hasGlow
                    ? `drop-shadow(0 0 6px ${glowColor})`
                    : undefined,
                }}
              />
              {/* Bottom-left bracket */}
              <span
                className="absolute bottom-0 left-0 rounded-bl-[2px]"
                style={{
                  width: cornerSize,
                  height: cornerSize,
                  borderBottom: `${borderWidth}px solid ${borderColor}`,
                  borderLeft: `${borderWidth}px solid ${borderColor}`,
                  filter: hasGlow
                    ? `drop-shadow(0 0 6px ${glowColor})`
                    : undefined,
                }}
              />
              {/* Bottom-right bracket */}
              <span
                className="absolute bottom-0 right-0 rounded-br-[2px]"
                style={{
                  width: cornerSize,
                  height: cornerSize,
                  borderBottom: `${borderWidth}px solid ${borderColor}`,
                  borderRight: `${borderWidth}px solid ${borderColor}`,
                  filter: hasGlow
                    ? `drop-shadow(0 0 6px ${glowColor})`
                    : undefined,
                }}
              />
            </>
          )}

          {focusStyle === 'box' && (
            <span
              className="block w-full h-full rounded-md"
              style={{
                border: `${borderWidth}px solid ${borderColor}`,
                boxShadow: hasGlow ? `0 0 14px ${glowColor}` : undefined,
              }}
            />
          )}

          {focusStyle === 'underline' && (
            <span
              className="absolute left-0 right-0 bottom-0 rounded-full"
              style={{
                height: borderWidth,
                backgroundColor: borderColor,
                boxShadow: hasGlow ? `0 0 10px ${glowColor}` : undefined,
              }}
            />
          )}

          {focusStyle === 'highlight' && (
            <span
              className="block w-full h-full rounded-md"
              style={{
                backgroundColor: resolvedHighlight,
                opacity: 0.22,
                boxShadow: hasGlow ? `0 0 16px ${glowColor}` : undefined,
              }}
            />
          )}
        </motion.span>
      )}
    </span>
  );
}
