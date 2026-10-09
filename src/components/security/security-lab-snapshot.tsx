"use client";

import Link from "next/link";
import { useState } from "react";

import {
  getProjectEvidence,
  getProjectEvidenceSummary,
} from "@/data/clearance-evidence";
import type { CaseEvidence } from "@/data/case-studies/types";
import {
  securityLabControls,
  securityLabWorkflow,
} from "@/data/security-lab-public";

const surfaceTitles = [
  "Web Application Assessment Flow",
  "API Security Surface",
  "Android Analysis",
] as const;

const tooling = ["Burp Suite", "MobSF", "OWASP", "CWE", "OWASP MASVS"];
const securityLabEvidence = getProjectEvidence("security-labs");
const securityLabSummary = getProjectEvidenceSummary("security-labs");
const securityLabSurfaces = surfaceTitles
  .map((title) => securityLabEvidence.find((record) => record.title === title))
  .filter((record): record is CaseEvidence => Boolean(record));

const classificationClass: Record<CaseEvidence["classification"], string> = {
  PUBLIC: "border-cyan-300/25 bg-cyan-300/[0.06] text-cyan-100",
  TECHNICAL: "border-sky-300/25 bg-sky-300/[0.06] text-sky-100",
  SANITIZED: "border-violet-300/25 bg-violet-300/[0.06] text-violet-100",
  PLANNED: "border-amber-300/25 bg-amber-300/[0.06] text-amber-100",
};

export default function SecurityLabSnapshot() {
  const [activeStepId, setActiveStepId] = useState(securityLabWorkflow[0].id);

  const activeStep =
    securityLabWorkflow.find((step) => step.id === activeStepId) ?? securityLabWorkflow[0];

  const selectStep = (id: string) => {
    const step = securityLabWorkflow.find((item) => item.id === id);
    if (!step) return;

    setActiveStepId(id);
    window.dispatchEvent(
      new CustomEvent("system:micro-feedback", {
        detail: {
          label: "LAB SEQUENCE",
          message: `${step.number} · ${step.label}`,
          tone: "cyan",
          duration: 1050,
        },
      })
    );
  };

  return (
    <section
      aria-labelledby="security-lab-snapshot-title"
      className="mt-5 overflow-hidden rounded-[24px] border border-white/[0.10] bg-[#0a0f14] sm:rounded-[28px]"
    >
      <div className="border-b border-white/[0.09] px-5 py-5 sm:px-6 lg:px-8 lg:py-6">
        <div className="flex min-w-0 flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <p className="system-label">Security Lab Snapshot</p>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.05] px-2.5 py-1 font-mono text-[9px] tracking-[0.12em] text-cyan-100 uppercase">
                R-05
              </span>
              <span className="rounded-full border border-white/[0.10] px-2.5 py-1 font-mono text-[9px] tracking-[0.12em] text-[#9eabb3] uppercase">
                Public Research Dossier
              </span>
            </div>

            <h3
              id="security-lab-snapshot-title"
              className="mt-5 max-w-[820px] text-[24px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#eef5f8] sm:text-[28px] lg:text-[32px]"
            >
              From attack-surface understanding to validated evidence.
            </h3>

            <p className="mt-4 max-w-[820px] text-[14px] leading-6 text-[#a8b4bd] sm:text-[15px] sm:leading-7">
              A sanitized view of the Security Labs workflow. The public surface documents methodology,
              assessment areas and tooling without exposing private targets, credentials or sensitive
              exploit detail.
            </p>
          </div>

          <div className="grid shrink-0 grid-cols-2 gap-2 sm:grid-cols-3">
            <div className="rounded-[14px] border border-white/[0.09] bg-[#0e151c] px-3 py-3">
              <p className="tiny-mono">Current Evidence</p>
              <p className="mt-2 text-[20px] font-semibold text-cyan-100">
                {String(securityLabSummary.currentRecords).padStart(2, "0")}
              </p>
            </div>
            <div className="rounded-[14px] border border-white/[0.09] bg-[#0e151c] px-3 py-3">
              <p className="tiny-mono">Planned Records</p>
              <p className="mt-2 text-[20px] font-semibold text-amber-100">
                {String(securityLabSummary.plannedRecords).padStart(2, "0")}
              </p>
            </div>
            <div className="col-span-2 rounded-[14px] border border-white/[0.09] bg-[#0e151c] px-3 py-3 sm:col-span-1">
              <p className="tiny-mono">Public Surfaces</p>
              <p className="mt-2 text-[20px] font-semibold text-[#eef5f8]">
                {String(securityLabSurfaces.length).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid min-w-0 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
        <div className="min-w-0 border-b border-white/[0.09] p-5 sm:p-6 lg:p-8 xl:border-b-0 xl:border-r">
          <div className="flex items-center justify-between gap-4">
            <p className="system-label">Assessment Surfaces</p>
            <span className="tiny-mono">Evidence Bound</span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {securityLabSurfaces.map((surface, index) => (
              <article
                key={surface.title}
                className="min-w-0 rounded-[18px] border border-white/[0.10] bg-[#0d141b] p-4 sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-[9px] tracking-[0.12em] text-[#8f9ca5] uppercase">
                      Surface {String(index + 1).padStart(2, "0")}
                    </p>
                    <h4 className="mt-2 text-[15px] font-semibold leading-5 text-[#eef5f8]">
                      {surface.title}
                    </h4>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2 py-1 font-mono text-[8px] tracking-[0.10em] uppercase ${classificationClass[surface.classification]}`}
                  >
                    {surface.classification}
                  </span>
                </div>

                <p className="mt-3 text-[12px] leading-5 text-[#9eabb3]">{surface.summary}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {surface.details.map((detail) => (
                    <span
                      key={detail}
                      className="rounded-full border border-white/[0.09] bg-white/[0.025] px-2.5 py-1 font-mono text-[8px] tracking-[0.06em] text-[#aeb9bf]"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 rounded-[18px] border border-white/[0.10] bg-[#0c1218] p-4 sm:p-5">
            <div className="flex items-center justify-between gap-4">
              <p className="system-label">Research Controls</p>
              <span className="tiny-mono">Scope + Evidence</span>
            </div>

            <ul className="mt-4 grid gap-2.5">
              {securityLabControls.map((control, index) => (
                <li key={control} className="flex min-w-0 items-start gap-3 text-[12px] leading-5 text-[#a8b4bd]">
                  <span className="mt-[2px] font-mono text-[9px] text-cyan-200">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{control}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="min-w-0 p-5 sm:p-6 lg:p-8">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="system-label">Assessment Sequence</p>
              <p className="mt-2 text-[12px] leading-5 text-[#8f9ca5]">
                Testing produces signals. Validation turns signals into evidence.
              </p>
            </div>
            <span className="tiny-mono">08 Controlled Stages</span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {securityLabWorkflow.map((step) => {
              const active = step.id === activeStep.id;

              return (
                <button
                  key={step.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectStep(step.id)}
                  className={`min-w-0 rounded-[14px] border px-3 py-3 text-left transition-[border-color,background-color,transform] duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f14] ${
                    active
                      ? "border-cyan-300/35 bg-cyan-300/[0.07]"
                      : "border-white/[0.09] bg-[#0e151c] hover:border-cyan-300/20 hover:bg-[#101920]"
                  }`}
                >
                  <span className={`font-mono text-[9px] tracking-[0.10em] ${active ? "text-cyan-200" : "text-[#7f8c95]"}`}>
                    {step.number}
                  </span>
                  <span className="mt-2 block break-words text-[11px] font-semibold leading-4 text-[#dce5e9] sm:text-[12px]">
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            aria-live="polite"
            className="mt-4 rounded-[20px] border border-cyan-300/20 bg-cyan-300/[0.04] p-5 sm:p-6"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="font-mono text-[9px] tracking-[0.13em] text-cyan-200 uppercase">
                  Stage {activeStep.number}
                </p>
                <h4 className="mt-3 text-[20px] font-semibold leading-tight tracking-[-0.02em] text-[#eef5f8] sm:text-[22px]">
                  {activeStep.label}
                </h4>
                <p className="mt-2 font-mono text-[10px] tracking-[0.08em] text-[#9eabb3] uppercase">
                  {activeStep.question}
                </p>
              </div>
              <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(72,215,255,0.75)]" />
            </div>

            <p className="mt-5 max-w-[760px] text-[14px] leading-6 text-[#b5c0c6] sm:text-[15px] sm:leading-7">
              {activeStep.detail}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div className="min-w-0 rounded-[18px] border border-white/[0.10] bg-[#0d141b] p-4 sm:p-5">
              <p className="system-label">Research Tooling</p>
              <p className="mt-2 text-[11px] leading-5 text-[#8f9ca5]">
                Tooling supports investigation; it is not treated as proof by itself.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tooling.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-white/[0.10] bg-white/[0.025] px-3 py-1.5 font-mono text-[9px] tracking-[0.07em] text-[#bdc7cc]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/archive/security-labs"
              className="inline-flex min-h-11 items-center justify-center rounded-[14px] border border-cyan-300/25 bg-cyan-300/[0.06] px-4 py-3 font-mono text-[9px] font-semibold tracking-[0.12em] text-cyan-100 uppercase transition hover:border-cyan-300/45 hover:bg-cyan-300/[0.10] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f14]"
            >
              Open R-05 Case File →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
