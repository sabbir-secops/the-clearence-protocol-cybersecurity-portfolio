import {
  agedCaseStudy,
} from "./aged";
import {
  hostsecualCaseStudy,
} from "./hostsecual";
import {
  leemeoCaseStudy,
} from "./leemeo";
import {
  securityLabsCaseStudy,
} from "./security-labs";
import {
  softparallaxCaseStudy,
} from "./softparallax";

import type {
  CaseStudy,
} from "./types";

export const caseStudies: CaseStudy[] = [
  hostsecualCaseStudy,
  agedCaseStudy,
  leemeoCaseStudy,
  softparallaxCaseStudy,
  securityLabsCaseStudy,
];

export function getCaseStudy(
  slug: string
) {
  return caseStudies.find(
    (caseStudy) =>
      caseStudy.slug === slug
  );
}

export function getAdjacentCaseStudies(
  slug: string
) {
  const index =
    caseStudies.findIndex(
      (caseStudy) =>
        caseStudy.slug === slug
    );

  if (index < 0) {
    return {
      previous: undefined,
      next: undefined,
    };
  }

  const previous =
    caseStudies[
      (
        index -
        1 +
        caseStudies.length
      ) %
        caseStudies.length
    ];

  const next =
    caseStudies[
      (
        index +
        1
      ) %
        caseStudies.length
    ];

  return {
    previous,
    next,
  };
}

export type {
  CaseStudy,
} from "./types";
