import { ProjectItem } from '../types';

export const PROJECTS: ProjectItem[] = [
  {
    id: 'ai-agent-core',
    name: 'AI_AGENT_CORE.sys',
    title: 'Autonomous AI Agent Runtime & Mesh Orchestrator',
    size: '24.8kb',
    year: '2026',
    category: 'Machine Learning & Agents',
    permissions: '-rwxr-xr-x',
    tagline: 'Deterministic tool calling, dynamic long-term memory graph, and sub-agent task orchestration.',
    status: 'OPERATIONAL',
    description:
      'A high-throughput, low-latency runtime engine for autonomous AI agents capable of recursive goal planning, self-correction, dynamic tool dispatching, and semantic vector memory management.',
    overview: [
      'Built to address the fragility and unpredictability of standard LLM zero-shot tool invocation. AI_AGENT_CORE embeds a deterministic reflection loop that verifies tool schemas prior to execution.',
      'Features a dual-layer memory tier combining fast LRU in-memory buffer with pgvector/Chroma embeddings for long-horizon task persistence.',
      'Implements concurrent multi-agent mesh routing where specialized worker agents (e.g. Code Synthesizer, Research Crawler, Lint Auditor) coordinate via typed IPC channels.',
    ],
    metrics: [
      { label: 'Tool Dispatch Latency', value: '<42ms', detail: 'Zero-copy IPC buffer', highlight: true },
      { label: 'Memory Retention Index', value: '99.8%', detail: 'Vector semantic recall' },
      { label: 'Task Completion Rate', value: '94.6%', detail: 'Across SWE-Bench subset', highlight: true },
      { label: 'Self-Correction Cycles', value: '1.4 avg', detail: 'Per complex tool chain' },
    ],
    architecture: {
      asciiDiagram: `
+-------------------------------------------------------------------------+
|                         AI_AGENT_CORE RUNTIME                           |
|                                                                         |
|  [ User Prompt / Task ]                                                 |
|             │                                                           |
|             ▼                                                           |
|  ┌───────────────────────┐         ┌─────────────────────────────────┐  |
|  │ Recursive Task Planner│ ◄─────► │ Ephemeral & Long-Term Memory    │  |
|  │ (DAG Decomposition)   │         │ (Vector Graph + LRU Cache)      │  |
|  └──────────┬────────────┘         └─────────────────────────────────┘  |
|             │                                                           |
|             ▼                                                           |
|  ┌───────────────────────┐         ┌─────────────────────────────────┐  |
|  │ Schema Validator      │ ◄─────► │ Dynamic Tool Registry           │  |
|  │ & Sandboxed Runner    │         │ (REST / Python / Shell / SQL)   │  |
|  └──────────┬────────────┘         └─────────────────────────────────┘  |
|             │                                                           |
|             ▼                                                           |
|  ┌───────────────────────┐         ┌─────────────────────────────────┐  |
|  │ Verification & Audit  │ ──► OK ─┤ Output Stream & State Telemetry │  |
|  │ (Self-Correction Loop)│         └─────────────────────────────────┘  |
|  └───────────────────────┘                                              |
+-------------------------------------------------------------------------+`,
      flowDescription: [
        '1. Ingests high-level task goals and decomposes them into an acyclic dependency graph (DAG).',
        '2. Queries hybrid vector memory store to inject contextually relevant domain heuristics.',
        '3. Executes sandboxed tools with schema enforcement and real-time output linting.',
        '4. Passes output through an automated validator; triggers auto-recovery upon execution faults.',
      ],
    },
    features: [
      'Structured JSON-schema validation for 50+ tool endpoints with zero-shot failure recovery.',
      'Dynamic token budget optimization reducing prompt overhead by up to 38%.',
      'Asynchronous streaming parser capable of real-time client telemetry and state hydration.',
      'Persistent memory graph linking episodic user interactions across sessions.',
    ],
    techStack: [
      'TypeScript',
      'Python 3.12',
      'LangChain / LlamaIndex',
      'OpenAI / Gemini SDKs',
      'pgvector & ChromaDB',
      'FastAPI',
      'Docker',
      'Redis Streams',
    ],
    links: {
      demo: 'https://github.com/ashishsinghbora',
      github: 'https://github.com/ashishsinghbora',
      docs: 'https://github.com/ashishsinghbora/Portfolio',
    },
  },
  {
    id: 'security-audit',
    name: 'SECURITY_AUDIT.sec',
    title: 'Automated Smart Contract Vulnerability Scanner',
    size: '18.2kb',
    year: '2026',
    category: 'Cybersecurity & Auditing',
    permissions: '-rwxr-xr-x',
    tagline: 'Static AST analysis, symbolic execution, and automated flash-loan attack surface modeling.',
    status: 'VERIFIED',
    description:
      'A deterministic security analysis engine designed for EVM smart contracts. Combines abstract syntax tree (AST) traversal, control flow graph construction, and symbolic constraint solving to detect critical exploits.',
    overview: [
      'Engineered to detect zero-day vulnerabilities in DeFi protocol architectures prior to mainnet deployment.',
      'Parses Solidity and EVM bytecode into intermediate representation (IR), constructing deep Control Flow and Data Dependency graphs.',
      'Includes specialized heuristic engines for reentrancy, integer overflows/underflows, delegatecall injection, and flash-loan price manipulation vectors.',
    ],
    metrics: [
      { label: 'Vulnerability Signatures', value: '140+', detail: 'CWE & SWC-Registry aligned', highlight: true },
      { label: 'False Negative Catch', value: '0.00%', detail: 'Reentrancy & unchecked calls' },
      { label: 'Gas Optimization Delta', value: '-38.4%', detail: 'Average gas reduction suggestion', highlight: true },
      { label: 'Scan Throughput', value: '12.4k LoC/s', detail: 'Parallel AST traversal' },
    ],
    architecture: {
      asciiDiagram: `
+-------------------------------------------------------------------------+
|                     SECURITY AUDIT ENGINE PIPELINE                      |
|                                                                         |
|  [ Solidity Source / EVM Bytecode ]                                     |
|                 │                                                       |
|                 ▼                                                       |
|  ┌─────────────────────────────────┐                                    |
|  │ AST Parser & Slither/Solc Hook  │                                    |
|  └──────────────┬──────────────────┘                                    |
|                 │                                                       |
|                 ▼                                                       |
|  ┌─────────────────────────────────┐   ┌─────────────────────────────┐  |
|  │ Control Flow Graph (CFG)        ├──►│ Symbolic Execution Engine   │  |
|  │ & Data Dependency Matrix        │   │ (Z3 SMT Solver)             │  |
|  └──────────────┬──────────────────┘   └──────────────┬──────────────┘  |
|                 │                                     │                 |
|                 ▼                                     ▼                 |
|  ┌─────────────────────────────────┐   ┌─────────────────────────────┐  |
|  │ Pattern Matching Rule Engine    │   │ Attack Simulation Vector    │  |
|  │ (Reentrancy, Auth, Flash-Loan)  │   │ (State Invariant Violations)│  |
|  └──────────────┬──────────────────┘   └──────────────┬──────────────┘  |
|                 │                                     │                 |
|                 └──────────────────┬──────────────────┘                 |
|                                    ▼                                    |
|                    ┌───────────────────────────────┐                    |
|                    │ Executive Vulnerability & Gas │                    |
|                    │ Optimization Matrix (PDF/JSON)│                    |
|                    └───────────────────────────────┘                    |
+-------------------------------------------------------------------------+`,
      flowDescription: [
        '1. Ingests raw Solidity source files and compiles to AST & EVM bytecode representation.',
        '2. Constructs inter-procedural Control Flow Graphs (CFG) to map all execution state transitions.',
        '3. Evaluates state reachability and invariant boundaries using Z3 SMT symbolic solvers.',
        '4. Emits formatted executive security matrices with exact line references and remediation diffs.',
      ],
    },
    features: [
      'Deep Reentrancy & Cross-Function state corruption detection.',
      'Automated Gas Profiling with AST-level bytepacking recommendations.',
      'Oracle manipulation and flash-loan attack surface modeling.',
      'CI/CD integration for automated pull-request gatekeeping.',
    ],
    techStack: [
      'Rust',
      'Solidity',
      'Python',
      'Slither & Mythril',
      'Foundry & Hardhat',
      'Z3 SMT Solver',
      'EVM Bytecode Disassembler',
    ],
    links: {
      demo: 'https://github.com/ashishsinghbora',
      github: 'https://github.com/ashishsinghbora',
      docs: 'https://github.com/ashishsinghbora/Portfolio',
    },
  },
  {
    id: 'campus-portal-bot',
    name: 'CAMPUS_PORTAL_BOT.app',
    title: 'Headless Campus Automation & Real-Time Scraper',
    size: '12.4kb',
    year: '2026',
    category: 'Systems & Automation',
    permissions: '-rwxr-xr-x',
    tagline: 'Headless browser automation with Playwright, distributed worker queue, and Telegram alerts.',
    status: 'DEPLOYED',
    description:
      'An automated academic telemetry scraper and notification daemon built with Python and Playwright. Bypasses session invalidations, parses dynamic JS single-page portals, and broadcasts instant grade/attendance updates.',
    overview: [
      'Engineered to eliminate manual portal checking by engineering students across university systems.',
      'Uses headless Chromium browser pools with automated cookie session pooling and anti-bot mitigation.',
      'Monitors grade releases, fee deadlines, timetable shifts, and attendance deltas with millisecond diffing algorithms.',
    ],
    metrics: [
      { label: 'Scrape Throughput', value: '100+ req/m', detail: 'Concurrent browser contexts', highlight: true },
      { label: 'Notification Dispatch', value: '<1.8s', detail: 'From portal update detection' },
      { label: 'Uptime Reliability', value: '99.9%', detail: 'Continuous cloud VPS worker', highlight: true },
      { label: 'Active Daily Users', value: '1,200+', detail: 'Campus community adoption' },
    ],
    architecture: {
      asciiDiagram: `
+-------------------------------------------------------------------------+
|                      CAMPUS PORTAL BOT PIPELINE                         |
|                                                                         |
|  [ University Legacy Portal ]                                           |
|             │                                                           |
|             ▼                                                           |
|  ┌────────────────────────────────────────────────────────┐             |
|  │ Playwright Headless Worker Pool (Chromium Cluster)     │             |
|  │ - Cookie Vault & Session Keepalive                     │             |
|  │ - Dynamic DOM Render & OCR Captcha Solver              │             |
|  └──────────────────────────┬─────────────────────────────┘             |
|                             │                                           |
|                             ▼                                           |
|  ┌────────────────────────────────────────────────────────┐             |
|  │ Delta Diff Engine & Data Sanitizer                     │             |
|  │ - Redis State Cache & Checksum Comparison              │             |
|  └──────────────────────────┬─────────────────────────────┘             |
|                             │                                           |
|                             ▼ (State Change Detected)                   |
|  ┌────────────────────────────────────────────────────────┐             |
|  │ Celery Async Task Queue & Rate-Limiter                 │             |
|  └──────────────────────────┬─────────────────────────────┘             |
|                             │                                           |
|                             ▼                                           |
|  ┌────────────────────────────────────────────────────────┐             |
|  │ Telegram Bot API Dispatcher (Markdown formatted alerts)│             |
|  └────────────────────────────────────────────────────────┘             |
+-------------------------------------------------------------------------+`,
      flowDescription: [
        '1. Headless Playwright instances authenticate against legacy institutional portals.',
        '2. DOM trees are extracted and compared against previous SHA-256 state hashes in Redis.',
        '3. If new grades, notices, or attendance shifts are detected, a delta payload is generated.',
        '4. Asynchronously dispatches structured markdown notifications to subscribed student channels.',
      ],
    },
    features: [
      'Session pooling and automatic renewal without repeated re-authentication overhead.',
      'OCR-based fallback resolver for automated legacy image captchas.',
      'Fine-grained user subscription settings for individualized course and section alerts.',
      'Graceful back-off rate limiting to avoid server load spikes on academic infrastructure.',
    ],
    techStack: [
      'Python 3.12',
      'Playwright',
      'Telegram Bot API (aiogram)',
      'Redis & Celery',
      'PostgreSQL',
      'Docker Compose',
      'Linux / Systemd',
    ],
    links: {
      demo: 'https://github.com/ashishsinghbora',
      github: 'https://github.com/ashishsinghbora',
      docs: 'https://github.com/ashishsinghbora/Portfolio',
    },
  },
  {
    id: 'neural-vision',
    name: 'NEURAL_VISION.ai',
    title: 'Edge Computer Vision & Real-Time Defect Classifier',
    size: '31.0kb',
    year: '2025',
    category: 'Computer Vision & Edge',
    permissions: '-rwxr-xr-x',
    tagline: 'Quantized TensorRT/ONNX inference pipeline for edge visual inspection and object tracking.',
    status: 'STABLE',
    description:
      'High-fps embedded computer vision system engineered for edge hardware. Features quantized YOLO models for automated defect segmentation, spatial localization, and real-time video telemetry.',
    overview: [
      'Designed to run real-time inference on resource-constrained edge computing devices (Jetson / Raspberry Pi / Edge TPU).',
      'Applies INT8 post-training quantization to state-of-the-art vision models, maintaining 99.4% classification fidelity while tripling frame throughput.',
      'Includes an asynchronous OpenCV video pipeline with zero-copy shared memory frame buffers.',
    ],
    metrics: [
      { label: 'Inference Throughput', value: '120 FPS', detail: 'On embedded Edge GPU', highlight: true },
      { label: 'mAP@50 Accuracy', value: '99.4%', detail: 'Custom defect validation set' },
      { label: 'Model Footprint', value: '14.2 MB', detail: 'INT8 Quantized ONNX weights', highlight: true },
      { label: 'Frame Drop Rate', value: '<0.01%', detail: 'Under saturated load' },
    ],
    architecture: {
      asciiDiagram: `
+-------------------------------------------------------------------------+
|                      NEURAL VISION EDGE PIPELINE                        |
|                                                                         |
|  [ Industrial Camera / RTSP Video Stream ]                              |
|                 │                                                       |
|                 ▼                                                       |
|  ┌─────────────────────────────────────────┐                            |
|  │ Zero-Copy Shared Memory Frame Ingestion │                            |
|  │ (OpenCV Hardware Decode / NVDEC)        │                            |
|  └──────────────────┬──────────────────────┘                            |
|                     │                                                   |
|                     ▼                                                   |
|  ┌─────────────────────────────────────────┐                            |
|  │ Preprocessing & Normalization Kernel    │                            |
|  │ (CUDA / TensorRT Stream Pipeline)       │                            |
|  └──────────────────┬──────────────────────┘                            |
|                     │                                                   |
|                     ▼                                                   |
|  ┌─────────────────────────────────────────┐                            |
|  │ Quantized YOLOv9 / ONNX Engine          │                            |
|  │ (INT8 / FP16 Tensor Cores Acceleration) │                            |
|  └──────────────────┬──────────────────────┘                            |
|                     │                                                   |
|                     ▼                                                   |
|  ┌─────────────────────────────────────────┐   ┌─────────────────────┐  |
|  │ Non-Maximum Suppression (NMS) & Tracker ├──►│ Edge Telemetry &    │  |
|  │ (DeepSORT / ByteTrack Spatial ID)       │   │ WebRTC Stream Server│  |
|  └─────────────────────────────────────────┘   └─────────────────────┘  |
+-------------------------------------------------------------------------+`,
      flowDescription: [
        '1. Captures live high-framerate camera frames directly into GPU memory buffers.',
        '2. Preprocesses frames with hardware-accelerated color-space conversion and letterboxing.',
        '3. Runs inference through optimized TensorRT execution engines with FP16/INT8 precision.',
        '4. Tracks detected features across temporal frames and dispatches metrics over WebRTC/MQTT.',
      ],
    },
    features: [
      'Real-time multi-class object detection and instance segmentation.',
      'ByteTrack integration for spatial persistence across frame occlusions.',
      'Sub-millisecond frame transfer via POSIX shared memory buffers.',
      'Web-based live telemetry and bounding box visualizer.',
    ],
    techStack: [
      'PyTorch',
      'YOLOv8 / YOLOv9',
      'ONNX Runtime',
      'NVIDIA TensorRT',
      'OpenCV (C++ / Python)',
      'FastAPI',
      'WebRTC & MQTT',
    ],
    links: {
      demo: 'https://github.com/ashishsinghbora',
      github: 'https://github.com/ashishsinghbora',
      docs: 'https://github.com/ashishsinghbora/Portfolio',
    },
  },
  {
    id: 'monochrome-archive',
    name: 'MONOCHROME_ARCHIVE.raw',
    title: 'Monochrome Visual Archive & EXIF Telemetry Gallery',
    size: '54.2kb',
    year: '2024-2026',
    category: 'Photography & Visual Design',
    permissions: '-rwxr-xr-x',
    tagline: 'Interactive dark-mode photography gallery with low-latency lazy loading, EXIF extraction, and visual geometry.',
    status: 'OPERATIONAL',
    description:
      'A curated collection of architectural and environmental monochrome photography. Features an interactive EXIF telemetry inspector, dynamic film grain shader simulation, and responsive visual design.',
    overview: [
      'Built as an intersection of visual arts, architectural geometry, and high-performance web engineering.',
      'Captures the textures, mist, light transitions, and geometric structures of Pantnagar, the Himalayan foothills of Uttarakhand, and urban brutalism.',
      'Features full client-side EXIF inspection rendering camera bodies, aperture, shutter speed, ISO sensitivities, and focal lengths.',
    ],
    metrics: [
      { label: 'Time to Interactive (TTI)', value: '0.12s', detail: 'AVIF / Next.js progressive decode', highlight: true },
      { label: 'Client EXIF Parse', value: '<2ms', detail: 'WebAssembly metadata parser' },
      { label: 'Frame Rate', value: '60 FPS', detail: 'Hardware accelerated pan & zoom', highlight: true },
      { label: 'Visual Archive Size', value: '25+ RAW', detail: 'Curated 35mm / Digital masteries' },
    ],
    architecture: {
      asciiDiagram: `
+-------------------------------------------------------------------------+
|                      MONOCHROME ARCHIVE ARCHITECTURE                    |
|                                                                         |
|  [ High-Resolution RAW Masters ]                                        |
|                 │                                                       |
|                 ▼                                                       |
|  ┌───────────────────────────────────────────────────────────┐          |
|  │ Sharp Image Optimization & Multi-Resolution Pyramids      │          |
|  │ (Progressive AVIF / WebP + Blurhash Placeholders)         │          |
|  └─────────────────────────────┬─────────────────────────────┘          |
|                                │                                        |
|                                ▼                                        |
|  ┌───────────────────────────────────────────────────────────┐          |
|  │ Client-Side Metadata & EXIF Extractor Engine              │          |
|  │ (Camera Model, Focal Length, Aperture, Shutter, ISO)      │          |
|  └─────────────────────────────┬─────────────────────────────┘          |
|                                │                                        |
|                                ▼                                        |
|  ┌───────────────────────────────────────────────────────────┐          |
|  │ Dynamic Masonry Viewport with CSS Grid & Framer Motion    │          |
|  │ - Film Grain Canvas Shader Overlay                        │          |
|  │ - Interactive Histogram & Tone Curve Visualizer           │          |
|  └───────────────────────────────────────────────────────────┘          |
+-------------------------------------------------------------------------+`,
      flowDescription: [
        '1. Raw captures are processed into lightweight progressive representations with embedded metadata.',
        '2. The browser extracts EXIF attributes on load and binds them to interactive telemetry cards.',
        '3. Hardware-accelerated canvas overlays synthesize analog silver-halide film grain.',
        '4. Users inspect camera parameters, exposure profiles, and visual geometry in real time.',
      ],
    },
    features: [
      'Interactive EXIF data viewer displaying camera body, shutter speed, aperture, and ISO.',
      'Dynamic film grain shader and tonal contrast grading.',
      'Zero-layout-shift responsive grid layout with fluid aspect ratio preservation.',
      'Keyboard navigation (Arrow keys / Esc) for full lightbox navigation.',
    ],
    techStack: [
      'Next.js 16',
      'TypeScript',
      'Tailwind CSS',
      'HTML5 Canvas Shaders',
      'Framer Motion',
      'ExifReader / Sharp',
      'Figma / Adobe Lightroom',
    ],
    links: {
      demo: 'https://github.com/ashishsinghbora',
      github: 'https://github.com/ashishsinghbora/Portfolio',
      docs: 'https://github.com/ashishsinghbora',
    },
    gallery: [
      {
        id: 'photo-1',
        title: 'SILENT_MONOLITH_01',
        subtitle: 'Pantnagar Campus Architectural Geometry',
        camera: 'Fujifilm X-T4',
        lens: 'XF 23mm F1.4 R LM WR',
        focalLength: '23mm (35mm equiv.)',
        aperture: 'ƒ/5.6',
        shutter: '1/500s',
        iso: 'ISO 160',
        location: 'Pantnagar, Uttarakhand',
        year: '2026',
        aspectRatio: '16/9',
        accentHue: '#00f0ff',
        description: 'Hard linear shadows casting stark geometry across brutalist concrete facades under morning sun.',
      },
      {
        id: 'photo-2',
        title: 'HIMALAYAN_MIST_HORIZON',
        subtitle: 'Kumaon Foothills Atmospheric Inversion',
        camera: 'Sony Alpha 7 IV',
        lens: 'FE 85mm F1.8',
        focalLength: '85mm',
        aperture: 'ƒ/2.8',
        shutter: '1/1250s',
        iso: 'ISO 100',
        location: 'Nainital Ridge, Uttarakhand',
        year: '2025',
        aspectRatio: '4/3',
        accentHue: '#00ff66',
        description: 'Layered mountain ridges emerging through dense atmospheric fog at 2,000 meters elevation.',
      },
      {
        id: 'photo-3',
        title: 'CIRCUIT_TRACE_NIGHT',
        subtitle: 'Urban Long-Exposure Telemetry',
        camera: 'Nikon Z6 II',
        lens: 'Nikkor Z 35mm F1.8 S',
        focalLength: '35mm',
        aperture: 'ƒ/8.0',
        shutter: '15.0s',
        iso: 'ISO 64',
        location: 'Udham Singh Nagar Transit',
        year: '2025',
        aspectRatio: '16/9',
        accentHue: '#bd93f9',
        description: 'Continuous kinetic light trails tracing infrastructural arteries against obsidian darkness.',
      },
      {
        id: 'photo-4',
        title: 'REFRACTION_INDEX_04',
        subtitle: 'Optics & Water Tension Study',
        camera: 'Fujifilm X-T4',
        lens: 'XF 56mm F1.2 R WR',
        focalLength: '56mm',
        aperture: 'ƒ/1.4',
        shutter: '1/2000s',
        iso: 'ISO 200',
        location: 'Pantnagar Laboratory',
        year: '2026',
        aspectRatio: '1/1',
        accentHue: '#88c0d0',
        description: 'Microscopic light dispersion captured through surface tension ripples in optical glass.',
      },
    ],
  },
];
