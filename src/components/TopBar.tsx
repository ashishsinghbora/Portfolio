'use client';

import React, { useState, useEffect } from 'react';
import { ThemeType, SystemMode } from '../types';
import { Volume2, VolumeX, Monitor, Terminal as TerminalIcon, Sparkles, Shield, Cpu, RefreshCw } from 'lucide-react';
import { sound } from '../utils/sound';

interface Props {
  theme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
  mode: SystemMode;
  onModeToggle: () => void;
  soundEnabled: boolean;
  onSoundToggle: () => void;
  onReboot: () => void;
  onQuickCommand: (cmd: string) => void;
}

const THEMES: Array<{ id: ThemeType; label: string; color: string }> = [
  { id: 'cyber', label: 'Cyber', color: '#00f0ff' },
  { id: 'matrix', label: 'Matrix', color: '#00ff66' },
  { id: 'dracula', label: 'Dracula', color: '#bd93f9' },
  { id: 'nord', label: 'Nord', color: '#88c0d0' },
];

export const TopBar: React.FC<Props> = ({
  theme,
  onThemeChange,
  mode,
  onModeToggle,
  soundEnabled,
  onSoundToggle,
  onReboot,
  onQuickCommand,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Asia/Kolkata',
        }) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-black/80 border-b border-[var(--border-color)] backdrop-blur-md font-mono text-xs select-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2.5">
        {/* Left Side: System Identity & Node */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="font-bold text-white tracking-wider text-xs sm:text-sm">
              ASHISH_OS <span className="text-[var(--accent)] text-xs font-semibold">v1.0.0</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-zinc-800 text-[11px] text-zinc-400">
            <span className="text-zinc-500">NODE:</span>
            <span className="text-zinc-200 font-semibold">pantnagar.node</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">Uttarakhand, IN</span>
          </div>
        </div>

        {/* Center: Live Time / Telemetry */}
        <div className="hidden lg:flex items-center gap-3 text-[11px] text-zinc-400">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800">
            <span className="text-zinc-500">SYS_CLOCK:</span>
            <span className="text-[var(--accent)] font-bold">{timeStr || '01:30:00 IST'}</span>
          </div>
        </div>

        {/* Right Side: Theme Swapper, Audio, Mode Switcher */}
        <div className="flex items-center gap-2">
          {/* Themes Pill Selector */}
          <div className="flex items-center bg-zinc-950 p-0.5 rounded-lg border border-zinc-800">
            {THEMES.map((t) => {
              const active = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    sound.playChime();
                    onThemeChange(t.id);
                  }}
                  className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all cursor-pointer flex items-center gap-1 ${
                    active
                      ? 'bg-[var(--accent)] text-black shadow-[0_0_10px_var(--accent-glow)]'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                  title={`Switch to ${t.label} theme`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: t.color }}
                  />
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={() => {
              onSoundToggle();
            }}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-zinc-900 border-zinc-700 text-[var(--accent)]'
                : 'bg-zinc-950 border-zinc-800 text-zinc-600'
            }`}
            title={soundEnabled ? 'Mute synthesized sound FX' : 'Enable synthesized sound FX'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Dual-Mode Toggle (TTY0 CLI vs GUI Desktop) */}
          <button
            onClick={() => {
              sound.playExecute();
              onModeToggle();
            }}
            className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            title={`Switch to ${mode === 'terminal' ? 'GUI Desktop' : 'Pure TTY0 CLI'} Mode`}
          >
            {mode === 'terminal' ? (
              <>
                <TerminalIcon className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span className="hidden sm:inline">TTY0 CLI</span>
              </>
            ) : (
              <>
                <Monitor className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">GUI OS</span>
              </>
            )}
          </button>

          {/* Reboot Button */}
          <button
            onClick={() => {
              sound.playBoot();
              onReboot();
            }}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
            title="Reboot ASHISH_OS"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
