import { ArrowUpRight } from 'lucide-react';
import { SOCIAL_ACCOUNTS, type PageId } from '../data/portfolioData';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative z-10 border-t border-[#141414]/15 dark:border-white/12 bg-[#FAFAF9] dark:bg-[#111114] text-[#141414] dark:text-[#F4F4F2] transition-colors duration-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-x border-[#141414]/10 dark:border-white/10">
          {/* Col 1: Brand & Silver Plaque */}
          <div className="p-6 sm:p-8 border-b lg:border-b-0 sm:border-r border-[#141414]/10 dark:border-white/10 flex flex-col justify-between gap-6">
            <div>
              <span className="font-display text-2xl font-bold tracking-tight">
                TRANXY<span className="text-[#F04E00]">.</span>
              </span>
              <p className="mt-3 text-sm text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                Digital Experience &amp; Product Operations. Aligning stakeholders, auditing UX, and building scalable systems that keep web, in-app and campaign experiences consistent across omnichannel touchpoints.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div
                aria-hidden="true"
                className="w-7 h-7 rounded border border-[#141414]/20 dark:border-white/25 bg-silver-radial shrink-0"
              />
              <span className="font-mono text-xs text-[#52525B] dark:text-[#A1A1AA]">
                SINGAPORE
              </span>
            </div>
          </div>

          {/* Col 2: Direct Info */}
          <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[#141414]/10 dark:border-white/10">
            <h3 className="text-xs font-semibold tracking-wider text-[#52525B] dark:text-[#A1A1AA] mb-4">
              Contact
            </h3>
            <ul className="space-y-2.5 text-sm text-[#141414] dark:text-[#E4E4E7]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#F04E00] transition-colors text-left cursor-pointer"
                >
                  xjchong22@gmail.com
                </button>
              </li>
              <li className="font-mono text-xs text-[#52525B] dark:text-[#A1A1AA] tabular-nums">
                +65 85033386
              </li>
              <li className="text-[#52525B] dark:text-[#A1A1AA]">
                Singapore · Digital Experience
              </li>
            </ul>
          </div>

          {/* Col 3: Site Navigation */}
          <div className="p-6 sm:p-8 border-b sm:border-b-0 sm:border-r border-[#141414]/10 dark:border-white/10">
            <h3 className="text-xs font-semibold tracking-wider text-[#52525B] dark:text-[#A1A1AA] mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: 'home' as PageId, label: 'Home Overview' },
                { id: 'works' as PageId, label: 'Selected Works' },
                { id: 'social' as PageId, label: 'Social Channels' },
                { id: 'contact' as PageId, label: 'Contact Me' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    className="hover:text-[#F04E00] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Social Accounts */}
          <div className="p-6 sm:p-8">
            <h3 className="text-xs font-semibold tracking-wider text-[#52525B] dark:text-[#A1A1AA] mb-4">
              Connect
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SOCIAL_ACCOUNTS.slice(0, 5).map((acc) => (
                <li key={acc.id}>
                  <a
                    href={acc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#141414] dark:text-[#E4E4E7] hover:text-[#F04E00] transition-colors"
                  >
                    <span>{acc.platform}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#71717A] dark:text-[#A1A1AA]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quiet Copyright Bar */}
        <div className="py-5 border-t border-[#141414]/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#52525B] dark:text-[#A1A1AA]">
          <span>© 2026 Tranxy Chong. All rights reserved.</span>
          <span className="font-mono tabular-nums">
            Digital Experience · Product Operations
          </span>
        </div>
      </div>
    </footer>
  );
}
