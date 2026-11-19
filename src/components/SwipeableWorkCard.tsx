import { useRef, useState, type TouchEvent, type PointerEvent } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ArrowRight,
  Layers,
} from 'lucide-react';
import type { WorkItem, WorkTag } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';

interface SwipeableWorkCardProps {
  work: WorkItem;
  onOpenDetail: (work: WorkItem, initialSlide: number) => void;
  activeTags?: WorkTag[];
  onToggleTag?: (tag: WorkTag) => void;
  className?: string;
}

export function SwipeableWorkCard({
  work,
  onOpenDetail,
  activeTags = [],
  onToggleTag,
  className = '',
}: SwipeableWorkCardProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const startXRef = useRef<number | null>(null);
  const total = work.slides.length;

  const goPrev = () => {
    setSlideIndex((prev) => (prev - 1 + total) % total);
  };

  const goNext = () => {
    setSlideIndex((prev) => (prev + 1) % total);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (startXRef.current === null) return;
    const diff = e.changedTouches[0].clientX - startXRef.current;
    if (Math.abs(diff) > 36) {
      if (diff < 0) goNext();
      else goPrev();
    }
    startXRef.current = null;
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    startXRef.current = e.clientX;
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (startXRef.current === null || e.pointerType === 'touch') return;
    const diff = e.clientX - startXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) goNext();
      else goPrev();
    }
    startXRef.current = null;
  };

  const currentSlide = work.slides[slideIndex];

  return (
    <article
      className={`group flex flex-col justify-between bg-[#FAFAF9] dark:bg-[#16161A] p-5 sm:p-6 transition-colors duration-200 hover:bg-white dark:hover:bg-[#1D1D22] ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-4 text-xs text-[#52525B] dark:text-[#A1A1AA] mb-4">
          <span className="font-mono tabular-nums">
            {work.index} · {work.origin}
          </span>
          <span
            className={`font-medium ${
              work.slotStatus === 'Reserved Slot'
                ? 'text-[#F04E00]'
                : 'text-[#141414]/85 dark:text-[#E4E4E7]'
            }`}
          >
            {work.category}
          </span>
        </div>

        <div
          className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#E4E4E7] dark:bg-[#27272A] select-none touch-pan-y cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={() => {
            startXRef.current = null;
          }}
          aria-roledescription="carousel"
          aria-label={`${work.title} photo gallery`}
        >
          <div
            className="flex h-full w-full transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${slideIndex * 100}%)` }}
          >
            {work.slides.map((slide) => (
              <div key={slide.id} className="w-full h-full shrink-0 relative">
                {slide.isReservedSlot || !slide.image ? (
                  <div className="w-full h-full bg-hero-checker bg-[#F4F4F2] dark:bg-[#111114] border border-dashed border-[#141414]/25 dark:border-white/25 p-5 flex flex-col justify-between">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] tracking-wider text-[#F04E00] font-semibold">
                        RESERVED PROTOTYPE SLOT
                      </span>
                      <span
                        aria-hidden="true"
                        className="w-4 h-4 rounded-sm bg-silver-radial border border-[#141414]/25 dark:border-white/25"
                      />
                    </div>
                    <div className="my-auto text-center px-2">
                      <div className="w-9 h-9 rounded-full bg-silver-brushed border border-[#141414]/20 mx-auto mb-2.5 flex items-center justify-center text-[#141414]">
                        <Layers className="w-4 h-4" />
                      </div>
                      <p className="font-mono text-[11px] font-semibold text-[#141414] dark:text-[#F4F4F2]">
                        {slide.slotSpec || 'FIGMA FRAME PLACEHOLDER'}
                      </p>
                      <p className="mt-1 text-xs text-[#52525B] dark:text-[#A1A1AA] line-clamp-2">
                        {slide.caption}
                      </p>
                    </div>
                    <div className="h-4" />
                  </div>
                ) : (
                  <ResilientImage
                    src={slide.image}
                    alt={slide.alt}
                    fallbackTitle={work.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(work, slideIndex);
            }}
            aria-label={`Expand ${work.title}`}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#FAFAF9]/90 dark:bg-[#141414]/85 backdrop-blur-sm border border-[#141414]/15 dark:border-white/20 text-[#141414] dark:text-white flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-150 hover:bg-[#141414] hover:text-white dark:hover:bg-[#F04E00] cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Previous project image"
              className="pointer-events-auto w-9 h-9 rounded-full bg-silver-brushed border border-[#141414]/20 text-[#141414] shadow-sm flex items-center justify-center opacity-90 md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Next project image"
              className="pointer-events-auto w-9 h-9 rounded-full bg-silver-brushed border border-[#141414]/20 text-[#141414] shadow-sm flex items-center justify-center opacity-90 md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-3 pt-6 pb-2.5 flex items-end justify-between gap-3">
            <span className="text-[11px] font-medium text-white/95 truncate">
              {currentSlide.tag}
            </span>
            <span className="font-mono text-[11px] text-white/90 tabular-nums shrink-0">
              {String(slideIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="mt-2.5 flex items-center gap-1.5" role="tablist" aria-label="Select project photo">
          {work.slides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={idx === slideIndex}
              aria-label={`View photo ${idx + 1}: ${slide.tag}`}
              onClick={() => setSlideIndex(idx)}
              className={`h-1 flex-1 rounded-full transition-colors duration-150 cursor-pointer ${
                idx === slideIndex
                  ? 'bg-[#F04E00]'
                  : 'bg-[#D4D4D8] dark:bg-white/20 hover:bg-[#A1A1AA] dark:hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-[#141414] dark:text-[#F4F4F2] leading-snug">
          <button
            type="button"
            onClick={() => onOpenDetail(work, slideIndex)}
            className="text-left hover:text-[#F04E00] transition-colors cursor-pointer"
          >
            {work.title}
          </button>
        </h3>
        <p className="mt-2 text-sm text-[#52525B] dark:text-[#A1A1AA] leading-relaxed line-clamp-2">
          {work.excerpt}
        </p>

        {/* Plain monochrome tag metadata (clickable to toggle filters when provided) */}
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-[#71717A] dark:text-[#A1A1AA]">
          {work.tags.map((tag, idx) => {
            const isMatched = activeTags.includes(tag);
            return (
              <span key={tag} className="inline-flex items-center gap-2">
                {onToggleTag ? (
                  <button
                    type="button"
                    onClick={() => onToggleTag(tag)}
                    className={`transition-colors cursor-pointer hover:text-[#F04E00] ${
                      isMatched
                        ? 'text-[#F04E00] font-semibold'
                        : 'text-[#71717A] dark:text-[#A1A1AA]'
                    }`}
                  >
                    {tag}
                  </button>
                ) : (
                  <span
                    className={
                      isMatched
                        ? 'text-[#F04E00] font-semibold'
                        : 'text-[#71717A] dark:text-[#A1A1AA]'
                    }
                  >
                    {tag}
                  </span>
                )}
                {idx < work.tags.length - 1 && (
                  <span aria-hidden="true" className="text-[#D4D4D8] dark:text-white/20">
                    /
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-[#141414]/10 dark:border-white/10 flex items-center justify-between gap-4">
        <span className="font-mono text-xs text-[#52525B] dark:text-[#A1A1AA] truncate">
          {work.client}
        </span>
        <button
          type="button"
          onClick={() => onOpenDetail(work, slideIndex)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#141414] dark:text-[#F4F4F2] hover:text-[#F04E00] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>{work.slotStatus === 'Reserved Slot' ? 'Inspect Slot' : 'View Case'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
}
