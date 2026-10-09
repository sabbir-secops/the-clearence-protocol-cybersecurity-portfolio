import Link from "next/link";

import {
  resolveClearanceEvidence,
  type ClearanceEvidenceDossier,
  type ClearanceEvidenceRef,
} from "@/data/clearance-evidence";

type ClearanceEvidencePanelProps = {
  refs: ClearanceEvidenceRef[];
  context: string;
  className?: string;
  dossier?: ClearanceEvidenceDossier;
};

function classificationClass(value: string) {
  if (value === "PLANNED") {
    return "border-white/[0.12] bg-white/[0.03] text-[#8f9ca5]";
  }

  if (value === "SANITIZED") {
    return "border-amber-300/25 bg-amber-300/[0.05] text-amber-200";
  }

  return "border-cyan-300/20 bg-cyan-300/[0.045] text-cyan-200";
}

export default function ClearanceEvidencePanel({
  refs,
  context,
  className = "",
  dossier,
}: ClearanceEvidencePanelProps) {
  const records = resolveClearanceEvidence(refs);
  const currentCount = records.filter(
    (record) => record.classification !== "PLANNED"
  ).length;
  const plannedCount = records.length - currentCount;

  return (
    <details
      data-system-evidence="true"
      data-current-evidence={String(currentCount).padStart(2, "0")}
      data-planned-evidence={String(plannedCount).padStart(2, "0")}
      className={`group overflow-hidden rounded-[20px] border border-white/[0.10] bg-[#0b1016] open:border-cyan-300/20 open:bg-[#0c1218] ${className}`}
    >
      <summary className="flex min-h-[82px] cursor-pointer list-none flex-col gap-4 p-5 outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-inset sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="system-label">Clearance Evidence</p>
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.045] px-2.5 py-1 font-mono text-[9px] font-semibold tracking-[0.11em] text-cyan-200 uppercase">
              Source-backed
            </span>
          </div>
          <p className="mt-2 max-w-[760px] text-[13px] leading-6 text-[#9da9b1] sm:text-[14px]">
            {context}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <span className="tiny-mono rounded-full border border-white/[0.10] px-3 py-2">
            {String(currentCount).padStart(2, "0")} current
          </span>
          {plannedCount > 0 ? (
            <span className="tiny-mono rounded-full border border-white/[0.10] px-3 py-2 text-[#8f9ca5]">
              {String(plannedCount).padStart(2, "0")} planned
            </span>
          ) : null}
          <span aria-hidden="true" className="font-mono text-[16px] text-cyan-200">
            +
          </span>
        </div>
      </summary>

      <div className="border-t border-white/[0.09] p-5 sm:p-6">
        {dossier ? (
          <div className="mb-5 grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {[
              ["Problem", dossier.problem],
              ["Role", dossier.role],
              ["Engineering", dossier.engineering],
              ["Security", dossier.security],
              ["Stack", dossier.stack.join(" · ")],
              [
                "Outcome",
                dossier.outcome ??
                  "No public metric or verified outcome is attached to this case file.",
              ],
            ].map(([label, value]) => (
              <div
                key={label}
                className="min-w-0 rounded-[16px] border border-white/[0.09] bg-white/[0.025] p-4"
              >
                <p className="tiny-mono">{label}</p>
                <p className="mt-2 break-words text-[13px] leading-6 text-[#b6c0c6]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        {records.length > 0 ? (
          <div className="grid min-w-0 grid-cols-1 gap-3 lg:grid-cols-2">
            {records.map((record) => (
              <Link
                key={`${record.project}:${record.title}`}
                href={`/archive/${record.project}#evidence`}
                className="group/record min-w-0 rounded-[16px] border border-white/[0.10] bg-[#10161d] p-4 outline-none transition hover:border-cyan-300/25 hover:bg-cyan-300/[0.035] focus-visible:ring-2 focus-visible:ring-cyan-300/70 sm:p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="tiny-mono">
                    {record.projectCode} | {record.projectName}
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-1 font-mono text-[9px] font-semibold tracking-[0.10em] uppercase ${classificationClass(
                      record.classification
                    )}`}
                  >
                    {record.classification}
                  </span>
                </div>

                <h4 className="mt-4 text-[15px] font-semibold leading-6 text-[#eef5f8]">
                  {record.title}
                </h4>
                <p className="mt-2 text-[13px] leading-6 text-[#9da9b1]">
                  {record.summary}
                </p>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-3">
                  <span className="tiny-mono">{record.type}</span>
                  <span className="font-mono text-[10px] tracking-[0.10em] text-cyan-200 uppercase">
                    Inspect record →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-[16px] border border-white/[0.10] bg-[#10161d] p-4 sm:p-5">
            <p className="text-[13px] leading-6 text-[#9da9b1] sm:text-[14px]">
              No public case evidence is attached to this layer yet. No metric,
              outcome or completion claim is inferred from the capability label.
            </p>
          </div>
        )}

        <p className="mt-4 font-mono text-[9px] leading-5 tracking-[0.08em] text-[#77848d] uppercase">
          Planned records are roadmap material only and are excluded from the current evidence count.
        </p>
      </div>
    </details>
  );
}
