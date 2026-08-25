'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../types';
import { X, ExternalLink, Terminal, Cpu, CheckCircle, Shield, ArrowRight, Activity } from 'lucide-react';
import { GithubIcon } from './Icons';
import { sound } from '../utils/sound';
import { PhotographyViewer } from './PhotographyViewer';

interface Props {
  project: ProjectItem | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<Props> = ({ project, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playKey();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (project) {
      closeButtonRef.current?.focus();
    }
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/80 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        aria-describedby="case-study-description"
      >
        {/* Backdrop click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.playKey();
            onClose();
          }}
          className="fixed inset-0"
          aria-hidden="true"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-[#0c0e14] border border-[var(--border-color)] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col z-10 overflow-hidden font-mono"
        >
          {/* Modal Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800 bg-zinc-950/90 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <button
                  onClick={() => {
                    sound.playKey();
                    onClose();
                  }}
                  className="w-3.5 h-3.5 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors flex items-center justify-center text-black"
                  aria-label="Close modal window"
                />
                <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80" />
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs text-zinc-400 font-mono">
                CASE_STUDY_VIEWER // <span className="text-[var(--accent)] font-bold">{project.name}</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 hidden sm:inline">
                {project.permissions}
              </span>
              <button
                ref={closeButtonRef}
                onClick={() => {
                  sound.playKey();
                  onClose();
                }}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Close Case Study Modal [ESC]"
                title="Close [Esc]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Body Content (Scrollable) */}
          <div className="p-5 md:p-8 space-y-8 overflow-y-auto custom-scrollbar text-zinc-300 text-xs md:text-sm">
            {/* Title Section */}
            <div className="space-y-3 pb-6 border-b border-zinc-800/80">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[var(--accent)]/15 border border-[var(--accent)]/40 text-[var(--accent)]">
                  {project.category}
                </span>
                <span className="px-2 py-0.5 rounded text-xs bg-zinc-900 border border-zinc-700 text-amber-300 font-bold">
                  {project.size}
                </span>
                <span className="px-2 py-0.5 rounded text-xs bg-zinc-900 border border-zinc-700 text-zinc-400">
                  {project.year}
                </span>
                <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                  ● {project.status}
                </span>
              </div>

              <h1
                id="case-study-title"
                className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-sans tracking-tight"
              >
                {project.title}
              </h1>
              <p
                id="case-study-description"
                className="text-sm md:text-base text-zinc-400 font-sans leading-relaxed"
              >
                {project.description}
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>BENCHMARK METRICS & PERFORMANCE TELEMETRY</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border ${
                      metric.highlight
                        ? 'bg-[var(--accent)]/10 border-[var(--accent)]/40 shadow-[0_0_15px_var(--accent-glow)]'
                        : 'bg-zinc-950/70 border-zinc-800'
                    }`}
                  >
                    <div className="text-[11px] text-zinc-400 font-sans">{metric.label}</div>
                    <div
                      className={`text-lg sm:text-xl font-bold font-mono mt-1 ${
                        metric.highlight ? 'text-[var(--accent)]' : 'text-white'
                      }`}
                    >
                      {metric.value}
                    </div>
                    {metric.detail && (
                      <div className="text-[10px] text-zinc-500 mt-0.5">{metric.detail}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Photography Showcase if applicable */}
            {project.gallery && (
              <div className="space-y-3 pt-2">
                <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                  VISUAL EXIF ARCHIVE & SAMPLES
                </div>
                <PhotographyViewer photos={project.gallery} />
              </div>
            )}

            {/* Architecture Section */}
            <div className="space-y-3">
              <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>SYSTEM TOPOLOGY & EXECUTION PIPELINE</span>
              </div>
              <div className="p-4 bg-black/80 rounded-xl border border-zinc-800 overflow-x-auto shadow-inner">
                <pre className="text-[10px] sm:text-xs text-[var(--accent)] leading-snug font-mono select-all">
                  {project.architecture.asciiDiagram}
                </pre>
              </div>

              {/* Execution Flow Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                {project.architecture.flowDescription.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-zinc-950/60 rounded-lg border border-zinc-800/80 text-xs text-zinc-300 flex items-start gap-2"
                  >
                    <span className="text-[var(--accent)] font-bold shrink-0">➜</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Capabilities */}
            <div className="space-y-3">
              <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                ENGINEERING SPECIFICATIONS & HIGHLIGHTS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-zinc-950/80 rounded-lg border border-zinc-800 flex items-start gap-2.5"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-zinc-300 text-xs">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Tags */}
            <div className="space-y-3">
              <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                TECHNOLOGY STACK & INTEGRATIONS
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-zinc-900/90 border border-zinc-700/80 rounded-lg text-xs text-zinc-200 font-mono shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar / Links */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-zinc-800">
              <div className="flex flex-wrap items-center gap-3">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playExecute()}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-2 border border-zinc-700 cursor-pointer"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playExecute()}
                    className="px-4 py-2 bg-[var(--accent)] hover:opacity-90 text-black rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_var(--accent-glow)]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Deployment</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => {
                  sound.playKey();
                  onClose();
                }}
                className="px-4 py-2 text-zinc-400 hover:text-white text-xs transition-colors cursor-pointer"
              >
                Close Case Study [ESC]
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
