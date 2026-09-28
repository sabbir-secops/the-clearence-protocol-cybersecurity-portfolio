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

type SecurityLayerKey =
  | "application"
  | "vulnerability"
  | "mobile"
  | "infrastructure"
  | "network"
  | "intelligence";

type SecurityLayer = {
  id: SecurityLayerKey;
  number: string;
  name: string;
  shortName: string;
  description: string;
  signals: string[];
  status: string;
  angle: number;
};

const securityLayers: SecurityLayer[] = [
  {
    id: "application",
    number: "01",
    name: "Application Security",
    shortName: "AppSec",
    description:
      "Security analysis across web applications, APIs, authentication and authorization boundaries.",
    signals: [
      "Web Security",
      "OWASP",
      "API Security",
      "Authentication Testing",
      "Authorization Testing",
      "Access Control",
      "Business Logic",
      "Secure Architecture",
    ],
    status: "Protected",
    angle: -90,
  },
  {
    id: "vulnerability",
    number: "02",
    name: "Vulnerability Analysis",
    shortName: "Vulnerability",
    description:
      "Vulnerability assessment and penetration testing focused on identifying, validating and documenting weaknesses, attack paths and risky system behavior.",
    signals: [
      "VAPT",
      "Vulnerability Assessment",
      "Recon",
      "Validation",
      "CWE",
      "Security Findings",
      "Risk Context",
      "Reporting",
    ],
    status: "Scanning",
    angle: -30,
  },
  {
    id: "mobile",
    number: "03",
    name: "Mobile Security",
    shortName: "Mobile",
    description:
      "Android application analysis using security frameworks, static assessment and mobile security workflows.",
    signals: [
      "MobSF",
      "Android Security",
      "APK Analysis",
      "OWASP MASVS",
      "MSTG",
      "Static Analysis",
      "WebView Security",
      "CWE Mapping",
    ],
    status: "Analyzing",
    angle: 30,
  },
  {
    id: "infrastructure",
    number: "04",
    name: "Infrastructure Security",
    shortName: "Infrastructure",
    description:
      "Protection of servers, hosting environments, transport layers and administrative access.",
    signals: [
      "Linux Hardening",
      "SSH Hardening",
      "Firewall",
      "Fail2Ban",
      "WAF",
      "SSL and TLS",
      "Server Security",
      "Access Control",
    ],
    status: "Hardened",
    angle: 90,
  },
  {
    id: "network",
    number: "05",
    name: "Network Security",
    shortName: "Network",
    description:
      "Hands on network analysis, reconnaissance and protocol level investigation across connected systems.",
    signals: [
      "TCP and IP",
      "HTTP and HTTPS",
      "DNS",
      "Nmap",
      "Wireshark",
      "Port Analysis",
      "Network Reconnaissance",
      "Network Fundamentals",
    ],
    status: "Inspecting",
    angle: 150,
  },
  {
    id: "intelligence",
    number: "06",
    name: "Threat Intelligence",
    shortName: "Intelligence",
    description:
      "Connecting vulnerability data, threat context and technical signals into usable security intelligence.",
    signals: [
      "Threat Intelligence",
      "CVE",
      "CWE",
      "KEV",
      "EPSS",
      "MITRE ATT&CK",
      "Threat Mapping",
      "Security Context",
    ],
    status: "Monitoring",
    angle: 210,
  },
];

function getLayer(
  id: SecurityLayerKey
): SecurityLayer {
  return (
    securityLayers.find(
      (layer) => layer.id === id
    ) ?? securityLayers[0]
  );
}

function getNodePosition(
  angle: number
) {
  const horizontalRadius = 28;
  const verticalRadius = 36;

  const rad =
    (angle * Math.PI) / 180;

  return {
    left: `${
      50 +
      Math.cos(rad) *
        horizontalRadius
    }%`,
    top: `${
      50 +
      Math.sin(rad) *
        verticalRadius
    }%`,
  };
}

export default function SecurityDomainSection() {
  const sectionRef =
    useRef<HTMLElement | null>(
      null
    );

  const [
    activeLayer,
    setActiveLayer,
  ] =
    useState<SecurityLayerKey>(
      "application"
    );

  const activeData =
    useMemo(
      () =>
        getLayer(
          activeLayer
        ),
      [activeLayer]
    );

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(
        "system:security-layer-change",
        {
          detail: {
            id:
              activeData.id,
            number:
              activeData.number,
            name:
              activeData.name,
            status:
              activeData.status,
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

    const ctx =
      gsap.context(() => {
        gsap.from(
          ".security-header-item",
          {
            y: 30,
            duration: 0.75,
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
          ".security-layer-node",
          {
            autoAlpha: 0,
            duration: 0.45,
            ease: "power2.out",

            scrollTrigger: {
              trigger:
                ".security-layer-area",
              start:
                "top 88%",
            },
          }
        );

        gsap.from(
          ".security-detail-panel",
          {
            y: 25,
            duration: 0.7,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                ".security-detail-panel",
              start:
                "top 90%",
            },
          }
        );

        gsap.to(
          ".security-orbit-a",
          {
            rotate: 360,
            duration: 34,
            repeat: -1,
            ease: "none",
            scrollTrigger: {
              trigger:
                ".security-layer-area",
              start: "top 90%",
              end: "bottom 10%",
              toggleActions:
                "play pause resume pause",
            },
          }
        );

        gsap.to(
          ".security-orbit-b",
          {
            rotate: -360,
            duration: 27,
            repeat: -1,
            ease: "none",
            scrollTrigger: {
              trigger:
                ".security-layer-area",
              start: "top 90%",
              end: "bottom 10%",
              toggleActions:
                "play pause resume pause",
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
      id="security"
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
          top-[35%]
          h-[700px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-cyan-300/[0.035]
          blur-[150px]
          xl:h-[950px]
          xl:w-[950px]
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
              security-header-item
              min-w-0
            "
          >
            <p className="system-label mb-5">
              Clearance 04 | Security Layer
            </p>

            <h2
              className="
                section-title
                max-w-[900px]
              "
            >
              Security is not
              <br />
              a final checkbox.
            </h2>
          </div>

          <div
            className="
              security-header-item
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
              Security decisions begin
              before deployment. I use
              offensive security and
              penetration testing
              workflows to explore
              application behavior,
              access control, network
              surfaces and infrastructure,
              understand failure paths
              and design systems more
              defensively.
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

            <span
              className="
                font-mono
                text-[10px]
                tracking-[0.12em]
                text-[#b6c0c6]
                uppercase
                sm:text-[11px]
              "
            >
              Defensive Surface Active
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
              Attack Surface | Observed
            </span>

            <span className="tiny-mono">
              Security State | Active
            </span>
          </div>
        </div>

        <div
          className="
            security-layer-area
            relative
            overflow-hidden
            rounded-[24px]
            border
            border-white/[0.10]
            bg-[#090e13]
            sm:rounded-[28px]
            xl:rounded-[32px]
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
                "50px 50px",
            }}
          />

          <div
            className="
              relative
              z-10
              grid
              gap-3
              p-3
              sm:grid-cols-2
              sm:p-4
              md:gap-4
              md:p-5
              xl:hidden
            "
          >
            {securityLayers.map(
              (layer) => {
                const active =
                  activeLayer ===
                  layer.id;

                return (
                  <button
                    key={layer.id}
                    type="button"
                    aria-pressed={
                      active
                    }
                    onClick={() =>
                      setActiveLayer(
                        layer.id
                      )
                    }
                    className={`
                      security-layer-node
                      group
                      relative
                      min-w-0
                      overflow-hidden
                      rounded-[20px]
                      border
                      p-5
                      text-left
                      transition
                      duration-300
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-cyan-300/70
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-[#090e13]

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
                          text-[20px]
                          font-semibold
                          leading-tight
                          tracking-[-0.025em]
                          text-[#eef5f8]
                          sm:text-[22px]
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
                        {
                          layer.description
                        }
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
              min-h-[780px]
              xl:block
              2xl:min-h-[820px]
            "
          >
            <div
              aria-hidden="true"
              className="
                security-orbit-a
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[510px]
                w-[510px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-dashed
                border-cyan-300/[0.12]
                2xl:h-[555px]
                2xl:w-[555px]
              "
            />

            <div
              aria-hidden="true"
              className="
                security-orbit-b
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[360px]
                w-[360px]
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
              {securityLayers.map(
                (layer) => {
                  const position =
                    getNodePosition(
                      layer.angle
                    );

                  const x =
                    parseFloat(
                      position.left
                    ) * 10;

                  const y =
                    parseFloat(
                      position.top
                    ) * 7.8;

                  const active =
                    activeLayer ===
                      layer.id;

                  return (
                    <g
                      key={layer.id}
                    >
                      <line
                        x1="500"
                        y1="390"
                        x2={x}
                        y2={y}
                        stroke="#48d7ff"
                        strokeOpacity="0.10"
                        strokeWidth="1"
                      />

                      {active && (
                        <>
                          <line
                            x1="500"
                            y1="390"
                            x2={x}
                            y2={y}
                            stroke="#48d7ff"
                            strokeOpacity="0.12"
                            strokeWidth="8"
                          />

                          <line
                            x1="500"
                            y1="390"
                            x2={x}
                            y2={y}
                            stroke="#7be5ff"
                            strokeOpacity="0.70"
                            strokeWidth="1.35"
                          />

                          <circle
                            cx={x}
                            cy={y}
                            r="5"
                            fill="#7be5ff"
                            fillOpacity="0.92"
                          />
                        </>
                      )}
                    </g>
                  );
                }
              )}
            </svg>

            <div
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
                  h-[230px]
                  w-[230px]
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-cyan-300/35
                  bg-[#0c151c]
                  shadow-[0_0_120px_rgba(72,215,255,0.12)]
                  2xl:h-[245px]
                  2xl:w-[245px]
                "
              >
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    inset-[18px]
                    rounded-full
                    border
                    border-white/[0.08]
                  "
                />

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    inset-[37px]
                    rounded-full
                    border
                    border-dashed
                    border-cyan-300/[0.18]
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
                  <div
                    className="
                      mx-auto
                      mb-5
                      h-3
                      w-3
                      rounded-full
                      bg-cyan-300
                      shadow-[0_0_26px_rgba(72,215,255,0.9)]
                    "
                  />

                  <p className="tiny-mono">
                    Defensive Core
                  </p>

                  <p
                    className="
                      mt-3
                      text-[18px]
                      font-semibold
                      leading-6
                      tracking-[0.08em]
                      text-white
                      uppercase
                    "
                  >
                    Security
                    <br />
                    Architecture
                  </p>
                </div>
              </div>
            </div>

            {securityLayers.map(
              (layer) => {
                const position =
                  getNodePosition(
                    layer.angle
                  );

                const active =
                  activeLayer ===
                  layer.id;

                return (
                  <button
                    key={layer.id}
                    type="button"
                    aria-pressed={
                      active
                    }
                    onMouseEnter={() =>
                      setActiveLayer(
                        layer.id
                      )
                    }
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
                      security-layer-node
                      absolute
                      z-30
                      w-[220px]
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-[20px]
                      border
                      p-5
                      text-left
                      backdrop-blur-xl
                      transition-[transform,border-color,background-color,box-shadow,opacity]
                      duration-500
                      ease-out
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-cyan-300/70
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-[#090e13]

                      ${
                        active
                          ? `
                            scale-[1.025]
                            border-cyan-300/45
                            bg-cyan-300/[0.09]
                            opacity-100
                            shadow-[0_18px_52px_rgba(0,0,0,0.30),0_0_52px_rgba(72,215,255,0.10)]
                          `
                          : `
                            border-white/[0.11]
                            bg-[#0d141b]/95
                            opacity-72
                            hover:border-cyan-300/30
                            hover:bg-[#101920]
                            hover:opacity-100
                          `
                      }
                    `}
                    style={{
                      left:
                        position.left,
                      top:
                        position.top,
                      zIndex:
                        active
                          ? 36
                          : 28,
                    }}
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
                        "
                      >
                        Layer {layer.number}
                      </span>

                      <span
                        className={`
                          h-2
                          w-2
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

                    <p
                      className="
                        mt-4
                        text-[15px]
                        font-semibold
                        leading-5
                        text-[#eef5f8]
                      "
                    >
                      {layer.shortName}
                    </p>

                    <p
                      className="
                        mt-2
                        font-mono
                        text-[10px]
                        tracking-[0.11em]
                        text-[#9aa8b1]
                        uppercase
                      "
                    >
                      {layer.status}
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
                Attack Surface | Observed
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
                Defensive Layers | Online
              </p>
            </div>
          </div>
        </div>

        <div
          className="
            security-detail-panel
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
              xl:grid-cols-[minmax(340px,0.8fr)_minmax(0,1.2fr)]
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
                  Active Security Layer
                </p>

                <span className="tiny-mono">
                  {activeData.number} of 06
                </span>
              </div>

              <h3
                className="
                  mt-7
                  break-words
                  text-[31px]
                  font-semibold
                  leading-[1.05]
                  tracking-[-0.04em]
                  text-[#eef5f8]
                  uppercase
                  sm:text-[38px]
                  lg:text-[44px]
                "
              >
                {activeData.name}
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
                {
                  activeData.description
                }
              </p>

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
                <span className="status-dot" />

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
                    {
                      activeData.status
                    }
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
                  Security Signals
                </p>

                <span className="tiny-mono">
                  Evidence Layer
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
            Security | Architecture Before Deployment
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
            Security is treated as a
            system property, not a
            decorative layer added
            after the build.
          </p>
        </div>
      </div>
    </section>
  );
}