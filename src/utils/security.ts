/**
 * Security, Input Sanitization & Path Traversal Defense Engine for ASHISH_OS.
 */

// Explicit Whitelist of valid project identifiers and system filenames
export const VALID_PROJECT_IDENTIFIERS = new Set([
  'ai-agent-core',
  'ai_agent_core',
  'ai_agent_core.sys',
  'security-audit',
  'security_audit',
  'security_audit.sec',
  'campus-portal-bot',
  'campus_portal_bot',
  'campus_portal_bot.app',
  'neural-vision',
  'neural_vision',
  'neural_vision.ai',
  'monochrome-archive',
  'monochrome_archive',
  'monochrome_archive.raw',
]);

export const VALID_SYSTEM_FILES = new Set([
  'whoami.nfo',
  'skills.sys',
  'contact.sh',
  'system.conf',
]);

/**
 * Sanitize terminal input string.
 * Strips dangerous control characters, zero-width spaces, null bytes,
 * and limits input length to prevent denial-of-service / buffer exhaustion.
 */
export function sanitizeInput(rawInput: unknown): string {
  if (typeof rawInput !== 'string') {
    return '';
  }

  return rawInput
    // Remove null bytes and ASCII control characters (0x00 - 0x1F except newline/tab)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Remove zero-width spaces, joiners and directional override characters
    .replace(/[\u200B-\u200D\uFEFF\u202A-\u202E]/g, '')
    // Enforce reasonable length limit for CLI buffer (max 512 chars)
    .slice(0, 512)
    .trim();
}

export interface PathValidationResult {
  valid: boolean;
  normalizedTarget: string;
  error?: string;
}

/**
 * Validate and sanitize dynamic file targets.
 * Defends against:
 *  - Directory Traversal (`..`, `../`, `..\`, `....//`)
 *  - URL encoded traversal (`%2e%2e%2f`)
 *  - Absolute root escapes (`/etc/passwd`, `C:\Windows`)
 *  - Null byte poisoning (`file.txt\0.png`)
 *  - Object prototype pollution keys (`__proto__`, `constructor`)
 */
export function validateFileTarget(rawPath: string): PathValidationResult {
  const sanitized = sanitizeInput(rawPath);

  if (!sanitized) {
    return {
      valid: false,
      normalizedTarget: '',
      error: 'Error: Target file operand cannot be empty.',
    };
  }

  // Check for prototype pollution tokens
  if (['__proto__', 'constructor', 'prototype'].includes(sanitized.toLowerCase())) {
    return {
      valid: false,
      normalizedTarget: '',
      error: 'Security Warning: Forbidden object reference.',
    };
  }

  // Check for URI encoded traversal patterns
  const decoded = decodeURIComponent(sanitized).toLowerCase();

  // Pattern detection for directory traversal attempts
  const isTraversal =
    decoded.includes('..') ||
    decoded.includes('\\') ||
    decoded.includes('~') ||
    decoded.includes('\0') ||
    decoded.includes('%2e');

  if (isTraversal) {
    return {
      valid: false,
      normalizedTarget: '',
      error: `Access Denied: Path traversal detected in operand '${sanitized}'. Root escapes are prohibited.`,
    };
  }

  // Strip safe leading prefixes like /projects/, projects/, ./
  const cleanFilename = decoded
    .replace(/^(\.\/|\/projects\/|projects\/|\/)/, '')
    .trim();

  // If there are still slashes after stripping the allowed /projects/ prefix, it's an illegal sub-path
  if (cleanFilename.includes('/')) {
    return {
      valid: false,
      normalizedTarget: '',
      error: `Access Denied: Path traversal detected in operand '${sanitized}'. Subdirectory escapes are prohibited.`,
    };
  }

  // Check against explicit whitelist
  const isProjectMatch = VALID_PROJECT_IDENTIFIERS.has(cleanFilename);
  const isSystemFileMatch = VALID_SYSTEM_FILES.has(cleanFilename);

  if (!isProjectMatch && !isSystemFileMatch) {
    return {
      valid: false,
      normalizedTarget: cleanFilename,
      error: `File not found: '${sanitized}'. Use 'ls -la /projects/' to view valid filesystem entries.`,
    };
  }

  return {
    valid: true,
    normalizedTarget: cleanFilename,
  };
}

/**
 * Safe external URL validator.
 * Ensures URLs use valid protocols (https:, mailto:) and reject javascript: or data: URIs.
 */
export function isSafeUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const clean = url.trim().toLowerCase();
  if (clean.startsWith('https://') || clean.startsWith('mailto:')) {
    return true;
  }
  return false;
}
