export type SecurityLabWorkflowStep = {
  id: string;
  number: string;
  label: string;
  workflowLabel: string;
  question: string;
  detail: string;
};

export const securityLabWorkflow: SecurityLabWorkflowStep[] = [
  {
    id: "target-context",
    number: "01",
    label: "Target Context",
    workflowLabel: "Understand Target",
    question: "What is in scope?",
    detail:
      "Define scope before testing and keep the public lab within authorized or self-controlled contexts.",
  },
  {
    id: "recon",
    number: "02",
    label: "Recon",
    workflowLabel: "Reconnaissance",
    question: "What is exposed?",
    detail:
      "Identify exposed functionality and trust boundaries before deeper testing begins.",
  },
  {
    id: "attack-surface",
    number: "03",
    label: "Attack Surface",
    workflowLabel: "Map Attack Surface",
    question: "Where can behavior fail?",
    detail:
      "Map application, API and mobile behavior into concrete assessment surfaces and access boundaries.",
  },
  {
    id: "testing",
    number: "04",
    label: "Testing",
    workflowLabel: "Test Behavior",
    question: "How does the system behave?",
    detail:
      "Use tooling and direct investigation to inspect behavior without treating automated output as proof.",
  },
  {
    id: "validation",
    number: "05",
    label: "Validation",
    workflowLabel: "Validate Finding",
    question: "Can the behavior be reproduced?",
    detail:
      "Validate a signal before documenting it as evidence or assigning security meaning to it.",
  },
  {
    id: "mapping",
    number: "06",
    label: "Mapping",
    workflowLabel: "Map CWE or Framework",
    question: "How should the weakness be described?",
    detail:
      "Use CWE, OWASP and MASVS concepts where relevant to keep technical language consistent.",
  },
  {
    id: "risk-context",
    number: "07",
    label: "Risk Context",
    workflowLabel: "Add Risk Context",
    question: "Why does the evidence matter?",
    detail:
      "Connect validated behavior to impact and defensive context instead of reporting scanner output alone.",
  },
  {
    id: "reporting",
    number: "08",
    label: "Reporting",
    workflowLabel: "Report",
    question: "What can be communicated safely?",
    detail:
      "Translate evidence into useful remediation context while keeping private targets, credentials and sensitive exploit detail out of public material.",
  },
];

export const securityLabArchitectureNodes = [
  {
    label: "Web",
    detail:
      "Application behavior, authentication, authorization and business logic remain key assessment surfaces.",
  },
  {
    label: "API",
    detail:
      "Endpoints, identity boundaries and access control require direct testing.",
  },
  {
    label: "Mobile",
    detail:
      "Android packages, storage, permissions and WebView behavior create a different analysis surface.",
  },
  {
    label: "Tooling",
    detail:
      "Burp Suite and MobSF support investigation but do not replace validation.",
  },
  {
    label: "CWE",
    detail:
      "Weakness mapping provides consistent technical vocabulary for findings.",
  },
  {
    label: "Reporting",
    detail:
      "Evidence is translated into a form that can support remediation and defensive decisions.",
  },
];

export const securityLabControls = [
  "Define scope before testing.",
  "Do not treat automated output as a confirmed vulnerability.",
  "Validate behavior before documenting a finding.",
  "Separate evidence from assumptions.",
  "Map technical weaknesses using established terminology where useful.",
  "Keep private target details and credentials out of public case material.",
];
