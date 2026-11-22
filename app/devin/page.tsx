import type { Metadata } from "next";

import { DevinLab } from "@/components/main/devin-lab";

export const metadata: Metadata = {
  title: "Devin & the Agent Stack | Sai Theja Papisetty",
  description:
    "What makes Devin different from Claude Code and GitHub Copilot — and what you can do by combining all three. Summarised from the official docs, with links.",
};

export default function DevinPage() {
  return <DevinLab />;
}
