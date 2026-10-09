import {
  clearanceEvidenceCatalog,
  type ClearanceEvidenceProjectSlug,
} from "@/data/clearance-evidence";

export type PublicBuildLogEntry = {
  id: string;
  phase: string;
  sourceTitle: string;
  title: string;
  summary: string;
  classification: "PUBLIC" | "TECHNICAL" | "SANITIZED" | "PLANNED";
};

type BuildLogDefinition = {
  id: string;
  phase: string;
  sourceTitle: string;
  title: string;
};

const buildLogDefinitions: Record<
  ClearanceEvidenceProjectSlug,
  BuildLogDefinition[]
> = {
  hostsecual: [
    {
      id: "foundation",
      phase: "Foundation",
      sourceTitle: "Infrastructure Layer Map",
      title: "Map the delivery chain",
    },
    {
      id: "environment",
      phase: "Environment",
      sourceTitle: "Server Environment Signals",
      title: "Define the operating surface",
    },
    {
      id: "delivery",
      phase: "Delivery",
      sourceTitle: "Transport and Naming",
      title: "Connect naming and transport",
    },
    {
      id: "next-record",
      phase: "Next Record",
      sourceTitle: "Operational Evidence",
      title: "Publish deeper operational evidence",
    },
  ],
  aged: [
    {
      id: "boundary-model",
      phase: "Boundaries",
      sourceTitle: "Tenant and Branch Permission Model",
      title: "Establish authorization scope",
    },
    {
      id: "backend-contract",
      phase: "Backend",
      sourceTitle: "Attendance API Surface",
      title: "Move lifecycle state behind APIs",
    },
    {
      id: "workflow-control",
      phase: "Workflow",
      sourceTitle: "Duty Workflow",
      title: "Connect duty controls",
    },
    {
      id: "data-relationship",
      phase: "Operations",
      sourceTitle: "Purchase to Finance Relationship",
      title: "Link operational records",
    },
    {
      id: "release-output",
      phase: "Delivery",
      sourceTitle: "Release Builds",
      title: "Produce release build outputs",
    },
    {
      id: "future-layer",
      phase: "Next Layer",
      sourceTitle: "Future Integration Layer",
      title: "Extend external integrations",
    },
  ],
  leemeo: [
    {
      id: "context",
      phase: "Context",
      sourceTitle: "Systems Thinking Model",
      title: "Connect product and operations",
    },
    {
      id: "architecture",
      phase: "Architecture",
      sourceTitle: "Architecture Notes",
      title: "Frame technical direction",
    },
    {
      id: "next-evidence",
      phase: "Next Record",
      sourceTitle: "Operational Outcomes",
      title: "Attach public operational evidence",
    },
  ],
  softparallax: [
    {
      id: "metadata",
      phase: "Metadata",
      sourceTitle: "Metadata Architecture",
      title: "Structure page identity",
    },
    {
      id: "structured-data",
      phase: "Machine Context",
      sourceTitle: "Structured Data",
      title: "Expose entity relationships",
    },
    {
      id: "crawl-surface",
      phase: "Discovery",
      sourceTitle: "Crawl Surface",
      title: "Control the crawl surface",
    },
    {
      id: "measurement",
      phase: "Measurement",
      sourceTitle: "Performance Evidence",
      title: "Attach production performance evidence",
    },
  ],
  "security-labs": [
    {
      id: "assessment-flow",
      phase: "Method",
      sourceTitle: "Web Application Assessment Flow",
      title: "Structure the assessment flow",
    },
    {
      id: "api-surface",
      phase: "API Surface",
      sourceTitle: "API Security Surface",
      title: "Inspect access boundaries",
    },
    {
      id: "mobile-analysis",
      phase: "Mobile",
      sourceTitle: "Android Analysis",
      title: "Extend analysis to Android",
    },
    {
      id: "tooling",
      phase: "Tooling",
      sourceTitle: "Testing Tooling",
      title: "Document the research toolchain",
    },
    {
      id: "reporting",
      phase: "Next Record",
      sourceTitle: "Finding Report",
      title: "Publish a sanitized finding model",
    },
  ],
};

export function getPublicBuildLog(
  project: ClearanceEvidenceProjectSlug
): PublicBuildLogEntry[] {
  const evidence = clearanceEvidenceCatalog[project].records;

  return buildLogDefinitions[project].flatMap((definition) => {
    const source = evidence.find(
      (record) => record.title === definition.sourceTitle
    );

    if (!source) {
      return [];
    }

    return [
      {
        ...definition,
        summary: source.summary,
        classification: source.classification,
      },
    ];
  });
}
