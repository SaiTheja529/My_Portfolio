import type { IconType } from "react-icons";
import {
  FaBolt,
  FaCloud,
  FaCodeBranch,
  FaDesktop,
  FaHandshake,
  FaKey,
  FaPlug,
  FaProjectDiagram,
  FaSlack,
  FaSyncAlt,
  FaUsers,
} from "react-icons/fa";

import type { Layer } from "@/constants";

/**
 * Everything on the /devin page is summarised from each tool's OFFICIAL docs
 * (read Nov 2026). Features and plans change — the links are the source of truth.
 */

export const DOCS_READ_DATE = "Nov 2026";

export const DOCS = {
  devin: "https://docs.devin.ai/",
  claude: "https://code.claude.com/docs/en/overview",
  copilot: "https://docs.github.com/en/copilot",
} as const;

const D = "https://docs.devin.ai";
const C = "https://code.claude.com/docs/en";
const G = "https://docs.github.com/en/copilot";

export const TOOLS = {
  devin: { name: "Devin", color: "#8b5cf6" },
  claude: { name: "Claude Code", color: "#fb923c" },
  copilot: { name: "GitHub Copilot", color: "#60a5fa" },
  together: { name: "Together", color: "#22d3ee" },
} as const;

/* ───────── Devin's "workstation", exploded ───────── */

export const DEVIN_LAYERS: ReadonlyArray<Layer> = [
  {
    id: "you",
    title: "You",
    subtitle: "Where you talk to Devin",
    color: "#38bdf8",
    items: ["Web app", "Slack & Teams", "Devin CLI", "API"],
    href: `${D}/`,
  },
  {
    id: "orchestration",
    title: "Orchestration",
    subtitle: "Many sessions at once",
    color: "#f472b6",
    items: [
      "Parallel sessions, each in its own VM",
      "Automations: GitHub · Linear · Jira · PagerDuty",
      "Schedules & webhooks",
    ],
    href: `${D}/product-guides/automations`,
  },
  {
    id: "workspace",
    title: "Workspace",
    subtitle: "A full desktop, not just a shell",
    color: "#b49bff",
    items: [
      "Shell",
      "IDE (you can take over)",
      "Browser",
      "Clicks through your app, screenshots, recordings",
    ],
    href: `${D}/essential-guidelines/when-to-use-devin`,
  },
  {
    id: "environment",
    title: "Environment",
    subtitle: "A Linux VM, from a snapshot",
    color: "#2dd4bf",
    items: [
      "Repos cloned, tools installed, deps resolved",
      "Frozen bootable snapshot per session",
      "Blueprints (YAML, like a Dockerfile)",
    ],
    href: `${D}/onboard-devin/environment`,
  },
  {
    id: "context",
    title: "Context",
    subtitle: "What Devin knows about your code",
    color: "#facc15",
    items: [
      "AGENTS.md",
      "Skills (SKILL.md)",
      "DeepWiki & Ask Devin repo indexing",
      "MCP (stdio, SSE, HTTP)",
    ],
    href: `${D}/onboard-devin/agents-md`,
  },
];

/* ───────── What makes Devin different ───────── */

export const DIFFERENT: ReadonlyArray<{
  title: string;
  text: string;
  icon: IconType;
  color: string;
  href: string;
}> = [
  {
    title: "Its own cloud computer",
    text: "Every session starts from a snapshot of a Linux VM with your repos cloned, tools installed and dependencies resolved.",
    icon: FaCloud,
    color: "#2dd4bf",
    href: `${D}/onboard-devin/environment`,
  },
  {
    title: "A full desktop",
    text: "Shell, IDE and browser — it can spin up your app, click through the UI, take screenshots and record its screen.",
    icon: FaDesktop,
    color: "#b49bff",
    href: `${D}/essential-guidelines/when-to-use-devin`,
  },
  {
    title: "Parallel by design",
    text: "Orchestrate managed Devins in parallel, each running in its own isolated VM.",
    icon: FaProjectDiagram,
    color: "#f472b6",
    href: `${D}/work-with-devin/advanced-capabilities`,
  },
  {
    title: "Delegate where you work",
    text: "Tag @Devin in Slack or Teams as bugs and requests come in, or use the web app, CLI or API.",
    icon: FaSlack,
    color: "#38bdf8",
    href: `${D}/integrations/slack`,
  },
  {
    title: "Event-driven Automations",
    text: "Start sessions from Slack, Teams, GitHub, GitLab, Linear, Jira, PagerDuty, a schedule or a webhook.",
    icon: FaBolt,
    color: "#facc15",
    href: `${D}/product-guides/automations`,
  },
  {
    title: "Owns the PR loop",
    text: "Devin Review explains a pull request and flags bugs and security issues (/devin review); Auto-Fix can use a Devin session to address findings.",
    icon: FaCodeBranch,
    color: "#fb923c",
    href: `${D}/work-with-devin/devin-review`,
  },
];

/* ───────── The rotating prism ───────── */

export const PRISM = [
  {
    id: "devin",
    ...TOOLS.devin,
    lives: "Its own cloud VM — with a shell, IDE and browser.",
    how: "You delegate from the web app, Slack/Teams, CLI or API. It works asynchronously, with many sessions in parallel.",
    best: "Well-scoped backlog work with clear success criteria: tickets, migrations, refactors, PR review, tests.",
    href: DOCS.devin,
  },
  {
    id: "claude",
    ...TOOLS.claude,
    lives: "Your terminal, IDE, desktop app or browser — on your machine by default, with optional cloud VMs.",
    how: "An interactive loop in your repo — gather context, act, verify — with plan mode, permission modes and checkpoints. Also headless (-p) and GitHub Actions.",
    best: "Hands-on, high-control work, extended with CLAUDE.md, skills, hooks, subagents and MCP.",
    href: DOCS.claude,
  },
  {
    id: "copilot",
    ...TOOLS.copilot,
    lives: "GitHub and your IDE (VS Code, Visual Studio, JetBrains, Xcode, Eclipse) — plus a CLI and a cloud agent.",
    how: "Agent mode edits and runs commands in your editor (you approve commands). Assign an issue to Copilot and it works in the cloud and opens a pull request.",
    best: "The GitHub-native flow — issue → pull request → code review — and in-editor help.",
    href: DOCS.copilot,
  },
  {
    id: "together",
    ...TOOLS.together,
    lives: "Everywhere your work already is.",
    how: "One harness (AGENTS.md / CLAUDE.md), the same MCP tools, hand-offs between agents, and cross-review.",
    best: "Each agent on the kind of work it is best placed for.",
    href: "#together",
  },
] as const;

/* ───────── The relay (my suggested workflow) ───────── */

export type ToolId = "devin" | "claude" | "copilot";

export const RELAY: ReadonlyArray<{
  title: string;
  text: string;
  tools: ReadonlyArray<ToolId>;
  href: string;
  doc: string;
}> = [
  {
    title: "Write the harness once",
    text: "Keep shared instructions in AGENTS.md. Devin and Copilot read it; Claude Code uses it when there's no CLAUDE.md — and Devin and Copilot can read CLAUDE.md too.",
    tools: ["devin", "claude", "copilot"],
    href: `${D}/onboard-devin/agents-md`,
    doc: "Devin: AGENTS.md",
  },
  {
    title: "Share the tools",
    text: "Connect the same MCP servers to every agent. Devin supports stdio, SSE and HTTP servers; Claude Code and Copilot support MCP too.",
    tools: ["devin", "claude", "copilot"],
    href: `${D}/work-with-devin/mcp`,
    doc: "Devin: MCP",
  },
  {
    title: "Plan & explore",
    text: "Think it through interactively in Claude Code's plan mode, and use Ask Devin to question the codebase and scope the task.",
    tools: ["claude", "devin"],
    href: `${D}/work-with-devin/ask-devin`,
    doc: "Devin: Ask Devin",
  },
  {
    title: "Delegate in parallel",
    text: "Hand scoped tasks to cloud Devin (its docs describe handing off from Claude Code or any agent) and assign issues to Copilot's cloud agent — each works in its own cloud environment.",
    tools: ["devin", "copilot"],
    href: `${D}/work-with-devin/devin-handoff`,
    doc: "Devin: hand-off",
  },
  {
    title: "Polish in the editor",
    text: "Finish locally with Copilot's agent mode in your IDE or Claude Code in your terminal — you stay in the loop and approve commands.",
    tools: ["copilot", "claude"],
    href: `${G}/how-tos/copilot-in-your-ide/use-copilot-agents/use-agent-mode`,
    doc: "Copilot: agent mode",
  },
  {
    title: "Cross-review before merge",
    text: "Let a different agent check the work: /devin review, Copilot code review, or Claude Code's review skill (/code-review).",
    tools: ["devin", "copilot", "claude"],
    href: `${D}/work-with-devin/devin-review`,
    doc: "Devin Review",
  },
];

/* ───────── What you can do by combining ───────── */

export const COMBINED: ReadonlyArray<{
  title: string;
  text: string;
  icon: IconType;
  color: string;
  href: string;
}> = [
  {
    title: "One harness, three agents",
    text: "A single AGENTS.md steers all three — the same conventions, commands and guardrails whichever agent picks the task up.",
    icon: FaKey,
    color: "#facc15",
    href: `${G}/concepts/prompting-and-context/custom-instructions`,
  },
  {
    title: "A fleet plus a pair-programmer",
    text: "Run Devin sessions in parallel on the scoped backlog while you work the hard problem interactively in Claude Code.",
    icon: FaUsers,
    color: "#8b5cf6",
    href: `${D}/work-with-devin/advanced-capabilities`,
  },
  {
    title: "Three-way code review",
    text: "Have an agent that didn't write the code review it — Devin Review, Copilot code review and Claude Code each bring a different angle.",
    icon: FaCodeBranch,
    color: "#fb923c",
    href: `${G}/concepts/agent-capabilities/agent-powered-workflows-and-operations/code-review`,
  },
  {
    title: "Shared tools via MCP",
    text: "Wire the same internal tools and data sources into every agent once, instead of three bespoke integrations.",
    icon: FaPlug,
    color: "#22d3ee",
    href: `${C}/mcp`,
  },
  {
    title: "Backlog to PR on autopilot",
    text: "Devin Automations (GitHub, Linear, Jira, schedules, webhooks), Claude Code's GitHub Action (@claude) and Copilot issue assignment can all start work from the events you already have.",
    icon: FaSyncAlt,
    color: "#f472b6",
    href: `${C}/github-actions`,
  },
  {
    title: "The right autonomy per task",
    text: "A quick edit in Copilot's agent mode, an interactive refactor in Claude Code, a fully delegated ticket to Devin or Copilot's cloud agent.",
    icon: FaHandshake,
    color: "#2dd4bf",
    href: `${D}/essential-guidelines/when-to-use-devin`,
  },
];

/* ───────── Official documentation ───────── */

export const DOC_LINKS: ReadonlyArray<{
  tool: keyof typeof TOOLS;
  home: string;
  tagline: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}> = [
  {
    tool: "devin",
    home: DOCS.devin,
    tagline: "docs.devin.ai",
    links: [
      { label: "Introduction", href: `${D}/` },
      { label: "Environment & snapshots", href: `${D}/onboard-devin/environment` },
      { label: "When to use Devin", href: `${D}/essential-guidelines/when-to-use-devin` },
      { label: "Slack", href: `${D}/integrations/slack` },
      { label: "Automations", href: `${D}/product-guides/automations` },
      { label: "Devin Review", href: `${D}/work-with-devin/devin-review` },
      { label: "DeepWiki", href: `${D}/work-with-devin/deepwiki` },
      { label: "MCP", href: `${D}/work-with-devin/mcp` },
      { label: "AGENTS.md", href: `${D}/onboard-devin/agents-md` },
      { label: "Hand-off", href: `${D}/work-with-devin/devin-handoff` },
    ],
  },
  {
    tool: "claude",
    home: DOCS.claude,
    tagline: "code.claude.com/docs",
    links: [
      { label: "Overview", href: `${C}/overview` },
      { label: "How it works", href: `${C}/how-claude-code-works` },
      { label: "Memory (CLAUDE.md)", href: `${C}/memory` },
      { label: "MCP", href: `${C}/mcp` },
      { label: "Subagents", href: `${C}/sub-agents` },
      { label: "Hooks", href: `${C}/hooks-guide` },
      { label: "Headless mode", href: `${C}/headless` },
      { label: "GitHub Actions", href: `${C}/github-actions` },
    ],
  },
  {
    tool: "copilot",
    home: DOCS.copilot,
    tagline: "docs.github.com/copilot",
    links: [
      { label: "Cloud agent", href: `${G}/how-tos/copilot-on-github/use-copilot-agents/overview` },
      { label: "Agent mode in the IDE", href: `${G}/how-tos/copilot-in-your-ide/use-copilot-agents/use-agent-mode` },
      { label: "Code review", href: `${G}/concepts/agent-capabilities/agent-powered-workflows-and-operations/code-review` },
      { label: "Custom instructions", href: `${G}/concepts/prompting-and-context/custom-instructions` },
      { label: "Custom agents", href: `${G}/concepts/customizations/custom-agents` },
      { label: "MCP", href: `${G}/concepts/customizations/mcp` },
      { label: "Copilot CLI", href: `${G}/concepts/copilot-surfaces/copilot-cli` },
    ],
  },
];
