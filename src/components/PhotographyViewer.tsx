'use client';

import React, { useState } from 'react';
import { PhotoExif } from '../types';
import { Camera, Eye, Sliders, MapPin, Calendar, Layers, Info, ZoomIn } from 'lucide-react';
import { sound } from '../utils/sound';

interface Props {
  photos: PhotoExif[];
}

export const PhotographyViewer: React.FC<Props> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoExif>(photos[0]);
  const [showExifModal, setShowExifModal] = useState<boolean>(true);

  const handleSelect = (photo: PhotoExif) => {
    sound.playKey();
    setSelectedPhoto(photo);
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Gallery Selector / Thumbnails Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {photos.map((photo) => {
          const isSelected = photo.id === selectedPhoto.id;
          return (
            <button
              key={photo.id}
              onClick={() => handleSelect(photo)}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                isSelected
                  ? 'bg-[var(--accent)]/15 border-[var(--accent)] text-white shadow-[0_0_15px_var(--accent-glow)]'
                  : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-widest text-[var(--accent)]">
                  {photo.id.toUpperCase()}
                </span>
                <span className="text-[10px] text-zinc-500">{photo.year}</span>
              </div>
              <div className="font-bold text-xs truncate text-zinc-100">{photo.title}</div>
              <div className="text-[10px] text-zinc-500 truncate">{photo.location}</div>
            </button>
          );
        })}
      </div>

      {/* Main Viewport & EXIF Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-zinc-950/90 border border-zinc-800 rounded-xl p-4">
        {/* Visual Simulated Frame / High-Contrast Monochrome Representation */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-black border border-zinc-800 rounded-lg relative overflow-hidden group min-h-[280px]">
          {/* Film Grain Shader / Noise Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none opacity-40" />

          {/* Geometric Visual Artwork Placeholder representing monochrome capture */}
          <div className="w-full max-w-sm aspect-[16/10] bg-gradient-to-br from-zinc-900 via-black to-zinc-800 border border-zinc-700/60 rounded flex flex-col items-center justify-between p-4 relative shadow-2xl">
            <div className="w-full flex justify-between items-center text-[10px] text-zinc-500 font-mono">
              <span>RAW // 14-BIT DYNAMIC</span>
              <span>{selectedPhoto.aspectRatio}</span>
            </div>

            {/* Visual Abstract Subject */}
            <div className="relative flex flex-col items-center justify-center text-center my-auto">
              <div className="w-20 h-20 rounded-full border border-zinc-600 flex items-center justify-center relative mb-2">
                <div className="w-12 h-12 border-dashed border border-[var(--accent)] rounded-full animate-spin [animation-duration:12s]" />
                <Camera className="w-6 h-6 text-zinc-300 absolute" />
              </div>
              <span className="text-zinc-200 font-bold tracking-widest text-xs uppercase">
                {selectedPhoto.title}
              </span>
              <span className="text-zinc-500 text-[10px] max-w-[200px] mt-1">
                {selectedPhoto.subtitle}
              </span>
            </div>

            <div className="w-full flex justify-between items-center text-[9px] text-zinc-600 border-t border-zinc-800/80 pt-1.5 font-mono">
              <span>{selectedPhoto.camera}</span>
              <span>{selectedPhoto.lens}</span>
            </div>
          </div>

          <div className="mt-3 text-center text-zinc-400 text-xs italic">
            "{selectedPhoto.description}"
          </div>
        </div>

        {/* Real-time EXIF Telemetry Board */}
        <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <div className="flex items-center gap-1.5 text-zinc-300 font-bold">
                <Sliders className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>EXIF TELEMETRY DATA</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">PARSED OK</span>
            </div>

            {/* EXIF Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-black/60 rounded border border-zinc-800">
                <div className="text-[10px] text-zinc-500 uppercase">Aperture</div>
                <div className="text-sm font-bold text-white font-mono mt-0.5">
                  {selectedPhoto.aperture}
                </div>
              </div>
              <div className="p-2.5 bg-black/60 rounded border border-zinc-800">
                <div className="text-[10px] text-zinc-500 uppercase">Shutter Speed</div>
                <div className="text-sm font-bold text-[var(--accent)] font-mono mt-0.5">
                  {selectedPhoto.shutter}
                </div>
              </div>
              <div className="p-2.5 bg-black/60 rounded border border-zinc-800">
                <div className="text-[10px] text-zinc-500 uppercase">ISO Sensitivity</div>
                <div className="text-sm font-bold text-amber-300 font-mono mt-0.5">
                  {selectedPhoto.iso}
                </div>
              </div>
              <div className="p-2.5 bg-black/60 rounded border border-zinc-800">
                <div className="text-[10px] text-zinc-500 uppercase">Focal Length</div>
                <div className="text-sm font-bold text-zinc-200 font-mono mt-0.5">
                  {selectedPhoto.focalLength}
                </div>
              </div>
            </div>

            {/* Hardware & Location Specs */}
            <div className="space-y-1.5 p-3 bg-black/40 rounded border border-zinc-800 text-[11px]">
              <div className="flex justify-between">
                <span className="text-zinc-500">Camera Body:</span>
                <span className="text-zinc-200 font-bold">{selectedPhoto.camera}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Optical Lens:</span>
                <span className="text-zinc-200">{selectedPhoto.lens}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Geographic Loc:</span>
                <span className="text-zinc-300 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  {selectedPhoto.location}
                </span>
              </div>
            </div>
          </div>

          <div className="p-2.5 bg-zinc-900/60 rounded border border-zinc-800 text-[11px] text-zinc-400">
            <span className="font-bold text-zinc-300">Design Philosophy: </span>
            High-contrast monochrome captures emphasizing structural light, brutalist architectural planes, and mountain topography.
          </div>
        </div>
      </div>
    </div>
  );
};
