"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import CoreScene from "@/scenes/core/core-scene";

type PersistentSystemCoreProps = {
  enabled: boolean;
};

type SystemSectionDetail = {
  id: string;
};

type ReducedMotionDetail = {
  enabled: boolean;
};

type PerformanceProfileDetail = {
  motionScale?: number;
};

type CoreFrame = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const ambientFrames: Record<
  string,
  {
    width: string;
    opacity: number;
    x: string;
    y: string;
  }
> = {
  identity: {
    width:
      "clamp(240px, 42vw, 620px)",
    opacity: 0.1,
    x: "68vw",
    y: "48vh",
  },
  principle: {
    width:
      "clamp(280px, 50vw, 720px)",
    opacity: 0.18,
    x: "50vw",
    y: "50vh",
  },
  capabilities: {
    width:
      "clamp(260px, 46vw, 680px)",
    opacity: 0.16,
    x: "70vw",
    y: "47vh",
  },
  security: {
    width:
      "clamp(300px, 52vw, 760px)",
    opacity: 0.24,
    x: "50vw",
    y: "50vh",
  },
  archive: {
    width:
      "clamp(240px, 42vw, 620px)",
    opacity: 0.12,
    x: "72vw",
    y: "54vh",
  },
  infrastructure: {
    width:
      "clamp(290px, 50vw, 740px)",
    opacity: 0.22,
    x: "64vw",
    y: "50vh",
  },
  "search-performance": {
    width:
      "clamp(240px, 42vw, 620px)",
    opacity: 0.13,
    x: "30vw",
    y: "54vh",
  },
  research: {
    width:
      "clamp(290px, 50vw, 740px)",
    opacity: 0.22,
    x: "68vw",
    y: "48vh",
  },
  classified: {
    width:
      "clamp(320px, 54vw, 800px)",
    opacity: 0.3,
    x: "50vw",
    y: "50vh",
  },
  contact: {
    width:
      "clamp(230px, 40vw, 580px)",
    opacity: 0.12,
    x: "50vw",
    y: "50vh",
  },
};

export default function PersistentSystemCore({
  enabled,
}: PersistentSystemCoreProps) {
  const [
    activeId,
    setActiveId,
  ] = useState("hero");

  const [
    heroFrame,
    setHeroFrame,
  ] = useState<CoreFrame | null>(
    null
  );

  const [
    reducedMotion,
    setReducedMotion,
  ] = useState(false);

  const [
    motionScale,
    setMotionScale,
  ] = useState(1);

  const frameRef =
    useRef<number | null>(null);

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

    const handleSectionChange =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<SystemSectionDetail>;

        const id =
          customEvent.detail
            ?.id;

        if (!id) {
          return;
        }

        setActiveId(id);
      };

    const handlePerformanceProfile =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<PerformanceProfileDetail>;

        const nextMotionScale =
          customEvent.detail
            ?.motionScale;

        if (
          typeof nextMotionScale !==
          "number"
        ) {
          return;
        }

        setMotionScale(
          Math.min(
            Math.max(
              nextMotionScale,
              0.2
            ),
            1
          )
        );
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
      "system:section-change",
      handleSectionChange
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
        "system:section-change",
        handleSectionChange
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

    const anchor =
      document.getElementById(
        "system-core-anchor"
      );

    if (!anchor) {
      return;
    }

    const updateHeroFrame =
      () => {
        frameRef.current = null;

        const rect =
          anchor.getBoundingClientRect();

        setHeroFrame({
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        });
      };

    const requestUpdate =
      () => {
        if (
          frameRef.current !==
          null
        ) {
          return;
        }

        frameRef.current =
          window.requestAnimationFrame(
            updateHeroFrame
          );
      };

    const observer =
      new ResizeObserver(
        requestUpdate
      );

    observer.observe(anchor);

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

    requestUpdate();

    return () => {
      observer.disconnect();

      window.removeEventListener(
        "scroll",
        requestUpdate
      );

      window.removeEventListener(
        "resize",
        requestUpdate
      );

      if (
        frameRef.current !==
        null
      ) {
        window.cancelAnimationFrame(
          frameRef.current
        );

        frameRef.current =
          null;
      }
    };
  }, [
    enabled,
  ]);

  const ambient =
    useMemo(
      () =>
        ambientFrames[
          activeId
        ] ??
        ambientFrames.identity,
      [
        activeId,
      ]
    );

  const transitionDuration =
    reducedMotion
      ? "80ms"
      : `${Math.round(
          760 +
            260 *
              motionScale
        )}ms`;

  const isHero =
    activeId === "hero";

  const ambientOpacity =
    ambient.opacity *
    (
      motionScale < 0.55
        ? 0.72
        : 1
    );

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        inset-0
        z-[7]
        overflow-hidden
      "
      style={{
        opacity:
          enabled
            ? 1
            : 0,
        transition:
          `opacity ${transitionDuration} ease`,
      }}
    >
      <div
        className="
          absolute
        "
        style={
          isHero &&
          heroFrame
            ? {
                left:
                  heroFrame.left,
                top:
                  heroFrame.top,
                width:
                  heroFrame.width,
                height:
                  heroFrame.height,
                opacity: 1,
                transform:
                  "translate3d(0, 0, 0)",
                transitionProperty:
                  "left, top, width, height, opacity, filter",
                transitionDuration,
                transitionTimingFunction:
                  "cubic-bezier(0.22, 1, 0.36, 1)",
                filter:
                  "saturate(1) brightness(1)",
              }
            : {
                left:
                  ambient.x,
                top:
                  ambient.y,
                width:
                  ambient.width,
                aspectRatio:
                  "1 / 1",
                opacity:
                  ambientOpacity,
                transform:
                  "translate3d(-50%, -50%, 0)",
                transitionProperty:
                  "left, top, width, opacity, filter",
                transitionDuration,
                transitionTimingFunction:
                  "cubic-bezier(0.22, 1, 0.36, 1)",
                filter:
                  activeId ===
                  "classified"
                    ? "saturate(1.12) brightness(0.92)"
                    : activeId ===
                        "research"
                      ? "saturate(1.08) brightness(0.95)"
                      : "saturate(0.9) brightness(0.86)",
              }
        }
      >
        <CoreScene fill />
      </div>
    </div>
  );
}