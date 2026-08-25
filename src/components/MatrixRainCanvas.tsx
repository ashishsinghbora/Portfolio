'use client';

import React, { useEffect, useRef } from 'react';
import { ThemeType } from '../types';

interface Props {
  active: boolean;
  theme: ThemeType;
}

export const MatrixRainCanvas: React.FC<Props> = ({ active, theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const characters = '01ASHISHBORA_OSx86_64PANTNAGARCYBERAUDITAIAGENTλµπ$#%@*!><{}[]';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));

    // Determine color palette based on theme
    const getThemeColors = () => {
      switch (theme) {
        case 'matrix':
          return { head: '#ffffff', body: '#00ff66', glow: '#003b14' };
        case 'dracula':
          return { head: '#50fa7b', body: '#bd93f9', glow: '#6272a4' };
        case 'nord':
          return { head: '#eceff4', body: '#88c0d0', glow: '#4c566a' };
        case 'cyber':
        default:
          return { head: '#ffffff', body: '#00f0ff', glow: '#0a3641' };
      }
    };

    const colors = getThemeColors();

    const draw = () => {
      // Semi-transparent background for trailing effect
      ctx.fillStyle = 'rgba(8, 9, 13, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head character is bright
        if (Math.random() > 0.9) {
          ctx.fillStyle = colors.head;
          ctx.shadowBlur = 8;
          ctx.shadowColor = colors.body;
        } else {
          ctx.fillStyle = colors.body;
          ctx.shadowBlur = 2;
          ctx.shadowColor = colors.glow;
        }

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active, theme]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};
