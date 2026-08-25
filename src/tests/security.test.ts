import { describe, it, expect } from 'vitest';
import { sanitizeInput, validateFileTarget, isSafeUrl } from '../utils/security';

describe('Security & Input Sanitization Engine', () => {
  describe('sanitizeInput', () => {
    it('strips null bytes and control characters', () => {
      const malicious = 'cat file.txt\x00; rm -rf /';
      const clean = sanitizeInput(malicious);
      expect(clean).not.toContain('\x00');
      expect(clean).toBe('cat file.txt; rm -rf /');
    });

    it('strips zero-width characters and directional overrides', () => {
      const spoofed = 'whoami\u200B\u200C\u202E';
      const clean = sanitizeInput(spoofed);
      expect(clean).toBe('whoami');
    });

    it('safely handles non-string inputs without throwing', () => {
      expect(sanitizeInput(null)).toBe('');
      expect(sanitizeInput(undefined)).toBe('');
      expect(sanitizeInput(12345)).toBe('');
      expect(sanitizeInput({})).toBe('');
    });

    it('enforces maximum buffer length bounds (max 512 chars)', () => {
      const oversized = 'a'.repeat(1000);
      const clean = sanitizeInput(oversized);
      expect(clean.length).toBe(512);
    });
  });

  describe('validateFileTarget (Path Traversal & Whitelist Defense)', () => {
    it('blocks directory traversal attempts with relative dots', () => {
      const attempts = [
        '../../etc/passwd',
        '..\\..\\windows\\system32',
        'projects/../../secret.txt',
        '....//....//etc',
      ];

      attempts.forEach((path) => {
        const res = validateFileTarget(path);
        expect(res.valid).toBe(false);
        expect(res.error).toMatch(/Access Denied|Path traversal/i);
      });
    });

    it('blocks URL-encoded traversal patterns (%2e%2e%2f)', () => {
      const encoded = '%2e%2e%2f%2e%2e%2fetc%2fshadow';
      const res = validateFileTarget(encoded);
      expect(res.valid).toBe(false);
    });

    it('rejects prototype pollution attempts', () => {
      expect(validateFileTarget('__proto__').valid).toBe(false);
      expect(validateFileTarget('constructor').valid).toBe(false);
      expect(validateFileTarget('prototype').valid).toBe(false);
    });

    it('authorizes whitelisted project files', () => {
      const validFiles = [
        'AI_AGENT_CORE.sys',
        'SECURITY_AUDIT.sec',
        'CAMPUS_PORTAL_BOT.app',
        'NEURAL_VISION.ai',
        'MONOCHROME_ARCHIVE.raw',
        '/projects/AI_AGENT_CORE.sys',
        'projects/SECURITY_AUDIT.sec',
      ];

      validFiles.forEach((file) => {
        const res = validateFileTarget(file);
        expect(res.valid).toBe(true);
      });
    });

    it('authorizes whitelisted system files', () => {
      const validSystem = ['whoami.nfo', 'skills.sys', 'contact.sh', 'system.conf'];

      validSystem.forEach((file) => {
        const res = validateFileTarget(file);
        expect(res.valid).toBe(true);
      });
    });

    it('rejects non-whitelisted arbitrary file lookups', () => {
      const res = validateFileTarget('unauthorized_exploit.exe');
      expect(res.valid).toBe(false);
      expect(res.error).toContain('File not found');
    });
  });

  describe('isSafeUrl (Safe Outbound Link Defense)', () => {
    it('accepts valid HTTPS and mailto URLs', () => {
      expect(isSafeUrl('https://github.com/ashishsinghbora')).toBe(true);
      expect(isSafeUrl('mailto:mr.ashishsinghbora@gmail.com')).toBe(true);
    });

    it('rejects dangerous protocols (javascript:, data:, file:)', () => {
      expect(isSafeUrl('javascript:alert(1)')).toBe(false);
      expect(isSafeUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
      expect(isSafeUrl('file:///etc/passwd')).toBe(false);
      expect(isSafeUrl('')).toBe(false);
    });
  });
});
