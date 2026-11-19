import { useEffect, useRef, useState, type TouchEvent } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowUpRight, Layers } from 'lucide-react';
import type { WorkItem } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';
import { ScrollProgressBar } from './ScrollProgressBar';
import { StarBorder } from './StarBorder';

interface WorkDetailModalProps {
  work: WorkItem | null;
  initialSlide?: number;
  onClose: () => void;
}

export function WorkDetailModal({
  work,
  initialSlide = 0,
  onClose,
}: WorkDetailModalProps) {
  const [slideIndex, setSlideIndex] = useState(initialSlide);
  const touchStartX = useRef<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSlideIndex(initialSlide);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [work, initialSlide]);

  useEffect(() => {
    if (!work) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setSlideIndex((prev) => (prev - 1 + work.slides.length) % work.slides.length);
      } else if (e.key === 'ArrowRight') {
        setSlideIndex((prev) => (prev + 1) % work.slides.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [work, onClose]);

  if (!work) return null;

  const total = work.slides.length;
  const currentSlide = work.slides[slideIndex] || work.slides[0];

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        setSlideIndex((prev) => (prev + 1) % total);
      } else {
        setSlideIndex((prev) => (prev - 1 + total) % total);
      }
    }
    touchStartX.current = null;
  };

  return (
    <div
      ref={scrollContainerRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${work.title} case study preview`}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm p-3 sm:p-6"
      onClick={onClose}
    >
      <ScrollProgressBar
        containerRef={scrollContainerRef}
        zIndexClass="z-[60]"
        label={`${work.title} reading progress`}
        recalcKey={work.id}
      />
      <div className="min-h-full flex items-center justify-center">
        <div
          className="relative w-full max-w-[1080px] bg-[#FAFAF9] dark:bg-[#16161A] text-[#141414] dark:text-[#F4F4F2] rounded-2xl border border-[#141414]/20 dark:border-white/15 shadow-2xl overflow-hidden my-auto"
          onClick={(e) => e.stopPropagation()}
        >
        <div className="flex items-center justify-between gap-4 px-5 sm:px-8 py-4 border-b border-[#141414]/12 dark:border-white/12 bg-[#F4F4F2] dark:bg-[#111114]">
          <div className="flex items-center gap-3 text-xs text-[#52525B] dark:text-[#A1A1AA] min-w-0">
            <span className="font-mono tabular-nums text-[#141414] dark:text-white font-semibold">
              {work.index}
            </span>
            <span aria-hidden="true">/</span>
            <span className="truncate">{work.client}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums shrink-0">{work.year}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study modal"
            className="w-10 h-10 rounded-full bg-[#141414] dark:bg-white text-white dark:text-[#141414] hover:bg-[#F04E00] dark:hover:bg-[#F04E00] dark:hover:text-white transition-colors flex items-center justify-center shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 p-5 sm:p-8 bg-[#F4F4F2]/60 dark:bg-[#0D0D0F]/60 border-b lg:border-b-0 lg:border-r border-[#141414]/10 dark:border-white/10 flex flex-col justify-between">
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#E4E4E7] dark:bg-[#27272A] select-none touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex h-full w-full transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${slideIndex * 100}%)` }}
              >
                {work.slides.map((slide) => (
                  <div key={slide.id} className="w-full h-full shrink-0">
                    {slide.isReservedSlot || !slide.image ? (
                      <div className="w-full h-full bg-hero-checker bg-[#F4F4F2] dark:bg-[#111114] border-2 border-dashed border-[#141414]/25 dark:border-white/25 p-8 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 rounded-full bg-silver-brushed border border-[#141414]/20 flex items-center justify-center text-[#141414] mb-4">
                          <Layers className="w-5 h-5" />
                        </div>
                        <p className="font-mono text-xs font-semibold text-[#F04E00] mb-1.5">
                          {slide.slotSpec || 'RESERVED FIGMA PROTOTYPE SLOT'}
                        </p>
                        <p className="font-display text-lg font-bold text-[#141414] dark:text-white max-w-sm">
                          {slide.tag}
                        </p>
                        <p className="mt-2 text-xs sm:text-sm text-[#52525B] dark:text-[#A1A1AA] max-w-md leading-relaxed">
                          {slide.caption}
                        </p>
                      </div>
                    ) : (
                      <ResilientImage
                        src={slide.image}
                        alt={slide.alt}
                        fallbackTitle={work.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setSlideIndex((prev) => (prev - 1 + total) % total)}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-silver-brushed border border-[#141414]/25 text-[#141414] flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setSlideIndex((prev) => (prev + 1) % total)}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-silver-brushed border border-[#141414]/25 text-[#141414] flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#52525B] dark:text-[#A1A1AA]">
              <p className="font-medium text-[#141414] dark:text-[#F4F4F2]">
                {currentSlide.caption}
              </p>
              <span className="font-mono tabular-nums shrink-0">
                Swipe or use arrow keys · {String(slideIndex + 1).padStart(2, '0')} /{' '}
                {String(total).padStart(2, '0')}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {work.slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setSlideIndex(idx)}
                  className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    idx === slideIndex
                      ? 'border-[#F04E00] ring-2 ring-[#F04E00]/20'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  {slide.isReservedSlot || !slide.image ? (
                    <div className="w-full h-full bg-[#F4F4F2] dark:bg-[#111114] border border-dashed border-[#141414]/20 dark:border-white/20 flex flex-col items-center justify-center p-2 text-center">
                      <Layers className="w-4 h-4 text-[#F04E00] mb-1" />
                      <span className="font-mono text-[10px] text-[#52525B] dark:text-[#A1A1AA] truncate w-full">
                        {slide.tag}
                      </span>
                    </div>
                  ) : (
                    <ResilientImage
                      src={slide.image}
                      alt={slide.alt}
                      className="w-full h-full object-cover"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 p-5 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-medium text-[#F04E00] mb-1.5">
                  {work.category} · {work.subtitle}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#141414] dark:text-white">
                  {work.title}
                </h2>
                <p className="mt-2 font-mono text-[11px] text-[#71717A] dark:text-[#A1A1AA]">
                  {work.tags.join(' / ')}
                </p>
              </div>

              <p className="text-sm text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                {work.overview}
              </p>

              <div className="pt-4 border-t border-[#141414]/10 dark:border-white/10">
                <h3 className="text-xs font-semibold text-[#52525B] dark:text-[#A1A1AA] mb-2.5">
                  Deliverables
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-[#141414] dark:text-[#E4E4E7]">
                  {work.deliverables.map((item, idx) => (
                    <span key={item} className="inline-flex items-center gap-2">
                      <span className="font-mono text-xs text-[#71717A] dark:text-[#A1A1AA] tabular-nums">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#141414] dark:bg-[#0D0D0F] border border-transparent dark:border-white/15 text-white">
                <p className="text-xs text-[#A1A1AA] mb-1">Key Outcome</p>
                <p className="text-sm font-medium leading-relaxed">{work.outcome}</p>
              </div>
            </div>

            {work.externalUrl && (
              <div className="pt-2">
                <StarBorder
                  as="a"
                  href={work.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="#F04E00"
                  speed="4.8s"
                  className="w-full"
                  innerClassName="py-3 px-5 bg-white dark:bg-[#0D0D0F] hover:bg-[#141414] hover:text-white dark:hover:bg-[#F04E00] dark:hover:text-white text-[#141414] dark:text-white text-sm font-semibold gap-2 transition-colors"
                >
                  <span>Open Figma Prototype</span>
                  <ArrowUpRight className="w-4 h-4" />
                </StarBorder>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
