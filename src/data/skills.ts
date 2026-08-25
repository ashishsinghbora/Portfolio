import { SkillCategory } from '../types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    domain: 'Machine Learning & AI Agents',
    icon: 'Bot',
    overallScore: 94,
    description: 'Autonomous multi-agent architectures, structured function calling, vector indexing, and edge quantization.',
    technologies: [
      { name: 'Autonomous Agent Frameworks (LangChain, LlamaIndex, Custom Core)', level: 95, experience: 'Production / R&D', highlight: true },
      { name: 'Tool Calling & Structured JSON-Schema Invocations', level: 96, experience: 'Advanced', highlight: true },
      { name: 'Vector Databases (pgvector, ChromaDB, Pinecone)', level: 92, experience: 'Production' },
      { name: 'PyTorch & ONNX Quantization (INT8/FP16)', level: 88, experience: 'Embedded / Edge' },
      { name: 'Computer Vision (YOLOv8/v9, OpenCV, TensorRT)', level: 89, experience: 'Real-Time Edge' },
    ],
  },
  {
    domain: 'Cybersecurity & Auditing',
    icon: 'ShieldCheck',
    overallScore: 91,
    description: 'Smart contract vulnerability scanning, AST traversal, symbolic execution, and network security.',
    technologies: [
      { name: 'Smart Contract Security (Solidity, EVM IR, Slither)', level: 93, experience: 'Auditing', highlight: true },
      { name: 'Symbolic Execution & Z3 SMT Constraint Solving', level: 86, experience: 'R&D', highlight: true },
      { name: 'Reentrancy & Flash-Loan Attack Modeling', level: 92, experience: 'Security Assessment' },
      { name: 'Network Protocol Auditing & Threat Analysis', level: 88, experience: 'Penetration Testing' },
      { name: 'Foundry / Hardhat Security Fuzzing', level: 90, experience: 'CI/CD Automated' },
    ],
  },
  {
    domain: 'Full-Stack Web Development',
    icon: 'Globe',
    overallScore: 95,
    description: 'High-performance React/Next.js architectures, modern TypeScript, resilient REST/GraphQL APIs, and WebSockets.',
    technologies: [
      { name: 'Next.js 16 (App Router, Server Actions, SSR/SSG)', level: 96, experience: 'Mastery', highlight: true },
      { name: 'TypeScript (Strict typing, Generic Metaprogramming)', level: 95, experience: 'Core' },
      { name: 'Tailwind CSS & Design Systems Engineering', level: 98, experience: 'Mastery', highlight: true },
      { name: 'FastAPI / Node.js / Python Backend Services', level: 92, experience: 'Production' },
      { name: 'State Management & Reactive Stores', level: 94, experience: 'Advanced' },
    ],
  },
  {
    domain: 'Systems Engineering & Cloud',
    icon: 'Cpu',
    overallScore: 90,
    description: 'Linux systems administration, headless browser automation, Docker containerization, and async queues.',
    technologies: [
      { name: 'Linux / POSIX Environments & Shell Scripting (Bash/Zsh)', level: 94, experience: 'Daily Driver', highlight: true },
      { name: 'Headless Browser Automation (Playwright, Puppeteer)', level: 95, experience: 'Production' },
      { name: 'Docker, Compose, & Multi-Stage Deployments', level: 90, experience: 'DevOps' },
      { name: 'Redis, Celery, & Distributed Worker Queues', level: 89, experience: 'Distributed Systems' },
      { name: 'Git & Open Source Workflow Mastery', level: 96, experience: 'Core' },
    ],
  },
  {
    domain: 'Interface Design & Photography',
    icon: 'Camera',
    overallScore: 92,
    description: 'Monochrome visual craft, dark-mode terminal UI/UX, typography hierarchy, and EXIF extraction.',
    technologies: [
      { name: 'Dark Mode UI/UX Architecture & Micro-Interactions', level: 97, experience: 'Specialist', highlight: true },
      { name: 'Framer Motion & WebGL / Canvas Shader FX', level: 91, experience: 'Advanced' },
      { name: 'Monochrome Street & Architectural Photography', level: 94, experience: 'Curated Work', highlight: true },
      { name: 'Figma & Design Systems Prototyping', level: 88, experience: 'Visual Design' },
      { name: 'Digital Image Signal Processing (EXIF / Sharp)', level: 90, experience: 'Telemetry' },
    ],
  },
];
