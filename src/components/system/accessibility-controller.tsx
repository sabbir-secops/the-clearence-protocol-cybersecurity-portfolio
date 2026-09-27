"use client";

import {
  useEffect,
  useState,
} from "react";

type AccessibilityControllerProps = {
  enabled: boolean;
};

type AnnouncementDetail = {
  message?: string;
};

type ReducedMotionDetail = {
  enabled: boolean;
};

export default function AccessibilityController({
  enabled,
}: AccessibilityControllerProps) {
  const [
    announcement,
    setAnnouncement,
  ] =
    useState("");

  const [
    reducedMotion,
    setReducedMotion,
  ] =
    useState(false);

  useEffect(() => {
    const html =
      document.documentElement;

    const handleKeyboard =
      (
        event: KeyboardEvent
      ) => {
        if (
          event.key ===
            "Tab" ||
          event.key ===
            "Enter" ||
          event.key ===
            " "
        ) {
          html.dataset.inputModality =
            "keyboard";
        }
      };

    const handlePointer =
      () => {
        html.dataset.inputModality =
          "pointer";
      };

    window.addEventListener(
      "keydown",
      handleKeyboard
    );

    window.addEventListener(
      "pointerdown",
      handlePointer,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard
      );

      window.removeEventListener(
        "pointerdown",
        handlePointer
      );

      delete html.dataset
        .inputModality;
    };
  }, []);

  useEffect(() => {
    const query =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );

    const applyPreference =
      () => {
        const active =
          query.matches;

        setReducedMotion(
          active
        );

        document.documentElement
          .dataset.reducedMotion =
          active
            ? "true"
            : "false";

        window.dispatchEvent(
          new CustomEvent<ReducedMotionDetail>(
            "system:reduced-motion-change",
            {
              detail: {
                enabled:
                  active,
              },
            }
          )
        );
      };

    applyPreference();

    query.addEventListener(
      "change",
      applyPreference
    );

    return () => {
      query.removeEventListener(
        "change",
        applyPreference
      );

      delete document
        .documentElement
        .dataset
        .reducedMotion;
    };
  }, []);

  useEffect(() => {
    const handleAnnouncement =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<AnnouncementDetail>;

        const message =
          customEvent.detail
            ?.message;

        if (
          !message
        ) {
          return;
        }

        setAnnouncement(
          ""
        );

        window.requestAnimationFrame(
          () => {
            setAnnouncement(
              message
            );
          }
        );
      };

    window.addEventListener(
      "system:a11y-announce",
      handleAnnouncement
    );

    return () => {
      window.removeEventListener(
        "system:a11y-announce",
        handleAnnouncement
      );
    };
  }, []);

  const skipToContent =
    (
      event:
        React.MouseEvent<
          HTMLAnchorElement
        >
    ) => {
      event.preventDefault();

      const main =
        document.getElementById(
          "main-content"
        );

      if (
        !main
      ) {
        return;
      }

      main.focus({
        preventScroll: true,
      });

      main.scrollIntoView({
        block: "start",
        behavior:
          reducedMotion
            ? "auto"
            : "smooth",
      });
    };

  if (
    !enabled
  ) {
    return null;
  }

  return (
    <>
      <style>
        {`
          :where(
            a,
            button,
            input,
            select,
            textarea,
            [role="button"],
            [tabindex]
          ):focus-visible {
            outline: 2px solid rgba(72, 215, 255, 0.95);
            outline-offset: 4px;
          }

          html[data-input-modality="pointer"]
          :where(
            a,
            button,
            input,
            select,
            textarea,
            [role="button"],
            [tabindex]
          ):focus:not(:focus-visible) {
            outline: none;
          }

          #main-content {
            scroll-margin-top: 88px;
          }

          section[id] {
            scroll-margin-top: 88px;
          }

          html[data-reduced-motion="true"] {
            scroll-behavior: auto !important;
          }

          html[data-reduced-motion="true"]
          .accessibility-motion-sensitive {
            animation: none !important;
            transition-duration: 0.01ms !important;
          }
        `}
      </style>

      <a
        href="#main-content"
        onClick={
          skipToContent
        }
        className="
          fixed
          left-4
          top-3
          z-[200]
          -translate-y-[160%]
          rounded-[12px]
          border
          border-cyan-300/40
          bg-[#081018]
          px-4
          py-3
          font-mono
          text-[11px]
          font-semibold
          tracking-[0.1em]
          text-cyan-100
          uppercase
          shadow-[0_16px_45px_rgba(0,0,0,0.55)]
          transition-transform
          focus:translate-y-0
        "
      >
        Skip to main content
      </a>

      <div
        aria-live="polite"
        aria-atomic="true"
        className="
          pointer-events-none
          fixed
          h-px
          w-px
          overflow-hidden
          opacity-0
        "
      >
        {
          announcement
        }
      </div>
    </>
  );
}