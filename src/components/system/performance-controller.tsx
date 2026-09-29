"use client";

import {
  useEffect,
  useRef,
} from "react";

export type PerformanceTier =
  | "high"
  | "balanced"
  | "reduced";

export type PerformanceProfileDetail = {
  tier: PerformanceTier;
  maxDpr: number;
  motionScale: number;
  ambientDensity: number;
  cinematicFrames: boolean;
  glowScale: number;
  viewportWidth: number;
};

type ConnectionLike = {
  saveData?: boolean;
  effectiveType?: string;
  addEventListener?: (
    type: string,
    listener: EventListener
  ) => void;
  removeEventListener?: (
    type: string,
    listener: EventListener
  ) => void;
};

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: ConnectionLike;
};

const PROFILE_EVENT =
  "system:performance-profile";

const QUERY_EVENT =
  "system:performance-query";

const VISIBILITY_EVENT =
  "system:visibility-change";

function createProfile(): PerformanceProfileDetail {
  const navigatorWithHints =
    navigator as NavigatorWithHints;

  const connection =
    navigatorWithHints.connection;

  const width =
    Math.max(
      window.innerWidth,
      1
    );

  const height =
    Math.max(
      window.innerHeight,
      1
    );

  const dpr =
    Math.max(
      window.devicePixelRatio ||
        1,
      1
    );

  const cores =
    navigator.hardwareConcurrency ||
    4;

  const memory =
    navigatorWithHints.deviceMemory;

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  const saveData =
    connection?.saveData ===
    true;

  const effectiveType =
    connection?.effectiveType ??
    "";

  const constrainedNetwork =
    effectiveType ===
      "slow-2g" ||
    effectiveType ===
      "2g";

  const constrainedHardware =
    cores <= 4 ||
    (
      typeof memory ===
        "number" &&
      memory <= 4
    );

  const compactLandscape =
    width <= 900 &&
    height <= 430;

  const veryCompact =
    width < 430 ||
    compactLandscape;

  const compact =
    width < 1280;

  let tier:
    PerformanceTier =
      "high";

  if (
    reducedMotion ||
    saveData ||
    constrainedNetwork ||
    (
      veryCompact &&
      constrainedHardware
    )
  ) {
    tier =
      "reduced";
  } else if (
    compact ||
    dpr > 2 ||
    cores <= 6 ||
    (
      typeof memory ===
        "number" &&
      memory <= 6
    )
  ) {
    tier =
      "balanced";
  }

  if (
    tier ===
    "reduced"
  ) {
    return {
      tier,
      maxDpr: 1,
      motionScale: 0.35,
      ambientDensity: 0.45,
      cinematicFrames: false,
      glowScale: 0.58,
      viewportWidth: width,
    };
  }

  if (
    tier ===
    "balanced"
  ) {
    return {
      tier,
      maxDpr: 1.2,
      motionScale: 0.7,
      ambientDensity: 0.66,
      cinematicFrames: !saveData,
      glowScale: 0.8,
      viewportWidth: width,
    };
  }

  return {
    tier,
    maxDpr: 1.35,
    motionScale: 1,
    ambientDensity: 0.92,
    cinematicFrames: true,
    glowScale: 1,
    viewportWidth: width,
  };
}

function applyProfile(
  profile:
    PerformanceProfileDetail
) {
  const root =
    document.documentElement;

  root.dataset.performanceTier =
    profile.tier;

  root.style.setProperty(
    "--system-motion-scale",
    String(
      profile.motionScale
    )
  );

  root.style.setProperty(
    "--system-glow-scale",
    String(
      profile.glowScale
    )
  );

  window.dispatchEvent(
    new CustomEvent<PerformanceProfileDetail>(
      PROFILE_EVENT,
      {
        detail:
          profile,
      }
    )
  );
}

export default function PerformanceController() {
  const profileRef =
    useRef<PerformanceProfileDetail | null>(
      null
    );

  useEffect(() => {
    const reducedMotionQuery =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );

    const navigatorWithHints =
      navigator as NavigatorWithHints;

    const connection =
      navigatorWithHints.connection;

    let resizeFrame:
      number | null =
        null;

    let dispatchFrame:
      number | null =
        null;

    const updateProfile =
      () => {
        const profile =
          createProfile();

        profileRef.current =
          profile;

        applyProfile(
          profile
        );
      };

    const scheduleProfile =
      () => {
        if (
          resizeFrame !==
          null
        ) {
          window.cancelAnimationFrame(
            resizeFrame
          );
        }

        resizeFrame =
          window.requestAnimationFrame(
            () => {
              resizeFrame =
                null;

              updateProfile();
            }
          );
      };

    const handleQuery =
      () => {
        const profile =
          profileRef.current ??
          createProfile();

        profileRef.current =
          profile;

        applyProfile(
          profile
        );
      };

    const handleVisibility =
      () => {
        window.dispatchEvent(
          new CustomEvent(
            VISIBILITY_EVENT,
            {
              detail: {
                hidden:
                  document.hidden,
              },
            }
          )
        );
      };

    const connectionChange =
      () => {
        scheduleProfile();
      };

    window.addEventListener(
      "resize",
      scheduleProfile,
      {
        passive: true,
      }
    );

    window.addEventListener(
      QUERY_EVENT,
      handleQuery
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    reducedMotionQuery.addEventListener(
      "change",
      scheduleProfile
    );

    connection?.addEventListener?.(
      "change",
      connectionChange
    );

    dispatchFrame =
      window.requestAnimationFrame(
        () => {
          updateProfile();

          handleVisibility();
        }
      );

    return () => {
      if (
        resizeFrame !==
        null
      ) {
        window.cancelAnimationFrame(
          resizeFrame
        );
      }

      if (
        dispatchFrame !==
        null
      ) {
        window.cancelAnimationFrame(
          dispatchFrame
        );
      }

      window.removeEventListener(
        "resize",
        scheduleProfile
      );

      window.removeEventListener(
        QUERY_EVENT,
        handleQuery
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );

      reducedMotionQuery.removeEventListener(
        "change",
        scheduleProfile
      );

      connection?.removeEventListener?.(
        "change",
        connectionChange
      );
    };
  }, []);

  return null;
}