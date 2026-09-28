"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { gsap } from "gsap";

type BootScreenProps = {
  onUnlock: () => void;
};

const firefoxButtonAttributes:
  Record<string, string> = {
    autoComplete: "off",
  };

export default function BootScreen({
  onUnlock,
}: BootScreenProps) {
  const rootRef =
    useRef<HTMLElement | null>(null);

  const contentRef =
    useRef<HTMLDivElement | null>(null);

  const [
    ready,
    setReady,
  ] = useState(false);

  const [
    exiting,
    setExiting,
  ] = useState(false);

  const [
    hidden,
    setHidden,
  ] = useState(false);

  useLayoutEffect(() => {
    const root =
      rootRef.current;

    if (!root) {
      return;
    }

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (reduceMotion) {
      const frame =
        window.requestAnimationFrame(
          () => {
            setReady(true);
          }
        );

      return () => {
        window.cancelAnimationFrame(
          frame
        );
      };
    }

    const ctx =
      gsap.context(() => {
        const timeline =
          gsap.timeline({
            defaults: {
              ease: "power3.out",
            },
          });

        timeline
          .from(
            ".boot-panel",
            {
              y: 18,
              scale: 0.99,
              duration: 0.5,
            }
          )
          .from(
            ".boot-line",
            {
              x: -8,
              duration: 0.28,
              stagger: 0.12,
            },
            "-=0.15"
          )
          .from(
            ".boot-status",
            {
              y: 8,
              duration: 0.35,
            },
            "-=0.08"
          )
          .call(() => {
            setReady(true);
          });
      }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  const enterSystem = () => {
    if (
      !ready ||
      exiting
    ) {
      return;
    }

    setExiting(true);

    const root =
      rootRef.current;

    const content =
      contentRef.current;

    if (
      !root ||
      !content
    ) {
      onUnlock();
      setHidden(true);
      return;
    }

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (reduceMotion) {
      onUnlock();
      setHidden(true);
      return;
    }

    const timeline =
      gsap.timeline();

    timeline
      .to(content, {
        y: -10,
        scale: 0.99,
        duration: 0.25,
        ease: "power2.in",
      })
      .to(
        root,
        {
          autoAlpha: 0,
          duration: 0.48,
          ease: "power2.inOut",

          onStart: () => {
            onUnlock();
          },

          onComplete: () => {
            setHidden(true);
          },
        },
        "-=0.02"
      );
  };

  if (hidden) {
    return null;
  }

  const bootRows = [
    {
      label:
        "VERIFYING CLIENT",
      value: "OK",
    },
    {
      label:
        "ESTABLISHING ENCRYPTED CHANNEL",
      value: "OK",
    },
    {
      label:
        "LOADING SYSTEM ENVIRONMENT",
      value: "OK",
    },
    {
      label:
        "CHECKING PUBLIC CLEARANCE",
      value: "GRANTED",
    },
  ];

  return (
    <section
      ref={rootRef}
      aria-label="Secure session initialization"
      className="
        fixed
        inset-0
        z-[100]
        overflow-x-hidden
        overflow-y-auto
        bg-[#080b0f]
        overscroll-contain
      "
    >
      <div
        className="
          relative
          flex
          min-h-[100svh]
          min-w-0
          w-full
          items-start
          justify-center
          px-3
          py-4
          sm:px-5
          sm:py-6
          md:min-h-[100dvh]
          md:items-center
          md:px-6
          md:py-8
          lg:px-8
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-55
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
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[360px]
            w-[360px]
            max-w-[90vw]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-cyan-300/[0.05]
            blur-[110px]
            sm:h-[520px]
            sm:w-[520px]
            lg:h-[680px]
            lg:w-[680px]
          "
        />

        <div
          ref={contentRef}
          className="
            boot-panel
            relative
            z-10
            my-auto
            min-w-0
            w-full
            max-w-[720px]
          "
        >
          <div
            className="
              mb-3
              flex
              min-w-0
              flex-col
              gap-2
              min-[420px]:flex-row
              min-[420px]:items-center
              min-[420px]:justify-between
              sm:mb-4
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
                TCP-01
              </span>
            </div>

            <span className="tiny-mono">
              Public Gateway
            </span>
          </div>

          <div
            className="
              relative
              min-w-0
              overflow-hidden
              rounded-[18px]
              border
              border-white/[0.10]
              bg-[#0b1016]/95
              p-4
              shadow-[0_30px_100px_rgba(0,0,0,0.35)]
              backdrop-blur-xl
              min-[380px]:p-5
              sm:rounded-[24px]
              sm:p-7
              md:p-8
              lg:p-10
            "
          >
            <div
              aria-hidden="true"
              className="
                absolute
                left-0
                top-0
                h-8
                w-8
                border-l
                border-t
                border-cyan-300/35
                sm:h-10
                sm:w-10
              "
            />

            <div
              aria-hidden="true"
              className="
                absolute
                bottom-0
                right-0
                h-8
                w-8
                border-b
                border-r
                border-cyan-300/35
                sm:h-10
                sm:w-10
              "
            />

            <div
              className="
                mb-5
                min-w-0
                sm:mb-7
              "
            >
              <p className="system-label mb-3">
                Secure Session Initialization
              </p>

              <h1
                className="
                  max-w-full
                  break-words
                  text-[23px]
                  font-semibold
                  leading-[1.05]
                  tracking-[-0.035em]
                  text-[#eef5f8]
                  min-[380px]:text-[26px]
                  sm:text-[31px]
                  md:text-[36px]
                "
              >
                THE CLEARANCE PROTOCOL
              </h1>
            </div>

            <div
              className="
                space-y-3
                border-y
                border-white/[0.09]
                py-5
                sm:space-y-4
                sm:py-6
              "
            >
              {bootRows.map(
                (row) => (
                  <div
                    key={row.label}
                    className="
                      boot-line
                      grid
                      min-w-0
                      grid-cols-[minmax(0,1fr)_auto]
                      items-start
                      gap-3
                      sm:gap-5
                    "
                  >
                    <span
                      className="
                        min-w-0
                        break-words
                        font-mono
                        text-[9px]
                        leading-5
                        tracking-[0.06em]
                        text-[#a8b4bd]
                        min-[380px]:text-[10px]
                        sm:text-[12px]
                      "
                    >
                      {row.label}
                    </span>

                    <span
                      className="
                        shrink-0
                        font-mono
                        text-[9px]
                        font-semibold
                        leading-5
                        tracking-[0.07em]
                        text-cyan-300
                        min-[380px]:text-[10px]
                        sm:text-[12px]
                      "
                    >
                      {row.value}
                    </span>
                  </div>
                )
              )}
            </div>

            <div
              className="
                boot-status
                mt-5
                flex
                min-w-0
                items-center
                gap-3
                sm:mt-6
                sm:gap-4
              "
            >
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-cyan-300/25
                  bg-cyan-300/[0.07]
                  sm:h-10
                  sm:w-10
                "
              >
                <span className="status-dot" />
              </div>

              <div className="min-w-0">
                <p
                  className="
                    text-[11px]
                    font-semibold
                    tracking-[0.1em]
                    text-cyan-200
                    uppercase
                    sm:text-[12px]
                  "
                >
                  Channel Secured
                </p>

                <p className="tiny-mono mt-1">
                  Clearance | Public
                </p>
              </div>
            </div>

            <div
              className="
                mt-6
                grid
                min-w-0
                gap-5
                sm:mt-7
                sm:grid-cols-[minmax(0,1fr)_auto]
                sm:items-end
              "
            >
              <div className="min-w-0">
                <p className="tiny-mono">
                  Build | Secure | Verify
                </p>

                <p className="tiny-mono mt-1">
                  Operate | Optimize | Evolve
                </p>
              </div>

              <button
                {...firefoxButtonAttributes}
                type="button"
                disabled={
                  !ready ||
                  exiting
                }
                onClick={
                  enterSystem
                }
                className="
                  primary-btn
                  w-full
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  sm:w-auto
                  sm:min-w-[185px]
                "
              >
                {exiting
                  ? "Opening"
                  : ready
                    ? "Enter System"
                    : "Initializing"}

                <span
                  aria-hidden="true"
                  className="ml-3"
                >
                  →
                </span>
              </button>
            </div>
          </div>

          <div
            className="
              mt-3
              grid
              min-w-0
              gap-1.5
              min-[420px]:grid-cols-3
              min-[420px]:gap-3
              sm:mt-4
            "
          >
            <span className="tiny-mono">
              Encryption | Active
            </span>

            <span
              className="
                tiny-mono
                min-[420px]:text-center
              "
            >
              System | Online
            </span>

            <span
              className="
                tiny-mono
                min-[420px]:text-right
              "
            >
              Session | Secure
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}