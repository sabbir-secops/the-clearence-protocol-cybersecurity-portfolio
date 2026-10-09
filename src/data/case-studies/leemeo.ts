import { getProjectEvidence } from "../clearance-evidence";
import type { CaseStudy } from "./types";

export const leemeoCaseStudy: CaseStudy = {
  slug: "leemeo",
  code: "L-03",
  name: "Leemeo",
  type: "Digital Technology and Operations",
  status: "Active",
  classification: "PUBLIC OPERATIONS RECORD",
  accent: "white",
  role:
    "Technology, product and operations focused involvement.",
  heroLine:
    "A business technology context where product thinking, digital systems and operations have to remain connected.",
  intro: [
    "Leemeo represents work inside a wider business ecosystem where technology is not isolated from operations.",
    "The technical value comes from understanding how product choices, operational needs and digital systems influence each other over time.",
    "This case file focuses on systems thinking and technical direction rather than exposing private business information.",
  ],
  focus: [
    "Technology",
    "Product Thinking",
    "Operations",
    "Digital Systems",
    "Digital Strategy",
    "Architecture",
  ],
  problem: {
    headline:
      "Business technology fails when the system and the operation evolve separately.",
    intro:
      "A technical decision can be correct in isolation and still create operational friction. The work requires connecting product intent with how teams and systems actually operate.",
    points: [
      "Digital systems need a clear operational purpose.",
      "Product decisions affect more than the interface.",
      "Technology choices create long term maintenance responsibilities.",
      "Operational context changes which technical problem matters first.",
      "Architecture should support future change instead of only the immediate request.",
      "Technical communication has to remain understandable outside engineering.",
    ],
    principle:
      "A system is useful only when it fits the operation around it.",
  },
  architecture: {
    headline:
      "Translate business context into technical direction.",
    intro:
      "The architecture view is intentionally abstract because the case study focuses on decision flow instead of private internal systems.",
    flow: [
      "Business Context",
      "Operational Need",
      "Product Decision",
      "Digital System",
      "Technical Execution",
      "Feedback",
    ],
    nodes: [
      {
        label: "Operations",
        detail:
          "Real workflows define what the digital system has to support.",
      },
      {
        label: "Product",
        detail:
          "Product thinking converts business goals into a usable system direction.",
      },
      {
        label: "Technology",
        detail:
          "Technical choices are evaluated against the operational need they serve.",
      },
      {
        label: "Architecture",
        detail:
          "System structure provides a path for growth and change.",
      },
      {
        label: "Digital Strategy",
        detail:
          "Technical work is connected to a longer term digital direction.",
      },
      {
        label: "Feedback",
        detail:
          "Operational outcomes inform the next technical decision.",
      },
    ],
  },
  workflow: {
    headline:
      "Start with the operational question before selecting the technical answer.",
    intro:
      "The work moves from understanding context to defining a technical direction and then reviewing how that direction behaves in practice.",
    steps: [
      "Understand Context",
      "Identify Constraint",
      "Frame Product Need",
      "Define Technical Direction",
      "Implement or Coordinate",
      "Review Operational Fit",
    ],
  },
  decisions: [
    {
      title: "Context Before Technology",
      decision:
        "Start with the operational problem before selecting tools or architecture.",
      reason:
        "Technology chosen without context can optimize the wrong problem.",
      outcome:
        "Technical work remains connected to a measurable business need.",
    },
    {
      title: "Product and Operations Together",
      decision:
        "Treat product design and operations as connected systems.",
      reason:
        "A digital product changes how people perform real work.",
      outcome:
        "Implementation choices can be evaluated against operational impact.",
    },
    {
      title: "Long Term Technical Thinking",
      decision:
        "Consider maintenance and future change during initial technical direction.",
      reason:
        "Short term delivery can create long term complexity if architecture is ignored.",
      outcome:
        "The system direction remains easier to evolve.",
    },
  ],
  evidence: getProjectEvidence("leemeo"),
  stack: [
    {
      layer: "Product",
      technology: "Product Thinking",
      purpose:
        "Translate needs into a coherent system direction.",
    },
    {
      layer: "Operations",
      technology: "Systems Thinking",
      purpose:
        "Connect technical decisions to real operational workflows.",
    },
    {
      layer: "Strategy",
      technology: "Digital Strategy",
      purpose:
        "Keep technical work aligned with longer term business direction.",
    },
    {
      layer: "Architecture",
      technology: "System Architecture",
      purpose:
        "Structure digital systems for clarity and evolution.",
    },
  ],
  currentState: [
    {
      label: "Project",
      value: "Active",
    },
    {
      label: "Primary Context",
      value: "Technology and operations",
    },
    {
      label: "Product Thinking",
      value: "Active",
    },
    {
      label: "Public Disclosure",
      value: "High level and sanitized",
    },
  ],
  next: [
    "Add sanitized project evidence",
    "Document selected technical decisions",
    "Connect system changes to operational outcomes",
  ],
  seo: {
    title:
      "Leemeo Technology and Operations Case Study",
    description:
      "Case study of technology, product thinking, operations, digital systems, architecture and long term technical direction within Leemeo.",
  },
};
