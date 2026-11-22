import type { IconType } from "react-icons";
import {
  FaBalanceScale,
  FaBookOpen,
  FaCalendarAlt,
  FaCheckDouble,
  FaNetworkWired,
  FaServer,
  FaUserNurse,
  FaClipboardList,
  FaCloud,
  FaFilePdf,
  FaFileWord,
  FaKey,
  FaPlane,
  FaSitemap,
  FaStream,
  FaUserCheck,
  FaUserSecret,
  FaBrain,
  FaChartLine,
  FaCogs,
  FaCube,
  FaDatabase,
  FaHeartbeat,
  FaJava,
  FaLightbulb,
  FaMagic,
  FaProjectDiagram,
  FaRobot,
  FaSearch,
  FaShieldAlt,
  FaSyncAlt,
  FaTools,
  FaUserShield,
} from "react-icons/fa";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import {
  RxGithubLogo,
  RxLinkedinLogo,
  RxTwitterLogo,
  RxInstagramLogo,
} from "react-icons/rx";
import {
  SiAnthropic,
  SiFastapi,
  SiFlask,
  SiGithub,
  SiGithubcopilot,
  SiChartdotjs,
  SiConsul,
  SiGooglegemini,
  SiJenkins,
  SiJsonwebtokens,
  SiJunit5,
  SiMariadb,
  SiMysql,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiSpring,
  SiSpringboot,
  SiSpringsecurity,
  SiSqlalchemy,
  SiSqlite,
  SiTailwindcss,
  SiTestinglibrary,
  SiThreedotjs,
  SiTypescript,
  SiVite,
} from "react-icons/si";

/**
 * ─────────────────────────────────────────────────────────────
 *  YOUR DETAILS — edit here and the whole site updates.
 *  Any link/email left as "" is hidden (no dead icons).
 * ─────────────────────────────────────────────────────────────
 */
export const PROFILE = {
  name: "Sai Theja Papisetty",
  firstName: "Sai Theja",
  role: "Agentic AI Engineer",
  company: "Infosys",
  team: "Exponential Team",
  tagline:
    "Exploring how autonomous AI agents and humans can build software together.",
  about: [
    "I'm an Agentic AI Engineer at Infosys, part of the Exponential Team, focused on exploring and advancing the next generation of AI-driven software engineering. I'm passionate about understanding how AI is transforming the software development lifecycle and how autonomous AI agents can be effectively integrated into real-world engineering workflows.",
    "My interests extend beyond AI-assisted coding to the broader ecosystem of Agentic Engineering, particularly Harness Engineering and Context Engineering. I believe building effective AI systems is not just about choosing powerful models, but also about designing the right environment around them through well-structured instructions, context, tools, skills, agents, workflows, and guardrails.",
    "I'm particularly interested in designing reliable agentic workflows, orchestrating multiple AI agents, establishing effective engineering harnesses, and providing the right context to enable AI systems to work efficiently and consistently.",
    "My foundation was built at Infosys, where I was trained as an AI-Augmented Full Stack Developer. There I built UnitedAir AI — a grounded, Agentic RAG assistant on Spring AI, Azure OpenAI and a MariaDB vector store, secured with JWT, four-layer RBAC and PII redaction — which is where my interest in reliable, governed agentic systems took shape.",
  ],
  highlights: [
    {
      label: "Today",
      value: "Agentic AI Engineer",
      detail: "Infosys · Exponential Team",
    },
    {
      label: "Trained as",
      value: "AI-Augmented Full Stack Developer",
      detail: "Infosys",
    },
    {
      label: "Focus",
      value: "Agentic, Harness & Context Engineering",
      detail: "Reliable, governed AI systems",
    },
  ],
  closing:
    "The future of software engineering goes beyond writing code faster — it's about reimagining how software is built, with humans and intelligent AI agents working together.",
  email: "saithejapapisetty@gmail.com",
  phone: "+916305047408",
  phoneDisplay: "+91 63050 47408",
  github: "", // e.g. "https://github.com/your-username"
  linkedin: "", // e.g. "https://linkedin.com/in/your-handle"
  twitter: "",
  instagram: "",
} as const;

/** Ready-made contact links built from PROFILE. */
export const CONTACT = {
  /** Click-to-call. */
  phoneHref: `tel:${PROFILE.phone}`,
  /** Opens a Gmail compose window addressed to me (works for any Gmail user). */
  gmailUrl: `https://mail.google.com/mail/?view=cm&fs=1&to=${PROFILE.email}&su=${encodeURIComponent(
    "Hello Sai Theja — I found your portfolio"
  )}&body=${encodeURIComponent("Hi Sai Theja,\n\n")}`,
  /** Fallback for people who use a desktop/phone mail app instead of Gmail. */
  mailtoHref: `mailto:${PROFILE.email}`,
} as const;

export const FOCUS_AREAS = [
  {
    title: "Agentic Engineering",
    description:
      "Designing reliable agentic workflows and orchestrating multiple AI agents across the software development lifecycle.",
    icon: FaRobot,
  },
  {
    title: "Harness Engineering",
    description:
      "Building the environment around the model: tools, skills, agents, workflows and guardrails that keep AI consistent.",
    icon: FaShieldAlt,
  },
  {
    title: "Context Engineering",
    description:
      "Giving AI systems well-structured instructions and the right context so they work efficiently and consistently.",
    icon: FaBrain,
  },
] as const;

type Skill = { name: string; icon: IconType };

export const SKILL_GROUPS: ReadonlyArray<{
  title: string;
  skills: ReadonlyArray<Skill>;
}> = [
  {
    title: "Agentic AI & Engineering",
    skills: [
      { name: "Agentic Engineering", icon: FaRobot },
      { name: "Harness Engineering", icon: FaShieldAlt },
      { name: "Context Engineering", icon: FaBrain },
      { name: "Multi-Agent Orchestration", icon: FaProjectDiagram },
      { name: "Agentic Design Patterns", icon: FaSitemap },
      { name: "Human-in-the-Loop (HITL)", icon: FaUserCheck },
    ],
  },
  {
    title: "GenAI & RAG",
    skills: [
      { name: "Agentic RAG", icon: FaCogs },
      { name: "Spring AI", icon: SiSpring },
      { name: "Azure OpenAI", icon: FaCloud },
      { name: "Vector Search (MariaDB)", icon: SiMariadb },
      { name: "Grounded Answers & Citations", icon: FaClipboardList },
      { name: "Document Ingestion (PDF/DOCX)", icon: FaFilePdf },
    ],
  },
  {
    title: "AI Dev Tools",
    skills: [
      { name: "Devin", icon: FaRobot },
      { name: "Claude Code", icon: SiAnthropic },
      { name: "GitHub Copilot", icon: SiGithubcopilot },
    ],
  },
  {
    title: "Backend & Data",
    skills: [
      { name: "Java 17", icon: FaJava },
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "MySQL", icon: SiMysql },
      { name: "MariaDB", icon: SiMariadb },
      { name: "SQL", icon: FaDatabase },
    ],
  },
  {
    title: "Microservices & Architecture",
    skills: [
      { name: "Microservices Architecture", icon: FaProjectDiagram },
      { name: "API Gateway (Spring Cloud Gateway)", icon: SiSpring },
      { name: "Service Discovery (Consul)", icon: SiConsul },
      { name: "Database per Service", icon: FaDatabase },
    ],
  },
  {
    title: "Security & Governance",
    skills: [
      { name: "Spring Security", icon: SiSpringsecurity },
      { name: "JWT Authentication", icon: SiJsonwebtokens },
      { name: "Role-Based Access Control", icon: FaKey },
      { name: "PII Redaction & Privacy", icon: FaUserSecret },
      { name: "Audit Trails", icon: FaClipboardList },
    ],
  },
  {
    title: "DevOps & Quality",
    skills: [
      { name: "CI/CD (Jenkins)", icon: SiJenkins },
      { name: "SonarQube Code Analysis", icon: FaSearch },
      { name: "JUnit 5 & Mockito", icon: SiJunit5 },
      { name: "React Testing Library", icon: SiTestinglibrary },
      { name: "JaCoCo Coverage Gates", icon: FaCheckDouble },
      { name: "Spring Boot Actuator", icon: FaHeartbeat },
    ],
  },
  {
    title: "Frontend & Real-Time",
    skills: [
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Vite", icon: SiVite },
      { name: "Data Visualization (Chart.js, Recharts)", icon: SiChartdotjs },
      { name: "Server-Sent Events (SSE)", icon: FaStream },
    ],
  },
];

export const SOCIALS = [
  { name: "GitHub", icon: RxGithubLogo, link: PROFILE.github as string },
  { name: "LinkedIn", icon: RxLinkedinLogo, link: PROFILE.linkedin as string },
  { name: "Twitter", icon: RxTwitterLogo, link: PROFILE.twitter as string },
  {
    name: "Instagram",
    icon: RxInstagramLogo,
    link: PROFILE.instagram as string,
  },
  {
    name: "Email",
    icon: MdOutlineEmail,
    link: PROFILE.email ? CONTACT.gmailUrl : "",
  },
  {
    name: "Phone",
    icon: MdOutlinePhone,
    link: PROFILE.phone ? CONTACT.phoneHref : "",
  },
].filter((social) => social.link !== "");

const DEVCOMMONS_IMG = "/projects/devcommons";

/** A tier in an architecture preview (card visual + interactive stack). */
export type Layer = {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  items: ReadonlyArray<string>;
  /** Optional link to the source/docs for this layer. */
  href?: string;
};

/** The layers of UnitedAir AI, top (what users touch) to bottom (models). */
export const ARCH_LAYERS: ReadonlyArray<Layer> = [
  {
    id: "experience",
    title: "Experience",
    subtitle: "Three role-based consoles",
    color: "#38bdf8",
    items: ["Passenger console", "Airline Staff console", "Admin console", "SSE token streaming"],
  },
  {
    id: "governance",
    title: "Security & governance",
    subtitle: "Trust before the model",
    color: "#f472b6",
    items: ["JWT (HS256) + BCrypt", "4-layer RBAC", "Pre-LLM PII redaction", "Append-only audit trail"],
  },
  {
    id: "patterns",
    title: "Agentic patterns",
    subtitle: "How the agents think",
    color: "#b49bff",
    items: ["Chain", "Routing", "Parallelization", "Orchestrator-Worker", "Evaluator-Optimizer"],
  },
  {
    id: "knowledge",
    title: "Tools & knowledge",
    subtitle: "Live data and grounded policy",
    color: "#2dd4bf",
    items: ["Flight search", "PNR lookup", "Booking & seats", "Check-in & status", "Case escalation", "MariaDB vector store"],
  },
  {
    id: "models",
    title: "Models",
    subtitle: "Via Spring AI on Azure OpenAI",
    color: "#facc15",
    items: ["gpt-4.1-mini", "text-embedding-3-small", "1536-dim embeddings"],
  },
];


export const NAV_LINKS = [
  {
    title: "About me",
    link: "/#about-me",
  },
  {
    title: "Skills",
    link: "/#skills",
  },
  {
    title: "Projects",
    link: "/#projects",
  },
  {
    title: "Devin",
    link: "/devin",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
];

/** The tiers of ShiftTrack, top (what users touch) to bottom (data). */
export const SHIFT_LAYERS: ReadonlyArray<Layer> = [
  {
    id: "spa",
    title: "React SPA",
    subtitle: "Role-scoped modules",
    color: "#38bdf8",
    items: ["React 18 + TypeScript", "FullCalendar", "Drag-and-drop", "Chart.js & Recharts"],
  },
  {
    id: "gateway",
    title: "API Gateway",
    subtitle: "One governed entry point",
    color: "#22d3ee",
    items: ["Spring Cloud Gateway", "Edge JWT validation", "CORS", "LoadBalancer"],
  },
  {
    id: "services",
    title: "Spring Boot services",
    subtitle: "Independent, Consul-registered",
    color: "#b49bff",
    items: ["User/Org", "Roster Scheduling", "Patient Assignment", "Shift Operations"],
  },
  {
    id: "data",
    title: "MySQL 8 schemas",
    subtitle: "Database per service",
    color: "#2dd4bf",
    items: ["Own schema per service", "Logical foreign keys", "Read-only compatibility views"],
  },
];

/** Clickable nodes of the 3D architecture explorer (ShiftTrack). */
export const SHIFT_NODES: ReadonlyArray<Layer> = [
  {
    id: "spa",
    title: "React + TypeScript SPA",
    subtitle: "Four role-scoped modules",
    color: "#38bdf8",
    items: ["React 18", "TypeScript", "FullCalendar", "react-beautiful-dnd", "Chart.js & Recharts", "Bootstrap 5", "Axios gateway client", "Toast notifications"],
  },
  {
    id: "gateway",
    title: "API Gateway",
    subtitle: "The single entry point",
    color: "#22d3ee",
    items: ["Spring Cloud Gateway", "Edge JWT validation", "CORS enforcement", "Role-based routing", "LoadBalancer", "Standardized API error contracts"],
  },
  {
    id: "consul",
    title: "Consul",
    subtitle: "Discovery & configuration",
    color: "#f472b6",
    items: ["Service discovery", "Configuration"],
  },
  {
    id: "user",
    title: "User / Org Service",
    subtitle: "Users and organisation",
    color: "#2dd4bf",
    items: ["Java 17 · Spring Boot 3.2", "Own MySQL 8 schema", "Logical foreign keys", "Read-only compatibility views"],
  },
  {
    id: "roster",
    title: "Roster Scheduling Service",
    subtitle: "Rosters and scheduling",
    color: "#b49bff",
    items: ["Java 17 · Spring Boot 3.2", "Own MySQL 8 schema", "Logical foreign keys", "Read-only compatibility views"],
  },
  {
    id: "patient",
    title: "Patient Assignment Service",
    subtitle: "Patients and assignments",
    color: "#facc15",
    items: ["Java 17 · Spring Boot 3.2", "Own MySQL 8 schema", "Logical foreign keys", "Read-only compatibility views"],
  },
  {
    id: "shift",
    title: "Shift Operations Service",
    subtitle: "Day-to-day shift operations",
    color: "#fb923c",
    items: ["Java 17 · Spring Boot 3.2", "Own MySQL 8 schema", "Logical foreign keys", "Read-only compatibility views"],
  },
];

type ProjectFeature = {
  title: string;
  description: string;
  icon: IconType;
  accent: string;
  /** Optional screenshot; features without one render as compact cards. */
  image?: string;
  alt?: string;
};

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  /** Screenshot. Projects without one get a generated architecture visual. */
  image?: string;
  github?: string;
  live?: string;
  /** Short badge shown on the card and detail hero. */
  badge: string;
  /** Shown instead of link buttons when there is no public repo/demo. */
  linksNote?: string;
  /** Which interactive 3D scene fronts the hero. */
  scene: "city" | "score" | "rag" | "services";
  /** Optional bespoke 3D section that explains the project's unique idea. */
  showcase?: "hybrid-scoring" | "agentic-rag" | "microservices";
  /** Tiers drawn as the card visual when there is no screenshot. */
  previewLayers?: ReadonlyArray<Layer>;
  stats?: ReadonlyArray<{ value: string; label: string }>;
  intro: ReadonlyArray<string>;
  stack: ReadonlyArray<{ name: string; icon: IconType }>;
  features: ReadonlyArray<ProjectFeature>;
  principle: { label: string; title: string; body: string };
  learnedLabel?: string;
  learned: ReadonlyArray<string>;
  gallery?: ReadonlyArray<{ src: string; caption: string }>;
  cta: { title: string; body: string };
}

export const PROJECTS: ReadonlyArray<Project> = [
  {
    slug: "devcommons",
    scene: "city",
    badge: "Featured project",
    title: "DevCommons",
    tagline: "A community platform for developers building with AI coding agents",
    summary:
      "A common place for developers to share agent harnesses, project ideas and learning resources — with an AI workspace that assists, but never decides for you.",
    image: `${DEVCOMMONS_IMG}/home.jpg`,
    github: "https://github.com/SaiTheja529/Developer_Community.git",
    live: "https://frontend-psi-bay-13.vercel.app/",
    intro: [
      "I built DevCommons with the idea of creating a common platform where developers can share resources, explore ideas and learn from each other's experiences with AI coding agents.",
      "As tools like Claude Code, GitHub Copilot and Cursor become more popular, having a well-structured agent harness — the right instructions, hooks, MCP servers and workflows — is becoming increasingly important. DevCommons brings these resources together in one place.",
    ],
    stack: [
      { name: "React 19", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Vite", icon: SiVite },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Three.js", icon: SiThreedotjs },
      { name: "Flask", icon: SiFlask },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Redis", icon: SiRedis },
      { name: "OpenAI API", icon: FaBrain },
    ],
    features: [
      {
        title: "Harness Lab",
        icon: FaTools,
        accent: "#2dd4bf",
        description:
          "Explore, share and review agent harness configurations — rules, hooks, subagents and MCP servers — with GitHub repository integration, ratings and community feedback.",
        image: `${DEVCOMMONS_IMG}/harness-lab.jpg`,
        alt: "Harness Lab listing page with search, filters and harness cards",
      },
      {
        title: "Project Ideas",
        icon: FaLightbulb,
        accent: "#facc15",
        description:
          "Share ideas, get feedback and connect with other developers interested in building them. Mark an idea as looking for collaborators and filter by category and tech.",
        image: `${DEVCOMMONS_IMG}/ideas.jpg`,
        alt: "Project Ideas page with idea cards marked looking for collaborators",
      },
      {
        title: "Knowledge Hub",
        icon: FaBookOpen,
        accent: "#818cf8",
        description:
          "Discover useful documentation, tutorials and technical resources — with automated link validation, so you can see link health before you click.",
        image: `${DEVCOMMONS_IMG}/knowledge-hub.jpg`,
        alt: "Knowledge Hub with resource and collection tabs and filters",
      },
      {
        title: "AI Workspace",
        icon: FaMagic,
        accent: "#c084fc",
        description:
          "An integrated AI assistant that uses page context to help generate harness documentation, explore project ideas and create personalized learning paths.",
        image: `${DEVCOMMONS_IMG}/ai-workspace.jpg`,
        alt: "AI Workspace offering to document a harness, generate ideas and find resources",
      },
      {
        title: "Interactive 3D Homepage",
        icon: FaCube,
        accent: "#7042f8",
        description:
          "A dynamic 3D environment that represents community activity through a virtual city, built from real platform data. Drag to turn it, click a piece to open it.",
        image: `${DEVCOMMONS_IMG}/home.jpg`,
        alt: "Isometric 3D city homepage with districts for Harness Lab, Knowledge Hub and Project Ideas",
      },
    ],
    principle: {
      label: "The guiding principle",
      title: "AI should assist users, not make decisions on their behalf.",
      body: "All AI-generated content remains editable and is saved as a draft. Users have complete control over what gets published.",
    },
    learned: [
      "Full-stack development",
      "AI integration",
      "Authentication",
      "Application security",
      "Streaming responses",
      "Interactive 3D experiences",
    ],
    gallery: [
      { src: `${DEVCOMMONS_IMG}/home.jpg`, caption: "3D homepage — a virtual city driven by real platform data" },
      { src: `${DEVCOMMONS_IMG}/harness-lab.jpg`, caption: "Harness Lab — browse, filter and search community harnesses" },
      { src: `${DEVCOMMONS_IMG}/harness-detail.jpg`, caption: "Harness detail with the Ask AI panel using page context" },
      { src: `${DEVCOMMONS_IMG}/harness-submit.jpg`, caption: "Submit a harness from a GitHub URL — draft docs with AI" },
      { src: `${DEVCOMMONS_IMG}/ideas.jpg`, caption: "Project Ideas — find collaborators and give feedback" },
      { src: `${DEVCOMMONS_IMG}/share-idea.jpg`, caption: "Share an idea — or generate a draft with AI" },
      { src: `${DEVCOMMONS_IMG}/knowledge-hub.jpg`, caption: "Knowledge Hub — resources and curated collections" },
      { src: `${DEVCOMMONS_IMG}/add-resource.jpg`, caption: "Add a resource — only the link health is checked" },
      { src: `${DEVCOMMONS_IMG}/ai-workspace.jpg`, caption: "AI Workspace — every output is a draft you review" },
    ],
    cta: {
      title: "Would love to hear your feedback and suggestions.",
      body: "Try it out, explore the code, and tell me what you'd improve.",
    },
  },
  {
    slug: "effort-analyzer",
    scene: "score",
    badge: "Featured project",
    showcase: "hybrid-scoring",
    title: "Effort Analyzer",
    tagline: "Measuring engineering effort more fairly than commits or lines of code",
    summary:
      "A full-stack app that scores developer contribution with a hybrid model — deterministic signals plus AI-assisted evaluation — and explains every score with confidence and reasoning.",
    image: "/projects/effort-analyzer/home.jpg",
    github: "https://github.com/SaiTheja529/Effort-Analyzer-Backend.git",
    live: "https://effort-analyzer-front-end-ctli.vercel.app/",
    intro: [
      "I built Effort Analyzer, a full-stack web application that explores a simple but important question: how can we measure engineering effort more fairly than just counting commits or lines of code? Traditional metrics focus on output volume, but real engineering work often involves architectural thinking, debugging, risk mitigation, and maintainability improvements that aren't visible in raw code size.",
      "Effort Analyzer analyzes GitHub repositories using a hybrid scoring model that combines deterministic signals with AI-assisted evaluation. The system prioritizes transparency by providing confidence indicators and reasoning for each score, helping teams understand why a contribution is meaningful rather than just seeing a number.",
    ],
    stack: [
      { name: "FastAPI", icon: SiFastapi },
      { name: "Async SQLAlchemy", icon: SiSqlalchemy },
      { name: "SQLite", icon: SiSqlite },
      { name: "React", icon: SiReact },
      { name: "Vite", icon: SiVite },
      { name: "GitHub OAuth", icon: SiGithub },
      { name: "Gemini", icon: SiGooglegemini },
      { name: "Grok (fallback)", icon: FaRobot },
    ],
    features: [
      {
        title: "Hybrid Scoring Model",
        icon: FaBalanceScale,
        accent: "#2dd4bf",
        description:
          "Combines deterministic signals — change size, file breadth, structural impact, test and documentation updates — with AI-assisted evaluation of feature impact, code quality, maintainability and risk handling.",
      },
      {
        title: "Transparent by Design",
        icon: FaSearch,
        accent: "#c084fc",
        description:
          "Every score comes with confidence indicators and reasoning, so teams understand why a contribution is meaningful rather than just seeing a number.",
      },
      {
        title: "Resilient AI Analysis",
        icon: FaSyncAlt,
        accent: "#facc15",
        description:
          "Gemini powers the AI analysis, with Grok as a fallback — a deliberate strategy so analysis doesn't hinge on a single AI provider.",
      },
      {
        title: "Insight Dashboards",
        icon: FaChartLine,
        accent: "#38bdf8",
        description:
          "Dashboards for commit insights, trends and contribution metadata, plus AI-generated repository context to improve developer understanding.",
      },
      {
        title: "Auth & Data Ownership",
        icon: FaUserShield,
        accent: "#818cf8",
        description:
          "GitHub OAuth and local authentication, with account-scoped history so each user's analyses stay their own.",
      },
      {
        title: "Built to Operate",
        icon: FaHeartbeat,
        accent: "#f472b6",
        description:
          "Background analysis jobs with pollable status, export tools and health checks — an async architecture designed for reliability.",
      },
    ],
    principle: {
      label: "The core idea",
      title: "Effort isn't output volume.",
      body: "Architectural thinking, debugging, risk mitigation and maintainability work rarely show up in raw code size. Effort Analyzer is built to surface that nuance — with transparent reasoning behind every score.",
    },
    learned: [
      "Reliable async architectures",
      "AI fallback strategies",
      "UX for technical metrics",
      "Authentication & data ownership",
    ],
    cta: {
      title: "Feedback from developers and maintainers is welcome.",
      body: "I'm continuing to refine the scoring model and analytics to better represent engineering effort in real-world repositories. If you're interested in fair contribution analysis, I'd love to hear from you.",
    },
  },
  {
    slug: "unitedair-ai",
    scene: "rag",
    previewLayers: ARCH_LAYERS,
    showcase: "agentic-rag",
    badge: "Infosys training project",
    linksNote:
      "Built as part of my Infosys training — there is no public repository or live deployment.",
    title: "UnitedAir AI",
    tagline:
      "An Agentic RAG assistant for airline passengers, staff and administrators — grounded answers only, zero hallucination",
    summary:
      "A full-stack conversational assistant for passenger self-service, staff compliance and knowledge administration, built on Spring AI, Azure OpenAI and a MariaDB vector store — every answer cited, or refused and escalated.",
    stats: [
      { value: "5", label: "agentic patterns" },
      { value: "4", label: "RBAC layers" },
      { value: "3", label: "role-based consoles" },
      { value: "1536", label: "embedding dimensions" },
      { value: "≥ 0.5", label: "cosine threshold" },
    ],
    intro: [
      "UnitedAir AI is a full-stack, Agentic RAG-powered conversational assistant for airline passenger self-service, staff compliance and operations, and knowledge administration — engineered with a strict “grounded answers only, zero hallucination” design.",
      "I built it as part of my training as an AI-Augmented Full Stack Developer at Infosys. It combines five agentic design patterns, live role-restricted operational tools, policy documents ingested into a native vector store, and a security and governance model strong enough for a regulated domain.",
    ],
    stack: [
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "Spring AI", icon: SiSpring },
      { name: "Azure OpenAI", icon: FaCloud },
      { name: "MariaDB Vector Store", icon: SiMariadb },
      { name: "Apache PDFBox", icon: FaFilePdf },
      { name: "Apache POI", icon: FaFileWord },
      { name: "JWT + BCrypt", icon: SiJsonwebtokens },
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Vite", icon: SiVite },
      { name: "Server-Sent Events", icon: FaStream },
    ],
    features: [
      {
        title: "Agentic RAG Architecture",
        icon: FaSitemap,
        accent: "#b49bff",
        description:
          "Chain, Routing, Parallelization, Orchestrator-Worker and Evaluator-Optimizer patterns, implemented with Spring AI and Azure OpenAI (gpt-4.1-mini and text-embedding-3-small, 1536-dim) over MariaDB's native vector store.",
      },
      {
        title: "Grounded Responses & Citations",
        icon: FaClipboardList,
        accent: "#2dd4bf",
        description:
          "PDF and DOCX policies are ingested automatically with Apache PDFBox and Apache POI. Every answer carries a mandatory source — document, section, page or tool timestamp — or the assistant refuses and escalates.",
      },
      {
        title: "Live Operational Tooling",
        icon: FaPlane,
        accent: "#38bdf8",
        description:
          "Role-restricted agentic tools for flight search, PNR lookup, booking creation, seat selection, check-in and flight status, and case escalation.",
      },
      {
        title: "Security, Privacy & Governance",
        icon: FaKey,
        accent: "#f472b6",
        description:
          "JWT authentication (HS256, BCrypt) and four-layer RBAC across the Passenger, Airline Staff and Admin consoles, with pre-LLM PII redaction and an append-only audit trail.",
      },
      {
        title: "Human-in-the-Loop",
        icon: FaUserCheck,
        accent: "#facc15",
        description:
          "Live admin escalation notifications, human overrides and staff-signup approvals keep people in control of the moments that matter.",
      },
      {
        title: "Real-Time UX",
        icon: FaStream,
        accent: "#818cf8",
        description:
          "A React + TypeScript (Vite) SPA streams tokens over Server-Sent Events, packaged together with the backend as a single monolithic Spring Boot deployable.",
      },
    ],
    principle: {
      label: "The contract",
      title: "Grounded answers only. Zero hallucination.",
      body: "If there is no grounded context, the assistant doesn't guess — it follows a strict refusal-and-escalation contract and hands the case to a human.",
    },
    learnedLabel: "Skills applied",
    learned: [
      "Agentic RAG design",
      "Grounding & citations",
      "Role-based access control",
      "PII redaction & auditability",
      "Streaming UX with SSE",
      "Human-in-the-loop workflows",
    ],
    cta: {
      title: "Want a walkthrough of the architecture?",
      body: "This was built during my Infosys training, so there's no public demo — but I'm always happy to talk through the design, the patterns and the trade-offs.",
    },
  },
  {
    slug: "shifttrack",
    scene: "services",
    showcase: "microservices",
    previewLayers: SHIFT_LAYERS,
    badge: "Training project",
    linksNote:
      "Built during my training — there is no public source code or live deployment.",
    title: "ShiftTrack",
    tagline:
      "A role-based hospital nursing shift and staffing system on a Spring Boot microservices architecture",
    summary:
      "Five Java 17 / Spring Boot 3.2 services behind a Spring Cloud Gateway, each with its own MySQL 8 schema, paired with a React + TypeScript SPA for four role-scoped modules.",
    stats: [
      { value: "5", label: "Spring Boot services" },
      { value: "4", label: "role-scoped modules" },
      { value: "1", label: "API gateway entry point" },
      { value: "MySQL 8", label: "database per service" },
      { value: "80%", label: "line-coverage gate" },
    ],
    intro: [
      "ShiftTrack is a full-stack, role-based hospital nursing shift and staffing management system, designed on a Spring Boot microservices architecture behind an API Gateway and paired with a React + TypeScript single-page application.",
      "It supports four role-scoped modules — Hospital Admin/HR, Nurse Supervisor, Nurse and Reception — covering ward roster planning, shift swaps, patient registration and assignment, shift handovers, attendance and staffing analytics. I built it during my training.",
    ],
    stack: [
      { name: "Java 17", icon: FaJava },
      { name: "Spring Boot 3.2", icon: SiSpringboot },
      { name: "Spring Cloud Gateway", icon: SiSpring },
      { name: "Consul", icon: SiConsul },
      { name: "MySQL 8", icon: SiMysql },
      { name: "Spring Security + JWT", icon: SiJsonwebtokens },
      { name: "React 18 + TypeScript", icon: SiReact },
      { name: "FullCalendar", icon: FaCalendarAlt },
      { name: "Chart.js & Recharts", icon: SiChartdotjs },
      { name: "Jenkins", icon: SiJenkins },
      { name: "SonarQube", icon: FaCheckDouble },
      { name: "JUnit 5 & Mockito", icon: SiJunit5 },
    ],
    features: [
      {
        title: "Microservices Architecture",
        icon: FaProjectDiagram,
        accent: "#22d3ee",
        description:
          "Five Java 17 / Spring Boot 3.2 services — API Gateway (Spring Cloud Gateway with Consul discovery/config and LoadBalancer), User/Org, Roster Scheduling, Patient Assignment and Shift Operations.",
      },
      {
        title: "Database per Service",
        icon: FaDatabase,
        accent: "#2dd4bf",
        description:
          "Each service is isolated to its own MySQL 8 schema, linked by logical foreign keys, with read-only cross-schema compatibility views for the reads that span services.",
      },
      {
        title: "End-to-End Staffing Workflows",
        icon: FaUserNurse,
        accent: "#b49bff",
        description:
          "Ward roster planning and validation, nurse availability preferences, shift-swap approvals (transactional and unique-key safe), bed-allocated patient registration, assignments, per-patient task lists, structured handovers, attendance verification and staffing analytics.",
      },
      {
        title: "Security & Edge Governance",
        icon: FaShieldAlt,
        accent: "#f472b6",
        description:
          "JWT authentication (JJWT) and BCrypt hashing in Spring Security, with edge token validation and CORS enforcement at the API Gateway, role-based routing and standardized API error contracts.",
      },
      {
        title: "Interactive Frontend SPA",
        icon: FaCalendarAlt,
        accent: "#38bdf8",
        description:
          "React 18 + TypeScript with FullCalendar shift scheduling, drag-and-drop (react-beautiful-dnd), analytics dashboards in Chart.js and Recharts, Bootstrap 5 and toast notifications through a centralized Axios gateway client.",
      },
      {
        title: "CI/CD & Code Quality",
        icon: FaCheckDouble,
        accent: "#facc15",
        description:
          "A Jenkins declarative pipeline automates parallel backend builds and tests, frontend testing and builds, SonarQube analysis and artifact archiving — behind an 80% JaCoCo line-coverage gate.",
      },
    ],
    principle: {
      label: "The architecture",
      title: "Independent services behind one governed entry point.",
      body: "Each domain service owns its data in its own MySQL 8 schema, while the API Gateway handles discovery, load balancing, token validation and CORS at the edge.",
    },
    learnedLabel: "Skills applied",
    learned: [
      "Microservices design",
      "Database-per-service",
      "API gateway & service discovery",
      "Spring Security & JWT",
      "Interactive React UIs",
      "CI/CD & quality gates",
    ],
    cta: {
      title: "Want a walkthrough of the architecture?",
      body: "ShiftTrack was built during my training, so there's no public code or demo — but I'm happy to talk through the service boundaries, data ownership and pipeline.",
    },
  },
];
