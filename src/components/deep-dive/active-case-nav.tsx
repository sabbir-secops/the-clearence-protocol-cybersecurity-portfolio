"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

type CaseAccent =
  | "cyan"
  | "blue"
  | "violet"
  | "white";

type ActiveCaseNavProps = {
  items: Array<
    [string, string]
  >;
  accent: CaseAccent;
  caseCode: string;
};

const accentClasses = {
  cyan: {
    active:
      "border-cyan-300/35 bg-cyan-300/[0.07] text-cyan-100 shadow-[0_0_18px_rgba(85,221,255,0.08)]",
    inactive:
      "border-transparent text-[#8f9ca5] hover:border-cyan-300/20 hover:bg-cyan-300/[0.025] hover:text-cyan-100",
    ring:
      "focus-visible:ring-cyan-300/70",
    line:
      "bg-cyan-300",
    dot:
      "bg-cyan-300",
  },
  blue: {
    active:
      "border-sky-300/35 bg-sky-300/[0.07] text-sky-100 shadow-[0_0_18px_rgba(31,113,148,0.10)]",
    inactive:
      "border-transparent text-[#8f9ca5] hover:border-sky-300/20 hover:bg-sky-300/[0.025] hover:text-sky-100",
    ring:
      "focus-visible:ring-sky-300/70",
    line:
      "bg-sky-300",
    dot:
      "bg-sky-300",
  },
  violet: {
    active:
      "border-violet-300/35 bg-violet-300/[0.07] text-violet-100 shadow-[0_0_18px_rgba(120,109,255,0.10)]",
    inactive:
      "border-transparent text-[#8f9ca5] hover:border-violet-300/20 hover:bg-violet-300/[0.025] hover:text-violet-100",
    ring:
      "focus-visible:ring-violet-300/70",
    line:
      "bg-violet-300",
    dot:
      "bg-violet-300",
  },
  white: {
    active:
      "border-white/25 bg-white/[0.06] text-white shadow-[0_0_18px_rgba(223,248,255,0.06)]",
    inactive:
      "border-transparent text-[#8f9ca5] hover:border-white/15 hover:bg-white/[0.025] hover:text-white",
    ring:
      "focus-visible:ring-white/60",
    line:
      "bg-white",
    dot:
      "bg-white",
  },
} as const;

export default function ActiveCaseNav({
  items,
  accent,
  caseCode,
}: ActiveCaseNavProps) {
  const initialId =
    items[0]?.[0] ??
    "overview";

  const [
    activeId,
    setActiveId,
  ] =
    useState(
      initialId
    );

  const stripRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const progressRef =
    useRef<HTMLSpanElement | null>(
      null
    );

  const styles =
    accentClasses[
      accent
    ];

  useEffect(() => {
    let frame = 0;

    const sections =
      items
        .map(
          (
            item
          ) =>
            document.getElementById(
              item[0]
            )
        )
        .filter(
          (
            section
          ): section is HTMLElement =>
            Boolean(
              section
            )
        );

    const update = () => {
      frame = 0;

      const viewportAnchor =
        Math.min(
          176,
          window.innerHeight *
            0.28
        );

      let current =
        sections[0]?.id ??
        initialId;

      for (
        const section of sections
      ) {
        const rect =
          section.getBoundingClientRect();

        if (
          rect.top <=
            viewportAnchor &&
          rect.bottom >
            viewportAnchor
        ) {
          current =
            section.id;
          break;
        }

        if (
          rect.top <=
          viewportAnchor
        ) {
          current =
            section.id;
        }
      }

      setActiveId(
        (
          previous
        ) =>
          previous ===
          current
            ? previous
            : current
      );

      for (
        const section of sections
      ) {
        section.dataset.active =
          section.id ===
          current
            ? "true"
            : "false";
      }

      const root =
        document.documentElement;

      const maxScroll =
        Math.max(
          root.scrollHeight -
            window.innerHeight,
          1
        );

      const nextProgress =
        Math.min(
          100,
          Math.max(
            0,
            (
              window.scrollY /
              maxScroll
            ) *
              100
          )
        );

      if (
        progressRef.current
      ) {
        progressRef.current.style.width =
          `${nextProgress}%`;
      }
    };

    const requestUpdate =
      () => {
        if (frame) {
          return;
        }

        frame =
          window.requestAnimationFrame(
            update
          );
      };

    update();

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
      window.removeEventListener(
        "scroll",
        requestUpdate
      );

      window.removeEventListener(
        "resize",
        requestUpdate
      );

      if (frame) {
        window.cancelAnimationFrame(
          frame
        );
      }

      for (
        const section of sections
      ) {
        delete section.dataset.active;
      }
    };
  }, [
    initialId,
    items,
  ]);

  useEffect(() => {
    const strip =
      stripRef.current;

    if (!strip) {
      return;
    }

    const active =
      strip.querySelector<HTMLElement>(
        `[data-case-nav-id="${activeId}"]`
      );

    if (!active) {
      return;
    }

    const left =
      active.offsetLeft -
      strip.clientWidth /
        2 +
      active.clientWidth /
        2;

    strip.scrollTo({
      left:
        Math.max(
          0,
          left
        ),
      behavior:
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
    });
  }, [
    activeId,
  ]);

  return (
    <nav
      aria-label="Case file sections"
      className="
        sticky
        top-[68px]
        z-40
        border-b
        border-white/[0.08]
        bg-[#090d12]/94
        backdrop-blur-xl
      "
    >
      <div
        className="
          relative
          border-b
          border-white/[0.04]
        "
      >
        <span
          ref={progressRef}
          aria-hidden="true"
          className={`
            absolute
            bottom-0
            left-0
            h-px
            w-0
            opacity-90
            ${styles.line}
          `}
        />
      </div>

      <div
        className="
          container-shell
          flex
          min-w-0
          items-center
          gap-3
        "
      >
        <div
          className="
            hidden
            shrink-0
            items-center
            gap-2
            border-r
            border-white/[0.08]
            pr-3
            lg:flex
          "
        >
          <span
            aria-hidden="true"
            className={`
              h-1.5
              w-1.5
              rounded-full
              ${styles.dot}
            `}
          />

          <span className="tiny-mono">
            {caseCode}
          </span>
        </div>

        <div
          ref={stripRef}
          className="
            flex
            min-w-0
            flex-1
            items-center
            gap-1
            overflow-x-auto
            overscroll-x-contain
            py-2
            touch-pan-x
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {items.map(
            (
              item
            ) => {
              const isActive =
                activeId ===
                item[0];

              return (
                <a
                  key={item[0]}
                  data-case-nav-id={
                    item[0]
                  }
                  href={`#${item[0]}`}
                  aria-current={
                    isActive
                      ? "location"
                      : undefined
                  }
                  className={`
                    inline-flex
                    min-h-[44px]
                    shrink-0
                    items-center
                    rounded-full
                    border
                    px-3
                    font-mono
                    text-[10px]
                    font-semibold
                    tracking-[0.10em]
                    uppercase
                    outline-none
                    transition-[transform,border-color,background-color,color,box-shadow]
                    duration-300
                    motion-safe:hover:-translate-y-px
                    motion-reduce:transition-none
                    focus-visible:ring-2
                    ${styles.ring}

                    ${
                      isActive
                        ? styles.active
                        : styles.inactive
                    }
                  `}
                >
                  {item[1]}
                </a>
              );
            }
          )}
        </div>
      </div>
    </nav>
  );
}
