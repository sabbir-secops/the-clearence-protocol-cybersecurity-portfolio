import type {
  CaseStudy,
} from "./types";

export const agedCaseStudy: CaseStudy = {
  slug: "aged",
  code: "A-02",
  name: "AGED Application System",
  type: "Multi Role Product Engineering",
  status: "In Development",
  classification: "PUBLIC TECHNICAL RECORD",
  accent: "cyan",
  role:
    "Product architecture, application development and system design.",
  heroLine:
    "A branch aware operational platform where identity, role, location and workflow all affect what the system allows.",
  intro: [
    "AGED is a multi role operational platform designed around shops, branches, staff and the workflows that connect daily operations.",
    "The system brings attendance, inventory, sales, purchasing, reporting and administrative control into one architecture instead of treating them as isolated screens.",
    "The central engineering problem is scope. A user must not only be authenticated. The system must understand which shop they belong to, which branch they are assigned to and which actions their role is allowed to perform.",
  ],
  focus: [
    "Multi Tenant Architecture",
    "Role Based Access Control",
    "Branch Isolation",
    "Flutter",
    "Operational Workflows",
    "Attendance",
    "Inventory",
    "Sales and Finance",
  ],
  problem: {
    headline:
      "Operational software becomes fragile when identity, scope and workflow are treated as separate concerns.",
    intro:
      "AGED is designed around the idea that every operational action belongs to a user, a role, a tenant and usually a branch. That relationship has to remain consistent from the interface to the backend.",
    points: [
      "Multiple shops can exist inside the same platform.",
      "Each shop can contain multiple branches.",
      "Owners, managers and staff require different visibility.",
      "Managers and staff must remain inside their assigned branch scope.",
      "Attendance depends on branch location and an active duty session.",
      "Closing duty can depend on a role specific operational report.",
      "Purchases, inventory and sales must preserve branch context.",
      "Owners need consolidated visibility without exposing one tenant to another.",
    ],
    principle:
      "Identity alone is not authorization. Role alone is not scope.",
  },
  architecture: {
    headline:
      "One operational system, multiple controlled boundaries.",
    intro:
      "The application is organized so that authentication establishes identity, the backend resolves scope and feature modules operate only inside that resolved context.",
    flow: [
      "Client",
      "Authentication",
      "Server Scope",
      "Feature API",
      "Branch Data",
      "Owner Reporting",
    ],
    nodes: [
      {
        label: "Tenant",
        detail:
          "The shop is the primary organizational boundary for normal users.",
      },
      {
        label: "Branch",
        detail:
          "Operational records remain connected to the branch where the work occurs.",
      },
      {
        label: "Role",
        detail:
          "Owner, manager and staff responsibilities produce different permissions and workflows.",
      },
      {
        label: "Duty Session",
        detail:
          "Attendance state connects location, time, verification and end of shift reporting.",
      },
      {
        label: "Operations",
        detail:
          "Inventory, sales and purchases feed branch level operational visibility.",
      },
      {
        label: "Finance",
        detail:
          "Owner reporting connects sales and purchase activity for comparison and decision support.",
      },
    ],
  },
  security: {
    headline:
      "Authorization is a server owned decision.",
    intro:
      "AGED treats tenant and branch boundaries as backend security rules. Normal users do not become authorized simply because a client sends a shop or branch identifier.",
    rules: [
      "Super Admin scope can span the system.",
      "Shop Owner or Shop Admin scope is limited to the authenticated shop and its branches.",
      "Manager scope is limited to the assigned branch.",
      "Staff scope is limited to the assigned branch and allowed role actions.",
      "Start Duty requires the assigned branch location and server side geofence validation.",
      "End Duty is blocked until the required role specific report exists for the same duty session and branch.",
    ],
  },
  workflow: {
    headline:
      "Duty completion is an operational workflow, not a single button.",
    intro:
      "Attendance is connected to location, verification and the employee responsibility that must be completed before the shift can close.",
    steps: [
      "Scheduled Shift",
      "Branch Location Check",
      "Live Verification",
      "Start Duty",
      "Operational Work",
      "Role Specific Report",
      "End Verification",
      "End Duty",
    ],
  },
  decisions: [
    {
      title: "Server Side Scope Enforcement",
      decision:
        "Resolve shop and branch scope from the authenticated profile instead of trusting ordinary client supplied scope.",
      reason:
        "Client controlled identifiers can be changed and must not become the source of authorization.",
      outcome:
        "Tenant and branch boundaries remain part of the backend security model.",
    },
    {
      title: "Role Specific Closing Reports",
      decision:
        "Require different closing evidence depending on the employee role.",
      reason:
        "A cashier, barista, chef and cleaner do not close a shift with the same operational responsibility.",
      outcome:
        "Duty completion becomes connected to the work that actually needs to be reported.",
    },
    {
      title: "Branch Aware Records",
      decision:
        "Keep operational records associated with the originating branch.",
      reason:
        "Inventory, sales, attendance, purchasing and finance lose meaning when branch context is detached.",
      outcome:
        "Owners can inspect branch specific data and consolidated shop level views without flattening the source context.",
    },
    {
      title: "Location Bound Attendance",
      decision:
        "Use the assigned branch location as part of Start Duty validation.",
      reason:
        "Attendance should represent presence at the operational location rather than only a successful client action.",
      outcome:
        "Duty state is tied to branch scope and physical attendance rules.",
    },
    {
      title: "Workflow Before Convenience",
      decision:
        "Block End Duty when required operational reporting is incomplete.",
      reason:
        "A convenient exit action should not bypass the reporting dependency that the business needs.",
      outcome:
        "The system preserves the operational sequence instead of leaving completion to memory.",
    },
  ],
  evidence: [
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
      details: [
        "Foodics",
        "Online ordering",
        "Loyalty",
        "POS",
        "Delivery tracking",
      ],
    },
  ],
  stack: [
    {
      layer: "Application",
      technology: "Flutter",
      purpose:
        "Cross platform mobile and web product interface.",
    },
    {
      layer: "Language",
      technology: "Dart",
      purpose:
        "Application implementation across the Flutter codebase.",
    },
    {
      layer: "State",
      technology: "Riverpod",
      purpose:
        "Application state and dependency organization.",
    },
    {
      layer: "Cloud",
      technology: "AWS",
      purpose:
        "Hosting, APIs and cloud infrastructure used by the production direction.",
    },
    {
      layer: "Web Delivery",
      technology: "AWS Amplify",
      purpose:
        "Deployment and hosting for the web build.",
    },
    {
      layer: "Location",
      technology: "AWS Location Service",
      purpose:
        "Location aware features and map related operational flows.",
    },
    {
      layer: "Security",
      technology: "Server Side Authorization",
      purpose:
        "Tenant, branch and role scope enforcement.",
    },
  ],
  currentState: [
    {
      label: "Product",
      value: "Active development",
    },
    {
      label: "Web Build",
      value: "Completed",
    },
    {
      label: "Android Release",
      value: "Built",
    },
    {
      label: "Multi Branch",
      value: "Core architecture present",
    },
    {
      label: "Authorization",
      value: "Server scoped model",
    },
    {
      label: "iOS",
      value: "Not yet built",
    },
    {
      label: "Production",
      value: "Preparing",
    },
    {
      label: "Languages",
      value: "English, Arabic and Bangla",
    },
  ],
  next: [
    "Foodics integration",
    "Online ordering",
    "Loyalty and coins",
    "POS expansion",
    "Delivery tracking",
    "Expanded finance and reporting",
  ],
  seo: {
    title:
      "AGED Application System Case Study",
    description:
      "Technical case study of AGED, a multi role and multi branch operational application focused on secure access, branch isolation, attendance, inventory, sales and product architecture.",
  },
};

