import { getProjectEvidence } from "../clearance-evidence";
import type { CaseStudy } from "./types";

export const hostsecualCaseStudy: CaseStudy = {
  slug: "hostsecual",
  code: "H-01",
  name: "HostSecual",
  type: "Security First Infrastructure",
  status: "Active",
  classification: "PUBLIC INFRASTRUCTURE RECORD",
  accent: "blue",
  role:
    "Infrastructure, security and product focused technical work.",
  heroLine:
    "A hosting focused technology initiative exploring how infrastructure, server configuration, delivery and security fit into one operational surface.",
  intro: [
    "HostSecual sits at the intersection of hosting infrastructure, server environments, deployment, performance and security aware architecture.",
    "The project is less about treating hosting as a commodity and more about understanding the layers that carry a request from DNS and transport security into a configured server environment.",
    "The case file documents the technical areas being explored without exposing sensitive infrastructure details.",
  ],
  focus: [
    "Hosting Architecture",
    "Linux",
    "VPS",
    "DNS",
    "SSL and TLS",
    "Cloudflare",
    "NGINX",
    "Apache",
    "Server Security",
    "Web Performance",
  ],
  problem: {
    headline:
      "Hosting is a chain of dependencies, not a single server.",
    intro:
      "A public service can fail through naming, transport, edge configuration, web server behavior, server access or performance. The project treats these as connected infrastructure concerns.",
    points: [
      "DNS has to route traffic to the intended service.",
      "TLS has to protect transport between users and the service.",
      "Edge services can affect security, caching and delivery.",
      "Web server configuration influences routing and application exposure.",
      "Linux and VPS administration create an operational trust boundary.",
      "Performance depends on more than application code.",
      "Cloudflare edge configuration can affect origin exposure, caching and request behavior.",
      "Security decisions must remain compatible with reliable delivery.",
    ],
    principle:
      "Infrastructure is part of the product surface.",
  },
  architecture: {
    headline:
      "Follow the request through the infrastructure layers.",
    intro:
      "The public architecture model focuses on the path a request takes without revealing host addresses, private network details or administrative credentials.",
    flow: [
      "DNS",
      "Edge",
      "TLS",
      "Web Server",
      "Hosted Service",
      "Response",
    ],
    nodes: [
      {
        label: "DNS",
        detail:
          "Naming and routing establish where public traffic should resolve.",
      },
      {
        label: "Cloudflare",
        detail:
          "Edge controls can participate in delivery, protection and request handling.",
      },
      {
        label: "TLS",
        detail:
          "Transport encryption protects the public connection to the service.",
      },
      {
        label: "NGINX",
        detail:
          "A web server layer can handle routing, proxy behavior and delivery concerns.",
      },
      {
        label: "Apache",
        detail:
          "Alternative server environments remain part of the hosting knowledge surface.",
      },
      {
        label: "Linux and VPS",
        detail:
          "The host operating environment forms a critical administrative and security boundary.",
      },
    ],
  },
  security: {
    headline:
      "A hosting surface is only as strong as its exposed layers.",
    intro:
      "The security direction focuses on reducing unnecessary exposure, protecting transport and treating administrative access as a higher trust boundary than ordinary application traffic.",
    rules: [
      "Public DNS should expose only the records needed for service delivery.",
      "TLS configuration belongs to the security model, not only the browser experience.",
      "Web server behavior should avoid unnecessary exposure.",
      "Administrative server access requires a smaller trust surface.",
      "Edge controls should complement, not replace, origin security.",
      "Performance changes should not silently weaken security boundaries.",
    ],
  },
  workflow: {
    headline:
      "Infrastructure work follows the request path.",
    intro:
      "The project is organized around understanding where a request enters, how it is transported, which server layer handles it and how the response is delivered.",
    steps: [
      "Resolve DNS",
      "Reach Edge",
      "Establish TLS",
      "Route Request",
      "Serve Application",
      "Inspect Performance",
      "Review Security Surface",
    ],
  },
  decisions: [
    {
      title: "Layered Hosting Model",
      decision:
        "Treat DNS, edge, transport, web server and host environment as separate but connected layers.",
      reason:
        "A single hosting label hides the boundaries where configuration and security failures actually occur.",
      outcome:
        "Infrastructure analysis becomes easier to reason about and document.",
    },
    {
      title: "Security Aware Delivery",
      decision:
        "Evaluate hosting changes together with their security and performance impact.",
      reason:
        "Faster delivery is not useful if it creates a weaker operational boundary.",
      outcome:
        "Performance and security remain part of the same engineering decision.",
    },
    {
      title: "Server Environment Literacy",
      decision:
        "Maintain working knowledge across Linux, VPS, NGINX and Apache environments.",
      reason:
        "Hosting problems often cross application and server boundaries.",
      outcome:
        "Troubleshooting can follow the full request path instead of stopping at the application.",
    },
    {
      title: "Sanitized Public Architecture",
      decision:
        "Keep infrastructure diagrams useful without publishing sensitive host details.",
      reason:
        "A portfolio should demonstrate architecture without turning production infrastructure into reconnaissance material.",
      outcome:
        "The case study can show engineering depth while preserving operational discretion.",
    },
  ],
  evidence: getProjectEvidence("hostsecual"),
  stack: [
    {
      layer: "Host",
      technology: "Linux",
      purpose:
        "Server operating environment and administration.",
    },
    {
      layer: "Compute",
      technology: "VPS",
      purpose:
        "Hosted server environments.",
    },
    {
      layer: "Naming",
      technology: "DNS",
      purpose:
        "Public service resolution and routing.",
    },
    {
      layer: "Transport",
      technology: "SSL and TLS",
      purpose:
        "Encrypted public connections.",
    },
    {
      layer: "Edge",
      technology: "Cloudflare",
      purpose:
        "Edge delivery and security aware request handling.",
    },
    {
      layer: "Web Server",
      technology: "NGINX and Apache",
      purpose:
        "Request serving, routing and hosting configuration.",
    },
  ],
  currentState: [
    {
      label: "Project",
      value: "Active",
    },
    {
      label: "Focus",
      value: "Infrastructure and hosting",
    },
    {
      label: "Security",
      value: "Integrated into architecture",
    },
    {
      label: "Performance",
      value: "Active technical concern",
    },
    {
      label: "Public Detail",
      value: "Sanitized",
    },
  ],
  next: [
    "Expand sanitized architecture evidence",
    "Document performance observations",
    "Add server hardening case notes",
    "Connect hosting decisions to measurable outcomes",
  ],
  seo: {
    title:
      "HostSecual Infrastructure Case Study",
    description:
      "Technical case study of HostSecual covering hosting architecture, Linux, VPS, DNS, TLS, Cloudflare, server security, NGINX, Apache and web performance.",
  },
};

