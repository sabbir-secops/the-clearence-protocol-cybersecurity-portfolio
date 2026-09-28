"use client";



import {

  useEffect,

  useMemo,

  useRef,

  useState,

} from "react";



import Image from "next/image";

import wordmark from "../../app/wordmark.png";



type SectionItem = {

  id: string;

  number: string;

  label: string;

  shortLabel: string;

  menu: boolean;

};



type SoundChangeDetail = {

  enabled: boolean;

};



type SystemSectionDetail = {

  id: string;

};



type SystemProgressDetail = {

  pageProgress: number;

};



const sections: SectionItem[] = [

  {

    id: "hero",

    number: "01",

    label: "Identity",

    shortLabel: "Identity",

    menu: true,

  },

  {

    id: "identity",

    number: "02",

    label: "System Profile",

    shortLabel: "Profile",

    menu: true,

  },

  {

    id: "principle",

    number: "LOGIC",

    label: "System Logic",

    shortLabel: "System Logic",

    menu: false,

  },

  {

    id: "capabilities",

    number: "03",

    label: "Capability Map",

    shortLabel: "Capabilities",

    menu: true,

  },

  {

    id: "security",

    number: "04",

    label: "Security Layer",

    shortLabel: "Security",

    menu: true,

  },

  {

    id: "archive",

    number: "05",

    label: "Project Archive",

    shortLabel: "Archive",

    menu: true,

  },

  {

    id: "infrastructure",

    number: "06",

    label: "Infrastructure",

    shortLabel: "Infrastructure",

    menu: true,

  },

  {

    id: "search-performance",

    number: "07",

    label: "Search and Performance",

    shortLabel: "Search",

    menu: true,

  },

  {

    id: "research",

    number: "08",

    label: "Research and Intelligence",

    shortLabel: "Research",

    menu: true,

  },

  {

    id: "classified",

    number: "09",

    label: "Classified S-01",

    shortLabel: "Classified",

    menu: true,

  },

  {

    id: "contact",

    number: "10",

    label: "Establish Connection",

    shortLabel: "Connection",

    menu: true,

  },

];



export default function Navbar() {

  const [

    menuOpen,

    setMenuOpen,

  ] =

    useState(false);



  const [

    activeSection,

    setActiveSection,

  ] =

    useState("hero");



  const [

    scrollProgress,

    setScrollProgress,

  ] =

    useState(0);



  const [

    soundEnabled,

    setSoundEnabled,

  ] =

    useState(false);



  const [

    soundReady,

    setSoundReady,

  ] =

    useState(false);



  const [

    clientReady,

    setClientReady,

  ] =

    useState(false);



  const menuTriggerRef =

    useRef<HTMLButtonElement | null>(

      null

    );



  const menuPanelRef =

    useRef<HTMLDivElement | null>(

      null

    );



  const previousFocusRef =

    useRef<HTMLElement | null>(

      null

    );



  const restoreFocusRef =

    useRef(true);



  const activeData =

    useMemo(

      () =>

        sections.find(

          (

            section

          ) =>

            section.id ===

            activeSection

        ) ??

        sections[0],

      [

        activeSection,

      ]

    );



  const menuSections =

    useMemo(

      () =>

        sections.filter(

          (

            section

          ) =>

            section.menu

        ),

      []

    );



  const displaySoundReady =

    clientReady &&

    soundReady;



  const displaySoundEnabled =

    clientReady &&

    soundEnabled;



  useEffect(() => {

    const frame =

      window.requestAnimationFrame(

        () => {

          setClientReady(

            true

          );

        }

      );



    return () => {

      window.cancelAnimationFrame(

        frame

      );

    };

  }, []);



  useEffect(() => {

    const handleSectionChange =

      (

        event: Event

      ) => {

        const customEvent =

          event as CustomEvent<SystemSectionDetail>;



        const id =

          customEvent.detail?.id;



        if (

          typeof id !==

            "string" ||

          !sections.some(

            (

              section

            ) =>

              section.id ===

              id

          )

        ) {

          return;

        }



        setActiveSection(

          id

        );

      };



    const handleProgress =

      (

        event: Event

      ) => {

        const customEvent =

          event as CustomEvent<SystemProgressDetail>;



        const pageProgress =

          customEvent.detail

            ?.pageProgress;



        if (

          typeof pageProgress !==

            "number" ||

          !Number.isFinite(

            pageProgress

          )

        ) {

          return;

        }



        setScrollProgress(

          Math.min(

            Math.max(

              pageProgress,

              0

            ),

            1

          )

        );

      };



    window.addEventListener(

      "system:section-change",

      handleSectionChange

    );



    window.addEventListener(

      "system:progress",

      handleProgress

    );



    return () => {

      window.removeEventListener(

        "system:section-change",

        handleSectionChange

      );



      window.removeEventListener(

        "system:progress",

        handleProgress

      );

    };

  }, []);



  useEffect(() => {

    if (

      !menuOpen

    ) {

      return;

    }



    const panel =

      menuPanelRef.current;



    if (

      !panel

    ) {

      return;

    }



    const menuTrigger =

      menuTriggerRef.current;



    previousFocusRef.current =

      document.activeElement instanceof HTMLElement

        ? document.activeElement

        : menuTrigger;



    restoreFocusRef.current =

      true;



    const focusableSelector =

      [

        "a[href]",

        "button:not([disabled]):not([aria-disabled='true'])",

        "input:not([disabled])",

        "select:not([disabled])",

        "textarea:not([disabled])",

        "[tabindex]:not([tabindex='-1'])",

      ].join(",");



    const getFocusable =

      () =>

        Array.from(

          panel.querySelectorAll<HTMLElement>(

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

          const focusable =

            getFocusable();



          const first =

            focusable[0];



          if (

            first

          ) {

            first.focus();

          } else {

            panel.focus();

          }



          window.dispatchEvent(

            new CustomEvent(

              "system:a11y-announce",

              {

                detail: {

                  message:

                    "System Index opened",

                },

              }

            )

          );

        }

      );



    const handleKeydown =

      (

        event:

          KeyboardEvent

      ) => {

        if (

          event.key ===

          "Escape"

        ) {

          event.preventDefault();



          restoreFocusRef.current =

            true;



          setMenuOpen(

            false

          );



          window.dispatchEvent(

            new CustomEvent(

              "system:a11y-announce",

              {

                detail: {

                  message:

                    "System Index closed",

                },

              }

            )

          );



          return;

        }



        if (

          event.key !==

          "Tab"

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



          panel.focus();



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

              panel

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

      handleKeydown

    );



    return () => {

      window.cancelAnimationFrame(

        focusFrame

      );



      window.removeEventListener(

        "keydown",

        handleKeydown

      );



      if (

        restoreFocusRef.current

      ) {

        const target =

          previousFocusRef.current ??

          menuTrigger;



        window.requestAnimationFrame(

          () => {

            target?.focus();

          }

        );

      }

    };

  }, [

    menuOpen,

  ]);



  useEffect(() => {

    if (

      !menuOpen

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

    menuOpen,

  ]);



  useEffect(() => {

    const handleSoundChange =

      (

        event: Event

      ) => {

        const customEvent =

          event as CustomEvent<SoundChangeDetail>;



        const detail =

          customEvent.detail;



        if (

          !detail ||

          typeof detail.enabled !==

            "boolean"

        ) {

          return;

        }



        setSoundEnabled(

          detail.enabled

        );



        setSoundReady(

          true

        );

      };



    window.addEventListener(

      "system:sound-change",

      handleSoundChange

    );



    const queryFrame =

      window.requestAnimationFrame(

        () => {

          window.dispatchEvent(

            new CustomEvent(

              "system:sound-query"

            )

          );

        }

      );



    return () => {

      window.cancelAnimationFrame(

        queryFrame

      );



      window.removeEventListener(

        "system:sound-change",

        handleSoundChange

      );

    };

  }, []);



  const closeMenu =

    () => {

      restoreFocusRef.current =

        false;



      setMenuOpen(

        false

      );

    };



  const toggleMenu =

    () => {

      restoreFocusRef.current =

        true;



      setMenuOpen(

        (

          current

        ) =>

          !current

      );

    };



  const toggleSound =

    () => {

      if (

        !displaySoundReady

      ) {

        return;

      }



      window.dispatchEvent(

        new CustomEvent(

          "system:sound-toggle"

        )

      );

    };



  const toggleTerminal =

    () => {

      restoreFocusRef.current =

        false;



      setMenuOpen(

        false

      );



      window.requestAnimationFrame(

        () => {

          window.dispatchEvent(

            new CustomEvent(

              "system:terminal-toggle"

            )

          );

        }

      );

    };



  return (

    <>

      <header

        className="

          fixed

          left-0

          top-0

          z-[60]

          w-full

          border-b

          border-white/[0.07]

          bg-[#080b0f]/88

          backdrop-blur-xl

        "

      >

        <div

          className="

            container-shell

            flex

            h-[72px]

            min-w-0

            items-center

            justify-between

            gap-3

            sm:gap-4

          "

        >

          <a

            href="#hero"

            onClick={

              closeMenu

            }

            aria-label="The Clearance Protocol home"

            className="

              flex

              min-h-[44px]

              min-w-0

              shrink-0

              items-center

            "

          >

            <Image

              src={

                wordmark

              }

              alt=""

              priority

              sizes="(min-width: 768px) 176px, (min-width: 640px) 160px, 142px"

              className="

                h-auto

                w-[142px]

                max-w-full

                object-contain

                sm:w-[160px]

                md:w-[176px]

              "

            />

          </a>



          <div

            className="

              hidden

              min-w-0

              flex-1

              items-center

              justify-center

              lg:flex

            "

          >

            <div

              className="

                flex

                min-w-0

                items-center

                gap-3

                rounded-full

                border

                border-white/[0.08]

                bg-white/[0.025]

                px-4

                py-2

              "

            >

              <span

                className="

                  h-1.5

                  w-1.5

                  shrink-0

                  rounded-full

                  bg-cyan-300

                  shadow-[0_0_12px_rgba(72,215,255,0.7)]

                "

              />



              <span

                className="

                  shrink-0

                  font-mono

                  text-[9px]

                  tracking-[0.12em]

                  text-cyan-300

                  uppercase

                "

              >

                {

                  activeData.number ===

                  "LOGIC"

                    ? "System"

                    : `Clearance ${activeData.number}`

                }

              </span>



              <span

                className="

                  text-white/25

                "

              >

                |

              </span>



              <span

                className="

                  truncate

                  font-mono

                  text-[9px]

                  tracking-[0.11em]

                  text-[#a8b4bd]

                  uppercase

                "

              >

                {

                  activeData.label

                }

              </span>

            </div>

          </div>



          <div

            className="

              flex

              shrink-0

              items-center

              gap-2

              sm:gap-3

            "

          >

            <div

              className="

                hidden

                items-center

                gap-3

                xl:flex

              "

            >

              <span className="status-dot" />



              <span className="tiny-mono">

                System | Online

              </span>

            </div>



            <button

              type="button"

              onClick={

                toggleTerminal

              }

              aria-controls="system-terminal"

              className="

                group

                hidden

                min-h-[44px]

                items-center

                justify-center

                gap-2

                rounded-full

                border

                border-white/[0.10]

                bg-white/[0.025]

                px-3

                transition

                hover:border-cyan-300/35

                hover:bg-cyan-300/[0.05]

                lg:flex

                xl:px-4

              "

            >

              <span

                className="

                  font-mono

                  text-[9px]

                  font-medium

                  tracking-[0.11em]

                  text-[#b8c3c9]

                  uppercase

                  transition

                  group-hover:text-cyan-100

                  xl:text-[10px]

                "

              >

                Terminal

              </span>



              <span

                className="

                  rounded

                  border

                  border-white/[0.10]

                  bg-black/20

                  px-1.5

                  py-0.5

                  font-mono

                  text-[8px]

                  tracking-[0.08em]

                  text-white/45

                  uppercase

                "

              >

                Ctrl+K

              </span>

            </button>



            <button

              type="button"

              onClick={

                toggleSound

              }

              aria-label={

                displaySoundEnabled

                  ? "Disable interface sound"

                  : "Enable interface sound"

              }

              aria-pressed={

                displaySoundEnabled

              }

              aria-disabled={

                !displaySoundReady

              }

              className={`

                group

                hidden

                min-h-[44px]

                items-center

                justify-center

                gap-2

                rounded-full

                border

                px-3

                transition

                lg:flex

                xl:px-4



                ${

                  displaySoundEnabled

                    ? `

                      border-cyan-300/25

                      bg-cyan-300/[0.045]

                    `

                    : `

                      border-white/[0.10]

                      bg-white/[0.025]

                    `

                }



                ${

                  displaySoundReady

                    ? `

                      hover:border-cyan-300/35

                      hover:bg-cyan-300/[0.05]

                    `

                    : `

                      cursor-wait

                      opacity-50

                    `

                }

              `}

            >

              <span

                aria-hidden="true"

                className={`

                  h-1.5

                  w-1.5

                  shrink-0

                  rounded-full

                  transition

                  duration-300



                  ${

                    displaySoundEnabled

                      ? `

                        bg-cyan-300

                        shadow-[0_0_10px_rgba(72,215,255,0.85)]

                      `

                      : `

                        bg-white/25

                      `

                  }

                `}

              />



              <span

                className={`

                  font-mono

                  text-[9px]

                  font-medium

                  tracking-[0.11em]

                  uppercase

                  transition

                  xl:text-[10px]



                  ${

                    displaySoundEnabled

                      ? "text-cyan-100"

                      : "text-[#aab5bc]"

                  }

                `}

              >

                Sound |{" "}

                {

                  displaySoundEnabled

                    ? "On"

                    : "Off"

                }

              </span>

            </button>



            <button

              ref={

                menuTriggerRef

              }

              type="button"

              onClick={

                toggleMenu

              }

              aria-expanded={

                menuOpen

              }

              aria-controls="system-index"

              aria-label={

                menuOpen

                  ? "Close system index"

                  : "Open system index"

              }

              className="

                group

                flex

                min-h-[44px]

                items-center

                justify-center

                gap-3

                rounded-full

                border

                border-white/[0.11]

                bg-white/[0.025]

                px-3

                transition

                hover:border-cyan-300/30

                hover:bg-cyan-300/[0.04]

                sm:px-4

              "

            >

              <span

                className="

                  font-mono

                  text-[10px]

                  font-medium

                  tracking-[0.12em]

                  text-[#c0c9cf]

                  uppercase

                  transition

                  group-hover:text-cyan-100

                "

              >

                <span className="md:hidden">

                  {

                    menuOpen

                      ? "Close"

                      : "Index"

                  }

                </span>



                <span className="hidden md:inline">

                  {

                    menuOpen

                      ? "Close"

                      : "System Index"

                  }

                </span>

              </span>



              <div

                className="

                  flex

                  w-4

                  flex-col

                  gap-[4px]

                "

              >

                <span

                  className={`

                    h-px

                    w-full

                    bg-cyan-200

                    transition

                    duration-200



                    ${

                      menuOpen

                        ? "translate-y-[2.5px] rotate-45"

                        : ""

                    }

                  `}

                />



                <span

                  className={`

                    h-px

                    w-full

                    bg-cyan-200

                    transition

                    duration-200



                    ${

                      menuOpen

                        ? "-translate-y-[2.5px] -rotate-45"

                        : ""

                    }

                  `}

                />

              </div>

            </button>

          </div>

        </div>



        <div

          className="

            absolute

            bottom-0

            left-0

            h-px

            w-full

            bg-white/[0.035]

          "

        >

          <div

            className="

              h-full

              origin-left

              bg-cyan-300

              shadow-[0_0_12px_rgba(72,215,255,0.7)]

            "

            style={{

              transform: `scaleX(${scrollProgress})`,

            }}

          />

        </div>

      </header>



      <div

        ref={

          menuPanelRef

        }

        id="system-index"

        role="dialog"

        aria-modal="true"

        aria-labelledby="system-index-title"

        aria-hidden={

          !menuOpen

        }

        tabIndex={-1}

        className={`

          fixed

          inset-x-0

          bottom-0

          top-[72px]

          z-[55]

          overflow-y-auto

          bg-[#080b0f]/98

          backdrop-blur-2xl

          transition

          duration-300



          ${

            menuOpen

              ? `

                visible

                pointer-events-auto

                translate-y-0

                opacity-100

              `

              : `

                invisible

                pointer-events-none

                -translate-y-3

                opacity-0

              `

          }

        `}

      >

        <div

          className="

            container-shell

            flex

            min-h-full

            flex-col

            py-8

            sm:py-10

            lg:py-12

          "

        >

          <div

            className="

              flex

              flex-col

              gap-5

              border-b

              border-white/[0.08]

              pb-7

              sm:flex-row

              sm:items-end

              sm:justify-between

            "

          >

            <div>

              <p className="system-label">

                System Index

              </p>



              <h2

                id="system-index-title"

                className="

                  mt-3

                  text-[30px]

                  font-semibold

                  tracking-[-0.04em]

                  text-[#eef5f8]

                  uppercase

                  sm:text-[38px]

                "

              >

                Public Clearance

                Route

              </h2>

            </div>



            <div

              className="

                flex

                items-center

                gap-3

              "

            >

              <span className="status-dot" />



              <span className="tiny-mono">

                10 Clearance

                Nodes | Active

              </span>

            </div>

          </div>



          <nav

            className="

              grid

              min-w-0

              grid-cols-1

              gap-0

              py-4

              md:grid-cols-2

            "

          >

            {

              menuSections.map(

                (

                  section,

                  index

                ) => {

                  const active =

                    activeSection ===

                    section.id;



                  return (

                    <a

                      key={

                        section.id

                      }

                      href={`#${section.id}`}

                      onClick={

                        closeMenu

                      }

                      aria-current={

                        active

                          ? "location"

                          : undefined

                      }

                      className={`

                        group

                        relative

                        flex

                        min-h-[94px]

                        min-w-0

                        items-center

                        gap-5

                        border-b

                        border-white/[0.08]

                        px-1

                        py-5

                        transition

                        sm:min-h-[108px]

                        sm:px-4



                        ${

                          index %

                            2 ===

                          0

                            ? "md:border-r"

                            : ""

                        }



                        ${

                          active

                            ? "bg-cyan-300/[0.035]"

                            : "hover:bg-white/[0.02]"

                        }

                      `}

                    >

                      <div

                        className="

                          flex

                          h-11

                          w-11

                          shrink-0

                          items-center

                          justify-center

                          rounded-full

                          border

                          border-white/[0.10]

                          bg-white/[0.025]

                          transition

                          group-hover:border-cyan-300/30

                        "

                      >

                        <span

                          className={`

                            font-mono

                            text-[10px]

                            font-semibold



                            ${

                              active

                                ? "text-cyan-300"

                                : "text-[#89969e]"

                            }

                          `}

                        >

                          {

                            section.number

                          }

                        </span>

                      </div>



                      <div

                        className="

                          min-w-0

                          flex-1

                        "

                      >

                        <p

                          className={`

                            break-words

                            text-[20px]

                            font-medium

                            tracking-[-0.025em]

                            uppercase

                            transition

                            sm:text-[24px]



                            ${

                              active

                                ? "text-cyan-100"

                                : "text-[#eef5f8]"

                            }

                          `}

                        >

                          {

                            section.label

                          }

                        </p>



                        <p

                          className="

                            mt-2

                            font-mono

                            text-[9px]

                            tracking-[0.11em]

                            text-[#84929b]

                            uppercase

                          "

                        >

                          Clearance

                          Node |{" "}

                          {

                            section.number

                          }

                        </p>

                      </div>



                      <span

                        aria-hidden="true"

                        className="

                          shrink-0

                          text-[20px]

                          text-[#71808a]

                          transition

                          group-hover:translate-x-1

                          group-hover:text-cyan-200

                        "

                      >

                        →

                      </span>

                    </a>

                  );

                }

              )

            }

          </nav>



          <div

            className="

              border-t

              border-white/[0.08]

              py-6

              lg:hidden

            "

          >

            <p className="system-label">

              System Utilities

            </p>



            <div

              className="

                mt-4

                grid

                gap-3

                sm:grid-cols-2

              "

            >

              <button

                type="button"

                onClick={

                  toggleTerminal

                }

                className="

                  flex

                  min-h-[54px]

                  w-full

                  items-center

                  justify-between

                  rounded-[14px]

                  border

                  border-white/[0.09]

                  bg-white/[0.025]

                  px-4

                  transition

                  hover:border-cyan-300/30

                  hover:bg-cyan-300/[0.05]

                "

              >

                <span

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

                      rounded-full

                      border

                      border-cyan-300/50

                      bg-cyan-300/[0.12]

                    "

                  />



                  <span

                    className="

                      font-mono

                      text-[10px]

                      tracking-[0.12em]

                      text-[#c4cdd2]

                      uppercase

                    "

                  >

                    Terminal

                  </span>

                </span>



                <span

                  className="

                    font-mono

                    text-[9px]

                    tracking-[0.1em]

                    text-cyan-300

                    uppercase

                  "

                >

                  Ctrl+K

                </span>

              </button>



              <button

                type="button"

                onClick={

                  toggleSound

                }

                aria-disabled={

                  !displaySoundReady

                }

                className={`

                  flex

                  min-h-[54px]

                  w-full

                  items-center

                  justify-between

                  rounded-[14px]

                  border

                  px-4

                  transition



                  ${

                    displaySoundEnabled

                      ? `

                        border-cyan-300/25

                        bg-cyan-300/[0.04]

                      `

                      : `

                        border-white/[0.09]

                        bg-white/[0.025]

                      `

                  }

                `}

              >

                <span

                  className="

                    flex

                    items-center

                    gap-3

                  "

                >

                  <span

                    className={`

                      h-2

                      w-2

                      rounded-full



                      ${

                        displaySoundEnabled

                          ? `

                            bg-cyan-300

                            shadow-[0_0_12px_rgba(72,215,255,0.85)]

                          `

                          : `

                            bg-white/25

                          `

                      }

                    `}

                  />



                  <span

                    className="

                      font-mono

                      text-[10px]

                      tracking-[0.12em]

                      text-[#c4cdd2]

                      uppercase

                    "

                  >

                    Interface Sound

                  </span>

                </span>



                <span

                  className={`

                    font-mono

                    text-[10px]

                    tracking-[0.12em]

                    uppercase



                    ${

                      displaySoundEnabled

                        ? "text-cyan-300"

                        : "text-[#7f8c94]"

                    }

                  `}

                >

                  {

                    displaySoundEnabled

                      ? "On"

                      : "Off"

                  }

                </span>

              </button>

            </div>

          </div>



          <div

            className="

              mt-auto

              grid

              gap-4

              border-t

              border-white/[0.08]

              pt-6

              sm:grid-cols-2

              lg:grid-cols-4

            "

          >

            <div>

              <p className="tiny-mono">

                Current

              </p>



              <p

                className="

                  mt-2

                  text-[13px]

                  font-medium

                  text-[#d8e0e4]

                "

              >

                {

                  activeData.shortLabel

                }

              </p>

            </div>



            <div>

              <p className="tiny-mono">

                Session

              </p>



              <p

                className="

                  mt-2

                  text-[13px]

                  font-medium

                  text-[#d8e0e4]

                "

              >

                Secure

              </p>

            </div>



            <div>

              <p className="tiny-mono">

                Clearance

              </p>



              <p

                className="

                  mt-2

                  text-[13px]

                  font-medium

                  text-[#d8e0e4]

                "

              >

                Public

              </p>

            </div>



            <div>

              <p className="tiny-mono">

                Progress

              </p>



              <p

                className="

                  mt-2

                  text-[13px]

                  font-medium

                  text-cyan-200

                "

              >

                {

                  Math.round(

                    scrollProgress *

                      100

                  )

                }

                %

              </p>

            </div>

          </div>

        </div>

      </div>

    </>

  );

}