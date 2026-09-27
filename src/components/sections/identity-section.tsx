"use client";
import {
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
  useLayoutEffect(() => {
    const section =
      sectionRef.current;
    if (!section) return;
    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    if (reduceMotion) {
      return;
    }
    const ctx = gsap.context(
      () => {
        /*
         * Position animation only.
         * Content stays visible.
         */
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
      },
      section
    );
    return () => {
      ctx.revert();
    };
  }, []);
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
      {/* AMBIENT */}
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
        {/* CONTENT */}
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
          {/* CAPABILITY CHIPS */}
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
                <button
                  key={tag}
                  type="button"
                  className="
                    group
                    max-w-full
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
                </button>
              )
            )}
          </div>
        </div>
        {/* PROFILE */}
        <aside
          className="
            identity-card
            cyber-card
            relative
            min-w-0
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
            className="
              relative
              z-10
              min-w-0
            "
          >
            {/* HEADER */}
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
            {/* IDENTITY VISUAL */}
            <div
              className="
                relative
                mb-7
                h-[240px]
                min-w-0
                overflow-hidden
                rounded-[20px]
                border
                border-white/[0.10]
                bg-[#0b1117]
                sm:h-[300px]
                sm:rounded-[24px]
                xl:h-[340px]
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
                  object-cover
                  object-[50%_38%]
                "
              />
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#071017]/85
                  via-transparent
                  to-[#071017]/10
                "
              />
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  ring-1
                  ring-inset
                  ring-cyan-300/[0.08]
                "
              />
              <div
                className="
                  absolute
                  bottom-4
                  left-4
                  right-4
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >
                <span
                  className="
                    font-mono
                    text-[9px]
                    tracking-[0.11em]
                    text-[#b9c7ce]
                    uppercase
                    sm:text-[10px]
                  "
                >
                  Identity | Verified
                </span>
                <span
                  className="
                    flex
                    shrink-0
                    items-center
                    gap-2
                    font-mono
                    text-[9px]
                    tracking-[0.11em]
                    text-cyan-200
                    uppercase
                    sm:text-[10px]
                  "
                >
                  <span className="status-dot" />
                  Active
                </span>
              </div>
            </div>
            {/* DATA */}
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