import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { TerminalComponent } from '../components/Terminal';
import { getProjectByNameOrRef } from '../data/filesystem';

describe('CLI Command Parser & Terminal Engine', () => {
  const mockOnThemeChange = vi.fn();
  const mockOnOpenProject = vi.fn();
  const mockOnToggleMatrix = vi.fn();
  const mockOnToggleSound = vi.fn();
  const mockOnToggleMode = vi.fn();
  const mockOnReboot = vi.fn();

  const renderTerminal = () => {
    return render(
      <TerminalComponent
        theme="cyber"
        onThemeChange={mockOnThemeChange}
        onOpenProject={mockOnOpenProject}
        onToggleMatrix={mockOnToggleMatrix}
        onToggleSound={mockOnToggleSound}
        onToggleMode={mockOnToggleMode}
        onReboot={mockOnReboot}
        uptimeSeconds={1200}
      />
    );
  };

  it('renders initial TTY0 session banner and default directory table', () => {
    renderTerminal();
    expect(screen.getByText(/ASHISH_OS v1.0.0/i)).toBeInTheDocument();
    expect(screen.getByText(/pantnagar.node/i)).toBeInTheDocument();
    expect(screen.getByText(/DIRECTORY INDEX:/i)).toBeInTheDocument();
  });

  it('executes "whoami" and outputs identity and location', () => {
    renderTerminal();
    const input = screen.getByLabelText(/Terminal command input/i);

    fireEvent.change(input, { target: { value: 'whoami' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText(/USER IDENTITY: Ashish Singh Bora/i)).toBeInTheDocument();
    expect(screen.getByText(/LOCATION: Pantnagar, Udham Singh Nagar/i)).toBeInTheDocument();
  });

  it('executes "help" and displays command manual', () => {
    renderTerminal();
    const input = screen.getByLabelText(/Terminal command input/i);

    fireEvent.change(input, { target: { value: 'help' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText(/ASHISH_OS COMMAND MANUAL \(TTY0\):/i)).toBeInTheDocument();
  });

  it('executes "theme matrix" and triggers theme change callback', () => {
    renderTerminal();
    const input = screen.getByLabelText(/Terminal command input/i);

    fireEvent.change(input, { target: { value: 'theme matrix' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockOnThemeChange).toHaveBeenCalledWith('matrix');
    expect(screen.getByText(/Swapped active color palette to 'matrix'/i)).toBeInTheDocument();
  });

  it('executes "cat AI_AGENT_CORE.sys" and displays project summary card', () => {
    renderTerminal();
    const input = screen.getByLabelText(/Terminal command input/i);

    fireEvent.change(input, { target: { value: 'cat AI_AGENT_CORE.sys' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText(/LAUNCH DEEP CASE STUDY/i)).toBeInTheDocument();
  });

  it('executes "open AI_AGENT_CORE.sys" and dispatches modal open handler', () => {
    renderTerminal();
    const input = screen.getByLabelText(/Terminal command input/i);

    fireEvent.change(input, { target: { value: 'open AI_AGENT_CORE.sys' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockOnOpenProject).toHaveBeenCalled();
  });

  it('returns graceful fallback error for unknown commands', () => {
    renderTerminal();
    const input = screen.getByLabelText(/Terminal command input/i);

    fireEvent.change(input, { target: { value: 'invalid_cyber_command' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText(/zsh: command not found: invalid_cyber_command/i)).toBeInTheDocument();
  });

  it('handles "sudo" with playful security alert', () => {
    renderTerminal();
    const input = screen.getByLabelText(/Terminal command input/i);

    fireEvent.change(input, { target: { value: 'sudo rm -rf /' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText(/ashish is not in the sudoers file on node pantnagar.node/i)).toBeInTheDocument();
  });

  it('correctly maps project queries in filesystem resolver', () => {
    const p1 = getProjectByNameOrRef('AI_AGENT_CORE.sys');
    expect(p1?.id).toBe('ai-agent-core');

    const p2 = getProjectByNameOrRef('security-audit');
    expect(p2?.name).toBe('SECURITY_AUDIT.sec');

    const p3 = getProjectByNameOrRef('campus_portal_bot');
    expect(p3?.name).toBe('CAMPUS_PORTAL_BOT.app');
  });
});
