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

type ClusterKey =
  | "security"
  | "infrastructure"
  | "product"
  | "engineering"
  | "search"
  | "research";

type CapabilityCluster = {
  id: ClusterKey;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  skills: string[];
  connections: ClusterKey[];
  position: {
    left: string;
    top: string;
  };
};

const capabilityClusters: CapabilityCluster[] = [
  {
    id: "security",
    number: "01",
    title: "Cybersecurity",
    shortTitle: "Security",
    description:
      "Application security, API security, web penetration testing, vulnerability analysis and access control across connected digital systems.",
    skills: [
      "Application Security",
      "Web Security",
      "Web Pentesting",
      "VAPT",
      "OWASP",
      "API Security",
      "Authentication Testing",
      "Authorization Testing",
      "Vulnerability Analysis",
      "Threat Intelligence",
      "MobSF",
      "Burp Suite",
    ],
    connections: [
      "infrastructure",
      "product",
      "engineering",
      "research",
    ],
    position: {
      left: "50%",
      top: "13%",
    },
  },
  {
    id: "infrastructure",
    number: "02",
    title: "Secure Infrastructure",
    shortTitle: "Infrastructure",
    description:
      "Linux, server hardening, hosting, DNS, Cloudflare and network protection layers underneath digital products.",
    skills: [
      "Linux",
      "Server Security",
      "Linux Hardening",
      "SSH Hardening",
      "Firewall",
      "Docker",
      "VPS",
      "DNS",
      "SSL and TLS",
      "Cloudflare",
      "NGINX",
      "Apache",
      "LiteSpeed",
      "Hosting Infrastructure",
    ],
    connections: [
      "security",
      "engineering",
      "search",
    ],
    position: {
      left: "24%",
      top: "31%",
    },
  },
  {
    id: "product",
    number: "03",
    title: "Product Engineering",
    shortTitle: "Product",
    description:
      "Product architecture and system design for scalable, role aware, multi tenant and API driven digital systems.",
    skills: [
      "Product Architecture",
      "SaaS Architecture",
      "Multi Tenant Systems",
      "RBAC",
      "Authentication Systems",
      "API Driven Applications",
      "System Design",
      "Technical Requirements",
      "Scalability Planning",
      "QA Thinking",
    ],
    connections: [
      "security",
      "engineering",
      "research",
    ],
    position: {
      left: "76%",
      top: "31%",
    },
  },
  {
    id: "engineering",
    number: "04",
    title: "Web and App Engineering",
    shortTitle: "Engineering",
    description:
      "Frontend, backend and cross platform web and app engineering used to turn architecture into working systems.",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Python",
      "PHP",
      "REST APIs",
      "WordPress",
      "Flutter",
      "Dart",
      "Riverpod",
      "Firebase",
    ],
    connections: [
      "security",
      "infrastructure",
      "product",
      "search",
    ],
    position: {
      left: "50%",
      top: "86%",
    },
  },
  {
    id: "search",
    number: "05",
    title: "Search and Performance",
    shortTitle: "Optimization",
    description:
      "Technical SEO, Core Web Vitals, structured data, search architecture and modern discoverability across search and AI surfaces.",
    skills: [
      "Technical SEO",
      "Core Web Vitals",
      "Site Architecture",
      "Structured Data",
      "Semantic SEO",
      "Entity SEO",
      "AEO",
      "GEO",
      "Local SEO",
      "Performance Optimization",
    ],
    connections: [
      "infrastructure",
      "engineering",
      "research",
    ],
    position: {
      left: "24%",
      top: "69%",
    },
  },
  {
    id: "research",
    number: "06",
    title: "AI and Research",
    shortTitle: "Research",
    description:
      "Security research, technical investigation, AI assisted engineering and experimentation across emerging systems.",
    skills: [
      "Security Research",
      "Technical Research",
      "AI Assisted Engineering",
      "LLM Concepts",
      "RAG Concepts",
      "Interactive Systems",
      "Data Visualization",
      "Technical Documentation",
    ],
    connections: [
      "security",
      "product",
      "search",
    ],
    position: {
      left: "76%",
      top: "69%",
    },
  },
];

const NETWORK_WIDTH =
  1000;

const NETWORK_HEIGHT =
  780;

function getNetworkPoint(
  cluster: CapabilityCluster
) {
  return {
    x:
      parseFloat(
        cluster.position.left
      ) /
      100 *
      NETWORK_WIDTH,
    y:
      parseFloat(
        cluster.position.top
      ) /
      100 *
      NETWORK_HEIGHT,
  };
}

function getCluster(
  id: ClusterKey
): CapabilityCluster {
  return (
    capabilityClusters.find(
      (cluster) =>
        cluster.id === id
    ) ??
    capabilityClusters[0]
  );
}

export default function CapabilityNetworkSection() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const [
    activeCluster,
    setActiveCluster,
  ] =
    useState<ClusterKey>(
      "security"
    );

  const activeData =
    useMemo(
      () =>
        getCluster(
          activeCluster
        ),
      [activeCluster]
    );

  const relatedClusters =
    useMemo(
      () =>
        new Set<ClusterKey>([
          activeCluster,
          ...activeData.connections,
        ]),
      [
        activeCluster,
        activeData,
      ]
    );

  const activePoint =
    useMemo(
      () =>
        getNetworkPoint(
          activeData
        ),
      [
        activeData,
      ]
    );

  const activeRoutes =
    useMemo(
      () =>
        activeData.connections.map(
          (
            connection
          ) => ({
            id:
              connection,
            point:
              getNetworkPoint(
                getCluster(
                  connection
                )
              ),
          })
        ),
      [
        activeData,
      ]
    );

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(
        "system:capability-cluster-change",
        {
          detail: {
            id:
              activeData.id,
            number:
              activeData.number,
            title:
              activeData.title,
          },
        }
      )
    );
  }, [
    activeData,
  ]);

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (reduceMotion) return;

    const ctx =
      gsap.context(() => {
        gsap.from(
          ".capability-header-item",
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
          ".capability-node",
          {
            autoAlpha: 0,
            duration: 0.45,
            ease: "power2.out",

            scrollTrigger: {
              trigger:
                ".capability-interface",
              start:
                "top 88%",
            },
          }
        );
      }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      aria-labelledby="capabilities-title"
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
          left-1/2
          top-[40%]
          h-[760px]
          w-[760px]
          max-w-full
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-300/[0.035]
          blur-[160px]
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
              capability-header-item
              min-w-0
            "
          >
            <p className="system-label mb-5">
              Clearance 03 | Capability Map
            </p>

            <h2
              id="capabilities-title"
              className="
                section-title
                max-w-[920px]
              "
            >
              Capabilities are
              <br />
              connected systems.
            </h2>
          </div>

          <div
            className="
              capability-header-item
              min-w-0
            "
          >
            <p
              className="
                max-w-[570px]
                text-[15px]
                leading-7
                text-[#a8b4bd]

                sm:text-[16px]
                sm:leading-7
              "
            >
              Explore how application
              security, secure
              infrastructure, product
              architecture, web and app
              engineering, technical
              SEO, performance and
              research connect across
              the work.
            </p>
          </div>
        </div>

        <div
          className="
            capability-interface
            grid
            min-w-0
            gap-3

            sm:grid-cols-2
            sm:gap-4

            xl:grid-cols-3

            2xl:hidden
          "
        >
          {capabilityClusters.map(
            (cluster) => {
              const active =
                activeCluster ===
                cluster.id;

              const related =
                relatedClusters.has(
                  cluster.id
                );

              return (
                <button
                  key={cluster.id}
                  type="button"
                  aria-pressed={active}
                  aria-controls="capability-detail"
                  onClick={() =>
                    setActiveCluster(
                      cluster.id
                    )
                  }
                  className={`
                    capability-node
                    group
                    relative
                    min-w-0
                    overflow-hidden
                    rounded-[20px]
                    border
                    p-5
                    text-left
                    outline-none
                    transition
                    duration-300
                    focus-visible:ring-2
                    focus-visible:ring-cyan-300/70
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-[#080b0f]

                    ${
                      active
                        ? `
                          border-cyan-300/40
                          bg-cyan-300/[0.075]
                          shadow-[0_0_40px_rgba(72,215,255,0.07)]
                        `
                        : related
                          ? `
                            border-cyan-200/[0.16]
                            bg-[#0e151c]
                            hover:border-cyan-300/25
                            hover:bg-[#101920]
                          `
                          : `
                            border-white/[0.11]
                            bg-[#0d141b]
                            hover:border-cyan-300/25
                            hover:bg-[#101920]
                          `
                    }
                  `}
                >
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      right-[-50px]
                      top-[-50px]
                      h-[150px]
                      w-[150px]
                      rounded-full
                      bg-cyan-300/[0.05]
                      blur-[65px]
                    "
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
                        items-center
                        justify-between
                        gap-4
                      "
                    >
                      <span
                        className="
                          font-mono
                          text-[10px]
                          tracking-[0.13em]
                          text-[#a8b4bd]
                          uppercase

                          sm:text-[11px]
                        "
                      >
                        Node {cluster.number}
                      </span>

                      <span
                        className={`
                          h-2
                          w-2
                          shrink-0
                          rounded-full

                          ${
                            active
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

                    <h3
                      className="
                        mt-6
                        break-words
                        text-[18px]
                        font-semibold
                        leading-tight
                        tracking-[-0.025em]
                        text-[#eef5f8]

                        sm:text-[20px]
                      "
                    >
                      {cluster.title}
                    </h3>

                    <p
                      className="
                        mt-3
                        text-[14px]
                        leading-6
                        text-[#a8b4bd]
                      "
                    >
                      {cluster.description}
                    </p>

                    <div
                      className="
                        mt-5
                        flex
                        items-center
                        justify-between
                        gap-4
                        border-t
                        border-white/[0.09]
                        pt-4
                      "
                    >
                      <span className="tiny-mono">
                        Inspect Node
                      </span>

                      <span
                        aria-hidden="true"
                        className="
                          text-cyan-200
                          transition
                          group-hover:translate-x-1
                        "
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
            hidden
            min-h-[790px]
            overflow-hidden
            rounded-[32px]
            border
            border-white/[0.11]
            bg-[#090e13]
            2xl:block
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
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
                "54px 54px",
            }}
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[550px]
              w-[550px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-cyan-300/[0.10]
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[370px]
              w-[370px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-white/[0.07]
            "
          />

          <svg
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              h-full
              w-full
            "
            viewBox="0 0 1000 780"
            preserveAspectRatio="none"
          >
            {capabilityClusters.map(
              (
                cluster
              ) => {
                const point =
                  getNetworkPoint(
                    cluster
                  );

                return (
                  <line
                    key={
                      `base-${cluster.id}`
                    }
                    x1={500}
                    y1={390}
                    x2={point.x}
                    y2={point.y}
                    stroke="#48d7ff"
                    strokeOpacity="0.10"
                    strokeWidth="1"
                  />
                );
              }
            )}

            {activeRoutes.map(
              (
                route
              ) => (
                <g
                  key={
                    `active-${route.id}`
                  }
                >
                  <line
                    x1={
                      activePoint.x
                    }
                    y1={
                      activePoint.y
                    }
                    x2={
                      route.point.x
                    }
                    y2={
                      route.point.y
                    }
                    stroke="#48d7ff"
                    strokeOpacity="0.12"
                    strokeWidth="7"
                  />

                  <line
                    x1={
                      activePoint.x
                    }
                    y1={
                      activePoint.y
                    }
                    x2={
                      route.point.x
                    }
                    y2={
                      route.point.y
                    }
                    stroke="#7be5ff"
                    strokeOpacity="0.62"
                    strokeWidth="1.25"
                  />
                </g>
              )
            )}

            <circle
              cx={
                activePoint.x
              }
              cy={
                activePoint.y
              }
              r="5"
              fill="#7be5ff"
              fillOpacity="0.9"
            />
          </svg>

          <div
            aria-hidden="true"
            className="
              absolute
              left-1/2
              top-1/2
              z-20
              -translate-x-1/2
              -translate-y-1/2
            "
          >
            <div
              className="
                relative
                flex
                h-[215px]
                w-[215px]
                items-center
                justify-center
                rounded-full
                border
                border-cyan-300/35
                bg-[#0c151c]
                shadow-[0_0_100px_rgba(72,215,255,0.12)]
              "
            >
              <div
                aria-hidden="true"
                className="
                  absolute
                  inset-[16px]
                  animate-[spin_18s_linear_infinite]
                  rounded-full
                  motion-reduce:animate-none
                  border
                  border-dashed
                  border-cyan-300/20
                "
              />

              <div
                className="
                  relative
                  z-10
                  px-5
                  text-center
                "
              >
                <span
                  className="
                    mx-auto
                    mb-4
                    block
                    h-3
                    w-3
                    rounded-full
                    bg-cyan-300
                    shadow-[0_0_25px_rgba(72,215,255,0.85)]
                  "
                />

                <p className="tiny-mono">
                  Central Node
                </p>

                <p
                  className="
                    mt-3
                    text-[17px]
                    font-semibold
                    leading-6
                    tracking-[0.08em]
                    text-white
                    uppercase
                  "
                >
                  Security
                  <br />
                  Engineering
                </p>
              </div>
            </div>
          </div>

          {capabilityClusters.map(
            (cluster) => {
              const active =
                activeCluster ===
                  cluster.id;

              const related =
                relatedClusters.has(
                  cluster.id
                );

              return (
                <button
                  key={cluster.id}
                  type="button"
                  aria-pressed={active}
                  aria-controls="capability-detail"
                  onMouseEnter={() =>
                    setActiveCluster(
                      cluster.id
                    )
                  }
                  onFocus={() =>
                    setActiveCluster(
                      cluster.id
                    )
                  }
                  onClick={() =>
                    setActiveCluster(
                      cluster.id
                    )
                  }
                  className={`
                    capability-node
                    absolute
                    z-30
                    w-[210px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-[20px]
                    border
                    px-5
                    py-4
                    text-left
                    backdrop-blur-xl
                    outline-none
                    transition-[transform,border-color,background-color,box-shadow,opacity]
                    duration-500
                    focus-visible:ring-2
                    focus-visible:ring-cyan-300/70
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-[#090e13]
                    motion-reduce:transition-none
                    ease-out

                    ${
                      active
                        ? `
                          scale-[1.025]
                          border-cyan-300/45
                          bg-cyan-300/[0.10]
                          opacity-100
                          shadow-[0_18px_50px_rgba(0,0,0,0.30),0_0_45px_rgba(72,215,255,0.10)]
                        `
                        : related
                          ? `
                            border-cyan-200/[0.16]
                            bg-[#0e151c]/95
                            opacity-90
                          `
                          : `
                            border-white/[0.10]
                            bg-[#0c1218]/95
                            opacity-70
                          `
                    }
                  `}
                  style={{
                    left:
                      cluster.position.left,
                    top:
                      cluster.position.top,
                    zIndex:
                      active
                        ? 36
                        : related
                          ? 32
                          : 28,
                  }}
                >
                  <div
                    className="
                      mb-3
                      flex
                      items-center
                      justify-between
                      gap-4
                    "
                  >
                    <span className="tiny-mono">
                      Node {cluster.number}
                    </span>

                    <span
                      className={`
                        h-2
                        w-2
                        shrink-0
                        rounded-full

                        ${
                          active
                            ? `
                              bg-cyan-300
                              shadow-[0_0_18px_rgba(72,215,255,0.8)]
                            `
                            : `
                              bg-white/40
                            `
                        }
                      `}
                    />
                  </div>

                  <p
                    className="
                      text-[14px]
                      font-semibold
                      tracking-[0.05em]
                      text-[#eef5f8]
                      uppercase
                    "
                  >
                    {cluster.shortTitle}
                  </p>
                </button>
              );
            }
          )}

          <div
            className="
              absolute
              bottom-6
              left-7
            "
          >
            <p className="tiny-mono">
              Hover | Focus | Inspect
            </p>
          </div>

          <div
            className="
              absolute
              bottom-6
              right-7
            "
          >
            <p className="tiny-mono">
              Network | Synchronized
            </p>
          </div>
        </div>

        <div
          id="capability-detail"
          className="
            mt-5
            overflow-hidden
            rounded-[24px]
            border
            border-white/[0.10]
            bg-[#0b1016]

            sm:rounded-[28px]
          "
        >
          <div
            className="
              grid
              min-w-0

              xl:grid-cols-[minmax(320px,0.72fr)_minmax(0,1.28fr)]
            "
          >
            <div
              className="
                min-w-0
                border-b
                border-white/[0.09]
                p-5

                sm:p-6

                lg:p-8

                xl:border-b-0
                xl:border-r
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >
                <p className="system-label">
                  Active Node
                </p>

                <span className="tiny-mono">
                  {activeData.number} of 06
                </span>
              </div>

              <h3
                className="
                  mt-6
                  break-words
                  text-[28px]
                  font-semibold
                  leading-[1.05]
                  tracking-[-0.04em]
                  text-[#eef5f8]
                  uppercase

                  sm:text-[32px]

                  lg:text-[36px]
                "
              >
                {activeData.title}
              </h3>

              <p
                className="
                  mt-5
                  max-w-[560px]
                  text-[15px]
                  leading-7
                  text-[#a8b4bd]

                  sm:text-[16px]
                "
              >
                {activeData.description}
              </p>

              <div
                className="
                  mt-7
                  border-t
                  border-white/[0.09]
                  pt-5
                "
              >
                <p className="tiny-mono">
                  Connected Nodes
                </p>

                <div
                  className="
                    mt-4
                    flex
                    flex-wrap
                    gap-2
                  "
                >
                  {activeData.connections.map(
                    (
                      connection
                    ) => (
                      <button
                        key={
                          connection
                        }
                        type="button"
                        aria-controls="capability-detail"
                        onClick={() =>
                          setActiveCluster(
                            connection
                          )
                        }
                        className="
                          min-h-[44px]
                          rounded-full
                          border
                          border-white/[0.13]
                          bg-white/[0.035]
                          px-3
                          py-2
                          text-[10px]
                          font-medium
                          tracking-[0.09em]
                          text-[#c0c9cf]
                          uppercase
                          outline-none
                          transition

                          hover:border-cyan-300/30
                          focus-visible:ring-2
                          focus-visible:ring-cyan-300/70
                          focus-visible:ring-offset-2
                          focus-visible:ring-offset-[#0b1016]
                          hover:text-cyan-100

                          sm:text-[11px]
                        "
                      >
                        {
                          getCluster(
                            connection
                          ).shortTitle
                        }
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            <div
              className="
                min-w-0
                p-5

                sm:p-6

                lg:p-8
              "
            >
              <div
                className="
                  mb-6
                  flex
                  flex-col
                  gap-2

                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <p className="system-label">
                  Capability Signals
                </p>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span className="status-dot" />

                  <span className="tiny-mono">
                    Active
                  </span>
                </div>
              </div>

              <div
                className="
                  grid
                  min-w-0
                  grid-cols-1
                  gap-3

                  sm:grid-cols-2

                  lg:grid-cols-3
                "
              >
                {activeData.skills.map(
                  (
                    skill,
                    index
                  ) => (
                    <div
                      key={skill}
                      className="
                        group
                        min-w-0
                        rounded-[16px]
                        border
                        border-white/[0.10]
                        bg-[#10161d]
                        p-4
                        transition

                        hover:border-cyan-300/25
                        hover:bg-cyan-300/[0.035]
                      "
                    >
                      <div
                        className="
                          mb-4
                          flex
                          items-center
                          justify-between
                          gap-3
                        "
                      >
                        <span
                          className="
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

                        <span
                          aria-hidden="true"
                          className="
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-white/35
                            group-hover:bg-cyan-300
                          "
                        />
                      </div>

                      <p
                        className="
                          break-words
                          text-[13px]
                          leading-5
                          text-[#c1cbd0]
                        "
                      >
                        {skill}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
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
            Capability Map | No Arbitrary Scores
          </p>

          <p
            className="
              max-w-[760px]
              text-[14px]
              leading-6
              text-[#a8b4bd]
              sm:text-right
            "
          >
            Projects become the proof
            layer where cybersecurity,
            infrastructure, product
            engineering, development,
            search performance and
            research converge.
          </p>
        </div>
      </div>
    </section>
  );
}