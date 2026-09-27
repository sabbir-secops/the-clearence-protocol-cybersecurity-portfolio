"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ProjectKey =
  | "hostsecual"
  | "aged"
  | "leemeo"
  | "softparallax"
  | "security-labs"
  | "classified";

type ProjectNode = {
  id: ProjectKey;
  code: string;
  name: string;
  type: string;
  status: string;
  summary: string;
  role: string;
  focus: string[];
  signals: string[];
  classified?: boolean;
};

const projects: ProjectNode[] = [
  {
    id: "hostsecual",
    code: "H-01",
    name: "HostSecual",
    type: "Security First Infrastructure",
    status: "Active",
    summary:
      "A hosting focused technology initiative exploring infrastructure, server environments, deployment, performance and security aware hosting architecture.",
    role:
      "Infrastructure, security and product focused technical work.",
    focus: [
      "Hosting Architecture",
      "Server Environments",
      "Security",
      "Performance",
    ],
    signals: [
      "Linux",
      "VPS",
      "DNS",
      "SSL and TLS",
      "Cloudflare",
      "Server Security",
      "NGINX",
      "Apache",
      "Hosting",
      "Web Performance",
    ],
  },
  {
    id: "aged",
    code: "A-02",
    name: "AGED Application System",
    type: "Multi Role Product Engineering",
    status: "In Development",
    summary:
      "A growing operational application ecosystem focused on multi role workflows, secure access, branch aware systems and scalable product architecture.",
    role:
      "Product architecture, application development and system design.",
    focus: [
      "Multi Role Systems",
      "Mobile",
      "RBAC",
      "Operational Workflows",
    ],
    signals: [
      "Flutter",
      "Dart",
      "Riverpod",
      "Firebase",
      "RBAC",
      "API Systems",
      "Multi Tenant Thinking",
      "Mobile UX",
      "Product Architecture",
      "Notifications",
    ],
  },
  {
    id: "leemeo",
    code: "L-03",
    name: "Leemeo",
    type: "Digital Technology and Operations",
    status: "Active",
    summary:
      "Technology and product focused work within a wider business ecosystem, combining digital systems, operations and long term technical thinking.",
    role:
      "Technology, product and operations focused involvement.",
    focus: [
      "Technology",
      "Product Thinking",
      "Operations",
      "Digital Systems",
    ],
    signals: [
      "Product",
      "Technology",
      "Operations",
      "Systems Thinking",
      "Digital Strategy",
      "Architecture",
    ],
  },
  {
    id: "softparallax",
    code: "SP-04",
    name: "SoftParallax",
    type: "Web, Search and Digital Engineering",
    status: "Active",
    summary:
      "Web and digital engineering work combining technical execution, performance, search architecture and growth focused systems thinking.",
    role:
      "Web technology, search engineering and digital optimization.",
    focus: [
      "Web",
      "Technical SEO",
      "Performance",
      "Search Engineering",
    ],
    signals: [
      "Technical SEO",
      "Core Web Vitals",
      "Structured Data",
      "AEO",
      "GEO",
      "Semantic SEO",
      "Web Technology",
      "Performance",
      "Search Architecture",
    ],
  },
  {
    id: "security-labs",
    code: "R-05",
    name: "Security Labs",
    type: "Assessment, Research and Experimentation",
    status: "Ongoing",
    summary:
      "Hands on exploration across application security, mobile analysis, vulnerabilities, security tooling and technical research workflows.",
    role:
      "Security testing, experimentation and technical investigation.",
    focus: [
      "AppSec",
      "Mobile Security",
      "Vulnerability Analysis",
      "Research",
    ],
    signals: [
      "OWASP",
      "VAPT",
      "MobSF",
      "Burp Suite",
      "CWE",
      "MASVS",
      "Web Security",
      "API Security",
      "Security Research",
      "Reporting",
    ],
  },
  {
    id: "classified",
    code: "S-01",
    name: "██████████",
    type: "Classified System",
    status: "Restricted",
    summary:
      "Public clearance is insufficient to access this system.",
    role:
      "Information restricted.",
    focus: [
      "Encrypted",
      "Restricted",
      "Active Development",
    ],
    signals: [],
    classified: true,
  },
];

function getProject(
  id: ProjectKey
): ProjectNode {
  return (
    projects.find(
      (project) =>
        project.id === id
    ) ?? projects[0]
  );
}

export default function ProjectArchiveSection() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const timeoutRefs =
    useRef<number[]>([]);

  const [
    activeProject,
    setActiveProject,
  ] =
    useState<ProjectKey>(
      "hostsecual"
    );

  const [
    decrypting,
    setDecrypting,
  ] =
    useState(false);

  const [
    partialSignals,
    setPartialSignals,
  ] =
    useState<string[]>([]);

  const activeData =
    useMemo(
      () =>
        getProject(
          activeProject
        ),
      [activeProject]
    );

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(
        (timeout) => {
          window.clearTimeout(
            timeout
          );
        }
      );
    };
  }, []);

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (reduceMotion) {
      return;
    }

    const ctx =
      gsap.context(() => {
        gsap.from(
          ".archive-header-item",
          {
            y: 28,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",

            scrollTrigger: {
              trigger: section,
              start:
                "top 82%",
            },
          }
        );

        gsap.from(
          ".archive-node",
          {
            y: 22,
            scale: 0.98,
            duration: 0.6,
            stagger: 0.05,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                ".archive-grid",
              start:
                "top 88%",
            },
          }
        );

        gsap.from(
          ".archive-detail-panel",
          {
            y: 24,
            duration: 0.7,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                ".archive-detail-panel",
              start:
                "top 90%",
            },
          }
        );
      }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  const selectProject = (
    id: ProjectKey
  ) => {
    setActiveProject(id);

    if (
      id !==
      "classified"
    ) {
      setDecrypting(false);
      setPartialSignals([]);
    }
  };

  const attemptClassifiedAccess =
    () => {
      if (decrypting) {
        return;
      }

      timeoutRefs.current.forEach(
        (timeout) => {
          window.clearTimeout(
            timeout
          );
        }
      );

      timeoutRefs.current =
        [];

      setDecrypting(true);
      setPartialSignals([]);

      const signals = [
        "INTELLIGENCE",
        "LEARN",
        "DEFEND",
        "SIMULATE",
        "CONNECT",
      ];

      signals.forEach(
        (
          signal,
          index
        ) => {
          const timeout =
            window.setTimeout(
              () => {
                setPartialSignals(
                  signals.slice(
                    0,
                    index + 1
                  )
                );
              },
              450 *
                (index + 1)
            );

          timeoutRefs.current.push(
            timeout
          );
        }
      );

      const finishTimeout =
        window.setTimeout(
          () => {
            setDecrypting(
              false
            );
          },
          3000
        );

      timeoutRefs.current.push(
        finishTimeout
      );
    };

  return (
    <section
      ref={sectionRef}
      id="archive"
      className="
        relative
        overflow-hidden
        border-b
        border-white/[0.08]
        bg-[#080b0f]
        py-20

        sm:py-24

        lg:py-28

        xl:py-32

        2xl:py-36
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-30%]
          top-[18%]
          h-[700px]
          w-[700px]
          rounded-full
          bg-cyan-300/[0.035]
          blur-[150px]

          lg:right-[-15%]

          2xl:h-[900px]
          2xl:w-[900px]
        "
      />

      <div
        className="
          container-shell
          relative
          z-10
          min-w-0
        "
      >
        <div
          className="
            mb-10
            grid
            min-w-0
            gap-7

            lg:mb-14
            lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)]
            lg:items-end
          "
        >
          <div
            className="
              archive-header-item
              min-w-0
            "
          >
            <p className="system-label mb-5">
              Clearance 05 | Archive
            </p>

            <h2
              className="
                section-title
                max-w-[900px]
              "
            >
              Selected systems
              <br />
              and field work.
            </h2>
          </div>

          <div
            className="
              archive-header-item
              min-w-0
            "
          >
            <p
              className="
                max-w-[580px]
                text-[16px]
                leading-7
                text-[#a8b4bd]

                sm:text-[17px]
                sm:leading-8
              "
            >
              Projects are where
              architecture, security
              and execution become
              evidence. Select a system
              node to inspect its role,
              focus and technical
              signals.
            </p>
          </div>
        </div>

        <div
          className="
            mb-5
            flex
            min-w-0
            flex-col
            gap-4
            rounded-[18px]
            border
            border-white/[0.10]
            bg-[#0b1016]
            px-4
            py-4

            sm:px-5

            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div
            className="
              flex
              min-w-0
              items-center
              gap-3
            "
          >
            <span className="status-dot" />

            <span className="tiny-mono">
              Project Archive | Online
            </span>
          </div>

          <div
            className="
              flex
              flex-wrap
              gap-x-5
              gap-y-2
            "
          >
            <span className="tiny-mono">
              Public Nodes | 05
            </span>

            <span
              className="
                font-mono
                text-[10px]
                font-semibold
                tracking-[0.12em]
                text-amber-300
                uppercase

                sm:text-[11px]
              "
            >
              Restricted Nodes | 01
            </span>
          </div>
        </div>

        <div
          className="
            grid
            min-w-0
            gap-5

            2xl:grid-cols-[minmax(0,1.08fr)_minmax(430px,0.92fr)]
            2xl:items-start
          "
        >
          <div
            className="
              archive-grid
              relative
              min-w-0
              overflow-hidden
              rounded-[24px]
              border
              border-white/[0.10]
              bg-[#090e13]
              p-3

              sm:rounded-[28px]
              sm:p-4

              lg:p-5

              xl:p-6
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-50
              "
              style={{
                backgroundImage: `
                  linear-gradient(
                    rgba(255,255,255,0.025) 1px,
                    transparent 1px
                  ),
                  linear-gradient(
                    90deg,
                    rgba(255,255,255,0.025) 1px,
                    transparent 1px
                  )
                `,
                backgroundSize:
                  "46px 46px",
              }}
            />

            <div
              className="
                relative
                z-10
                grid
                min-w-0
                grid-cols-1
                gap-3

                sm:grid-cols-2

                xl:grid-cols-3
                xl:gap-4

                2xl:grid-cols-2
              "
            >
              {projects.map(
                (project) => {
                  const active =
                    activeProject ===
                    project.id;

                  const restricted =
                    project.classified ===
                    true;

                  return (
                    <button
                      key={
                        project.id
                      }
                      type="button"
                      aria-pressed={
                        active
                      }
                      onMouseEnter={() =>
                        selectProject(
                          project.id
                        )
                      }
                      onFocus={() =>
                        selectProject(
                          project.id
                        )
                      }
                      onClick={() =>
                        selectProject(
                          project.id
                        )
                      }
                      className={`
                        archive-node
                        group
                        relative
                        min-w-0
                        min-h-[205px]
                        overflow-hidden
                        rounded-[20px]
                        border
                        p-5
                        text-left
                        transition
                        duration-300

                        sm:min-h-[220px]

                        ${
                          restricted
                            ? active
                              ? `
                                border-amber-300/45
                                bg-amber-300/[0.075]
                                shadow-[0_0_45px_rgba(255,184,77,0.07)]
                              `
                              : `
                                border-amber-300/20
                                bg-amber-300/[0.025]
                                hover:-translate-y-1
                                hover:border-amber-300/40
                                hover:bg-amber-300/[0.05]
                              `
                            : active
                              ? `
                                border-cyan-300/40
                                bg-cyan-300/[0.075]
                                shadow-[0_0_45px_rgba(72,215,255,0.07)]
                              `
                              : `
                                border-white/[0.11]
                                bg-[#0d141b]
                                hover:-translate-y-1
                                hover:border-cyan-300/25
                                hover:bg-[#101920]
                              `
                        }
                      `}
                    >
                      <div
                        aria-hidden="true"
                        className={`
                          pointer-events-none
                          absolute
                          right-[-50px]
                          top-[-50px]
                          h-[150px]
                          w-[150px]
                          rounded-full
                          blur-[65px]

                          ${
                            restricted
                              ? "bg-amber-300/[0.08]"
                              : "bg-cyan-300/[0.055]"
                          }
                        `}
                      />

                      <div
                        className="
                          relative
                          z-10
                          flex
                          h-full
                          min-w-0
                          flex-col
                        "
                      >
                        <div
                          className="
                            flex
                            min-w-0
                            items-center
                            justify-between
                            gap-4
                          "
                        >
                          <span
                            className={`
                              font-mono
                              text-[10px]
                              tracking-[0.12em]
                              uppercase

                              sm:text-[11px]

                              ${
                                restricted
                                  ? "text-amber-200"
                                  : "text-[#a8b4bd]"
                              }
                            `}
                          >
                            Node {project.code}
                          </span>

                          <span
                            className={`
                              h-2
                              w-2
                              shrink-0
                              rounded-full

                              ${
                                restricted
                                  ? `
                                    bg-amber-300
                                    shadow-[0_0_18px_rgba(255,184,77,0.6)]
                                  `
                                  : active
                                    ? `
                                      bg-cyan-300
                                      shadow-[0_0_18px_rgba(72,215,255,0.85)]
                                    `
                                    : `
                                      bg-white/40
                                    `
                              }
                            `}
                          />
                        </div>

                        <div
                          className="
                            mt-7
                            min-w-0
                          "
                        >
                          <h3
                            className={`
                              break-words
                              text-[21px]
                              font-semibold
                              leading-tight
                              tracking-[-0.025em]

                              sm:text-[23px]

                              ${
                                restricted
                                  ? "text-amber-100"
                                  : "text-[#eef5f8]"
                              }
                            `}
                          >
                            {project.name}
                          </h3>

                          <p
                            className="
                              mt-3
                              max-w-[340px]
                              text-[11px]
                              font-medium
                              leading-5
                              tracking-[0.07em]
                              text-[#9ca9b2]
                              uppercase
                            "
                          >
                            {project.type}
                          </p>
                        </div>

                        <div
                          className="
                            mt-auto
                            flex
                            min-w-0
                            items-center
                            justify-between
                            gap-4
                            border-t
                            border-white/[0.09]
                            pt-4
                          "
                        >
                          <span
                            className="
                              truncate
                              font-mono
                              text-[10px]
                              tracking-[0.11em]
                              text-[#a8b4bd]
                              uppercase
                            "
                          >
                            {project.status}
                          </span>

                          <span
                            className={`
                              shrink-0
                              text-lg
                              transition
                              duration-300
                              group-hover:translate-x-1

                              ${
                                restricted
                                  ? "text-amber-300"
                                  : "text-cyan-200"
                              }
                            `}
                          >
                            →
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                }
              )}
            </div>

            <div
              className="
                relative
                z-10
                mt-5
                flex
                flex-col
                gap-3
                border-t
                border-white/[0.08]
                pt-5

                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <span className="tiny-mono">
                Select Node | Inspect System
              </span>

              <span className="tiny-mono">
                Archive | Synchronized
              </span>
            </div>
          </div>

          <aside
            className={`
              archive-detail-panel
              relative
              min-w-0
              overflow-hidden
              rounded-[24px]
              border
              p-5

              sm:rounded-[28px]
              sm:p-6

              lg:p-8

              2xl:sticky
              2xl:top-[92px]

              ${
                activeData.classified
                  ? `
                    border-amber-300/25
                    bg-[#13110d]
                  `
                  : `
                    border-white/[0.10]
                    bg-[#0b1016]
                  `
              }
            `}
          >
            <div
              aria-hidden="true"
              className={`
                pointer-events-none
                absolute
                right-[-100px]
                top-[-100px]
                h-[300px]
                w-[300px]
                rounded-full
                blur-[100px]

                ${
                  activeData.classified
                    ? "bg-amber-300/[0.07]"
                    : "bg-cyan-300/[0.055]"
                }
              `}
            />

            <div
              className="
                relative
                z-10
                min-w-0
              "
            >
              <div
                className="
                  flex
                  min-w-0
                  flex-col
                  gap-4
                  border-b
                  border-white/[0.09]
                  pb-6

                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div className="min-w-0">
                  <p
                    className={
                      activeData.classified
                        ? `
                          font-mono
                          text-[11px]
                          font-semibold
                          tracking-[0.15em]
                          text-amber-300
                          uppercase
                        `
                        : `
                          system-label
                        `
                    }
                  >
                    Active Archive Node
                  </p>

                  <p className="tiny-mono mt-2">
                    System | {activeData.code}
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
                    className={`
                      h-2
                      w-2
                      rounded-full

                      ${
                        activeData.classified
                          ? `
                            bg-amber-300
                            shadow-[0_0_18px_rgba(255,184,77,0.7)]
                          `
                          : `
                            bg-cyan-300
                            shadow-[0_0_18px_rgba(72,215,255,0.8)]
                          `
                      }
                    `}
                  />

                  <span className="tiny-mono">
                    {activeData.status}
                  </span>
                </div>
              </div>

              {activeData.classified ? (
                <div className="pt-8">
                  <p
                    className="
                      font-mono
                      text-[11px]
                      font-semibold
                      tracking-[0.16em]
                      text-amber-300
                      uppercase
                    "
                  >
                    Security Notice
                  </p>

                  <h3
                    className="
                      mt-4
                      break-words
                      text-[36px]
                      font-semibold
                      leading-none
                      tracking-[-0.05em]
                      text-amber-100
                      uppercase

                      sm:text-[46px]

                      lg:text-[56px]
                    "
                  >
                    Classified
                  </h3>

                  <div
                    className="
                      mt-7
                      space-y-4
                      border-y
                      border-amber-300/[0.16]
                      py-6
                    "
                  >
                    {[
                      [
                        "Public Access",
                        "Insufficient",
                      ],
                      [
                        "System State",
                        "Active Development",
                      ],
                      [
                        "Disclosure",
                        "Restricted",
                      ],
                    ].map(
                      ([
                        label,
                        value,
                      ]) => (
                        <div
                          key={label}
                          className="
                            flex
                            flex-col
                            gap-1

                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                            sm:gap-4
                          "
                        >
                          <span className="tiny-mono">
                            {label}
                          </span>

                          <span
                            className="
                              font-mono
                              text-[10px]
                              font-semibold
                              tracking-[0.10em]
                              text-amber-200
                              uppercase

                              sm:text-[11px]
                            "
                          >
                            {value}
                          </span>
                        </div>
                      )
                    )}
                  </div>

                  <p
                    className="
                      mt-7
                      max-w-[560px]
                      text-[16px]
                      leading-7
                      text-[#b8c0c5]
                    "
                  >
                    Not every system is
                    ready for public
                    clearance.
                  </p>

                  <div className="mt-8">
                    <p
                      className="
                        font-mono
                        text-[11px]
                        font-semibold
                        tracking-[0.15em]
                        text-amber-300
                        uppercase
                      "
                    >
                      Partial Signal Recovery
                    </p>

                    <div
                      className="
                        mt-4
                        min-h-[120px]
                        rounded-[18px]
                        border
                        border-amber-300/[0.15]
                        bg-black/15
                        p-5
                      "
                    >
                      {partialSignals.length ===
                      0 ? (
                        <p className="tiny-mono">
                          Signal | Encrypted
                        </p>
                      ) : (
                        <div
                          className="
                            flex
                            flex-wrap
                            gap-2
                          "
                        >
                          {partialSignals.map(
                            (
                              signal
                            ) => (
                              <span
                                key={
                                  signal
                                }
                                className="
                                  max-w-full
                                  rounded-full
                                  border
                                  border-amber-300/25
                                  bg-amber-300/[0.06]
                                  px-3
                                  py-2
                                  font-mono
                                  text-[10px]
                                  font-semibold
                                  tracking-[0.10em]
                                  text-amber-100
                                  uppercase

                                  sm:text-[11px]
                                "
                              >
                                {signal}
                              </span>
                            )
                          )}
                        </div>
                      )}

                      {partialSignals.length ===
                        5 && (
                        <p
                          className="
                            mt-5
                            font-mono
                            text-[10px]
                            font-semibold
                            tracking-[0.13em]
                            text-red-300
                            uppercase
                          "
                        >
                          Signal | Terminated
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={
                      decrypting
                    }
                    onClick={
                      attemptClassifiedAccess
                    }
                    className="
                      mt-6
                      inline-flex
                      min-h-[48px]
                      w-full
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-amber-300/35
                      bg-amber-300/[0.06]
                      px-5
                      text-center
                      font-mono
                      text-[10px]
                      font-semibold
                      tracking-[0.11em]
                      text-amber-100
                      uppercase
                      transition

                      hover:border-amber-300/55
                      hover:bg-amber-300/[0.10]

                      disabled:cursor-not-allowed
                      disabled:opacity-50

                      sm:w-auto
                      sm:text-[11px]
                    "
                  >
                    {decrypting
                      ? "Attempting Decryption"
                      : "Attempt Partial Decryption"}
                  </button>

                  <div
                    className="
                      mt-8
                      border-t
                      border-amber-300/[0.14]
                      pt-6
                    "
                  >
                    <p
                      className="
                        text-[21px]
                        font-medium
                        tracking-[-0.02em]
                        text-[#eef5f8]
                      "
                    >
                      Something is being built.
                    </p>

                    <p
                      className="
                        mt-3
                        font-mono
                        text-[10px]
                        font-semibold
                        tracking-[0.15em]
                        text-amber-300
                        uppercase
                      "
                    >
                      Reveal Status | Pending
                    </p>
                  </div>
                </div>
              ) : (
                <div className="pt-8">
                  <p
                    className="
                      font-mono
                      text-[10px]
                      font-semibold
                      leading-5
                      tracking-[0.11em]
                      text-[#a8b4bd]
                      uppercase

                      sm:text-[11px]
                    "
                  >
                    {activeData.type}
                  </p>

                  <h3
                    className="
                      mt-4
                      break-words
                      text-[34px]
                      font-semibold
                      leading-[1]
                      tracking-[-0.045em]
                      text-[#eef5f8]

                      sm:text-[42px]

                      lg:text-[50px]
                    "
                  >
                    {activeData.name}
                  </h3>

                  <p
                    className="
                      mt-6
                      max-w-[620px]
                      text-[15px]
                      leading-7
                      text-[#a8b4bd]

                      sm:text-[16px]
                    "
                  >
                    {activeData.summary}
                  </p>

                  <div
                    className="
                      mt-7
                      border-t
                      border-white/[0.09]
                      pt-6
                    "
                  >
                    <p className="system-label">
                      Role | Contribution
                    </p>

                    <p
                      className="
                        mt-3
                        text-[15px]
                        leading-7
                        text-[#b7c1c7]
                      "
                    >
                      {activeData.role}
                    </p>
                  </div>

                  <div className="mt-7">
                    <p className="system-label">
                      Primary Focus
                    </p>

                    <div
                      className="
                        mt-4
                        flex
                        min-w-0
                        flex-wrap
                        gap-2
                      "
                    >
                      {activeData.focus.map(
                        (
                          item
                        ) => (
                          <span
                            key={
                              item
                            }
                            className="
                              max-w-full
                              rounded-full
                              border
                              border-white/[0.14]
                              bg-white/[0.04]
                              px-3
                              py-2
                              text-[10px]
                              font-semibold
                              leading-5
                              tracking-[0.08em]
                              text-[#c2cbd0]
                              uppercase

                              sm:text-[11px]
                            "
                          >
                            {item}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="mt-8">
                    <div
                      className="
                        flex
                        flex-col
                        gap-2

                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                      "
                    >
                      <p className="system-label">
                        Technical Signals
                      </p>

                      <span className="tiny-mono">
                        Evidence | Active
                      </span>
                    </div>

                    <div
                      className="
                        mt-4
                        grid
                        min-w-0
                        grid-cols-1
                        gap-2

                        sm:grid-cols-2
                      "
                    >
                      {activeData.signals.map(
                        (
                          signal,
                          index
                        ) => (
                          <div
                            key={
                              signal
                            }
                            className="
                              group
                              flex
                              min-w-0
                              items-center
                              justify-between
                              gap-3
                              rounded-[14px]
                              border
                              border-white/[0.10]
                              bg-[#10161d]
                              px-4
                              py-3
                              transition

                              hover:border-cyan-300/25
                              hover:bg-cyan-300/[0.035]
                            "
                          >
                            <span
                              className="
                                min-w-0
                                break-words
                                text-[13px]
                                leading-5
                                text-[#c1cbd0]
                              "
                            >
                              {signal}
                            </span>

                            <span
                              className="
                                shrink-0
                                font-mono
                                text-[10px]
                                text-[#8f9ca5]
                              "
                            >
                              {String(
                                index + 1
                              ).padStart(
                                2,
                                "0"
                              )}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div
                    className="
                      mt-8
                      border-t
                      border-white/[0.09]
                      pt-6
                    "
                  >
                    <div
                      className="
                        flex
                        flex-col
                        gap-5

                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                      "
                    >
                      <div
                        className="
                          min-w-0
                        "
                      >
                        <p className="tiny-mono">
                          Case Study | Locked
                        </p>

                        <p
                          className="
                            mt-2
                            max-w-[430px]
                            text-[14px]
                            leading-6
                            text-[#a8b4bd]
                          "
                        >
                          Architecture and
                          deeper evidence will
                          open from this node.
                        </p>
                      </div>

                      <button
                        type="button"
                        className="
                          secondary-btn
                          w-full
                          cursor-default

                          sm:w-auto
                        "
                      >
                        Deep Dive Soon
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>

        <div
          className="
            mt-8
            flex
            flex-col
            gap-3
            border-t
            border-white/[0.08]
            pt-6

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p className="tiny-mono">
            Projects | Proof Layer
          </p>

          <p
            className="
              max-w-[620px]
              text-[14px]
              leading-6
              text-[#a8b4bd]

              sm:text-right
            "
          >
            Claims become stronger
            when the system behind
            them can be inspected.
          </p>
        </div>
      </div>
    </section>
  );
}