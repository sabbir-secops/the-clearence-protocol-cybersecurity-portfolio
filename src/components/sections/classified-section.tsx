"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AccessState =
  | "idle"
  | "scanning"
  | "denied";

const signalFragments = [
  "INTELLIGENCE",
  "LEARN",
  "DEFEND",
  "SIMULATE",
  "CONNECT",
  "EVOLVE",
];

const accessMatrix = [
  {
    label: "System ID",
    value: "S-01",
  },
  {
    label: "Clearance",
    value: "Public",
  },
  {
    label: "System State",
    value: "Active Development",
  },
  {
    label: "Disclosure",
    value: "Restricted",
  },
];

export default function ClassifiedSection() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const timeoutRefs =
    useRef<number[]>([]);

  const [
    accessState,
    setAccessState,
  ] =
    useState<AccessState>(
      "idle"
    );

  const [
    revealedSignals,
    setRevealedSignals,
  ] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(
        (timeout) => {
          window.clearTimeout(
            timeout
          );
        }
      );
    };
  }, []);

  useEffect(() => {
    if (
      accessState !==
      "denied"
    ) {
      return;
    }

    window.dispatchEvent(
      new CustomEvent(
        "system:classified-access-denied"
      )
    );

    window.dispatchEvent(
      new CustomEvent(
        "system:a11y-announce",
        {
          detail: {
            message:
              "Access denied. Public clearance insufficient.",
          },
        }
      )
    );
  }, [
    accessState,
  ]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(
        "system:classified-state-change",
        {
          detail: {
            state: accessState,
            recovered:
              revealedSignals.length,
            total:
              signalFragments.length,
          },
        }
      )
    );
  }, [
    accessState,
    revealedSignals.length,
  ]);

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    if (!section) {
      return;
    }

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (reduceMotion) {
      return;
    }

    const ctx = gsap.context(
      () => {
        gsap.from(
          ".classified-header-item",
          {
            y: 30,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",

            scrollTrigger: {
              trigger: section,
              start: "top 82%",
            },
          }
        );

        gsap.from(
          ".classified-panel",
          {
            y: 26,
            scale: 0.985,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                ".classified-interface",
              start: "top 88%",
            },
          }
        );

        gsap.to(
          ".classified-ring-a",
          {
            rotate: 360,
            duration: 42,
            repeat: -1,
            ease: "none",
          }
        );

        gsap.to(
          ".classified-ring-b",
          {
            rotate: -360,
            duration: 29,
            repeat: -1,
            ease: "none",
          }
        );
      },
      section
    );

    return () => {
      ctx.revert();
    };
  }, []);

  const attemptAccess = () => {
    if (
      accessState ===
      "scanning"
    ) {
      return;
    }

    timeoutRefs.current.forEach(
      (timeout) => {
        window.clearTimeout(
          timeout
        );
      }
    );

    timeoutRefs.current = [];

    setAccessState(
      "scanning"
    );

    setRevealedSignals([]);

    signalFragments.forEach(
      (
        signal,
        index
      ) => {
        const timeout =
          window.setTimeout(
            () => {
              setRevealedSignals(
                signalFragments.slice(
                  0,
                  index + 1
                )
              );
            },
            420 * (index + 1)
          );

        timeoutRefs.current.push(
          timeout
        );
      }
    );

    const denialTimeout =
      window.setTimeout(
        () => {
          setAccessState(
            "denied"
          );
        },
        3300
      );

    timeoutRefs.current.push(
      denialTimeout
    );
  };

  const resetAccess = () => {
    timeoutRefs.current.forEach(
      (timeout) => {
        window.clearTimeout(
          timeout
        );
      }
    );

    timeoutRefs.current = [];

    setAccessState("idle");

    setRevealedSignals([]);
  };

  return (
    <section
      ref={sectionRef}
      id="classified"
      className="
        relative
        overflow-hidden
        border-b
        border-amber-300/[0.10]
        bg-[#090806]
        py-20
        sm:py-24
        lg:py-28
        xl:py-32
        2xl:py-36
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[35%]
          h-[760px]
          w-[760px]
          max-w-full
          -translate-x-1/2
          rounded-full
          bg-amber-300/[0.045]
          blur-[170px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-20%]
          right-[-15%]
          h-[620px]
          w-[620px]
          rounded-full
          bg-red-500/[0.025]
          blur-[170px]
        "
      />

      <div
        className="
          container-shell
          relative
          z-10
          min-w-0
        "
      >
        <div
          className="
            mb-10
            grid
            min-w-0
            gap-7
            lg:mb-14
            lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)]
            lg:items-end
          "
        >
          <div
            className="
              classified-header-item
              min-w-0
            "
          >
            <p
              className="
                mb-5
                font-mono
                text-[11px]
                font-semibold
                tracking-[0.15em]
                text-amber-300
                uppercase
                sm:text-[12px]
              "
            >
              Clearance 09 | Restricted System
            </p>

            <h2
              className="
                section-title
                max-w-[920px]
                text-amber-50
              "
            >
              Public clearance
              <br />
              is insufficient.
            </h2>
          </div>

          <div
            className="
              classified-header-item
              min-w-0
            "
          >
            <p
              className="
                max-w-[580px]
                text-[16px]
                leading-7
                text-[#b9b2a8]
                sm:text-[17px]
                sm:leading-8
              "
            >
              One system remains
              outside the public
              archive. Its architecture,
              identity and purpose are
              intentionally restricted
              while development
              continues.
            </p>
          </div>
        </div>

        <div
          className="
            mb-5
            flex
            min-w-0
            flex-col
            gap-4
            rounded-[18px]
            border
            border-amber-300/[0.16]
            bg-[#100d08]
            px-4
            py-4
            sm:px-5
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div
            className="
              flex
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
                bg-amber-300
                shadow-[0_0_18px_rgba(255,184,77,0.75)]
              "
            />

            <span
              className="
                font-mono
                text-[10px]
                font-semibold
                tracking-[0.11em]
                text-amber-100
                uppercase
                sm:text-[11px]
              "
            >
              Restricted Channel | S-01
            </span>
          </div>

          <div
            className="
              flex
              flex-wrap
              gap-x-5
              gap-y-2
            "
          >
            <span
              className="
                font-mono
                text-[10px]
                tracking-[0.10em]
                text-[#aaa195]
                uppercase
              "
            >
              Disclosure | Limited
            </span>

            <span
              className="
                font-mono
                text-[10px]
                tracking-[0.10em]
                text-[#aaa195]
                uppercase
              "
            >
              Reveal | Pending
            </span>
          </div>
        </div>

        <div
          className="
            classified-interface
            grid
            min-w-0
            gap-5
            xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]
          "
        >
          <div
            className="
              classified-panel
              relative
              min-w-0
              overflow-hidden
              rounded-[24px]
              border
              border-amber-300/[0.15]
              bg-[#0e0c08]
              p-5
              sm:rounded-[28px]
              sm:p-6
              lg:p-8
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-40
              "
              style={{
                backgroundImage: `
                  linear-gradient(
                    rgba(255,184,77,0.035) 1px,
                    transparent 1px
                  ),
                  linear-gradient(
                    90deg,
                    rgba(255,184,77,0.035) 1px,
                    transparent 1px
                  )
                `,
                backgroundSize:
                  "46px 46px",
              }}
            />

            <div
              className="
                relative
                z-10
                min-w-0
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-3
                  border-b
                  border-amber-300/[0.12]
                  pb-6
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div>
                  <p
                    className="
                      font-mono
                      text-[10px]
                      font-semibold
                      tracking-[0.13em]
                      text-amber-300
                      uppercase
                      sm:text-[11px]
                    "
                  >
                    Classified Node
                  </p>

                  <p
                    className="
                      mt-2
                      font-mono
                      text-[10px]
                      tracking-[0.11em]
                      text-[#9f978d]
                      uppercase
                    "
                  >
                    Identifier | S-01
                  </p>
                </div>

                <span
                  className="
                    inline-flex
                    w-fit
                    items-center
                    rounded-full
                    border
                    border-amber-300/20
                    bg-amber-300/[0.05]
                    px-3
                    py-2
                    font-mono
                    text-[9px]
                    font-semibold
                    tracking-[0.11em]
                    text-amber-200
                    uppercase
                  "
                >
                  Active Development
                </span>
              </div>

              <div
                className="
                  relative
                  flex
                  min-h-[360px]
                  items-center
                  justify-center
                  py-10
                  sm:min-h-[430px]
                "
              >
                <div
                  aria-hidden="true"
                  className="
                    classified-ring-a
                    absolute
                    h-[245px]
                    w-[245px]
                    rounded-full
                    border
                    border-dashed
                    border-amber-300/20
                    sm:h-[300px]
                    sm:w-[300px]
                  "
                />

                <div
                  aria-hidden="true"
                  className="
                    classified-ring-b
                    absolute
                    h-[185px]
                    w-[185px]
                    rounded-full
                    border
                    border-amber-100/[0.10]
                    sm:h-[225px]
                    sm:w-[225px]
                  "
                />

                <div
                  className={`
                    relative
                    z-10
                    flex
                    h-[145px]
                    w-[145px]
                    items-center
                    justify-center
                    rounded-full
                    border
                    transition-[border-color,background-color,box-shadow,transform]
                    duration-500
                    sm:h-[175px]
                    sm:w-[175px]

                    ${
                      accessState ===
                      "scanning"
                        ? `
                            scale-[1.025]
                            border-amber-300/50
                            bg-amber-300/[0.07]
                            shadow-[0_0_120px_rgba(255,184,77,0.14)]
                          `
                        : accessState ===
                            "denied"
                          ? `
                              scale-[1.015]
                              border-amber-300/55
                              bg-amber-300/[0.08]
                              shadow-[0_0_130px_rgba(255,184,77,0.16)]
                            `
                          : `
                              border-amber-300/30
                              bg-amber-300/[0.045]
                              shadow-[0_0_100px_rgba(255,184,77,0.10)]
                            `
                    }
                  `}
                >
                  <div
                    className="
                      text-center
                    "
                  >
                    <div
                      className="
                        mx-auto
                        mb-4
                        h-3
                        w-3
                        rounded-full
                        bg-amber-300
                        shadow-[0_0_26px_rgba(255,184,77,0.9)]
                      "
                    />

                    <p
                      className="
                        font-mono
                        text-[10px]
                        tracking-[0.13em]
                        text-[#bdb4a8]
                        uppercase
                      "
                    >
                      System
                    </p>

                    <p
                      className="
                        mt-2
                        text-[29px]
                        font-semibold
                        tracking-[-0.04em]
                        text-amber-50
                        sm:text-[34px]
                      "
                    >
                      S-01
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="
                  grid
                  min-w-0
                  grid-cols-1
                  gap-3
                  border-t
                  border-amber-300/[0.12]
                  pt-6
                  sm:grid-cols-2
                "
              >
                {accessMatrix.map(
                  (item) => (
                    <div
                      key={item.label}
                      className="
                        min-w-0
                        rounded-[14px]
                        border
                        border-amber-300/[0.12]
                        bg-amber-300/[0.025]
                        p-4
                      "
                    >
                      <p
                        className="
                          font-mono
                          text-[9px]
                          tracking-[0.11em]
                          text-[#9f978d]
                          uppercase
                        "
                      >
                        {item.label}
                      </p>

                      <p
                        className="
                          mt-2
                          break-words
                          text-[13px]
                          font-medium
                          leading-5
                          text-amber-100
                        "
                      >
                        {item.value}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div
            className="
              classified-panel
              relative
              min-w-0
              overflow-hidden
              rounded-[24px]
              border
              border-amber-300/[0.15]
              bg-[#100d08]
              p-5
              sm:rounded-[28px]
              sm:p-6
              lg:p-8
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                right-[-100px]
                top-[-100px]
                h-[320px]
                w-[320px]
                rounded-full
                bg-amber-300/[0.06]
                blur-[110px]
              "
            />

            <div
              className="
                relative
                z-10
                min-w-0
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-3
                  border-b
                  border-amber-300/[0.12]
                  pb-6
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div>
                  <p
                    className="
                      font-mono
                      text-[10px]
                      font-semibold
                      tracking-[0.13em]
                      text-amber-300
                      uppercase
                      sm:text-[11px]
                    "
                  >
                    Encrypted Transmission
                  </p>

                  <p
                    className="
                      mt-2
                      font-mono
                      text-[10px]
                      tracking-[0.10em]
                      text-[#9f978d]
                      uppercase
                    "
                  >
                    Signal | Partial
                  </p>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                      h-2
                      w-2
                      rounded-full
                      bg-amber-300
                      shadow-[0_0_16px_rgba(255,184,77,0.7)]
                    "
                  />

                  <span
                    className="
                      font-mono
                      text-[9px]
                      tracking-[0.10em]
                      text-amber-200
                      uppercase
                    "
                  >
                    Channel Open
                  </span>
                </div>
              </div>

              <div
                className="
                  py-8
                  sm:py-10
                "
              >
                <p
                  className="
                    font-mono
                    text-[10px]
                    font-semibold
                    tracking-[0.14em]
                    text-amber-300
                    uppercase
                  "
                >
                  Public Signal Recovery
                </p>

                <div
                  className="
                    mt-5
                    min-h-[250px]
                    rounded-[18px]
                    border
                    border-amber-300/[0.14]
                    bg-black/15
                    p-4
                    sm:p-5
                  "
                >
                  {revealedSignals.length ===
                  0 ? (
                    <div
                      className="
                        flex
                        min-h-[210px]
                        items-center
                        justify-center
                        text-center
                      "
                    >
                      <div>
                        <p
                          className="
                            font-mono
                            text-[11px]
                            tracking-[0.13em]
                            text-[#aca398]
                            uppercase
                          "
                        >
                          Transmission Encrypted
                        </p>

                        <p
                          className="
                            mt-3
                            text-[14px]
                            leading-6
                            text-[#8f877d]
                          "
                        >
                          Initiate a public
                          clearance attempt to
                          recover partial signal
                          fragments.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="
                        grid
                        min-w-0
                        grid-cols-1
                        gap-3
                        sm:grid-cols-2
                      "
                    >
                      {signalFragments.map(
                        (
                          signal,
                          index
                        ) => {
                          const revealed =
                            revealedSignals.includes(
                              signal
                            );

                          return (
                            <div
                              key={signal}
                              className={`
                                min-w-0
                                rounded-[14px]
                                border
                                p-4
                                transition
                                duration-300

                                ${
                                  revealed
                                    ? `
                                      border-amber-300/25
                                      bg-amber-300/[0.06]
                                    `
                                    : `
                                      border-white/[0.06]
                                      bg-white/[0.015]
                                    `
                                }
                              `}
                            >
                              <div
                                className="
                                  flex
                                  items-center
                                  justify-between
                                  gap-3
                                "
                              >
                                <span
                                  className="
                                    font-mono
                                    text-[9px]
                                    text-[#8f877d]
                                  "
                                >
                                  {String(
                                    index + 1
                                  ).padStart(
                                    2,
                                    "0"
                                  )}
                                </span>

                                <span
                                  className={`
                                    h-1.5
                                    w-1.5
                                    rounded-full

                                    ${
                                      revealed
                                        ? `
                                          bg-amber-300
                                          shadow-[0_0_12px_rgba(255,184,77,0.7)]
                                        `
                                        : `
                                          bg-white/20
                                        `
                                    }
                                  `}
                                />
                              </div>

                              <p
                                className={`
                                  mt-5
                                  break-words
                                  font-mono
                                  text-[11px]
                                  font-semibold
                                  tracking-[0.10em]
                                  uppercase

                                  ${
                                    revealed
                                      ? "text-amber-100"
                                      : "text-[#514c45]"
                                  }
                                `}
                              >
                                {revealed
                                  ? signal
                                  : "██████████"}
                              </p>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>

                {accessState ===
                  "denied" && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="
                      mt-5
                      rounded-[18px]
                      border
                      border-red-400/20
                      bg-red-400/[0.04]
                      p-5
                    "
                  >
                    <p
                      className="
                        font-mono
                        text-[10px]
                        font-semibold
                        tracking-[0.13em]
                        text-red-300
                        uppercase
                      "
                    >
                      Access Denied
                    </p>

                    <p
                      className="
                        mt-3
                        text-[18px]
                        font-medium
                        text-[#f0e8dd]
                      "
                    >
                      Public clearance
                      insufficient.
                    </p>

                    <p
                      className="
                        mt-3
                        font-mono
                        text-[10px]
                        tracking-[0.11em]
                        text-amber-300
                        uppercase
                      "
                    >
                      Reveal Status | Pending
                    </p>
                  </div>
                )}

                <div
                  className="
                    mt-6
                    flex
                    flex-col
                    gap-3
                    sm:flex-row
                    sm:flex-wrap
                  "
                >
                  <button
                    type="button"
                    disabled={
                      accessState ===
                      "scanning"
                    }
                    onClick={
                      attemptAccess
                    }
                    className="
                      inline-flex
                      min-h-[48px]
                      w-full
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-amber-300/35
                      bg-amber-300/[0.07]
                      px-5
                      font-mono
                      text-[10px]
                      font-semibold
                      tracking-[0.11em]
                      text-amber-100
                      uppercase
                      transition
                      hover:border-amber-300/55
                      hover:bg-amber-300/[0.11]
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                      sm:w-auto
                    "
                  >
                    {accessState ===
                    "scanning"
                      ? "Decrypting Signal"
                      : accessState ===
                          "denied"
                        ? "Retry Access"
                        : "Attempt Access"}
                  </button>

                  {accessState ===
                    "denied" && (
                    <button
                      type="button"
                      onClick={
                        resetAccess
                      }
                      className="
                        inline-flex
                        min-h-[48px]
                        w-full
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/[0.12]
                        bg-white/[0.025]
                        px-5
                        font-mono
                        text-[10px]
                        font-semibold
                        tracking-[0.11em]
                        text-[#c6beb4]
                        uppercase
                        transition
                        hover:border-white/[0.22]
                        hover:text-white
                        sm:w-auto
                      "
                    >
                      Clear Signal
                    </button>
                  )}
                </div>
              </div>

              <div
                className="
                  border-t
                  border-amber-300/[0.12]
                  pt-7
                "
              >
                <p
                  className="
                    text-[23px]
                    font-medium
                    tracking-[-0.025em]
                    text-[#f0e8dd]
                    sm:text-[27px]
                  "
                >
                  Something is being built.
                </p>

                <p
                  className="
                    mt-3
                    font-mono
                    text-[10px]
                    font-semibold
                    tracking-[0.14em]
                    text-amber-300
                    uppercase
                  "
                >
                  Reveal Status | Pending
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="
            mt-8
            flex
            flex-col
            gap-3
            border-t
            border-amber-300/[0.12]
            pt-6
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              font-mono
              text-[10px]
              tracking-[0.11em]
              text-[#a49b90]
              uppercase
            "
          >
            S-01 | Classified
          </p>

          <p
            className="
              max-w-[620px]
              text-[14px]
              leading-6
              text-[#a49b90]
              sm:text-right
            "
          >
            Some systems are better
            revealed when they are
            ready.
          </p>
        </div>
      </div>
    </section>
  );
}