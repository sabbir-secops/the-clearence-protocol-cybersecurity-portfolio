import Link from "next/link";

import ActiveCaseNav from "@/components/deep-dive/active-case-nav";
import CaseStructuredData from "@/components/deep-dive/case-structured-data";

import type {
  CaseStudy,
} from "@/data/case-studies";

type CaseLink = {
  slug: string;
  code: string;
  name: string;
};

type DeepDiveShellProps = {
  caseStudy: CaseStudy;
  previous?: CaseLink;
  next?: CaseLink;
};

const accentClasses = {
  cyan: {
    text: "text-cyan-200",
    border: "border-cyan-300/30",
    borderStrong:
      "border-cyan-300/45",
    bg: "bg-cyan-300/[0.055]",
    dot: "bg-cyan-300",
    glow:
      "bg-cyan-300/[0.07]",
    ring:
      "focus-visible:ring-cyan-300/70",
    line: "bg-cyan-300/35",
    shadow:
      "shadow-[0_0_18px_rgba(85,221,255,0.24)]",
  },
  blue: {
    text: "text-sky-200",
    border: "border-sky-300/30",
    borderStrong:
      "border-sky-300/45",
    bg: "bg-sky-300/[0.055]",
    dot: "bg-sky-300",
    glow:
      "bg-sky-300/[0.07]",
    ring:
      "focus-visible:ring-sky-300/70",
    line: "bg-sky-300/35",
    shadow:
      "shadow-[0_0_18px_rgba(31,113,148,0.28)]",
  },
  violet: {
    text: "text-violet-200",
    border:
      "border-violet-300/30",
    borderStrong:
      "border-violet-300/45",
    bg:
      "bg-violet-300/[0.055]",
    dot: "bg-violet-300",
    glow:
      "bg-violet-300/[0.07]",
    ring:
      "focus-visible:ring-violet-300/70",
    line: "bg-violet-300/35",
    shadow:
      "shadow-[0_0_18px_rgba(120,109,255,0.26)]",
  },
  white: {
    text: "text-slate-100",
    border: "border-white/20",
    borderStrong:
      "border-white/35",
    bg: "bg-white/[0.045]",
    dot: "bg-white",
    glow: "bg-white/[0.05]",
    ring:
      "focus-visible:ring-white/60",
    line: "bg-white/25",
    shadow:
      "shadow-[0_0_18px_rgba(223,248,255,0.16)]",
  },
} as const;


const caseVisuals: Record<
  string,
  {
    system: string;
    route: string;
    signature: string;
  }
> = {
  aged: {
    system:
      "PRODUCT SYSTEM | BRANCH CONTROL",
    route:
      "IDENTITY TO OPERATION",
    signature:
      "MULTI TENANT | ROLE AWARE",
  },
  hostsecual: {
    system:
      "INFRASTRUCTURE ROUTE | TRUST BOUNDARY",
    route:
      "REQUEST TO RESPONSE",
    signature:
      "HOSTING | SECURITY | DELIVERY",
  },
  leemeo: {
    system:
      "OPERATIONS SYSTEM | PRODUCT CONTEXT",
    route:
      "CONTEXT TO EXECUTION",
    signature:
      "TECHNOLOGY | PRODUCT | OPERATIONS",
  },
  softparallax: {
    system:
      "SEARCH SIGNAL | DISCOVERY ARCHITECTURE",
    route:
      "CONTENT TO DISCOVERY",
    signature:
      "WEB | SEARCH | PERFORMANCE",
  },
  "security-labs": {
    system:
      "RESEARCH DOSSIER | EVIDENCE MODE",
    route:
      "SURFACE TO FINDING",
    signature:
      "ASSESS | VALIDATE | REPORT",
  },
};

function getBalancedFourColumnSpan(
  index: number,
  total: number
) {
  const remainder =
    total % 4;

  if (
    remainder === 0 ||
    index <
      total -
        remainder
  ) {
    return "xl:col-span-3";
  }

  if (remainder === 1) {
    return "xl:col-span-12";
  }

  if (remainder === 2) {
    return "xl:col-span-6";
  }

  return "xl:col-span-4";
}

function isBalancedFourColumnRowEnd(
  index: number,
  total: number
) {
  const remainder =
    total % 4;

  const fullCount =
    remainder === 0
      ? total
      : total -
        remainder;

  if (
    index <
      fullCount
  ) {
    return (
      (index + 1) %
        4 ===
      0
    );
  }

  return (
    index ===
      total - 1
  );
}

function getBalancedThreeColumnSpan(
  index: number,
  total: number
) {
  const remainder =
    total % 3;

  if (
    remainder === 0 ||
    index <
      total -
        remainder
  ) {
    return "xl:col-span-4";
  }

  if (remainder === 1) {
    return "xl:col-span-12";
  }

  return "xl:col-span-6";
}

function getBalancedTwoColumnSpan(
  index: number,
  total: number
) {
  const lastItem =
    index ===
      total - 1;

  if (
    total % 2 === 1 &&
    lastItem
  ) {
    return "lg:col-span-12";
  }

  return "lg:col-span-6";
}

function SectionHeading({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: string;
}) {
  return (
    <div
      className="
        mb-8
        grid
        min-w-0
        gap-4
        lg:grid-cols-[180px_minmax(0,1fr)]
        lg:items-start
      "
    >
      <p className="system-label">
        {index} | {label}
      </p>

      <h2
        className="
          max-w-[900px]
          text-[30px]
          font-semibold
          leading-[1.04]
          tracking-[-0.045em]
          text-[#eef5f8]
          sm:text-[38px]
          lg:text-[48px]
        "
      >
        {title}
      </h2>
    </div>
  );
}

function ClassificationBadge({
  value,
}: {
  value: string;
}) {
  const warning =
    value === "SANITIZED" ||
    value === "PLANNED";

  return (
    <span
      className={`
        inline-flex
        rounded-full
        border
        px-2.5
        py-1.5
        font-mono
        text-[9px]
        font-semibold
        tracking-[0.11em]
        uppercase

        ${
          warning
            ? "border-amber-300/25 bg-amber-300/[0.05] text-amber-200"
            : "border-cyan-300/20 bg-cyan-300/[0.045] text-cyan-200"
        }
      `}
    >
      {value}
    </span>
  );
}

export default function DeepDiveShell({
  caseStudy,
  previous,
  next,
}: DeepDiveShellProps) {
  const accent =
    accentClasses[
      caseStudy.accent
    ];

  const navigation: Array<
    [string, string]
  > = [
    ["overview", "Overview"],
    ["problem", "Problem"],
    ["architecture", "Architecture"],
    ...(caseStudy.security
      ? [["security", "Security"] as [string, string]]
      : []),
    ["workflow", "Workflow"],
    ["decisions", "Decisions"],
    ["evidence", "Evidence"],
    ["status", "Status"],
  ];

  const visualMode =
    caseVisuals[
      caseStudy.slug
    ] ?? {
      system:
        "PUBLIC TECHNICAL RECORD",
      route:
        "SYSTEM ROUTE",
      signature:
        "ARCHITECTURE | EVIDENCE",
    };

  return (
    <div
      className="
        min-h-screen
        min-w-0
        overflow-x-clip
        bg-[#080b0f]
        text-[#e9f1f7]
      "
    >
      <CaseStructuredData
        caseStudy={caseStudy}
      />

      <header
        className="
          sticky
          top-0
          z-50
          border-b
          border-white/[0.08]
          bg-[#080b0f]/92
          backdrop-blur-xl
        "
      >
        <div
          className="
            container-shell
            flex
            min-h-[68px]
            items-center
            justify-between
            gap-4
          "
        >
          <Link
            href="/#archive"
            className={`
              inline-flex
              min-h-[44px]
              items-center
              rounded-full
              font-mono
              text-[10px]
              font-semibold
              tracking-[0.12em]
              text-[#a8b4bd]
              uppercase
              outline-none
              transition
              hover:text-cyan-100
              focus-visible:ring-2
              ${accent.ring}
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#080b0f]
            `}
          >
            ← Return to Archive
          </Link>

          <div
            className="
              hidden
              min-w-0
              items-center
              gap-3
              sm:flex
            "
          >
            <span
              className={`
                h-2
                w-2
                rounded-full
                ${accent.dot}
              `}
            />

            <span className="tiny-mono">
              Case File {caseStudy.code}
            </span>
          </div>
        </div>
      </header>

      <main>
        <section
          id="overview"
          data-deep-section
          data-section-id="overview"
          className="
            relative
            scroll-mt-32
            motion-safe:transition-colors
            motion-safe:duration-500
            data-[active=true]:bg-white/[0.008]
            overflow-hidden
            border-b
            border-white/[0.08]
            py-20
            sm:py-24
            lg:py-28
            xl:py-32
          "
        >
          <div
            aria-hidden="true"
            className={`
              pointer-events-none
              absolute
              left-1/2
              top-[-220px]
              h-[760px]
              w-[760px]
              -translate-x-1/2
              rounded-full
              blur-[170px]
              ${accent.glow}
            `}
          />

          <div
            className="
              container-shell
              relative
              z-10
            "
          >
            <div
              className="
                grid
                min-w-0
                gap-10
                lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]
                lg:items-end
              "
            >
              <div className="min-w-0">
                <nav
                  aria-label="Breadcrumb"
                  className="
                    mb-7
                    flex
                    flex-wrap
                    items-center
                    gap-2
                    font-mono
                    text-[9px]
                    font-semibold
                    tracking-[0.10em]
                    text-[#7f8c94]
                    uppercase
                  "
                >
                  <Link
                    href="/"
                    className={`
                      rounded
                      outline-none
                      transition
                      hover:text-[#eef5f8]
                      focus-visible:ring-2
                      ${accent.ring}
                    `}
                  >
                    Home
                  </Link>

                  <span
                    aria-hidden="true"
                    className="text-white/20"
                  >
                    /
                  </span>

                  <Link
                    href="/#archive"
                    className={`
                      rounded
                      outline-none
                      transition
                      hover:text-[#eef5f8]
                      focus-visible:ring-2
                      ${accent.ring}
                    `}
                  >
                    Project Archive
                  </Link>

                  <span
                    aria-hidden="true"
                    className="text-white/20"
                  >
                    /
                  </span>

                  <span
                    aria-current="page"
                    className={accent.text}
                  >
                    {caseStudy.code}
                  </span>
                </nav>

                <p
                  className={`
                    font-mono
                    text-[10px]
                    font-semibold
                    tracking-[0.14em]
                    uppercase
                    sm:text-[11px]
                    ${accent.text}
                  `}
                >
                  Clearance Granted | {caseStudy.classification}
                </p>

                <p
                  className="
                    mt-7
                    font-mono
                    text-[11px]
                    tracking-[0.13em]
                    text-[#81909a]
                    uppercase
                  "
                >
                  {caseStudy.code} | {caseStudy.type}
                </p>

                <h1
                  className="
                    mt-5
                    max-w-[980px]
                    break-words
                    text-[44px]
                    font-semibold
                    leading-[0.94]
                    tracking-[-0.06em]
                    text-[#f2f8fb]
                    sm:text-[62px]
                    lg:text-[82px]
                    xl:text-[96px]
                  "
                >
                  {caseStudy.name}
                </h1>

                <p
                  className="
                    mt-7
                    max-w-[800px]
                    text-[19px]
                    leading-8
                    text-[#b7c2c9]
                    sm:text-[22px]
                    sm:leading-9
                  "
                >
                  {caseStudy.heroLine}
                </p>
              </div>

              <aside
                className={`
                  min-w-0
                  rounded-[24px]
                  border
                  bg-[#0b1016]/90
                  p-5
                  sm:p-6
                  ${accent.border}
                `}
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                >
                  <span className="tiny-mono">
                    Case State
                  </span>

                  <span
                    className={`
                      h-2
                      w-2
                      rounded-full
                      ${accent.dot}
                    `}
                  />
                </div>

                <p
                  className={`
                    mt-5
                    text-[13px]
                    font-semibold
                    tracking-[0.10em]
                    uppercase
                    ${accent.text}
                  `}
                >
                  {caseStudy.status}
                </p>

                <div
                  className={`
                    mt-5
                    rounded-[14px]
                    border
                    px-4
                    py-3
                    ${accent.border}
                    ${accent.bg}
                  `}
                >
                  <p
                    className={`
                      font-mono
                      text-[9px]
                      font-semibold
                      tracking-[0.10em]
                      uppercase
                      ${accent.text}
                    `}
                  >
                    {visualMode.system}
                  </p>

                  <p
                    className="
                      mt-2
                      font-mono
                      text-[9px]
                      tracking-[0.09em]
                      text-[#7f8c94]
                      uppercase
                    "
                  >
                    {visualMode.signature}
                  </p>
                </div>

                <div
                  className="
                    mt-6
                    border-t
                    border-white/[0.09]
                    pt-5
                  "
                >
                  <p className="tiny-mono">
                    Role | Contribution
                  </p>

                  <p
                    className="
                      mt-3
                      text-[15px]
                      leading-7
                      text-[#c1cbd0]
                    "
                  >
                    {caseStudy.role}
                  </p>
                </div>
              </aside>
            </div>

            <div
              className="
                mt-14
                grid
                min-w-0
                gap-4
                md:grid-cols-2
              "
            >
              {caseStudy.intro.map(
                (
                  paragraph
                ) => (
                  <p
                    key={paragraph}
                    className="
                      text-[16px]
                      leading-8
                      text-[#a8b4bd]
                    "
                  >
                    {paragraph}
                  </p>
                )
              )}
            </div>

            <div
              className="
                mt-10
                flex
                flex-wrap
                gap-2
              "
            >
              {caseStudy.focus.map(
                (
                  item
                ) => (
                  <span
                    key={item}
                    className={`
                      rounded-full
                      border
                      px-3
                      py-2
                      text-[10px]
                      font-semibold
                      tracking-[0.08em]
                      uppercase
                      ${accent.border}
                      ${accent.bg}
                      ${accent.text}
                    `}
                  >
                    {item}
                  </span>
                )
              )}
            </div>

            <section
              aria-labelledby={`${caseStudy.slug}-case-summary`}
              className="
                mt-12
                rounded-[24px]
                border
                border-white/[0.10]
                bg-[#0a0f15]/92
                p-5
                sm:p-6
                lg:p-7
              "
            >
              <div
                className="
                  grid
                  min-w-0
                  gap-6
                  lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]
                "
              >
                <div className="min-w-0">
                  <p className="system-label">
                    Public Case Summary | Direct Answers
                  </p>

                  <h2
                    id={`${caseStudy.slug}-case-summary`}
                    className="
                      mt-4
                      max-w-[560px]
                      text-[28px]
                      font-semibold
                      leading-[1.08]
                      tracking-[-0.04em]
                      text-[#eef5f8]
                      sm:text-[34px]
                    "
                  >
                    What this system is and why it exists.
                  </h2>

                  <dl
                    className="
                      mt-7
                      grid
                      gap-4
                      sm:grid-cols-2
                    "
                  >
                    <div>
                      <dt className="tiny-mono">
                        Status
                      </dt>
                      <dd
                        className={`
                          mt-2
                          text-[14px]
                          font-medium
                          ${accent.text}
                        `}
                      >
                        {caseStudy.status}
                      </dd>
                    </div>

                    <div>
                      <dt className="tiny-mono">
                        Type
                      </dt>
                      <dd
                        className="
                          mt-2
                          text-[14px]
                          leading-6
                          text-[#c5cfd4]
                        "
                      >
                        {caseStudy.type}
                      </dd>
                    </div>

                    <div className="sm:col-span-2">
                      <dt className="tiny-mono">
                        Contribution
                      </dt>
                      <dd
                        className="
                          mt-2
                          text-[14px]
                          leading-6
                          text-[#c5cfd4]
                        "
                      >
                        {caseStudy.role}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div
                  className="
                    grid
                    min-w-0
                    gap-4
                  "
                >
                  <article
                    className="
                      rounded-[18px]
                      border
                      border-white/[0.09]
                      bg-white/[0.025]
                      p-5
                    "
                  >
                    <h3
                      className="
                        text-[16px]
                        font-semibold
                        text-[#eef5f8]
                      "
                    >
                      What is {caseStudy.name}?
                    </h3>

                    <p
                      className="
                        mt-3
                        text-[14px]
                        leading-7
                        text-[#aeb9c0]
                      "
                    >
                      {caseStudy.intro[0]}
                    </p>
                  </article>

                  <article
                    className="
                      rounded-[18px]
                      border
                      border-white/[0.09]
                      bg-white/[0.025]
                      p-5
                    "
                  >
                    <h3
                      className="
                        text-[16px]
                        font-semibold
                        text-[#eef5f8]
                      "
                    >
                      What problem does {caseStudy.name} address?
                    </h3>

                    <p
                      className={`
                        mt-3
                        text-[14px]
                        font-medium
                        leading-7
                        ${accent.text}
                      `}
                    >
                      {caseStudy.problem.headline}
                    </p>

                    <p
                      className="
                        mt-2
                        text-[14px]
                        leading-7
                        text-[#aeb9c0]
                      "
                    >
                      {caseStudy.problem.intro}
                    </p>
                  </article>
                </div>
              </div>
            </section>
          </div>
        </section>

        <ActiveCaseNav
          items={navigation}
          accent={caseStudy.accent}
          caseCode={caseStudy.code}
        />

        <section
          id="problem"
          data-deep-section
          data-section-id="problem"
          className="
            scroll-mt-32
            motion-safe:transition-colors
            motion-safe:duration-500
            data-[active=true]:bg-white/[0.008]
            border-b
            border-white/[0.08]
            py-20
            sm:py-24
            lg:py-28
          "
        >
          <div className="container-shell">
            <SectionHeading
              index="01"
              label="Problem"
              title={
                caseStudy.problem
                  .headline
              }
            />

            <div
              className="
                grid
                min-w-0
                gap-6
                lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]
              "
            >
              <div
                className="
                  rounded-[22px]
                  border
                  border-white/[0.10]
                  bg-[#0b1016]
                  p-5
                  sm:p-6
                "
              >
                <p
                  className="
                    text-[16px]
                    leading-8
                    text-[#b7c1c7]
                  "
                >
                  {caseStudy.problem.intro}
                </p>

                <div
                  className={`
                    mt-7
                    rounded-[16px]
                    border
                    p-4
                    ${accent.border}
                    ${accent.bg}
                  `}
                >
                  <p className="tiny-mono">
                    Working Principle
                  </p>

                  <p
                    className={`
                      mt-3
                      text-[16px]
                      font-medium
                      leading-7
                      ${accent.text}
                    `}
                  >
                    {caseStudy.problem.principle}
                  </p>
                </div>
              </div>

              <div
                className="
                  grid
                  min-w-0
                  grid-cols-12
                  gap-3
                "
              >
                {caseStudy.problem.points.map(
                  (
                    point,
                    index
                  ) => (
                    <div
                      key={point}
                      className={`
                        col-span-12
                        rounded-[18px]
                        border
                        border-white/[0.10]
                        bg-[#0d141b]
                        p-5
                        sm:col-span-6
                        ${getBalancedFourColumnSpan(
                          index,
                          caseStudy.problem.points.length
                        )}
                      `}
                    >
                      <span className="tiny-mono">
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <p
                        className="
                          mt-4
                          text-[14px]
                          leading-6
                          text-[#c1cbd0]
                        "
                      >
                        {point}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <section
          id="architecture"
          data-deep-section
          data-section-id="architecture"
          className="
            scroll-mt-32
            motion-safe:transition-colors
            motion-safe:duration-500
            data-[active=true]:bg-white/[0.008]
            border-b
            border-white/[0.08]
            py-20
            sm:py-24
            lg:py-28
          "
        >
          <div className="container-shell">
            <SectionHeading
              index="02"
              label="Architecture"
              title={
                caseStudy.architecture
                  .headline
              }
            />

            <p
              className="
                max-w-[780px]
                text-[16px]
                leading-8
                text-[#a8b4bd]
              "
            >
              {caseStudy.architecture.intro}
            </p>

            <div
              className={`
                mt-10
                rounded-[24px]
                border
                bg-[#091017]
                p-4
                sm:p-5
                lg:p-6
                ${accent.border}
              `}
            >
              <div
                className="
                  mb-5
                  flex
                  flex-wrap
                  items-center
                  justify-between
                  gap-3
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <span
                    aria-hidden="true"
                    className={`
                      h-2
                      w-2
                      rounded-full
                      ${accent.dot}
                      ${accent.shadow}
                    `}
                  />

                  <p
                    className={`
                      font-mono
                      text-[10px]
                      font-semibold
                      tracking-[0.11em]
                      uppercase
                      ${accent.text}
                    `}
                  >
                    System Route | {visualMode.route}
                  </p>
                </div>

                <p className="tiny-mono">
                  {String(
                    caseStudy.architecture.flow.length
                  ).padStart(
                    2,
                    "0"
                  )} Nodes | Public View
                </p>
              </div>

              <ol
                className="
                  grid
                  min-w-0
                  grid-cols-12
                  gap-3
                "
              >
                {caseStudy.architecture.flow.map(
                  (
                    step,
                    index
                  ) => {
                    const isRowEnd =
                      isBalancedFourColumnRowEnd(
                        index,
                        caseStudy.architecture.flow.length
                      );

                    return (
                      <li
                        key={step}
                        className={`
                          relative
                          col-span-12
                          min-h-[118px]
                          rounded-[18px]
                          border
                          bg-[#0c1218]
                          p-4
                          sm:col-span-6
                          ${getBalancedFourColumnSpan(
                            index,
                            caseStudy.architecture.flow.length
                          )}
                          ${accent.border}
                        `}
                      >
                        <div
                          className="
                            flex
                            items-center
                            justify-between
                            gap-4
                          "
                        >
                          <span className="tiny-mono">
                            FLOW {String(
                              index + 1
                            ).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <span
                            aria-hidden="true"
                            className={`
                              h-2.5
                              w-2.5
                              shrink-0
                              rounded-full
                              border
                              border-white/25
                              ${accent.dot}
                              ${accent.shadow}
                            `}
                          />
                        </div>

                        <p
                          className="
                            mt-6
                            text-[14px]
                            font-semibold
                            leading-6
                            text-[#eef5f8]
                          "
                        >
                          {step}
                        </p>

                        {index <
                          caseStudy.architecture.flow.length -
                            1 && (
                          <span
                            aria-hidden="true"
                            className={`
                              absolute
                              bottom-[-13px]
                              left-[21px]
                              h-[13px]
                              w-px
                              sm:hidden
                              ${accent.line}
                            `}
                          />
                        )}

                        {!isRowEnd &&
                          index <
                            caseStudy.architecture.flow.length -
                              1 && (
                            <span
                              aria-hidden="true"
                              className={`
                                absolute
                                right-[-13px]
                                top-1/2
                                hidden
                                h-px
                                w-[13px]
                                -translate-y-1/2
                                xl:block
                                ${accent.line}
                              `}
                            />
                          )}
                      </li>
                    );
                  }
                )}
              </ol>
            </div>

            <div
              className="
                mt-6
                grid
                min-w-0
                grid-cols-12
                gap-4
              "
            >
              {caseStudy.architecture.nodes.map(
                (
                  node,
                  index
                ) => (
                  <article
                    key={node.label}
                    className={`
                      col-span-12
                      rounded-[20px]
                      border
                      border-white/[0.10]
                      bg-[#0b1016]
                      p-5
                      md:col-span-6
                      ${getBalancedThreeColumnSpan(
                        index,
                        caseStudy.architecture.nodes.length
                      )}
                    `}
                  >
                    <p
                      className={`
                        font-mono
                        text-[10px]
                        font-semibold
                        tracking-[0.11em]
                        uppercase
                        ${accent.text}
                      `}
                    >
                      {node.label}
                    </p>

                    <p
                      className="
                        mt-4
                        text-[14px]
                        leading-7
                        text-[#aeb9c0]
                      "
                    >
                      {node.detail}
                    </p>
                  </article>
                )
              )}
            </div>
          </div>
        </section>

        {caseStudy.security && (
          <section
            id="security"
            data-deep-section
            data-section-id="security"
            className="
              scroll-mt-32
              motion-safe:transition-colors
              motion-safe:duration-500
              data-[active=true]:bg-white/[0.008]
              border-b
              border-white/[0.08]
              py-20
              sm:py-24
              lg:py-28
            "
          >
            <div className="container-shell">
              <SectionHeading
                index="03"
                label="Security"
                title={
                  caseStudy.security
                    .headline
                }
              />

              <div
                className="
                  grid
                  min-w-0
                  gap-6
                  lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]
                "
              >
                <p
                  className="
                    text-[16px]
                    leading-8
                    text-[#a8b4bd]
                  "
                >
                  {caseStudy.security.intro}
                </p>

                <div
                  className="
                    grid
                    min-w-0
                    gap-3
                    sm:grid-cols-2
                  "
                >
                  {caseStudy.security.rules.map(
                    (
                      rule,
                      index
                    ) => (
                      <div
                        key={rule}
                        className={`
                          rounded-[18px]
                          border
                          p-5
                          ${accent.border}
                          ${accent.bg}
                        `}
                      >
                        <span className="tiny-mono">
                          CONTROL {String(
                            index + 1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <p
                          className="
                            mt-4
                            text-[14px]
                            leading-7
                            text-[#d0d8dc]
                          "
                        >
                          {rule}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        <section
          id="workflow"
          data-deep-section
          data-section-id="workflow"
          className="
            scroll-mt-32
            motion-safe:transition-colors
            motion-safe:duration-500
            data-[active=true]:bg-white/[0.008]
            border-b
            border-white/[0.08]
            py-20
            sm:py-24
            lg:py-28
          "
        >
          <div className="container-shell">
            <SectionHeading
              index={
                caseStudy.security
                  ? "04"
                  : "03"
              }
              label="Workflow"
              title={
                caseStudy.workflow
                  .headline
              }
            />

            <p
              className="
                max-w-[780px]
                text-[16px]
                leading-8
                text-[#a8b4bd]
              "
            >
              {caseStudy.workflow.intro}
            </p>

            <ol
              className="
                mt-10
                grid
                min-w-0
                grid-cols-12
                gap-3
              "
            >
              {caseStudy.workflow.steps.map(
                (
                  step,
                  index
                ) => (
                  <li
                    key={step}
                    className={`
                      col-span-12
                      rounded-[18px]
                      border
                      border-white/[0.10]
                      bg-[#0d141b]
                      p-5
                      sm:col-span-6
                      ${getBalancedFourColumnSpan(
                        index,
                        caseStudy.workflow.steps.length
                      )}
                    `}
                  >
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-4
                      "
                    >
                      <span className="tiny-mono">
                        STEP
                      </span>

                      <span
                        className={`
                          font-mono
                          text-[10px]
                          font-semibold
                          ${accent.text}
                        `}
                      >
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>
                    </div>

                    <p
                      className="
                        mt-7
                        text-[15px]
                        font-semibold
                        leading-6
                        text-[#eef5f8]
                      "
                    >
                      {step}
                    </p>
                  </li>
                )
              )}
            </ol>
          </div>
        </section>

        <section
          id="decisions"
          data-deep-section
          data-section-id="decisions"
          className="
            scroll-mt-32
            motion-safe:transition-colors
            motion-safe:duration-500
            data-[active=true]:bg-white/[0.008]
            border-b
            border-white/[0.08]
            py-20
            sm:py-24
            lg:py-28
          "
        >
          <div className="container-shell">
            <SectionHeading
              index={
                caseStudy.security
                  ? "05"
                  : "04"
              }
              label="Engineering Decisions"
              title="The technical choice matters less without the reason behind it."
            />

            <div
              className="
                grid
                min-w-0
                grid-cols-12
                gap-4
              "
            >
              {caseStudy.decisions.map(
                (
                  decision,
                  index
                ) => (
                  <article
                    key={decision.title}
                    className={`
                      col-span-12
                      rounded-[22px]
                      border
                      border-white/[0.10]
                      bg-[#0b1016]
                      p-5
                      sm:p-6
                      ${getBalancedTwoColumnSpan(
                        index,
                        caseStudy.decisions.length
                      )}
                    `}
                  >
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-4
                      "
                    >
                      <p
                        className={`
                          font-mono
                          text-[10px]
                          font-semibold
                          tracking-[0.11em]
                          uppercase
                          ${accent.text}
                        `}
                      >
                        Decision {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </p>

                      <span
                        className={`
                          h-2
                          w-2
                          rounded-full
                          ${accent.dot}
                        `}
                      />
                    </div>

                    <h3
                      className="
                        mt-5
                        text-[22px]
                        font-semibold
                        tracking-[-0.025em]
                        text-[#eef5f8]
                      "
                    >
                      {decision.title}
                    </h3>

                    <div
                      className="
                        mt-6
                        grid
                        gap-5
                      "
                    >
                      <div>
                        <p className="tiny-mono">
                          Decision
                        </p>
                        <p
                          className="
                            mt-2
                            text-[14px]
                            leading-7
                            text-[#c2cbd0]
                          "
                        >
                          {decision.decision}
                        </p>
                      </div>

                      <div>
                        <p className="tiny-mono">
                          Why
                        </p>
                        <p
                          className="
                            mt-2
                            text-[14px]
                            leading-7
                            text-[#a8b4bd]
                          "
                        >
                          {decision.reason}
                        </p>
                      </div>

                      <div
                        className={`
                          rounded-[14px]
                          border
                          p-4
                          ${accent.border}
                          ${accent.bg}
                        `}
                      >
                        <p className="tiny-mono">
                          Outcome
                        </p>
                        <p
                          className="
                            mt-2
                            text-[14px]
                            leading-7
                            text-[#d0d8dc]
                          "
                        >
                          {decision.outcome}
                        </p>
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>
          </div>
        </section>

        <section
          id="evidence"
          data-deep-section
          data-section-id="evidence"
          className="
            scroll-mt-32
            motion-safe:transition-colors
            motion-safe:duration-500
            data-[active=true]:bg-white/[0.008]
            border-b
            border-white/[0.08]
            py-20
            sm:py-24
            lg:py-28
          "
        >
          <div className="container-shell">
            <SectionHeading
              index={
                caseStudy.security
                  ? "06"
                  : "05"
              }
              label="Evidence"
              title="Inspect what can be disclosed."
            />

            <div
              className="
                grid
                min-w-0
                grid-cols-12
                gap-4
              "
            >
              {caseStudy.evidence.map(
                (
                  item,
                  index
                ) => (
                  <details
                    key={item.title}
                    className={`
                      group
                      col-span-12
                      overflow-hidden
                      rounded-[20px]
                      border
                      border-white/[0.10]
                      bg-[#0b1016]
                      transition-colors
                      hover:border-white/[0.16]
                      open:border-white/[0.20]
                      open:bg-[#0c1218]
                      ${getBalancedTwoColumnSpan(
                        index,
                        caseStudy.evidence.length
                      )}
                    `}
                  >
                    <summary
                      className={`
                        flex
                        min-h-[88px]
                        cursor-pointer
                        list-none
                        items-center
                        justify-between
                        gap-5
                        p-5
                        outline-none
                        focus-visible:ring-2
                        sm:p-6
                        ${accent.ring}
                      `}
                    >
                      <div className="min-w-0">
                        <div
                          className="
                            flex
                            flex-wrap
                            items-center
                            gap-2
                          "
                        >
                          <span className="tiny-mono">
                            Evidence {String(
                              index + 1
                            ).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <ClassificationBadge
                            value={
                              item.classification
                            }
                          />
                        </div>

                        <h3
                          className="
                            mt-3
                            text-[18px]
                            font-semibold
                            text-[#eef5f8]
                          "
                        >
                          {item.title}
                        </h3>

                        <p
                          className="
                            mt-2
                            font-mono
                            text-[9px]
                            tracking-[0.10em]
                            text-[#7f8c94]
                            uppercase
                          "
                        >
                          {item.type}
                        </p>
                      </div>

                      <div
                        className="
                          flex
                          shrink-0
                          items-center
                          gap-3
                        "
                      >
                        <span
                          className="
                            hidden
                            font-mono
                            text-[8px]
                            font-semibold
                            tracking-[0.10em]
                            text-[#7f8c94]
                            uppercase
                            sm:inline
                            group-open:hidden
                          "
                        >
                          Open Record
                        </span>

                        <span
                          className="
                            hidden
                            font-mono
                            text-[8px]
                            font-semibold
                            tracking-[0.10em]
                            text-[#9faab1]
                            uppercase
                            group-open:sm:inline
                          "
                        >
                          Close Record
                        </span>

                        <span
                          aria-hidden="true"
                          className={`
                            text-[20px]
                            transition-transform
                            duration-300
                            group-open:rotate-45
                            ${accent.text}
                          `}
                        >
                          +
                        </span>
                      </div>
                    </summary>

                    <div
                      className="
                        border-t
                        border-white/[0.08]
                        px-5
                        pb-5
                        pt-5
                        sm:px-6
                        sm:pb-6
                      "
                    >
                      <div
                        className="
                          mb-4
                          flex
                          flex-wrap
                          items-center
                          justify-between
                          gap-3
                        "
                      >
                        <p className="tiny-mono">
                          Record Summary
                        </p>

                        <span
                          className={`
                            h-1.5
                            w-10
                            rounded-full
                            ${accent.line}
                          `}
                        />
                      </div>

                      <p
                        className="
                          text-[14px]
                          leading-7
                          text-[#aeb9c0]
                        "
                      >
                        {item.summary}
                      </p>

                      <ul
                        className="
                          mt-5
                          grid
                          gap-2
                        "
                      >
                        {item.details.map(
                          (
                            detail
                          ) => (
                            <li
                              key={detail}
                              className="
                                rounded-[12px]
                                border
                                border-white/[0.08]
                                bg-white/[0.025]
                                px-4
                                py-3
                                break-words
                                font-mono
                                text-[10px]
                                leading-5
                                text-[#b8c3c9]
                                [overflow-wrap:anywhere]
                              "
                            >
                              {detail}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </details>
                )
              )}
            </div>

            <div
              className="
                mt-10
                overflow-hidden
                rounded-[22px]
                border
                border-white/[0.10]
                bg-[#0b1016]
              "
            >
              <div
                className="
                  border-b
                  border-white/[0.09]
                  p-5
                  sm:p-6
                "
              >
                <p className="system-label">
                  Technology | Purpose
                </p>
              </div>

              <div>
                {caseStudy.stack.map(
                  (
                    item
                  ) => (
                    <div
                      key={`${item.layer}-${item.technology}`}
                      className="
                        grid
                        min-w-0
                        gap-3
                        border-b
                        border-white/[0.07]
                        p-5
                        last:border-b-0
                        sm:p-6
                        md:grid-cols-[160px_220px_minmax(0,1fr)]
                        md:items-start
                      "
                    >
                      <p className="tiny-mono">
                        {item.layer}
                      </p>

                      <p
                        className="
                          text-[14px]
                          font-semibold
                          text-[#eef5f8]
                        "
                      >
                        {item.technology}
                      </p>

                      <p
                        className="
                          text-[14px]
                          leading-6
                          text-[#a8b4bd]
                        "
                      >
                        {item.purpose}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <section
          id="status"
          data-deep-section
          data-section-id="status"
          className="
            scroll-mt-32
            motion-safe:transition-colors
            motion-safe:duration-500
            data-[active=true]:bg-white/[0.008]
            py-20
            sm:py-24
            lg:py-28
          "
        >
          <div className="container-shell">
            <SectionHeading
              index={
                caseStudy.security
                  ? "07"
                  : "06"
              }
              label="Current State"
              title="The case file ends where the next iteration begins."
            />

            <div
              className="
                grid
                min-w-0
                gap-5
                lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)]
              "
            >
              <div
                className="
                  grid
                  min-w-0
                  grid-cols-12
                  gap-3
                "
              >
                {caseStudy.currentState.map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      key={item.label}
                      className={`
                        col-span-12
                        rounded-[18px]
                        border
                        border-white/[0.10]
                        bg-[#0d141b]
                        p-5
                        sm:col-span-6
                        ${getBalancedFourColumnSpan(
                          index,
                          caseStudy.currentState.length
                        )}
                      `}
                    >
                      <p className="tiny-mono">
                        {item.label}
                      </p>

                      <p
                        className="
                          mt-3
                          text-[15px]
                          font-medium
                          text-[#eef5f8]
                        "
                      >
                        {item.value}
                      </p>
                    </div>
                  )
                )}
              </div>

              <aside
                className={`
                  rounded-[22px]
                  border
                  p-5
                  sm:p-6
                  ${accent.borderStrong}
                  ${accent.bg}
                `}
              >
                <p
                  className={`
                    font-mono
                    text-[10px]
                    font-semibold
                    tracking-[0.12em]
                    uppercase
                    ${accent.text}
                  `}
                >
                  Next System Iteration
                </p>

                <ul
                  className="
                    mt-5
                    grid
                    gap-3
                  "
                >
                  {caseStudy.next.map(
                    (
                      item
                    ) => (
                      <li
                        key={item}
                        className="
                          border-b
                          border-white/[0.09]
                          pb-3
                          text-[14px]
                          leading-6
                          text-[#d0d8dc]
                          last:border-b-0
                          last:pb-0
                        "
                      >
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </aside>
            </div>

            <div
              className="
                mt-14
                border-t
                border-white/[0.09]
                pt-8
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-6
                  lg:flex-row
                  lg:items-end
                  lg:justify-between
                "
              >
                <div>
                  <p className="system-label">
                    Case File End
                  </p>

                  <p
                    className="
                      mt-3
                      text-[28px]
                      font-semibold
                      tracking-[-0.035em]
                      text-[#eef5f8]
                    "
                  >
                    {caseStudy.code} | {caseStudy.name}
                  </p>
                </div>

                <div
                  className="
                    grid
                    min-w-0
                    gap-3
                    sm:grid-cols-3
                  "
                >
                  {previous && (
                    <Link
                      href={`/archive/${previous.slug}`}
                      className={`
                        secondary-btn
                        min-w-0
                        outline-none
                        focus-visible:ring-2
                        ${accent.ring}
                      `}
                    >
                      ← {previous.code}
                    </Link>
                  )}

                  <Link
                    href="/#archive"
                    className={`
                      secondary-btn
                      min-w-0
                      outline-none
                      focus-visible:ring-2
                      ${accent.ring}
                    `}
                  >
                    Archive
                  </Link>

                  {next && (
                    <Link
                      href={`/archive/${next.slug}`}
                      className={`
                        secondary-btn
                        min-w-0
                        outline-none
                        focus-visible:ring-2
                        ${accent.ring}
                      `}
                    >
                      {next.code} →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}



