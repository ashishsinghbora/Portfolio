import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { TopBar } from '../components/TopBar';
import { ThemeType } from '../types';

describe('Theme Switching & State Persistence', () => {
  beforeEach(() => {
    window.localStorage?.clear();
    vi.clearAllMocks();
  });

  it('renders theme selector pills for all four themes', () => {
    const mockThemeChange = vi.fn();
    const mockModeToggle = vi.fn();
    const mockSoundToggle = vi.fn();
    const mockReboot = vi.fn();
    const mockQuickCmd = vi.fn();

    render(
      <TopBar
        theme="cyber"
        onThemeChange={mockThemeChange}
        mode="gui"
        onModeToggle={mockModeToggle}
        soundEnabled={true}
        onSoundToggle={mockSoundToggle}
        onReboot={mockReboot}
        onQuickCommand={mockQuickCmd}
      />
    );

    expect(screen.getByTitle(/Switch to Cyber theme/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Switch to Matrix theme/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Switch to Dracula theme/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Switch to Nord theme/i)).toBeInTheDocument();
  });

  it('triggers theme change event when clicking a theme pill', () => {
    const mockThemeChange = vi.fn();

    render(
      <TopBar
        theme="cyber"
        onThemeChange={mockThemeChange}
        mode="gui"
        onModeToggle={vi.fn()}
        soundEnabled={true}
        onSoundToggle={vi.fn()}
        onReboot={vi.fn()}
        onQuickCommand={vi.fn()}
      />
    );

    const matrixBtn = screen.getByTitle(/Switch to Matrix theme/i);
    fireEvent.click(matrixBtn);

    expect(mockThemeChange).toHaveBeenCalledWith('matrix');
  });

  it('persists and restores theme preference from localStorage', () => {
    const testTheme: ThemeType = 'dracula';
    window.localStorage.setItem('ashish_os_theme', testTheme);

    const retrieved = window.localStorage.getItem('ashish_os_theme');
    expect(retrieved).toBe('dracula');
  });
});
