import type { CaseEvidence } from "./case-studies/types";

export type ClearanceEvidenceProjectSlug =
  | "hostsecual"
  | "aged"
  | "leemeo"
  | "softparallax"
  | "security-labs";

export type ClearanceEvidenceRef = {
  project: ClearanceEvidenceProjectSlug;
  titles?: string[];
};

export type ClearanceEvidenceMetricKind =
  | "SCOPE"
  | "CONTROL"
  | "DELIVERY"
  | "SURFACE"
  | "MEASUREMENT";

export type ClearanceEvidenceMetricDefinition = {
  label: string;
  kind: ClearanceEvidenceMetricKind;
  sourceTitle: string;
  mode: "DETAIL_COUNT" | "TEXT";
  value?: string;
  suffix?: string;
  note: string;
};

export type ResolvedClearanceEvidenceMetric = {
  label: string;
  kind: ClearanceEvidenceMetricKind;
  value: string;
  note: string;
  sourceTitle: string;
  sourceClassification: CaseEvidence["classification"];
};

export type ClearanceEvidenceSummary = {
  currentRecords: number;
  plannedRecords: number;
  publicRecords: number;
  technicalRecords: number;
  sanitizedRecords: number;
};

export type ClearanceEvidenceDossier = {
  problem: string;
  role: string;
  engineering: string;
  security: string;
  stack: string[];
  outcome?: string;
};

type ClearanceEvidenceProject = {
  code: string;
  name: string;
  dossier: ClearanceEvidenceDossier;
  records: CaseEvidence[];
};

export type ResolvedClearanceEvidence = CaseEvidence & {
  project: ClearanceEvidenceProjectSlug;
  projectCode: string;
  projectName: string;
};

export const clearanceEvidenceCatalog: Record<
  ClearanceEvidenceProjectSlug,
  ClearanceEvidenceProject
> = {
  hostsecual: {
    code: "H-01",
    name: "HostSecual",
    dossier: {
      problem: "Hosting is a chain of dependencies, not a single server.",
      role: "Infrastructure, security and product focused technical work.",
      engineering: "Follow the request through the infrastructure layers.",
      security: "A hosting surface is only as strong as its exposed layers.",
      stack: ["Linux", "VPS", "DNS", "SSL and TLS", "Cloudflare", "NGINX and Apache"],
    },
    records: [
      {
        title: "Infrastructure Layer Map",
        type: "Architecture",
        classification: "SANITIZED",
        summary:
          "A public representation of the DNS, edge, TLS, web server and host relationships.",
        details: ["DNS", "Cloudflare", "TLS", "NGINX or Apache", "Linux host"],
      },
      {
        title: "Server Environment Signals",
        type: "Technical Surface",
        classification: "PUBLIC",
        summary:
          "The archive exposes the infrastructure technologies that define the current technical focus.",
        details: ["Linux", "VPS", "NGINX", "Apache", "Server Security"],
      },
      {
        title: "Transport and Naming",
        type: "Delivery Layer",
        classification: "PUBLIC",
        summary:
          "DNS and SSL or TLS are treated as part of reliable service delivery.",
        details: ["DNS routing", "TLS transport", "Public service delivery"],
      },
      {
        title: "Operational Evidence",
        type: "Future Case Material",
        classification: "PLANNED",
        summary:
          "Deeper configuration examples can be added when they can be safely sanitized for public disclosure.",
        details: ["Configuration patterns", "Performance observations", "Hardening notes"],
      },
    ],
  },
  aged: {
    code: "A-02",
    name: "AGED Application System",
    dossier: {
      problem: "Operational software becomes fragile when identity, scope and workflow are treated as separate concerns.",
      role: "Product architecture, application development and system design.",
      engineering: "One operational system, multiple controlled boundaries.",
      security: "Authorization is a server owned decision.",
      stack: ["Flutter", "Dart", "Riverpod", "AWS", "AWS Amplify", "AWS Location Service", "Server Side Authorization"],
      outcome: "The project has produced web and Android release build outputs during development.",
    },
    records: [
      {
        title: "Attendance API Surface",
        type: "Backend Contract",
        classification: "TECHNICAL",
        summary:
          "The attendance lifecycle is represented through dedicated backend routes rather than UI only state.",
        details: [
          "POST /attendance/start-duty",
          "POST /attendance/end-duty",
          "GET /attendance/current",
          "GET /attendance/history",
        ],
      },
      {
        title: "Tenant and Branch Permission Model",
        type: "Authorization Model",
        classification: "SANITIZED",
        summary:
          "The public case file exposes the scope model without publishing sensitive implementation detail.",
        details: [
          "Super Admin: system wide",
          "Shop Owner: own shop and branches",
          "Manager: assigned branch",
          "Staff: assigned branch and role permissions",
        ],
      },
      {
        title: "Duty Workflow",
        type: "Operational Flow",
        classification: "PUBLIC",
        summary:
          "The duty lifecycle demonstrates how location, verification and reporting dependencies connect.",
        details: [
          "Branch geofence",
          "Live photo verification",
          "Role report dependency",
          "Duty completion",
        ],
      },
      {
        title: "Release Builds",
        type: "Build Evidence",
        classification: "PUBLIC",
        summary:
          "The project has produced web and Android release build outputs during development.",
        details: [
          "Flutter web build",
          "Android release APK",
          "Responsive web interface",
          "Mobile application flow",
        ],
      },
      {
        title: "Purchase to Finance Relationship",
        type: "Data Relationship",
        classification: "TECHNICAL",
        summary:
          "Purchase activity is designed to feed financial visibility instead of becoming an isolated module.",
        details: [
          "Branch purchase context",
          "Owner notification",
          "Purchase totals",
          "Sales and cost comparison",
        ],
      },
      {
        title: "Future Integration Layer",
        type: "Roadmap",
        classification: "PLANNED",
        summary:
          "External operational integrations are being treated as system extensions rather than core authorization boundaries.",
        details: ["Foodics", "Online ordering", "Loyalty", "POS", "Delivery tracking"],
      },
    ],
  },
  leemeo: {
    code: "L-03",
    name: "Leemeo",
    dossier: {
      problem: "Business technology fails when the system and the operation evolve separately.",
      role: "Technology, product and operations focused involvement.",
      engineering: "Translate business context into technical direction.",
      security: "No separate public security claim is attached to this case file.",
      stack: ["Product Thinking", "Systems Thinking", "Digital Strategy", "System Architecture"],
    },
    records: [
      {
        title: "Systems Thinking Model",
        type: "Decision Framework",
        classification: "PUBLIC",
        summary:
          "The case study exposes the relationship between operations, product and technical execution.",
        details: ["Operational context", "Product need", "Technical direction", "Feedback"],
      },
      {
        title: "Architecture Notes",
        type: "Technical Documentation",
        classification: "SANITIZED",
        summary:
          "Only public technical framing is shown. Internal business details remain outside the case file.",
        details: ["System relationships", "Decision context", "Technical direction"],
      },
      {
        title: "Operational Outcomes",
        type: "Future Evidence",
        classification: "PLANNED",
        summary:
          "Additional evidence can be added when specific outcomes are suitable for public disclosure.",
        details: ["Process improvements", "System changes", "Product decisions"],
      },
    ],
  },
  softparallax: {
    code: "SP-04",
    name: "SoftParallax",
    dossier: {
      problem: "Search visibility is affected by how the website is engineered, not only by what keywords it contains.",
      role: "Web technology, search engineering and digital optimization.",
      engineering: "Build the discovery path into the document architecture.",
      security: "No separate public security claim is attached to this case file.",
      stack: ["Semantic Web Engineering", "Technical SEO", "Structured Data", "Core Web Vitals", "AEO and GEO"],
    },
    records: [
      {
        title: "Metadata Architecture",
        type: "Search Configuration",
        classification: "PUBLIC",
        summary:
          "Titles, descriptions, canonicals and social metadata are treated as part of the page architecture.",
        details: ["Title strategy", "Description", "Canonical", "Open Graph"],
      },
      {
        title: "Structured Data",
        type: "Machine Readable Context",
        classification: "TECHNICAL",
        summary:
          "Structured data is designed around real page entities and visible content.",
        details: ["Person", "WebSite", "ProfilePage", "Entity relationships"],
      },
      {
        title: "Crawl Surface",
        type: "Technical SEO",
        classification: "PUBLIC",
        summary:
          "Robots and sitemap behavior are part of the deployment checklist.",
        details: ["robots.txt", "sitemap.xml", "Canonical URLs", "Public route coverage"],
      },
      {
        title: "Performance Evidence",
        type: "Measurement",
        classification: "PLANNED",
        summary:
          "PageSpeed and Core Web Vitals measurements can be attached after final production deployment.",
        details: ["LCP", "INP", "CLS", "Production PageSpeed"],
      },
    ],
  },
  "security-labs": {
    code: "R-05",
    name: "Security Labs",
    dossier: {
      problem: "A security finding is useful only when it is understood, validated and communicated in context.",
      role: "Security testing, experimentation and technical investigation.",
      engineering: "Organize security research around the attack surface.",
      security: "Research is controlled by scope and evidence.",
      stack: ["Burp Suite", "MobSF", "OWASP", "CWE", "OWASP MASVS"],
    },
    records: [
      {
        title: "Web Application Assessment Flow",
        type: "Methodology",
        classification: "PUBLIC",
        summary:
          "A sanitized workflow for moving from reconnaissance into validated application findings.",
        details: ["Attack surface", "Authentication", "Authorization", "Business logic", "Validation"],
      },
      {
        title: "API Security Surface",
        type: "Assessment Area",
        classification: "TECHNICAL",
        summary:
          "API testing focuses on endpoint behavior and access boundaries rather than only response codes.",
        details: ["Authentication", "Authorization", "Access control", "Request behavior"],
      },
      {
        title: "Android Analysis",
        type: "Mobile Security",
        classification: "TECHNICAL",
        summary:
          "Mobile research uses static analysis and mobile security concepts to inspect application packages.",
        details: ["MobSF", "APK analysis", "OWASP MASVS", "WebView security", "CWE mapping"],
      },
      {
        title: "Testing Tooling",
        type: "Research Tooling",
        classification: "PUBLIC",
        summary:
          "Tools are documented as part of the workflow, not as proof of skill by themselves.",
        details: ["Burp Suite", "MobSF", "OWASP references", "CWE"],
      },
      {
        title: "Finding Report",
        type: "Evidence Model",
        classification: "PLANNED",
        summary:
          "Future public lab entries can include fully sanitized example findings and remediation context.",
        details: ["Finding", "Evidence", "CWE context", "Impact", "Remediation"],
      },
    ],
  },
};

const clearanceEvidenceMetricDefinitions: Record<
  ClearanceEvidenceProjectSlug,
  ClearanceEvidenceMetricDefinition[]
> = {
  hostsecual: [
    {
      label: "Disclosed infrastructure layers",
      kind: "SURFACE",
      sourceTitle: "Infrastructure Layer Map",
      mode: "DETAIL_COUNT",
      suffix: "layers",
      note: "Counted from the sanitized infrastructure layer map disclosed in the case file.",
    },
    {
      label: "Server environment signals",
      kind: "SURFACE",
      sourceTitle: "Server Environment Signals",
      mode: "DETAIL_COUNT",
      suffix: "signals",
      note: "Counted from the public server environment signals attached to the case file.",
    },
    {
      label: "Delivery controls",
      kind: "CONTROL",
      sourceTitle: "Transport and Naming",
      mode: "DETAIL_COUNT",
      suffix: "controls",
      note: "Counted from the disclosed DNS, TLS and service-delivery controls.",
    },
  ],
  aged: [
    {
      label: "Attendance lifecycle routes",
      kind: "SURFACE",
      sourceTitle: "Attendance API Surface",
      mode: "DETAIL_COUNT",
      suffix: "routes",
      note: "Counted directly from the disclosed attendance backend contract.",
    },
    {
      label: "Authorization scopes",
      kind: "CONTROL",
      sourceTitle: "Tenant and Branch Permission Model",
      mode: "DETAIL_COUNT",
      suffix: "scopes",
      note: "Counted from the sanitized role and scope model disclosed in the case file.",
    },
    {
      label: "Duty workflow controls",
      kind: "CONTROL",
      sourceTitle: "Duty Workflow",
      mode: "DETAIL_COUNT",
      suffix: "controls",
      note: "Counted from the public duty lifecycle evidence record.",
    },
    {
      label: "Release build targets",
      kind: "DELIVERY",
      sourceTitle: "Release Builds",
      mode: "TEXT",
      value: "Web + Android",
      note: "The public build record explicitly discloses web and Android release outputs.",
    },
  ],
  leemeo: [
    {
      label: "Systems thinking stages",
      kind: "SCOPE",
      sourceTitle: "Systems Thinking Model",
      mode: "DETAIL_COUNT",
      suffix: "stages",
      note: "Counted from the public operations-to-technology decision model.",
    },
    {
      label: "Architecture note areas",
      kind: "SURFACE",
      sourceTitle: "Architecture Notes",
      mode: "DETAIL_COUNT",
      suffix: "areas",
      note: "Counted from the sanitized technical documentation record.",
    },
  ],
  softparallax: [
    {
      label: "Metadata architecture elements",
      kind: "SURFACE",
      sourceTitle: "Metadata Architecture",
      mode: "DETAIL_COUNT",
      suffix: "elements",
      note: "Counted from the public metadata architecture record.",
    },
    {
      label: "Structured data elements",
      kind: "SURFACE",
      sourceTitle: "Structured Data",
      mode: "DETAIL_COUNT",
      suffix: "elements",
      note: "Counted from the technical structured-data record.",
    },
    {
      label: "Crawl surface controls",
      kind: "CONTROL",
      sourceTitle: "Crawl Surface",
      mode: "DETAIL_COUNT",
      suffix: "controls",
      note: "Counted from the public crawl and deployment checklist record.",
    },
    {
      label: "Production performance metrics",
      kind: "MEASUREMENT",
      sourceTitle: "Performance Evidence",
      mode: "TEXT",
      value: "Pending public measurement",
      note: "The source record is PLANNED, so no performance score is presented as current evidence.",
    },
  ],
  "security-labs": [
    {
      label: "Web assessment areas",
      kind: "SCOPE",
      sourceTitle: "Web Application Assessment Flow",
      mode: "DETAIL_COUNT",
      suffix: "areas",
      note: "Counted from the public web application assessment flow.",
    },
    {
      label: "API assessment areas",
      kind: "SCOPE",
      sourceTitle: "API Security Surface",
      mode: "DETAIL_COUNT",
      suffix: "areas",
      note: "Counted from the technical API security surface record.",
    },
    {
      label: "Android analysis areas",
      kind: "SCOPE",
      sourceTitle: "Android Analysis",
      mode: "DETAIL_COUNT",
      suffix: "areas",
      note: "Counted from the technical mobile analysis record.",
    },
    {
      label: "Research tooling references",
      kind: "SURFACE",
      sourceTitle: "Testing Tooling",
      mode: "DETAIL_COUNT",
      suffix: "references",
      note: "Counted from the public tooling record; tooling is not treated as proof by itself.",
    },
  ],
};

export function getProjectEvidenceSummary(
  project: ClearanceEvidenceProjectSlug
): ClearanceEvidenceSummary {
  const records = clearanceEvidenceCatalog[project].records;

  return {
    currentRecords: records.filter((record) => record.classification !== "PLANNED").length,
    plannedRecords: records.filter((record) => record.classification === "PLANNED").length,
    publicRecords: records.filter((record) => record.classification === "PUBLIC").length,
    technicalRecords: records.filter((record) => record.classification === "TECHNICAL").length,
    sanitizedRecords: records.filter((record) => record.classification === "SANITIZED").length,
  };
}

export function getProjectEvidenceMetrics(
  project: ClearanceEvidenceProjectSlug
): ResolvedClearanceEvidenceMetric[] {
  const records = clearanceEvidenceCatalog[project].records;

  return clearanceEvidenceMetricDefinitions[project]
    .map((definition) => {
      const source = records.find((record) => record.title === definition.sourceTitle);
      if (!source) return null;

      const value =
        definition.mode === "DETAIL_COUNT"
          ? `${source.details.length} ${definition.suffix ?? "items"}`
          : definition.value ?? "Disclosed";

      return {
        label: definition.label,
        kind: definition.kind,
        value,
        note: definition.note,
        sourceTitle: source.title,
        sourceClassification: source.classification,
      };
    })
    .filter((metric): metric is ResolvedClearanceEvidenceMetric => Boolean(metric));
}

export function isClearanceEvidenceProjectSlug(
  value: string
): value is ClearanceEvidenceProjectSlug {
  return Object.prototype.hasOwnProperty.call(clearanceEvidenceCatalog, value);
}

export function getProjectEvidence(project: ClearanceEvidenceProjectSlug): CaseEvidence[] {
  return clearanceEvidenceCatalog[project].records;
}

export function getProjectEvidenceDossier(
  project: ClearanceEvidenceProjectSlug
): ClearanceEvidenceDossier {
  return clearanceEvidenceCatalog[project].dossier;
}

export function resolveClearanceEvidence(
  refs: ClearanceEvidenceRef[]
): ResolvedClearanceEvidence[] {
  const resolved: ResolvedClearanceEvidence[] = [];
  const seen = new Set<string>();

  for (const ref of refs) {
    const project = clearanceEvidenceCatalog[ref.project];
    const selected = ref.titles
      ? ref.titles.map((title) => project.records.find((record) => record.title === title)).filter(
          (record): record is CaseEvidence => Boolean(record)
        )
      : project.records;

    for (const record of selected) {
      const key = `${ref.project}:${record.title}`;
      if (seen.has(key)) continue;
      seen.add(key);
      resolved.push({
        ...record,
        project: ref.project,
        projectCode: project.code,
        projectName: project.name,
      });
    }
  }

  return resolved;
}

export const capabilityEvidenceRefs: Record<string, ClearanceEvidenceRef[]> = {
  security: [
    {
      project: "security-labs",
      titles: [
        "Web Application Assessment Flow",
        "API Security Surface",
        "Android Analysis",
        "Testing Tooling",
      ],
    },
    { project: "aged", titles: ["Tenant and Branch Permission Model"] },
  ],
  infrastructure: [{ project: "hostsecual", titles: ["Infrastructure Layer Map", "Server Environment Signals", "Transport and Naming"] }],
  product: [
    { project: "aged", titles: ["Tenant and Branch Permission Model", "Duty Workflow", "Purchase to Finance Relationship"] },
    { project: "leemeo", titles: ["Systems Thinking Model", "Architecture Notes"] },
  ],
  engineering: [
    { project: "aged", titles: ["Attendance API Surface", "Release Builds", "Purchase to Finance Relationship"] },
    { project: "softparallax", titles: ["Metadata Architecture", "Structured Data", "Crawl Surface"] },
  ],
  search: [{ project: "softparallax" }],
  research: [{ project: "security-labs" }],
};

export const securityEvidenceRefs: Record<string, ClearanceEvidenceRef[]> = {
  application: [
    { project: "security-labs", titles: ["Web Application Assessment Flow", "API Security Surface"] },
    { project: "aged", titles: ["Tenant and Branch Permission Model"] },
  ],
  vulnerability: [
    { project: "security-labs", titles: ["Web Application Assessment Flow", "Testing Tooling", "Finding Report"] },
  ],
  mobile: [{ project: "security-labs", titles: ["Android Analysis", "Testing Tooling"] }],
  infrastructure: [
    { project: "hostsecual", titles: ["Infrastructure Layer Map", "Server Environment Signals", "Transport and Naming"] },
  ],
  network: [],
  intelligence: [],
};

export const infrastructureEvidenceRefs: Record<string, ClearanceEvidenceRef[]> = {
  client: [{ project: "aged", titles: ["Release Builds"] }],
  dns: [{ project: "hostsecual", titles: ["Infrastructure Layer Map", "Transport and Naming"] }],
  edge: [{ project: "hostsecual", titles: ["Infrastructure Layer Map", "Transport and Naming"] }],
  defense: [],
  server: [{ project: "hostsecual", titles: ["Infrastructure Layer Map", "Server Environment Signals", "Transport and Naming"] }],
  container: [],
  application: [{ project: "aged", titles: ["Attendance API Surface", "Tenant and Branch Permission Model"] }],
  data: [{ project: "aged", titles: ["Tenant and Branch Permission Model", "Purchase to Finance Relationship"] }],
};

export const searchEvidenceRefs: Record<string, ClearanceEvidenceRef[]> = {
  performance: [{ project: "softparallax", titles: ["Performance Evidence"] }],
  vitals: [{ project: "softparallax", titles: ["Performance Evidence"] }],
  technical: [{ project: "softparallax", titles: ["Metadata Architecture", "Crawl Surface"] }],
  architecture: [{ project: "softparallax", titles: ["Metadata Architecture", "Crawl Surface"] }],
  structured: [{ project: "softparallax", titles: ["Structured Data"] }],
  semantic: [],
  aeo: [],
  geo: [],
};
