'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TerminalOutputItem, ThemeType, ProjectItem } from '../types';
import { PROJECTS } from '../data/projects';
import { VIRTUAL_FILESYSTEM, getProjectByNameOrRef } from '../data/filesystem';
import { sanitizeInput, validateFileTarget } from '../utils/security';
import { NeofetchCard } from './NeofetchCard';
import { SkillsMatrix } from './SkillsMatrix';
import { ContactCard } from './ContactCard';
import { ProjectDirectoryTable } from './ProjectDirectoryTable';
import { sound } from '../utils/sound';
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles, Folder, ArrowUpRight } from 'lucide-react';

interface TerminalProps {
  theme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
  onOpenProject: (project: ProjectItem) => void;
  onToggleMatrix: () => void;
  onToggleSound: () => void;
  onToggleMode: () => void;
  onReboot: () => void;
  uptimeSeconds: number;
}

export const COMMAND_LIST = [
  'help',
  'whoami',
  'ls',
  'ls -la',
  'ls /projects',
  'ls -la /projects/',
  'cat',
  'open',
  'clear',
  'theme',
  'contact',
  'skills',
  'sudo',
  'fetch',
  'matrix',
  'audio',
  'gui',
  'history',
  'date',
  'uptime',
  'pwd',
  'echo',
  'reboot',
];

export const FILE_LIST = [
  'AI_AGENT_CORE.sys',
  'SECURITY_AUDIT.sec',
  'CAMPUS_PORTAL_BOT.app',
  'NEURAL_VISION.ai',
  'MONOCHROME_ARCHIVE.raw',
  'whoami.nfo',
  'skills.sys',
  'contact.sh',
  'system.conf',
];

export const TerminalComponent: React.FC<TerminalProps> = ({
  theme,
  onThemeChange,
  onOpenProject,
  onToggleMatrix,
  onToggleSound,
  onToggleMode,
  onReboot,
  uptimeSeconds,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [outputs, setOutputs] = useState<TerminalOutputItem[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Initialize initial banner output on load
  useEffect(() => {
    const initialOutputs: TerminalOutputItem[] = [
      {
        id: 'init-banner',
        type: 'banner',
        timestamp: new Date().toLocaleTimeString(),
        content: `
  ASHISH_OS v1.0.0 (x86_64-pantnagar-linux-gnu) - TTY0 Session Active
  Connected to Node: pantnagar.node [Udham Singh Nagar, Uttarakhand, IN]
  Type 'help' for manual or click any quick command below.
        `,
      },
      {
        id: 'init-table',
        type: 'table',
        command: 'ls -la /projects/',
        timestamp: new Date().toLocaleTimeString(),
      },
    ];
    setOutputs(initialOutputs);
  }, []);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [outputs]);

  // Keep focus on input
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  // Tab Auto-Completion
  const handleTabCompletion = () => {
    const raw = sanitizeInput(inputVal);
    if (!raw) return;

    const parts = raw.split(' ');
    if (parts.length === 1) {
      // Complete command
      const matches = COMMAND_LIST.filter((c) => c.startsWith(parts[0].toLowerCase()));
      if (matches.length === 1) {
        setInputVal(matches[0] + ' ');
        setSuggestions([]);
        sound.playKey();
      } else if (matches.length > 1) {
        setSuggestions(matches);
        sound.playKey();
      }
    } else if (parts.length >= 2) {
      // Complete filename for cat / open
      const prefix = parts[parts.length - 1].toLowerCase();
      const matches = FILE_LIST.filter((f) => f.toLowerCase().startsWith(prefix));
      if (matches.length === 1) {
        parts[parts.length - 1] = matches[0];
        setInputVal(parts.join(' '));
        setSuggestions([]);
        sound.playKey();
      } else if (matches.length > 1) {
        setSuggestions(matches);
        sound.playKey();
      }
    }
  };

  // Command Execution Engine
  const executeCommand = (cmdText: string) => {
    const sanitizedCmd = sanitizeInput(cmdText);
    if (!sanitizedCmd) return;

    sound.playExecute();

    // Add to history
    setHistory((prev) => [...prev, sanitizedCmd]);
    setHistoryIndex(-1);
    setSuggestions([]);

    const [cmd, ...args] = sanitizedCmd.split(/\s+/);
    const lowerCmd = cmd.toLowerCase();
    const argStr = args.join(' ').trim();
    const timeNow = new Date().toLocaleTimeString();

    // Output entry placeholder
    const newOutputs: TerminalOutputItem[] = [
      {
        id: `cmd-${Date.now()}`,
        type: 'input',
        command: sanitizedCmd,
        timestamp: timeNow,
      },
    ];

    switch (lowerCmd) {
      case 'help':
      case '?':
      case 'man': {
        newOutputs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          timestamp: timeNow,
          content: `
ASHISH_OS COMMAND MANUAL (TTY0):
--------------------------------------------------------------------------------
• whoami              : Identity credentials, bio, and engineering background
• ls [-la] [/projects]: Render interactive filesystem & project directory table
• cat <filename>      : Read text contents or project specifications directly
• open <filename>     : Launch rich case study modal (e.g. 'open AI_AGENT_CORE.sys')
• skills | tech       : Interactive technical capability & domain mastery matrix
• fetch | neofetch    : System telemetry, hardware profile, and runtime specs
• theme <name>        : Live theme swap (cyber | matrix | dracula | nord)
• contact | mail      : Interactive contact channels and packet dispatcher
• matrix              : Toggle digital matrix rain background canvas
• audio | sound       : Toggle Web Audio API synthesized sound FX
• gui | mode          : Switch between TTY0 CLI and Hybrid Desktop GUI
• clear | cls         : Flush current terminal buffer
• history             : Review command execution history
• sudo <command>      : Elevate user privileges
• reboot | boot       : Re-execute system boot log and memory checks
• date | uptime | pwd : Standard POSIX utility telemetry
--------------------------------------------------------------------------------
Shortcuts: [TAB] Auto-complete | [UP/DOWN] History | [ESC] Close modals
`,
        });
        break;
      }

      case 'whoami':
      case 'id': {
        newOutputs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          timestamp: timeNow,
          content: `
════════════════════════════════════════════════════════════════════════════════
USER IDENTITY: Ashish Singh Bora
SYSTEM ROLE: Principal Full-Stack Engineer & Cybersecurity / AI Systems Builder
LOCATION: Pantnagar, Udham Singh Nagar, Uttarakhand, India
NODE: pantnagar.node (TTY0 Node Origin)
EDUCATION: B.Tech in Computer Science & Engineering (Uttarakhand Technical Univ)
CORE DOMAINS:
  • Autonomous AI Agent Architectures & Tool Orchestration
  • Smart Contract Security Auditing & Symbolic Execution
  • High-Performance Next.js / TypeScript Web Applications
  • Headless Browser Automation & Scraper Clusters
  • Monochrome Architectural & Street Photography
STATUS: Open for collaborations, high-impact engineering roles, & consulting.
EMAIL: mr.ashishsinghbora@gmail.com
GITHUB: https://github.com/ashishsinghbora
════════════════════════════════════════════════════════════════════════════════
`,
        });
        break;
      }

      case 'ls':
      case 'dir': {
        newOutputs.push({
          id: `out-${Date.now()}`,
          type: 'table',
          command: sanitizedCmd,
          timestamp: timeNow,
        });
        break;
      }

      case 'cat': {
        if (!argStr) {
          newOutputs.push({
            id: `out-${Date.now()}`,
            type: 'error',
            timestamp: timeNow,
            content: 'cat: missing file operand. Example: `cat AI_AGENT_CORE.sys` or `cat whoami.nfo`',
          });
        } else {
          // Validate path against path traversal attacks & whitelist
          const validation = validateFileTarget(argStr);
          if (!validation.valid) {
            sound.playError();
            newOutputs.push({
              id: `out-${Date.now()}`,
              type: 'error',
              timestamp: timeNow,
              content: validation.error || `cat: cannot access '${argStr}': No such file`,
            });
            break;
          }

          const matchedProj = getProjectByNameOrRef(validation.normalizedTarget);
          if (matchedProj) {
            newOutputs.push({
              id: `out-${Date.now()}`,
              type: 'cat_project',
              projectData: matchedProj,
              timestamp: timeNow,
            });
          } else if (validation.normalizedTarget.includes('whoami')) {
            newOutputs.push({
              id: `out-${Date.now()}`,
              type: 'output',
              timestamp: timeNow,
              content: VIRTUAL_FILESYSTEM['/']?.children?.['whoami.nfo']?.content || 'whoami content',
            });
          } else if (validation.normalizedTarget.includes('contact')) {
            newOutputs.push({
              id: `out-${Date.now()}`,
              type: 'output',
              timestamp: timeNow,
              content: VIRTUAL_FILESYSTEM['/']?.children?.['contact.sh']?.content || 'contact content',
            });
          } else if (validation.normalizedTarget.includes('system') || validation.normalizedTarget.includes('conf')) {
            newOutputs.push({
              id: `out-${Date.now()}`,
              type: 'output',
              timestamp: timeNow,
              content: VIRTUAL_FILESYSTEM['/']?.children?.['system.conf']?.content || 'system conf',
            });
          } else if (validation.normalizedTarget.includes('skills')) {
            newOutputs.push({
              id: `out-${Date.now()}`,
              type: 'skills',
              timestamp: timeNow,
            });
          }
        }
        break;
      }

      case 'open':
      case 'view': {
        if (!argStr) {
          newOutputs.push({
            id: `out-${Date.now()}`,
            type: 'error',
            timestamp: timeNow,
            content: 'open: missing target. Example: `open AI_AGENT_CORE.sys`',
          });
        } else {
          const validation = validateFileTarget(argStr);
          if (!validation.valid) {
            sound.playError();
            newOutputs.push({
              id: `out-${Date.now()}`,
              type: 'error',
              timestamp: timeNow,
              content: validation.error || `open: cannot find '${argStr}' in /projects/`,
            });
            break;
          }

          const matchedProj = getProjectByNameOrRef(validation.normalizedTarget);
          if (matchedProj) {
            onOpenProject(matchedProj);
            newOutputs.push({
              id: `out-${Date.now()}`,
              type: 'success',
              timestamp: timeNow,
              content: `[SUCCESS] Opened case study modal for ${matchedProj.name}. Press [ESC] to return to terminal.`,
            });
          } else {
            newOutputs.push({
              id: `out-${Date.now()}`,
              type: 'error',
              timestamp: timeNow,
              content: `open: '${argStr}' target not found in /projects/. Use 'ls' to see files.`,
            });
          }
        }
        break;
      }

      case 'skills':
      case 'tech':
      case 'stack': {
        newOutputs.push({
          id: `out-${Date.now()}`,
          type: 'skills',
          timestamp: timeNow,
        });
        break;
      }

      case 'contact':
      case 'mail':
      case 'email': {
        newOutputs.push({
          id: `out-${Date.now()}`,
          type: 'contact',
          timestamp: timeNow,
        });
        break;
      }

      case 'fetch':
      case 'neofetch':
      case 'sysinfo': {
        newOutputs.push({
          id: `out-${Date.now()}`,
          type: 'neofetch',
          timestamp: timeNow,
        });
        break;
      }

      case 'theme': {
        const themeChoice = args[0]?.toLowerCase() as ThemeType;
        if (['cyber', 'matrix', 'dracula', 'nord'].includes(themeChoice)) {
          onThemeChange(themeChoice);
          newOutputs.push({
            id: `out-${Date.now()}`,
            type: 'success',
            timestamp: timeNow,
            content: `[THEME] Swapped active color palette to '${themeChoice}'. Live CSS variables synced.`,
          });
        } else {
          newOutputs.push({
            id: `out-${Date.now()}`,
            type: 'output',
            timestamp: timeNow,
            content: `Current theme: '${theme}'. Available themes: cyber | matrix | dracula | nord. Example: 'theme matrix'`,
          });
        }
        break;
      }

      case 'matrix': {
        onToggleMatrix();
        newOutputs.push({
          id: `out-${Date.now()}`,
          type: 'success',
          timestamp: timeNow,
          content: '[MATRIX] Digital rain background canvas toggled.',
        });
        break;
      }

      case 'audio':
      case 'sound': {
        onToggleSound();
        newOutputs.push({
          id: `out-${Date.now()}`,
          type: 'success',
          timestamp: timeNow,
          content: '[AUDIO] Web Audio API synthesized sound effects state toggled.',
        });
        break;
      }

      case 'gui':
      case 'mode': {
        onToggleMode();
        newOutputs.push({
          id: `out-${Date.now()}`,
          type: 'success',
          timestamp: timeNow,
          content: '[MODE] Toggled between TTY0 Fullscreen CLI and Hybrid Desktop GUI.',
        });
        break;
      }

      case 'clear':
      case 'cls': {
        setOutputs([]);
        setInputVal('');
        return;
      }

      case 'history': {
        newOutputs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          timestamp: timeNow,
          content: history.map((h, i) => `  ${i + 1}  ${h}`).join('\n') || 'No commands in history.',
        });
        break;
      }

      case 'sudo': {
        sound.playError();
        newOutputs.push({
          id: `out-${Date.now()}`,
          type: 'error',
          timestamp: timeNow,
          content: `
[SECURITY_ALERT] sudo: ashish is not in the sudoers file on node pantnagar.node.
This incident will be logged to /var/log/audit.sec.
(Nice try! All terminal tools and project files are already world-readable: -rwxr-xr-x)
`,
        });
        break;
      }

      case 'reboot':
      case 'boot': {
        onReboot();
        return;
      }

      case 'date': {
        newOutputs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          timestamp: timeNow,
          content: new Date().toString(),
        });
        break;
      }

      case 'uptime': {
        const hrs = Math.floor(uptimeSeconds / 3600);
        const mins = Math.floor((uptimeSeconds % 3600) / 60);
        const secs = uptimeSeconds % 60;
        newOutputs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          timestamp: timeNow,
          content: `pantnagar.node up ${hrs} hours, ${mins} min, ${secs} sec, load average: 0.12, 0.08, 0.04`,
        });
        break;
      }

      case 'pwd': {
        newOutputs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          timestamp: timeNow,
          content: '/home/ashish',
        });
        break;
      }

      case 'echo': {
        newOutputs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          timestamp: timeNow,
          content: argStr,
        });
        break;
      }

      case 'exit': {
        newOutputs.push({
          id: `out-${Date.now()}`,
          type: 'system',
          timestamp: timeNow,
          content: 'Session terminated. Restarting TTY0 loop...',
        });
        break;
      }

      default: {
        sound.playError();
        newOutputs.push({
          id: `out-${Date.now()}`,
          type: 'error',
          timestamp: timeNow,
          content: `zsh: command not found: ${sanitizedCmd}. Type 'help' to see valid commands or click quick action buttons.`,
        });
      }
    }

    setOutputs((prev) => [...prev, ...newOutputs]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleTabCompletion();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length > 0 && historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx >= history.length) {
          setHistoryIndex(-1);
          setInputVal('');
        } else {
          setHistoryIndex(nextIdx);
          setInputVal(history[nextIdx]);
        }
      }
    } else {
      sound.playKey();
    }
  };

  return (
    <div
      onClick={handleContainerClick}
      className="w-full h-full flex flex-col font-mono text-xs md:text-sm text-zinc-200 select-text cursor-text"
      role="region"
      aria-label="ASHISH_OS TTY0 Terminal"
    >
      {/* Terminal Output Stream with ARIA live region for screen readers */}
      <div
        className="space-y-3 pb-4"
        role="log"
        aria-live="polite"
        aria-atomic="false"
        aria-relevant="additions text"
      >
        {outputs.map((item) => {
          if (item.type === 'banner') {
            return (
              <div key={item.id} className="py-2 border-b border-zinc-800 text-zinc-400">
                <pre className="text-xs sm:text-sm text-[var(--accent)] font-bold whitespace-pre-wrap">
                  {item.content}
                </pre>
              </div>
            );
          }

          if (item.type === 'input') {
            return (
              <div key={item.id} className="flex items-center gap-2 pt-2 text-zinc-300">
                <span className="text-[var(--accent)] font-bold">ashish@pantnagar:~$</span>
                <span className="text-white font-semibold">{item.command}</span>
                <span className="text-[10px] text-zinc-600 ml-auto font-mono">
                  {item.timestamp}
                </span>
              </div>
            );
          }

          if (item.type === 'table') {
            return (
              <div key={item.id} className="space-y-1">
                <ProjectDirectoryTable onOpenProject={onOpenProject} />
              </div>
            );
          }

          if (item.type === 'neofetch') {
            return (
              <div key={item.id}>
                <NeofetchCard theme={theme} uptimeSeconds={uptimeSeconds} />
              </div>
            );
          }

          if (item.type === 'skills') {
            return (
              <div key={item.id}>
                <SkillsMatrix />
              </div>
            );
          }

          if (item.type === 'contact') {
            return (
              <div key={item.id}>
                <ContactCard />
              </div>
            );
          }

          if (item.type === 'cat_project' && item.projectData) {
            const proj = item.projectData;
            return (
              <div
                key={item.id}
                className="my-3 p-4 bg-black/60 border border-[var(--border-color)] rounded-xl space-y-3 shadow-xl backdrop-blur-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--accent)] font-bold text-sm">{proj.name}</span>
                    <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-[10px] text-amber-300">
                      {proj.size}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-[10px] text-emerald-400 border border-emerald-500/30">
                      ● {proj.status}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      sound.playModalOpen();
                      onOpenProject(proj);
                    }}
                    className="px-3 py-1 bg-[var(--accent)]/15 hover:bg-[var(--accent)]/30 text-[var(--accent)] border border-[var(--accent)]/40 rounded text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_8px_var(--accent-glow)]"
                  >
                    <span>LAUNCH DEEP CASE STUDY</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-zinc-300 font-sans text-xs sm:text-sm">
                  {proj.description}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {proj.metrics.map((m, i) => (
                    <div key={i} className="p-2 bg-zinc-950 rounded border border-zinc-800 text-xs">
                      <div className="text-zinc-500 text-[10px]">{m.label}</div>
                      <div className="font-bold text-[var(--accent)] font-mono">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* ASCII Diagram Preview */}
                <div className="p-2 bg-black rounded border border-zinc-800 overflow-x-auto">
                  <pre className="text-[10px] text-zinc-400 font-mono">
                    {proj.architecture.asciiDiagram}
                  </pre>
                </div>
              </div>
            );
          }

          if (item.type === 'error') {
            return (
              <div key={item.id} className="text-rose-400 whitespace-pre-wrap">
                {item.content}
              </div>
            );
          }

          if (item.type === 'success') {
            return (
              <div key={item.id} className="text-emerald-400 whitespace-pre-wrap">
                {item.content}
              </div>
            );
          }

          return (
            <div key={item.id} className="text-zinc-300 whitespace-pre-wrap">
              {item.content}
            </div>
          );
        })}
      </div>

      {/* Auto-complete suggestions pills */}
      {suggestions.length > 0 && (
        <div
          id="terminal-suggestions"
          role="listbox"
          aria-label="Command suggestions"
          className="flex flex-wrap gap-1.5 mb-2 p-2 bg-zinc-950/90 border border-zinc-800 rounded-lg text-xs"
        >
          <span className="text-zinc-500 self-center mr-1">Suggestions:</span>
          {suggestions.map((sug) => (
            <button
              key={sug}
              role="option"
              aria-selected={false}
              onClick={() => {
                sound.playKey();
                setInputVal((prev) => {
                  const parts = prev.trim().split(' ');
                  parts[parts.length - 1] = sug;
                  return parts.join(' ') + ' ';
                });
                setSuggestions([]);
                inputRef.current?.focus();
              }}
              className="px-2 py-0.5 rounded bg-zinc-900 hover:bg-[var(--accent)]/20 text-zinc-300 hover:text-white border border-zinc-700 text-xs cursor-pointer"
            >
              {sug}
            </button>
          ))}
        </div>
      )}

      {/* Interactive Command Input Line */}
      <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/80 mt-auto">
        <label htmlFor="terminal-cli-input" className="text-[var(--accent)] font-bold whitespace-nowrap">
          ashish@pantnagar:~$
        </label>
        <div className="relative flex-1 flex items-center">
          <input
            id="terminal-cli-input"
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Terminal command input"
            aria-autocomplete="list"
            aria-controls="terminal-suggestions"
            className="w-full bg-transparent text-white focus:outline-none font-mono text-xs md:text-sm py-1 pr-6"
            placeholder="Type 'help', 'ls -la', 'whoami', 'skills', or click below..."
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
          <button
            onClick={() => executeCommand(inputVal)}
            className="p-1 text-zinc-500 hover:text-[var(--accent)] transition-colors cursor-pointer"
            aria-label="Submit command"
            title="Execute [Enter]"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div ref={bottomRef} />
    </div>
  );
};
