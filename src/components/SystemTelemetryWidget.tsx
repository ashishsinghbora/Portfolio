'use client';

import React from 'react';
import { Cpu, HardDrive, Wifi, Shield, Activity, MapPin } from 'lucide-react';

interface Props {
  uptimeSeconds: number;
}

export const SystemTelemetryWidget: React.FC<Props> = ({ uptimeSeconds }) => {
  const formatUptime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  return (
    <div className="p-4 bg-black/60 border border-[var(--border-color)] rounded-xl font-mono text-xs shadow-xl backdrop-blur-md space-y-3.5">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[var(--accent)]" />
          <span className="font-bold text-white text-xs">NODE TELEMETRY</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
          SYNCHRONIZED
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-zinc-500" />
            Core Load:
          </span>
          <span className="text-[var(--accent)] font-bold">14.2% [4.8 GHz]</span>
        </div>

        <div className="flex justify-between items-center text-zinc-400">
          <span className="flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-zinc-500" />
            RAM Buffer:
          </span>
          <span className="text-zinc-200">1420 MiB / 64 GB</span>
        </div>

        <div className="flex justify-between items-center text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5 text-zinc-500" />
            Link Latency:
          </span>
          <span className="text-emerald-400 font-bold">8.4 ms (Fiber)</span>
        </div>

        <div className="flex justify-between items-center text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-zinc-500" />
            Security Mode:
          </span>
          <span className="text-amber-300">STRICT AST_AUDIT</span>
        </div>
      </div>

      <div className="pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-500 flex items-center justify-between">
        <span>Uptime: {formatUptime(uptimeSeconds)}</span>
        <span className="text-zinc-400">pantnagar.node</span>
      </div>
    </div>
  );
};
