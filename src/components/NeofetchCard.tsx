'use client';

import React from 'react';
import { ThemeType } from '../types';

interface Props {
  theme: ThemeType;
  uptimeSeconds?: number;
}

export const NeofetchCard: React.FC<Props> = ({ theme, uptimeSeconds = 1420 }) => {
  const formatUptime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  return (
    <div className="my-3 p-4 bg-black/40 border border-current/20 rounded-lg font-mono text-xs md:text-sm shadow-xl backdrop-blur-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* ASCII Logo */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-3 bg-zinc-950/60 rounded border border-zinc-800/80">
          <pre className="text-[9px] sm:text-[10px] md:text-xs leading-none font-bold text-[var(--accent)] drop-shadow-[0_0_8px_var(--accent)] select-none">
{`
       /\\
      /  \\
     / /\\ \\
    / /  \\ \\
   / / /\\ \\ \\
  / / /\\ \\ \\ \\
 / / /__\\ \\ \\ \\
/_/ /______\\ \\_\\
\\ \\ \\______/ / /
 \\ \\ \\    / / /
  \\ \\ \\  / / /
   \\ \\ \\/ / /
    \\ \\  / /
     \\ \\/ /
      \\  /
       \\/
`}
          </pre>
          <span className="mt-2 text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
            ASHISH_OS x86_64
          </span>
        </div>

        {/* System Specs */}
        <div className="lg:col-span-8 space-y-1.5 text-zinc-300">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
            <span className="text-[var(--accent)] font-bold text-sm md:text-base">
              ashish@pantnagar.node
            </span>
            <span className="text-zinc-500">───</span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              ● ONLINE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1 text-xs">
            <div>
              <span className="text-[var(--accent)] font-bold">OS: </span>
              <span>ASHISH_OS v1.0.0 (Custom UNIX-like TTY0)</span>
            </div>
            <div>
              <span className="text-[var(--accent)] font-bold">Host: </span>
              <span>Pantnagar Cybernetics Station</span>
            </div>
            <div>
              <span className="text-[var(--accent)] font-bold">Kernel: </span>
              <span>6.12.0-pantnagar-sys-x86_64</span>
            </div>
            <div>
              <span className="text-[var(--accent)] font-bold">Uptime: </span>
              <span className="text-zinc-200">{formatUptime(uptimeSeconds)}</span>
            </div>
            <div>
              <span className="text-[var(--accent)] font-bold">Location: </span>
              <span>Pantnagar, Uttarakhand, India (IN)</span>
            </div>
            <div>
              <span className="text-[var(--accent)] font-bold">Education: </span>
              <span>B.Tech CSE @ Uttarakhand Tech Univ</span>
            </div>
            <div>
              <span className="text-[var(--accent)] font-bold">Shell: </span>
              <span>zsh 5.9 (tty0 / web-pty)</span>
            </div>
            <div>
              <span className="text-[var(--accent)] font-bold">Theme: </span>
              <span className="capitalize text-white font-semibold">{theme}</span>
            </div>
            <div>
              <span className="text-[var(--accent)] font-bold">Primary Stack: </span>
              <span>Next.js 16, TypeScript, Python, Rust</span>
            </div>
            <div>
              <span className="text-[var(--accent)] font-bold">Status: </span>
              <span className="text-emerald-400 font-semibold">Open for Eng Roles & Collabs</span>
            </div>
          </div>

          {/* Memory Bar */}
          <div className="pt-2">
            <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
              <span>Memory: 1420MiB / 64512MiB (2.2%)</span>
              <span className="text-emerald-400">Optimal</span>
            </div>
            <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
              <div className="h-full bg-[var(--accent)] w-[22%]" />
            </div>
          </div>

          {/* Color Palette Block */}
          <div className="flex items-center gap-1.5 pt-3">
            <div className="w-4 h-4 rounded-sm bg-black border border-zinc-700" />
            <div className="w-4 h-4 rounded-sm bg-[#ff5555]" />
            <div className="w-4 h-4 rounded-sm bg-[#50fa7b]" />
            <div className="w-4 h-4 rounded-sm bg-[#f1fa8c]" />
            <div className="w-4 h-4 rounded-sm bg-[#bd93f9]" />
            <div className="w-4 h-4 rounded-sm bg-[#ff79c6]" />
            <div className="w-4 h-4 rounded-sm bg-[#8be9fd]" />
            <div className="w-4 h-4 rounded-sm bg-[#00f0ff]" />
            <div className="w-4 h-4 rounded-sm bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
};
