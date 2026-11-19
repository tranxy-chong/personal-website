import { useState } from 'react';
import {
  Check,
  Copy,
  Mail,
  MapPin,
  ArrowUpRight,
  Phone,
} from 'lucide-react';
import { CONTACT_INFO, SOCIAL_ACCOUNTS } from '../data/portfolioData';
import { StarBorder } from '../components/StarBorder';

export function ContactPage() {
  const [copiedKey, setCopiedKey] = useState<'email' | 'phone' | null>(null);

  const handleCopy = async (key: 'email' | 'phone', value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    } catch {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    }
  };

  const quickLinks = SOCIAL_ACCOUNTS.filter(
    (acc) => acc.id === 'linkedin' || acc.id === 'figma' || acc.id === 'behance'
  );

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="rounded-2xl border-2 border-[#141414] dark:border-white/20 bg-[#FAFAF9] dark:bg-[#16161A] overflow-hidden mb-10 sm:mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-9 p-6 sm:p-10">
            <p className="text-xs font-semibold text-[#F04E00] mb-2">
              CONTACT &amp; AVAILABILITY
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141414] dark:text-white">
              Contact Me
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#52525B] dark:text-[#A1A1AA] leading-relaxed max-w-2xl">
              Open to conversations around Digital Experience, Product Operations, UX evaluation, or cross-functional design collaboration. Reach out directly via email, phone, or LinkedIn.
            </p>
          </div>
          <div className="lg:col-span-3 border-t-2 lg:border-t-0 lg:border-l-2 border-[#141414] dark:border-white/20 bg-silver-radial p-6 flex flex-col justify-between min-h-[120px]">
            <span className="font-mono text-xs font-semibold text-[#141414]">
              SINGAPORE
            </span>
            <span className="font-display text-lg font-bold text-[#141414]">
              Direct Channels
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        {/* Direct Email & Phone */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[#141414]/15 dark:border-white/15 bg-[#FAFAF9] dark:bg-[#16161A] p-6 sm:p-7 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#F04E00]" />
                  <span className="text-xs font-semibold text-[#52525B] dark:text-[#A1A1AA]">
                    Direct Email
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className="w-5 h-5 rounded bg-silver-radial border border-[#141414]/20 dark:border-white/25"
                />
              </div>
              <p className="font-mono text-lg sm:text-xl font-semibold text-[#141414] dark:text-white break-all">
                {CONTACT_INFO.email}
              </p>
              <p className="mt-2 text-xs sm:text-sm text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                Preferred channel for roles, project briefs, and UX &amp; product operations discussions.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-4 border-t border-[#141414]/10 dark:border-white/10">
              <StarBorder
                onClick={() => handleCopy('email', CONTACT_INFO.email)}
                color="#F04E00"
                speed="5s"
                innerClassName="gap-1.5 px-4 py-2 bg-[#141414] dark:bg-[#FAFAF9] hover:bg-[#F04E00] dark:hover:bg-[#F04E00] text-white dark:text-[#141414] dark:hover:text-white text-xs font-semibold transition-colors"
              >
                {copiedKey === 'email' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Email Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Email</span>
                  </>
                )}
              </StarBorder>
            </div>
          </div>

          <div className="rounded-2xl border border-[#141414]/15 dark:border-white/15 bg-[#FAFAF9] dark:bg-[#16161A] p-6 sm:p-7 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#F04E00]" />
                  <span className="text-xs font-semibold text-[#52525B] dark:text-[#A1A1AA]">
                    Singapore Direct Line
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className="w-5 h-5 rounded bg-silver-radial border border-[#141414]/20 dark:border-white/25"
                />
              </div>
              <p className="font-mono text-lg sm:text-xl font-semibold text-[#141414] dark:text-white tabular-nums">
                {CONTACT_INFO.phone}
              </p>
              <p className="mt-2 text-xs sm:text-sm text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                Available for scheduled interviews, alignment calls, and WhatsApp coordination.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-4 border-t border-[#141414]/10 dark:border-white/10">
              <StarBorder
                onClick={() => handleCopy('phone', CONTACT_INFO.phone)}
                color="#F04E00"
                speed="5s"
                innerClassName="gap-1.5 px-4 py-2 bg-[#141414] dark:bg-[#FAFAF9] hover:bg-[#F04E00] dark:hover:bg-[#F04E00] text-white dark:text-[#141414] dark:hover:text-white text-xs font-semibold transition-colors"
              >
                {copiedKey === 'phone' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Number Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Number</span>
                  </>
                )}
              </StarBorder>
            </div>
          </div>
        </div>

        {/* Location, Availability & Social Links */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          <div className="rounded-2xl border border-[#141414]/15 dark:border-white/15 bg-[#FAFAF9] dark:bg-[#16161A] p-6 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#F04E00] shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-[#141414] dark:text-white">
                  {CONTACT_INFO.location}
                </p>
                <p className="text-[#52525B] dark:text-[#A1A1AA] mt-1 leading-relaxed">
                  Based in Singapore with hands-on experience aligning regional HQ and local teams across Singtel and OPPO.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-[#141414]/10 dark:border-white/10 flex items-center justify-between text-xs">
              <span className="text-[#52525B] dark:text-[#A1A1AA]">Status</span>
              <span className="font-mono font-semibold text-[#F04E00]">
                Open to Opportunities &amp; Projects
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-[#141414]/15 dark:border-white/15 bg-[#FAFAF9] dark:bg-[#16161A] p-6">
            <p className="text-xs font-semibold text-[#52525B] dark:text-[#A1A1AA] mb-3.5">
              Profiles &amp; Interactive Portfolio
            </p>
            <div className="flex flex-wrap gap-2.5">
              {quickLinks.map((acc) => (
                <StarBorder
                  key={acc.id}
                  as="a"
                  href={acc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="#F04E00"
                  speed="5.6s"
                  innerClassName="gap-1.5 px-4 py-2 bg-[#F4F4F2] dark:bg-[#0D0D0F] hover:bg-white dark:hover:bg-[#1D1D22] text-xs font-medium text-[#141414] dark:text-[#E4E4E7] transition-colors"
                >
                  <span>{acc.platform}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#71717A] dark:text-[#A1A1AA]" />
                </StarBorder>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
