"use client";

import {
  type PointerEvent as ReactPointerEvent,
  useLayoutEffect,
  useRef,
} from "react";

import Image from "next/image";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tags = [
  "Cybersecurity",
  "Product Engineering",
  "Web & App Systems",
  "Infrastructure",
  "Search Engineering",
  "Research",
];

export default function IdentitySection() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const visualRef =
    useRef<HTMLDivElement | null>(null);

  const photoPlaneRef =
    useRef<HTMLDivElement | null>(null);

  const depthFieldRef =
    useRef<HTMLDivElement | null>(null);

  const scanRef =
    useRef<HTMLDivElement | null>(null);

  const reducedMotionRef =
    useRef(false);

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    if (!section) {
      return;
    }

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

        if (value) {
          const visual =
            visualRef.current;

          const photoPlane =
            photoPlaneRef.current;

          const depthField =
            depthFieldRef.current;

          if (visual) {
            visual.style.transform =
              "perspective(1200px) rotateX(0deg) rotateY(0deg)";
          }

          if (photoPlane) {
            photoPlane.style.transform =
              "translate3d(0px, 0px, 34px) scale(1)";
          }

          if (depthField) {
            depthField.style.transform =
              "translate3d(0px, 0px, -26px) rotate(0deg)";
          }
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

    applyReducedMotion(
      mediaQuery.matches
    );

    mediaQuery.addEventListener(
      "change",
      handleMediaChange
    );

    if (
      reducedMotionRef.current
    ) {
      return () => {
        mediaQuery.removeEventListener(
          "change",
          handleMediaChange
        );
      };
    }

    const ctx =
      gsap.context(
        () => {
          gsap.from(
            ".identity-reveal",
            {
              y: 28,
              duration: 0.7,
              stagger: 0.07,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 82%",
              },
            }
          );

          gsap.from(
            ".identity-card",
            {
              y: 30,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger:
                  ".identity-card",
                start: "top 88%",
              },
            }
          );

          if (
            scanRef.current &&
            visualRef.current
          ) {
            gsap.fromTo(
              scanRef.current,
              {
                top: "8%",
                opacity: 0,
              },
              {
                top: "92%",
                opacity: 0.72,
                duration: 3.8,
                repeat: -1,
                ease: "none",
                scrollTrigger: {
                  trigger:
                    visualRef.current,
                  start: "top 88%",
                  end: "bottom 12%",
                  toggleActions:
                    "play pause resume pause",
                },
              }
            );
          }

          if (
            depthFieldRef.current &&
            visualRef.current
          ) {
            gsap.to(
              depthFieldRef.current,
              {
                rotate: 7,
                scale: 1.045,
                duration: 4.6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                scrollTrigger: {
                  trigger:
                    visualRef.current,
                  start: "top 90%",
                  end: "bottom 10%",
                  toggleActions:
                    "play pause resume pause",
                },
              }
            );
          }

          if (
            visualRef.current
          ) {
            gsap.to(
              visualRef.current,
              {
                y: -10,
                scrollTrigger: {
                  trigger: section,
                  start:
                    "top bottom",
                  end:
                    "bottom top",
                  scrub: 1.2,
                },
              }
            );
          }

          ScrollTrigger.refresh();
        },
        section
      );

    return () => {
      ctx.revert();

      mediaQuery.removeEventListener(
        "change",
        handleMediaChange
      );
    };
  }, []);

  const resetVisual =
    () => {
      const visual =
        visualRef.current;

      const photoPlane =
        photoPlaneRef.current;

      const depthField =
        depthFieldRef.current;

      if (visual) {
        visual.style.transform =
          "perspective(1200px) rotateX(0deg) rotateY(0deg)";
      }

      if (photoPlane) {
        photoPlane.style.transform =
          "translate3d(0px, 0px, 34px) scale(1)";
      }

      if (depthField) {
        depthField.style.transform =
          "translate3d(0px, 0px, -26px) rotate(0deg)";
      }
    };

  const handleVisualPointerMove =
    (
      event:
        ReactPointerEvent<HTMLDivElement>
    ) => {
      if (
        event.pointerType ===
          "touch" ||
        reducedMotionRef.current
      ) {
        return;
      }

      const visual =
        visualRef.current;

      const photoPlane =
        photoPlaneRef.current;

      const depthField =
        depthFieldRef.current;

      if (
        !visual ||
        !photoPlane ||
        !depthField
      ) {
        return;
      }

      const rect =
        visual.getBoundingClientRect();

      const x =
        (
          event.clientX -
          rect.left
        ) /
          Math.max(
            rect.width,
            1
          ) -
        0.5;

      const y =
        (
          event.clientY -
          rect.top
        ) /
          Math.max(
            rect.height,
            1
          ) -
        0.5;

      const rotateX =
        -y * 3.4;

      const rotateY =
        x * 4.6;

      visual.style.transform =
        `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;

      photoPlane.style.transform =
        `translate3d(${(x * 7).toFixed(2)}px, ${(y * 5).toFixed(2)}px, 38px) scale(1.012)`;

      depthField.style.transform =
        `translate3d(${(x * -5).toFixed(2)}px, ${(y * -4).toFixed(2)}px, -26px) rotate(${(x * -3).toFixed(2)}deg)`;
    };

  return (
    <section
      ref={sectionRef}
      id="identity"
      className="
        relative
        overflow-hidden
        border-b
        border-white/[0.08]
        bg-[#080b0f]
        py-20

        sm:py-24

        lg:py-28

        xl:py-36
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-30%]
          top-[10%]
          h-[600px]
          w-[600px]
          rounded-full
          bg-cyan-400/[0.035]
          blur-[140px]

          lg:left-[-10%]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-18%]
          top-[18%]
          h-[520px]
          w-[520px]
          rounded-full
          bg-cyan-300/[0.025]
          blur-[150px]
        "
      />

      <div
        className="
          container-shell
          relative
          z-10
          grid
          min-w-0
          gap-10

          xl:grid-cols-[minmax(0,1.08fr)_minmax(400px,0.92fr)]
          xl:items-start
          xl:gap-14
        "
      >
        <div className="min-w-0">
          <p
            className="
              identity-reveal
              system-label
              mb-5
            "
          >
            Clearance 02 |
            System Profile
          </p>

          <h2
            className="
              identity-reveal
              section-title
              max-w-[800px]
            "
          >
            I build systems
            with security in
            the architecture.
          </h2>

          <div
            className="
              mt-7
              max-w-[760px]
              space-y-5

              sm:mt-8
              sm:space-y-6
            "
          >
            <p
              className="
                identity-reveal
                text-[16px]
                leading-7
                text-[#a8b4bd]

                sm:text-[17px]
                sm:leading-8
              "
            >
              My work sits at
              the intersection of
              cybersecurity,
              software engineering,
              infrastructure and
              digital performance.
            </p>

            <p
              className="
                identity-reveal
                text-[16px]
                leading-7
                text-[#a8b4bd]

                sm:text-[17px]
                sm:leading-8
              "
            >
              I approach products
              as connected systems,
              from the interface and
              application layer to
              access control,
              infrastructure,
              security and
              performance.
            </p>

            <p
              className="
                identity-reveal
                text-[18px]
                font-medium
                text-[#eef5f8]

                sm:text-[20px]
              "
            >
              Building is only
              the first layer.
            </p>
          </div>

          <div
            className="
              identity-reveal
              mt-8
              flex
              min-w-0
              flex-wrap
              gap-2

              sm:mt-10
              sm:gap-3
            "
          >
            {tags.map(
              (tag) => (
                <span
                  key={tag}
                  className="
                    group
                    inline-flex
                    max-w-full
                    items-center
                    rounded-full
                    border
                    border-white/[0.12]
                    bg-white/[0.035]
                    px-3
                    py-2
                    text-[11px]
                    font-medium
                    leading-5
                    text-[#c0c9cf]
                    transition

                    sm:px-4
                    sm:text-[12px]

                    hover:border-cyan-300/30
                    hover:bg-cyan-300/[0.06]
                    hover:text-cyan-100
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      mr-2
                      inline-block
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-white/35
                      transition
                      group-hover:bg-cyan-300
                    "
                  />

                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        <aside
          className="
            identity-card
            cyber-card
            relative
            min-w-0
            overflow-hidden
            p-5

            sm:p-6

            md:p-8

            xl:sticky
            xl:top-[96px]
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              right-[-80px]
              top-[-80px]
              h-[240px]
              w-[240px]
              rounded-full
              bg-cyan-300/[0.08]
              blur-[90px]
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-[-120px]
              left-[8%]
              h-[260px]
              w-[260px]
              rounded-full
              bg-blue-500/[0.035]
              blur-[110px]
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
                mb-6
                flex
                min-w-0
                items-center
                justify-between
                gap-4
              "
            >
              <p className="system-label">
                System Profile
              </p>

              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-2
                "
              >
                <span className="status-dot" />

                <span className="tiny-mono">
                  Active
                </span>
              </div>
            </div>

            <div
              className="
                relative
                mb-8
                [perspective:1200px]
              "
            >
              <div
                ref={visualRef}
                onPointerMove={
                  handleVisualPointerMove
                }
                onPointerLeave={
                  resetVisual
                }
                onPointerCancel={
                  resetVisual
                }
                className="
                  group
                  relative
                  aspect-[4/3]
                  min-w-0
                  [transform-style:preserve-3d]
                  will-change-transform
                  transition-transform
                  duration-300
                  ease-out

                  sm:aspect-[3/2]
                "
              >
                <div
                  ref={depthFieldRef}
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-[4%]
                    rounded-[28px]
                    border
                    border-cyan-300/[0.10]
                    bg-[radial-gradient(circle_at_50%_50%,rgba(72,215,255,0.08),transparent_62%)]
                    shadow-[0_0_90px_rgba(72,215,255,0.08)]
                    [transform:translate3d(0px,0px,-26px)]
                    [transform-style:preserve-3d]
                    will-change-transform
                    transition-transform
                    duration-300
                    ease-out
                  "
                />

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-[10px]
                    translate-x-2
                    translate-y-3
                    rounded-[24px]
                    border
                    border-cyan-300/[0.08]
                    bg-cyan-300/[0.015]
                    opacity-80
                    [transform:translateZ(-40px)]
                  "
                />

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-[5px]
                    translate-x-1
                    translate-y-1.5
                    rounded-[24px]
                    border
                    border-white/[0.06]
                    bg-white/[0.01]
                    [transform:translateZ(-20px)]
                  "
                />

                <div
                  ref={photoPlaneRef}
                  className="
                    absolute
                    inset-0
                    overflow-hidden
                    rounded-[20px]
                    border
                    border-white/[0.12]
                    bg-[#071017]
                    shadow-[0_24px_70px_rgba(0,0,0,0.42)]
                    [transform-style:preserve-3d]
                    [transform:translate3d(0px,0px,34px)]
                    will-change-transform
                    transition-transform
                    duration-300
                    ease-out

                    sm:rounded-[24px]
                  "
                >
                  <Image
                    src="/images/owner.webp"
                    alt="Md. Sabbir Hossain, Cybersecurity Product Engineer"
                    fill
                    sizes="
                      (max-width: 639px) calc(100vw - 40px),
                      (max-width: 1279px) calc(100vw - 48px),
                      520px
                    "
                    className="
                      scale-110
                      object-cover
                      opacity-32
                      blur-[8px]
                    "
                  />

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-[#071017]/40
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-[8px]
                      overflow-hidden
                      rounded-[16px]
                      border
                      border-cyan-300/[0.13]
                      bg-[#071017]/48

                      sm:inset-[12px]
                      sm:rounded-[20px]
                    "
                  >
                    <Image
                      src="/images/owner.webp"
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="
                        (max-width: 639px) calc(100vw - 56px),
                        (max-width: 1279px) calc(100vw - 72px),
                        496px
                      "
                      className="
                        object-contain
                        object-center
                      "
                    />

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-[#061018]/36
                        via-transparent
                        to-[#061018]/06
                      "
                    />

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        opacity-[0.16]
                        [background-image:linear-gradient(rgba(72,215,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(72,215,255,0.10)_1px,transparent_1px)]
                        [background-size:34px_34px]
                        [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]
                      "
                    />

                    <div
                      ref={scanRef}
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        left-[7%]
                        right-[7%]
                        top-[8%]
                        h-px
                        bg-gradient-to-r
                        from-transparent
                        via-cyan-100/80
                        to-transparent
                        opacity-0
                        shadow-[0_0_18px_rgba(72,215,255,0.45)]
                      "
                    />
                  </div>

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      top-4
                      h-7
                      w-7
                      border-l
                      border-t
                      border-cyan-200/55

                      sm:left-5
                      sm:top-5
                    "
                  />

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      right-4
                      top-4
                      h-7
                      w-7
                      border-r
                      border-t
                      border-cyan-200/55

                      sm:right-5
                      sm:top-5
                    "
                  />

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      bottom-4
                      left-4
                      h-7
                      w-7
                      border-b
                      border-l
                      border-cyan-200/35

                      sm:bottom-5
                      sm:left-5
                    "
                  />

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      bottom-4
                      right-4
                      h-7
                      w-7
                      border-b
                      border-r
                      border-cyan-200/35

                      sm:bottom-5
                      sm:right-5
                    "
                  />

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      left-[10%]
                      top-[12%]
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-cyan-200/70
                      shadow-[0_0_12px_rgba(72,215,255,0.48)]
                    "
                  />

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      bottom-[15%]
                      right-[10%]
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-cyan-200/55
                      shadow-[0_0_12px_rgba(72,215,255,0.38)]
                    "
                  />
                </div>
              </div>

              <div
                className="
                  mt-4
                  grid
                  grid-cols-1
                  gap-2

                  min-[430px]:grid-cols-2
                "
              >
                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    justify-between
                    gap-3
                    rounded-[14px]
                    border
                    border-cyan-200/[0.12]
                    bg-cyan-200/[0.035]
                    px-3
                    py-2.5
                    backdrop-blur-md
                  "
                >
                  <span
                    className="
                      font-mono
                      text-[10px]
                      tracking-[0.11em]
                      text-cyan-100/85
                      uppercase

                      sm:text-[11px]
                    "
                  >
                    Identity | Verified
                  </span>

                  <span
                    aria-hidden="true"
                    className="
                      h-1.5
                      w-1.5
                      shrink-0
                      rounded-full
                      bg-cyan-300
                      shadow-[0_0_12px_rgba(72,215,255,0.48)]
                    "
                  />
                </div>

                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    justify-between
                    gap-3
                    rounded-[14px]
                    border
                    border-white/[0.09]
                    bg-white/[0.025]
                    px-3
                    py-2.5
                    backdrop-blur-md
                  "
                >
                  <span
                    className="
                      font-mono
                      text-[10px]
                      tracking-[0.11em]
                      text-[#c9d7de]
                      uppercase

                      sm:text-[11px]
                    "
                  >
                    Profile | Active
                  </span>

                  <span className="status-dot" />
                </div>
              </div>
            </div>

            <div
              className="
                grid
                min-w-0
                gap-6
              "
            >
              <div className="min-w-0">
                <p className="tiny-mono">
                  Identity
                </p>

                <p
                  className="
                    mt-2
                    break-words
                    text-[18px]
                    font-medium
                    text-[#eef5f8]
                  "
                >
                  Md. Sabbir Hossain
                </p>
              </div>

              <div className="min-w-0">
                <p className="tiny-mono">
                  Designation
                </p>

                <p
                  className="
                    mt-2
                    break-words
                    text-[18px]
                    font-medium
                    leading-7
                    text-[#eef5f8]
                  "
                >
                  Cybersecurity
                  Product Engineer
                </p>
              </div>

              <div className="min-w-0">
                <p className="tiny-mono">
                  Primary Domains
                </p>

                <p
                  className="
                    mt-2
                    text-[15px]
                    leading-7
                    text-[#b6c0c6]
                  "
                >
                  Security |
                  Engineering |
                  Infrastructure
                </p>
              </div>

              <div
                className="
                  flex
                  min-w-0
                  items-center
                  justify-between
                  gap-4
                  border-t
                  border-white/[0.09]
                  pt-5
                "
              >
                <span className="tiny-mono">
                  Status
                </span>

                <span
                  className="
                    text-[11px]
                    font-semibold
                    tracking-[0.13em]
                    text-cyan-300
                    uppercase
                  "
                >
                  Building
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}