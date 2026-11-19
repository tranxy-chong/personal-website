/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import type { PageId, WorkItem } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WorkDetailModal } from './components/WorkDetailModal';
import { CursorBackdrop } from './components/CursorBackdrop';
import { PortfolioChatbot } from './components/PortfolioChatbot';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { HomePage } from './pages/HomePage';
import { WorksPage } from './pages/WorksPage';
import { SocialPage } from './pages/SocialPage';
import { ContactPage } from './pages/ContactPage';

const VALID_PAGES: PageId[] = ['home', 'works', 'social', 'contact'];

function getInitialPage(): PageId {
  const hash = window.location.hash.replace('#', '') as PageId;
  return VALID_PAGES.includes(hash) ? hash : 'home';
}

function getInitialDark(): boolean {
  try {
    const saved = window.localStorage.getItem('tranxy-theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [isDark, setIsDark] = useState<boolean>(getInitialDark);
  const [activeWork, setActiveWork] = useState<{
    work: WorkItem;
    slide: number;
  } | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    try {
      window.localStorage.setItem('tranxy-theme', isDark ? 'dark' : 'light');
    } catch {
      // Ignore storage failures in restricted frames
    }
  }, [isDark]);

  useEffect(() => {
    const handleHashChange = () => {
      const next = window.location.hash.replace('#', '') as PageId;
      if (VALID_PAGES.includes(next)) {
        setCurrentPage(next);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenWorkDetail = (work: WorkItem, slideIndex = 0) => {
    setActiveWork({ work, slide: slideIndex });
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#F4F4F2] dark:bg-[#0D0D0F] text-[#141414] dark:text-[#F4F4F2] transition-colors duration-200">
      {/* Subtle architectural cursor motion backdrop */}
      <CursorBackdrop isDark={isDark} />

      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
      />

      <main className="relative z-10 flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenWorkDetail={handleOpenWorkDetail}
          />
        )}
        {currentPage === 'works' && (
          <WorksPage onOpenWorkDetail={handleOpenWorkDetail} />
        )}
        {currentPage === 'social' && <SocialPage onNavigate={navigateTo} />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      <Footer onNavigate={navigateTo} />

      <WorkDetailModal
        work={activeWork?.work ?? null}
        initialSlide={activeWork?.slide ?? 0}
        onClose={() => setActiveWork(null)}
      />

      {/* Floating navigation & assistant controls */}
      <ScrollToTopButton />
      {import.meta.env.VITE_STATIC_SITE !== 'true' && <PortfolioChatbot />}
    </div>
  );
}
