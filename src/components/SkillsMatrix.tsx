'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data/skills';
import { Bot, ShieldCheck, Globe, Cpu, Camera, CheckCircle } from 'lucide-react';
import { sound } from '../utils/sound';

const ICON_MAP: Record<string, React.ElementType> = {
  Bot,
  ShieldCheck,
  Globe,
  Cpu,
  Camera,
};

export const SkillsMatrix: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState<string>(SKILL_CATEGORIES[0].domain);

  const selectedCategory =
    SKILL_CATEGORIES.find((c) => c.domain === activeDomain) || SKILL_CATEGORIES[0];

  const handleSelectDomain = (domain: string) => {
    sound.playKey();
    setActiveDomain(domain);
  };

  return (
    <div className="my-4 p-4 md:p-5 bg-black/60 border border-[var(--border-color)] rounded-xl font-mono text-xs md:text-sm shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[var(--accent)]" />
          <span className="font-bold text-white text-sm">
            CORE DOMAINS & TECHNICAL CAPABILITY MATRIX
          </span>
        </div>
        <span className="text-[11px] text-zinc-400">
          Evaluated via production builds & engineering benchmarks
        </span>
      </div>

      {/* Domain Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 my-4">
        {SKILL_CATEGORIES.map((cat) => {
          const Icon = ICON_MAP[cat.icon] || Cpu;
          const isSelected = cat.domain === activeDomain;
          return (
            <button
              key={cat.domain}
              onClick={() => handleSelectDomain(cat.domain)}
              className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                isSelected
                  ? 'bg-[var(--accent)]/15 border-[var(--accent)] text-white shadow-[0_0_15px_var(--accent-glow)]'
                  : 'bg-zinc-950/70 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[var(--accent)]' : 'text-zinc-500'}`} />
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-black/40 text-emerald-400 border border-emerald-500/20">
                  {cat.overallScore}%
                </span>
              </div>
              <span className="text-[11px] font-medium line-clamp-1">{cat.domain}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Domain Breakdown */}
      <motion.div
        key={activeDomain}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="p-4 bg-zinc-950/80 rounded-lg border border-zinc-800/90 space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-zinc-800/60 pb-2">
          <div>
            <h4 className="text-white font-bold text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              {selectedCategory.domain}
            </h4>
            <p className="text-zinc-400 text-xs mt-0.5">{selectedCategory.description}</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-zinc-500">Domain Mastery</span>
            <div className="text-base font-bold text-emerald-400">{selectedCategory.overallScore}%</div>
          </div>
        </div>

        {/* Technologies Breakdown */}
        <div className="space-y-3">
          {selectedCategory.technologies.map((tech, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-300 font-medium">{tech.name}</span>
                  {tech.highlight && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-mono">
                      CORE SPEC
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-zinc-500 text-[11px]">{tech.experience}</span>
                  <span className="font-bold text-[var(--accent)] w-8 text-right font-mono">
                    {tech.level}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${tech.level}%` }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className={`h-full ${
                    tech.level >= 95
                      ? 'bg-gradient-to-r from-[var(--accent)] to-emerald-400'
                      : 'bg-[var(--accent)]'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
