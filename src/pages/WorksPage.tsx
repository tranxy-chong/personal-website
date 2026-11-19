import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, MoveHorizontal, RotateCcw, SlidersHorizontal } from 'lucide-react';
import {
  ALL_WORK_TAGS,
  CONTACT_INFO,
  WORKS_DATA,
  type WorkItem,
  type WorkTag,
} from '../data/portfolioData';
import { SwipeableWorkCard } from '../components/SwipeableWorkCard';
import { ScrollProgressBar } from '../components/ScrollProgressBar';
import { StarBorder } from '../components/StarBorder';

interface WorksPageProps {
  onOpenWorkDetail: (work: WorkItem, slideIndex?: number) => void;
}

export function WorksPage({ onOpenWorkDetail }: WorksPageProps) {
  const [selectedTags, setSelectedTags] = useState<WorkTag[]>([]);
  const [matchMode, setMatchMode] = useState<'any' | 'all'>('any');

  const toggleTag = (tag: WorkTag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const tagCounts = useMemo(() => {
    const counts = new Map<WorkTag, number>();
    for (const tag of ALL_WORK_TAGS) {
      counts.set(
        tag,
        WORKS_DATA.filter((work) => work.tags.includes(tag)).length
      );
    }
    return counts;
  }, []);

  const filteredWorks = useMemo(() => {
    if (selectedTags.length === 0) return WORKS_DATA;

    return WORKS_DATA.filter((item) =>
      matchMode === 'all'
        ? selectedTags.every((tag) => item.tags.includes(tag))
        : selectedTags.some((tag) => item.tags.includes(tag))
    );
  }, [selectedTags, matchMode]);

  const hasActiveFilters = selectedTags.length > 0;

  const resetAllFilters = () => {
    setSelectedTags([]);
    setMatchMode('any');
  };

  return (
    <div>
      <ScrollProgressBar
        zIndexClass="z-50"
        label="Works page scroll progress"
        recalcKey={`${filteredWorks.length}-${selectedTags.join(',')}`}
      />
      {/* Giant Editorial Title Header */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2.5 text-xs font-mono text-[#52525B] dark:text-[#A1A1AA] mb-3">
            <span
              aria-hidden="true"
              className="w-3.5 h-3.5 rounded-sm bg-silver-radial border border-[#141414]/25 dark:border-white/25 inline-block"
            />
            <span>SINGTEL · OPPO · OMNICHANNEL CASE STUDIES</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-[#141414] dark:text-white leading-[1.02]">
            SELECTED WORKS
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#52525B] dark:text-[#A1A1AA]">
            Toggle discipline tags below to filter visible digital, print, and omnichannel case studies.
          </p>

          <div className="mt-6 flex justify-center">
            <StarBorder
              as="a"
              href={CONTACT_INFO.figmaPortfolio}
              target="_blank"
              rel="noopener noreferrer"
              color="#F04E00"
              speed="5s"
              innerClassName="gap-2 px-5 py-2.5 bg-[#141414] dark:bg-[#FAFAF9] hover:bg-[#F04E00] dark:hover:bg-[#F04E00] text-white dark:text-[#141414] dark:hover:text-white text-xs font-semibold transition-colors"
            >
              <span>Open Live Figma Prototype</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </StarBorder>
          </div>
        </div>

        {/* Interactive Multi-Tag Toggle Filter Bar */}
        <div className="mt-10 pt-5 border-t border-[#141414]/15 dark:border-white/15 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs text-[#52525B] dark:text-[#A1A1AA]">
            <MoveHorizontal className="w-4 h-4 text-[#F04E00] shrink-0" />
            <span>
              <strong className="text-[#141414] dark:text-white font-medium">
                Swipe horizontally
              </strong>{' '}
              on any card to browse photos, or click tags to filter visibility
            </span>
          </div>

          {/* Tag Visibility Toggles + Match Mode + Result Count */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
            <div
              role="group"
              aria-label="Toggle work visibility by tag"
              className="flex flex-wrap items-center gap-1.5"
            >
              <button
                type="button"
                aria-pressed={selectedTags.length === 0}
                onClick={() => setSelectedTags([])}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedTags.length === 0
                    ? 'bg-[#141414] dark:bg-[#FAFAF9] text-white dark:text-[#141414] border-[#141414] dark:border-[#FAFAF9]'
                    : 'bg-[#FAFAF9] dark:bg-[#16161A] text-[#52525B] dark:text-[#A1A1AA] border-[#141414]/15 dark:border-white/15 hover:border-[#141414] dark:hover:border-white hover:text-[#141414] dark:hover:text-white'
                }`}
              >
                All ({WORKS_DATA.length})
              </button>

              {ALL_WORK_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                const count = tagCounts.get(tag) ?? 0;
                return (
                  <button
                    key={tag}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggleTag(tag)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#141414] dark:bg-[#F04E00] text-white border-[#141414] dark:border-[#F04E00]'
                        : 'bg-[#FAFAF9] dark:bg-[#16161A] text-[#52525B] dark:text-[#A1A1AA] border-[#141414]/15 dark:border-white/15 hover:border-[#141414] dark:hover:border-white hover:text-[#141414] dark:hover:text-white'
                    }`}
                  >
                    <span>{tag}</span>
                    <span
                      className={`font-mono text-[10px] tabular-nums ${
                        isSelected
                          ? 'text-[#F04E00] dark:text-white/90'
                          : 'text-[#71717A] dark:text-[#71717A]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-[#52525B] dark:text-[#A1A1AA] shrink-0">
              {selectedTags.length >= 2 && (
                <button
                  type="button"
                  onClick={() =>
                    setMatchMode((prev) => (prev === 'any' ? 'all' : 'any'))
                  }
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#141414]/15 dark:border-white/15 bg-[#FAFAF9] dark:bg-[#16161A] font-mono text-[11px] text-[#141414] dark:text-[#E4E4E7] hover:border-[#F04E00] transition-colors cursor-pointer"
                  title="Toggle whether items must match ANY or ALL active tags"
                >
                  <SlidersHorizontal className="w-3 h-3 text-[#F04E00]" />
                  <span>Match: {matchMode === 'any' ? 'Any Tag' : 'All Tags'}</span>
                </button>
              )}

              <span className="font-mono text-xs tabular-nums">
                Showing{' '}
                <strong className="text-[#141414] dark:text-white">
                  {filteredWorks.length}
                </strong>{' '}
                of {WORKS_DATA.length}
              </span>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#F04E00] hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Hairline 3-Column Grid */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        {filteredWorks.length === 0 ? (
          <div className="border border-[#141414]/15 dark:border-white/15 bg-[#FAFAF9] dark:bg-[#16161A] p-12 text-center rounded-xl space-y-3">
            <p className="text-sm text-[#52525B] dark:text-[#A1A1AA]">
              No work items match the selected tags.
            </p>
            <StarBorder
              onClick={resetAllFilters}
              color="#F04E00"
              speed="5s"
              innerClassName="px-4 py-2 bg-[#141414] dark:bg-[#F04E00] text-white text-xs font-semibold"
            >
              Reset Filters
            </StarBorder>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#141414]/15 dark:border-white/15">
            <AnimatePresence mode="popLayout">
              {filteredWorks.map((work) => (
                <motion.div
                  key={work.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="border-r border-b border-[#141414]/15 dark:border-white/15 flex"
                >
                  <SwipeableWorkCard
                    work={work}
                    onOpenDetail={onOpenWorkDetail}
                    activeTags={selectedTags}
                    onToggleTag={toggleTag}
                    className="w-full"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
}
