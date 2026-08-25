'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Check, Copy, ExternalLink, Terminal, Send } from 'lucide-react';
import { GithubIcon } from './Icons';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';

export const ContactCard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [isSent, setIsSent] = useState(false);

  const email = 'mr.ashishsinghbora@gmail.com';
  const github = 'https://github.com/ashishsinghbora';
  const repo = 'https://github.com/ashishsinghbora/Portfolio';

  const handleCopyEmail = () => {
    sound.playExecute();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    sound.playChime();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00f0ff', '#00ff66', '#bd93f9', '#ffffff'],
    });

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name || 'Collaborator'}`);
    const body = encodeURIComponent(message);
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');

    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setMessage('');
      setName('');
    }, 4000);
  };

  return (
    <div className="my-4 p-5 bg-black/60 border border-[var(--border-color)] rounded-xl font-mono text-xs md:text-sm shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-[var(--accent)]" />
          <span className="font-bold text-white text-sm">TRANSMIT PACKET / CONTACT CHANNEL</span>
        </div>
        <span className="text-emerald-400 text-[11px] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          LISTENING ON TTY0
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-4">
        {/* Info Left Column */}
        <div className="md:col-span-6 space-y-3.5">
          <div className="p-3 bg-zinc-950/80 rounded-lg border border-zinc-800/80 space-y-2">
            <div className="text-zinc-400 text-xs">Primary Endpoint:</div>
            <div className="flex items-center justify-between gap-2 p-2 bg-black/70 rounded border border-zinc-800">
              <span className="text-[var(--accent)] font-bold text-xs sm:text-sm truncate select-all">
                {email}
              </span>
              <button
                onClick={handleCopyEmail}
                className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                title="Copy to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-3 bg-zinc-950/80 rounded-lg border border-zinc-800/80 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>Pantnagar, Udham Singh Nagar, Uttarakhand, India</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playExecute()}
                className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>github.com/ashishsinghbora</span>
                <ExternalLink className="w-3 h-3 ml-0.5 text-zinc-600" />
              </a>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-zinc-900">
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playExecute()}
                className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Portfolio Repository</span>
                <ExternalLink className="w-3 h-3 ml-0.5 text-zinc-600" />
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Message Dispatcher Form */}
        <div className="md:col-span-6">
          <form
            onSubmit={handleSendDraft}
            className="p-3.5 bg-zinc-950/80 rounded-lg border border-zinc-800/80 space-y-2.5"
          >
            <div className="text-xs font-bold text-zinc-300 flex items-center justify-between">
              <span>DIRECT DISPATCH INTERFACE</span>
              <span className="text-[10px] text-zinc-500 font-mono">RFC-822</span>
            </div>

            <div>
              <input
                type="text"
                placeholder="Sender ID / Your Name / Handle"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-black border border-zinc-800 rounded text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div>
              <textarea
                rows={3}
                placeholder="Message payload / Collaboration proposal / Engineering inquiry..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full px-2.5 py-1.5 bg-black border border-zinc-800 rounded text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[var(--accent)] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[var(--accent)]/20 hover:bg-[var(--accent)]/30 text-[var(--accent)] border border-[var(--accent)]/50 rounded text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_10px_var(--accent-glow)]"
            >
              {isSent ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">DISPATCHED TO MAIL CLIENT</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>TRANSMIT PACKET (MAILTO)</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
