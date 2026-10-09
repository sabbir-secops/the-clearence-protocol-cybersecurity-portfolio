"use client";

import { useEffect, useMemo, useRef } from "react";

import {
  getPublicBuildLog,
  type PublicBuildLogEntry,
} from "@/data/public-build-log";
import type { ClearanceEvidenceProjectSlug } from "@/data/clearance-evidence";

type SystemEvolutionLogProps = {
  project: ClearanceEvidenceProjectSlug;
  className?: string;
};

function classificationClass(
  classification: PublicBuildLogEntry["classification"]
) {
  if (classification === "PLANNED") {
    return "border-amber-300/25 bg-amber-300/[0.05] text-amber-200";
  }

  if (classification === "SANITIZED") {
    return "border-white/[0.12] bg-white/[0.035] text-[#b6c0c6]";
  }

  return "border-cyan-300/20 bg-cyan-300/[0.045] text-cyan-200";
}

export default function SystemEvolutionLog({
  project,
  className = "",
}: SystemEvolutionLogProps) {
  const entries = useMemo(() => getPublicBuildLog(project), [project]);
  const entryRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (entries.length === 0) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const emitEntry = (index: number) => {
      const entry = entries[index];
      if (!entry) return;

      window.dispatchEvent(
        new CustomEvent("system:evolution-step", {
          detail: {
            project,
            index,
            total: entries.length,
            id: entry.id,
            phase: entry.phase,
            title: entry.title,
            classification: entry.classification,
          },
        })
      );
    };

    emitEntry(0);

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (observedEntries) => {
        const visible = observedEntries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const index = Number(
          (visible.target as HTMLElement).dataset.evolutionIndex
        );

        if (Number.isFinite(index)) {
          emitEntry(index);
        }
      },
      {
        rootMargin: "-28% 0px -48% 0px",
        threshold: [0.25, 0.55, 0.8],
      }
    );

    entryRefs.current.forEach((entry) => {
      if (entry) observer.observe(entry);
    });

    return () => observer.disconnect();
  }, [entries, project]);

  return (
    <section
      className={`mt-8 border-t border-white/[0.09] pt-7 ${className}`}
      aria-labelledby={`evolution-log-${project}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="system-label">System Evolution / Build Log</p>
          <h4
            id={`evolution-log-${project}`}
            className="mt-3 text-[20px] font-semibold tracking-[-0.025em] text-[#eef5f8] sm:text-[22px]"
          >
            Public engineering sequence.
          </h4>
          <p className="mt-2 max-w-[620px] text-[13px] leading-6 text-[#9da9b1] sm:text-[14px]">
            Ordered from disclosed system dependencies and evidence records. No
            historical date is inferred where the public source does not provide one.
          </p>
        </div>

        <span className="tiny-mono shrink-0 rounded-full border border-white/[0.10] px-3 py-2">
          {String(entries.length).padStart(2, "0")} records
        </span>
      </div>

      <div className="mt-6 space-y-3">
        {entries.map((entry, index) => {
          const planned = entry.classification === "PLANNED";

          return (
            <article
              key={entry.id}
              ref={(node) => {
                entryRefs.current[index] = node;
              }}
              data-evolution-index={index}
              className={`relative min-w-0 overflow-hidden rounded-[16px] border p-4 sm:p-5 ${
                planned
                  ? "border-amber-300/[0.16] bg-amber-300/[0.025]"
                  : "border-white/[0.09] bg-[#10161d]"
              }`}
            >
              <div className="flex min-w-0 items-start gap-4">
                <div className="relative flex shrink-0 flex-col items-center">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full border font-mono text-[10px] font-semibold ${
                      planned
                        ? "border-amber-300/35 bg-amber-300/[0.06] text-amber-200"
                        : "border-cyan-300/25 bg-cyan-300/[0.05] text-cyan-200"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {index < entries.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className={`mt-2 h-8 w-px ${
                        planned ? "border-l border-dashed border-amber-300/25" : "bg-white/[0.10]"
                      }`}
                    />
                  ) : null}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="tiny-mono">{entry.phase}</span>
                    <span
                      className={`rounded-full border px-2.5 py-1 font-mono text-[9px] font-semibold tracking-[0.10em] uppercase ${classificationClass(
                        entry.classification
                      )}`}
                    >
                      {entry.classification}
                    </span>
                  </div>

                  <h5 className="mt-3 text-[15px] font-semibold leading-6 text-[#e8f0f3]">
                    {entry.title}
                  </h5>
                  <p className="mt-2 text-[13px] leading-6 text-[#9da9b1]">
                    {entry.summary}
                  </p>
                  <p className="mt-3 border-t border-white/[0.07] pt-3 font-mono text-[9px] leading-5 tracking-[0.08em] text-[#738089] uppercase">
                    Source | {entry.sourceTitle}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
