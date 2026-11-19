import { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import type { PageId } from '../data/portfolioData';
import { StarBorder } from './StarBorder';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const NAV_LINKS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'works', label: 'Works' },
  { id: 'social', label: 'Social' },
];

export function Navbar({
  currentPage,
  onNavigate,
  isDark,
  onToggleTheme,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSelect = (page: PageId) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F4F4F2]/90 dark:bg-[#0D0D0F]/90 backdrop-blur-md border-b border-[#141414]/12 dark:border-white/12 transition-colors duration-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between gap-6 md:gap-8">
        {/* Zone 1: Single-element brand wordmark */}
        <button
          type="button"
          onClick={() => handleSelect('home')}
          className="font-display text-xl font-bold tracking-tight text-[#141414] dark:text-[#F4F4F2] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F04E00]"
        >
          TRANXY<span className="text-[#F04E00]">.</span>
        </button>

        {/* Zone 2: 4 concise single-line text nav links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium"
        >
          {NAV_LINKS.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleSelect(link.id)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F04E00] ${
                  isActive
                    ? 'text-[#141414] dark:text-white font-semibold'
                    : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#141414] dark:hover:text-white'
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-[2px] transition-transform duration-200 origin-left ${
                    isActive
                      ? 'bg-[#F04E00] scale-x-100'
                      : 'bg-[#141414] dark:bg-white scale-x-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Theme Toggle + Primary CTA + Mobile Menu Trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
            className="inline-flex items-center justify-center w-10 h-10 md:w-9 md:h-9 rounded-full border border-[#141414]/15 dark:border-white/15 bg-[#FAFAF9] dark:bg-[#16161A] text-[#141414] dark:text-[#E4E4E7] hover:border-[#F04E00] dark:hover:border-[#F04E00] transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <StarBorder
            onClick={() => handleSelect('contact')}
            color="#F04E00"
            speed="5s"
            className="hidden md:inline-flex shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F04E00]"
            innerClassName={`px-5 py-2 text-xs font-semibold whitespace-nowrap transition-colors duration-150 ${
              currentPage === 'contact'
                ? 'bg-[#F04E00] text-white'
                : 'bg-[#141414] dark:bg-[#FAFAF9] text-white dark:text-[#141414] hover:bg-[#F04E00] dark:hover:bg-[#F04E00] dark:hover:text-white'
            }`}
          >
            Contact Me
          </StarBorder>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#141414]/15 dark:border-white/15 bg-[#FAFAF9] dark:bg-[#16161A] text-[#141414] dark:text-[#F4F4F2] hover:bg-[#E4E4E7] dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile responsive drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#141414]/12 dark:border-white/12 bg-[#FAFAF9] dark:bg-[#16161A]">
          <nav aria-label="Mobile Navigation" className="px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleSelect(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#141414] dark:bg-[#F04E00] text-white'
                      : 'text-[#141414] dark:text-[#E4E4E7] hover:bg-[#E4E4E7]/60 dark:hover:bg-white/10'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="font-mono text-xs text-[#F04E00] dark:text-white">
                      Active
                    </span>
                  )}
                </button>
              );
            })}
            <StarBorder
              onClick={() => handleSelect('contact')}
              color="#F04E00"
              speed="5s"
              className="mt-2 w-full"
              innerClassName={`px-4 py-3 text-base font-semibold text-center transition-colors ${
                currentPage === 'contact'
                  ? 'bg-[#F04E00] text-white'
                  : 'bg-[#141414] dark:bg-[#FAFAF9] text-white dark:text-[#141414] hover:bg-[#F04E00] dark:hover:bg-[#F04E00] dark:hover:text-white'
              }`}
            >
              Contact Me
            </StarBorder>
          </nav>
        </div>
      )}
    </header>
  );
}
