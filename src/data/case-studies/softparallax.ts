import type {
  CaseStudy,
} from "./types";

export const softparallaxCaseStudy: CaseStudy = {
  slug: "softparallax",
  code: "SP-04",
  name: "SoftParallax",
  type: "Web, Search and Digital Engineering",
  status: "Active",
  classification: "PUBLIC SEARCH ENGINEERING RECORD",
  accent: "violet",
  role:
    "Web technology, search engineering and digital optimization.",
  heroLine:
    "A web and search engineering surface where semantics, performance and discoverability are treated as implementation concerns.",
  intro: [
    "SoftParallax combines web technology, technical SEO, performance and search architecture.",
    "The work treats search visibility as an engineering outcome that depends on crawlability, semantic structure, metadata, structured data and page performance.",
    "AEO and GEO are considered extensions of clear information architecture rather than replacements for technical SEO fundamentals.",
  ],
  focus: [
    "Web Engineering",
    "Technical SEO",
    "Core Web Vitals",
    "Structured Data",
    "AEO",
    "GEO",
    "Semantic SEO",
    "Search Architecture",
    "Performance",
  ],
  problem: {
    headline:
      "Search visibility is affected by how the website is engineered, not only by what keywords it contains.",
    intro:
      "A technically weak page can make useful content difficult to crawl, interpret or deliver. The engineering surface therefore includes semantics, metadata, structured data, rendering and performance.",
    points: [
      "Semantic HTML helps define document meaning.",
      "Metadata frames how a page is described.",
      "Structured data can make entities and relationships clearer.",
      "Crawlability determines whether important pages can be discovered.",
      "Rendering choices affect what search systems can access.",
      "Internal linking and information architecture help connect related pages and distribute context.",
      "Performance influences the user experience and Core Web Vitals.",
      "AEO and GEO benefit from clear, factual and well structured content.",
    ],
    principle:
      "Search is an engineering system, not a keyword field.",
  },
  architecture: {
    headline:
      "Build the discovery path into the document architecture.",
    intro:
      "The search engineering model follows the path from content structure to machine interpretation and delivery performance.",
    flow: [
      "Content",
      "Semantic HTML",
      "Metadata",
      "Structured Data",
      "Internal Links",
      "Crawl and Render",
      "Performance",
      "Discovery",
    ],
    nodes: [
      {
        label: "Semantic Structure",
        detail:
          "Headings, landmarks and document relationships make content easier to interpret.",
      },
      {
        label: "Metadata",
        detail:
          "Titles, descriptions and canonical signals describe the page and its preferred URL.",
      },
      {
        label: "Structured Data",
        detail:
          "Machine readable entity and relationship data complements visible content.",
      },
      {
        label: "Crawlability",
        detail:
          "Robots, sitemap and internal routes determine how content can be discovered.",
      },
      {
        label: "Performance",
        detail:
          "Delivery and rendering quality affect user experience and Core Web Vitals.",
      },
      {
        label: "AEO and GEO",
        detail:
          "Clear factual answers and entity context support modern answer and generative discovery surfaces.",
      },
    ],
  },
  workflow: {
    headline:
      "Technical SEO begins before the audit report.",
    intro:
      "The workflow moves from information architecture into implementation, validation and performance instead of treating optimization as a final plugin step.",
    steps: [
      "Define Search Intent",
      "Structure Content",
      "Implement Metadata",
      "Add Structured Data",
      "Audit Internal Links",
      "Check Crawlability",
      "Measure Performance",
      "Validate Output",
    ],
  },
  decisions: [
    {
      title: "Visible Content First",
      decision:
        "Put important search intent into useful visible content before relying on metadata.",
      reason:
        "Metadata cannot compensate for a page that does not clearly explain its subject.",
      outcome:
        "Search intent remains aligned with the actual user experience.",
    },
    {
      title: "Structured Data as Context",
      decision:
        "Use structured data to describe real entities and relationships already supported by the page.",
      reason:
        "Schema should clarify content rather than invent claims.",
      outcome:
        "Machine readable context stays consistent with visible information.",
    },
    {
      title: "Performance as Search Engineering",
      decision:
        "Treat Core Web Vitals and delivery performance as part of the technical search surface.",
      reason:
        "Search optimization and user experience share the same rendered page.",
      outcome:
        "Performance work supports both usability and technical discoverability.",
    },
    {
      title: "AEO and GEO Through Clarity",
      decision:
        "Use concise factual sections, semantic structure and entity context to support answer and generative systems.",
      reason:
        "Modern discovery systems benefit from content that is easy to extract and understand.",
      outcome:
        "The page remains useful to people while becoming easier for machines to interpret.",
    },
  ],
  evidence: [
    {
      title: "Metadata Architecture",
      type: "Search Configuration",
      classification: "PUBLIC",
      summary:
        "Titles, descriptions, canonicals and social metadata are treated as part of the page architecture.",
      details: [
        "Title strategy",
        "Description",
        "Canonical",
        "Open Graph",
      ],
    },
    {
      title: "Structured Data",
      type: "Machine Readable Context",
      classification: "TECHNICAL",
      summary:
        "Structured data is designed around real page entities and visible content.",
      details: [
        "Person",
        "WebSite",
        "ProfilePage",
        "Entity relationships",
      ],
    },
    {
      title: "Crawl Surface",
      type: "Technical SEO",
      classification: "PUBLIC",
      summary:
        "Robots and sitemap behavior are part of the deployment checklist.",
      details: [
        "robots.txt",
        "sitemap.xml",
        "Canonical URLs",
        "Public route coverage",
      ],
    },
    {
      title: "Performance Evidence",
      type: "Measurement",
      classification: "PLANNED",
      summary:
        "PageSpeed and Core Web Vitals measurements can be attached after final production deployment.",
      details: [
        "LCP",
        "INP",
        "CLS",
        "Production PageSpeed",
      ],
    },
  ],
  stack: [
    {
      layer: "Web",
      technology: "Semantic Web Engineering",
      purpose:
        "Create accessible and interpretable document structure.",
    },
    {
      layer: "Search",
      technology: "Technical SEO",
      purpose:
        "Control crawlability, metadata and search architecture.",
    },
    {
      layer: "Entities",
      technology: "Structured Data",
      purpose:
        "Provide machine readable context for real page entities.",
    },
    {
      layer: "Performance",
      technology: "Core Web Vitals",
      purpose:
        "Measure important aspects of rendered user experience.",
    },
    {
      layer: "Discovery",
      technology: "AEO and GEO",
      purpose:
        "Support answer and generative discovery through clear structured content.",
    },
  ],
  currentState: [
    {
      label: "Project",
      value: "Active",
    },
    {
      label: "Technical SEO",
      value: "Core focus",
    },
    {
      label: "Structured Data",
      value: "Active focus",
    },
    {
      label: "Performance",
      value: "Active focus",
    },
    {
      label: "AEO and GEO",
      value: "Integrated direction",
    },
    {
      label: "Search Architecture",
      value: "Active focus",
    },
  ],
  next: [
    "Attach production PageSpeed evidence",
    "Document Core Web Vitals changes",
    "Publish selected structured data examples",
    "Expand search architecture case notes",
  ],
  seo: {
    title:
      "SoftParallax Search Engineering Case Study",
    description:
      "Technical case study covering web engineering, technical SEO, structured data, AEO, GEO, semantic SEO, Core Web Vitals and performance.",
  },
};

