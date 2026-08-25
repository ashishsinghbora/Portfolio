export type ThemeType = 'cyber' | 'matrix' | 'dracula' | 'nord';

export type SystemMode = 'terminal' | 'gui';

export interface MetricItem {
  label: string;
  value: string;
  detail?: string;
  highlight?: boolean;
}

export interface PhotoExif {
  id: string;
  title: string;
  subtitle: string;
  camera: string;
  lens: string;
  focalLength: string;
  aperture: string;
  shutter: string;
  iso: string;
  location: string;
  year: string;
  aspectRatio: string;
  accentHue: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  name: string; // e.g. 'AI_AGENT_CORE.sys'
  title: string;
  size: string; // e.g. '24.8kb'
  year: string; // e.g. '2026'
  category: 'Machine Learning & Agents' | 'Cybersecurity & Auditing' | 'Systems & Automation' | 'Computer Vision & Edge' | 'Photography & Visual Design';
  permissions: string; // e.g. '-rwxr-xr-x'
  tagline: string;
  status: 'DEPLOYED' | 'OPERATIONAL' | 'VERIFIED' | 'STABLE' | 'ARCHIVED';
  description: string;
  overview: string[];
  metrics: MetricItem[];
  architecture: {
    asciiDiagram: string;
    flowDescription: string[];
  };
  features: string[];
  techStack: string[];
  links: {
    demo?: string;
    github?: string;
    docs?: string;
  };
  gallery?: PhotoExif[];
}

export interface FileEntry {
  name: string;
  type: 'file' | 'dir' | 'executable' | 'symlink';
  size: string;
  modified: string;
  permissions: string;
  owner: string;
  group: string;
  category?: string;
  description?: string;
  content?: string;
  projectRef?: string;
  children?: Record<string, FileEntry>;
}

export interface CommandContext {
  cwd: string;
  history: string[];
  theme: ThemeType;
  setTheme: (t: ThemeType) => void;
  openProject: (projectId: string) => void;
  toggleMode: () => void;
  toggleMatrix: () => void;
  toggleSound: () => void;
  clearTerminal: () => void;
  rebootSystem: () => void;
}

export interface TerminalOutputItem {
  id: string;
  type:
    | 'input'
    | 'output'
    | 'error'
    | 'success'
    | 'system'
    | 'banner'
    | 'neofetch'
    | 'table'
    | 'skills'
    | 'contact'
    | 'cat_project';
  command?: string;
  content?: string;
  timestamp: string;
  projectData?: ProjectItem;
  tableData?: FileEntry[];
}

export interface SkillCategory {
  domain: string;
  icon: string;
  overallScore: number;
  description: string;
  technologies: Array<{
    name: string;
    level: number; // 0 - 100
    experience: string;
    highlight?: boolean;
  }>;
}

export interface SystemTelemetry {
  osName: string;
  version: string;
  node: string;
  location: string;
  kernel: string;
  uptime: number; // in seconds
  cpuLoad: number; // percentage
  memoryUsage: string;
  latencyMs: number;
  status: 'ONLINE' | 'STANDBY' | 'DEGRADED';
}
