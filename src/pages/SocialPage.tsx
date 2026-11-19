import { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { SOCIAL_ACCOUNTS, type PageId } from '../data/portfolioData';
import { StarBorder } from '../components/StarBorder';

interface SocialPageProps {
  onNavigate: (page: PageId) => void;
}

export function SocialPage({ onNavigate }: SocialPageProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyHandle = async (id: string, handle: string) => {
    try {
      await navigator.clipboard.writeText(handle);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="rounded-2xl border-2 border-[#141414] dark:border-white/20 bg-[#FAFAF9] dark:bg-[#16161A] overflow-hidden mb-10 sm:mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-9 p-6 sm:p-10">
            <p className="text-xs font-semibold text-[#F04E00] mb-2">
              SOCIAL CHANNELS
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141414] dark:text-white">
              Social Profiles &amp; Portfolio Links
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#52525B] dark:text-[#A1A1AA] leading-relaxed max-w-2xl">
              Connect via LinkedIn, inspect my interactive Figma prototype, or reach me directly by email and phone. Click any handle below to copy it instantly.
            </p>
          </div>
          <div className="lg:col-span-3 border-t-2 lg:border-t-0 lg:border-l-2 border-[#141414] dark:border-white/20 bg-silver-radial p-6 flex flex-col justify-between min-h-[120px]">
            <span className="font-mono text-xs font-semibold text-[#141414]">
              {SOCIAL_ACCOUNTS.length} CHANNELS
            </span>
            <span className="font-display text-lg font-bold text-[#141414]">
              Let&apos;s Connect
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#141414]/15 dark:border-white/15">
        {SOCIAL_ACCOUNTS.map((acc) => {
          const isCopied = copiedId === acc.id;
          return (
            <div
              key={acc.id}
              className="border-r border-b border-[#141414]/15 dark:border-white/15 bg-[#FAFAF9]/90 dark:bg-[#16161A]/90 p-6 sm:p-7 flex flex-col justify-between gap-6 hover:bg-white dark:hover:bg-[#1D1D22] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="font-display text-xl font-bold text-[#141414] dark:text-white">
                    {acc.platform}
                  </span>
                  <span className="font-mono text-xs text-[#52525B] dark:text-[#A1A1AA]">
                    {acc.updatedAt}
                  </span>
                </div>

                <p className="text-xs font-semibold text-[#F04E00] mb-2">
                  {acc.role}
                </p>
                <p className="text-sm text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                  {acc.description}
                </p>

                <div className="mt-4 p-3.5 rounded-lg bg-[#F4F4F2] dark:bg-[#0D0D0F] border border-[#141414]/10 dark:border-white/10">
                  <p className="text-xs text-[#141414]/85 dark:text-[#D4D4D8] leading-relaxed">
                    {acc.recentNote}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#141414]/10 dark:border-white/10 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleCopyHandle(acc.id, acc.handle)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#52525B] dark:text-[#A1A1AA] hover:text-[#141414] dark:hover:text-white transition-colors truncate cursor-pointer"
                  title="Click to copy handle"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#F04E00] shrink-0" />
                      <span className="text-[#F04E00] font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{acc.handle}</span>
                    </>
                  )}
                </button>

                <StarBorder
                  as="a"
                  href={acc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="#F04E00"
                  speed="5.2s"
                  className="shrink-0"
                  innerClassName="gap-1 px-3.5 py-1.5 bg-[#141414] dark:bg-[#FAFAF9] hover:bg-[#F04E00] dark:hover:bg-[#F04E00] text-white dark:text-[#141414] dark:hover:text-white text-xs font-semibold transition-colors whitespace-nowrap"
                >
                  <span>Visit</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </StarBorder>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 rounded-2xl bg-[#141414] dark:bg-[#16161A] border border-transparent dark:border-white/15 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold">
            Have a role or cross-functional project in mind?
          </h2>
          <p className="mt-1.5 text-sm text-[#A1A1AA]">
            Reach out via email, phone, or the Contact page to start a conversation.
          </p>
        </div>
        <StarBorder
          onClick={() => onNavigate('contact')}
          color="#FFFFFF"
          speed="4.8s"
          className="shrink-0 self-start sm:self-auto"
          innerClassName="px-6 py-3 bg-[#F04E00] hover:bg-[#D64500] text-white text-sm font-semibold transition-colors whitespace-nowrap"
        >
          Go to Contact Page →
        </StarBorder>
      </div>
    </div>
  );
}
