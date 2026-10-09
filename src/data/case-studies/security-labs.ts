import { getProjectEvidence } from "../clearance-evidence";
import {
  securityLabArchitectureNodes,
  securityLabControls,
  securityLabWorkflow,
} from "../security-lab-public";
import type { CaseStudy } from "./types";

export const securityLabsCaseStudy: CaseStudy = {
  slug: "security-labs",
  code: "R-05",
  name: "Security Labs",
  type: "Assessment, Research and Experimentation",
  status: "Ongoing",
  classification: "PUBLIC RESEARCH DOSSIER",
  accent: "cyan",
  role:
    "Security testing, experimentation and technical investigation.",
  heroLine:
    "A controlled research surface for understanding application behavior, mobile security, vulnerabilities and technical evidence.",
  intro: [
    "Security Labs is an ongoing research and experimentation area focused on application security, mobile analysis, vulnerability assessment and security tooling.",
    "The work emphasizes understanding how a weakness is discovered, how it can be validated and how technical evidence should be translated into a useful security finding.",
    "The public dossier avoids exposing real private targets, credentials or sensitive exploit detail.",
  ],
  focus: [
    "Application Security",
    "VAPT",
    "Web Security",
    "API Security",
    "Mobile Security",
    "OWASP",
    "Burp Suite",
    "MobSF",
    "CWE",
    "MASVS",
    "Security Research",
  ],
  problem: {
    headline:
      "A security finding is useful only when it is understood, validated and communicated in context.",
    intro:
      "Automated output can identify signals, but research still requires investigation. The lab process focuses on moving from attack surface understanding to evidence and reporting.",
    points: [
      "The target surface has to be understood before testing begins.",
      "Reconnaissance helps identify exposed functionality and trust boundaries.",
      "Findings need validation before they become evidence.",
      "Web and API behavior can fail at authentication, authorization and business logic boundaries.",
      "Mobile analysis introduces package, storage, permission and WebView concerns.",
      "CWE and security frameworks help connect findings to a common technical language.",
      "Threat intelligence and known vulnerability context can help prioritize deeper investigation.",
      "Reporting should explain impact and context rather than only list scanner output.",
    ],
    principle:
      "Testing produces signals. Validation turns signals into evidence.",
  },
  architecture: {
    headline:
      "Organize security research around the attack surface.",
    intro:
      "The lab architecture is a methodology rather than a production network. It shows how investigation moves from context into evidence.",
    flow: securityLabWorkflow.map((step) => step.label),
    nodes: securityLabArchitectureNodes,
  },
  security: {
    headline:
      "Research is controlled by scope and evidence.",
    intro:
      "The public lab model is built around authorized or self controlled testing contexts. The portfolio documents methodology without publishing harmful target specific detail.",
    rules: securityLabControls,
  },
  workflow: {
    headline:
      "Move from understanding to validation before reporting.",
    intro:
      "The workflow is deliberately evidence driven. Each stage should answer a technical question before the next stage adds more interpretation.",
    steps: securityLabWorkflow.map((step) => step.workflowLabel),
  },
  decisions: [
    {
      title: "Evidence Before Severity",
      decision:
        "Validate the behavior before assigning meaning to a scanner or tool signal.",
      reason:
        "False positives and incomplete context can distort the technical risk.",
      outcome:
        "Findings are based on reproduced behavior rather than tool output alone.",
    },
    {
      title: "Web and API Boundaries",
      decision:
        "Inspect authentication, authorization and business logic as distinct security surfaces.",
      reason:
        "A request can be syntactically valid while still crossing an unauthorized business boundary.",
      outcome:
        "Testing remains focused on what the system allows, not only what the endpoint returns.",
    },
    {
      title: "Mobile Specific Analysis",
      decision:
        "Use mobile security frameworks and APK analysis for Android focused work.",
      reason:
        "Mobile applications introduce package and device side concerns that web testing does not cover.",
      outcome:
        "Research can include storage, permissions, WebView and static analysis context.",
    },
    {
      title: "Framework Mapping",
      decision:
        "Use CWE, OWASP and MASVS concepts to organize findings where relevant.",
      reason:
        "Common technical language improves communication and research consistency.",
      outcome:
        "Evidence can be related to recognized weakness and security categories.",
    },
  ],
  evidence: getProjectEvidence("security-labs"),
  stack: [
    {
      layer: "Web Testing",
      technology: "Burp Suite",
      purpose:
        "Inspect and test application and API request behavior.",
    },
    {
      layer: "Mobile",
      technology: "MobSF",
      purpose:
        "Support Android static analysis and mobile security investigation.",
    },
    {
      layer: "Methodology",
      technology: "OWASP",
      purpose:
        "Provide structured application security testing references.",
    },
    {
      layer: "Weakness Mapping",
      technology: "CWE",
      purpose:
        "Classify and communicate technical weakness categories.",
    },
    {
      layer: "Mobile Framework",
      technology: "OWASP MASVS",
      purpose:
        "Provide mobile application security requirements and analysis context.",
    },
  ],
  currentState: [
    {
      label: "Research",
      value: "Ongoing",
    },
    {
      label: "Application Security",
      value: "Active focus",
    },
    {
      label: "Mobile Analysis",
      value: "Active focus",
    },
    {
      label: "Vulnerability Research",
      value: "Active focus",
    },
    {
      label: "Public Evidence",
      value: "Sanitized only",
    },
  ],
  next: [
    "Publish sanitized example findings",
    "Add API assessment case material",
    "Expand mobile lab evidence",
    "Connect research notes to defensive remediation",
  ],
  seo: {
    title:
      "Security Labs Research Case Study",
    description:
      "Security research dossier covering application security, VAPT, web and API security, mobile analysis, OWASP, Burp Suite, MobSF, CWE and MASVS.",
  },
};

