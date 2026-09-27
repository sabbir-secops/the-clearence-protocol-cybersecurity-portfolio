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

type ResearchNodeKey =
  | "security"
  | "technical"
  | "ai"
  | "llm"
  | "rag"
  | "visualization"
  | "interactive"
  | "documentation";

type ResearchNode = {
  id: ResearchNodeKey;
  number: string;
  name: string;
  shortName: string;
  status: string;
  description: string;
  purpose: string;
  signals: string[];
};

const researchNodes: ResearchNode[] = [
  {
    id: "security",
    number: "01",
    name: "Security Research",
    shortName: "Security",
    status: "Investigating",
    description:
      "Security research connects vulnerabilities, attack surfaces, tools and technical evidence into a clearer understanding of system behavior.",
    purpose:
      "Explore how security weaknesses appear, how they can be validated and how technical evidence can support stronger defensive decisions.",
    signals: [
      "Vulnerability Research",
      "OWASP",
      "CWE",
      "CVE",
      "Attack Surface",
      "Security Tooling",
      "Technical Evidence",
      "Security Findings",
    ],
  },
  {
    id: "technical",
    number: "02",
    name: "Technical Research",
    shortName: "Technical",
    status: "Exploring",
    description:
      "Technical research supports better architecture and engineering decisions by investigating unfamiliar technologies, systems and implementation approaches.",
    purpose:
      "Turn unknown technical problems into structured questions, useful findings and practical engineering direction.",
    signals: [
      "System Research",
      "Technology Evaluation",
      "Architecture Study",
      "Documentation Review",
      "Technical Comparison",
      "Implementation Research",
      "Problem Analysis",
      "Engineering Context",
    ],
  },
  {
    id: "ai",
    number: "03",
    name: "AI Assisted Engineering",
    shortName: "AI Engineering",
    status: "Augmenting",
    description:
      "AI tools can assist research, coding, analysis and documentation when they are used with technical verification and human control.",
    purpose:
      "Use AI as an engineering assistant for repetitive work, exploration and acceleration without replacing technical judgment.",
    signals: [
      "AI Assisted Development",
      "Code Assistance",
      "Research Support",
      "Workflow Acceleration",
      "Prompt Design",
      "Technical Validation",
      "Automation Support",
      "Human Review",
    ],
  },
  {
    id: "llm",
    number: "04",
    name: "LLM Concepts",
    shortName: "LLM",
    status: "Learning",
    description:
      "Large language model concepts help explain how modern AI systems process instructions, context and language based information.",
    purpose:
      "Build practical understanding of model behavior, context handling and how language models can connect with product workflows.",
    signals: [
      "LLM Concepts",
      "Context",
      "Prompt Structure",
      "Model Interaction",
      "Token Awareness",
      "System Instructions",
      "AI Workflows",
      "Model Behavior",
    ],
  },
  {
    id: "rag",
    number: "05",
    name: "RAG Concepts",
    shortName: "RAG",
    status: "Connecting",
    description:
      "Retrieval augmented generation introduces a way to connect language models with external information and controlled knowledge sources.",
    purpose:
      "Understand how retrieval, context and generated responses can work together in knowledge aware AI systems.",
    signals: [
      "Retrieval",
      "Knowledge Sources",
      "Context Injection",
      "Embeddings Concepts",
      "Search Context",
      "Grounded Responses",
      "Information Retrieval",
      "Knowledge Workflows",
    ],
  },
  {
    id: "visualization",
    number: "06",
    name: "Data Visualization",
    shortName: "Visualization",
    status: "Mapping",
    description:
      "Visualization turns technical information into patterns that can be inspected, compared and understood more quickly.",
    purpose:
      "Represent system relationships, research findings and technical information in clearer visual forms.",
    signals: [
      "Data Visualization",
      "System Mapping",
      "Charts",
      "Technical Signals",
      "Relationship Mapping",
      "Information Design",
      "Visual Analysis",
      "Pattern Discovery",
    ],
  },
  {
    id: "interactive",
    number: "07",
    name: "Interactive Systems",
    shortName: "Interactive",
    status: "Experimenting",
    description:
      "Interactive systems combine engineering, motion and visual feedback to create digital experiences that respond to user input.",
    purpose:
      "Explore interfaces where users can inspect information through interaction instead of reading static presentation layers.",
    signals: [
      "Interactive UI",
      "Three.js",
      "React Three Fiber",
      "GSAP",
      "Motion Systems",
      "3D Interfaces",
      "User Interaction",
      "Experience Design",
    ],
  },
  {
    id: "documentation",
    number: "08",
    name: "Technical Documentation",
    shortName: "Documentation",
    status: "Recording",
    description:
      "Documentation converts technical decisions, architecture, findings and workflows into information that can be reused and understood later.",
    purpose:
      "Preserve technical context so systems, research and engineering decisions remain understandable beyond the implementation itself.",
    signals: [
      "Technical Writing",
      "Architecture Notes",
      "Research Notes",
      "Security Reports",
      "Requirements",
      "System Documentation",
      "Process Documentation",
      "Knowledge Capture",
    ],
  },
];

function getNode(
  id: ResearchNodeKey
): ResearchNode {
  return (
    researchNodes.find(
      (node) => node.id === id
    ) ?? researchNodes[0]
  );
}

export default function ResearchIntelligenceSection() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const [
    activeNode,
    setActiveNode,
  ] =
    useState<ResearchNodeKey>(
      "security"
    );

  const activeData =
    useMemo(
      () =>
        getNode(
          activeNode
        ),
      [activeNode]
    );

  useEffect(() => {
    const index =
      researchNodes.findIndex(
        (node) =>
          node.id ===
          activeData.id
      );

    window.dispatchEvent(
      new CustomEvent(
        "system:research-node-change",
        {
          detail: {
            id: activeData.id,
            number:
              activeData.number,
            name:
              activeData.name,
            status:
              activeData.status,
            index,
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
          ".research-header-item",
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
          ".research-node",
          {
            y: 22,
            scale: 0.97,
            duration: 0.6,
            stagger: 0.045,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                ".research-grid",
              start: "top 88%",
            },
          }
        );

        gsap.from(
          ".research-detail",
          {
            y: 24,
            duration: 0.7,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                ".research-detail",
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
      id="research"
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
          right-[-20%]
          top-[15%]
          h-[780px]
          w-[780px]
          rounded-full
          bg-cyan-300/[0.03]
          blur-[170px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[0%]
          left-[-20%]
          h-[650px]
          w-[650px]
          rounded-full
          bg-blue-500/[0.02]
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
            lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)]
            lg:items-end
          "
        >
          <div
            className="
              research-header-item
              min-w-0
            "
          >
            <p className="system-label mb-5">
              Clearance 08 | Research and Intelligence
            </p>

            <h2
              className="
                section-title
                max-w-[920px]
              "
            >
              Curiosity is part
              <br />
              of the toolchain.
            </h2>
          </div>

          <div
            className="
              research-header-item
              min-w-0
            "
          >
            <p
              className="
                max-w-[590px]
                text-[16px]
                leading-7
                text-[#a8b4bd]
                sm:text-[17px]
                sm:leading-8
              "
            >
              Research helps me
              understand unfamiliar
              systems, security
              behavior and emerging
              technologies before
              turning them into
              practical engineering
              decisions.
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
              Intelligence Grid | Active
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
              Nodes | 08
            </span>

            <span className="tiny-mono">
              Research State | Online
            </span>
          </div>
        </div>

        <div
          className="
            research-grid
            relative
            overflow-hidden
            rounded-[24px]
            border
            border-white/[0.10]
            bg-[#090e13]
            p-3
            sm:rounded-[28px]
            sm:p-4
            md:p-5
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
              sm:grid-cols-2
              md:gap-4
              xl:grid-cols-4
            "
          >
            {researchNodes.map(
              (node) => {
                const active =
                  activeNode ===
                  node.id;

                return (
                  <button
                    key={node.id}
                    type="button"
                    aria-pressed={
                      active
                    }
                    onFocus={() =>
                      setActiveNode(
                        node.id
                      )
                    }
                    onClick={() =>
                      setActiveNode(
                        node.id
                      )
                    }
                    className={`
                      research-node
                      group
                      relative
                      min-w-0
                      min-h-[235px]
                      overflow-hidden
                      rounded-[20px]
                      border
                      p-5
                      text-left
                      transition
                      duration-300

                      ${
                        active
                          ? `
                            scale-[1.015]
                            border-violet-300/45
                            bg-violet-300/[0.075]
                            shadow-[0_16px_44px_rgba(0,0,0,0.24),0_0_42px_rgba(120,109,255,0.09)]
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
                      className="
                        pointer-events-none
                        absolute
                        right-[-45px]
                        top-[-45px]
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
                        flex
                        h-full
                        min-w-0
                        flex-col
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
                          Node {node.number}
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
                                  bg-violet-300
                                  shadow-[0_0_18px_rgba(120,109,255,0.82)]
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
                        {node.name}
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
                          node.description
                        }
                      </p>

                      <div
                        className="
                          mt-auto
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
                          {node.status}
                        </span>

                        <span
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
              Investigation | Analysis | Experiment
            </span>

            <span className="tiny-mono">
              Knowledge | Connected
            </span>
          </div>
        </div>

        <div
          className="
            research-detail
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
                  Active Intelligence Node
                </p>

                <span className="tiny-mono">
                  {activeData.number} of 08
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
                  border-t
                  border-white/[0.09]
                  pt-6
                "
              >
                <p className="system-label">
                  Research Purpose
                </p>

                <p
                  className="
                    mt-3
                    text-[15px]
                    leading-7
                    text-[#b9c3c9]
                  "
                >
                  {activeData.purpose}
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
                <span className="status-dot" />

                <div>
                  <p className="tiny-mono">
                    Node State
                  </p>

                  <p
                    className="
                      mt-1
                      text-[12px]
                      font-semibold
                      tracking-[0.11em]
                      text-violet-200
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
                  Intelligence Signals
                </p>

                <span className="tiny-mono">
                  Research Context | Active
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
            Research | Intelligence | Experimentation
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
            Research turns curiosity
            into context that can
            improve engineering and
            security decisions.
          </p>
        </div>
      </div>
    </section>
  );
}