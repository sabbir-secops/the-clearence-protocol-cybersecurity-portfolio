"use client";

import { useEffect, useMemo, useState } from "react";

import type { ClearanceEvidenceProjectSlug } from "@/data/clearance-evidence";
import { getPublicBuildLog } from "@/data/public-build-log";

type EvolutionReactorProps = {
  project: ClearanceEvidenceProjectSlug;
};

type EvolutionStepEvent = {
  project?: ClearanceEvidenceProjectSlug;
  index?: number;
};

export default function EvolutionReactor({ project }: EvolutionReactorProps) {
  const entries = useMemo(() => getPublicBuildLog(project), [project]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);

    const onEvolutionStep = (event: Event) => {
      const detail = (event as CustomEvent<EvolutionStepEvent>).detail;
      if (detail?.project !== project || typeof detail.index !== "number") {
        return;
      }

      setActiveIndex(Math.max(0, Math.min(detail.index, entries.length - 1)));
    };

    window.addEventListener("system:evolution-step", onEvolutionStep);
    return () => window.removeEventListener("system:evolution-step", onEvolutionStep);
  }, [entries.length, project]);

  const activeEntry = entries[activeIndex] ?? entries[0];
  const progress = entries.length > 0 ? (activeIndex + 1) / entries.length : 1;
  const circumference = 2 * Math.PI * 112;
  const dashOffset = circumference * (1 - progress);
  const planned = activeEntry?.classification === "PLANNED";

  if (!activeEntry) return null;

  return (
    <section
      aria-label="System evolution reactor"
      className="relative min-h-[560px] overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#090e13]"
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 top-[42%] h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px] ${
          planned ? "bg-amber-300/[0.045]" : "bg-cyan-300/[0.045]"
        }`}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.024) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.024) 1px, transparent 1px)
          `,
          backgroundSize: "42px 42px",
          maskImage: "linear-gradient(to bottom, black 0%, black 78%, transparent 100%)",
        }}
      />

      <div className="relative z-10 flex min-h-[560px] flex-col p-7 xl:p-8">
        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0">
            <p className="system-label">Evolution Reactor</p>
            <p className="mt-2 max-w-[360px] text-[12px] leading-5 text-[#7f8b93]">
              A visual companion to the public engineering sequence. It reflects
              disclosed records only.
            </p>
          </div>
          <span className={`tiny-mono ${planned ? "text-amber-200" : "text-cyan-200"}`}>
            {activeEntry.phase}
          </span>
        </div>

        <div className="relative mx-auto mt-7 flex h-[300px] w-[300px] shrink-0 items-center justify-center">
          <svg
            aria-hidden="true"
            viewBox="0 0 260 260"
            className="absolute inset-0 h-full w-full -rotate-90"
          >
            <circle
              cx="130"
              cy="130"
              r="112"
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
            />
            <circle
              cx="130"
              cy="130"
              r="92"
              fill="none"
              stroke={planned ? "rgba(252,211,77,0.16)" : "rgba(103,232,249,0.15)"}
              strokeWidth="1"
              strokeDasharray={planned ? "4 9" : "2 8"}
            />
            <circle
              cx="130"
              cy="130"
              r="112"
              fill="none"
              stroke={planned ? "rgba(252,211,77,0.72)" : "rgba(103,232,249,0.72)"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              className="transition-[stroke-dashoffset] duration-700 motion-reduce:transition-none"
            />
          </svg>

          <div
            aria-hidden="true"
            className={`absolute h-[188px] w-[188px] rounded-full border ${
              planned
                ? "border-dashed border-amber-300/20 bg-amber-300/[0.025]"
                : "border-cyan-300/[0.16] bg-cyan-300/[0.025]"
            }`}
          />
          <div
            aria-hidden="true"
            className="absolute h-[126px] w-[126px] rounded-full border border-white/[0.10] bg-[#0b1117] shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          />

          <div className="relative z-10 max-w-[120px] text-center">
            <span className={`font-mono text-[10px] font-semibold tracking-[0.14em] uppercase ${planned ? "text-amber-200" : "text-cyan-200"}`}>
              {String(activeIndex + 1).padStart(2, "0")} / {String(entries.length).padStart(2, "0")}
            </span>
            <p className="mt-3 text-[15px] font-semibold leading-5 text-[#edf4f7]">
              {activeEntry.phase}
            </p>
          </div>

          {entries.map((entry, index) => {
            const angle = (index / entries.length) * Math.PI * 2 - Math.PI / 2;
            const radius = 137;
            const x = 150 + Math.cos(angle) * radius;
            const y = 150 + Math.sin(angle) * radius;
            const active = index === activeIndex;
            const complete = index < activeIndex;
            const future = entry.classification === "PLANNED";

            return (
              <span
                key={entry.id}
                aria-hidden="true"
                className={`absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border transition duration-300 motion-reduce:transition-none ${
                  future
                    ? "border-amber-300/45 bg-[#15130d]"
                    : active || complete
                      ? "border-cyan-200/60 bg-cyan-200/70 shadow-[0_0_18px_rgba(103,232,249,0.28)]"
                      : "border-white/20 bg-[#10161d]"
                } ${active ? "scale-125" : ""}`}
                style={{ left: `${(x / 300) * 100}%`, top: `${(y / 300) * 100}%` }}
              />
            );
          })}
        </div>

        <div className="mt-auto border-t border-white/[0.08] pt-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="tiny-mono">Active Record</span>
            <span
              className={`rounded-full border px-2.5 py-1 font-mono text-[9px] font-semibold tracking-[0.10em] uppercase ${
                planned
                  ? "border-amber-300/25 bg-amber-300/[0.05] text-amber-200"
                  : "border-cyan-300/20 bg-cyan-300/[0.045] text-cyan-200"
              }`}
            >
              {activeEntry.classification}
            </span>
          </div>
          <h4 className="mt-3 text-[16px] font-semibold leading-6 text-[#e8f0f3]">
            {activeEntry.title}
          </h4>
          <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-[#87939b]">
            Source | {activeEntry.sourceTitle}
          </p>

          <div className="mt-5 flex gap-2">
            {entries.map((entry, index) => {
              const active = index === activeIndex;
              const future = entry.classification === "PLANNED";

              return (
                <span
                  key={`${entry.id}-signal`}
                  aria-hidden="true"
                  className={`h-1 flex-1 rounded-full transition duration-300 motion-reduce:transition-none ${
                    future
                      ? "border border-dashed border-amber-300/30 bg-transparent"
                      : index <= activeIndex
                        ? "bg-cyan-200/55"
                        : "bg-white/[0.08]"
                  } ${active ? "shadow-[0_0_12px_rgba(103,232,249,0.18)]" : ""}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
