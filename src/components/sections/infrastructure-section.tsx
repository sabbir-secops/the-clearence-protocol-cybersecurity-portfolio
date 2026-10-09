"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import ClearanceEvidencePanel from "@/components/evidence/clearance-evidence-panel";
import { infrastructureEvidenceRefs } from "@/data/clearance-evidence";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type InfrastructureLayerKey =
  | "client"
  | "dns"
  | "edge"
  | "defense"
  | "server"
  | "container"
  | "application"
  | "data";

type InfrastructureLayer = {
  id: InfrastructureLayerKey;
  number: string;
  name: string;
  shortName: string;
  status: string;
  description: string;
  signals: string[];
  role: string;
};

const infrastructureLayers: InfrastructureLayer[] = [
  {
    id: "client",
    number: "01",
    name: "Client Layer",
    shortName: "Client",
    status: "Connected",
    description:
      "The visible entry point where users interact with web and mobile products before requests move deeper into the system.",
    signals: [
      "Web Interface",
      "Mobile Application",
      "HTTPS",
      "Authentication",
      "Frontend Systems",
      "Request Origin",
    ],
    role:
      "Connect the user experience to the underlying application and infrastructure layers.",
  },
  {
    id: "dns",
    number: "02",
    name: "DNS Layer",
    shortName: "DNS",
    status: "Resolving",
    description:
      "Domain resolution connects public names to infrastructure and determines how requests begin their route toward the system.",
    signals: [
      "DNS",
      "Nameservers",
      "DNS Records",
      "Domain Routing",
      "Subdomains",
      "Resolution",
    ],
    role:
      "Control how domains and services resolve before traffic reaches the edge infrastructure.",
  },
  {
    id: "edge",
    number: "03",
    name: "Edge Layer",
    shortName: "Edge",
    status: "Routing",
    description:
      "The edge layer handles public traffic through Cloudflare, CDN delivery, HTTPS and SSL or TLS transport protection before requests reach origin systems.",
    signals: [
      "Cloudflare",
      "CDN",
      "SSL and TLS",
      "HTTPS",
      "Caching",
      "Traffic Routing",
    ],
    role:
      "Improve delivery, secure transport and place protective infrastructure between the internet and origin systems.",
  },
  {
    id: "defense",
    number: "04",
    name: "Defense Layer",
    shortName: "Defense",
    status: "Filtering",
    description:
      "WAF, firewall, Fail2Ban and access rules help inspect, filter and restrict unwanted traffic before it reaches sensitive server and application resources.",
    signals: [
      "WAF",
      "Firewall",
      "Fail2Ban",
      "Traffic Filtering",
      "Access Rules",
      "Security Controls",
    ],
    role:
      "Reduce exposed attack surface and control which traffic is allowed to continue deeper into the system.",
  },
  {
    id: "server",
    number: "05",
    name: "Server Layer",
    shortName: "Server",
    status: "Hardened",
    description:
      "The Linux server environment where hosting, web services, SSH access, server hardening and production resources are managed.",
    signals: [
      "Linux",
      "VPS",
      "SSH Hardening",
      "NGINX",
      "Apache",
      "LiteSpeed",
      "Server Security",
      "Hosting",
    ],
    role:
      "Operate and harden Linux hosting environments that support production workloads, web servers and exposed services.",
  },
  {
    id: "container",
    number: "06",
    name: "Container and Deployment Layer",
    shortName: "Container",
    status: "Deployed",
    description:
      "Application workloads can be packaged, isolated and deployed through controlled environments that improve consistency between systems.",
    signals: [
      "Docker",
      "Containers",
      "Application Packaging",
      "Environment Configuration",
      "Deployment",
      "Service Isolation",
      "Hosting Environment",
      "Runtime Management",
    ],
    role:
      "Create a controlled bridge between server infrastructure and application workloads using container and deployment practices.",
  },
  {
    id: "application",
    number: "07",
    name: "Application Layer",
    shortName: "Application",
    status: "Serving",
    description:
      "Application logic handles business workflows, APIs, authentication, authorization and communication between system components.",
    signals: [
      "Next.js",
      "React",
      "PHP",
      "Python",
      "REST APIs",
      "Authentication",
      "RBAC",
      "Application Security",
    ],
    role:
      "Translate product requirements into application logic while enforcing identity and access boundaries.",
  },
  {
    id: "data",
    number: "08",
    name: "Data Layer",
    shortName: "Data",
    status: "Restricted",
    description:
      "Persistent information sits behind application controls and requires clear access boundaries between users, roles and system contexts.",
    signals: [
      "MySQL",
      "Firebase",
      "Data Access",
      "Role Boundaries",
      "Tenant Boundaries",
      "Authorization",
      "Application Data",
      "Persistence",
    ],
    role:
      "Store application information while keeping access aligned with system roles and architecture.",
  },
];

function getLayer(
  id: InfrastructureLayerKey
): InfrastructureLayer {
  return (
    infrastructureLayers.find(
      (layer) => layer.id === id
    ) ?? infrastructureLayers[0]
  );
}

export default function InfrastructureSection() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const [
    activeLayer,
    setActiveLayer,
  ] =
    useState<InfrastructureLayerKey>(
      "server"
    );

  const activeData = useMemo(
    () => getLayer(activeLayer),
    [activeLayer]
  );

  const activeLayerIndex =
    useMemo(
      () =>
        infrastructureLayers.findIndex(
          (layer) =>
            layer.id === activeLayer
        ),
      [activeLayer]
    );

  const routeProgress =
    useMemo(
      () =>
        infrastructureLayers.length > 1
          ? Math.max(
              0,
              activeLayerIndex
            ) /
            (
              infrastructureLayers.length -
              1
            )
          : 0,
      [activeLayerIndex]
    );

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(
        "system:infrastructure-layer-change",
        {
          detail: {
            id: activeData.id,
            number: activeData.number,
            name: activeData.name,
            status: activeData.status,
            index: activeLayerIndex,
          },
        }
      )
    );
  }, [
    activeData,
    activeLayerIndex,
  ]);

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    if (!section) {
      return;
    }

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (reduceMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(
        ".infrastructure-header-item",
        {
          y: 30,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",

          scrollTrigger: {
            trigger: section,
            start: "top 82%",
          },
        }
      );

      gsap.from(
        ".infrastructure-node",
        {
          y: 22,
          scale: 0.97,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",

          scrollTrigger: {
            trigger:
              ".infrastructure-system",
            start: "top 88%",
          },
        }
      );

      gsap.from(
        ".infrastructure-detail",
        {
          y: 24,
          duration: 0.7,
          ease: "power3.out",

          scrollTrigger: {
            trigger:
              ".infrastructure-detail",
            start: "top 90%",
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
      id="infrastructure"
      aria-labelledby="infrastructure-title"
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
          left-[-20%]
          top-[20%]
          h-[720px]
          w-[720px]
          rounded-full
          bg-cyan-300/[0.03]
          blur-[160px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[5%]
          right-[-25%]
          h-[700px]
          w-[700px]
          rounded-full
          bg-blue-500/[0.025]
          blur-[170px]
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
            lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)]
            lg:items-end
          "
        >
          <div
            className="
              infrastructure-header-item
              min-w-0
            "
          >
            <p className="system-label mb-5">
              Clearance 06 | Infrastructure
            </p>

            <h2
              id="infrastructure-title"
              className="
                section-title
                max-w-[900px]
              "
            >
              Below every
              <br />
              interface is a system.
            </h2>
          </div>

          <div
            className="
              infrastructure-header-item
              min-w-0
            "
          >
            <p
              className="
                max-w-[580px]
                text-[15px]
                leading-7
                text-[#a8b4bd]
                sm:text-[16px]
                sm:leading-7
              "
            >
              Applications depend on
              multiple connected layers.
              I work across Linux server
              hardening, hosting, DNS,
              Cloudflare, SSL and TLS,
              WAF controls, containers,
              deployment and application
              architecture.
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
              items-center
              gap-3
            "
          >
            <span
              aria-hidden="true"
              className="status-dot"
            />

            <span className="tiny-mono">
              Infrastructure Route | Active
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
              Layers | 08
            </span>

            <span className="tiny-mono">
              Route | Connected
            </span>
          </div>
        </div>

        <div
          className="
            infrastructure-system
            relative
            overflow-hidden
            rounded-[24px]
            border
            border-white/[0.10]
            bg-[#090e13]
            sm:rounded-[28px]
            2xl:rounded-[32px]
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
                "48px 48px",
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
              p-3

              sm:grid-cols-2
              sm:p-4

              md:gap-4
              md:p-5

              xl:grid-cols-4

              2xl:hidden
            "
          >
            {infrastructureLayers.map(
              (layer) => {
                const active =
                  activeLayer ===
                  layer.id;

                return (
                  <button
                    key={layer.id}
                    type="button"
                    aria-pressed={active}
                    aria-controls="infrastructure-detail"
                    onClick={() =>
                      setActiveLayer(
                        layer.id
                      )
                    }
                    className={`
                      infrastructure-node
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
                      focus-visible:ring-offset-[#090e13]
                      motion-reduce:transition-none

                      ${
                        active
                          ? `
                            border-cyan-300/40
                            bg-cyan-300/[0.075]
                            shadow-[0_0_40px_rgba(72,215,255,0.07)]
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
                        bg-cyan-300/[0.055]
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
                        <span className="tiny-mono">
                          Layer {layer.number}
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
                        {layer.name}
                      </h3>

                      <p
                        className="
                          mt-3
                          text-[14px]
                          leading-6
                          text-[#a8b4bd]
                        "
                      >
                        {layer.description}
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
                          {layer.status}
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
              min-h-[470px]
              p-8
              2xl:block
            "
          >
            <div
              aria-hidden="true"
              className="
                absolute
                left-[6%]
                right-[6%]
                top-1/2
                h-px
                -translate-y-1/2
                bg-gradient-to-r
                from-cyan-300/[0.08]
                via-cyan-300/20
                to-cyan-300/[0.08]
              "
            />

            <div
              aria-hidden="true"
              className="
                absolute
                left-[6%]
                top-1/2
                h-[3px]
                -translate-y-1/2
                rounded-full
                bg-cyan-300/80
                shadow-[0_0_24px_rgba(72,215,255,0.45)]
                transition-[width,opacity]
                duration-500
                ease-out
                motion-reduce:transition-none
              "
              style={{
                width: `${
                  routeProgress * 88
                }%`,
                opacity:
                  activeLayerIndex === 0
                    ? 0.45
                    : 0.9,
              }}
            />

            <div
              className="
                relative
                z-10
                grid
                min-h-[400px]
                grid-cols-8
                items-center
                gap-2
              "
            >
              {infrastructureLayers.map(
                (
                  layer,
                  index
                ) => {
                  const active =
                    activeLayer ===
                    layer.id;

                  const passed =
                    index <
                    activeLayerIndex;

                  return (
                    <button
                      key={layer.id}
                      type="button"
                      aria-pressed={active}
                      aria-controls="infrastructure-detail"
                      onFocus={() =>
                        setActiveLayer(
                          layer.id
                        )
                      }
                      onClick={() =>
                        setActiveLayer(
                          layer.id
                        )
                      }
                      className={`
                        infrastructure-node
                        group
                        relative
                        flex
                        min-w-0
                        flex-col
                        items-center
                        text-center
                        outline-none
                        transition-[transform,opacity]
                        duration-500
                        ease-out
                        focus-visible:ring-2
                        focus-visible:ring-cyan-300/70
                        focus-visible:ring-offset-4
                        focus-visible:ring-offset-[#090e13]
                        motion-reduce:transition-none

                        ${
                          active
                            ? `
                                z-20
                                scale-[1.035]
                                opacity-100
                              `
                            : passed
                              ? `
                                  z-10
                                  opacity-90
                                `
                              : `
                                  opacity-65
                                  hover:opacity-90
                                `
                        }
                      `}
                    >
                      <span
                        className="
                          mb-5
                          font-mono
                          text-[10px]
                          tracking-[0.12em]
                          text-[#8f9ca5]
                          uppercase
                        "
                      >
                        Layer {layer.number}
                      </span>

                      <div
                        className={`
                          relative
                          flex
                          h-[86px]
                          w-[86px]
                          items-center
                          justify-center
                          rounded-full
                          border
                          transition
                          duration-300

                          ${
                            active
                              ? `
                                border-cyan-300/55
                                bg-cyan-300/[0.10]
                                shadow-[0_0_55px_rgba(72,215,255,0.12)]
                              `
                              : passed
                                ? `
                                    border-cyan-200/[0.18]
                                    bg-cyan-300/[0.035]
                                  `
                                : `
                                    border-white/[0.10]
                                    bg-[#0d141b]
                                    group-hover:border-cyan-300/30
                                  `
                          }
                        `}
                      >
                        <div
                          className={`
                            absolute
                            inset-[10px]
                            rounded-full
                            border

                            ${
                              active
                                ? `
                                  border-cyan-300/20
                                `
                                : passed
                                  ? `
                                      border-cyan-200/[0.10]
                                    `
                                  : `
                                      border-white/[0.05]
                                    `
                            }
                          `}
                        />

                        <span
                          className={`
                            h-3
                            w-3
                            rounded-full
                            transition

                            ${
                              active
                                ? `
                                  bg-cyan-300
                                  shadow-[0_0_24px_rgba(72,215,255,0.9)]
                                `
                                : passed
                                  ? `
                                      bg-cyan-200/60
                                    `
                                  : `
                                      bg-white/25
                                    `
                            }
                          `}
                        />
                      </div>

                      <h3
                        className="
                          mt-5
                          break-words
                          text-[13px]
                          font-semibold
                          leading-5
                          text-[#eef5f8]
                        "
                      >
                        {layer.shortName}
                      </h3>

                      <p
                        className="
                          mt-2
                          font-mono
                          text-[9px]
                          tracking-[0.08em]
                          text-[#98a5ae]
                          uppercase
                        "
                      >
                        {layer.status}
                      </p>
                    </button>
                  );
                }
              )}
            </div>

            <div
              className="
                absolute
                bottom-6
                left-7
              "
            >
              <p className="tiny-mono">
                Public Request | Origin
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
                Protected Data | Destination
              </p>
            </div>
          </div>
        </div>

        <div
          id="infrastructure-detail"
          className="
            infrastructure-detail
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
              xl:grid-cols-[minmax(340px,0.78fr)_minmax(0,1.22fr)]
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
                  Active Infrastructure Layer
                </p>

                <span className="tiny-mono">
                  {activeData.number} of 08
                </span>
              </div>

              <h3
                className="
                  mt-7
                  break-words
                  text-[28px]
                  font-semibold
                  leading-[1.08]
                  tracking-[-0.035em]
                  text-[#eef5f8]
                  uppercase
                  sm:text-[32px]
                  lg:text-[36px]
                "
              >
                {activeData.name}
              </h3>

              <p
                className="
                  mt-5
                  max-w-[560px]
                  text-[14px]
                  leading-6
                  text-[#a8b4bd]
                  sm:text-[15px]
                "
              >
                {activeData.description}
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
                  Layer Role
                </p>

                <p
                  className="
                    mt-3
                    text-[15px]
                    leading-7
                    text-[#b9c3c9]
                  "
                >
                  {activeData.role}
                </p>
              </div>

              <div
                className="
                  mt-7
                  flex
                  items-center
                  gap-3
                  border-t
                  border-white/[0.09]
                  pt-5
                "
              >
                <span
                  aria-hidden="true"
                  className="status-dot"
                />

                <div>
                  <p className="tiny-mono">
                    Layer State
                  </p>

                  <p
                    className="
                      mt-1
                      text-[12px]
                      font-semibold
                      tracking-[0.11em]
                      text-cyan-200
                      uppercase
                    "
                  >
                    {activeData.status}
                  </p>
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
                  Infrastructure Signals
                </p>

                <span className="tiny-mono">
                  Signals | Declared
                </span>
              </div>

              <div
                className="
                  grid
                  min-w-0
                  grid-cols-1
                  gap-3
                  sm:grid-cols-2
                  lg:grid-cols-3
                  2xl:grid-cols-4
                "
              >
                {activeData.signals.map(
                  (
                    signal,
                    index
                  ) => (
                    <div
                      key={signal}
                      className="
                        group
                        min-w-0
                        rounded-[16px]
                        border
                        border-white/[0.10]
                        bg-[#10161d]
                        p-4
                        transition
                        duration-300
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
                            transition
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
                        {signal}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <ClearanceEvidencePanel
          refs={infrastructureEvidenceRefs[activeData.id] ?? []}
          context={`Public case records connected to ${activeData.name}. Architecture signals remain separate from disclosed evidence.`}
          className="mt-5"
        />

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
            Infrastructure | Connected Systems
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
            Reliable products depend on
            connected DNS, edge security,
            server hardening, deployment,
            application and data layers
            operating beneath the
            interface.
          </p>
        </div>
      </div>
    </section>
  );
}