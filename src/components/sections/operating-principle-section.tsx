"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    number: "01",
    name: "Build",
    description:
      "Design product architecture and engineer web, app and SaaS systems with clear structure and scalable foundations.",
    tags: [
      "Web Engineering",
      "App Engineering",
      "SaaS",
      "Product Architecture",
    ],
  },
  {
    number: "02",
    name: "Secure",
    description:
      "Apply application security, API security, access control and security architecture across product and infrastructure boundaries.",
    tags: [
      "Application Security",
      "API Security",
      "Access Control",
      "OWASP",
    ],
  },
  {
    number: "03",
    name: "Verify",
    description:
      "Use vulnerability assessment, penetration testing and security validation to test assumptions before trust is established.",
    tags: [
      "VAPT",
      "Penetration Testing",
      "Vulnerability Analysis",
      "QA",
    ],
  },
  {
    number: "04",
    name: "Operate",
    description:
      "Operate and harden Linux, hosting and server environments across DNS, Cloudflare and deployment infrastructure.",
    tags: [
      "Linux",
      "Server Hardening",
      "Cloudflare",
      "DNS",
    ],
  },
  {
    number: "05",
    name: "Optimize",
    description:
      "Improve web performance, Core Web Vitals, technical SEO, structured data and modern search discoverability.",
    tags: [
      "Technical SEO",
      "Core Web Vitals",
      "Structured Data",
      "AEO | GEO",
    ],
  },
  {
    number: "06",
    name: "Evolve",
    description:
      "Research and evolve systems through security research, technical research, AI assisted engineering and emerging technology.",
    tags: [
      "Security Research",
      "Technical Research",
      "AI Assisted Engineering",
      "Emerging Technology",
    ],
  },
];

const LAST_STAGE_INDEX =
  stages.length - 1;

function clampStage(
  value: number
) {
  return Math.min(
    Math.max(
      value,
      0
    ),
    LAST_STAGE_INDEX
  );
}

export default function OperatingPrincipleSection() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const progressRef =
    useRef<HTMLDivElement | null>(null);

  const activeStageRef =
    useRef(0);

  const [
    activeStage,
    setActiveStage,
  ] = useState(0);

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

    const dispatchStage =
      (
        index: number,
        progress: number
      ) => {
        const nextIndex =
          clampStage(index);

        if (
          activeStageRef.current !==
          nextIndex
        ) {
          activeStageRef.current =
            nextIndex;

          setActiveStage(
            nextIndex
          );
        }

        window.dispatchEvent(
          new CustomEvent(
            "system:logic-stage-change",
            {
              detail: {
                index:
                  nextIndex,
                name:
                  stages[
                    nextIndex
                  ].name,
                progress,
              },
            }
          )
        );
      };

    if (reduceMotion) {
      dispatchStage(
        0,
        0
      );

      return;
    }

    const ctx =
      gsap.context(() => {
        gsap.from(
          ".principle-header-item",
          {
            y: 24,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",

            scrollTrigger: {
              trigger: section,
              start: "top 82%",
            },
          }
        );

        gsap.from(
          ".principle-stage",
          {
            scale: 0.985,
            duration: 0.65,
            stagger: 0.045,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                ".principle-stage-grid",
              start: "top 88%",
            },
          }
        );

        if (
          progressRef.current
        ) {
          gsap.fromTo(
            progressRef.current,
            {
              scaleX: 0,
            },
            {
              scaleX: 1,
              transformOrigin:
                "left center",
              ease: "none",

              scrollTrigger: {
                trigger: section,
                start: "top 68%",
                end: "bottom 55%",
                scrub: true,
              },
            }
          );
        }

        ScrollTrigger.create({
          trigger: section,
          start: "top 62%",
          end: "bottom 38%",

          onUpdate: (
            self
          ) => {
            const index =
              clampStage(
                Math.floor(
                  self.progress *
                    stages.length
                )
              );

            dispatchStage(
              index,
              self.progress
            );
          },

          onEnter: () => {
            dispatchStage(
              activeStageRef.current,
              activeStageRef.current /
                LAST_STAGE_INDEX
            );
          },

          onEnterBack: () => {
            dispatchStage(
              activeStageRef.current,
              activeStageRef.current /
                LAST_STAGE_INDEX
            );
          },
        });
      }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="principle"
      aria-labelledby="system-logic-title"
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
          top-[25%]
          h-[650px]
          w-[750px]
          max-w-full
          -translate-x-1/2
          rounded-full
          bg-cyan-300/[0.035]
          blur-[150px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-[8%]
          top-[44%]
          hidden
          h-px
          bg-gradient-to-r
          from-transparent
          via-cyan-300/[0.10]
          to-transparent
          xl:block
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
              principle-header-item
              min-w-0
            "
          >
            <p className="system-label mb-5">
              System Logic | 06 Stages
            </p>

            <h2
              id="system-logic-title"
              className="
                section-title
                max-w-[940px]
              "
            >
              Build. Secure.
              <br />
              Verify. Operate.
              <br />
              Optimize. Evolve.
            </h2>
          </div>

          <div
            className="
              principle-header-item
              min-w-0
            "
          >
            <p
              className="
                max-w-[570px]
                text-[16px]
                leading-7
                text-[#a8b4bd]
                sm:text-[17px]
                sm:leading-8
              "
            >
              A digital product is
              more than an interface.
              My operating model
              connects product
              engineering, application
              security, security
              testing, infrastructure,
              performance, technical
              SEO and research across
              one continuous lifecycle.
            </p>

            <div
              aria-hidden="true"
              className="
                mt-6
                flex
                items-center
                gap-3
                font-mono
                text-[10px]
                tracking-[0.11em]
                text-cyan-200/70
                uppercase
                sm:text-[11px]
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-cyan-300
                  shadow-[0_0_14px_rgba(72,215,255,0.7)]
                "
              />

              <span>
                Lifecycle Signal |{" "}
                {stages[
                  activeStage
                ].number}
                {" | "}
                {stages[
                  activeStage
                ].name}
              </span>
            </div>
          </div>
        </div>

        <div
          className="
            relative
            mb-7
            hidden
            2xl:block
          "
        >
          <div
            className="
              h-px
              w-full
              bg-white/[0.12]
            "
          />

          <div
            ref={progressRef}
            aria-hidden="true"
            className="
              absolute
              left-0
              top-0
              h-px
              w-full
              origin-left
              bg-gradient-to-r
              from-cyan-300/30
              via-cyan-300
              to-cyan-300/30
              shadow-[0_0_20px_rgba(72,215,255,0.4)]
            "
          />

          <div
            className="
              absolute
              inset-x-0
              top-0
              grid
              -translate-y-1/2
              grid-cols-6
            "
          >
            {stages.map(
              (
                stage,
                index
              ) => {
                const active =
                  index <=
                  activeStage;

                return (
                  <div
                    key={
                      stage.name
                    }
                    className="
                      flex
                      justify-center
                    "
                  >
                    <span
                      aria-hidden="true"
                      className={`
                        h-2.5
                        w-2.5
                        rounded-full
                        border
                        transition-all
                        duration-500

                        ${
                          active
                            ? "border-cyan-200/70 bg-cyan-300 shadow-[0_0_18px_rgba(72,215,255,0.7)]"
                            : "border-white/20 bg-[#0c1117]"
                        }
                      `}
                    />
                  </div>
                );
              }
            )}
          </div>
        </div>

        <ol
          className="
            principle-stage-grid
            grid
            list-none
            min-w-0
            grid-cols-1
            items-stretch
            gap-3
            sm:grid-cols-2
            sm:gap-4
            xl:grid-cols-3
            2xl:grid-cols-6
            2xl:[perspective:1400px]
          "
        >
          {stages.map(
            (
              stage,
              index
            ) => {
              const isActive =
                index ===
                activeStage;

              const isComplete =
                index <
                activeStage;

              return (
                <li
                  key={stage.name}
                  aria-current={
                    isActive
                      ? "step"
                      : undefined
                  }
                  className={`
                    principle-stage
                    group
                    relative
                    flex
                    h-full
                    min-w-0
                    min-h-[300px]
                    flex-col
                    overflow-hidden
                    rounded-[22px]
                    border
                    p-5
                    transition-[transform,border-color,background-color,box-shadow,opacity]
                    duration-500
                    ease-out
                    sm:min-h-[325px]
                    sm:p-6
                    2xl:min-h-[390px]
                    2xl:p-5

                    ${
                      isActive
                        ? "border-cyan-300/35 bg-[#0d151c] shadow-[0_20px_70px_rgba(0,0,0,0.28),0_0_42px_rgba(72,215,255,0.055)] 2xl:[transform:translate3d(0,-7px,22px)]"
                        : isComplete
                          ? "border-white/[0.12] bg-[#0c1218]"
                          : "border-white/[0.10] bg-[#0c1117]"
                    }
                  `}
                >
                  <div
                    aria-hidden="true"
                    className={`
                      pointer-events-none
                      absolute
                      inset-x-0
                      top-0
                      h-px
                      transition-opacity
                      duration-500

                      ${
                        isActive
                          ? "bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent opacity-100"
                          : "bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-45"
                      }
                    `}
                  />

                  <div
                    aria-hidden="true"
                    className={`
                      pointer-events-none
                      absolute
                      -right-16
                      -top-16
                      h-40
                      w-40
                      rounded-full
                      blur-[60px]
                      transition-opacity
                      duration-500

                      ${
                        isActive
                          ? "bg-cyan-300/[0.08] opacity-100"
                          : "bg-cyan-300/[0.03] opacity-0"
                      }
                    `}
                  />

                  <div
                    className="
                      relative
                      z-10
                      mb-9
                      flex
                      items-center
                      justify-between
                      gap-4
                    "
                  >
                    <span
                      className={`
                        font-mono
                        text-[10px]
                        tracking-[0.13em]
                        uppercase
                        transition-colors
                        duration-500
                        sm:text-[11px]

                        ${
                          isActive
                            ? "text-cyan-200"
                            : "text-[#a8b4bd]"
                        }
                      `}
                    >
                      Stage {stage.number}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`
                        h-2
                        w-2
                        shrink-0
                        rounded-full
                        transition-all
                        duration-500

                        ${
                          isActive
                            ? "bg-cyan-300 shadow-[0_0_18px_rgba(72,215,255,0.8)]"
                            : isComplete
                              ? "bg-cyan-200/55"
                              : "bg-white/40"
                        }
                      `}
                    />
                  </div>

                  <h3
                    className="
                      relative
                      z-10
                      break-words
                      text-[27px]
                      font-semibold
                      leading-tight
                      tracking-[-0.035em]
                      text-[#eef5f8]
                      uppercase
                      sm:text-[30px]
                      2xl:text-[25px]
                    "
                  >
                    {stage.name}
                  </h3>

                  <p
                    className="
                      relative
                      z-10
                      mt-5
                      text-[15px]
                      leading-7
                      text-[#a8b4bd]
                      2xl:text-[14px]
                      2xl:leading-6
                    "
                  >
                    {stage.description}
                  </p>

                  <div
                    className="
                      relative
                      z-10
                      mt-auto
                      flex
                      min-w-0
                      flex-wrap
                      gap-2
                      pt-7
                    "
                  >
                    {stage.tags.map(
                      (tag) => (
                        <span
                          key={tag}
                          className={`
                            max-w-full
                            rounded-full
                            border
                            px-3
                            py-1.5
                            text-[10px]
                            font-medium
                            leading-5
                            tracking-[0.09em]
                            uppercase
                            transition-colors
                            duration-500

                            ${
                              isActive
                                ? "border-cyan-200/20 bg-cyan-200/[0.04] text-[#d2dde3]"
                                : "border-white/[0.13] bg-white/[0.035] text-[#c0c9cf]"
                            }
                          `}
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>

                  <span
                    aria-hidden="true"
                    className={`
                      pointer-events-none
                      absolute
                      bottom-[-15px]
                      right-3
                      text-[74px]
                      font-bold
                      leading-none
                      tracking-[-0.08em]
                      transition-colors
                      duration-500
                      sm:text-[86px]
                      2xl:text-[72px]

                      ${
                        isActive
                          ? "text-cyan-200/[0.07]"
                          : "text-white/[0.04]"
                      }
                    `}
                  >
                    {stage.number}
                  </span>
                </li>
              );
            }
          )}
        </ol>

        <div
          className="
            mt-10
            flex
            flex-col
            gap-3
            border-t
            border-white/[0.09]
            pt-6
            sm:mt-12
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p className="tiny-mono">
            System Philosophy | Connected Lifecycle
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
            Product architecture,
            application security,
            penetration testing,
            infrastructure,
            performance and search
            engineering operate as one
            connected lifecycle.
          </p>
        </div>
      </div>
    </section>
  );
}