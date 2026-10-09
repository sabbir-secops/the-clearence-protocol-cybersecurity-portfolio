"use client";

import { useEffect } from "react";

import { resolveHomeHash } from "@/lib/public-links";

type HomeDeepLinkControllerProps = {
  enabled: boolean;
};

export default function HomeDeepLinkController({
  enabled,
}: HomeDeepLinkControllerProps) {
  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    let secondFrame = 0;

    const scrollToCurrentHash = () => {
      const sectionId = resolveHomeHash(window.location.hash);
      if (!sectionId) return;

      const section = document.getElementById(sectionId);
      if (!section) return;

      const top = section.getBoundingClientRect().top + window.scrollY - 72;

      window.scrollTo({
        top: Math.max(top, 0),
        behavior:
          document.documentElement.dataset.reducedMotion === "true"
            ? "auto"
            : "smooth",
      });

      window.dispatchEvent(
        new CustomEvent("system:section-change", {
          detail: { id: sectionId },
        })
      );
    };

    const scheduleHashScroll = () => {
      if (frame) window.cancelAnimationFrame(frame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);

      frame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(scrollToCurrentHash);
      });
    };

    scheduleHashScroll();
    window.addEventListener("hashchange", scheduleHashScroll);
    window.addEventListener("popstate", scheduleHashScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
      window.removeEventListener("hashchange", scheduleHashScroll);
      window.removeEventListener("popstate", scheduleHashScroll);
    };
  }, [enabled]);

  return null;
}
