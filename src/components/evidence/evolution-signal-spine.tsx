"use client";

import { useEffect, useMemo, useState } from "react";

import type { ClearanceEvidenceProjectSlug } from "@/data/clearance-evidence";
import { getPublicBuildLog } from "@/data/public-build-log";

type EvolutionSignalSpineProps = {
  project: ClearanceEvidenceProjectSlug;
};

type EvolutionStepEvent = {
  project?: ClearanceEvidenceProjectSlug;
  index?: number;
};

export default function EvolutionSignalSpine({ project }: EvolutionSignalSpineProps) {
  const entries = useMemo(() => getPublicBuildLog(project), [project]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);

    const onEvolutionStep = (event: Event) => {
      const detail = (event as CustomEvent<EvolutionStepEvent>).detail;
      if (detail?.project !== project || typeof detail.index !== "number") return;

      setActiveIndex(Math.max(0, Math.min(detail.index, entries.length - 1)));
    };

    window.addEventListener("system:evolution-step", onEvolutionStep);
    return () => window.removeEventListener("system:evolution-step", onEvolutionStep);
  }, [entries.length, project]);

  if (entries.length === 0) return null;

  return (
    <section
      aria-label="Evolution signal spine"
      className="relative hidden min-h-[420px] flex-1 overflow-hidden 2xl:block"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.10] to-transparent"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-55"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
          maskImage: "linear-gradient(to bottom, black 0%, black 88%, transparent 100%)",
        }}
      />

      <div className="relative flex h-full min-h-[420px] flex-col px-6 pb-8 pt-9">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="system-label">Evolution Signal Spine</p>
            <p className="mt-2 max-w-[390px] text-[11px] leading-5 text-[#76838b]">
              Milestone signals mirrored from the disclosed engineering sequence.
            </p>
          </div>
          <span className="tiny-mono shrink-0">
            {String(activeIndex + 1).padStart(2, "0")} / {String(entries.length).padStart(2, "0")}
          </span>
        </div>

        <div className="relative mt-7 min-h-0 flex-1">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 left-[5px] top-6 w-px bg-gradient-to-b from-cyan-200/40 via-white/[0.14] to-white/[0.04]"
          />

          <ol
            className="grid h-full min-h-0"
            style={{
              gridTemplateRows: `repeat(${entries.length}, minmax(118px, 1fr))`,
            }}
          >
            {entries.map((entry, index) => {
              const active = index === activeIndex;
              const complete = index < activeIndex;
              const planned = entry.classification === "PLANNED";

              return (
                <li
                  key={entry.id}
                  aria-current={active ? "step" : undefined}
                  className="relative grid min-h-0 grid-cols-[12px_minmax(0,1fr)] gap-5 py-4 first:pt-2 last:pb-2"
                >
                  <div className="relative z-10 flex justify-center pt-1.5">
                    <span
                      aria-hidden="true"
                      className={`h-3 w-3 rounded-full border transition-[transform,background-color,border-color,box-shadow] duration-300 motion-reduce:transition-none ${
                        planned
                          ? "border-amber-300/50 bg-[#0b1016]"
                          : active || complete
                            ? "border-cyan-200/70 bg-cyan-200/75 shadow-[0_0_18px_rgba(103,232,249,0.24)]"
                            : "border-white/25 bg-[#0b1016]"
                      } ${active ? "scale-125" : ""}`}
                    />
                  </div>

                  <div
                    className={`min-w-0 border-b pb-4 transition-[border-color,opacity] duration-300 motion-reduce:transition-none ${
                      active
                        ? planned
                          ? "border-amber-300/20 opacity-100"
                          : "border-cyan-200/20 opacity-100"
                        : "border-white/[0.06] opacity-75"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                      <div className="flex min-w-0 flex-wrap items-center gap-3">
                        <span
                          className={`font-mono text-[9px] font-semibold tracking-[0.13em] uppercase ${
                            planned
                              ? "text-amber-200"
                              : active || complete
                                ? "text-cyan-200"
                                : "text-[#7e8b93]"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")} / {entry.phase}
                        </span>
                        {active ? <span className="tiny-mono">Active Sequence</span> : null}
                      </div>

                      <span
                        className={`rounded-full border px-2 py-1 font-mono text-[8px] tracking-[0.12em] uppercase ${
                          planned
                            ? "border-amber-300/25 text-amber-200"
                            : active || complete
                              ? "border-cyan-200/20 text-cyan-100/80"
                              : "border-white/[0.08] text-[#69767e]"
                        }`}
                      >
                        {entry.classification}
                      </span>
                    </div>

                    <h4
                      className={`mt-3 max-w-[430px] font-semibold tracking-[-0.015em] transition-[color,font-size,line-height] duration-300 motion-reduce:transition-none ${
                        active
                          ? "text-[16px] leading-6 text-[#e8f0f3]"
                          : "text-[13px] leading-5 text-[#aab5bb]"
                      }`}
                    >
                      {entry.title}
                    </h4>

                    {active ? (
                      <p className="mt-2 max-w-[440px] text-[11px] leading-5 text-[#87939b]">
                        {entry.summary}
                      </p>
                    ) : null}

                    <p className="mt-3 truncate font-mono text-[8px] leading-4 tracking-[0.08em] text-[#66737b] uppercase">
                      Source | {entry.sourceTitle}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-90px] left-1/2 h-[220px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-300/[0.025] blur-[90px]"
        />
      </div>
    </section>
  );
}
