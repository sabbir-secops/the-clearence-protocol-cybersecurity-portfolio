const PERSON_NAME =
  "Md. Sabbir Hossain";

const SITE_NAME =
  "The Clearance Protocol";

const SITE_DESCRIPTION =
  "Md. Sabbir Hossain is a Bangladesh-based Cybersecurity Product Engineer, ethical hacker and penetration tester focused on AppSec, API security, VAPT and secure systems.";

const KNOWS_ABOUT = [
  "Cybersecurity",
  "Ethical Hacking",
  "Penetration Testing",
  "Application Security",
  "Web Security",
  "API Security",
  "Vulnerability Assessment",
  "VAPT",
  "Offensive Security",
  "Red Teaming",
  "Blue Team",
  "OSINT",
  "Open Source Intelligence",
  "Cyber Threat Intelligence",
  "Infrastructure Security",
  "Linux",
  "Secure Systems",
  "Product Engineering",
  "Web Engineering",
  "App Engineering",
  "Technical SEO",
  "Performance Engineering",
  "Security Research",
];

function getSiteUrl() {
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

export default function StructuredData() {
  const siteUrl =
    getSiteUrl();

  if (!siteUrl) {
    return null;
  }

  const personId =
    `${siteUrl}/#person`;

  const websiteId =
    `${siteUrl}/#website`;

  const profilePageId =
    `${siteUrl}/#profile`;

  const structuredData = {
    "@context":
      "https://schema.org",
    "@graph": [
      {
        "@type":
          "Person",
        "@id":
          personId,
        name:
          PERSON_NAME,
        alternateName: [
          "Md. Sabbir",
          "Sabbir Hossain",
          "Sabbir Hossain Simanto",
          "Sabbir BD",
          "Build With Sabbir",
        ],
        jobTitle:
          "Cybersecurity Product Engineer",
        description:
          SITE_DESCRIPTION,
        url:
          siteUrl,
        knowsAbout:
          KNOWS_ABOUT,
        mainEntityOfPage: {
          "@id":
            profilePageId,
        },
      },
      {
        "@type":
          "WebSite",
        "@id":
          websiteId,
        name:
          SITE_NAME,
        alternateName:
          "Build With Sabbir",
        url:
          siteUrl,
        description:
          SITE_DESCRIPTION,
        inLanguage:
          "en",
        author: {
          "@id":
            personId,
        },
      },
      {
        "@type":
          "ProfilePage",
        "@id":
          profilePageId,
        url:
          siteUrl,
        name:
          `${PERSON_NAME} | ${SITE_NAME}`,
        description:
          SITE_DESCRIPTION,
        inLanguage:
          "en",
        isPartOf: {
          "@id":
            websiteId,
        },
        mainEntity: {
          "@id":
            personId,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html:
          JSON.stringify(
            structuredData
          ).replace(
            /</g,
            "\\u003c"
          ),
      }}
    />
  );
}