'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ThemeType, SystemMode, ProjectItem } from '../types';
import { BootSequence } from '../components/BootSequence';
import { TopBar } from '../components/TopBar';
import { TerminalComponent } from '../components/Terminal';
import { QuickDock } from '../components/QuickDock';
import { SystemTelemetryWidget } from '../components/SystemTelemetryWidget';
import { PROJECTS } from '../data/projects';
import { sound } from '../utils/sound';
import { Terminal as TerminalIcon, Sparkles, Folder, ArrowUpRight, Shield, Cpu, Bot, Eye, Camera, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../components/Icons';

// Lazy load heavy interactive overlays for optimal bundle throughput and zero initial CLS
const CaseStudyModal = dynamic(
  () => import('../components/CaseStudyModal').then((mod) => mod.CaseStudyModal),
  { ssr: false }
);

const MatrixRainCanvas = dynamic(
  () => import('../components/MatrixRainCanvas').then((mod) => mod.MatrixRainCanvas),
  { ssr: false }
);

const CATEGORY_ICON_MAP: Record<string, React.ElementType> = {
  'Machine Learning & Agents': Bot,
  'Cybersecurity & Auditing': Shield,
  'Systems & Automation': Cpu,
  'Computer Vision & Edge': Eye,
  'Photography & Visual Design': Camera,
};

export default function Home() {
  const [isBooting, setIsBooting] = useState<boolean>(true);
  const [theme, setTheme] = useState<ThemeType>('cyber');
  const [mode, setMode] = useState<SystemMode>('gui');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [matrixActive, setMatrixActive] = useState<boolean>(false);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [uptime, setUptime] = useState<number>(1420);

  // Load persisted theme & sound preferences on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('ashish_os_theme') as ThemeType;
      if (savedTheme && ['cyber', 'matrix', 'dracula', 'nord'].includes(savedTheme)) {
        setTheme(savedTheme);
      }
      const savedSound = localStorage.getItem('ashish_os_sound');
      if (savedSound !== null) {
        const enabled = savedSound === 'true';
        setSoundEnabled(enabled);
        sound.setEnabled(enabled);
      }
    } catch {}
  }, []);

  // Update HTML data-theme attribute whenever theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('ashish_os_theme', theme);
    } catch {}
  }, [theme]);

  // Uptime tick counter
  useEffect(() => {
    const timer = setInterval(() => {
      setUptime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
  };

  const handleSoundToggle = () => {
    const nextVal = sound.toggle();
    setSoundEnabled(nextVal);
    try {
      localStorage.setItem('ashish_os_sound', String(nextVal));
    } catch {}
  };

  const handleModeToggle = () => {
    setMode((prev) => (prev === 'terminal' ? 'gui' : 'terminal'));
  };

  const handleToggleMatrix = () => {
    setMatrixActive((prev) => !prev);
  };

  const handleReboot = () => {
    setIsBooting(true);
  };

  const handleQuickCommand = (cmd: string) => {
    if (cmd.startsWith('open ')) {
      const pName = cmd.replace('open ', '').trim().toLowerCase();
      const proj = PROJECTS.find(
        (p) => p.name.toLowerCase() === pName || p.id === pName || p.name.toLowerCase().replace(/\.[^/.]+$/, '') === pName
      );
      if (proj) {
        setActiveProject(proj);
      }
    }
  };

  return (
    <main className="relative min-h-screen bg-[var(--bg-color)] text-[var(--text-main)] overflow-x-hidden flex flex-col font-mono">
      {/* Background Matrix Rain Overlay */}
      <MatrixRainCanvas active={matrixActive} theme={theme} />

      {/* CRT Scanline Overlay */}
      <div className="fixed inset-0 scanlines pointer-events-none z-20 opacity-30" aria-hidden="true" />

      {/* Boot Sequence Modal */}
      {isBooting && <BootSequence onComplete={() => setIsBooting(false)} />}

      {/* System Status Top Bar */}
      <TopBar
        theme={theme}
        onThemeChange={handleThemeChange}
        mode={mode}
        onModeToggle={handleModeToggle}
        soundEnabled={soundEnabled}
        onSoundToggle={handleSoundToggle}
        onReboot={handleReboot}
        onQuickCommand={handleQuickCommand}
      />

      {/* Main OS Viewport Area with CLS-Protected Dimensions */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 md:p-6 pb-24 z-10 flex flex-col">
        {mode === 'terminal' ? (
          /* Pure Fullscreen TTY0 CLI Mode */
          <div className="flex-1 w-full bg-black/80 border border-[var(--border-color)] rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-xl flex flex-col min-h-[75vh]">
            {/* Terminal Window Chrome */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" aria-hidden="true" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" aria-hidden="true" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" aria-hidden="true" />
                <span className="text-xs text-zinc-400 font-mono ml-2">
                  ashish@pantnagar.node: ~ (TTY0 - Fullscreen)
                </span>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono">UTF-8 / x86_64</span>
            </div>

            {/* Interactive Terminal Core */}
            <div className="flex-1 flex flex-col min-h-[500px]">
              <TerminalComponent
                theme={theme}
                onThemeChange={handleThemeChange}
                onOpenProject={(proj) => setActiveProject(proj)}
                onToggleMatrix={handleToggleMatrix}
                onToggleSound={handleSoundToggle}
                onToggleMode={handleModeToggle}
                onReboot={handleReboot}
                uptimeSeconds={uptime}
              />
            </div>
          </div>
        ) : (
          /* Hybrid Desktop GUI Mode (Terminal + Quick Panels) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-start">
            {/* Left/Center Main Column: Primary Terminal Shell */}
            <div className="lg:col-span-8 bg-black/80 border border-[var(--border-color)] rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-xl flex flex-col min-h-[600px] lg:min-h-[720px]">
              {/* Window Header */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" aria-hidden="true" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" aria-hidden="true" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" aria-hidden="true" />
                  <span className="text-xs text-zinc-400 font-mono ml-2">
                    ashish@pantnagar.node: ~ (TTY0 Session)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    ● READY
                  </span>
                </div>
              </div>

              {/* Interactive Terminal Core */}
              <div className="flex-1 flex flex-col min-h-[500px]">
                <TerminalComponent
                  theme={theme}
                  onThemeChange={handleThemeChange}
                  onOpenProject={(proj) => setActiveProject(proj)}
                  onToggleMatrix={handleToggleMatrix}
                  onToggleSound={handleSoundToggle}
                  onToggleMode={handleModeToggle}
                  onReboot={handleReboot}
                  uptimeSeconds={uptime}
                />
              </div>
            </div>

            {/* Right Column: GUI Quick Panels & File Explorer */}
            <div className="lg:col-span-4 space-y-4">
              {/* System Node Telemetry */}
              <SystemTelemetryWidget uptimeSeconds={uptime} />

              {/* Quick Filesystem Inspector */}
              <div className="p-4 bg-black/60 border border-[var(--border-color)] rounded-xl font-mono text-xs shadow-xl backdrop-blur-md space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Folder className="w-4 h-4 text-[var(--accent)]" />
                    <span className="font-bold text-white text-xs">PRE-LOADED CASE STUDIES</span>
                  </div>
                  <span className="text-[10px] text-zinc-500">/projects/</span>
                </div>

                <div className="space-y-2">
                  {PROJECTS.map((proj) => {
                    const Icon = CATEGORY_ICON_MAP[proj.category] || Folder;
                    return (
                      <div
                        key={proj.id}
                        onClick={() => {
                          sound.playModalOpen();
                          setActiveProject(proj);
                        }}
                        className="group p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800/90 hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/10 transition-all cursor-pointer flex items-center justify-between gap-2"
                        role="button"
                        tabIndex={0}
                        aria-label={`Open case study for ${proj.name}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            sound.playModalOpen();
                            setActiveProject(proj);
                          }
                        }}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Icon className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                          <div className="min-w-0">
                            <div className="font-bold text-zinc-200 group-hover:text-[var(--accent)] text-[11px] truncate">
                              {proj.name}
                            </div>
                            <div className="text-[10px] text-zinc-500 truncate">
                              {proj.category}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[10px] font-mono text-amber-400">
                            {proj.size}
                          </span>
                          <ArrowUpRight className="w-3 h-3 text-zinc-600 group-hover:text-[var(--accent)]" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Developer Profile Card */}
              <div className="p-4 bg-black/60 border border-[var(--border-color)] rounded-xl font-mono text-xs shadow-xl backdrop-blur-md space-y-2.5">
                <div className="flex items-center gap-2 text-zinc-300 font-bold">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                  <span>IDENTITY: Ashish Singh Bora</span>
                </div>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                  Cybersecurity & AI Engineer based in Pantnagar, Uttarakhand. Focused on deterministic tool-calling runtimes, smart contract AST auditing, and high-performance interfaces.
                </p>
                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="text-emerald-400 text-[10px]">● OPEN FOR COLLABS</span>
                  <a
                    href="https://github.com/ashishsinghbora"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playExecute()}
                    className="text-zinc-400 hover:text-white flex items-center gap-1 text-[11px]"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Slide-out / Spring Modal Reader for Case Studies */}
      {activeProject && (
        <CaseStudyModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}

      {/* Bottom Floating Command & Navigation Dock */}
      <QuickDock
        onRunCommand={(cmd) => {
          if (cmd.startsWith('open ')) {
            handleQuickCommand(cmd);
          }
        }}
        onToggleMatrix={handleToggleMatrix}
        matrixActive={matrixActive}
      />
    </main>
  );
}
