const PERSON_NAME =
  "Md. Sabbir Hossain";

const SITE_NAME =
  "The Clearance Protocol";

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

  const personData = {
    "@context":
      "https://schema.org",
    "@type":
      "Person",
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
    url:
      siteUrl,
  };

  const websiteData = {
    "@context":
      "https://schema.org",
    "@type":
      "WebSite",
    name:
      SITE_NAME,
    alternateName:
      "Build With Sabbir",
    url:
      siteUrl,
    description:
      "A cybersecurity portfolio experience by Md. Sabbir Hossain.",
    author: {
      "@type":
        "Person",
      name:
        PERSON_NAME,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              personData
            ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              websiteData
            ),
        }}
      />
    </>
  );
}
