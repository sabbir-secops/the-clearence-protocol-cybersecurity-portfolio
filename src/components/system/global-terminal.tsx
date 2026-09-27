"use client";

import {
  type KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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

const COMMANDS = [
  "help",
  "whoami",
  "skills",
  "projects",
  "security",
  "infrastructure",
  "research",
  "contact",
  "classified",
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
  "sudo access s-01",
  "clear",
  "exit",
];

const ROUTES: Record<
  string,
  string
> = {
  home: "hero",
  identity: "hero",
  profile: "identity",
  logic: "principle",
  capabilities: "capabilities",
  capability: "capabilities",
  security: "security",
  projects: "archive",
  archive: "archive",
  infrastructure:
    "infrastructure",
  search:
    "search-performance",
  performance:
    "search-performance",
  research: "research",
  intelligence: "research",
  classified: "classified",
  contact: "contact",
  connection: "contact",
};

const INITIAL_LINES: TerminalLine[] =
  [
    {
      id: 1,
      kind: "system",
      text:
        "CLEARANCE TERMINAL | PUBLIC SESSION",
    },
    {
      id: 2,
      kind: "muted",
      text:
        "SECURE INTERFACE READY",
    },
    {
      id: 3,
      kind: "muted",
      text:
        "TYPE HELP TO VIEW AVAILABLE COMMANDS",
    },
  ];

export default function GlobalTerminal({
  enabled,
}: GlobalTerminalProps) {
  const inputRef =
    useRef<HTMLInputElement | null>(
      null
    );

  const outputRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const dialogRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const previousFocusRef =
    useRef<HTMLElement | null>(
      null
    );

  const restoreFocusRef =
    useRef(true);

  const lineIdRef =
    useRef(10);

  const commandHistoryRef =
    useRef<string[]>(
      []
    );

  const historyIndexRef =
    useRef(-1);

  const [open, setOpen] =
    useState(false);

  const [input, setInput] =
    useState("");

  const [lines, setLines] =
    useState<TerminalLine[]>(
      INITIAL_LINES
    );

  const normalizedInput =
    useMemo(
      () =>
        input
          .trim()
          .toLowerCase()
          .replace(
            /\s+/g,
            " "
          ),
      [
        input,
      ]
    );

  const createLine =
    useCallback(
      (
        kind:
          TerminalLineKind,
        text: string
      ): TerminalLine => {
        const id =
          lineIdRef.current;

        lineIdRef.current +=
          1;

        return {
          id,
          kind,
          text,
        };
      },
      []
    );

  const appendLines =
    useCallback(
      (
        newLines:
          Array<{
            kind:
              TerminalLineKind;
            text: string;
          }>
      ) => {
        setLines(
          (
            current
          ) => [
            ...current,
            ...newLines.map(
              (
                line
              ) =>
                createLine(
                  line.kind,
                  line.text
                )
            ),
          ]
        );
      },
      [
        createLine,
      ]
    );

  const dispatchSound =
    useCallback(
      (
        eventName:
          string
      ) => {
        window.dispatchEvent(
          new CustomEvent(
            eventName
          )
        );
      },
      []
    );

  const focusInput =
    useCallback(() => {
      window.requestAnimationFrame(
        () => {
          inputRef.current?.focus();
        }
      );
    }, []);

  const openTerminal =
    useCallback(() => {
      if (
        !enabled
      ) {
        return;
      }

      if (
        open
      ) {
        focusInput();

        return;
      }

      previousFocusRef.current =
        document.activeElement instanceof
        HTMLElement
          ? document.activeElement
          : null;

      restoreFocusRef.current =
        true;

      setOpen(
        true
      );

      dispatchSound(
        "system:terminal-open"
      );

      window.dispatchEvent(
        new CustomEvent(
          "system:a11y-announce",
          {
            detail: {
              message:
                "Clearance Terminal opened",
            },
          }
        )
      );
    }, [
      dispatchSound,
      enabled,
      focusInput,
      open,
    ]);

  const closeTerminal =
    useCallback(() => {
      setOpen(
        false
      );

      setInput(
        ""
      );

      historyIndexRef.current =
        -1;

      window.dispatchEvent(
        new CustomEvent(
          "system:a11y-announce",
          {
            detail: {
              message:
                "Clearance Terminal closed",
            },
          }
        )
      );
    }, []);

  const toggleTerminal =
    useCallback(() => {
      if (
        !enabled
      ) {
        return;
      }

      if (
        open
      ) {
        closeTerminal();
      } else {
        openTerminal();
      }
    }, [
      closeTerminal,
      enabled,
      open,
      openTerminal,
    ]);

  const routeToSection =
    useCallback(
      (
        target:
          string
      ) => {
        const route =
          ROUTES[
            target
          ];

        if (
          !route
        ) {
          appendLines([
            {
              kind:
                "warning",
              text:
                `ROUTE NOT FOUND | ${target.toUpperCase()}`,
            },
          ]);

          dispatchSound(
            "system:terminal-denied"
          );

          return;
        }

        appendLines([
          {
            kind:
              "success",
            text:
              `ROUTE VERIFIED | ${target.toUpperCase()}`,
          },
          {
            kind:
              "muted",
            text:
              "TRANSFERRING SESSION",
          },
        ]);

        dispatchSound(
          "system:terminal-success"
        );

        window.setTimeout(
          () => {
            restoreFocusRef.current =
              false;

            closeTerminal();

            window.setTimeout(
              () => {
                const element =
                  document.getElementById(
                    route
                  );

                if (
                  !element
                ) {
                  return;
                }

                const offset =
                  element.getBoundingClientRect()
                    .top +
                  window.scrollY -
                  72;

                window.scrollTo(
                  {
                    top:
                      Math.max(
                        offset,
                        0
                      ),
                    behavior:
                      document.documentElement
                        .dataset
                        .reducedMotion ===
                      "true"
                        ? "auto"
                        : "smooth",
                  }
                );
              },
              80
            );
          },
          320
        );
      },
      [
        appendLines,
        closeTerminal,
        dispatchSound,
      ]
    );

  const executeCommand =
    useCallback(
      (
        rawCommand:
          string
      ) => {
        const command =
          rawCommand
            .trim()
            .toLowerCase()
            .replace(
              /\s+/g,
              " "
            );

        if (
          !command
        ) {
          return;
        }

        commandHistoryRef.current =
          [
            ...commandHistoryRef.current,
            rawCommand.trim(),
          ].slice(
            -40
          );

        historyIndexRef.current =
          -1;

        appendLines([
          {
            kind:
              "command",
            text:
              `visitor@clearance:~$ ${rawCommand.trim()}`,
          },
        ]);

        if (
          command ===
          "clear"
        ) {
          setLines(
            []
          );

          return;
        }

        if (
          command ===
          "exit"
        ) {
          appendLines([
            {
              kind:
                "muted",
              text:
                "TERMINAL SESSION CLOSED",
            },
          ]);

          window.setTimeout(
            closeTerminal,
            180
          );

          return;
        }

        if (
          command ===
          "help"
        ) {
          appendLines([
            {
              kind:
                "system",
              text:
                "AVAILABLE COMMANDS",
            },
            {
              kind:
                "output",
              text:
                "help | show command index",
            },
            {
              kind:
                "output",
              text:
                "whoami | inspect operator identity",
            },
            {
              kind:
                "output",
              text:
                "skills | inspect capability domains",
            },
            {
              kind:
                "output",
              text:
                "projects | inspect selected systems",
            },
            {
              kind:
                "output",
              text:
                "security | inspect security domain",
            },
            {
              kind:
                "output",
              text:
                "infrastructure | inspect infrastructure domain",
            },
            {
              kind:
                "output",
              text:
                "research | inspect research domain",
            },
            {
              kind:
                "output",
              text:
                "contact | inspect connection channel",
            },
            {
              kind:
                "output",
              text:
                "classified | inspect restricted record",
            },
            {
              kind:
                "output",
              text:
                "open <route> | navigate system",
            },
            {
              kind:
                "output",
              text:
                "clear | clear terminal",
            },
            {
              kind:
                "output",
              text:
                "exit | close terminal",
            },
          ]);

          return;
        }

        if (
          command ===
          "whoami"
        ) {
          appendLines([
            {
              kind:
                "success",
              text:
                "IDENTITY VERIFIED",
            },
            {
              kind:
                "output",
              text:
                "CYBERSECURITY PRODUCT ENGINEER",
            },
            {
              kind:
                "output",
              text:
                "SECURE SYSTEMS | WEB AND APP ENGINEERING | INFRASTRUCTURE | TECHNICAL SEO",
            },
            {
              kind:
                "muted",
              text:
                "I ENGINEER SECURE DIGITAL PRODUCTS, RESILIENT INFRASTRUCTURE AND INTELLIGENT WEB SYSTEMS.",
            },
          ]);

          return;
        }

        if (
          command ===
          "skills"
        ) {
          appendLines([
            {
              kind:
                "system",
              text:
                "CAPABILITY NETWORK | 06 DOMAINS",
            },
            {
              kind:
                "output",
              text:
                "01 | APPLICATION SECURITY AND VAPT",
            },
            {
              kind:
                "output",
              text:
                "02 | SECURE INFRASTRUCTURE AND HOSTING",
            },
            {
              kind:
                "output",
              text:
                "03 | PRODUCT AND SYSTEM ENGINEERING",
            },
            {
              kind:
                "output",
              text:
                "04 | WEB AND APPLICATION DEVELOPMENT",
            },
            {
              kind:
                "output",
              text:
                "05 | SEARCH, PERFORMANCE AND TECHNICAL SEO",
            },
            {
              kind:
                "output",
              text:
                "06 | AI ASSISTED ENGINEERING AND RESEARCH",
            },
          ]);

          return;
        }

        if (
          command ===
          "projects"
        ) {
          appendLines([
            {
              kind:
                "system",
              text:
                "PROJECT ARCHIVE | 06 RECORDS",
            },
            {
              kind:
                "output",
              text:
                "HOSTSECUAL | CYBERSECURITY FIRST HOSTING AND INFRASTRUCTURE",
            },
            {
              kind:
                "output",
              text:
                "AGED | MULTI ROLE AND MULTI TENANT APPLICATION SYSTEM",
            },
            {
              kind:
                "output",
              text:
                "LEEMEO | TECHNOLOGY, PRODUCT AND BUSINESS ECOSYSTEM",
            },
            {
              kind:
                "output",
              text:
                "SOFTPARALLAX | WEB, SEO AND DIGITAL GROWTH",
            },
            {
              kind:
                "output",
              text:
                "SECURITY LABS | SECURITY RESEARCH AND EXPERIMENTATION",
            },
            {
              kind:
                "warning",
              text:
                "S-01 | CLASSIFIED | ACTIVE DEVELOPMENT",
            },
          ]);

          return;
        }

        if (
          command ===
          "security"
        ) {
          appendLines([
            {
              kind:
                "system",
              text:
                "SECURITY DOMAIN | ACTIVE",
            },
            {
              kind:
                "output",
              text:
                "APPLICATION SECURITY",
            },
            {
              kind:
                "output",
              text:
                "VULNERABILITY ANALYSIS",
            },
            {
              kind:
                "output",
              text:
                "MOBILE SECURITY",
            },
            {
              kind:
                "output",
              text:
                "INFRASTRUCTURE SECURITY",
            },
            {
              kind:
                "output",
              text:
                "NETWORK SECURITY",
            },
            {
              kind:
                "output",
              text:
                "THREAT INTELLIGENCE",
            },
            {
              kind:
                "muted",
              text:
                "APPSEC | OWASP | API SECURITY | ACCESS CONTROL | VAPT",
            },
          ]);

          return;
        }

        if (
          command ===
          "infrastructure"
        ) {
          appendLines([
            {
              kind:
                "system",
              text:
                "INFRASTRUCTURE ROUTE | 08 LAYERS",
            },
            {
              kind:
                "output",
              text:
                "CLIENT | DNS | EDGE | DEFENSE | SERVER | DEPLOYMENT | APPLICATION | DATA",
            },
            {
              kind:
                "muted",
              text:
                "LINUX | DNS | CLOUDFLARE | SSL TLS | APACHE | NGINX | LITESPEED | DOCKER",
            },
          ]);

          return;
        }

        if (
          command ===
          "research"
        ) {
          appendLines([
            {
              kind:
                "system",
              text:
                "RESEARCH AND INTELLIGENCE | ONLINE",
            },
            {
              kind:
                "output",
              text:
                "THREAT INTELLIGENCE | SECURITY RESEARCH | TECHNICAL RESEARCH",
            },
            {
              kind:
                "output",
              text:
                "AI ASSISTED ENGINEERING | RAG AND LLM CONCEPTS | AUTOMATION",
            },
            {
              kind:
                "output",
              text:
                "DATA VISUALIZATION | INTERACTIVE SYSTEM EXPERIMENTS",
            },
          ]);

          return;
        }

        if (
          command ===
          "contact"
        ) {
          appendLines([
            {
              kind:
                "success",
              text:
                "CONNECTION CHANNEL AVAILABLE",
            },
            {
              kind:
                "output",
              text:
                "HAVE A SYSTEM TO BUILD, SECURE OR IMPROVE?",
            },
            {
              kind:
                "output",
              text:
                "USE OPEN CONTACT TO ESTABLISH CONNECTION.",
            },
          ]);

          return;
        }

        if (
          command ===
          "classified"
        ) {
          appendLines([
            {
              kind:
                "warning",
              text:
                "CLASSIFIED",
            },
            {
              kind:
                "warning",
              text:
                "S-01 | ACTIVE DEVELOPMENT",
            },
            {
              kind:
                "warning",
              text:
                "PUBLIC CLEARANCE INSUFFICIENT",
            },
            {
              kind:
                "muted",
              text:
                "INTELLIGENCE | LEARN | DEFEND | SIMULATE | CONNECT",
            },
            {
              kind:
                "muted",
              text:
                "REVEAL STATUS | PENDING",
            },
          ]);

          return;
        }

        if (
          command ===
          "sudo access s-01"
        ) {
          appendLines([
            {
              kind:
                "warning",
              text:
                "NICE TRY.",
            },
            {
              kind:
                "warning",
              text:
                "PUBLIC CLEARANCE INSUFFICIENT.",
            },
            {
              kind:
                "muted",
              text:
                "ACCESS REQUEST LOGGED | NO PRIVILEGE ELEVATION GRANTED",
            },
          ]);

          dispatchSound(
            "system:terminal-denied"
          );

          return;
        }

        if (
          command.startsWith(
            "open "
          )
        ) {
          const target =
            command
              .slice(
                5
              )
              .trim();

          routeToSection(
            target
          );

          return;
        }

        appendLines([
          {
            kind:
              "warning",
            text:
              "COMMAND NOT RECOGNIZED",
          },
          {
            kind:
              "muted",
            text:
              "TYPE HELP TO VIEW AVAILABLE COMMANDS",
          },
        ]);

        dispatchSound(
          "system:terminal-denied"
        );
      },
      [
        appendLines,
        closeTerminal,
        dispatchSound,
        routeToSection,
      ]
    );

  const handleSubmit =
    useCallback(() => {
      if (
        !normalizedInput
      ) {
        return;
      }

      const command =
        input;

      setInput(
        ""
      );

      executeCommand(
        command
      );
    }, [
      executeCommand,
      input,
      normalizedInput,
    ]);

  const handleInputKeyDown =
    (
      event:
        ReactKeyboardEvent<HTMLInputElement>
    ) => {
      if (
        event.key.length ===
          1 &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      ) {
        dispatchSound(
          "system:terminal-key"
        );
      }

      if (
        event.key ===
        "Enter"
      ) {
        event.preventDefault();

        handleSubmit();

        return;
      }

      if (
        event.key ===
        "ArrowUp"
      ) {
        event.preventDefault();

        const history =
          commandHistoryRef.current;

        if (
          history.length ===
          0
        ) {
          return;
        }

        if (
          historyIndexRef.current <
          0
        ) {
          historyIndexRef.current =
            history.length -
            1;
        } else {
          historyIndexRef.current =
            Math.max(
              historyIndexRef.current -
                1,
              0
            );
        }

        setInput(
          history[
            historyIndexRef.current
          ] ??
            ""
        );

        return;
      }

      if (
        event.key ===
        "ArrowDown"
      ) {
        event.preventDefault();

        const history =
          commandHistoryRef.current;

        if (
          history.length ===
          0 ||
          historyIndexRef.current <
            0
        ) {
          return;
        }

        if (
          historyIndexRef.current >=
          history.length -
            1
        ) {
          historyIndexRef.current =
            -1;

          setInput(
            ""
          );

          return;
        }

        historyIndexRef.current +=
          1;

        setInput(
          history[
            historyIndexRef.current
          ] ??
            ""
        );

        return;
      }

      if (
        event.key ===
          "Tab" &&
        !event.shiftKey
      ) {
        const value =
          input
            .trim()
            .toLowerCase();

        if (
          !value
        ) {
          return;
        }

        const matches =
          COMMANDS.filter(
            (
              command
            ) =>
              command.startsWith(
                value
              )
          );

        if (
          matches.length ===
          1
        ) {
          event.preventDefault();

          setInput(
            matches[0]
          );
        }
      }

    };

  useEffect(() => {
    const handleToggle =
      () => {
        toggleTerminal();
      };

    const handleOpen =
      () => {
        openTerminal();
      };

    const handleClose =
      () => {
        closeTerminal();
      };

    window.addEventListener(
      "system:terminal-toggle",
      handleToggle
    );

    window.addEventListener(
      "system:terminal-open-request",
      handleOpen
    );

    window.addEventListener(
      "system:terminal-close",
      handleClose
    );

    return () => {
      window.removeEventListener(
        "system:terminal-toggle",
        handleToggle
      );

      window.removeEventListener(
        "system:terminal-open-request",
        handleOpen
      );

      window.removeEventListener(
        "system:terminal-close",
        handleClose
      );
    };
  }, [
    closeTerminal,
    openTerminal,
    toggleTerminal,
  ]);

  useEffect(() => {
    const handleShortcut =
      (
        event:
          KeyboardEvent
      ) => {
        const modifier =
          event.ctrlKey ||
          event.metaKey;

        if (
          modifier &&
          event.key.toLowerCase() ===
            "k"
        ) {
          event.preventDefault();

          toggleTerminal();
        }
      };

    window.addEventListener(
      "keydown",
      handleShortcut
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleShortcut
      );
    };
  }, [
    toggleTerminal,
  ]);

  useEffect(() => {
    if (
      !open
    ) {
      return;
    }

    const dialog =
      dialogRef.current;

    if (
      !dialog
    ) {
      return;
    }

    const focusableSelector =
      [
        "button:not([disabled])",
        "a[href]",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        "[tabindex]:not([tabindex='-1'])",
      ].join(",");

    const getFocusable =
      () =>
        Array.from(
          dialog.querySelectorAll<HTMLElement>(
            focusableSelector
          )
        ).filter(
          (
            element
          ) => {
            const style =
              window.getComputedStyle(
                element
              );

            const rect =
              element.getBoundingClientRect();

            return (
              style.display !==
                "none" &&
              style.visibility !==
                "hidden" &&
              rect.width >
                0 &&
              rect.height >
                0
            );
          }
        );

    const focusFrame =
      window.requestAnimationFrame(
        () => {
          inputRef.current?.focus();
        }
      );

    const restoreFocus =
      () => {
        if (
          !restoreFocusRef.current
        ) {
          return;
        }

        const previous =
          previousFocusRef.current;

        if (
          previous &&
          previous.isConnected
        ) {
          const style =
            window.getComputedStyle(
              previous
            );

          const rect =
            previous.getBoundingClientRect();

          const visible =
            style.display !==
              "none" &&
            style.visibility !==
              "hidden" &&
            rect.width >
              0 &&
            rect.height >
              0;

          if (
            visible
          ) {
            previous.focus();

            return;
          }
        }

        const candidates =
          Array.from(
            document.querySelectorAll<HTMLElement>(
              '[aria-controls="system-terminal"], [aria-controls="system-index"], #main-content'
            )
          );

        const fallback =
          candidates.find(
            (
              element
            ) => {
              const style =
                window.getComputedStyle(
                  element
                );

              const rect =
                element.getBoundingClientRect();

              return (
                style.display !==
                  "none" &&
                style.visibility !==
                  "hidden" &&
                rect.width >
                  0 &&
                rect.height >
                  0
              );
            }
          );

        fallback?.focus();
      };

    const handleDialogKeydown =
      (
        event:
          KeyboardEvent
      ) => {
        if (
          event.key ===
          "Escape"
        ) {
          event.preventDefault();

          closeTerminal();

          return;
        }

        if (
          event.key !==
            "Tab" ||
          event.defaultPrevented
        ) {
          return;
        }

        const focusable =
          getFocusable();

        if (
          focusable.length ===
          0
        ) {
          event.preventDefault();

          dialog.focus();

          return;
        }

        const first =
          focusable[0];

        const last =
          focusable[
            focusable.length -
              1
          ];

        const active =
          document.activeElement;

        if (
          event.shiftKey &&
          (
            active ===
              first ||
            active ===
              dialog
          )
        ) {
          event.preventDefault();

          last.focus();

          return;
        }

        if (
          !event.shiftKey &&
          active ===
            last
        ) {
          event.preventDefault();

          first.focus();
        }
      };

    window.addEventListener(
      "keydown",
      handleDialogKeydown
    );

    return () => {
      window.cancelAnimationFrame(
        focusFrame
      );

      window.removeEventListener(
        "keydown",
        handleDialogKeydown
      );

      window.requestAnimationFrame(
        restoreFocus
      );
    };
  }, [
    closeTerminal,
    open,
  ]);

  useEffect(() => {
    if (
      !open
    ) {
      return;
    }

    const body =
      document.body;

    const previousOverflow =
      body.style.overflow;

    body.style.overflow =
      "hidden";

    return () => {
      body.style.overflow =
        previousOverflow;
    };
  }, [
    open,
  ]);

  useEffect(() => {
    if (
      !open
    ) {
      return;
    }

    const frame =
      window.requestAnimationFrame(
        () => {
          const output =
            outputRef.current;

          if (
            !output
          ) {
            return;
          }

          output.scrollTop =
            output.scrollHeight;
        }
      );

    return () => {
      window.cancelAnimationFrame(
        frame
      );
    };
  }, [
    lines,
    open,
  ]);

  if (
    !enabled
  ) {
    return null;
  }

  return (
    <div
      id="system-terminal"
      className={`
        fixed
        inset-0
        z-[95]
        transition
        duration-300

        ${
          open
            ? `
              visible
              pointer-events-auto
              opacity-100
            `
            : `
              invisible
              pointer-events-none
              opacity-0
            `
        }
      `}
      aria-hidden={
        !open
      }
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={
          closeTerminal
        }
        className="
          absolute
          inset-0
          h-full
          w-full
          bg-[#020405]/80
          backdrop-blur-md
        "
      />

      <div
        ref={
          dialogRef
        }
        tabIndex={-1}
        className="
          absolute
          inset-x-3
          top-1/2
          mx-auto
          flex
          max-h-[84dvh]
          max-w-[980px]
          -translate-y-1/2
          flex-col
          overflow-hidden
          rounded-[18px]
          border
          border-cyan-300/[0.18]
          bg-[#070a0d]/98
          shadow-[0_28px_100px_rgba(0,0,0,0.72),0_0_80px_rgba(72,215,255,0.05)]
          transition
          duration-300
          sm:inset-x-5
          sm:max-h-[78dvh]
          lg:max-h-[74dvh]
        "
        role="dialog"
        aria-modal="true"
        aria-labelledby="terminal-title"
        aria-describedby="terminal-session-description"
      >
        <div
          className="
            flex
            min-h-[58px]
            shrink-0
            items-center
            justify-between
            gap-4
            border-b
            border-white/[0.08]
            px-4
            sm:px-5
          "
        >
          <div
            className="
              flex
              min-w-0
              items-center
              gap-3
            "
          >
            <span
              className="
                h-2
                w-2
                shrink-0
                rounded-full
                bg-cyan-300
                shadow-[0_0_14px_rgba(72,215,255,0.8)]
              "
            />

            <div
              className="
                min-w-0
              "
            >
              <p
                id="terminal-title"
                className="
                  truncate
                  font-mono
                  text-[10px]
                  font-medium
                  tracking-[0.15em]
                  text-cyan-100
                  uppercase
                  sm:text-[11px]
                "
              >
                Clearance Terminal
              </p>

              <p
                id="terminal-session-description"
                className="
                  mt-1
                  hidden
                  font-mono
                  text-[9px]
                  tracking-[0.11em]
                  text-white/45
                  uppercase
                  sm:block
                "
              >
                Public Session |
                Secure Interface
              </p>
            </div>
          </div>

          <div
            className="
              flex
              shrink-0
              items-center
              gap-3
            "
          >
            <span
              className="
                hidden
                font-mono
                text-[9px]
                tracking-[0.11em]
                text-white/40
                uppercase
                sm:block
              "
            >
              Ctrl+K
            </span>

            <button
              type="button"
              onClick={
                closeTerminal
              }
              className="
                flex
                h-8
                min-w-8
                items-center
                justify-center
                rounded-full
                border
                border-white/[0.10]
                bg-white/[0.025]
                px-2
                font-mono
                text-[10px]
                text-white/65
                transition
                hover:border-cyan-300/30
                hover:text-cyan-100
              "
              aria-label="Close terminal"
            >
              ESC
            </button>
          </div>
        </div>

        <div
          ref={
            outputRef
          }
          role="log"
          aria-live="polite"
          aria-relevant="additions text"
          aria-label="Terminal output"
          className="
            min-h-[260px]
            flex-1
            overflow-y-auto
            px-4
            py-5
            font-mono
            text-[12px]
            leading-[1.8]
            sm:min-h-[340px]
            sm:px-6
            sm:py-6
            sm:text-[13px]
          "
          onClick={
            focusInput
          }
        >
          {
            lines.length ===
            0
              ? (
                  <p
                    className="
                      text-white/40
                    "
                  >
                    TERMINAL CLEARED
                  </p>
                )
              : lines.map(
                  (
                    line
                  ) => (
                    <p
                      key={
                        line.id
                      }
                      className={`
                        min-h-[22px]
                        break-words

                        ${
                          line.kind ===
                          "system"
                            ? "text-cyan-200"
                            : ""
                        }

                        ${
                          line.kind ===
                          "command"
                            ? "mt-3 text-white/90"
                            : ""
                        }

                        ${
                          line.kind ===
                          "output"
                            ? "text-[#bec8ce]"
                            : ""
                        }

                        ${
                          line.kind ===
                          "success"
                            ? "text-cyan-300"
                            : ""
                        }

                        ${
                          line.kind ===
                          "warning"
                            ? "text-amber-300"
                            : ""
                        }

                        ${
                          line.kind ===
                          "muted"
                            ? "text-white/42"
                            : ""
                        }
                      `}
                    >
                      {
                        line.text
                      }
                    </p>
                  )
                )
          }
        </div>

        <div
          className="
            shrink-0
            border-t
            border-white/[0.08]
            bg-white/[0.015]
            px-4
            py-4
            sm:px-6
          "
        >
          <div
            className="
              flex
              min-w-0
              items-center
              gap-3
            "
          >
            <span
              className="
                shrink-0
                font-mono
                text-[11px]
                text-cyan-300
                sm:text-[12px]
              "
            >
              &gt;
            </span>

            <input
              ref={
                inputRef
              }
              value={
                input
              }
              onChange={
                (
                  event
                ) => {
                  setInput(
                    event.target.value
                  );
                }
              }
              onKeyDown={
                handleInputKeyDown
              }
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={
                false
              }
              aria-label="Terminal command"
              placeholder="type a command"
              className="
                min-w-0
                flex-1
                bg-transparent
                font-mono
                text-[12px]
                text-[#edf7fa]
                caret-cyan-300
                outline-none
                placeholder:text-white/25
                sm:text-[13px]
              "
            />

            <button
              type="button"
              onClick={
                handleSubmit
              }
              className="
                shrink-0
                rounded-full
                border
                border-cyan-300/20
                bg-cyan-300/[0.04]
                px-3
                py-2
                font-mono
                text-[9px]
                tracking-[0.12em]
                text-cyan-100
                uppercase
                transition
                hover:border-cyan-300/35
                hover:bg-cyan-300/[0.07]
              "
            >
              Execute
            </button>
          </div>

          <div
            className="
              mt-3
              flex
              flex-wrap
              gap-x-4
              gap-y-1
              font-mono
              text-[9px]
              tracking-[0.08em]
              text-white/32
              uppercase
            "
          >
            <span>
              Tab | Complete
            </span>

            <span>
              ↑ ↓ | History
            </span>

            <span>
              Esc | Close
            </span>
          </div>
        </div>

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            h-px
            bg-cyan-300/40
            shadow-[0_0_18px_rgba(72,215,255,0.45)]
          "
        />
      </div>
    </div>
  );
}