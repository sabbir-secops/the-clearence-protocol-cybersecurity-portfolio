export type CaseAccent =
  | "cyan"
  | "blue"
  | "violet"
  | "white";

export type CaseDecision = {
  title: string;
  decision: string;
  reason: string;
  outcome: string;
};

export type CaseEvidence = {
  title: string;
  type: string;
  classification:
    | "PUBLIC"
    | "TECHNICAL"
    | "SANITIZED"
    | "PLANNED";
  summary: string;
  details: string[];
};

export type CaseStackItem = {
  layer: string;
  technology: string;
  purpose: string;
};

export type CaseArchitectureNode = {
  label: string;
  detail: string;
};

export type CaseStateItem = {
  label: string;
  value: string;
};

export type CaseStudy = {
  slug: string;
  code: string;
  name: string;
  type: string;
  status: string;
  classification: string;
  accent: CaseAccent;
  role: string;
  heroLine: string;
  intro: string[];
  focus: string[];
  problem: {
    headline: string;
    intro: string;
    points: string[];
    principle: string;
  };
  architecture: {
    headline: string;
    intro: string;
    flow: string[];
    nodes: CaseArchitectureNode[];
  };
  security?: {
    headline: string;
    intro: string;
    rules: string[];
  };
  workflow: {
    headline: string;
    intro: string;
    steps: string[];
  };
  decisions: CaseDecision[];
  evidence: CaseEvidence[];
  stack: CaseStackItem[];
  currentState: CaseStateItem[];
  next: string[];
  seo: {
    title: string;
    description: string;
  };
};
