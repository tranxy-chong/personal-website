import { useEffect, useRef, useState, type FormEvent } from 'react';
import { MessageSquare, X, Send, RotateCcw, ArrowUpRight } from 'lucide-react';
import { StarBorder } from './StarBorder';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

type RoleMode = 'portfolio' | 'uxAdvisor';

const STARTER_PROMPTS: Record<RoleMode, string[]> = {
  portfolio: [
    'What impact did Tranxy achieve at Singtel?',
    'How does Tranxy standardize campaign visual systems?',
    'Tell me about Tranxy’s launch work at OPPO',
  ],
  uxAdvisor: [
    'How should I structure an App UX audit?',
    'How do you standardize multi-channel templates?',
    'What belongs in a feature scoping brief?',
  ],
};

const INITIAL_GREETING: ChatMessage = {
  id: 'welcome',
  role: 'model',
  text: 'Hi! I am Tranxy Chong’s portfolio assistant. Ask me about Tranxy’s experience at Singtel and OPPO, UX audit workflows, template standardization, or skills and availability.',
};

export function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [roleMode, setRoleMode] = useState<RoleMode>('portfolio');
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const historyPayload = messages
      .filter((m) => m.id !== 'welcome')
      .map((m) => ({ role: m.role, text: m.text }));

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: historyPayload,
          roleMode,
        }),
      });

      const data = (await res.json()) as { reply?: string; error?: string };

      if (!res.ok || !data.reply) {
        setErrorMsg(data.error || 'Chat service is currently unavailable. Please try again.');
        return;
      }

      const modelMsg: ChatMessage = {
        id: `m-${Date.now()}`,
        role: 'model',
        text: data.reply,
      };
      setMessages((prev) => [...prev, modelMsg]);
    } catch {
      setErrorMsg('Unable to reach the chat service. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleReset = () => {
    setMessages([INITIAL_GREETING]);
    setErrorMsg(null);
    setInput('');
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <section
          aria-label="Tranxy Portfolio Assistant"
          className="mb-3 w-[calc(100vw-2rem)] sm:w-[400px] h-[520px] max-h-[76vh] rounded-2xl border-2 border-[#141414] dark:border-white/20 bg-[#FAFAF9] dark:bg-[#16161A] text-[#141414] dark:text-[#F4F4F2] shadow-2xl flex flex-col overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-[#141414]/12 dark:border-white/12 bg-[#F4F4F2] dark:bg-[#111114] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                aria-hidden="true"
                className="w-6 h-6 rounded-md bg-silver-radial border border-[#141414]/25 shrink-0"
              />
              <div className="min-w-0">
                <h2 className="font-display text-sm font-bold truncate">
                  Tranxy Assistant
                </h2>
                <p className="font-mono text-[10px] text-[#52525B] dark:text-[#A1A1AA] truncate">
                  Digital Experience · Product Ops
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handleReset}
                aria-label="Reset conversation"
                title="Reset chat"
                className="w-8 h-8 rounded-lg border border-[#141414]/15 dark:border-white/15 hover:bg-[#E4E4E7] dark:hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat assistant"
                className="w-8 h-8 rounded-lg bg-[#141414] dark:bg-white text-white dark:text-[#141414] hover:bg-[#F04E00] dark:hover:bg-[#F04E00] dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="px-4 py-2 border-b border-[#141414]/10 dark:border-white/10 bg-[#FAFAF9] dark:bg-[#16161A] flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setRoleMode('portfolio')}
              className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                roleMode === 'portfolio'
                  ? 'bg-[#141414] dark:bg-[#F04E00] text-white'
                  : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#141414] dark:hover:text-white'
              }`}
            >
              Portfolio Advisor
            </button>
            <button
              type="button"
              onClick={() => setRoleMode('uxAdvisor')}
              className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                roleMode === 'uxAdvisor'
                  ? 'bg-[#141414] dark:bg-[#F04E00] text-white'
                  : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#141414] dark:hover:text-white'
              }`}
            >
              UX &amp; Ops Partner
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#F4F4F2]/60 dark:bg-[#0D0D0F]/60"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-[#141414] dark:bg-[#F04E00] text-white rounded-br-sm'
                      : 'bg-white dark:bg-[#1E1E24] text-[#141414] dark:text-[#F4F4F2] border border-[#141414]/12 dark:border-white/12 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm px-3.5 py-2.5 bg-white dark:bg-[#1E1E24] border border-[#141414]/12 dark:border-white/12 text-xs text-[#52525B] dark:text-[#A1A1AA]">
                  Thinking...
                </div>
              </div>
            )}

            {errorMsg && (
              <div
                role="alert"
                className="p-3 rounded-xl bg-[#F04E00]/10 border border-[#F04E00]/35 text-xs text-[#B83900] dark:text-[#FF7A40]"
              >
                {errorMsg}
              </div>
            )}

            {messages.length <= 1 && !isLoading && (
              <div className="pt-2 space-y-1.5">
                <p className="text-[11px] font-medium text-[#52525B] dark:text-[#A1A1AA]">
                  Suggested questions:
                </p>
                {STARTER_PROMPTS[roleMode].map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="w-full text-left px-3 py-2 rounded-xl border border-[#141414]/12 dark:border-white/12 bg-white dark:bg-[#1A1A20] hover:border-[#F04E00] dark:hover:border-[#F04E00] text-xs text-[#141414] dark:text-[#E4E4E7] flex items-center justify-between gap-2 transition-colors cursor-pointer"
                  >
                    <span className="truncate">{prompt}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#F04E00] shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-[#141414]/12 dark:border-white/12 bg-[#FAFAF9] dark:bg-[#16161A] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Tranxy's experience or UX workflow..."
              disabled={isLoading}
              className="flex-1 min-w-0 px-3.5 py-2 rounded-full border border-[#141414]/15 dark:border-white/15 bg-[#F4F4F2] dark:bg-[#0D0D0F] text-xs sm:text-sm text-[#141414] dark:text-[#F4F4F2] placeholder:text-[#71717A] focus:outline-none focus:border-[#F04E00]"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="w-9 h-9 rounded-full bg-[#141414] dark:bg-[#F04E00] hover:bg-[#F04E00] disabled:opacity-40 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </section>
      )}

      <StarBorder
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close chat assistant' : 'Open portfolio assistant'}
        color="#F04E00"
        speed="5s"
        className="shadow-lg"
        innerClassName="py-2.5 px-4 bg-[#141414] dark:bg-[#FAFAF9] text-white dark:text-[#141414] hover:bg-[#F04E00] dark:hover:bg-[#F04E00] dark:hover:text-white transition-colors gap-2.5"
      >
        <span className="w-6 h-6 rounded-full bg-silver-brushed text-[#141414] flex items-center justify-center shrink-0">
          {isOpen ? (
            <X className="w-3.5 h-3.5" />
          ) : (
            <MessageSquare className="w-3.5 h-3.5" />
          )}
        </span>
        <span className="text-xs font-semibold leading-none whitespace-nowrap">
          {isOpen ? 'Close Chat' : 'Ask Assistant'}
        </span>
      </StarBorder>
    </div>
  );
}
