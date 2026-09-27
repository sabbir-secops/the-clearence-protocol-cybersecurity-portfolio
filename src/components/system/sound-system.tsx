"use client";



import {

  useCallback,

  useEffect,

  useRef,

} from "react";



type SoundSectionDetail = {

  id: string;

  label: string;

  clearance: string;

  mode: string;

  accent: string;

  rgb: string;

  energy: number;

  index: number;

};



type CinematicDetail = {

  id: string;

};



type SoundChangeDetail = {

  enabled: boolean;

};



type SoundId =

  | "boot"

  | "verified"

  | "infrastructure"

  | "security"

  | "intelligence"

  | "core"

  | "archive"

  | "confidential"

  | "connection"

  | "terminal-open"

  | "terminal-key"

  | "terminal-denied";



type SoundChannel =

  | "cinematic"

  | "section"

  | "core"

  | "interface"

  | "terminal";



type SoundSpec = {

  src: string;

  volume: number;

  cooldown: number;

};



type PlayOptions = {

  channel?: SoundChannel;

  restart?: boolean;

  allowOverlap?: boolean;

  cooldown?: number;

};



const SESSION_KEY =

  "clearance-protocol-sound";



const MASTER_VOLUME =

  0.72;



const SOUND_LIBRARY:

  Record<

    SoundId,

    SoundSpec

  > = {

  boot: {

    src:

      "/audio/system/boot-awaken.mp3",

    volume: 0.74,

    cooldown: 1800,

  },



  verified: {

    src:

      "/audio/system/access-verified.mp3",

    volume: 0.62,

    cooldown: 250,

  },



  infrastructure: {

    src:

      "/audio/system/infrastructure-pulse.mp3",

    volume: 0.5,

    cooldown: 800,

  },



  security: {

    src:

      "/audio/system/security-scan.mp3",

    volume: 0.58,

    cooldown: 700,

  },



  intelligence: {

    src:

      "/audio/system/intelligence-shimmer.mp3",

    volume: 0.48,

    cooldown: 800,

  },



  core: {

    src:

      "/audio/system/core-pulse.mp3",

    volume: 0.52,

    cooldown: 700,

  },



  archive: {

    src:

      "/audio/system/archive-open.mp3",

    volume: 0.5,

    cooldown: 650,

  },



  confidential: {

    src:

      "/audio/system/confidential-warning.mp3",

    volume: 0.6,

    cooldown: 900,

  },



  connection: {

    src:

      "/audio/system/connection-established.mp3",

    volume: 0.52,

    cooldown: 650,

  },



  "terminal-open": {

    src:

      "/audio/system/terminal-open.mp3",

    volume: 0.48,

    cooldown: 180,

  },



  "terminal-key": {

    src:

      "/audio/system/terminal-key.mp3",

    volume: 0.18,

    cooldown: 18,

  },



  "terminal-denied": {

    src:

      "/audio/system/terminal-denied.mp3",

    volume: 0.56,

    cooldown: 280,

  },

};



export default function SoundSystem() {

  const enabledRef =

    useRef(false);



  const interactionUnlockedRef =

    useRef(false);



  const audioLibraryRef =

    useRef<

      Partial<

        Record<

          SoundId,

          HTMLAudioElement

        >

      >

    >({});



  const activeChannelRef =

    useRef<

      Partial<

        Record<

          SoundChannel,

          HTMLAudioElement

        >

      >

    >({});



  const activeClonesRef =

    useRef<

      Set<HTMLAudioElement>

    >(

      new Set()

    );



  const lastPlayedRef =

    useRef<

      Partial<

        Record<

          SoundId,

          number

        >

      >

    >({});



  const previousSectionRef =

    useRef("");



  const pendingSoundRef =

    useRef<{

      id: SoundId;

      options: PlayOptions;

      createdAt: number;

    } | null>(null);



  const buildAudioLibrary =

    useCallback(() => {

      const existing =

        audioLibraryRef.current;



      (

        Object.keys(

          SOUND_LIBRARY

        ) as SoundId[]

      ).forEach(

        (

          id

        ) => {

          if (

            existing[id]

          ) {

            return;

          }



          const spec =

            SOUND_LIBRARY[

              id

            ];



          const audio =

            new Audio(

              spec.src

            );



          audio.preload =

            "auto";



          audio.load();



          audio.volume =

            Math.min(

              MASTER_VOLUME *

                spec.volume,

              1

            );



          audioLibraryRef.current[

            id

          ] =

            audio;

        }

      );

    }, []);



  const stopAll =

    useCallback(() => {

      (

        Object.keys(

          activeChannelRef.current

        ) as SoundChannel[]

      ).forEach(

        (

          channel

        ) => {

          const audio =

            activeChannelRef.current[

              channel

            ];



          if (!audio) {

            return;

          }



          audio.pause();



          try {

            audio.currentTime =

              0;

          } catch {

            return;

          }

        }

      );



      activeChannelRef.current =

        {};



      activeClonesRef.current.forEach(

        (

          audio

        ) => {

          audio.pause();



          try {

            audio.currentTime =

              0;

          } catch {

            return;

          }

        }

      );



      activeClonesRef.current.clear();

    }, []);



  const playSound =

    useCallback(

      (

        id: SoundId,

        options:

          PlayOptions = {}

      ) => {

        if (

          !enabledRef.current

        ) {

          return;

        }



        if (

          !interactionUnlockedRef.current

        ) {

          pendingSoundRef.current = {

            id,

            options,

            createdAt:

              performance.now(),

          };



          return;

        }



        buildAudioLibrary();



        const source =

          audioLibraryRef.current[

            id

          ];



        if (!source) {

          return;

        }



        const spec =

          SOUND_LIBRARY[

            id

          ];



        const now =

          performance.now();



        const cooldown =

          options.cooldown ??

          spec.cooldown;



        const previousTime =

          lastPlayedRef.current[

            id

          ];



        if (

          typeof previousTime ===

            "number" &&

          now -

            previousTime <

            cooldown

        ) {

          return;

        }



        lastPlayedRef.current[

          id

        ] =

          now;



        if (

          options.allowOverlap

        ) {

          const clone =

            source.cloneNode(

              true

            ) as HTMLAudioElement;



          clone.preload =

            "auto";



          if (

            clone.readyState ===

            0

          ) {

            clone.load();

          }



          clone.volume =

            Math.min(

              MASTER_VOLUME *

                spec.volume,

              1

            );



          activeClonesRef.current.add(

            clone

          );



          const cleanup =

            () => {

              activeClonesRef.current.delete(

                clone

              );



              clone.removeEventListener(

                "ended",

                cleanup

              );

            };



          clone.addEventListener(

            "ended",

            cleanup

          );



          void clone

            .play()

            .catch(

              () => {

                if (

                  lastPlayedRef.current[

                    id

                  ] ===

                  now

                ) {

                  delete lastPlayedRef.current[

                    id

                  ];

                }



                cleanup();

              }

            );



          return;

        }



        const channel =

          options.channel ??

          "interface";



        const active =

          activeChannelRef.current[

            channel

          ];



        if (

          active &&

          active !==

            source

        ) {

          active.pause();



          try {

            active.currentTime =

              0;

          } catch {

          }

        }



        if (

          source ===

            active &&

          options.restart ===

            false

        ) {

          return;

        }



        source.pause();



        if (

          source.readyState ===

          0

        ) {

          source.load();

        }



        try {

          source.currentTime =

            0;

        } catch {
          // Some browsers can reject seeking while media is not ready.
        }



        source.volume =

          Math.min(

            MASTER_VOLUME *

              spec.volume,

            1

          );



        activeChannelRef.current[

          channel

        ] =

          source;



        void source

          .play()

          .catch(

            () => {

              if (

                lastPlayedRef.current[

                  id

                ] ===

                now

              ) {

                delete lastPlayedRef.current[

                  id

                ];

              }



              source.load();

            }

          );

      },

      [

        buildAudioLibrary,

      ]

    );



  const dispatchSoundState =

    useCallback(

      (

        enabled:

          boolean

      ) => {

        window.dispatchEvent(

          new CustomEvent<SoundChangeDetail>(

            "system:sound-change",

            {

              detail: {

                enabled,

              },

            }

          )

        );

      },

      []

    );



  const setSoundState =

    useCallback(

      (

        nextEnabled:

          boolean

      ) => {

        enabledRef.current =

          nextEnabled;



        window.sessionStorage.setItem(

          SESSION_KEY,

          nextEnabled

            ? "on"

            : "off"

        );



        if (

          nextEnabled

        ) {

          buildAudioLibrary();



          window.requestAnimationFrame(

            () => {

              playSound(

                "verified",

                {

                  channel:

                    "interface",

                  restart: true,

                  cooldown: 0,

                }

              );

            }

          );

        } else {

          stopAll();

        }



        dispatchSoundState(

          nextEnabled

        );

      },

      [

        buildAudioLibrary,

        dispatchSoundState,

        playSound,

        stopAll,

      ]

    );



  useEffect(() => {

    buildAudioLibrary();



    const stored =

      window.sessionStorage.getItem(

        SESSION_KEY

      );



    const initialEnabled =

      stored === "on";



    enabledRef.current =

      initialEnabled;



    const announceFrame =

      window.requestAnimationFrame(

        () => {

          dispatchSoundState(

            initialEnabled

          );

        }

      );



    const unlockAudio =

      () => {

        interactionUnlockedRef.current =

          true;



        buildAudioLibrary();



        (

          Object.values(

            audioLibraryRef.current

          )

        ).forEach(

          (

            audio

          ) => {

            if (

              !audio

            ) {

              return;

            }



            if (

              audio.readyState <

              2

            ) {

              audio.load();

            }

          }

        );



        const pending =

          pendingSoundRef.current;



        pendingSoundRef.current =

          null;



        if (

          pending &&

          enabledRef.current &&

          performance.now() -

            pending.createdAt <

            1500

        ) {

          window.requestAnimationFrame(

            () => {

              playSound(

                pending.id,

                {

                  ...pending.options,

                  cooldown: 0,

                }

              );

            }

          );

        }



        window.removeEventListener(

          "pointerdown",

          unlockAudio

        );



        window.removeEventListener(

          "keydown",

          unlockAudio

        );

      };



    window.addEventListener(

      "pointerdown",

      unlockAudio,

      {

        passive: true,

      }

    );



    window.addEventListener(

      "keydown",

      unlockAudio

    );



    return () => {

      window.cancelAnimationFrame(

        announceFrame

      );



      window.removeEventListener(

        "pointerdown",

        unlockAudio

      );



      window.removeEventListener(

        "keydown",

        unlockAudio

      );

    };

  }, [

    buildAudioLibrary,

    dispatchSoundState,

    playSound,

  ]);



  useEffect(() => {

    const handleSoundToggle =

      () => {

        setSoundState(

          !enabledRef.current

        );

      };



    const handleSoundQuery =

      () => {

        dispatchSoundState(

          enabledRef.current

        );

      };



    window.addEventListener(

      "system:sound-toggle",

      handleSoundToggle

    );



    window.addEventListener(

      "system:sound-query",

      handleSoundQuery

    );



    return () => {

      window.removeEventListener(

        "system:sound-toggle",

        handleSoundToggle

      );



      window.removeEventListener(

        "system:sound-query",

        handleSoundQuery

      );

    };

  }, [

    dispatchSoundState,

    setSoundState,

  ]);



  useEffect(() => {

    const handleSystemEntered =

      () => {

        playSound(

          "boot",

          {

            channel:

              "cinematic",

            restart: true,

          }

        );

      };



    const handleCoreReady =

      () => {

        playSound(

          "core",

          {

            channel:

              "core",

            restart: true,

          }

        );

      };



    const handleSectionChange =

      (

        event: Event

      ) => {

        const customEvent =

          event as CustomEvent<SoundSectionDetail>;



        const detail =

          customEvent.detail;



        if (!detail) {

          return;

        }



        if (

          previousSectionRef.current ===

          detail.id

        ) {

          return;

        }



        previousSectionRef.current =

          detail.id;



        let sectionSound:

          SoundId =

            "verified";



        if (

          detail.mode ===

            "restricted" ||

          detail.id ===

            "classified"

        ) {

          sectionSound =

            "confidential";

        } else if (

          detail.id ===

          "security"

        ) {

          sectionSound =

            "security";

        } else if (

          detail.id ===

          "infrastructure"

        ) {

          sectionSound =

            "infrastructure";

        } else if (

          detail.id ===

            "research" ||

          detail.id ===

            "research-intelligence"

        ) {

          sectionSound =

            "intelligence";

        } else if (

          detail.id ===

          "archive"

        ) {

          sectionSound =

            "archive";

        } else if (

          detail.id ===

          "contact"

        ) {

          sectionSound =

            "connection";

        } else if (

          detail.id ===

          "principle"

        ) {

          sectionSound =

            "core";

        }



        playSound(

          sectionSound,

          {

            channel:

              "section",

            restart: true,

            cooldown: 0,

          }

        );

      };



    const handleCinematicHandoff =

      (

        event: Event

      ) => {

        const customEvent =

          event as CustomEvent<CinematicDetail>;



        const id =

          customEvent.detail?.id;



        if (

          id !==

          "boot"

        ) {

          return;

        }



        playSound(

          "verified",

          {

            channel:

              "interface",

          }

        );

      };



    const handleTerminalOpen =

      () => {

        playSound(

          "terminal-open",

          {

            channel:

              "terminal",

            restart: true,

          }

        );

      };



    const handleTerminalKey =

      () => {

        playSound(

          "terminal-key",

          {

            allowOverlap:

              true,

            cooldown: 22,

          }

        );

      };



    const handleTerminalDenied =

      () => {

        playSound(

          "terminal-denied",

          {

            channel:

              "terminal",

            restart: true,

          }

        );

      };



    const handleTerminalSuccess =

      () => {

        playSound(

          "verified",

          {

            channel:

              "terminal",

            restart: true,

          }

        );

      };



    const handleClassifiedAccessDenied =

      () => {

        playSound(

          "terminal-denied",

          {

            channel:

              "interface",

            restart: true,

            cooldown: 0,

          }

        );

      };



    window.addEventListener(

      "system:entered",

      handleSystemEntered

    );



    window.addEventListener(

      "system:core-ready",

      handleCoreReady

    );



    window.addEventListener(

      "system:section-change",

      handleSectionChange

    );



    window.addEventListener(

      "system:cinematic-handoff",

      handleCinematicHandoff

    );



    window.addEventListener(

      "system:terminal-open",

      handleTerminalOpen

    );



    window.addEventListener(

      "system:terminal-key",

      handleTerminalKey

    );



    window.addEventListener(

      "system:terminal-denied",

      handleTerminalDenied

    );



    window.addEventListener(

      "system:terminal-success",

      handleTerminalSuccess

    );



    window.addEventListener(

      "system:classified-access-denied",

      handleClassifiedAccessDenied

    );



    return () => {

      window.removeEventListener(

        "system:entered",

        handleSystemEntered

      );



      window.removeEventListener(

        "system:core-ready",

        handleCoreReady

      );



      window.removeEventListener(

        "system:section-change",

        handleSectionChange

      );



      window.removeEventListener(

        "system:cinematic-handoff",

        handleCinematicHandoff

      );



      window.removeEventListener(

        "system:terminal-open",

        handleTerminalOpen

      );



      window.removeEventListener(

        "system:terminal-key",

        handleTerminalKey

      );



      window.removeEventListener(

        "system:terminal-denied",

        handleTerminalDenied

      );



      window.removeEventListener(

        "system:terminal-success",

        handleTerminalSuccess

      );



      window.removeEventListener(

        "system:classified-access-denied",

        handleClassifiedAccessDenied

      );

    };

  }, [

    playSound,

  ]);



  useEffect(() => {
    const audioLibrary =
      audioLibraryRef.current;

    return () => {
      stopAll();

      (
        Object.values(
          audioLibrary
        )
      ).forEach(
        (
          audio
        ) => {
          if (!audio) {
            return;
          }

          audio.pause();

          audio.removeAttribute(
            "src"
          );

          audio.load();
        }
      );

      (
        Object.keys(
          audioLibrary
        ) as SoundId[]
      ).forEach(
        (
          id
        ) => {
          delete audioLibrary[id];
        }
      );
    };
  }, [
    stopAll,
  ]);



  return null;

}