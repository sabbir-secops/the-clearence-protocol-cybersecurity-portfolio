import type {
  MetadataRoute,
} from "next";

import {
  caseStudies,
} from "@/data/case-studies";

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

export default function sitemap():
  MetadataRoute.Sitemap {
  const siteOrigin =
    getSiteOrigin();

  if (!siteOrigin) {
    return [];
  }

  return [
    {
      url:
        siteOrigin,
    },
    ...caseStudies.map(
      (
        caseStudy
      ) => ({
        url:
          `${siteOrigin}/archive/${caseStudy.slug}`,
      })
    ),
  ];
}


