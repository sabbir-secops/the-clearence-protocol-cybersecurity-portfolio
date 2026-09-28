import type {
  CaseStudy,
} from "@/data/case-studies";

const PERSON_NAME =
  "Md. Sabbir Hossain";

const SITE_NAME =
  "The Clearance Protocol";

function getSiteOrigin() {
  const rawValue =
    process.env
      .NEXT_PUBLIC_SITE_URL
      ?.trim();

  if (!rawValue) {
    return undefined;
  }

  const value =
    rawValue.includes(":")
      ? rawValue
      : [
          "https:",
          "",
          rawValue,
        ].join("/");

  try {
    return new URL(
      value
    ).origin;
  } catch {
    return undefined;
  }
}

export default function CaseStructuredData({
  caseStudy,
}: {
  caseStudy: CaseStudy;
}) {
  const siteOrigin =
    getSiteOrigin();

  if (!siteOrigin) {
    return null;
  }

  const homeUrl =
    `${siteOrigin}/`;

  const pageUrl =
    `${siteOrigin}/archive/${caseStudy.slug}`;

  const archiveUrl =
    `${siteOrigin}/#archive`;

  const imageUrl =
    `${siteOrigin}/opengraph-image`;

  const graph = {
    "@context":
      "https://schema.org",
    "@graph": [
      {
        "@type":
          "WebPage",
        "@id":
          pageUrl,
        url:
          pageUrl,
        name:
          caseStudy.seo.title,
        description:
          caseStudy.seo.description,
        inLanguage:
          "en",
        isPartOf: {
          "@type":
            "WebSite",
          name:
            SITE_NAME,
          url:
            homeUrl,
        },
        mainEntity: {
          "@id":
            `${pageUrl}#case-study`,
        },
      },
      {
        "@type":
          "Article",
        "@id":
          `${pageUrl}#case-study`,
        headline:
          caseStudy.name,
        description:
          caseStudy.seo.description,
        image: [
          imageUrl,
        ],
        inLanguage:
          "en",
        articleSection:
          caseStudy.type,
        mainEntityOfPage: {
          "@id":
            pageUrl,
        },
        author: {
          "@type":
            "Person",
          name:
            PERSON_NAME,
          url:
            homeUrl,
        },
        publisher: {
          "@type":
            "Person",
          name:
            PERSON_NAME,
          url:
            homeUrl,
        },
        about:
          caseStudy.focus.map(
            (
              item
            ) => ({
              "@type":
                "Thing",
              name:
                item,
            })
          ),
        keywords:
          caseStudy.focus.join(
            ", "
          ),
        isAccessibleForFree:
          true,
      },
      {
        "@type":
          "BreadcrumbList",
        itemListElement: [
          {
            "@type":
              "ListItem",
            position:
              1,
            name:
              "Home",
            item:
              homeUrl,
          },
          {
            "@type":
              "ListItem",
            position:
              2,
            name:
              "Project Archive",
            item:
              archiveUrl,
          },
          {
            "@type":
              "ListItem",
            position:
              3,
            name:
              caseStudy.name,
            item:
              pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <script
      id={`case-structured-data-${caseStudy.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html:
          JSON.stringify(
            graph
          ).replace(
            /</g,
            "\\u003c"
          ),
      }}
    />
  );
}

