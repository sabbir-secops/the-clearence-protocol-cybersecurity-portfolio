"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

type SystemMode =
  | "public"
  | "security"
  | "infrastructure"
  | "intelligence"
  | "restricted"
  | "connection";

type SectionDefinition = {
  id: string;
  label: string;
  clearance: string;
  mode: SystemMode;
  accent: string;
  rgb: string;
  glow: number;
  grid: number;
  energy: number;
};

const sections: SectionDefinition[] = [
  {
    id: "hero",
    label: "Identity",
    clearance: "01",
    mode: "public",
    accent: "#48d7ff",
    rgb: "72, 215, 255",
    glow: 0.12,
    grid: 0.34,
    energy: 1,
  },
  {
    id: "identity",
    label: "System Profile",
    clearance: "02",
    mode: "public",
    accent: "#48d7ff",
    rgb: "72, 215, 255",
    glow: 0.09,
    grid: 0.28,
    energy: 0.94,
  },
  {
    id: "principle",
    label: "System Logic",
    clearance: "SYSTEM",
    mode: "public",
    accent: "#55ddff",
    rgb: "85, 221, 255",
    glow: 0.1,
    grid: 0.3,
    energy: 1,
  },
  {
    id: "capabilities",
    label: "Capability Map",
    clearance: "03",
    mode: "public",
    accent: "#48d7ff",
    rgb: "72, 215, 255",
    glow: 0.13,
    grid: 0.34,
    energy: 1.08,
  },
  {
    id: "security",
    label: "Security Layer",
    clearance: "04",
    mode: "security",
    accent: "#61e1ff",
    rgb: "97, 225, 255",
    glow: 0.17,
    grid: 0.4,
    energy: 1.22,
  },
  {
    id: "archive",
    label: "Project Archive",
    clearance: "05",
    mode: "public",
    accent: "#55cfff",
    rgb: "85, 207, 255",
    glow: 0.11,
    grid: 0.28,
    energy: 1,
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    clearance: "06",
    mode: "infrastructure",
    accent: "#48d7ff",
    rgb: "72, 215, 255",
    glow: 0.15,
    grid: 0.38,
    energy: 1.15,
  },
  {
    id: "search-performance",
    label: "Search and Performance",
    clearance: "07",
    mode: "public",
    accent: "#72ddff",
    rgb: "114, 221, 255",
    glow: 0.11,
    grid: 0.3,
    energy: 1,
  },
  {
    id: "research",
    label: "Research and Intelligence",
    clearance: "08",
    mode: "intelligence",
    accent: "#5cd2ff",
    rgb: "92, 210, 255",
    glow: 0.15,
    grid: 0.36,
    energy: 1.18,
  },
  {
    id: "classified",
    label: "Classified S-01",
    clearance: "09",
    mode: "restricted",
    accent: "#ffb84d",
    rgb: "255, 184, 77",
    glow: 0.2,
    grid: 0.42,
    energy: 1.38,
  },
  {
    id: "contact",
    label: "Connection",
    clearance: "10",
    mode: "connection",
    accent: "#48d7ff",
    rgb: "72, 215, 255",
    glow: 0.11,
    grid: 0.28,
    energy: 0.96,
  },
];

type SystemEnvironmentProps = {
  enabled: boolean;
};

type ReducedMotionDetail = {
  enabled: boolean;
};

type PerformanceProfileDetail = {
  ambientDensity?: number;
  glowScale?: number;
  motionScale?: number;
};

function clamp(
  value: number,
  minimum = 0,
  maximum = 1
) {
  return Math.min(
    Math.max(
      value,
      minimum
    ),
    maximum
  );
}

export default function SystemEnvironment({
  enabled,
}: SystemEnvironmentProps) {
  const [
    activeId,
    setActiveId,
  ] = useState("hero");

  const [
    reducedMotion,
    setReducedMotion,
  ] = useState(false);

  const [
    ambientDensity,
    setAmbientDensity,
  ] = useState(1);

  const [
    glowScale,
    setGlowScale,
  ] = useState(1);

  const activeSection =
    useMemo(
      () =>
        sections.find(
          (section) =>
            section.id ===
            activeId
        ) ?? sections[0],
      [activeId]
    );

  useEffect(() => {
    const mediaQuery =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );

    const applyReducedMotion =
      (
        value: boolean
      ) => {
        setReducedMotion(
          value
        );
      };

    const handleMediaChange =
      (
        event:
          MediaQueryListEvent
      ) => {
        applyReducedMotion(
          event.matches
        );
      };

    const handleReducedMotionChange =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<ReducedMotionDetail>;

        applyReducedMotion(
          Boolean(
            customEvent.detail
              ?.enabled
          )
        );
      };

    const handlePerformanceProfile =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<PerformanceProfileDetail>;

        const detail =
          customEvent.detail;

        if (
          !detail
        ) {
          return;
        }

        if (
          typeof detail.ambientDensity ===
          "number"
        ) {
          setAmbientDensity(
            clamp(
              detail.ambientDensity,
              0.35,
              1
            )
          );
        }

        if (
          typeof detail.glowScale ===
          "number"
        ) {
          setGlowScale(
            clamp(
              detail.glowScale,
              0.45,
              1
            )
          );
        }
      };

    applyReducedMotion(
      mediaQuery.matches
    );

    mediaQuery.addEventListener(
      "change",
      handleMediaChange
    );

    window.addEventListener(
      "system:reduced-motion-change",
      handleReducedMotionChange
    );

    window.addEventListener(
      "system:performance-profile",
      handlePerformanceProfile
    );

    window.dispatchEvent(
      new CustomEvent(
        "system:performance-query"
      )
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleMediaChange
      );

      window.removeEventListener(
        "system:reduced-motion-change",
        handleReducedMotionChange
      );

      window.removeEventListener(
        "system:performance-profile",
        handlePerformanceProfile
      );
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const root =
      document.documentElement;

    let frame = 0;
    let previousScroll =
      window.scrollY;

    let currentId =
      root.dataset
        .systemSection ??
      "hero";

    let hasDispatchedCurrent =
      false;

    const update =
      () => {
        frame = 0;

        const viewportHeight =
          window.innerHeight;

        const viewportCenter =
          viewportHeight *
          0.5;

        const availableSections =
          sections
            .map(
              (
                definition
              ) => {
                const element =
                  document.getElementById(
                    definition.id
                  );

                if (!element) {
                  return null;
                }

                const rect =
                  element.getBoundingClientRect();

                const center =
                  rect.top +
                  rect.height /
                    2;

                const distance =
                  Math.abs(
                    center -
                      viewportCenter
                  );

                return {
                  definition,
                  element,
                  rect,
                  distance,
                };
              }
            )
            .filter(
              (
                item
              ): item is NonNullable<
                typeof item
              > =>
                item !== null
            );

        if (
          availableSections.length ===
          0
        ) {
          return;
        }

        const centered =
          availableSections.find(
            (item) =>
              item.rect.top <=
                viewportCenter &&
              item.rect.bottom >=
                viewportCenter
          );

        const nearest =
          centered ??
          [...availableSections].sort(
            (
              first,
              second
            ) =>
              first.distance -
              second.distance
          )[0];

        const {
          definition,
          rect,
        } = nearest;

        const pageScrollable =
          Math.max(
            document.documentElement
              .scrollHeight -
              viewportHeight,
            1
          );

        const pageProgress =
          clamp(
            window.scrollY /
              pageScrollable
          );

        const sectionTravel =
          rect.height +
          viewportHeight;

        const sectionProgress =
          clamp(
            (
              viewportHeight -
              rect.top
            ) /
              sectionTravel
          );

        const direction =
          window.scrollY >=
          previousScroll
            ? "down"
            : "up";

        previousScroll =
          window.scrollY;

        root.style.setProperty(
          "--system-page-progress",
          pageProgress.toString()
        );

        root.style.setProperty(
          "--system-section-progress",
          sectionProgress.toString()
        );

        root.style.setProperty(
          "--system-scan-y",
          reducedMotion
            ? "50%"
            : `${sectionProgress * 100}%`
        );

        root.dataset
          .systemDirection =
          direction;

        if (
          currentId !==
            definition.id ||
          !hasDispatchedCurrent
        ) {
          currentId =
            definition.id;

          hasDispatchedCurrent =
            true;

          root.dataset
            .systemSection =
            definition.id;

          root.dataset.systemMode =
            definition.mode;

          root.style.setProperty(
            "--system-accent",
            definition.accent
          );

          root.style.setProperty(
            "--system-accent-rgb",
            definition.rgb
          );

          setActiveId(
            definition.id
          );

          window.dispatchEvent(
            new CustomEvent(
              "system:section-change",
              {
                detail: {
                  id:
                    definition.id,
                  label:
                    definition.label,
                  clearance:
                    definition.clearance,
                  mode:
                    definition.mode,
                  accent:
                    definition.accent,
                  rgb:
                    definition.rgb,
                  energy:
                    definition.energy,
                  index:
                    sections.findIndex(
                      (section) =>
                        section.id ===
                        definition.id
                    ),
                },
              }
            )
          );
        }

        window.dispatchEvent(
          new CustomEvent(
            "system:progress",
            {
              detail: {
                id:
                  definition.id,
                pageProgress,
                sectionProgress,
                direction,
              },
            }
          )
        );
      };

    const requestUpdate =
      () => {
        if (frame !== 0) {
          return;
        }

        frame =
          window.requestAnimationFrame(
            update
          );
      };

    const initialDefinition =
      sections.find(
        (
          section
        ) =>
          section.id ===
          currentId
      ) ??
      sections[0];

    root.dataset.systemSection =
      currentId;

    root.dataset.systemMode =
      initialDefinition.mode;

    root.style.setProperty(
      "--system-accent",
      initialDefinition.accent
    );

    root.style.setProperty(
      "--system-accent-rgb",
      initialDefinition.rgb
    );

    requestUpdate();

    window.addEventListener(
      "scroll",
      requestUpdate,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      requestUpdate
    );

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(
          frame
        );
      }

      window.removeEventListener(
        "scroll",
        requestUpdate
      );

      window.removeEventListener(
        "resize",
        requestUpdate
      );
    };
  }, [
    enabled,
    reducedMotion,
  ]);

  const restricted =
    activeSection.mode ===
    "restricted";

  const motionGlowFactor =
    reducedMotion
      ? 0.72
      : 1;

  const effectiveGlow =
    activeSection.glow *
    glowScale *
    motionGlowFactor;

  const effectiveGrid =
    activeSection.grid *
    ambientDensity *
    (
      reducedMotion
        ? 0.82
        : 1
    );

  const environmentTransitionDuration =
    reducedMotion
      ? "80ms"
      : "1000ms";

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        inset-0
        z-[5]
        overflow-hidden
      "
    >
      <div
        className="
          absolute
          inset-0
          transition-[background]
          duration-1000
        "
        style={{
          transitionDuration:
            environmentTransitionDuration,
          background: `
            radial-gradient(
              circle at 78% 20%,
              rgba(
                ${activeSection.rgb},
                ${effectiveGlow}
              ) 0%,
              rgba(
                ${activeSection.rgb},
                ${effectiveGlow * 0.32}
              ) 24%,
              transparent 58%
            ),
            radial-gradient(
              circle at 15% 78%,
              rgba(
                ${activeSection.rgb},
                ${effectiveGlow * 0.42}
              ) 0%,
              transparent 48%
            )
          `,
        }}
      />

      <div
        className="
          absolute
          inset-0
          transition-opacity
          duration-1000
        "
        style={{
          transitionDuration:
            environmentTransitionDuration,
          opacity:
            effectiveGrid,
          backgroundImage: `
            linear-gradient(
              rgba(
                ${activeSection.rgb},
                0.045
              ) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(
                ${activeSection.rgb},
                0.045
              ) 1px,
              transparent 1px
            )
          `,
          backgroundSize:
            "64px 64px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
        }}
      />

      <div
        className="
          absolute
          inset-y-0
          left-0
          w-[22vw]
          max-w-[320px]
          transition-opacity
          duration-1000
        "
        style={{
          transitionDuration:
            environmentTransitionDuration,
          background: `
            linear-gradient(
              90deg,
              rgba(
                ${activeSection.rgb},
                ${restricted
                  ? 0.06
                  : 0.035}
              ),
              transparent
            )
          `,
        }}
      />

      <div
        className="
          absolute
          inset-y-0
          right-0
          w-[22vw]
          max-w-[320px]
          transition-opacity
          duration-1000
        "
        style={{
          transitionDuration:
            environmentTransitionDuration,
          background: `
            linear-gradient(
              270deg,
              rgba(
                ${activeSection.rgb},
                ${restricted
                  ? 0.07
                  : 0.035}
              ),
              transparent
            )
          `,
        }}
      />

      <div
        className="
          absolute
          left-0
          right-0
          h-px
          opacity-40
        "
        style={{
          opacity:
            reducedMotion
              ? 0
              : 0.4,
          top:
            "var(--system-scan-y, 0%)",
          background: `
            linear-gradient(
              90deg,
              transparent,
              rgba(
                ${activeSection.rgb},
                0.7
              ),
              transparent
            )
          `,
          boxShadow: `0 0 20px rgba(${activeSection.rgb}, 0.3)`,
        }}
      />

      <div
        className="
          absolute
          inset-0
        "
        style={{
          boxShadow:
            restricted
              ? "inset 0 0 180px rgba(0,0,0,0.82)"
              : "inset 0 0 150px rgba(0,0,0,0.72)",
        }}
      />

      <div
        className="
          absolute
          right-4
          top-1/2
          hidden
          h-[220px]
          w-px
          -translate-y-1/2
          bg-white/[0.07]
          xl:block
        "
      >
        <div
          className="
            h-full
            w-full
            origin-top
          "
          style={{
            transform:
              "scaleY(var(--system-page-progress, 0))",
            background:
              activeSection.accent,
            boxShadow: `0 0 14px ${activeSection.accent}`,
          }}
        />
      </div>

      <div
        className="
          absolute
          bottom-5
          right-7
          hidden
          items-center
          gap-3
          xl:flex
        "
      >
        <span
          className="
            h-1.5
            w-1.5
            rounded-full
          "
          style={{
            background:
              activeSection.accent,
            boxShadow: `0 0 12px ${activeSection.accent}`,
          }}
        />

        <span
          className="
            font-mono
            text-[9px]
            tracking-[0.12em]
            text-white/40
            uppercase
          "
        >
          Environment | {activeSection.mode}
        </span>
      </div>
    </div>
  );
}