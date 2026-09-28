import type {
  CaseStudy,
} from "./types";

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
    flow: [
      "Target Context",
      "Recon",
      "Attack Surface",
      "Testing",
      "Validation",
      "Mapping",
      "Risk Context",
      "Reporting",
    ],
    nodes: [
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
    ],
  },
  security: {
    headline:
      "Research is controlled by scope and evidence.",
    intro:
      "The public lab model is built around authorized or self controlled testing contexts. The portfolio documents methodology without publishing harmful target specific detail.",
    rules: [
      "Define scope before testing.",
      "Do not treat automated output as a confirmed vulnerability.",
      "Validate behavior before documenting a finding.",
      "Separate evidence from assumptions.",
      "Map technical weaknesses using established terminology where useful.",
      "Keep private target details and credentials out of public case material.",
    ],
  },
  workflow: {
    headline:
      "Move from understanding to validation before reporting.",
    intro:
      "The workflow is deliberately evidence driven. Each stage should answer a technical question before the next stage adds more interpretation.",
    steps: [
      "Understand Target",
      "Reconnaissance",
      "Map Attack Surface",
      "Test Behavior",
      "Validate Finding",
      "Map CWE or Framework",
      "Add Risk Context",
      "Report",
    ],
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
  evidence: [
    {
      title: "Web Application Assessment Flow",
      type: "Methodology",
      classification: "PUBLIC",
      summary:
        "A sanitized workflow for moving from reconnaissance into validated application findings.",
      details: [
        "Attack surface",
        "Authentication",
        "Authorization",
        "Business logic",
        "Validation",
      ],
    },
    {
      title: "API Security Surface",
      type: "Assessment Area",
      classification: "TECHNICAL",
      summary:
        "API testing focuses on endpoint behavior and access boundaries rather than only response codes.",
      details: [
        "Authentication",
        "Authorization",
        "Access control",
        "Request behavior",
      ],
    },
    {
      title: "Android Analysis",
      type: "Mobile Security",
      classification: "TECHNICAL",
      summary:
        "Mobile research uses static analysis and mobile security concepts to inspect application packages.",
      details: [
        "MobSF",
        "APK analysis",
        "OWASP MASVS",
        "WebView security",
        "CWE mapping",
      ],
    },
    {
      title: "Testing Tooling",
      type: "Research Tooling",
      classification: "PUBLIC",
      summary:
        "Tools are documented as part of the workflow, not as proof of skill by themselves.",
      details: [
        "Burp Suite",
        "MobSF",
        "OWASP references",
        "CWE",
      ],
    },
    {
      title: "Finding Report",
      type: "Evidence Model",
      classification: "PLANNED",
      summary:
        "Future public lab entries can include fully sanitized example findings and remediation context.",
      details: [
        "Finding",
        "Evidence",
        "CWE context",
        "Impact",
        "Remediation",
      ],
    },
  ],
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

