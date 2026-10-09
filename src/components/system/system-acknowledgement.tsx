"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type FeedbackTone = "cyan" | "amber" | "muted";

type FeedbackDetail = {
  label?: string;
  message?: string;
  tone?: FeedbackTone;
  duration?: number;
};

type ArchiveProjectDetail = {
  code?: string;
  name?: string;
  classified?: boolean;
};

type SoundChangeDetail = {
  enabled?: boolean;
};

type ContactStateDetail = {
  state?: "idle" | "submitting" | "success" | "activation" | "error";
};

type EvolutionStepDetail = {
  project?: string;
  index?: number;
  phase?: string;
  title?: string;
  classification?: string;
};

type FeedbackState = Required<Pick<FeedbackDetail, "label" | "message" | "tone">>;

const toneClass: Record<FeedbackTone, string> = {
  cyan: "border-cyan-300/25 bg-[#0a1117]/94 text-cyan-100 shadow-[0_16px_45px_rgba(0,0,0,0.32),0_0_28px_rgba(72,215,255,0.07)]",
  amber: "border-amber-300/25 bg-[#12100c]/94 text-amber-100 shadow-[0_16px_45px_rgba(0,0,0,0.32),0_0_28px_rgba(251,191,36,0.06)]",
  muted: "border-white/[0.12] bg-[#0a0f14]/94 text-[#d6e0e5] shadow-[0_16px_45px_rgba(0,0,0,0.32)]",
};

const dotClass: Record<FeedbackTone, string> = {
  cyan: "bg-cyan-300 shadow-[0_0_10px_rgba(72,215,255,0.75)]",
  amber: "bg-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.65)]",
  muted: "bg-white/40",
};

export default function SystemAcknowledgement() {
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [visible, setVisible] = useState(false);
  const hideTimerRef = useRef<number | null>(null);
  const clearTimerRef = useRef<number | null>(null);
  const soundInitializedRef = useRef(false);
  const lastEvolutionSignalRef = useRef("");

  const clearTimers = useCallback(() => {
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }

    if (clearTimerRef.current !== null) {
      window.clearTimeout(clearTimerRef.current);
      clearTimerRef.current = null;
    }
  }, []);

  const showFeedback = useCallback(
    ({
      label = "SYSTEM RESPONSE",
      message,
      tone = "cyan",
      duration = 1600,
    }: FeedbackDetail) => {
      if (!message) return;

      clearTimers();
      setFeedback({ label, message, tone });
      setVisible(false);

      window.requestAnimationFrame(() => {
        setVisible(true);
      });

      hideTimerRef.current = window.setTimeout(() => {
        setVisible(false);
        clearTimerRef.current = window.setTimeout(() => {
          setFeedback(null);
        }, 220);
      }, Math.max(900, duration));
    },
    [clearTimers]
  );

  useEffect(() => {
    const handleFeedback = (event: Event) => {
      showFeedback((event as CustomEvent<FeedbackDetail>).detail ?? {});
    };

    const handleArchiveProject = (event: Event) => {
      if (document.documentElement.dataset.systemSection !== "archive") return;

      const detail = (event as CustomEvent<ArchiveProjectDetail>).detail;
      if (!detail?.code || !detail.name) return;

      showFeedback({
        label: detail.classified ? "RESTRICTED RECORD" : "PROJECT CONTEXT",
        message: detail.classified
          ? `${detail.code} · public status only`
          : `${detail.code} · ${detail.name}`,
        tone: detail.classified ? "amber" : "cyan",
        duration: 1350,
      });
    };

    const handleSoundChange = (event: Event) => {
      const enabled = (event as CustomEvent<SoundChangeDetail>).detail?.enabled;
      if (typeof enabled !== "boolean") return;

      if (!soundInitializedRef.current) {
        soundInitializedRef.current = true;
        return;
      }

      showFeedback({
        label: "AUDIO STATE",
        message: enabled ? "Interface sound enabled" : "Interface sound muted",
        tone: enabled ? "cyan" : "muted",
        duration: 1200,
      });
    };

    const handleContactState = (event: Event) => {
      const state = (event as CustomEvent<ContactStateDetail>).detail?.state;

      if (state === "success") {
        showFeedback({
          label: "CONNECTION CHANNEL",
          message: "Message transmitted successfully",
          tone: "cyan",
          duration: 1800,
        });
      } else if (state === "activation") {
        showFeedback({
          label: "CONNECTION CHANNEL",
          message: "Endpoint awaiting activation · use email channel",
          tone: "amber",
          duration: 2200,
        });
      } else if (state === "error") {
        showFeedback({
          label: "CONNECTION CHANNEL",
          message: "Transmission failed · retry or use email",
          tone: "amber",
          duration: 2000,
        });
      }
    };

    const handleEvolutionStep = (event: Event) => {
      if (document.documentElement.dataset.systemSection !== "archive") return;

      const detail = (event as CustomEvent<EvolutionStepDetail>).detail;
      if (
        !detail?.project ||
        typeof detail.index !== "number" ||
        detail.index <= 0 ||
        !detail.phase ||
        !detail.title
      ) {
        return;
      }

      const signalKey = `${detail.project}:${detail.index}:${detail.title}`;
      if (lastEvolutionSignalRef.current === signalKey) return;
      lastEvolutionSignalRef.current = signalKey;

      showFeedback({
        label: "EVOLUTION SIGNAL",
        message: `${detail.phase} · ${detail.title}`,
        tone: detail.classification === "PLANNED" ? "amber" : "cyan",
        duration: 1150,
      });
    };

    const handleDetailsToggle = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLDetailsElement)) return;
      if (target.dataset.systemEvidence !== "true") return;

      const current = target.dataset.currentEvidence ?? "00";
      const planned = target.dataset.plannedEvidence ?? "00";

      showFeedback({
        label: "EVIDENCE LAYER",
        message: target.open
          ? `${current} current · ${planned} planned records exposed`
          : "Evidence records collapsed",
        tone: target.open ? "cyan" : "muted",
        duration: 1250,
      });
    };

    window.addEventListener("system:micro-feedback", handleFeedback);
    window.addEventListener("system:archive-project-change", handleArchiveProject);
    window.addEventListener("system:sound-change", handleSoundChange);
    window.addEventListener("system:contact-state-change", handleContactState);
    window.addEventListener("system:evolution-step", handleEvolutionStep);
    document.addEventListener("toggle", handleDetailsToggle, true);

    const soundQueryFrame = window.requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent("system:sound-query"));
    });

    return () => {
      window.cancelAnimationFrame(soundQueryFrame);
      clearTimers();
      window.removeEventListener("system:micro-feedback", handleFeedback);
      window.removeEventListener("system:archive-project-change", handleArchiveProject);
      window.removeEventListener("system:sound-change", handleSoundChange);
      window.removeEventListener("system:contact-state-change", handleContactState);
      window.removeEventListener("system:evolution-step", handleEvolutionStep);
      document.removeEventListener("toggle", handleDetailsToggle, true);
    };
  }, [clearTimers, showFeedback]);

  if (!feedback) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed left-3 top-[84px] z-[110] w-[min(320px,calc(100vw-24px))] rounded-[14px] border px-4 py-3 backdrop-blur-xl transition-[opacity,transform] duration-200 motion-reduce:transition-none sm:left-4 sm:top-[88px] ${toneClass[feedback.tone]} ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-1.5 opacity-0"
      }`}
    >
      <div className="flex min-w-0 items-start gap-3">
        <span
          className={`mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full ${dotClass[feedback.tone]}`}
        />
        <div className="min-w-0">
          <p className="font-mono text-[8px] font-semibold tracking-[0.13em] text-current uppercase opacity-70 sm:text-[9px]">
            {feedback.label}
          </p>
          <p className="mt-1 break-words font-mono text-[10px] leading-5 tracking-[0.04em] text-current sm:text-[11px]">
            {feedback.message}
          </p>
        </div>
      </div>
    </div>
  );
}
