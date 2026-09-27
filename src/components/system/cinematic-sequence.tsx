"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type CinematicId =
  | "boot"
  | "security"
  | "archive"
  | "confidential"
  | "contact";

type CinematicVariant =
  | "boot"
  | "scan"
  | "records"
  | "restricted"
  | "connection";

type CinematicConfig = {
  id: CinematicId;
  variant: CinematicVariant;
  label: string;
  status: string;
  duration: number;
  frameCount: number;
  framePath: string;
  frameExtension: string;
};

type SystemSectionDetail = {
  id: string;
  label: string;
  clearance: string;
  mode: string;
  accent: string;
  rgb: string;
  energy: number;
  index: number;
};

type CinematicStartDetail = {
  id: CinematicId;
  label: string;
};

type CinematicHandoffDetail = {
  id: CinematicId;
};

type CinematicEndDetail = {
  id: CinematicId;
};

type ReducedMotionDetail = {
  enabled: boolean;
};

type PerformanceProfileDetail = {
  cinematicFrames?: boolean;
  maxDpr?: number;
  motionScale?: number;
};

const CINEMATICS: Record<
  CinematicId,
  CinematicConfig
> = {
  boot: {
    id: "boot",
    variant: "boot",
    label: "SYSTEM ACCESS VERIFIED",
    status: "INITIALIZING ENVIRONMENT",
    duration: 2667,
    frameCount: 64,
    framePath:
      "/cinematic/boot-hero/frame-",
    frameExtension: "webp",
  },

  security: {
    id: "security",
    variant: "scan",
    label: "SECURITY DOMAIN",
    status: "DEFENSE LAYER ACTIVE",
    duration: 1350,
    frameCount: 0,
    framePath:
      "/cinematic/security/frame-",
    frameExtension: "webp",
  },

  archive: {
    id: "archive",
    variant: "records",
    label: "PROJECT ARCHIVE",
    status: "SYSTEM RECORDS AVAILABLE",
    duration: 1450,
    frameCount: 0,
    framePath:
      "/cinematic/archive/frame-",
    frameExtension: "webp",
  },

  confidential: {
    id: "confidential",
    variant: "restricted",
    label: "CONFIDENTIAL",
    status: "PUBLIC CLEARANCE INSUFFICIENT",
    duration: 1600,
    frameCount: 0,
    framePath:
      "/cinematic/confidential/frame-",
    frameExtension: "webp",
  },

  contact: {
    id: "contact",
    variant: "connection",
    label: "ESTABLISH CONNECTION",
    status: "CHANNEL READY",
    duration: 1250,
    frameCount: 0,
    framePath:
      "/cinematic/contact/frame-",
    frameExtension: "webp",
  },
};

const HANDOFF_LEAD_TIME =
  220;

const EXIT_DURATION =
  420;

function padFrame(
  value: number
) {
  return String(
    value
  ).padStart(
    4,
    "0"
  );
}

function getFrameUrl(
  config: CinematicConfig,
  frame: number
) {
  return `${config.framePath}${padFrame(
    frame
  )}.${config.frameExtension}`;
}

function SecurityVisual({
  active,
}: {
  active: boolean;
}) {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        flex
        items-center
        justify-center
      "
    >
      <div
        className={`
          absolute
          h-[220px]
          w-[220px]
          rounded-full
          border
          border-cyan-300/20
          transition-all
          duration-[1100ms]
          sm:h-[300px]
          sm:w-[300px]
          lg:h-[380px]
          lg:w-[380px]

          ${
            active
              ? "scale-100 opacity-100"
              : "scale-[0.72] opacity-0"
          }
        `}
      />

      <div
        className={`
          absolute
          h-[160px]
          w-[160px]
          rounded-full
          border
          border-cyan-200/10
          transition-all
          duration-[900ms]
          sm:h-[220px]
          sm:w-[220px]
          lg:h-[280px]
          lg:w-[280px]

          ${
            active
              ? "scale-100 opacity-100"
              : "scale-[1.25] opacity-0"
          }
        `}
      />

      <div
        className={`
          absolute
          left-1/2
          top-[24%]
          h-px
          w-[64%]
          -translate-x-1/2
          bg-cyan-200/50
          shadow-[0_0_20px_rgba(72,215,255,0.45)]
          transition-all
          duration-[1200ms]

          ${
            active
              ? "translate-y-[52vh] opacity-80"
              : "translate-y-0 opacity-0"
          }
        `}
      />

      <div
        className="
          absolute
          left-[12%]
          top-[18%]
          h-9
          w-9
          border-l
          border-t
          border-cyan-300/30
          sm:h-12
          sm:w-12
        "
      />

      <div
        className="
          absolute
          right-[12%]
          top-[18%]
          h-9
          w-9
          border-r
          border-t
          border-cyan-300/30
          sm:h-12
          sm:w-12
        "
      />

      <div
        className="
          absolute
          bottom-[18%]
          left-[12%]
          h-9
          w-9
          border-b
          border-l
          border-cyan-300/30
          sm:h-12
          sm:w-12
        "
      />

      <div
        className="
          absolute
          bottom-[18%]
          right-[12%]
          h-9
          w-9
          border-b
          border-r
          border-cyan-300/30
          sm:h-12
          sm:w-12
        "
      />

      <div
        className={`
          absolute
          h-[2px]
          w-[16%]
          bg-cyan-200/60
          transition-all
          delay-300
          duration-700

          ${
            active
              ? "scale-x-100 opacity-100"
              : "scale-x-0 opacity-0"
          }
        `}
      />
    </div>
  );
}

function ArchiveVisual({
  active,
}: {
  active: boolean;
}) {
  const rows = [
    "RECORD 01",
    "RECORD 02",
    "RECORD 03",
    "RECORD 04",
  ];

  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        flex
        items-center
        justify-center
      "
    >
      <div
        className="
          relative
          w-[74%]
          max-w-[760px]
          space-y-3
          sm:space-y-4
        "
      >
        {
          rows.map(
            (
              row,
              index
            ) => (
              <div
                key={
                  row
                }
                className={`
                  flex
                  h-12
                  items-center
                  gap-4
                  border
                  border-white/[0.08]
                  bg-white/[0.018]
                  px-4
                  transition-all
                  duration-700
                  sm:h-14
                  sm:px-5

                  ${
                    active
                      ? "translate-x-0 opacity-100"
                      : index %
                          2 ===
                        0
                        ? "-translate-x-16 opacity-0"
                        : "translate-x-16 opacity-0"
                  }
                `}
                style={{
                  transitionDelay:
                    `${index * 90}ms`,
                }}
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    shrink-0
                    rounded-full
                    bg-cyan-300
                    shadow-[0_0_10px_rgba(72,215,255,0.65)]
                  "
                />

                <span
                  className="
                    font-mono
                    text-[9px]
                    tracking-[0.15em]
                    text-white/38
                    uppercase
                  "
                >
                  {
                    row
                  }
                </span>

                <div
                  className="
                    h-px
                    flex-1
                    bg-white/[0.08]
                  "
                />

                <span
                  className="
                    font-mono
                    text-[9px]
                    tracking-[0.12em]
                    text-cyan-200/60
                    uppercase
                  "
                >
                  Verified
                </span>
              </div>
            )
          )
        }
      </div>

      <div
        className={`
          absolute
          left-1/2
          top-[18%]
          h-[64%]
          w-px
          -translate-x-1/2
          bg-cyan-300/10
          transition-all
          duration-[1200ms]

          ${
            active
              ? "scale-y-100 opacity-100"
              : "scale-y-0 opacity-0"
          }
        `}
      />
    </div>
  );
}

function RestrictedVisual({
  active,
}: {
  active: boolean;
}) {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        flex
        items-center
        justify-center
      "
    >
      <div
        className={`
          absolute
          h-[240px]
          w-[240px]
          rotate-45
          border
          border-amber-300/20
          transition-all
          duration-[900ms]
          sm:h-[320px]
          sm:w-[320px]

          ${
            active
              ? "scale-100 opacity-100"
              : "scale-[0.6] opacity-0"
          }
        `}
      />

      <div
        className={`
          absolute
          h-[180px]
          w-[180px]
          rotate-45
          border
          border-amber-300/10
          transition-all
          delay-100
          duration-[1000ms]
          sm:h-[240px]
          sm:w-[240px]

          ${
            active
              ? "scale-100 opacity-100"
              : "scale-[1.35] opacity-0"
          }
        `}
      />

      <div
        className={`
          absolute
          left-1/2
          top-1/2
          h-px
          w-[62%]
          -translate-x-1/2
          -translate-y-1/2
          bg-amber-300/35
          transition-all
          duration-[1200ms]

          ${
            active
              ? "scale-x-100 opacity-100"
              : "scale-x-0 opacity-0"
          }
        `}
      />

      <div
        className={`
          absolute
          left-1/2
          top-1/2
          h-[62%]
          w-px
          -translate-x-1/2
          -translate-y-1/2
          bg-amber-300/20
          transition-all
          duration-[1200ms]

          ${
            active
              ? "scale-y-100 opacity-100"
              : "scale-y-0 opacity-0"
          }
        `}
      />

      <div
        className={`
          absolute
          bottom-[19%]
          left-1/2
          h-1
          w-[52%]
          max-w-[520px]
          -translate-x-1/2
          overflow-hidden
          rounded-full
          bg-white/[0.05]
          transition-opacity
          duration-500

          ${
            active
              ? "opacity-100"
              : "opacity-0"
          }
        `}
      >
        <div
          className={`
            h-full
            bg-amber-300/70
            shadow-[0_0_14px_rgba(255,184,77,0.45)]
            transition-all
            duration-[1250ms]

            ${
              active
                ? "w-full"
                : "w-0"
            }
          `}
        />
      </div>
    </div>
  );
}

function ConnectionVisual({
  active,
}: {
  active: boolean;
}) {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        flex
        items-center
        justify-center
      "
    >
      <div
        className={`
          absolute
          left-[18%]
          top-1/2
          h-4
          w-4
          -translate-y-1/2
          rounded-full
          border
          border-cyan-300/40
          bg-cyan-300/10
          shadow-[0_0_22px_rgba(72,215,255,0.25)]
          transition-all
          duration-700

          ${
            active
              ? "scale-100 opacity-100"
              : "scale-50 opacity-0"
          }
        `}
      />

      <div
        className={`
          absolute
          right-[18%]
          top-1/2
          h-4
          w-4
          -translate-y-1/2
          rounded-full
          border
          border-cyan-300/40
          bg-cyan-300/10
          shadow-[0_0_22px_rgba(72,215,255,0.25)]
          transition-all
          duration-700

          ${
            active
              ? "scale-100 opacity-100"
              : "scale-50 opacity-0"
          }
        `}
      />

      <div
        className="
          absolute
          left-[18%]
          right-[18%]
          top-1/2
          h-px
          -translate-y-1/2
          bg-white/[0.06]
        "
      />

      <div
        className={`
          absolute
          left-[18%]
          top-1/2
          h-px
          -translate-y-1/2
          bg-cyan-300/60
          shadow-[0_0_16px_rgba(72,215,255,0.5)]
          transition-all
          duration-[1000ms]

          ${
            active
              ? "w-[64%] opacity-100"
              : "w-0 opacity-0"
          }
        `}
      />

      <div
        className={`
          absolute
          left-1/2
          top-1/2
          h-[120px]
          w-[120px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-cyan-200/15
          transition-all
          delay-500
          duration-700
          sm:h-[160px]
          sm:w-[160px]

          ${
            active
              ? "scale-100 opacity-100"
              : "scale-[0.65] opacity-0"
          }
        `}
      />

      <div
        className={`
          absolute
          left-1/2
          top-1/2
          h-2
          w-2
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-200
          shadow-[0_0_18px_rgba(72,215,255,0.8)]
          transition-all
          delay-600
          duration-500

          ${
            active
              ? "scale-100 opacity-100"
              : "scale-0 opacity-0"
          }
        `}
      />
    </div>
  );
}

export default function CinematicSequence() {
  const canvasRef =
    useRef<HTMLCanvasElement | null>(
      null
    );

  const animationFrameRef =
    useRef<number | null>(
      null
    );

  const finishTimeoutRef =
    useRef<number | null>(
      null
    );

  const handoffTimeoutRef =
    useRef<number | null>(
      null
    );

  const currentImagesRef =
    useRef<HTMLImageElement[]>(
      []
    );

  const currentFrameIndexRef =
    useRef(0);

  const frameCacheRef =
    useRef<
      Partial<
        Record<
          CinematicId,
          HTMLImageElement[]
        >
      >
    >({});

  const playedSectionsRef =
    useRef<Set<string>>(
      new Set()
    );

  const reducedMotionRef =
    useRef(false);

  const cinematicFramesEnabledRef =
    useRef(true);

  const maxDprRef =
    useRef(1.5);

  const activeRunRef =
    useRef(0);

  const [activeId, setActiveId] =
    useState<CinematicId | null>(
      null
    );

  const [visible, setVisible] =
    useState(false);

  const [
    reducedMotion,
    setReducedMotion,
  ] =
    useState(false);

  const [
    framesEnabled,
    setFramesEnabled,
  ] =
    useState(true);

  const [
    handoffActive,
    setHandoffActive,
  ] =
    useState(false);

  const [phase, setPhase] =
    useState<
      | "idle"
      | "enter"
      | "active"
      | "exit"
    >(
      "idle"
    );

  const activeConfig =
    useMemo(() => {
      if (
        !activeId
      ) {
        return null;
      }

      return CINEMATICS[
        activeId
      ];
    }, [
      activeId,
    ]);

  const hasFrames =
    Boolean(
      activeConfig &&
      activeConfig.frameCount >
        0
    );

  const frameVisualActive =
    hasFrames &&
    framesEnabled &&
    !reducedMotion;

  const isConfidential =
    activeId ===
    "confidential";

  const clearTimers =
    useCallback(() => {
      if (
        finishTimeoutRef.current !==
        null
      ) {
        window.clearTimeout(
          finishTimeoutRef.current
        );

        finishTimeoutRef.current =
          null;
      }

      if (
        handoffTimeoutRef.current !==
        null
      ) {
        window.clearTimeout(
          handoffTimeoutRef.current
        );

        handoffTimeoutRef.current =
          null;
      }

      if (
        animationFrameRef.current !==
        null
      ) {
        window.cancelAnimationFrame(
          animationFrameRef.current
        );

        animationFrameRef.current =
          null;
      }
    }, []);

  const clearCanvas =
    useCallback(() => {
      const canvas =
        canvasRef.current;

      if (
        !canvas
      ) {
        return;
      }

      const context =
        canvas.getContext(
          "2d"
        );

      if (
        !context
      ) {
        return;
      }

      context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );
    }, []);

  const sizeCanvas =
    useCallback(() => {
      const canvas =
        canvasRef.current;

      if (
        !canvas
      ) {
        return;
      }

      const pixelRatio =
        Math.min(
          window.devicePixelRatio ||
            1,
          maxDprRef.current
        );

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

      canvas.width =
        Math.floor(
          width *
            pixelRatio
        );

      canvas.height =
        Math.floor(
          height *
            pixelRatio
        );

      canvas.style.width =
        `${width}px`;

      canvas.style.height =
        `${height}px`;
    }, []);

  const drawFrame =
    useCallback(
      (
        image:
          HTMLImageElement
      ) => {
        const canvas =
          canvasRef.current;

        if (
          !canvas
        ) {
          return;
        }

        const context =
          canvas.getContext(
            "2d"
          );

        if (
          !context
        ) {
          return;
        }

        if (
          image.naturalWidth <=
            0 ||
          image.naturalHeight <=
            0
        ) {
          return;
        }

        const canvasWidth =
          canvas.width;

        const canvasHeight =
          canvas.height;

        const imageWidth =
          image.naturalWidth;

        const imageHeight =
          image.naturalHeight;

        const scale =
          Math.min(
            canvasWidth /
              imageWidth,
            canvasHeight /
              imageHeight
          );

        const drawWidth =
          imageWidth *
          scale;

        const drawHeight =
          imageHeight *
          scale;

        const drawX =
          (
            canvasWidth -
            drawWidth
          ) /
          2;

        const drawY =
          (
            canvasHeight -
            drawHeight
          ) /
          2;

        context.clearRect(
          0,
          0,
          canvasWidth,
          canvasHeight
        );

        context.drawImage(
          image,
          drawX,
          drawY,
          drawWidth,
          drawHeight
        );
      },
      []
    );

  const preloadFrames =
    useCallback(
      async (
        config:
          CinematicConfig
      ) => {
        if (
          config.frameCount <=
          0
        ) {
          return [];
        }

        const cached =
          frameCacheRef.current[
            config.id
          ];

        if (
          cached &&
          cached.length ===
            config.frameCount
        ) {
          return cached;
        }

        const images =
          await Promise.all(
            Array.from(
              {
                length:
                  config.frameCount,
              },
              (
                value,
                index
              ) =>
                new Promise<HTMLImageElement>(
                  (
                    resolve,
                    reject
                  ) => {
                    const image =
                      new Image();

                    image.decoding =
                      "async";

                    image.onload =
                      () => {
                        resolve(
                          image
                        );
                      };

                    image.onerror =
                      () => {
                        reject(
                          new Error(
                            `Unable to load cinematic frame ${index + 1}`
                          )
                        );
                      };

                    image.src =
                      getFrameUrl(
                        config,
                        index + 1
                      );
                  }
                )
            )
          );

        frameCacheRef.current[
          config.id
        ] =
          images;

        return images;
      },
      []
    );

  const playFrames =
    useCallback(
      (
        config:
          CinematicConfig,
        images:
          HTMLImageElement[],
        runId: number
      ) => {
        if (
          images.length ===
          0
        ) {
          return;
        }

        currentImagesRef.current =
          images;

        currentFrameIndexRef.current =
          0;

        drawFrame(
          images[0]
        );

        const startTime =
          performance.now();

        const animate =
          (
            currentTime:
              number
          ) => {
            if (
              activeRunRef.current !==
              runId
            ) {
              return;
            }

            const elapsed =
              currentTime -
              startTime;

            const progress =
              Math.min(
                elapsed /
                  config.duration,
                1
              );

            const frameIndex =
              Math.min(
                Math.floor(
                  progress *
                    (
                      images.length -
                      1
                    )
                ),
                images.length -
                  1
              );

            if (
              frameIndex !==
              currentFrameIndexRef.current
            ) {
              currentFrameIndexRef.current =
                frameIndex;

              const image =
                images[
                  frameIndex
                ];

              if (
                image
              ) {
                drawFrame(
                  image
                );
              }
            }

            if (
              progress <
              1
            ) {
              animationFrameRef.current =
                window.requestAnimationFrame(
                  animate
                );
            } else {
              const finalImage =
                images[
                  images.length -
                    1
                ];

              if (
                finalImage
              ) {
                currentFrameIndexRef.current =
                  images.length -
                  1;

                drawFrame(
                  finalImage
                );
              }

              animationFrameRef.current =
                null;
            }
          };

        animationFrameRef.current =
          window.requestAnimationFrame(
            animate
          );
      },
      [
        drawFrame,
      ]
    );

  const startHandoff =
    useCallback(
      (
        config:
          CinematicConfig,
        runId: number
      ) => {
        if (
          activeRunRef.current !==
          runId
        ) {
          return;
        }

        setHandoffActive(
          true
        );

        window.dispatchEvent(
          new CustomEvent<CinematicHandoffDetail>(
            "system:cinematic-handoff",
            {
              detail: {
                id:
                  config.id,
              },
            }
          )
        );
      },
      []
    );

  const finishSequence =
    useCallback(
      (
        config:
          CinematicConfig,
        runId: number
      ) => {
        if (
          activeRunRef.current !==
          runId
        ) {
          return;
        }

        setPhase(
          "exit"
        );

        window.dispatchEvent(
          new CustomEvent<CinematicEndDetail>(
            "system:cinematic-end",
            {
              detail: {
                id:
                  config.id,
              },
            }
          )
        );

        finishTimeoutRef.current =
          window.setTimeout(
            () => {
              if (
                activeRunRef.current !==
                runId
              ) {
                return;
              }

              setVisible(
                false
              );

              setPhase(
                "idle"
              );

              setHandoffActive(
                false
              );

              setActiveId(
                null
              );

              currentImagesRef.current =
                [];

              currentFrameIndexRef.current =
                0;

              clearCanvas();
            },
            EXIT_DURATION
          );
      },
      [
        clearCanvas,
      ]
    );

  const playSequence =
    useCallback(
      async (
        id: CinematicId
      ) => {
        const config =
          CINEMATICS[
            id
          ];

        clearTimers();

        clearCanvas();

        const runId =
          activeRunRef.current +
          1;

        activeRunRef.current =
          runId;

        currentImagesRef.current =
          [];

        currentFrameIndexRef.current =
          0;

        setActiveId(
          id
        );

        setVisible(
          true
        );

        setHandoffActive(
          false
        );

        setPhase(
          "enter"
        );

        window.dispatchEvent(
          new CustomEvent<CinematicStartDetail>(
            "system:cinematic-start",
            {
              detail: {
                id:
                  config.id,
                label:
                  config.label,
              },
            }
          )
        );

        window.requestAnimationFrame(
          () => {
            if (
              activeRunRef.current ===
              runId
            ) {
              setPhase(
                "active"
              );
            }
          }
        );

        if (
          !reducedMotionRef.current &&
          cinematicFramesEnabledRef.current &&
          config.frameCount >
            0
        ) {
          try {
            const images =
              await preloadFrames(
                config
              );

            if (
              activeRunRef.current !==
              runId
            ) {
              return;
            }

            playFrames(
              config,
              images,
              runId
            );
          } catch {
            if (
              activeRunRef.current ===
              runId
            ) {
              currentImagesRef.current =
                [];

              clearCanvas();
            }
          }
        }

        if (
          activeRunRef.current !==
          runId
        ) {
          return;
        }

        const duration =
          reducedMotionRef.current
            ? 360
            : config.duration;

        const handoffDelay =
          Math.max(
            duration -
              HANDOFF_LEAD_TIME,
            0
          );

        handoffTimeoutRef.current =
          window.setTimeout(
            () => {
              startHandoff(
                config,
                runId
              );
            },
            handoffDelay
          );

        finishTimeoutRef.current =
          window.setTimeout(
            () => {
              finishSequence(
                config,
                runId
              );
            },
            duration
          );
      },
      [
        clearCanvas,
        clearTimers,
        finishSequence,
        playFrames,
        preloadFrames,
        startHandoff,
      ]
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
        reducedMotionRef.current =
          value;

        setReducedMotion(
          value
        );

        if (
          value
        ) {
          if (
            animationFrameRef.current !==
            null
          ) {
            window.cancelAnimationFrame(
              animationFrameRef.current
            );

            animationFrameRef.current =
              null;
          }

          currentImagesRef.current =
            [];

          currentFrameIndexRef.current =
            0;

          clearCanvas();
        }
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
          typeof detail.cinematicFrames ===
          "boolean"
        ) {
          cinematicFramesEnabledRef.current =
            detail.cinematicFrames;

          setFramesEnabled(
            detail.cinematicFrames
          );

          if (
            !detail.cinematicFrames
          ) {
            if (
              animationFrameRef.current !==
              null
            ) {
              window.cancelAnimationFrame(
                animationFrameRef.current
              );

              animationFrameRef.current =
                null;
            }

            currentImagesRef.current =
              [];

            currentFrameIndexRef.current =
              0;

            clearCanvas();
          }
        }

        if (
          typeof detail.maxDpr ===
          "number"
        ) {
          maxDprRef.current =
            Math.min(
              Math.max(
                detail.maxDpr,
                1
              ),
              1.5
            );

          sizeCanvas();
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
  }, [
    clearCanvas,
    sizeCanvas,
  ]);

  useEffect(() => {
    sizeCanvas();

    if (
      !reducedMotionRef.current &&
      cinematicFramesEnabledRef.current
    ) {
      void preloadFrames(
        CINEMATICS.boot
      ).catch(
        () => undefined
      );
    }

    const handleResize =
      () => {
        sizeCanvas();

        const images =
          currentImagesRef.current;

        const frameIndex =
          currentFrameIndexRef.current;

        const image =
          images[
            frameIndex
          ];

        if (
          image
        ) {
          drawFrame(
            image
          );
        }
      };

    const handleSystemEntered =
      () => {
        if (
          playedSectionsRef.current.has(
            "boot"
          )
        ) {
          return;
        }

        playedSectionsRef.current.add(
          "boot"
        );

        void playSequence(
          "boot"
        );
      };

    const handleSectionChange =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<SystemSectionDetail>;

        const detail =
          customEvent.detail;

        if (
          !detail
        ) {
          return;
        }

        let cinematicId:
          | CinematicId
          | null =
            null;

        if (
          detail.id ===
          "security"
        ) {
          cinematicId =
            "security";
        }

        if (
          detail.id ===
          "archive"
        ) {
          cinematicId =
            "archive";
        }

        if (
          detail.id ===
            "classified" ||
          detail.mode ===
            "restricted"
        ) {
          cinematicId =
            "confidential";
        }

        if (
          detail.id ===
          "contact"
        ) {
          cinematicId =
            "contact";
        }

        if (
          !cinematicId
        ) {
          return;
        }

        if (
          playedSectionsRef.current.has(
            cinematicId
          )
        ) {
          return;
        }

        playedSectionsRef.current.add(
          cinematicId
        );

        void playSequence(
          cinematicId
        );
      };

    const handleManualCinematic =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<{
            id: CinematicId;
          }>;

        const id =
          customEvent.detail?.id;

        if (
          !id ||
          !CINEMATICS[
            id
          ]
        ) {
          return;
        }

        void playSequence(
          id
        );
      };

    window.addEventListener(
      "resize",
      handleResize
    );

    window.addEventListener(
      "system:entered",
      handleSystemEntered
    );

    window.addEventListener(
      "system:section-change",
      handleSectionChange
    );

    window.addEventListener(
      "system:cinematic-play",
      handleManualCinematic
    );

    return () => {
      activeRunRef.current +=
        1;

      clearTimers();

      window.removeEventListener(
        "resize",
        handleResize
      );

      window.removeEventListener(
        "system:entered",
        handleSystemEntered
      );

      window.removeEventListener(
        "system:section-change",
        handleSectionChange
      );

      window.removeEventListener(
        "system:cinematic-play",
        handleManualCinematic
      );
    };
  }, [
    clearTimers,
    drawFrame,
    playSequence,
    preloadFrames,
    sizeCanvas,
  ]);

  const contentActive =
    phase ===
      "active" &&
    !handoffActive;

  const cinematicActive =
    contentActive &&
    !reducedMotion;

  const handoffVisualActive =
    handoffActive &&
    !reducedMotion;

  return (
    <div
      aria-hidden="true"
      className={`
        pointer-events-none
        fixed
        inset-0
        z-[85]
        overflow-hidden
        bg-[#050709]
        transition-opacity

        ${
          reducedMotion
            ? "duration-150"
            : "duration-500"
        }

        ${
          visible
            ? phase ===
                "exit"
              ? "opacity-0"
              : "opacity-100"
            : "opacity-0"
        }
      `}
    >
      <canvas
        ref={
          canvasRef
        }
        className="
          absolute
          inset-0
          h-full
          w-full
        "
      />

      <div
        className={`
          absolute
          inset-0
          transition-all
          duration-500

          ${
            isConfidential
              ? "bg-[radial-gradient(circle_at_center,rgba(255,184,77,0.10),rgba(5,7,9,0.96)_68%)]"
              : frameVisualActive
                ? "bg-[radial-gradient(circle_at_center,rgba(72,215,255,0.025),rgba(5,7,9,0.24)_78%)]"
                : "bg-[radial-gradient(circle_at_center,rgba(72,215,255,0.08),rgba(5,7,9,0.96)_68%)]"
          }

          ${
            handoffVisualActive
              ? "opacity-70"
              : "opacity-100"
          }
        `}
      />

      <div
        className={`
          absolute
          inset-0
          bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)]
          bg-[size:42px_42px]
          transition-opacity
          duration-300

          ${
            frameVisualActive
              ? "opacity-25"
              : "opacity-55"
          }

          ${
            handoffVisualActive
              ? "opacity-10"
              : ""
          }
        `}
      />

      {
        activeConfig?.variant ===
          "scan" && (
          <SecurityVisual
            active={
              cinematicActive
            }
          />
        )
      }

      {
        activeConfig?.variant ===
          "records" && (
          <ArchiveVisual
            active={
              cinematicActive
            }
          />
        )
      }

      {
        activeConfig?.variant ===
          "restricted" && (
          <RestrictedVisual
            active={
              cinematicActive
            }
          />
        )
      }

      {
        activeConfig?.variant ===
          "connection" && (
          <ConnectionVisual
            active={
              cinematicActive
            }
          />
        )
      }

      <div
        className={`
          absolute
          left-0
          top-0
          h-[2px]
          w-full
          transition-transform
          duration-[1200ms]

          ${
            cinematicActive
              ? "translate-y-[100vh]"
              : "translate-y-0"
          }

          ${
            isConfidential
              ? "bg-amber-300/45"
              : "bg-cyan-300/45"
          }
        `}
      />

      <div
        className={`
          absolute
          inset-0
          flex
          justify-center
          px-6

          ${
            frameVisualActive
              ? "items-end pb-[10vh] sm:pb-[9vh]"
              : "items-center"
          }
        `}
      >
        <div
          className={`
            text-center
            transition-all
            duration-500

            ${
              contentActive
                ? reducedMotion
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-0 scale-100 opacity-100"
                : reducedMotion
                  ? "translate-y-0 scale-100 opacity-0"
                  : "translate-y-3 scale-[0.98] opacity-0"
            }
          `}
        >
          <p
            className={`
              font-mono
              text-[10px]
              uppercase
              tracking-[0.32em]
              sm:text-[11px]

              ${
                isConfidential
                  ? "text-amber-300/80"
                  : "text-cyan-200/75"
              }
            `}
          >
            Clearance Protocol
          </p>

          <p
            className="
              mt-3
              text-lg
              font-medium
              tracking-[0.08em]
              text-white
              sm:text-xl
              md:text-2xl
            "
          >
            {
              activeConfig?.label
            }
          </p>

          <p
            className="
              mt-2
              font-mono
              text-[10px]
              uppercase
              tracking-[0.22em]
              text-white/60
              sm:text-[11px]
            "
          >
            {
              activeConfig?.status
            }
          </p>
        </div>
      </div>

      <div
        className={`
          pointer-events-none
          absolute
          inset-0
          transition-opacity
          duration-300

          ${
            handoffVisualActive
              ? "opacity-100"
              : "opacity-0"
          }
        `}
      >
        <div
          className={`
            absolute
            left-1/2
            top-1/2
            h-px
            w-[36%]
            -translate-x-1/2
            -translate-y-1/2
            blur-[1px]

            ${
              isConfidential
                ? "bg-amber-200/35"
                : "bg-cyan-200/35"
            }
          `}
        />

        <div
          className={`
            absolute
            left-1/2
            top-1/2
            h-[24%]
            w-[24%]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            blur-[60px]

            ${
              isConfidential
                ? "bg-amber-200/[0.05]"
                : "bg-cyan-200/[0.05]"
            }
          `}
        />
      </div>

      <div
        className={`
          absolute
          inset-x-0
          bottom-0
          h-px
          transition-opacity
          duration-500

          ${
            phase ===
              "active"
              ? "opacity-40"
              : "opacity-0"
          }

          ${
            isConfidential
              ? "bg-amber-300"
              : "bg-cyan-300"
          }
        `}
      />
    </div>
  );
}