'use client';

import React from 'react';
import { FileEntry, ProjectItem } from '../types';
import { getProjectsList, getProjectByNameOrRef } from '../data/filesystem';
import { Folder, FileCode, Shield, Bot, Cpu, Camera, ArrowUpRight, Eye } from 'lucide-react';
import { sound } from '../utils/sound';

interface Props {
  onOpenProject: (project: ProjectItem) => void;
}

const CATEGORY_ICON_MAP: Record<string, React.ElementType> = {
  'Machine Learning & Agents': Bot,
  'Cybersecurity & Auditing': Shield,
  'Systems & Automation': Cpu,
  'Computer Vision & Edge': Eye,
  'Photography & Visual Design': Camera,
};

export const ProjectDirectoryTable: React.FC<Props> = ({ onOpenProject }) => {
  const fileEntries = getProjectsList();

  const handleRowClick = (entry: FileEntry) => {
    sound.playModalOpen();
    if (entry.projectRef) {
      const proj = getProjectByNameOrRef(entry.projectRef);
      if (proj) {
        onOpenProject(proj);
      }
    }
  };

  return (
    <div className="my-3 overflow-hidden rounded-xl border border-[var(--border-color)] bg-black/60 shadow-2xl backdrop-blur-md font-mono text-xs">
      {/* Table Header / Directory info */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 bg-zinc-950/90 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Folder className="w-4 h-4 text-[var(--accent)]" />
          <span className="font-bold text-white tracking-wide">
            DIRECTORY INDEX: <span className="text-[var(--accent)]">/projects/</span>
          </span>
          <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-300">
            {fileEntries.length} items
          </span>
        </div>
        <span className="text-[11px] text-zinc-500 hidden sm:inline">
          Click any row or filename to trigger deep case study modal
        </span>
      </div>

      {/* Interactive Table View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800/80 bg-zinc-900/40 text-[11px] text-zinc-400">
              <th className="py-2.5 px-3 font-semibold">PERMS</th>
              <th className="py-2.5 px-3 font-semibold">SIZE</th>
              <th className="py-2.5 px-3 font-semibold">MODIFIED</th>
              <th className="py-2.5 px-3 font-semibold">TARGET NAME</th>
              <th className="py-2.5 px-3 font-semibold hidden md:table-cell">CATEGORY</th>
              <th className="py-2.5 px-3 font-semibold hidden lg:table-cell">DESCRIPTION</th>
              <th className="py-2.5 px-3 text-right font-semibold">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {fileEntries.map((file) => {
              const Icon = (file.category && CATEGORY_ICON_MAP[file.category]) || FileCode;

              return (
                <tr
                  key={file.name}
                  onClick={() => handleRowClick(file)}
                  className="group cursor-pointer hover:bg-[var(--accent)]/10 transition-colors duration-150"
                >
                  {/* Permissions */}
                  <td className="py-2.5 px-3 font-mono text-zinc-500 whitespace-nowrap">
                    {file.permissions}
                  </td>

                  {/* Size */}
                  <td className="py-2.5 px-3 font-mono text-amber-400/90 whitespace-nowrap font-medium">
                    {file.size}
                  </td>

                  {/* Modified */}
                  <td className="py-2.5 px-3 text-zinc-400 whitespace-nowrap text-[11px]">
                    {file.modified}
                  </td>

                  {/* Name with icon */}
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-2 font-bold text-zinc-100 group-hover:text-[var(--accent)] transition-colors">
                      <Icon className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                      <span>{file.name}</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-2.5 px-3 hidden md:table-cell whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-zinc-900 border border-zinc-700 text-zinc-300">
                      {file.category}
                    </span>
                  </td>

                  {/* Description */}
                  <td className="py-2.5 px-3 text-zinc-400 hidden lg:table-cell max-w-xs truncate text-[11px]">
                    {file.description}
                  </td>

                  {/* Action Button */}
                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(file);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[var(--accent)]/15 border border-[var(--accent)]/40 text-[var(--accent)] hover:bg-[var(--accent)]/30 text-[10px] font-bold tracking-wider transition-all shadow-[0_0_8px_var(--accent-glow)] cursor-pointer"
                    >
                      <span>INSPECT</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-2 border-t border-zinc-800 bg-zinc-950/60 text-[11px] text-zinc-500 flex justify-between items-center">
        <span>total 5 objects</span>
        <span className="font-mono text-zinc-400">
          CLI shortcut: <span className="text-[var(--accent)] font-bold">cat &lt;filename&gt;</span> or <span className="text-[var(--accent)] font-bold">open &lt;filename&gt;</span>
        </span>
      </div>
    </div>
  );
};
