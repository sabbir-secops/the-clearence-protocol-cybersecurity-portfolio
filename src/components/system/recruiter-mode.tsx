"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type RecruiterModeProps = {
  enabled: boolean;
};

type ProjectBrief = {
  code: string;
  name: string;
  focus: string;
  contribution: string;
  href: string;
};

const coreDomains = [
  "Cybersecurity",
  "Product Engineering",
  "Web & App Systems",
  "Secure Infrastructure",
  "Search Engineering",
  "Technical Research",
];

const capabilityGroups = [
  {
    label: "Security",
    items: [
      "Application Security",
      "Web Pentesting",
      "VAPT",
      "OWASP",
      "API Security",
      "Authentication & Authorization Testing",
      "Burp Suite",
      "MobSF",
    ],
  },
  {
    label: "Engineering",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Flutter",
      "Dart",
      "Riverpod",
      "REST APIs",
      "Product Architecture",
      "SaaS Architecture",
      "RBAC",
    ],
  },
  {
    label: "Infrastructure",
    items: [
      "Linux",
      "Server Security",
      "Linux Hardening",
      "SSH Hardening",
      "Firewall",
      "VPS",
      "DNS",
      "SSL & TLS",
      "Cloudflare",
      "NGINX",
    ],
  },
  {
    label: "Search & Research",
    items: [
      "Technical SEO",
      "Core Web Vitals",
      "Structured Data",
      "AEO",
      "GEO",
      "Security Research",
      "Technical Research",
      "AI Assisted Engineering",
    ],
  },
];

const selectedWork: ProjectBrief[] = [
  {
    code: "A-02",
    name: "AGED Application System",
    focus: "Multi-role product engineering",
    contribution:
      "Product architecture, application development and system design across branch-aware workflows, RBAC and operational systems.",
    href: "/archive/aged",
  },
  {
    code: "H-01",
    name: "HostSecual",
    focus: "Security-first infrastructure",
    contribution:
      "Infrastructure, security and product-focused technical work across Linux, hosting, DNS, TLS, Cloudflare and server environments.",
    href: "/archive/hostsecual",
  },
  {
    code: "SP-04",
    name: "SoftParallax",
    focus: "Web, search and digital engineering",
    contribution:
      "Web technology, technical SEO, structured data, performance and search architecture work.",
    href: "/archive/softparallax",
  },
  {
    code: "R-05",
    name: "Security Labs",
    focus: "Assessment, research and experimentation",
    contribution:
      "Security testing, application and API assessment, mobile analysis, vulnerability research and technical investigation.",
    href: "/archive/security-labs",
  },
];

const securitySnapshot = [
  "Web and application security assessment",
  "API authentication and authorization testing",
  "OWASP and VAPT-oriented methodology",
  "Burp Suite and MobSF-assisted analysis",
  "Vulnerability analysis with controlled evidence",
];

const infrastructureSnapshot = [
  "Linux and server security",
  "SSH hardening and firewall controls",
  "DNS, SSL/TLS and Cloudflare layers",
  "NGINX, Apache, LiteSpeed and VPS environments",
  "Security-aware hosting architecture",
];

export default function RecruiterMode({ enabled }: RecruiterModeProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const restoreFocusRef = useRef(true);

  const announce = useCallback((message: string) => {
    window.dispatchEvent(
      new CustomEvent("system:a11y-announce", {
        detail: { message },
      })
    );
  }, []);

  const acknowledge = useCallback(
    (message: string, tone: "cyan" | "muted" = "cyan") => {
      window.dispatchEvent(
        new CustomEvent("system:micro-feedback", {
          detail: {
            label: "RECRUITER MODE",
            message,
            tone,
            duration: 1350,
          },
        })
      );
    },
    []
  );

  const openMode = useCallback(() => {
    if (!enabled) return;

    const activeElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    previousFocusRef.current =
      activeElement?.closest("#system-terminal")
        ? document.querySelector<HTMLElement>(
            '[aria-controls="system-index"]'
          )
        : activeElement;
    restoreFocusRef.current = true;
    setOpen(true);
    announce("60 second recruiter briefing opened");
    acknowledge("60-second briefing opened");
  }, [acknowledge, announce, enabled]);

  const closeMode = useCallback(() => {
    restoreFocusRef.current = true;
    setOpen(false);
    announce("60 second recruiter briefing closed");
    acknowledge("Briefing closed", "muted");
  }, [acknowledge, announce]);

  const closeForNavigation = useCallback(() => {
    restoreFocusRef.current = false;
    setOpen(false);
    announce("60 second recruiter briefing closed");
    acknowledge("Returning to portfolio context", "muted");
  }, [acknowledge, announce]);

  const toggleMode = useCallback(() => {
    if (open) {
      closeMode();
      return;
    }

    openMode();
  }, [closeMode, open, openMode]);

  useEffect(() => {
    const handleToggle = () => toggleMode();
    const handleOpen = () => openMode();
    const handleClose = () => closeMode();

    window.addEventListener("system:recruiter-toggle", handleToggle);
    window.addEventListener("system:recruiter-open", handleOpen);
    window.addEventListener("system:recruiter-close", handleClose);

    return () => {
      window.removeEventListener("system:recruiter-toggle", handleToggle);
      window.removeEventListener("system:recruiter-open", handleOpen);
      window.removeEventListener("system:recruiter-close", handleClose);
    };
  }, [closeMode, openMode, toggleMode]);

  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "[tabindex]:not([tabindex='-1'])",
    ].join(",");

    const getFocusable = () =>
      Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) => {
          const style = window.getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return (
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            rect.width > 0 &&
            rect.height > 0
          );
        }
      );

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMode();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === dialog)) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeydown);
      body.style.overflow = previousOverflow;

      const previous = previousFocusRef.current;
      if (restoreFocusRef.current && previous?.isConnected) {
        window.requestAnimationFrame(() => previous.focus());
      }
    };
  }, [closeMode, open]);

  if (!enabled) return null;

  return (
    <div
      className={`
        fixed
        inset-0
        z-[90]
        transition
        duration-200
        ${
          open
            ? "visible pointer-events-auto opacity-100"
            : "invisible pointer-events-none opacity-0"
        }
      `}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        onClick={closeMode}
        className="absolute inset-0 h-full w-full bg-black/[0.72] backdrop-blur-sm"
      />

      <div
        ref={dialogRef}
        id="recruiter-mode"
        role="dialog"
        aria-modal="true"
        aria-labelledby="recruiter-mode-title"
        aria-describedby="recruiter-mode-description"
        tabIndex={-1}
        className="absolute inset-x-2 bottom-2 top-2 overflow-hidden rounded-[22px] border border-white/[0.11] bg-[#080b0f] shadow-[0_30px_100px_rgba(0,0,0,0.65)] outline-none sm:inset-x-4 sm:bottom-4 sm:top-4 lg:left-1/2 lg:right-auto lg:w-[min(1180px,calc(100%_-_48px))] lg:-translate-x-1/2"
      >
        <div className="flex h-full min-h-0 flex-col">
          <header className="flex shrink-0 items-center justify-between gap-4 border-b border-white/[0.08] px-4 py-4 sm:px-6 lg:px-8">
            <div className="min-w-0">
              <p className="system-label">Recruiter Fast Path</p>
              <p className="mt-1 font-mono text-[9px] tracking-[0.11em] text-[#84929b] uppercase sm:text-[10px]">
                Public briefing | S-01 excluded
              </p>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeMode}
              className="flex min-h-[44px] shrink-0 items-center justify-center rounded-full border border-white/[0.11] bg-white/[0.025] px-4 font-mono text-[10px] tracking-[0.12em] text-[#c5ced3] uppercase transition hover:border-cyan-300/35 hover:bg-cyan-300/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080b0f]"
            >
              Close
            </button>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <div className="mx-auto w-full max-w-[1120px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-10">
              <section className="border-b border-white/[0.08] pb-8 sm:pb-10">
                <div className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-end">
                  <div className="min-w-0">
                    <p className="tiny-mono">60-Second Recruiter Mode</p>
                    <h2
                      id="recruiter-mode-title"
                      className="mt-3 max-w-[780px] text-[34px] font-semibold leading-[0.98] tracking-[-0.045em] text-[#eef5f8] sm:text-[46px] lg:text-[58px]"
                    >
                      Md. Sabbir Hossain
                    </h2>
                    <p className="mt-4 text-[18px] font-medium text-cyan-100 sm:text-[20px]">
                      Cybersecurity Product Engineer
                    </p>
                    <p
                      id="recruiter-mode-description"
                      className="mt-4 max-w-[760px] text-[14px] leading-7 text-[#aeb9bf] sm:text-[15px]"
                    >
                      Bangladesh-based technical profile spanning cybersecurity, product engineering, web and app systems, secure infrastructure, search engineering and technical research.
                    </p>
                  </div>
                  <div className="rounded-[18px] border border-cyan-300/[0.14] bg-cyan-300/[0.035] p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="system-label">Brief Status</span>
                      <span className="status-dot" />
                    </div>
                    <p className="mt-3 text-[13px] leading-6 text-[#b8c3c9]">
                      Source-backed public profile. No private S-01 details, invented metrics or unverified certifications are included.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {coreDomains.map((domain) => (
                    <span
                      key={domain}
                      className="rounded-full border border-white/[0.11] bg-white/[0.025] px-3 py-2 font-mono text-[9px] tracking-[0.09em] text-[#c2cbd0] uppercase sm:text-[10px]"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </section>

              <section className="border-b border-white/[0.08] py-8 sm:py-10">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="system-label">Core Skills</p>
                    <h3 className="mt-2 text-[26px] font-semibold tracking-[-0.035em] text-[#eef5f8] sm:text-[32px]">
                      Cross-domain engineering profile
                    </h3>
                  </div>
                  <span className="tiny-mono">Public capability map</span>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {capabilityGroups.map((group) => (
                    <div
                      key={group.label}
                      className="rounded-[18px] border border-white/[0.09] bg-white/[0.02] p-4 sm:p-5"
                    >
                      <p className="font-mono text-[10px] font-semibold tracking-[0.12em] text-cyan-200 uppercase">
                        {group.label}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/[0.10] bg-[#10161d] px-3 py-1.5 text-[11px] leading-5 text-[#bac4c9]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="border-b border-white/[0.08] py-8 sm:py-10">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="system-label">Selected Work</p>
                    <h3 className="mt-2 text-[26px] font-semibold tracking-[-0.035em] text-[#eef5f8] sm:text-[32px]">
                      Public case files
                    </h3>
                  </div>
                  <span className="tiny-mono">4 selected records</span>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {selectedWork.map((project) => (
                    <article
                      key={project.code}
                      className="flex min-w-0 flex-col rounded-[18px] border border-white/[0.09] bg-[#0b1016] p-5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-mono text-[10px] font-semibold tracking-[0.12em] text-cyan-300 uppercase">
                          {project.code}
                        </span>
                        <span className="tiny-mono">Public</span>
                      </div>
                      <h4 className="mt-4 text-[19px] font-semibold tracking-[-0.025em] text-[#edf4f7] sm:text-[21px]">
                        {project.name}
                      </h4>
                      <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.08em] text-[#8e9ca4]">
                        {project.focus}
                      </p>
                      <p className="mt-4 flex-1 text-[13px] leading-6 text-[#abb6bc]">
                        {project.contribution}
                      </p>
                      <Link
                        href={project.href}
                        onClick={closeForNavigation}
                        className="mt-5 inline-flex min-h-[44px] items-center justify-between rounded-[12px] border border-white/[0.10] bg-white/[0.025] px-4 font-mono text-[10px] tracking-[0.1em] text-[#c7d0d5] uppercase transition hover:border-cyan-300/35 hover:bg-cyan-300/[0.05] hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
                      >
                        Inspect case file
                        <span aria-hidden="true">→</span>
                      </Link>
                    </article>
                  ))}
                </div>
              </section>

              <section className="grid gap-3 border-b border-white/[0.08] py-8 sm:py-10 lg:grid-cols-2">
                <div className="rounded-[18px] border border-white/[0.09] bg-white/[0.02] p-5 sm:p-6">
                  <p className="system-label">Security Snapshot</p>
                  <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.03em] text-[#eef5f8] sm:text-[26px]">
                    Security thinking inside the engineering process
                  </h3>
                  <ul className="mt-5 grid gap-3">
                    {securitySnapshot.map((item) => (
                      <li key={item} className="flex gap-3 text-[13px] leading-6 text-[#b2bdc3]">
                        <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#security"
                    onClick={closeForNavigation}
                    className="mt-6 inline-flex min-h-[44px] items-center text-[11px] font-semibold tracking-[0.1em] text-cyan-200 uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
                  >
                    Open security layer →
                  </a>
                </div>

                <div className="rounded-[18px] border border-white/[0.09] bg-white/[0.02] p-5 sm:p-6">
                  <p className="system-label">Infrastructure Snapshot</p>
                  <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.03em] text-[#eef5f8] sm:text-[26px]">
                    Infrastructure treated as part of the security surface
                  </h3>
                  <ul className="mt-5 grid gap-3">
                    {infrastructureSnapshot.map((item) => (
                      <li key={item} className="flex gap-3 text-[13px] leading-6 text-[#b2bdc3]">
                        <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#infrastructure"
                    onClick={closeForNavigation}
                    className="mt-6 inline-flex min-h-[44px] items-center text-[11px] font-semibold tracking-[0.1em] text-cyan-200 uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
                  >
                    Open infrastructure →
                  </a>
                </div>
              </section>

              <section className="pt-8 sm:pt-10">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                  <div>
                    <p className="system-label">Connection</p>
                    <h3 className="mt-2 text-[28px] font-semibold tracking-[-0.035em] text-[#eef5f8] sm:text-[34px]">
                      Continue the technical conversation
                    </h3>
                    <p className="mt-3 max-w-[680px] text-[14px] leading-7 text-[#abb6bc]">
                      Use the full portfolio for deeper evidence, or connect directly through the public contact channels.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row lg:justify-end">
                    <a
                      href="mailto:contact@buildwithsabbir.com"
                      className="primary-btn w-full sm:w-auto"
                    >
                      Email
                    </a>
                    <a
                      href="https://www.linkedin.com/in/md-sabbir-hossain-3a1a36295"
                      target="_blank"
                      rel="noreferrer"
                      className="secondary-btn w-full sm:w-auto"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="#contact"
                      onClick={closeForNavigation}
                      className="secondary-btn w-full sm:w-auto"
                    >
                      Full Contact
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
