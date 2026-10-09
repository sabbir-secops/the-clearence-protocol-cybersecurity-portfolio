"use client";

import {
  type KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

type TerminalLineKind =
  | "system"
  | "command"
  | "output"
  | "success"
  | "warning"
  | "muted";

type TerminalLine = {
  id: number;
  kind: TerminalLineKind;
  text: string;
};

type GlobalTerminalProps = {
  enabled: boolean;
};

type SoundChangeDetail = {
  enabled: boolean;
};

type TerminalOutput = {
  kind: TerminalLineKind;
  text: string;
};

const SECTION_ROUTES: Record<string, string> = {
  home: "hero",
  identity: "hero",
  profile: "identity",
  logic: "principle",
  capabilities: "capabilities",
  capability: "capabilities",
  security: "security",
  projects: "archive",
  archive: "archive",
  infrastructure: "infrastructure",
  search: "search-performance",
  performance: "search-performance",
  research: "research",
  intelligence: "research",
  classified: "classified",
  contact: "contact",
  connection: "contact",
};

const CLEARANCE_ROUTES: Record<string, string> = {
  "01": "hero",
  "1": "hero",
  "02": "identity",
  "2": "identity",
  "03": "capabilities",
  "3": "capabilities",
  "04": "security",
  "4": "security",
  "05": "archive",
  "5": "archive",
  "06": "infrastructure",
  "6": "infrastructure",
  "07": "search-performance",
  "7": "search-performance",
  "08": "research",
  "8": "research",
  "09": "classified",
  "9": "classified",
  "10": "contact",
};

const PROJECT_ROUTES: Record<string, string> = {
  hostsecual: "hostsecual",
  aged: "aged",
  leemeo: "leemeo",
  softparallax: "softparallax",
  "security-labs": "security-labs",
  "security labs": "security-labs",
};

const COMMANDS = [
  "help",
  "whoami",
  "skills",
  "projects",
  "recruiter",
  "brief",
  "security",
  "infrastructure",
  "research",
  "contact",
  "classified",
  "sound",
  "sound status",
  "sound on",
  "sound off",
  "open identity",
  "open profile",
  "open logic",
  "open capabilities",
  "open security",
  "open archive",
  "open infrastructure",
  "open search",
  "open research",
  "open classified",
  "open contact",
  "open hostsecual",
  "open aged",
  "open leemeo",
  "open softparallax",
  "open security-labs",
  "go 01",
  "go 02",
  "go 03",
  "go 04",
  "go 05",
  "go 06",
  "go 07",
  "go 08",
  "go 09",
  "go 10",
  "sudo access s-01",
  "clear",
  "exit",
];

const INITIAL_LINES: TerminalLine[] = [
  {
    id: 1,
    kind: "system",
    text: "CLEARANCE TERMINAL | PUBLIC SESSION",
  },
  {
    id: 2,
    kind: "muted",
    text: "SECURE INTERFACE READY",
  },
  {
    id: 3,
    kind: "muted",
    text: "TYPE HELP TO VIEW AVAILABLE COMMANDS",
  },
];

const HELP_LINES: TerminalOutput[] = [
  { kind: "system", text: "AVAILABLE COMMANDS" },
  { kind: "output", text: "whoami | inspect operator identity" },
  { kind: "output", text: "skills | inspect capability domains" },
  { kind: "output", text: "projects | inspect public project records" },
  { kind: "output", text: "recruiter | brief | open the 60-second recruiter briefing" },
  { kind: "output", text: "security | inspect security domain" },
  { kind: "output", text: "infrastructure | inspect infrastructure domain" },
  { kind: "output", text: "research | inspect research domain" },
  { kind: "output", text: "contact | inspect connection channel" },
  { kind: "output", text: "open <section|project> | navigate or open a public case file" },
  { kind: "output", text: "go <01-10> | jump to a clearance section" },
  { kind: "output", text: "sound on|off|status | control interface sound" },
  { kind: "output", text: "classified | inspect the public S-01 status" },
  { kind: "output", text: "clear | clear terminal output" },
  { kind: "output", text: "exit | close terminal" },
];

export default function GlobalTerminal({ enabled }: GlobalTerminalProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const outputRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const restoreFocusRef = useRef(true);
  const lineIdRef = useRef(10);
  const commandHistoryRef = useRef<string[]>([]);
  const historyIndexRef = useRef(-1);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_LINES);
  const soundEnabledRef = useRef<boolean | null>(null);

  const normalizedInput = useMemo(
    () => input.trim().toLowerCase().replace(/\s+/g, " "),
    [input]
  );

  const createLine = useCallback(
    (kind: TerminalLineKind, text: string): TerminalLine => {
      const id = lineIdRef.current;
      lineIdRef.current += 1;
      return { id, kind, text };
    },
    []
  );

  const appendLines = useCallback(
    (newLines: TerminalOutput[]) => {
      setLines((current) => [
        ...current,
        ...newLines.map((line) => createLine(line.kind, line.text)),
      ]);
    },
    [createLine]
  );

  const dispatchSound = useCallback((eventName: string) => {
    window.dispatchEvent(new CustomEvent(eventName));
  }, []);

  const announce = useCallback((message: string) => {
    window.dispatchEvent(
      new CustomEvent("system:a11y-announce", {
        detail: { message },
      })
    );
  }, []);

  const focusInput = useCallback(() => {
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  const openTerminal = useCallback(() => {
    if (!enabled) {
      return;
    }

    if (open) {
      focusInput();
      return;
    }

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    restoreFocusRef.current = true;
    setOpen(true);
    dispatchSound("system:terminal-open");
    window.dispatchEvent(new CustomEvent("system:sound-query"));
    announce("Clearance Terminal opened");
  }, [announce, dispatchSound, enabled, focusInput, open]);

  const closeTerminal = useCallback(() => {
    setOpen(false);
    setInput("");
    historyIndexRef.current = -1;
    announce("Clearance Terminal closed");
  }, [announce]);

  const toggleTerminal = useCallback(() => {
    if (!enabled) {
      return;
    }

    if (open) {
      closeTerminal();
    } else {
      openTerminal();
    }
  }, [closeTerminal, enabled, open, openTerminal]);

  const scrollToSection = useCallback(
    (sectionId: string, label: string) => {
      appendLines([
        { kind: "success", text: `ROUTE VERIFIED | ${label.toUpperCase()}` },
        { kind: "muted", text: "TRANSFERRING SESSION" },
      ]);
      dispatchSound("system:terminal-success");

      window.setTimeout(() => {
        restoreFocusRef.current = false;
        closeTerminal();

        window.setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (!element) {
            return;
          }

          const offset = element.getBoundingClientRect().top + window.scrollY - 72;
          window.scrollTo({
            top: Math.max(offset, 0),
            behavior:
              document.documentElement.dataset.reducedMotion === "true"
                ? "auto"
                : "smooth",
          });
        }, 80);
      }, 280);
    },
    [appendLines, closeTerminal, dispatchSound]
  );

  const routeToSection = useCallback(
    (target: string) => {
      const sectionId = SECTION_ROUTES[target];
      if (!sectionId) {
        return false;
      }

      scrollToSection(sectionId, target);
      return true;
    },
    [scrollToSection]
  );

  const openProject = useCallback(
    (target: string) => {
      const slug = PROJECT_ROUTES[target];
      if (!slug) {
        return false;
      }

      appendLines([
        { kind: "success", text: `PUBLIC CASE FILE FOUND | ${slug.toUpperCase()}` },
        { kind: "muted", text: "OPENING ARCHIVE RECORD" },
      ]);
      dispatchSound("system:terminal-success");

      window.setTimeout(() => {
        restoreFocusRef.current = false;
        closeTerminal();
        router.push(`/archive/${slug}`);
      }, 280);

      return true;
    },
    [appendLines, closeTerminal, dispatchSound, router]
  );

  const routeByClearance = useCallback(
    (clearance: string) => {
      const sectionId = CLEARANCE_ROUTES[clearance];
      if (!sectionId) {
        appendLines([
          { kind: "warning", text: `CLEARANCE ROUTE NOT FOUND | ${clearance.toUpperCase()}` },
          { kind: "muted", text: "USE GO 01 THROUGH GO 10" },
        ]);
        dispatchSound("system:terminal-denied");
        return;
      }

      scrollToSection(sectionId, `CLEARANCE ${clearance.padStart(2, "0")}`);
    },
    [appendLines, dispatchSound, scrollToSection]
  );

  const setSound = useCallback(
    (nextEnabled: boolean) => {
      if (soundEnabledRef.current === nextEnabled) {
        appendLines([
          {
            kind: "muted",
            text: `INTERFACE SOUND ALREADY ${nextEnabled ? "ON" : "OFF"}`,
          },
        ]);
        return;
      }

      soundEnabledRef.current = nextEnabled;
      window.dispatchEvent(new CustomEvent("system:sound-toggle"));
      appendLines([
        {
          kind: "success",
          text: `INTERFACE SOUND | ${nextEnabled ? "ON" : "OFF"}`,
        },
      ]);
    },
    [appendLines]
  );

  const executeCommand = useCallback(
    (rawCommand: string) => {
      const command = rawCommand.trim().toLowerCase().replace(/\s+/g, " ");
      if (!command) {
        return;
      }

      commandHistoryRef.current = [
        ...commandHistoryRef.current,
        rawCommand.trim(),
      ].slice(-40);
      historyIndexRef.current = -1;

      appendLines([
        { kind: "command", text: `visitor@clearance:~$ ${rawCommand.trim()}` },
      ]);

      if (command === "clear") {
        setLines([]);
        return;
      }

      if (command === "exit") {
        appendLines([{ kind: "muted", text: "TERMINAL SESSION CLOSED" }]);
        window.setTimeout(closeTerminal, 180);
        return;
      }

      if (command === "help") {
        appendLines(HELP_LINES);
        return;
      }

      if (command === "whoami") {
        appendLines([
          { kind: "success", text: "IDENTITY VERIFIED" },
          { kind: "output", text: "CYBERSECURITY PRODUCT ENGINEER" },
          {
            kind: "output",
            text: "SECURE SYSTEMS | WEB AND APP ENGINEERING | INFRASTRUCTURE | TECHNICAL SEO",
          },
          {
            kind: "muted",
            text: "I ENGINEER SECURE DIGITAL PRODUCTS, RESILIENT INFRASTRUCTURE AND INTELLIGENT WEB SYSTEMS.",
          },
        ]);
        return;
      }

      if (command === "skills") {
        appendLines([
          { kind: "system", text: "CAPABILITY NETWORK | 06 DOMAINS" },
          { kind: "output", text: "01 | APPLICATION SECURITY AND VAPT" },
          { kind: "output", text: "02 | SECURE INFRASTRUCTURE AND HOSTING" },
          { kind: "output", text: "03 | PRODUCT AND SYSTEM ENGINEERING" },
          { kind: "output", text: "04 | WEB AND APPLICATION DEVELOPMENT" },
          {
            kind: "output",
            text: "05 | SEARCH, PERFORMANCE AND TECHNICAL SEO",
          },
          {
            kind: "output",
            text: "06 | AI ASSISTED ENGINEERING AND RESEARCH",
          },
          { kind: "muted", text: "USE OPEN CAPABILITIES TO INSPECT THE FULL MAP" },
        ]);
        return;
      }

      if (command === "projects") {
        appendLines([
          { kind: "system", text: "PROJECT ARCHIVE | 05 PUBLIC RECORDS | 01 RESTRICTED" },
          { kind: "output", text: "H-01 | HOSTSECUAL | OPEN HOSTSECUAL" },
          { kind: "output", text: "A-02 | AGED APPLICATION SYSTEM | OPEN AGED" },
          { kind: "output", text: "L-03 | LEEMEO | OPEN LEEMEO" },
          { kind: "output", text: "SP-04 | SOFTPARALLAX | OPEN SOFTPARALLAX" },
          { kind: "output", text: "R-05 | SECURITY LABS | OPEN SECURITY-LABS" },
          { kind: "warning", text: "S-01 | CLASSIFIED | PUBLIC CLEARANCE ONLY" },
        ]);
        return;
      }

      if (command === "recruiter" || command === "brief") {
        appendLines([
          { kind: "success", text: "RECRUITER FAST PATH | READY" },
          { kind: "muted", text: "OPENING 60-SECOND PUBLIC BRIEFING" },
        ]);
        dispatchSound("system:terminal-success");
        window.setTimeout(() => {
          restoreFocusRef.current = false;
          closeTerminal();
          window.requestAnimationFrame(() => {
            window.dispatchEvent(new CustomEvent("system:recruiter-open"));
          });
        }, 180);
        return;
      }

      if (command === "security") {
        appendLines([
          { kind: "system", text: "SECURITY DOMAIN | ACTIVE" },
          { kind: "output", text: "APPLICATION SECURITY | WEB AND API SECURITY" },
          { kind: "output", text: "VAPT | VULNERABILITY ANALYSIS | ACCESS CONTROL" },
          { kind: "output", text: "NETWORK AND INFRASTRUCTURE SECURITY" },
          { kind: "muted", text: "OWASP | BURP SUITE | SECURITY RESEARCH" },
          { kind: "muted", text: "USE OPEN SECURITY OR OPEN SECURITY-LABS" },
        ]);
        return;
      }

      if (command === "infrastructure") {
        appendLines([
          { kind: "system", text: "INFRASTRUCTURE ROUTE | 08 LAYERS" },
          {
            kind: "output",
            text: "CLIENT | DNS | EDGE | DEFENSE | SERVER | DEPLOYMENT | APPLICATION | DATA",
          },
          {
            kind: "muted",
            text: "LINUX | DNS | CLOUDFLARE | SSL TLS | APACHE | NGINX | LITESPEED | DOCKER",
          },
          { kind: "muted", text: "USE OPEN INFRASTRUCTURE OR OPEN HOSTSECUAL" },
        ]);
        return;
      }

      if (command === "research") {
        appendLines([
          { kind: "system", text: "RESEARCH AND INTELLIGENCE | ONLINE" },
          {
            kind: "output",
            text: "SECURITY RESEARCH | TECHNICAL RESEARCH | AI ASSISTED ENGINEERING",
          },
          {
            kind: "output",
            text: "LLM CONCEPTS | RAG CONCEPTS | AUTOMATION | DATA VISUALIZATION",
          },
          { kind: "muted", text: "USE OPEN RESEARCH TO INSPECT THE PUBLIC LAYER" },
        ]);
        return;
      }

      if (command === "contact") {
        appendLines([
          { kind: "success", text: "CONNECTION CHANNEL AVAILABLE" },
          { kind: "output", text: "HAVE A SYSTEM TO BUILD, SECURE OR IMPROVE?" },
          { kind: "output", text: "USE OPEN CONTACT TO ESTABLISH CONNECTION." },
        ]);
        return;
      }

      if (command === "classified") {
        appendLines([
          { kind: "warning", text: "CLASSIFIED" },
          { kind: "warning", text: "S-01 | ACTIVE DEVELOPMENT" },
          { kind: "warning", text: "PUBLIC CLEARANCE INSUFFICIENT" },
          { kind: "muted", text: "REVEAL STATUS | PENDING" },
        ]);
        return;
      }

      if (command === "sudo access s-01") {
        appendLines([
          { kind: "warning", text: "NICE TRY." },
          { kind: "warning", text: "PUBLIC CLEARANCE INSUFFICIENT." },
          {
            kind: "muted",
            text: "ACCESS REQUEST DENIED | NO PRIVILEGE ELEVATION GRANTED",
          },
        ]);
        dispatchSound("system:terminal-denied");
        return;
      }

      if (command === "sound" || command === "sound status") {
        window.dispatchEvent(new CustomEvent("system:sound-query"));
        appendLines([
          {
            kind: "system",
            text: `INTERFACE SOUND | ${
              soundEnabledRef.current === null
                ? "QUERYING"
                : soundEnabledRef.current
                  ? "ON"
                  : "OFF"
            }`,
          },
          { kind: "muted", text: "USE SOUND ON OR SOUND OFF" },
        ]);
        return;
      }

      if (command === "sound on") {
        setSound(true);
        return;
      }

      if (command === "sound off") {
        setSound(false);
        return;
      }

      if (command.startsWith("go ")) {
        routeByClearance(command.slice(3).trim());
        return;
      }

      if (command.startsWith("open ")) {
        const target = command.slice(5).trim();

        if (target === "s-01" || target === "s01") {
          appendLines([
            { kind: "warning", text: "S-01 DIRECT CASE ACCESS | RESTRICTED" },
            { kind: "muted", text: "USE OPEN CLASSIFIED FOR THE PUBLIC STATUS LAYER" },
          ]);
          dispatchSound("system:terminal-denied");
          return;
        }

        if (openProject(target) || routeToSection(target)) {
          return;
        }

        appendLines([
          { kind: "warning", text: `ROUTE NOT FOUND | ${target.toUpperCase()}` },
          { kind: "muted", text: "TYPE HELP OR PROJECTS TO VIEW PUBLIC TARGETS" },
        ]);
        dispatchSound("system:terminal-denied");
        return;
      }

      appendLines([
        { kind: "warning", text: "COMMAND NOT RECOGNIZED" },
        { kind: "muted", text: "TYPE HELP TO VIEW AVAILABLE COMMANDS" },
      ]);
      dispatchSound("system:terminal-denied");
    },
    [
      appendLines,
      closeTerminal,
      dispatchSound,
      openProject,
      routeByClearance,
      routeToSection,
      setSound,
    ]
  );

  const handleSubmit = useCallback(() => {
    if (!normalizedInput) {
      return;
    }

    const command = input;
    setInput("");
    executeCommand(command);
  }, [executeCommand, input, normalizedInput]);

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (
      event.key.length === 1 &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey
    ) {
      dispatchSound("system:terminal-key");
    }

    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const history = commandHistoryRef.current;
      if (history.length === 0) {
        return;
      }

      historyIndexRef.current =
        historyIndexRef.current < 0
          ? history.length - 1
          : Math.max(historyIndexRef.current - 1, 0);
      setInput(history[historyIndexRef.current] ?? "");
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const history = commandHistoryRef.current;
      if (history.length === 0 || historyIndexRef.current < 0) {
        return;
      }

      if (historyIndexRef.current >= history.length - 1) {
        historyIndexRef.current = -1;
        setInput("");
        return;
      }

      historyIndexRef.current += 1;
      setInput(history[historyIndexRef.current] ?? "");
      return;
    }

    if (event.key === "Tab" && !event.shiftKey) {
      const value = input.trim().toLowerCase();
      if (!value) {
        return;
      }

      const matches = COMMANDS.filter((command) => command.startsWith(value));
      if (matches.length === 1) {
        event.preventDefault();
        setInput(matches[0]);
      }
    }
  };

  useEffect(() => {
    const handleToggle = () => toggleTerminal();
    const handleOpen = () => openTerminal();
    const handleClose = () => closeTerminal();

    window.addEventListener("system:terminal-toggle", handleToggle);
    window.addEventListener("system:terminal-open-request", handleOpen);
    window.addEventListener("system:terminal-close", handleClose);

    return () => {
      window.removeEventListener("system:terminal-toggle", handleToggle);
      window.removeEventListener("system:terminal-open-request", handleOpen);
      window.removeEventListener("system:terminal-close", handleClose);
    };
  }, [closeTerminal, openTerminal, toggleTerminal]);

  useEffect(() => {
    const handleSoundChange = (event: Event) => {
      const customEvent = event as CustomEvent<SoundChangeDetail>;
      if (typeof customEvent.detail?.enabled !== "boolean") {
        return;
      }
      soundEnabledRef.current = customEvent.detail.enabled;
    };

    window.addEventListener("system:sound-change", handleSoundChange);
    window.dispatchEvent(new CustomEvent("system:sound-query"));

    return () => {
      window.removeEventListener("system:sound-change", handleSoundChange);
    };
  }, []);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const modifier = event.ctrlKey || event.metaKey;
      if (modifier && event.key.toLowerCase() === "k") {
        event.preventDefault();
        toggleTerminal();
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [toggleTerminal]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    const focusableSelector = [
      "button:not([disabled])",
      "a[href]",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
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
      inputRef.current?.focus();
    });

    const restoreFocus = () => {
      if (!restoreFocusRef.current) {
        return;
      }

      const previous = previousFocusRef.current;
      if (previous && previous.isConnected) {
        const style = window.getComputedStyle(previous);
        const rect = previous.getBoundingClientRect();
        const visible =
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          rect.width > 0 &&
          rect.height > 0;

        if (visible) {
          previous.focus();
          return;
        }
      }

      const candidates = Array.from(
        document.querySelectorAll<HTMLElement>(
          '[aria-controls="system-terminal"], [aria-controls="system-index"], #main-content'
        )
      );
      const fallback = candidates.find((element) => {
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          rect.width > 0 &&
          rect.height > 0
        );
      });
      fallback?.focus();
    };

    const handleDialogKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeTerminal();
        return;
      }

      if (event.key !== "Tab" || event.defaultPrevented) {
        return;
      }

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

    window.addEventListener("keydown", handleDialogKeydown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleDialogKeydown);
      window.requestAnimationFrame(restoreFocus);
    };
  }, [closeTerminal, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const output = outputRef.current;
      if (output) {
        output.scrollTop = output.scrollHeight;
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [lines, open]);

  if (!enabled) {
    return null;
  }

  return (
    <div
      id="system-terminal"
      className={`
        fixed inset-0 z-[95] transition duration-300
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
        tabIndex={-1}
        aria-hidden="true"
        onClick={closeTerminal}
        className="absolute inset-0 h-full w-full bg-[#020405]/80 backdrop-blur-md"
      />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className="absolute inset-x-3 top-1/2 mx-auto flex max-h-[84dvh] max-w-[980px] -translate-y-1/2 flex-col overflow-hidden rounded-[18px] border border-cyan-300/[0.18] bg-[#070a0d]/98 shadow-[0_28px_100px_rgba(0,0,0,0.72),0_0_80px_rgba(72,215,255,0.05)] transition duration-300 sm:inset-x-5 sm:max-h-[78dvh] lg:max-h-[74dvh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="terminal-title"
        aria-describedby="terminal-session-description"
      >
        <div className="flex min-h-[58px] shrink-0 items-center justify-between gap-4 border-b border-white/[0.08] px-4 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(72,215,255,0.8)]" />
            <div className="min-w-0">
              <p
                id="terminal-title"
                className="truncate font-mono text-[10px] font-medium tracking-[0.15em] text-cyan-100 uppercase sm:text-[11px]"
              >
                Clearance Terminal
              </p>
              <p
                id="terminal-session-description"
                className="mt-1 hidden font-mono text-[9px] tracking-[0.11em] text-white/45 uppercase sm:block"
              >
                Public Session | Secure Interface
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden font-mono text-[9px] tracking-[0.11em] text-white/40 uppercase sm:block">
              Ctrl+K
            </span>
            <button
              type="button"
              onClick={closeTerminal}
              className="flex h-8 min-w-8 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.025] px-2 font-mono text-[10px] text-white/65 transition hover:border-cyan-300/30 hover:text-cyan-100"
              aria-label="Close terminal"
            >
              ESC
            </button>
          </div>
        </div>

        <div
          ref={outputRef}
          role="log"
          aria-live="polite"
          aria-relevant="additions text"
          aria-label="Terminal output"
          className="min-h-[260px] flex-1 overflow-y-auto px-4 py-5 font-mono text-[12px] leading-[1.8] sm:min-h-[340px] sm:px-6 sm:py-6 sm:text-[13px]"
          onClick={focusInput}
        >
          {lines.length === 0 ? (
            <p className="text-white/40">TERMINAL CLEARED</p>
          ) : (
            lines.map((line) => (
              <p
                key={line.id}
                className={`
                  min-h-[22px] break-words
                  ${line.kind === "system" ? "text-cyan-200" : ""}
                  ${line.kind === "command" ? "mt-3 text-white/90" : ""}
                  ${line.kind === "output" ? "text-[#bec8ce]" : ""}
                  ${line.kind === "success" ? "text-cyan-300" : ""}
                  ${line.kind === "warning" ? "text-amber-300" : ""}
                  ${line.kind === "muted" ? "text-white/42" : ""}
                `}
              >
                {line.text}
              </p>
            ))
          )}
        </div>

        <div className="shrink-0 border-t border-white/[0.08] bg-white/[0.015] px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="shrink-0 font-mono text-[11px] text-cyan-300 sm:text-[12px]">
              &gt;
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleInputKeyDown}
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              aria-label="Terminal command"
              placeholder="type a command"
              className="min-w-0 flex-1 bg-transparent font-mono text-[12px] text-[#edf7fa] caret-cyan-300 outline-none placeholder:text-white/25 sm:text-[13px]"
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="shrink-0 rounded-full border border-cyan-300/20 bg-cyan-300/[0.04] px-3 py-2 font-mono text-[9px] tracking-[0.12em] text-cyan-100 uppercase transition hover:border-cyan-300/35 hover:bg-cyan-300/[0.07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
            >
              Execute
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[9px] tracking-[0.08em] text-white/32 uppercase">
            <span>Tab | Complete</span>
            <span>↑ ↓ | History</span>
            <span>Esc | Close</span>
            <span>Help | Index</span>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-cyan-300/40 shadow-[0_0_18px_rgba(72,215,255,0.45)]" />
      </div>
    </div>
  );
}
