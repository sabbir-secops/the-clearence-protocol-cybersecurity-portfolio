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

type SearchLayerKey =
  | "performance"
  | "vitals"
  | "technical"
  | "architecture"
  | "structured"
  | "semantic"
  | "aeo"
  | "geo";

type SearchLayer = {
  id: SearchLayerKey;
  number: string;
  name: string;
  shortName: string;
  status: string;
  description: string;
  role: string;
  signals: string[];
};

const searchLayers: SearchLayer[] = [
  {
    id: "performance",
    number: "01",
    name: "Performance Engineering",
    shortName: "Performance",
    status: "Optimizing",
    description:
      "Technical performance shapes how quickly users and search systems can access and interact with a digital product.",
    role:
      "Reduce unnecessary friction across loading, rendering and delivery so the product remains responsive and efficient.",
    signals: [
      "Performance Optimization",
      "Loading Strategy",
      "Caching",
      "Asset Optimization",
      "Rendering",
      "Delivery",
      "Page Speed",
      "Technical Efficiency",
    ],
  },
  {
    id: "vitals",
    number: "02",
    name: "Core Web Vitals",
    shortName: "Web Vitals",
    status: "Measuring",
    description:
      "User experience signals help identify visual instability, interaction delays and loading issues that affect real world performance.",
    role:
      "Measure and improve the technical experience users receive while interacting with the interface.",
    signals: [
      "LCP",
      "INP",
      "CLS",
      "Loading Experience",
      "Interaction",
      "Visual Stability",
      "Performance Analysis",
      "UX Signals",
    ],
  },
  {
    id: "technical",
    number: "03",
    name: "Technical SEO",
    shortName: "Technical SEO",
    status: "Auditing",
    description:
      "Technical SEO connects crawlability, indexing, canonicalization and site health with the underlying structure of a website.",
    role:
      "Keep pages accessible to search systems while identifying technical issues that can limit indexing and discoverability.",
    signals: [
      "Crawlability",
      "Indexing",
      "Canonicalization",
      "Sitemaps",
      "Robots Control",
      "Technical Audits",
      "Local SEO",
      "Search Health",
    ],
  },
  {
    id: "architecture",
    number: "04",
    name: "Site Architecture",
    shortName: "Architecture",
    status: "Structuring",
    description:
      "Clear information architecture helps users and search systems understand how pages, topics and entities relate to each other.",
    role:
      "Organize content and navigation into logical structures that improve discovery, context and technical maintainability.",
    signals: [
      "Information Architecture",
      "URL Structure",
      "Internal Linking",
      "Navigation",
      "Content Hierarchy",
      "Topic Structure",
      "Page Relationships",
      "Search Architecture",
    ],
  },
  {
    id: "structured",
    number: "05",
    name: "Structured Data",
    shortName: "Structured Data",
    status: "Mapping",
    description:
      "Structured data and JSON-LD give search systems machine readable context about pages, entities, products, organizations and content.",
    role:
      "Add structured context so digital content can be interpreted more accurately by modern search systems.",
    signals: [
      "Schema",
      "JSON-LD",
      "Entity Markup",
      "Organization Data",
      "Product Data",
      "Content Context",
      "Rich Results",
      "Machine Readability",
    ],
  },
  {
    id: "semantic",
    number: "06",
    name: "Semantic SEO",
    shortName: "Semantic",
    status: "Connecting",
    description:
      "Semantic SEO and entity based thinking connect topics, concepts and relationships instead of treating search as isolated keywords.",
    role:
      "Build stronger contextual relationships between content, entities and the wider information architecture.",
    signals: [
      "Semantic SEO",
      "Entity SEO",
      "Topic Relationships",
      "Search Intent",
      "Context",
      "Knowledge Signals",
      "Content Entities",
      "Topical Structure",
    ],
  },
  {
    id: "aeo",
    number: "07",
    name: "Answer Engine Optimization",
    shortName: "AEO",
    status: "Answering",
    description:
      "Answer Engine Optimization structures clear, direct information so modern search experiences can understand and surface useful responses.",
    role:
      "Make important information easier to interpret, retrieve and present across answer based search experiences.",
    signals: [
      "AEO",
      "Direct Answers",
      "Question Intent",
      "Information Clarity",
      "Content Structure",
      "Entity Context",
      "Retrieval",
      "Answer Surfaces",
    ],
  },
  {
    id: "geo",
    number: "08",
    name: "Generative Engine Optimization",
    shortName: "GEO",
    status: "Evolving",
    description:
      "Generative Engine Optimization explores AI search and emerging discovery surfaces where entity context, source clarity and machine readable information matter.",
    role:
      "Explore how content and technical systems can remain understandable across emerging AI driven discovery environments.",
    signals: [
      "GEO",
      "AI Search",
      "Generative Discovery",
      "Entity Context",
      "Source Clarity",
      "Semantic Signals",
      "Content Structure",
      "Emerging Search",
    ],
  },
];

function getLayer(
  id: SearchLayerKey
): SearchLayer {
  return (
    searchLayers.find(
      (layer) => layer.id === id
    ) ?? searchLayers[0]
  );
}

export default function SearchPerformanceSection() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const [
    activeLayer,
    setActiveLayer,
  ] =
    useState<SearchLayerKey>(
      "performance"
    );

  const activeData = useMemo(
    () => getLayer(activeLayer),
    [activeLayer]
  );

  const activeLayerIndex =
    useMemo(
      () =>
        searchLayers.findIndex(
          (layer) =>
            layer.id === activeLayer
        ),
      [activeLayer]
    );

  const signalProgress =
    useMemo(
      () =>
        searchLayers.length > 1
          ? Math.max(
              0,
              activeLayerIndex
            ) /
            (
              searchLayers.length -
              1
            )
          : 0,
      [activeLayerIndex]
    );

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(
        "system:search-layer-change",
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
        ".search-header-item",
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
        ".search-layer-node",
        {
          y: 22,
          scale: 0.97,
          duration: 0.6,
          stagger: 0.045,
          ease: "power3.out",

          scrollTrigger: {
            trigger:
              ".search-system",
            start: "top 88%",
          },
        }
      );

      gsap.from(
        ".search-detail-panel",
        {
          y: 24,
          duration: 0.7,
          ease: "power3.out",

          scrollTrigger: {
            trigger:
              ".search-detail-panel",
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
      id="search-performance"
      aria-labelledby="search-performance-title"
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
          top-[28%]
          h-[760px]
          w-[760px]
          max-w-full
          -translate-x-1/2
          rounded-full
          bg-cyan-300/[0.028]
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
              search-header-item
              min-w-0
            "
          >
            <p className="system-label mb-5">
              Clearance 07 | Search and Performance
            </p>

            <h2
              id="search-performance-title"
              className="
                section-title
                max-w-[940px]
              "
            >
              A system should be
              <br />
              secure, fast and
              discoverable.
            </h2>
          </div>

          <div
            className="
              search-header-item
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
              Performance and
              discoverability are part
              of the engineering
              process. I connect Core
              Web Vitals, technical SEO,
              site architecture,
              structured data, semantic
              SEO, AEO and GEO with the
              performance layer behind
              the product.
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
            <span
              aria-hidden="true"
              className="status-dot"
            />

            <span className="tiny-mono">
              Discoverability System | Active
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
              Search Surface | Connected
            </span>
          </div>
        </div>

        <div
          className="
            search-system
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
            {searchLayers.map(
              (layer) => {
                const active =
                  activeLayer ===
                  layer.id;

                return (
                  <button
                    key={layer.id}
                    type="button"
                    aria-pressed={active}
                    aria-controls="search-detail"
                    onClick={() =>
                      setActiveLayer(
                        layer.id
                      )
                    }
                    className={`
                      search-layer-node
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
              min-h-[480px]
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
                from-cyan-300/[0.07]
                via-cyan-300/[0.18]
                to-cyan-300/[0.07]
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
                bg-cyan-300/75
                shadow-[0_0_22px_rgba(72,215,255,0.38)]
                transition-[width,opacity]
                duration-500
                ease-out
                motion-reduce:transition-none
              "
              style={{
                width: `${
                  signalProgress * 88
                }%`,
                opacity:
                  activeLayerIndex === 0
                    ? 0.4
                    : 0.82,
              }}
            />

            <div
              className="
                relative
                z-10
                grid
                min-h-[410px]
                grid-cols-8
                items-center
                gap-2
              "
            >
              {searchLayers.map(
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
                      aria-pressed={
                        active
                      }
                      aria-controls="search-detail"
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
                        search-layer-node
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
                                scale-[1.025]
                                opacity-100
                              `
                            : passed
                              ? `
                                  z-10
                                  opacity-88
                                `
                              : `
                                  opacity-62
                                  hover:opacity-88
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
                                  shadow-[0_0_48px_rgba(72,215,255,0.10)]
                                `
                              : passed
                                ? `
                                    border-cyan-200/[0.16]
                                    bg-cyan-300/[0.028]
                                  `
                                : `
                                    border-white/[0.10]
                                    bg-[#0d141b]
                                    group-hover:border-cyan-300/28
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
                                      border-cyan-200/[0.09]
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
                                    shadow-[0_0_22px_rgba(72,215,255,0.82)]
                                  `
                                : passed
                                  ? `
                                      bg-cyan-200/55
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
                          max-w-[140px]
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
                Performance | Technical Foundation
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
                AI Search | Emerging Surface
              </p>
            </div>
          </div>
        </div>

        <div
          id="search-detail"
          className="
            search-detail-panel
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
                  Active Search Layer
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
                  Search Signals
                </p>

                <span className="tiny-mono">
                  Discoverability | Active
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
            Search | Performance | Discoverability
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
            Discoverability works best
            when Core Web Vitals,
            technical SEO, structured
            data, semantic context and
            answer or AI search
            surfaces operate as one
            system.
          </p>
        </div>
      </div>
    </section>
  );
}