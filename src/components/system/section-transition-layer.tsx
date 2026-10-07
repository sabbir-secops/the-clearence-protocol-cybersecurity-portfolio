"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { gsap } from "gsap";

type SystemMode =
  | "public"
  | "security"
  | "infrastructure"
  | "intelligence"
  | "restricted"
  | "connection";

type SectionChangeDetail = {
  id: string;
  label: string;
  clearance: string;
  mode: SystemMode;
  accent: string;
  rgb: string;
  energy: number;
  index: number;
};

type TransitionState = {
  label: string;
  clearance: string;
  mode: SystemMode;
  accent: string;
  rgb: string;
};

type ReducedMotionDetail = {
  enabled: boolean;
};

const initialState: TransitionState = {
  label: "Identity",
  clearance: "01",
  mode: "public",
  accent: "#48d7ff",
  rgb: "72, 215, 255",
};

const dedicatedClearances =
  new Set([
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
  ]);

export default function SectionTransitionLayer() {
  const rootRef =
    useRef<HTMLDivElement | null>(null);

  const sweepRef =
    useRef<HTMLDivElement | null>(null);

  const pulseRef =
    useRef<HTMLDivElement | null>(null);

  const leftRailRef =
    useRef<HTMLDivElement | null>(null);

  const rightRailRef =
    useRef<HTMLDivElement | null>(null);

  const labelRef =
    useRef<HTMLDivElement | null>(null);

  const ghostRef =
    useRef<HTMLDivElement | null>(null);

  const topSignalRef =
    useRef<HTMLDivElement | null>(null);

  const bottomSignalRef =
    useRef<HTMLDivElement | null>(null);

  const reducedMotionRef =
    useRef(false);

  const [
    state,
    setState,
  ] =
    useState<TransitionState>(
      initialState
    );

  useLayoutEffect(() => {
    const mediaQuery =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );

    const applyPreference =
      (
        enabled: boolean
      ) => {
        reducedMotionRef.current =
          enabled;

        if (
          enabled
        ) {
          const targets = [
            rootRef.current,
            sweepRef.current,
            pulseRef.current,
            leftRailRef.current,
            rightRailRef.current,
            labelRef.current,
            ghostRef.current,
            topSignalRef.current,
            bottomSignalRef.current,
          ].filter(
            (
              target
            ): target is HTMLDivElement =>
              target !==
              null
          );

          gsap.killTweensOf(
            targets
          );

          if (
            rootRef.current
          ) {
            gsap.set(
              rootRef.current,
              {
                autoAlpha: 0,
              }
            );
          }
        }
      };

    const handleMediaChange =
      (
        event:
          MediaQueryListEvent
      ) => {
        applyPreference(
          event.matches
        );
      };

    const handleReducedMotionChange =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<ReducedMotionDetail>;

        applyPreference(
          Boolean(
            customEvent.detail
              ?.enabled
          )
        );
      };

    applyPreference(
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

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleMediaChange
      );

      window.removeEventListener(
        "system:reduced-motion-change",
        handleReducedMotionChange
      );
    };
  }, []);

  useEffect(() => {
    const handleSectionChange = (
      event: Event
    ) => {
      const customEvent =
        event as CustomEvent<SectionChangeDetail>;

      const detail =
        customEvent.detail;

      if (!detail) {
        return;
      }

      if (
        dedicatedClearances.has(
          detail.clearance
        )
      ) {
        const targets = [
          rootRef.current,
          sweepRef.current,
          pulseRef.current,
          leftRailRef.current,
          rightRailRef.current,
          labelRef.current,
          ghostRef.current,
          topSignalRef.current,
          bottomSignalRef.current,
        ].filter(
          (
            target
          ): target is HTMLDivElement =>
            target !== null
        );

        gsap.killTweensOf(
          targets
        );

        if (
          rootRef.current
        ) {
          gsap.set(
            rootRef.current,
            {
              autoAlpha: 0,
            }
          );
        }

        return;
      }

      const nextState: TransitionState = {
        label:
          detail.label,
        clearance:
          detail.clearance,
        mode:
          detail.mode,
        accent:
          detail.accent,
        rgb:
          detail.rgb,
      };

      setState(
        nextState
      );

      if (
        reducedMotionRef.current
      ) {
        const root =
          rootRef.current;

        const label =
          labelRef.current;

        const ghost =
          ghostRef.current;

        if (
          !root ||
          !label ||
          !ghost
        ) {
          return;
        }

        const hiddenTargets = [
          sweepRef.current,
          pulseRef.current,
          leftRailRef.current,
          rightRailRef.current,
          topSignalRef.current,
          bottomSignalRef.current,
        ].filter(
          (
            target
          ): target is HTMLDivElement =>
            target !==
            null
        );

        gsap.killTweensOf([
          root,
          label,
          ghost,
          ...hiddenTargets,
        ]);

        gsap.set(
          hiddenTargets,
          {
            opacity: 0,
          }
        );

        gsap.timeline()
          .set(
            root,
            {
              autoAlpha: 1,
            }
          )
          .set(
            label,
            {
              x: 0,
              opacity: 1,
            }
          )
          .set(
            ghost,
            {
              scale: 1,
              opacity: 0.035,
            }
          )
          .to(
            [
              label,
              ghost,
            ],
            {
              opacity: 0,
              duration: 0.16,
              ease: "none",
            },
            0.12
          )
          .to(
            root,
            {
              autoAlpha: 0,
              duration: 0.1,
              ease: "none",
            },
            0.18
          );

        return;
      }

      const root =
        rootRef.current;

      const sweep =
        sweepRef.current;

      const pulse =
        pulseRef.current;

      const leftRail =
        leftRailRef.current;

      const rightRail =
        rightRailRef.current;

      const label =
        labelRef.current;

      const ghost =
        ghostRef.current;

      const topSignal =
        topSignalRef.current;

      const bottomSignal =
        bottomSignalRef.current;

      if (
        !root ||
        !sweep ||
        !pulse ||
        !leftRail ||
        !rightRail ||
        !label ||
        !ghost ||
        !topSignal ||
        !bottomSignal
      ) {
        return;
      }

      gsap.killTweensOf([
        root,
        sweep,
        pulse,
        leftRail,
        rightRail,
        label,
        ghost,
        topSignal,
        bottomSignal,
      ]);

      const timeline =
        gsap.timeline();

      timeline
        .set(root, {
          autoAlpha: 1,
        })
        .set(sweep, {
          yPercent: -120,
          opacity: 0,
        })
        .set(pulse, {
          scale: 0.72,
          opacity: 0,
        })
        .set(leftRail, {
          scaleY: 0,
          opacity: 0,
          transformOrigin:
            "center center",
        })
        .set(rightRail, {
          scaleY: 0,
          opacity: 0,
          transformOrigin:
            "center center",
        })
        .set(label, {
          x: -18,
          opacity: 0,
        })
        .set(ghost, {
          scale: 0.92,
          opacity: 0,
        })
        .set(topSignal, {
          scaleX: 0,
          opacity: 0,
          transformOrigin:
            "left center",
        })
        .set(bottomSignal, {
          scaleX: 0,
          opacity: 0,
          transformOrigin:
            "right center",
        })
        .to(
          pulse,
          {
            scale: 1.08,
            opacity: 1,
            duration: 0.34,
            ease: "power2.out",
          },
          0
        )
        .to(
          pulse,
          {
            scale: 1.35,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          0.2
        )
        .to(
          sweep,
          {
            yPercent: 15,
            opacity: 0.9,
            duration: 0.52,
            ease: "power2.inOut",
          },
          0.03
        )
        .to(
          sweep,
          {
            yPercent: 120,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
          },
          0.48
        )
        .to(
          leftRail,
          {
            scaleY: 1,
            opacity: 1,
            duration: 0.38,
            ease: "power3.out",
          },
          0.08
        )
        .to(
          rightRail,
          {
            scaleY: 1,
            opacity: 1,
            duration: 0.38,
            ease: "power3.out",
          },
          0.08
        )
        .to(
          topSignal,
          {
            scaleX: 1,
            opacity: 0.8,
            duration: 0.42,
            ease: "power3.out",
          },
          0.12
        )
        .to(
          bottomSignal,
          {
            scaleX: 1,
            opacity: 0.8,
            duration: 0.42,
            ease: "power3.out",
          },
          0.12
        )
        .to(
          label,
          {
            x: 0,
            opacity: 1,
            duration: 0.42,
            ease: "power3.out",
          },
          0.18
        )
        .to(
          ghost,
          {
            scale: 1,
            opacity: 0.08,
            duration: 0.55,
            ease: "power3.out",
          },
          0.16
        )
        .to(
          [
            leftRail,
            rightRail,
            topSignal,
            bottomSignal,
          ],
          {
            opacity: 0,
            duration: 0.65,
            ease: "power2.out",
          },
          0.85
        )
        .to(
          label,
          {
            x: 14,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
          },
          1.15
        )
        .to(
          ghost,
          {
            scale: 1.04,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          0.9
        )
        .to(
          root,
          {
            autoAlpha: 0,
            duration: 0.25,
          },
          1.6
        );
    };

    window.addEventListener(
      "system:section-change",
      handleSectionChange
    );

    return () => {
      window.removeEventListener(
        "system:section-change",
        handleSectionChange
      );
    };
  }, []);

  const restricted =
    state.mode ===
    "restricted";

  const clearanceLabel =
    state.clearance ===
    "SYSTEM"
      ? "System Logic"
      : `Clearance ${state.clearance}`;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        inset-0
        z-[45]
        invisible
        overflow-hidden
        opacity-0
      "
    >
      <div
        ref={pulseRef}
        className="
          absolute
          left-1/2
          top-1/2
          h-[42vw]
          w-[42vw]
          min-h-[320px]
          min-w-[320px]
          max-h-[780px]
          max-w-[780px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          opacity-0
          blur-[90px]
        "
        style={{
          background: `radial-gradient(
            circle,
            rgba(
              ${state.rgb},
              ${restricted
                ? 0.16
                : 0.1}
            ) 0%,
            rgba(
              ${state.rgb},
              0.04
            ) 38%,
            transparent 70%
          )`,
        }}
      />

      <div
        ref={sweepRef}
        className="
          absolute
          left-0
          top-0
          h-[18vh]
          min-h-[110px]
          w-full
          opacity-0
        "
        style={{
          background: `linear-gradient(
            to bottom,
            transparent,
            rgba(
              ${state.rgb},
              0.025
            ),
            rgba(
              ${state.rgb},
              ${restricted
                ? 0.15
                : 0.09}
            ),
            rgba(
              ${state.rgb},
              0.025
            ),
            transparent
          )`,
        }}
      >
        <div
          className="
            absolute
            bottom-1/2
            left-0
            h-px
            w-full
          "
          style={{
            background: `linear-gradient(
              90deg,
              transparent,
              rgba(
                ${state.rgb},
                0.3
              ),
              rgba(
                ${state.rgb},
                0.95
              ),
              rgba(
                ${state.rgb},
                0.3
              ),
              transparent
            )`,
            boxShadow: `0 0 28px rgba(${state.rgb}, 0.38)`,
          }}
        />
      </div>

      <div
        ref={leftRailRef}
        className="
          absolute
          left-3
          top-[18%]
          h-[64%]
          w-px
          opacity-0
          sm:left-5
          lg:left-7
        "
        style={{
          background: `linear-gradient(
            to bottom,
            transparent,
            rgba(
              ${state.rgb},
              0.75
            ),
            transparent
          )`,
          boxShadow: `0 0 18px rgba(${state.rgb}, 0.25)`,
        }}
      />

      <div
        ref={rightRailRef}
        className="
          absolute
          right-3
          top-[18%]
          h-[64%]
          w-px
          opacity-0
          sm:right-5
          lg:right-7
        "
        style={{
          background: `linear-gradient(
            to bottom,
            transparent,
            rgba(
              ${state.rgb},
              0.75
            ),
            transparent
          )`,
          boxShadow: `0 0 18px rgba(${state.rgb}, 0.25)`,
        }}
      />

      <div
        ref={topSignalRef}
        className="
          absolute
          left-[6%]
          right-[6%]
          top-[15%]
          h-px
          opacity-0
        "
        style={{
          background: `linear-gradient(
            90deg,
            transparent,
            rgba(
              ${state.rgb},
              0.8
            ),
            transparent
          )`,
        }}
      />

      <div
        ref={bottomSignalRef}
        className="
          absolute
          bottom-[15%]
          left-[6%]
          right-[6%]
          h-px
          opacity-0
        "
        style={{
          background: `linear-gradient(
            90deg,
            transparent,
            rgba(
              ${state.rgb},
              0.8
            ),
            transparent
          )`,
        }}
      />

      <div
        ref={ghostRef}
        className="
          absolute
          right-[3vw]
          top-1/2
          -translate-y-1/2
          select-none
          font-mono
          text-[clamp(100px,21vw,390px)]
          font-semibold
          leading-none
          tracking-[-0.1em]
          opacity-0
        "
        style={{
          color:
            state.accent,
        }}
      >
        {state.clearance ===
        "SYSTEM"
          ? "SYS"
          : state.clearance}
      </div>

      <div
        ref={labelRef}
        className="
          absolute
          bottom-[11%]
          left-4
          min-w-0
          opacity-0
          sm:left-7
          lg:left-10
          xl:left-[5vw]
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
            className="
              h-2
              w-2
              shrink-0
              rounded-full
            "
            style={{
              background:
                state.accent,
              boxShadow: `0 0 18px ${state.accent}`,
            }}
          />

          <span
            className="
              font-mono
              text-[9px]
              font-semibold
              tracking-[0.14em]
              uppercase
              sm:text-[10px]
            "
            style={{
              color:
                state.accent,
            }}
          >
            {clearanceLabel}
          </span>
        </div>

        <p
          className="
            mt-3
            max-w-[80vw]
            break-words
            text-[22px]
            font-semibold
            tracking-[-0.035em]
            text-[#eef5f8]
            uppercase
            sm:text-[28px]
            md:text-[34px]
            xl:text-[40px]
          "
        >
          {state.label}
        </p>

        <div
          className="
            mt-4
            flex
            flex-wrap
            items-center
            gap-x-4
            gap-y-2
          "
        >
          <span
            className="
              font-mono
              text-[9px]
              tracking-[0.11em]
              text-[#a8b4bd]
              uppercase
            "
          >
            Environment | {state.mode}
          </span>

          <span
            className="
              font-mono
              text-[9px]
              tracking-[0.11em]
              text-[#a8b4bd]
              uppercase
            "
          >
            Signal | Synchronized
          </span>
        </div>
      </div>

      <div
        className="
          absolute
          left-3
          top-[84px]
          hidden
          items-center
          gap-3
          sm:left-5
          lg:left-7
          xl:flex
        "
      >
        <span
          className="
            font-mono
            text-[8px]
            tracking-[0.13em]
            text-white/35
            uppercase
          "
        >
          Transition Protocol
        </span>

        <span
          className="
            h-px
            w-12
          "
          style={{
            background: `rgba(${state.rgb}, 0.35)`,
          }}
        />
      </div>

      <div
        className="
          absolute
          right-3
          top-[84px]
          hidden
          items-center
          gap-3
          sm:right-5
          lg:right-7
          xl:flex
        "
      >
        <span
          className="
            h-px
            w-12
          "
          style={{
            background: `rgba(${state.rgb}, 0.35)`,
          }}
        />

        <span
          className="
            font-mono
            text-[8px]
            tracking-[0.13em]
            text-white/35
            uppercase
          "
        >
          Channel | Active
        </span>
      </div>
    </div>
  );
}