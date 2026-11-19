import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';
import {
  HERO_PORTRAIT_IMAGE,
  IMPACT_METRICS,
  PROCESS_STEPS,
  EXPERIENCES,
  EDUCATIONS,
  SKILL_GROUPS,
  WORKS_DATA,
  CONTACT_INFO,
  type PageId,
  type WorkItem,
} from '../data/portfolioData';
import { ResilientImage } from '../components/ResilientImage';
import { SwipeableWorkCard } from '../components/SwipeableWorkCard';
import { SectionSeparator } from '../components/SectionSeparator';
import { TrueFocus } from '../components/TrueFocus';
import { ScrollFloat } from '../components/ScrollFloat';
import { StarBorder } from '../components/StarBorder';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenWorkDetail: (work: WorkItem, slideIndex?: number) => void;
}

const DISCIPLINES = [
  'Business Requirements',
  'UX Audit & Evaluation',
  'Workflow Standardization',
  'Visual Guidelines',
  'Cross-Functional Delivery',
];

export function HomePage({
  onNavigate,
  onOpenWorkDetail,
}: HomePageProps) {
  const [impactIdx, setImpactIdx] = useState(0);
  const [selectedSkillGroupId, setSelectedSkillGroupId] = useState<string>(
    SKILL_GROUPS[0].id
  );

  const activeMetric = IMPACT_METRICS[impactIdx];
  const activeSkillGroup =
    SKILL_GROUPS.find((g) => g.id === selectedSkillGroupId) ?? SKILL_GROUPS[0];

  const cycleMetric = (dir: -1 | 1) => {
    setImpactIdx(
      (prev) => (prev + dir + IMPACT_METRICS.length) % IMPACT_METRICS.length
    );
  };

  return (
    <div>
      {/* 1. HERO SPLIT */}
      <section
        data-hero-section
        className="relative bg-hero-checker overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Column: Dominant Typographic Anchor */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-8 py-2">
              <div>
                <p className="text-xs sm:text-sm font-medium text-[#52525B] dark:text-[#A1A1AA] mb-4">
                  Tranxy Chong · Digital Experience &amp; Product Operations · Singapore
                </p>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight text-[#141414] dark:text-[#F4F4F2] leading-[1.18]">
                  <TrueFocus
                    sentence="Connecting Business Goals, UX Audits & Scalable Delivery"
                    focusStyle="brackets"
                    borderColor="#F04E00"
                    glowColor="rgba(240, 78, 0, 0.28)"
                    focusScale={1.03}
                    blurAmount={1.5}
                    unfocusedOpacity={0.78}
                    easing="spring"
                    animationDuration={0.45}
                    pauseBetweenAnimations={1.1}
                    cornerSize={14}
                    borderWidth={2.5}
                  />
                </h1>

                <p className="mt-5 text-base sm:text-lg text-[#52525B] dark:text-[#A1A1AA] leading-relaxed max-w-xl">
                  Digital design and product operations professional with 3+ years across telecommunication and technology. Experienced in translating commercial objectives into digital specifications, evaluating UX journeys, and building reusable systems that accelerate cross-team launches.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <StarBorder
                    onClick={() => onNavigate('contact')}
                    color="#F04E00"
                    speed="4.8s"
                    innerClassName="gap-3 pl-6 pr-2.5 py-2.5 bg-[#141414] dark:bg-[#FAFAF9] text-white dark:text-[#141414] text-sm font-semibold hover:bg-[#F04E00] dark:hover:bg-[#F04E00] dark:hover:text-white transition-colors duration-200"
                  >
                    <span>Get in Touch</span>
                    <span className="w-8 h-8 rounded-full bg-silver-brushed text-[#141414] flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </StarBorder>

                  <StarBorder
                    onClick={() => onNavigate('works')}
                    color="#A1A1AA"
                    speed="5.5s"
                    innerClassName="gap-2 px-5 py-3 bg-[#FAFAF9]/95 dark:bg-[#16161A]/95 text-sm font-semibold text-[#141414] dark:text-[#F4F4F2] hover:bg-white dark:hover:bg-[#1D1D22] transition-colors"
                  >
                    <span>Explore Works</span>
                    <ArrowRight className="w-4 h-4" />
                  </StarBorder>
                </div>
              </div>

              <div className="pt-6 border-t border-[#141414]/12 dark:border-white/12 grid grid-cols-3 gap-4 max-w-lg">
                <div>
                  <p className="font-display text-2xl sm:text-3xl font-bold tabular-nums text-[#141414] dark:text-white">
                    3+ Yrs
                  </p>
                  <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] mt-0.5">
                    Telecom &amp; Tech Experience
                  </p>
                </div>
                <div>
                  <p className="font-display text-2xl sm:text-3xl font-bold tabular-nums text-[#141414] dark:text-white">
                    4 Hubs
                  </p>
                  <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] mt-0.5">
                    Core Digital Platforms
                  </p>
                </div>
                <div>
                  <p className="font-display text-2xl sm:text-3xl font-bold tabular-nums text-[#F04E00]">
                    3 Kits
                  </p>
                  <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] mt-0.5">
                    Reusable Channel Templates
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Portrait + Interactive "Impact." Silver & Signal-Orange Card */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 items-stretch">
              <div className="relative rounded-2xl overflow-hidden border border-[#141414]/15 dark:border-white/15 bg-[#E4E4E7] dark:bg-[#1C1C21] min-h-[300px] sm:min-h-[340px]">
                <ResilientImage
                  src={HERO_PORTRAIT_IMAGE}
                  alt="Studio portrait of Tranxy Chong"
                  fallbackTitle="Tranxy Chong"
                  className="w-full h-full object-cover object-[50%_28%]"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-white truncate">
                    Tranxy Chong · Digital Experience
                  </span>
                  <span className="font-mono text-[11px] text-[#E4E4E7] tabular-nums shrink-0">
                    SINGAPORE
                  </span>
                </div>
              </div>

              {/* "Impact." Architectural Bento Card */}
              <div className="rounded-2xl border-2 border-[#141414] dark:border-white/25 bg-[#FAFAF9] dark:bg-[#16161A] overflow-hidden shadow-sm">
                <div className="grid grid-cols-12 border-b-2 border-[#141414] dark:border-white/20">
                  <div className="col-span-9 px-4 py-3 flex items-center">
                    <span className="font-display text-2xl font-bold tracking-tight text-[#141414] dark:text-white">
                      Impact<span className="text-[#F04E00]">.</span>
                    </span>
                  </div>
                  <div
                    aria-hidden="true"
                    className="col-span-3 border-l-2 border-[#141414] dark:border-white/20 bg-silver-radial min-h-[54px]"
                  />
                </div>

                <div className="grid grid-cols-12">
                  <div className="col-span-5 border-r-2 border-[#141414] dark:border-white/20 flex flex-col">
                    <div className="h-9 bg-orange-hatch border-b-2 border-[#141414] dark:border-white/20" />
                    <div className="flex-1 bg-[#F04E00] text-[#141414] p-3.5 flex flex-col justify-between">
                      <span className="font-display text-3xl sm:text-4xl font-bold tabular-nums leading-none">
                        {activeMetric.value}
                      </span>
                      <span className="font-mono text-[11px] font-semibold mt-2">
                        {activeMetric.period}
                      </span>
                    </div>
                  </div>

                  <div className="col-span-7 p-4 flex flex-col justify-between gap-3">
                    <div className="flex items-center justify-between gap-1">
                      <button
                        type="button"
                        onClick={() => cycleMetric(-1)}
                        aria-label="Previous impact metric"
                        className="w-7 h-7 rounded-full border border-[#141414]/15 dark:border-white/15 bg-[#F4F4F2] dark:bg-[#0D0D0F] text-[#141414] dark:text-white hover:bg-[#141414] hover:text-white dark:hover:bg-[#F04E00] flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono text-xs text-[#52525B] dark:text-[#A1A1AA] truncate">
                        org:{' '}
                        <strong className="text-[#141414] dark:text-white">
                          {activeMetric.client}
                        </strong>
                      </span>
                      <button
                        type="button"
                        onClick={() => cycleMetric(1)}
                        aria-label="Next impact metric"
                        className="w-7 h-7 rounded-full border border-[#141414]/15 dark:border-white/15 bg-[#F4F4F2] dark:bg-[#0D0D0F] text-[#141414] dark:text-white hover:bg-[#141414] hover:text-white dark:hover:bg-[#F04E00] flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <p className="font-display text-base font-bold text-[#141414] dark:text-white">
                        {activeMetric.label}
                      </p>
                      <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed mt-1">
                        {activeMetric.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionSeparator origin="left" datumAlign="left" sheenDelay={0} />

      {/* 2. DISCIPLINE / CAPABILITY DIVIDER STRIP */}
      <div className="bg-[#FAFAF9]/85 dark:bg-[#111114]/85">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-center sm:justify-between gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-[#52525B] dark:text-[#A1A1AA]">
          {DISCIPLINES.map((item, idx) => (
            <div key={item} className="flex items-center gap-6">
              <span className="text-[#141414] dark:text-[#E4E4E7]">{item}</span>
              {idx < DISCIPLINES.length - 1 && (
                <span aria-hidden="true" className="hidden sm:inline text-[#A1A1AA] dark:text-[#52525B]">
                  +
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <SectionSeparator origin="center" datumAlign="center" sheenDelay={1.6} />

      {/* 3. RESUME EXPERIENCE & CARBON CORE SKILLS BENTO */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left 6 cols: Authentic Work Experience */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="text-xs font-semibold text-[#F04E00] mb-2">
                Work Experience
              </p>
              <ScrollFloat
                containerClassName="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#141414] dark:text-white"
                animationDuration={0.9}
                stagger={0.025}
              >
                Proven Execution From Scoping to Launch
              </ScrollFloat>
            </div>

            <div className="space-y-4">
              {EXPERIENCES.map((exp) => (
                <div
                  key={exp.id}
                  className="rounded-xl border border-[#141414]/12 dark:border-white/12 bg-[#FAFAF9]/90 dark:bg-[#16161A]/90 p-5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h3 className="font-display text-base sm:text-lg font-bold text-[#141414] dark:text-white">
                      {exp.role} · {exp.company}
                    </h3>
                    <span className="font-mono text-xs text-[#F04E00] tabular-nums">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                    {exp.highlights.slice(0, 3).map((hl) => (
                      <li key={hl} className="flex items-start gap-2">
                        <span aria-hidden="true" className="text-[#A1A1AA] dark:text-[#71717A] mt-1">
                          —
                        </span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right 6 cols: Dark Carbon Bento Panel with Silver Waves */}
          <div className="lg:col-span-6 relative rounded-2xl bg-[#141414] dark:bg-[#16161A] text-white p-6 sm:p-8 overflow-hidden border border-[#27272A] dark:border-white/15">
            <svg
              aria-hidden="true"
              viewBox="0 0 600 220"
              className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
              fill="none"
            >
              <path
                d="M-40 160 C 120 40, 260 220, 420 90 C 500 25, 560 70, 640 30"
                stroke="#D4D4D8"
                strokeWidth="1.2"
              />
              <path
                d="M-40 185 C 130 65, 270 245, 430 115 C 510 50, 570 95, 640 55"
                stroke="#D4D4D8"
                strokeWidth="1"
              />
              <path
                d="M-40 210 C 140 90, 280 270, 440 140 C 520 75, 580 120, 640 80"
                stroke="#A1A1AA"
                strokeWidth="0.8"
              />
            </svg>

            <div className="relative z-10 flex flex-col justify-between gap-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-mono text-[#F04E00] mb-1">
                    CORE CAPABILITIES
                  </p>
                  <p className="font-display text-2xl sm:text-3xl font-bold">
                    {activeSkillGroup.title}
                  </p>
                </div>
                <div
                  aria-hidden="true"
                  className="w-10 h-10 rounded-lg bg-silver-radial border border-white/20 shrink-0"
                />
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {SKILL_GROUPS.map((group) => {
                    const active = group.id === activeSkillGroup.id;
                    return (
                      <button
                        key={group.id}
                        type="button"
                        onClick={() => setSelectedSkillGroupId(group.id)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-[#F04E00] text-white'
                            : 'bg-white/10 text-[#E4E4E7] hover:bg-white/20'
                        }`}
                      >
                        {group.label}
                      </button>
                    );
                  })}
                </div>

                <p className="text-sm text-[#D4D4D8] leading-relaxed mb-5">
                  {activeSkillGroup.summary}
                </p>

                <div className="pt-4 border-t border-white/12 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeSkillGroup.skills.map((skill, idx) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2.5 text-xs text-[#E4E4E7]"
                    >
                      <span className="font-mono text-[#F04E00] tabular-nums">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/12 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={CONTACT_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-[#F04E00] transition-colors"
                >
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={CONTACT_INFO.figmaPortfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4D4D8] hover:text-[#F04E00] transition-colors"
                >
                  <span>Figma Prototype</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionSeparator origin="right" datumAlign="left" sheenDelay={2.0} />

      {/* 3B. ACADEMIC FOUNDATION & EDUCATION */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-[#F04E00] mb-2">
              Education &amp; Academic Progression
            </p>
            <ScrollFloat
              containerClassName="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#141414] dark:text-white"
              animationDuration={0.9}
              stagger={0.025}
            >
              From Design Foundations to Digital Media Honours
            </ScrollFloat>
          </div>

          <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-[#141414]/15 dark:border-white/15 bg-[#FAFAF9] dark:bg-[#16161A] self-start md:self-auto">
            <span
              aria-hidden="true"
              className="w-4 h-4 rounded-sm bg-silver-radial border border-[#141414]/25 dark:border-white/25 shrink-0"
            />
            <span className="font-mono text-xs text-[#52525B] dark:text-[#A1A1AA] tabular-nums">
              3 CREDENTIALS · 2019 — PRESENT
            </span>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-[#141414] dark:border-white/20 bg-[#FAFAF9] dark:bg-[#16161A] overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#141414]/15 dark:divide-white/15">
            {EDUCATIONS.map((edu, idx) => (
              <motion.article
                key={edu.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative p-6 sm:p-7 flex flex-col justify-between gap-6 hover:bg-white dark:hover:bg-[#1D1D22] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="font-mono text-xs font-semibold text-[#52525B] dark:text-[#A1A1AA] tabular-nums">
                      {String(idx + 1).padStart(2, '0')} / {edu.level.toUpperCase()}
                    </span>
                    {edu.isActive ? (
                      <span
                        aria-hidden="true"
                        className="w-6 h-6 rounded-md bg-silver-radial border border-[#141414]/25 dark:border-white/30 shrink-0"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="w-6 h-6 rounded-md bg-silver-brushed/80 dark:bg-white/10 border border-[#141414]/15 dark:border-white/15 flex items-center justify-center text-[#141414] dark:text-[#E4E4E7] shrink-0"
                      >
                        <GraduationCap className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  {/* Sleek metallic / signal progress indicator */}
                  <div className="h-[3px] w-full rounded-full bg-[#E4E4E7] dark:bg-white/10 overflow-hidden mb-5">
                    <div
                      className={`h-full rounded-full ${
                        edu.isActive
                          ? 'w-2/3 bg-[#F04E00]'
                          : 'w-full bg-silver-brushed dark:bg-[#71717A]'
                      }`}
                    />
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#141414] dark:text-white leading-snug group-hover:text-[#F04E00] transition-colors">
                    {edu.degree}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-[#141414]/80 dark:text-[#E4E4E7]">
                    {edu.school}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                    {edu.focus}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#141414]/10 dark:border-white/10 flex items-center justify-between gap-3 text-xs">
                  <span className="text-[#71717A] dark:text-[#A1A1AA]">
                    Period
                  </span>
                  <span
                    className={`font-mono font-semibold tabular-nums ${
                      edu.isActive
                        ? 'text-[#F04E00]'
                        : 'text-[#141414] dark:text-[#E4E4E7]'
                    }`}
                  >
                    {edu.period}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <SectionSeparator origin="left" datumAlign="right" sheenDelay={3.2} />

      {/* 4. HOW I WORK: 4 TACTILE SILVER-GROMMET CARDS */}
      <section className="bg-[#FAFAF9]/85 dark:bg-[#111114]/85 py-14 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-10 sm:mb-14">
            <p className="text-xs font-semibold text-[#F04E00] mb-2">
              Workflow &amp; Operations
            </p>
            <ScrollFloat
              containerClassName="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#141414] dark:text-white"
              animationDuration={0.9}
              stagger={0.02}
            >
              Four Stages Turning Complex Briefs Into Cohesive Releases
            </ScrollFloat>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
            {PROCESS_STEPS.map((item, idx) => (
              <div
                key={item.step}
                className={`relative rounded-2xl bg-[#F4F4F2] dark:bg-[#16161A] border border-[#141414]/15 dark:border-white/15 p-6 pt-9 shadow-sm transition-transform duration-200 hover:rotate-0 hover:-translate-y-1 ${item.tilt} ${
                  idx % 2 === 1 ? 'lg:mt-6' : ''
                }`}
              >
                <div
                  aria-hidden="true"
                  className="absolute top-3.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full silver-grommet flex items-center justify-center"
                >
                  <span className="w-2 h-2 rounded-full bg-[#141414]" />
                </div>

                <div className="flex items-baseline justify-between mb-3">
                  <span className="font-mono text-xs font-semibold text-[#F04E00] tabular-nums">
                    {item.step}
                  </span>
                  <span className="font-mono text-xs text-[#71717A] dark:text-[#A1A1AA]">
                    {item.en}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-[#141414] dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionSeparator origin="center" datumAlign="left" sheenDelay={4.8} />

      {/* 5. FEATURED WORKS PREVIEW */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-[#F04E00] mb-1.5">
              Featured Case Studies · Swipe Cards to Browse Photos
            </p>
            <ScrollFloat
              containerClassName="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#141414] dark:text-white"
              animationDuration={0.9}
              stagger={0.03}
            >
              Selected Works & Product Ops
            </ScrollFloat>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('works')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#141414] dark:text-[#F4F4F2] hover:text-[#F04E00] transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>View Full Works Archive</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#141414]/15 dark:border-white/15">
          {WORKS_DATA.slice(0, 3).map((work) => (
            <SwipeableWorkCard
              key={work.id}
              work={work}
              onOpenDetail={onOpenWorkDetail}
              className="border-r border-b border-[#141414]/15 dark:border-white/15"
            />
          ))}
        </div>
      </section>

      <SectionSeparator origin="right" datumAlign="center" sheenDelay={2.4} />

      {/* Dark Closing Statement Banner */}
      <section className="bg-[#141414] dark:bg-[#16161A] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-xs font-mono text-[#F04E00] mb-3">
              SINGAPORE · DIGITAL EXPERIENCE &amp; PRODUCT OPERATIONS
            </p>
            <ScrollFloat
              containerClassName="font-display text-2xl sm:text-4xl font-bold tracking-tight leading-tight"
              animationDuration={0.85}
              stagger={0.018}
              scrollStart="start 96%"
              scrollEnd="start 76%"
            >
              Turning complex cross-team requirements into scalable, tactile digital experiences.
            </ScrollFloat>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <StarBorder
              onClick={() => onNavigate('contact')}
              color="#FFFFFF"
              speed="4.8s"
              innerClassName="px-6 py-3 bg-[#F04E00] hover:bg-[#D64500] text-white text-sm font-semibold transition-colors"
            >
              Contact Tranxy
            </StarBorder>
            <StarBorder
              onClick={() => onNavigate('social')}
              color="#F04E00"
              speed="5.5s"
              innerClassName="px-6 py-3 bg-[#141414] dark:bg-[#16161A] text-white hover:bg-white hover:text-[#141414] text-sm font-semibold transition-colors"
            >
              LinkedIn &amp; Socials
            </StarBorder>
          </div>
        </div>
      </section>
    </div>
  );
}
