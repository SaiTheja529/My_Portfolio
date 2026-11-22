import type { Metadata } from "next";

import { PROFILE } from "@/constants";

export const siteConfig: Metadata = {
  title: `${PROFILE.name} | ${PROFILE.role}`,
  description: `${PROFILE.name} — ${PROFILE.role} at ${PROFILE.company} (${PROFILE.team}). ${PROFILE.tagline}`,
  keywords: [
    PROFILE.name,
    PROFILE.role,
    "Agentic AI",
    "Agentic Engineering",
    "Harness Engineering",
    "Context Engineering",
    "Spring Boot",
    "Spring AI",
    "RAG",
    "Java",
    "React",
    "MariaDB",
    "SQL",
    "portfolio",
  ] as Array<string>,
  authors: {
    name: PROFILE.name,
  },
} as const;
