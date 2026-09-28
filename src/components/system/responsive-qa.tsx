"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type QaSeverity =
  | "error"
  | "warning"
  | "info";

type QaIssue = {
  id: string;
  severity: QaSeverity;
  category: string;
  message: string;
  selector: string;
};

type TargetViewport = {
  width: number;
  height?: number;
  label: string;
};

const TARGET_VIEWPORTS: TargetViewport[] = [
  {
    width: 320,
    label: "320",
  },
  {
    width: 375,
    label: "375",
  },
  {
    width: 430,
    label: "430",
  },
  {
    width: 667,
    height: 375,
    label: "667x375",
  },
  {
    width: 768,
    label: "768",
  },
  {
    width: 844,
    height: 390,
    label: "844x390",
  },
  {
    width: 1024,
    label: "1024",
  },
  {
    width: 1280,
    label: "1280",
  },
  {
    width: 1440,
    label: "1440",
  },
  {
    width: 1536,
    label: "1536",
  },
  {
    width: 1920,
    label: "1920",
  },
];

function isVisible(
  element: Element
) {
  if (
    !(element instanceof HTMLElement)
  ) {
    return false;
  }

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
    Number(
      style.opacity
    ) >
      0.01 &&
    rect.width >
      0 &&
    rect.height >
      0
  );
}

function selectorFor(
  element: Element
) {
  if (
    element.id
  ) {
    return `#${element.id}`;
  }

  const tag =
    element.tagName.toLowerCase();

  const className =
    element.getAttribute(
      "class"
    );

  if (
    !className
  ) {
    return tag;
  }

  const cleanClasses =
    className
      .split(
        /\s+/
      )
      .filter(
        Boolean
      )
      .slice(
        0,
        3
      )
      .map(
        (
          value
        ) =>
          `.${value.replace(
            /[^a-zA-Z0-9_-]/g,
            ""
          )}`
      )
      .join(
        ""
      );

  return `${tag}${cleanClasses}`;
}

function shouldIgnore(
  element: Element
) {
  if (
    element instanceof HTMLInputElement &&
    element.type ===
      "hidden"
  ) {
    return true;
  }

  return (
    element.hasAttribute(
      "data-responsive-qa-ignore"
    ) ||
    element.hasAttribute(
      "hidden"
    ) ||
    Boolean(
      element.closest(
        "[data-responsive-qa-root]"
      )
    ) ||
    Boolean(
      element.closest(
        "[aria-hidden='true']"
      )
    ) ||
    Boolean(
      element.closest(
        "[hidden]"
      )
    )
  );
}

function hasDirectTextContent(
  element: Element
) {
  return Array.from(
    element.childNodes
  ).some(
    (
      node
    ) =>
      node.nodeType ===
        Node.TEXT_NODE &&
      Boolean(
        node.textContent?.trim()
      )
  );
}

function clipsHorizontalOverflow(
  element: Element
) {
  const style =
    window.getComputedStyle(
      element
    );

  return (
    style.overflowX ===
      "hidden" ||
    style.overflowX ===
      "clip" ||
    style.overflowX ===
      "auto" ||
    style.overflowX ===
      "scroll"
  );
}

function getVisibleHorizontalBounds(
  element: Element
) {
  const rect =
    element.getBoundingClientRect();

  let left =
    rect.left;

  let right =
    rect.right;

  let ancestor =
    element.parentElement;

  while (
    ancestor &&
    ancestor !==
      document.body &&
    ancestor !==
      document.documentElement
  ) {
    if (
      clipsHorizontalOverflow(
        ancestor
      )
    ) {
      const ancestorRect =
        ancestor.getBoundingClientRect();

      left =
        Math.max(
          left,
          ancestorRect.left
        );

      right =
        Math.min(
          right,
          ancestorRect.right
        );
    }

    ancestor =
      ancestor.parentElement;
  }

  return {
    left,
    right,
  };
}

function uniqueIssues(
  issues: QaIssue[]
) {
  const seen =
    new Set<string>();

  return issues.filter(
    (
      issue
    ) => {
      const key =
        `${issue.category}|${issue.selector}|${issue.message}`;

      if (
        seen.has(
          key
        )
      ) {
        return false;
      }

      seen.add(
        key
      );

      return true;
    }
  );
}

function auditPage() {
  const issues:
    QaIssue[] =
      [];

  const viewportWidth =
    window.innerWidth;

  const viewportHeight =
    window.innerHeight;

  const shouldAuditTouchTargets =
    viewportWidth <=
      768 &&
    window.matchMedia(
      "(pointer: coarse)"
    ).matches;

  const root =
    document.documentElement;

  const body =
    document.body;

  const pageOverflow =
    Math.max(
      root.scrollWidth,
      body.scrollWidth
    ) -
    viewportWidth;

  if (
    pageOverflow >
    2
  ) {
    issues.push({
      id:
        "page-horizontal-overflow",
      severity:
        "error",
      category:
        "Overflow",
      message:
        `Page exceeds viewport by ${Math.ceil(
          pageOverflow
        )}px`,
      selector:
        "document",
    });
  }

  const allElements =
    Array.from(
      document.body.querySelectorAll(
        "*"
      )
    );

  allElements.forEach(
    (
      element,
      index
    ) => {
      if (
        shouldIgnore(
          element
        ) ||
        !isVisible(
          element
        )
      ) {
        return;
      }

      const rect =
        element.getBoundingClientRect();

      const style =
        window.getComputedStyle(
          element
        );

      const fixedOrSticky =
        style.position ===
          "fixed" ||
        style.position ===
          "sticky";

      const visibleBounds =
        getVisibleHorizontalBounds(
          element
        );

      const horizontalOverflow =
        visibleBounds.right >
          viewportWidth +
            2 ||
        visibleBounds.left <
          -2;

      if (
        horizontalOverflow &&
        !fixedOrSticky
      ) {
        issues.push({
          id:
            `overflow-${index}`,
          severity:
            "error",
          category:
            "Element Overflow",
          message:
            `Element extends outside ${viewportWidth}px viewport`,
          selector:
            selectorFor(
              element
            ),
        });
      }

      const isInteractive =
        element.matches(
          "button, a[href], input, select, textarea, [role='button']"
        );

      if (
        isInteractive &&
        shouldAuditTouchTargets
      ) {
        const pointerEvents =
          style.pointerEvents;

        if (
          pointerEvents !==
            "none" &&
          (
            rect.width <
              44 ||
            rect.height <
              44
          )
        ) {
          issues.push({
            id:
              `target-${index}`,
            severity:
              "warning",
            category:
              "Touch Target",
            message:
              `Interactive target is ${Math.round(
                rect.width
              )}x${Math.round(
                rect.height
              )}px`,
            selector:
              selectorFor(
                element
              ),
          });
        }
      }

      const hasOwnText =
        hasDirectTextContent(
          element
        );

      const overflowX =
        style.overflowX;

      const clipsContent =
        overflowX ===
          "hidden" ||
        overflowX ===
          "clip" ||
        style.textOverflow ===
          "ellipsis";

      if (
        hasOwnText &&
        clipsContent &&
        element.scrollWidth >
          element.clientWidth +
            3
      ) {
        issues.push({
          id:
            `clip-${index}`,
          severity:
            "info",
          category:
            "Text Clip",
          message:
            "Text or inline content is being clipped",
          selector:
            selectorFor(
              element
            ),
        });
      }
    }
  );

  return {
    issues:
      uniqueIssues(
        issues
      ),
    viewportWidth,
    viewportHeight,
  };
}

export default function ResponsiveQa() {
  const [
    enabled,
    setEnabled,
  ] =
    useState(false);

  const [
    issues,
    setIssues,
  ] =
    useState<QaIssue[]>(
      []
    );

  const [
    viewport,
    setViewport,
  ] =
    useState({
      width: 0,
      height: 0,
    });

  const [
    outlines,
    setOutlines,
  ] =
    useState(false);

  const resizeFrameRef =
    useRef<number | null>(
      null
    );

  const runAudit =
    useCallback(() => {
      const result =
        auditPage();

      setIssues(
        result.issues
      );

      setViewport({
        width:
          result.viewportWidth,
        height:
          result.viewportHeight,
      });
    }, []);

  const targetMatch =
    useMemo(() => {
      return TARGET_VIEWPORTS.find(
        (
          target
        ) => {
          const widthMatch =
            Math.abs(
              target.width -
                viewport.width
            ) <=
            2;

          if (
            !widthMatch
          ) {
            return false;
          }

          if (
            typeof target.height !==
            "number"
          ) {
            return true;
          }

          return (
            Math.abs(
              target.height -
                viewport.height
            ) <=
            2
          );
        }
      );
    }, [
      viewport,
    ]);

  const counts =
    useMemo(() => {
      return issues.reduce(
        (
          total,
          issue
        ) => {
          total[
            issue.severity
          ] +=
            1;

          return total;
        },
        {
          error: 0,
          warning: 0,
          info: 0,
        }
      );
    }, [
      issues,
    ]);

  useEffect(() => {
    const initialFrame =
      window.requestAnimationFrame(
        () => {
          const params =
            new URLSearchParams(
              window.location.search
            );

          const queryEnabled =
            params.get(
              "qa"
            ) ===
            "1";

          setEnabled(
            queryEnabled
          );

          if (
            queryEnabled
          ) {
            const result =
              auditPage();

            setIssues(
              result.issues
            );

            setViewport({
              width:
                result.viewportWidth,
              height:
                result.viewportHeight,
            });
          }
        }
      );

    const handleShortcut =
      (
        event:
          KeyboardEvent
      ) => {
        if (
          event.key ===
            "Escape" &&
          document.querySelector(
            "[data-responsive-qa-root]"
          )
        ) {
          event.preventDefault();

          setEnabled(
            false
          );

          return;
        }

        if (
          event.ctrlKey &&
          event.shiftKey &&
          event.key.toLowerCase() ===
            "q"
        ) {
          event.preventDefault();

          setEnabled(
            (
              current
            ) =>
              !current
          );
        }
      };

    window.addEventListener(
      "keydown",
      handleShortcut
    );

    return () => {
      window.cancelAnimationFrame(
        initialFrame
      );

      window.removeEventListener(
        "keydown",
        handleShortcut
      );
    };
  }, []);

  useEffect(() => {
    if (
      !enabled
    ) {
      return;
    }

    const scheduleAudit =
      () => {
        if (
          resizeFrameRef.current !==
          null
        ) {
          window.cancelAnimationFrame(
            resizeFrameRef.current
          );
        }

        resizeFrameRef.current =
          window.requestAnimationFrame(
            () => {
              resizeFrameRef.current =
                null;

              runAudit();
            }
          );
      };

    scheduleAudit();

    window.addEventListener(
      "resize",
      scheduleAudit,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "orientationchange",
      scheduleAudit
    );

    return () => {
      if (
        resizeFrameRef.current !==
        null
      ) {
        window.cancelAnimationFrame(
          resizeFrameRef.current
        );
      }

      window.removeEventListener(
        "resize",
        scheduleAudit
      );

      window.removeEventListener(
        "orientationchange",
        scheduleAudit
      );
    };
  }, [
    enabled,
    runAudit,
  ]);

  useEffect(() => {
    const root =
      document.documentElement;

    if (
      enabled &&
      outlines
    ) {
      root.dataset.qaOutlines =
        "on";
    } else {
      delete root.dataset
        .qaOutlines;
    }

    return () => {
      delete root.dataset
        .qaOutlines;
    };
  }, [
    enabled,
    outlines,
  ]);

  useEffect(() => {
    if (
      !enabled ||
      !outlines
    ) {
      return;
    }

    const marked:
      HTMLElement[] =
        [];

    issues
      .filter(
        (
          issue
        ) =>
          issue.severity ===
            "error" ||
          issue.severity ===
            "warning"
      )
      .forEach(
        (
          issue
        ) => {
          if (
            issue.selector ===
            "document"
          ) {
            return;
          }

          try {
            const element =
              document.querySelector(
                issue.selector
              );

            if (
              element instanceof
              HTMLElement
            ) {
              element.dataset
                .responsiveQaIssue =
                issue.severity;

              marked.push(
                element
              );
            }
          } catch {
            return;
          }
        }
      );

    return () => {
      marked.forEach(
        (
          element
        ) => {
          delete element.dataset
            .responsiveQaIssue;
        }
      );
    };
  }, [
    enabled,
    issues,
    outlines,
  ]);

  if (
    !enabled
  ) {
    return null;
  }

  return (
    <>
      <style>
        {`
          [data-responsive-qa-issue="error"] {
            outline: 2px solid rgba(255, 90, 90, 0.92) !important;
            outline-offset: 2px !important;
          }

          [data-responsive-qa-issue="warning"] {
            outline: 2px solid rgba(255, 184, 77, 0.9) !important;
            outline-offset: 2px !important;
          }
        `}
      </style>

      <aside
        data-responsive-qa-root
        className="
          fixed
          bottom-3
          right-3
          z-[140]
          w-[calc(100vw-24px)]
          max-w-[420px]
          overflow-hidden
          rounded-[16px]
          border
          border-cyan-300/20
          bg-[#06090c]/95
          shadow-[0_24px_70px_rgba(0,0,0,0.65)]
          backdrop-blur-xl
          sm:bottom-4
          sm:right-4
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
            border-b
            border-white/[0.08]
            px-4
            py-3
          "
        >
          <div>
            <p
              className="
                font-mono
                text-[10px]
                tracking-[0.14em]
                text-cyan-200
                uppercase
              "
            >
              Responsive QA
            </p>

            <p
              className="
                mt-1
                font-mono
                text-[9px]
                tracking-[0.09em]
                text-white/45
                uppercase
              "
            >
              {viewport.width}
              x
              {viewport.height}
              {" | "}
              {
                targetMatch
                  ? `Target ${targetMatch.label}`
                  : "Custom Viewport"
              }
            </p>
          </div>

          <button
            type="button"
            onClick={
              () => {
                setEnabled(
                  false
                );
              }
            }
            className="
              min-h-[44px]
              min-w-[44px]
              rounded-full
              border
              border-white/[0.1]
              bg-white/[0.02]
              font-mono
              text-[10px]
              text-white/60
              transition
              hover:border-cyan-300/30
              hover:text-cyan-100
            "
          >
            ESC
          </button>
        </div>

        <div
          className="
            grid
            grid-cols-3
            border-b
            border-white/[0.08]
          "
        >
          <div
            className="
              px-4
              py-3
            "
          >
            <p
              className="
                font-mono
                text-[9px]
                tracking-[0.1em]
                text-white/40
                uppercase
              "
            >
              Errors
            </p>

            <p
              className="
                mt-1
                text-[18px]
                font-semibold
                text-red-300
              "
            >
              {
                counts.error
              }
            </p>
          </div>

          <div
            className="
              border-x
              border-white/[0.08]
              px-4
              py-3
            "
          >
            <p
              className="
                font-mono
                text-[9px]
                tracking-[0.1em]
                text-white/40
                uppercase
              "
            >
              Warnings
            </p>

            <p
              className="
                mt-1
                text-[18px]
                font-semibold
                text-amber-300
              "
            >
              {
                counts.warning
              }
            </p>
          </div>

          <div
            className="
              px-4
              py-3
            "
          >
            <p
              className="
                font-mono
                text-[9px]
                tracking-[0.1em]
                text-white/40
                uppercase
              "
            >
              Info
            </p>

            <p
              className="
                mt-1
                text-[18px]
                font-semibold
                text-cyan-200
              "
            >
              {
                counts.info
              }
            </p>
          </div>
        </div>

        <div
          className="
            flex
            gap-2
            border-b
            border-white/[0.08]
            p-3
          "
        >
          <button
            type="button"
            onClick={
              runAudit
            }
            className="
              min-h-[44px]
              flex-1
              rounded-[12px]
              border
              border-cyan-300/20
              bg-cyan-300/[0.04]
              px-3
              font-mono
              text-[9px]
              tracking-[0.1em]
              text-cyan-100
              uppercase
              transition
              hover:border-cyan-300/35
            "
          >
            Run Audit
          </button>

          <button
            type="button"
            onClick={
              () => {
                setOutlines(
                  (
                    current
                  ) =>
                    !current
                );
              }
            }
            className="
              min-h-[44px]
              flex-1
              rounded-[12px]
              border
              border-white/[0.1]
              bg-white/[0.02]
              px-3
              font-mono
              text-[9px]
              tracking-[0.1em]
              text-white/65
              uppercase
              transition
              hover:border-cyan-300/30
            "
          >
            Outline |{" "}
            {
              outlines
                ? "On"
                : "Off"
            }
          </button>
        </div>

        <div
          className="
            max-h-[250px]
            overflow-y-auto
            px-3
            py-3
          "
        >
          {
            issues.length ===
            0
              ? (
                  <div
                    className="
                      rounded-[12px]
                      border
                      border-cyan-300/15
                      bg-cyan-300/[0.03]
                      p-4
                    "
                  >
                    <p
                      className="
                        font-mono
                        text-[10px]
                        tracking-[0.1em]
                        text-cyan-200
                        uppercase
                      "
                    >
                      No Issues Detected
                    </p>
                  </div>
                )
              : (
                  <div
                    className="
                      space-y-2
                    "
                  >
                    {
                      issues
                        .slice(
                          0,
                          30
                        )
                        .map(
                          (
                            issue
                          ) => (
                            <div
                              key={
                                issue.id
                              }
                              className="
                                rounded-[12px]
                                border
                                border-white/[0.08]
                                bg-white/[0.018]
                                p-3
                              "
                            >
                              <div
                                className="
                                  flex
                                  items-center
                                  justify-between
                                  gap-3
                                "
                              >
                                <p
                                  className={`
                                    font-mono
                                    text-[9px]
                                    tracking-[0.1em]
                                    uppercase

                                    ${
                                      issue.severity ===
                                      "error"
                                        ? "text-red-300"
                                        : issue.severity ===
                                            "warning"
                                          ? "text-amber-300"
                                          : "text-cyan-200"
                                    }
                                  `}
                                >
                                  {
                                    issue.category
                                  }
                                </p>

                                <span
                                  className="
                                    font-mono
                                    text-[8px]
                                    text-white/30
                                    uppercase
                                  "
                                >
                                  {
                                    issue.severity
                                  }
                                </span>
                              </div>

                              <p
                                className="
                                  mt-2
                                  text-[12px]
                                  leading-5
                                  text-white/70
                                "
                              >
                                {
                                  issue.message
                                }
                              </p>

                              <p
                                className="
                                  mt-2
                                  break-all
                                  font-mono
                                  text-[9px]
                                  leading-4
                                  text-white/35
                                "
                              >
                                {
                                  issue.selector
                                }
                              </p>
                            </div>
                          )
                        )
                    }

                    {
                      issues.length >
                        30 && (
                        <p
                          className="
                            px-2
                            py-2
                            font-mono
                            text-[9px]
                            text-white/35
                            uppercase
                          "
                        >
                          Showing 30 of{" "}
                          {
                            issues.length
                          }{" "}
                          issues
                        </p>
                      )
                    }
                  </div>
                )
          }
        </div>

        <div
          className="
            border-t
            border-white/[0.08]
            px-4
            py-3
          "
        >
          <p
            className="
              font-mono
              text-[8px]
              leading-4
              tracking-[0.08em]
              text-white/30
              uppercase
            "
          >
            Targets | 320 | 375 | 430 | 667x375 | 768 | 844x390 | 1024 | 1280 | 1440 | 1536 | 1920
          </p>

          <p
            className="
              mt-1
              font-mono
              text-[8px]
              tracking-[0.08em]
              text-white/25
              uppercase
            "
          >
            Toggle | Ctrl+Shift+Q
          </p>
        </div>
      </aside>
    </>
  );
}