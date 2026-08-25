'use client';

import React from 'react';
import { Terminal, Folder, Cpu, Mail, Sparkles, Binary, HelpCircle, Code, Shield } from 'lucide-react';
import { sound } from '../utils/sound';

interface Props {
  onRunCommand: (command: string) => void;
  onToggleMatrix: () => void;
  matrixActive: boolean;
}

const QUICK_ACTIONS = [
  { label: 'ls -la /projects/', cmd: 'ls -la /projects/', icon: Folder, desc: 'Interactive Case Studies' },
  { label: 'skills', cmd: 'skills', icon: Cpu, desc: 'Domain Competencies' },
  { label: 'fetch', cmd: 'fetch', icon: Terminal, desc: 'System Telemetry' },
  { label: 'whoami', cmd: 'whoami', icon: Code, desc: 'Developer Credentials' },
  { label: 'contact', cmd: 'contact', icon: Mail, desc: 'Reach Out' },
  { label: 'help', cmd: 'help', icon: HelpCircle, desc: 'Command Manual' },
];

export const QuickDock: React.FC<Props> = ({ onRunCommand, onToggleMatrix, matrixActive }) => {
  return (
    <div className="fixed bottom-3 inset-x-0 z-30 pointer-events-none flex justify-center px-4">
      <div className="pointer-events-auto bg-black/85 border border-[var(--border-color)] rounded-2xl p-1.5 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center gap-1 sm:gap-2 max-w-full overflow-x-auto custom-scrollbar font-mono text-xs">
        {QUICK_ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.cmd}
              onClick={() => {
                sound.playExecute();
                onRunCommand(action.cmd);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-zinc-950 hover:bg-[var(--accent)]/15 border border-zinc-800 hover:border-[var(--accent)]/50 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shrink-0 group"
              title={action.desc}
            >
              <Icon className="w-3.5 h-3.5 text-[var(--accent)] group-hover:scale-110 transition-transform" />
              <span className="font-bold text-[11px]">{action.label}</span>
            </button>
          );
        })}

        <div className="h-4 w-[1px] bg-zinc-800 mx-1 shrink-0" />

        {/* Matrix Rain Toggle Button */}
        <button
          onClick={() => {
            sound.playChime();
            onToggleMatrix();
          }}
          className={`px-2.5 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
            matrixActive
              ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
              : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
          }`}
          title="Toggle Digital Rain Overlay"
        >
          <Binary className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-bold text-[11px] hidden sm:inline">MATRIX RAIN</span>
        </button>
      </div>
    </div>
  );
};
