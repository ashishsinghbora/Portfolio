import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { TerminalComponent } from '../components/Terminal';

describe('Terminal Arrow Key Command History Navigation', () => {
  const mockFn = vi.fn();

  const renderTerminal = () => {
    return render(
      <TerminalComponent
        theme="cyber"
        onThemeChange={mockFn}
        onOpenProject={mockFn}
        onToggleMatrix={mockFn}
        onToggleSound={mockFn}
        onToggleMode={mockFn}
        onReboot={mockFn}
        uptimeSeconds={100}
      />
    );
  };

  it('traverses command history sequentially using ArrowUp and ArrowDown', () => {
    renderTerminal();
    const input = screen.getByLabelText(/Terminal command input/i) as HTMLInputElement;

    // Send 3 distinct commands
    const commands = ['whoami', 'skills', 'fetch'];
    commands.forEach((cmd) => {
      fireEvent.change(input, { target: { value: cmd } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    });

    expect(input.value).toBe('');

    // Press ArrowUp: Should retrieve last command ('fetch')
    fireEvent.keyDown(input, { key: 'ArrowUp', code: 'ArrowUp' });
    expect(input.value).toBe('fetch');

    // Press ArrowUp again: Should retrieve 2nd command ('skills')
    fireEvent.keyDown(input, { key: 'ArrowUp', code: 'ArrowUp' });
    expect(input.value).toBe('skills');

    // Press ArrowUp again: Should retrieve 1st command ('whoami')
    fireEvent.keyDown(input, { key: 'ArrowUp', code: 'ArrowUp' });
    expect(input.value).toBe('whoami');

    // Press ArrowUp at start of history: should remain at 'whoami' (no negative overflow)
    fireEvent.keyDown(input, { key: 'ArrowUp', code: 'ArrowUp' });
    expect(input.value).toBe('whoami');

    // Press ArrowDown: should move back forward to 'skills'
    fireEvent.keyDown(input, { key: 'ArrowDown', code: 'ArrowDown' });
    expect(input.value).toBe('skills');

    // Press ArrowDown: should move forward to 'fetch'
    fireEvent.keyDown(input, { key: 'ArrowDown', code: 'ArrowDown' });
    expect(input.value).toBe('fetch');

    // Press ArrowDown past latest history: should clear to empty buffer
    fireEvent.keyDown(input, { key: 'ArrowDown', code: 'ArrowDown' });
    expect(input.value).toBe('');
  });

  it('handles tab auto-completion when typing prefix', () => {
    renderTerminal();
    const input = screen.getByLabelText(/Terminal command input/i) as HTMLInputElement;

    // Type prefix 'who'
    fireEvent.change(input, { target: { value: 'who' } });
    fireEvent.keyDown(input, { key: 'Tab', code: 'Tab' });

    // Should autocomplete to 'whoami '
    expect(input.value).toBe('whoami ');
  });
});
