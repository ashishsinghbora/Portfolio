import { FileEntry } from '../types';
import { PROJECTS } from './projects';

export const VIRTUAL_FILESYSTEM: Record<string, FileEntry> = {
  '/': {
    name: '/',
    type: 'dir',
    size: '4.0kb',
    modified: '2026-08-26 01:30',
    permissions: 'drwxr-xr-x',
    owner: 'ashish',
    group: 'staff',
    children: {
      'projects': {
        name: 'projects',
        type: 'dir',
        size: '4.0kb',
        modified: '2026-08-26 01:28',
        permissions: 'drwxr-xr-x',
        owner: 'ashish',
        group: 'staff',
        description: 'Pre-loaded software architecture case studies and systems',
        children: {
          'AI_AGENT_CORE.sys': {
            name: 'AI_AGENT_CORE.sys',
            type: 'executable',
            size: '24.8kb',
            modified: '2026-08-26 01:10',
            permissions: '-rwxr-xr-x',
            owner: 'ashish',
            group: 'staff',
            category: 'Machine Learning & Agents',
            description: 'Autonomous AI Agent runtime featuring structured tool calling, dynamic memory stores, and API orchestration.',
            projectRef: 'ai-agent-core',
          },
          'SECURITY_AUDIT.sec': {
            name: 'SECURITY_AUDIT.sec',
            type: 'executable',
            size: '18.2kb',
            modified: '2026-08-26 00:45',
            permissions: '-rwxr-xr-x',
            owner: 'ashish',
            group: 'staff',
            category: 'Cybersecurity & Auditing',
            description: 'Automated smart contract vulnerability scanner and security assessment engine for decentralized protocols.',
            projectRef: 'security-audit',
          },
          'CAMPUS_PORTAL_BOT.app': {
            name: 'CAMPUS_PORTAL_BOT.app',
            type: 'executable',
            size: '12.4kb',
            modified: '2026-08-25 22:15',
            permissions: '-rwxr-xr-x',
            owner: 'ashish',
            group: 'staff',
            category: 'Systems & Automation',
            description: 'Headless browser-automated Telegram bot built with Playwright and Python for real-time academic scraping.',
            projectRef: 'campus-portal-bot',
          },
          'NEURAL_VISION.ai': {
            name: 'NEURAL_VISION.ai',
            type: 'executable',
            size: '31.0kb',
            modified: '2025-12-14 18:30',
            permissions: '-rwxr-xr-x',
            owner: 'ashish',
            group: 'staff',
            category: 'Computer Vision & Edge',
            description: 'Computer vision pipeline for visual inspection, edge intelligence, and object classification.',
            projectRef: 'neural-vision',
          },
          'MONOCHROME_ARCHIVE.raw': {
            name: 'MONOCHROME_ARCHIVE.raw',
            type: 'file',
            size: '54.2kb',
            modified: '2026-08-26 01:15',
            permissions: '-rwxr-xr-x',
            owner: 'ashish',
            group: 'staff',
            category: 'Photography & Visual Design',
            description: 'Interactive photography gallery featuring low-latency image lazy-loading, EXIF data viewer, and visual design layout.',
            projectRef: 'monochrome-archive',
          },
        },
      },
      'whoami.nfo': {
        name: 'whoami.nfo',
        type: 'file',
        size: '1.2kb',
        modified: '2026-08-26 01:00',
        permissions: '-rw-r--r--',
        owner: 'ashish',
        group: 'staff',
        description: 'Developer identity credentials and bio',
        content: `
================================================================================
IDENTITY: Ashish Singh Bora
ORIGIN: Pantnagar, Udham Singh Nagar, Uttarakhand, India
NODE: pantnagar.node (TTY0)
DEGREE: B.Tech in Computer Science & Engineering, Uttarakhand Technical University
FOCUS: Cybersecurity & Auditing, Autonomous AI Agents, Systems Engineering, Web Craft
STATUS: Open for collaborations & engineering roles
EMAIL: mr.ashishsinghbora@gmail.com
GITHUB: https://github.com/ashishsinghbora
================================================================================
"I combine rigorous systems thinking, cybersecurity fundamentals, and modern
interface architecture to build resilient software and autonomous agents."
`,
      },
      'skills.sys': {
        name: 'skills.sys',
        type: 'file',
        size: '3.6kb',
        modified: '2026-08-26 00:30',
        permissions: '-rw-r--r--',
        owner: 'ashish',
        group: 'staff',
        description: 'System capability matrix and domain competencies',
        content: 'Run `skills` or `cat skills.sys` to display full visual breakdown.',
      },
      'contact.sh': {
        name: 'contact.sh',
        type: 'executable',
        size: '0.8kb',
        modified: '2026-08-26 00:15',
        permissions: '-rwxr-xr-x',
        owner: 'ashish',
        group: 'staff',
        description: 'Contact dispatcher script',
        content: `#!/bin/bash
# Contact Channel: Ashish Singh Bora
echo "Initiating handshake with pantnagar.node..."
echo "Primary Email: mr.ashishsinghbora@gmail.com"
echo "GitHub: https://github.com/ashishsinghbora"
echo "Portfolio: https://github.com/ashishsinghbora/Portfolio"
echo "Location: Pantnagar, Uttarakhand, India"
`,
      },
      'system.conf': {
        name: 'system.conf',
        type: 'file',
        size: '1.1kb',
        modified: '2026-08-26 00:01',
        permissions: '-rw-r--r--',
        owner: 'root',
        group: 'root',
        description: 'ASHISH_OS kernel and display configuration',
        content: `
[KERNEL]
NAME=ASHISH_OS
VERSION=1.0.0-RELEASE
ARCHITECTURE=x86_64_pantnagar
NODE=pantnagar.node

[DISPLAY]
THEME=cyber
PALETTES=cyber,matrix,dracula,nord
AUDIO_SYNTH=ENABLED
SCANLINES=ENABLED
FPS_CAP=60
`,
      },
    },
  },
};

export const getProjectsList = (): FileEntry[] => {
  const projectsDir = VIRTUAL_FILESYSTEM['/']?.children?.['projects']?.children;
  if (!projectsDir) return [];
  return Object.values(projectsDir);
};

export const getProjectByNameOrRef = (query: string) => {
  const clean = query.trim().toLowerCase();
  return PROJECTS.find(
    (p) =>
      p.name.toLowerCase() === clean ||
      p.id.toLowerCase() === clean ||
      p.name.toLowerCase().replace(/\.[^/.]+$/, '') === clean
  );
};
