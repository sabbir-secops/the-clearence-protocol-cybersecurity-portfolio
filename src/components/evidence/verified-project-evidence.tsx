import {
  getProjectEvidenceMetrics,
  getProjectEvidenceSummary,
  type ClearanceEvidenceProjectSlug,
} from "@/data/clearance-evidence";

type VerifiedProjectEvidenceProps = {
  project: ClearanceEvidenceProjectSlug;
  className?: string;
  compact?: boolean;
};

function metricTone(classification: string) {
  if (classification === "PLANNED") {
    return "border-white/[0.10] bg-white/[0.025] text-[#8f9ca5]";
  }

  if (classification === "SANITIZED") {
    return "border-amber-300/20 bg-amber-300/[0.04] text-amber-200";
  }

  return "border-cyan-300/20 bg-cyan-300/[0.04] text-cyan-200";
}

export default function VerifiedProjectEvidence({
  project,
  className = "",
  compact = false,
}: VerifiedProjectEvidenceProps) {
  const summary = getProjectEvidenceSummary(project);
  const metrics = getProjectEvidenceMetrics(project);

  return (
    <div
      className={`rounded-[20px] border border-white/[0.10] bg-[#0b1016] p-5 sm:p-6 ${className}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="system-label">Evidence Metrics</p>
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.045] px-2.5 py-1 font-mono text-[9px] font-semibold tracking-[0.11em] text-cyan-200 uppercase">
              Source-bound
            </span>
          </div>
          <p className="mt-2 max-w-[760px] text-[13px] leading-6 text-[#9da9b1] sm:text-[14px]">
            These values are derived only from disclosed case records. They are
            not business-impact estimates, client KPIs or inferred outcomes.
          </p>
        </div>

        {!compact ? (
          <div className="flex shrink-0 flex-wrap gap-2">
            <span className="tiny-mono rounded-full border border-white/[0.10] px-3 py-2">
              {String(summary.currentRecords).padStart(2, "0")} current
            </span>
            {summary.plannedRecords > 0 ? (
              <span className="tiny-mono rounded-full border border-white/[0.10] px-3 py-2 text-[#8f9ca5]">
                {String(summary.plannedRecords).padStart(2, "0")} planned
              </span>
            ) : null}
          </div>
        ) : null}
      </div>

      <div
        className={`mt-5 grid min-w-0 gap-3 ${
          compact
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
        }`}
      >
        {metrics.map((metric) => (
          <article
            key={`${metric.sourceTitle}:${metric.label}`}
            className="min-w-0 rounded-[16px] border border-white/[0.09] bg-[#10161d] p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="tiny-mono">{metric.kind}</span>
              <span
                className={`rounded-full border px-2.5 py-1 font-mono text-[9px] font-semibold tracking-[0.10em] uppercase ${metricTone(metric.sourceClassification)}`}
              >
                {metric.sourceClassification}
              </span>
            </div>

            <p className="mt-4 break-words text-[22px] font-semibold leading-tight text-[#eef5f8] sm:text-[24px]">
              {metric.value}
            </p>
            <h3 className="mt-2 text-[13px] font-semibold leading-5 text-[#c8d2d7]">
              {metric.label}
            </h3>
            <p className="mt-3 text-[12px] leading-5 text-[#8f9ca5]">
              {metric.note}
            </p>
            <p className="mt-4 border-t border-white/[0.08] pt-3 font-mono text-[9px] leading-5 tracking-[0.08em] text-[#738089] uppercase">
              Source | {metric.sourceTitle}
            </p>
          </article>
        ))}
      </div>

      {!compact ? (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-white/[0.08] pt-4">
          <span className="tiny-mono">Public {summary.publicRecords}</span>
          <span className="tiny-mono">Technical {summary.technicalRecords}</span>
          <span className="tiny-mono">Sanitized {summary.sanitizedRecords}</span>
          {summary.plannedRecords > 0 ? (
            <span className="tiny-mono text-[#7f8c94]">Planned {summary.plannedRecords}</span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
