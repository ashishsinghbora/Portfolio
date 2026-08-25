'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Cpu, Zap, CheckCircle2, ChevronRight } from 'lucide-react';
import { sound } from '../utils/sound';

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  { text: '[  0.000000] ASHISH_OS v1.0.0-RELEASE (x86_64-pantnagar-linux-gnu)', delay: 100 },
  { text: '[  0.041200] CPU0: Pantnagar Node Core @ 4.80GHz [Bora Microarchitecture]', delay: 180 },
  { text: '[  0.082400] Memory Check: 64512MB RAM OK | Cache L1/L2/L3 Verified', delay: 240 },
  { text: '[  0.135000] ACPI: Initializing Subsystem Telemetry & Power States', delay: 300 },
  { text: '[  0.198000] Loading Security Kernel: AST_SOL_PARSER & Z3_SMT_SOLVER [OK]', delay: 380 },
  { text: '[  0.274000] Initializing AI Agent Core Runtime (Vector Mesh + LLM IPC) [OK]', delay: 460 },
  { text: '[  0.342000] Initializing Neural Vision Pipeline (TensorRT INT8) [OK]', delay: 540 },
  { text: '[  0.410000] Mounting Virtual Filesystem (/projects, /system, /skills) [OK]', delay: 620 },
  { text: '[  0.485000] Establishing TTY0 Session: pantnagar.node (Udham Singh Nagar, UK, IN)', delay: 700 },
  { text: '[  0.550000] System Ready. Launching interactive terminal shell...', delay: 800 },
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);

  useEffect(() => {
    sound.playBoot();
  }, []);

  useEffect(() => {
    if (currentIndex < BOOT_LOGS.length) {
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, BOOT_LOGS[currentIndex].text]);
        sound.playKey();
        setCurrentIndex((prev) => prev + 1);
        setProgress(Math.round(((currentIndex + 1) / BOOT_LOGS.length) * 100));
      }, BOOT_LOGS[currentIndex].delay);
      return () => clearTimeout(timer);
    } else {
      const endTimer = setTimeout(() => {
        if (!completedRef.current) {
          completedRef.current = true;
          onComplete();
        }
      }, 400);
      return () => clearTimeout(endTimer);
    }
  }, [currentIndex, onComplete]);

  const handleSkip = () => {
    if (!completedRef.current) {
      completedRef.current = true;
      sound.playExecute();
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 bg-[#08090d] text-[#00f0ff] font-mono flex flex-col justify-between p-4 md:p-8 select-none"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#00f0ff]/20 pb-3 text-xs tracking-wider">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-ping" />
          <span className="font-bold text-white tracking-widest">ASHISH_OS BOOT LOADER</span>
          <span className="text-zinc-500">| TTY0 NODE: pantnagar.node</span>
        </div>
        <button
          onClick={handleSkip}
          className="px-3 py-1 bg-[#00f0ff]/10 hover:bg-[#00f0ff]/25 text-[#00f0ff] border border-[#00f0ff]/40 rounded text-xs transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>FAST BOOT [ESC]</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Console Output */}
      <div className="my-auto max-w-4xl w-full mx-auto space-y-6">
        {/* ASCII Banner */}
        <pre className="text-[9px] sm:text-xs md:text-sm leading-none font-mono text-[#00f0ff] font-bold overflow-x-auto select-none opacity-90 drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]">
{`
    _    ____  _   _ ___ ____  _   _     ___  ____  
   / \\  / ___|| | | |_ _/ ___|| | | |   / _ \\/ ___| 
  / _ \\ \\___ \\| |_| || |\\___ \\| |_| |  | | | \\___ \\ 
 / ___ \\ ___) |  _  || | ___) |  _  |  | |_| |___) |
/_/   \\_\\____/|_| |_|___|____/|_| |_|   \\___/|____/ 
                                                    
          [ ASHISH SINGH BORA - v1.0.0 ]
`}
        </pre>

        {/* Boot Logs Terminal Window */}
        <div className="bg-black/60 border border-[#00f0ff]/30 rounded-lg p-4 font-mono text-xs md:text-sm space-y-1.5 shadow-2xl backdrop-blur-md max-h-[40vh] overflow-y-auto">
          {logs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-2"
            >
              <span className="text-emerald-400">➜</span>
              <span className={log.includes('[OK]') ? 'text-emerald-300' : 'text-zinc-300'}>
                {log}
              </span>
            </motion.div>
          ))}
          {currentIndex < BOOT_LOGS.length && (
            <div className="flex items-center gap-2 text-[#00f0ff] animate-pulse">
              <span>_</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-zinc-400">
            <span className="flex items-center gap-1.5 text-[#00f0ff]">
              <Cpu className="w-3.5 h-3.5 animate-spin" />
              Mounting modules & telemetry...
            </span>
            <span className="font-bold text-white">{progress}%</span>
          </div>
          <div className="w-full bg-zinc-900 border border-zinc-800 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00f0ff] via-emerald-400 to-[#00f0ff]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="border-t border-[#00f0ff]/20 pt-3 text-[11px] text-zinc-500 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-4">
          <span>SEC_STATE: ENFORCED</span>
          <span>LOCATION: Pantnagar, Uttarakhand, IN</span>
        </div>
        <div className="text-[#00f0ff]/80">
          Press <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-white text-[10px]">SPACE</kbd> or <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-white text-[10px]">ENTER</kbd> to skip
        </div>
      </div>
    </motion.div>
  );
};
