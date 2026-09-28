import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import DeepDiveShell from "@/components/deep-dive/deep-dive-shell";
import RestrictedCaseView from "@/components/deep-dive/restricted-case-view";
import {
  caseStudies,
  getAdjacentCaseStudies,
  getCaseStudy,
} from "@/data/case-studies";

type CasePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return [
    ...caseStudies.map(
      (
        caseStudy
      ) => ({
        slug: caseStudy.slug,
      })
    ),
    {
      slug: "s-01",
    },
  ];
}

export async function generateMetadata({
  params,
}: CasePageProps): Promise<Metadata> {
  const {
    slug,
  } =
    await params;

  if (
    slug === "s-01"
  ) {
    return {
      title:
        "S-01 | Restricted Case File",
      description:
        "Restricted case file inside The Clearance Protocol.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const caseStudy =
    getCaseStudy(
      slug
    );

  if (!caseStudy) {
    return {};
  }

  return {
    title:
      caseStudy.seo.title,
    description:
      caseStudy.seo.description,
    alternates: {
      canonical:
        `/archive/${caseStudy.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title:
        caseStudy.seo.title,
      description:
        caseStudy.seo.description,
      type: "article",
      url:
        `/archive/${caseStudy.slug}`,
      siteName:
        "The Clearance Protocol",
      images: [
        {
          url:
            "/opengraph-image",
          alt:
            `${caseStudy.name} technical case study`,
        },
      ],
    },
    twitter: {
      card:
        "summary_large_image",
      title:
        caseStudy.seo.title,
      description:
        caseStudy.seo.description,
      images: [
        "/opengraph-image",
      ],
    },
  };
}

export default async function CasePage({
  params,
}: CasePageProps) {
  const {
    slug,
  } =
    await params;

  if (
    slug === "s-01"
  ) {
    return (
      <RestrictedCaseView />
    );
  }

  const caseStudy =
    getCaseStudy(
      slug
    );

  if (!caseStudy) {
    notFound();
  }

  const {
    previous,
    next,
  } =
    getAdjacentCaseStudies(
      caseStudy.slug
    );

  return (
    <DeepDiveShell
      caseStudy={
        caseStudy
      }
      previous={
        previous
          ? {
              slug:
                previous.slug,
              code:
                previous.code,
              name:
                previous.name,
            }
          : undefined
      }
      next={
        next
          ? {
              slug:
                next.slug,
              code:
                next.code,
              name:
                next.name,
            }
          : undefined
      }
    />
  );
}

