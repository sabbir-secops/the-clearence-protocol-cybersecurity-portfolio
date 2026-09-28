"use client";
import {
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const subscribeToClient = () => () => {};
type FormStatus =
  | "idle"
  | "submitting"
  | "success"
  | "activation"
  | "error";
type ContactApiResponse = {
  success?: boolean;
  activationRequired?: boolean;
  message?: string;
};
type ChannelIconName =
  | "email"
  | "github"
  | "linkedin"
  | "x"
  | "facebook"
  | "instagram";
type ConnectionPoint = {
  number: string;
  name: string;
  value: string;
  status: string;
  icon: ChannelIconName;
  href?: string;
  external?: boolean;
  disabled?: boolean;
};
const connectionPoints: ConnectionPoint[] = [
  {
    number: "01",
    name: "Email",
    value: "contact@buildwithsabbir.com",
    status: "Primary Channel",
    icon: "email",
    href: "mailto:contact@buildwithsabbir.com",
  },
  {
    number: "02",
    name: "GitHub",
    value: "Profile coming soon",
    status: "Code Archive | Pending",
    icon: "github",
    disabled: true,
  },
  {
    number: "03",
    name: "LinkedIn",
    value: "Md. Sabbir Hossain",
    status: "Professional Network",
    icon: "linkedin",
    href: [
      "https:",
      "",
      "www.linkedin.com",
      "in",
      "md-sabbir-hossain-3a1a36295",
    ].join("/"),
    external: true,
  },
  {
    number: "04",
    name: "X",
    value: "@sabbir_secops",
    status: "Public Signal",
    icon: "x",
    href: [
      "https:",
      "",
      "x.com",
      "sabbir_secops",
    ].join("/"),
    external: true,
  },
  {
    number: "05",
    name: "Facebook",
    value: "Sabbir Hossain",
    status: "Social Channel",
    icon: "facebook",
    href: [
      "https:",
      "",
      "www.facebook.com",
      "people",
      "Sabbir-Hossain",
      "61594017674828",
    ].join("/"),
    external: true,
  },
  {
    number: "06",
    name: "Instagram",
    value: "@sabbirhossain.secops",
    status: "Visual Channel",
    icon: "instagram",
    href: [
      "https:",
      "",
      "www.instagram.com",
      "sabbirhossain.secops",
    ].join("/"),
    external: true,
  },
];
function ArrowUpRightIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <path
        d="M7 17L17 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 7H17V15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function MailPlatformIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M5 7L12 12.4L19 7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function GithubPlatformIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path
        d="M12 2.2C6.58 2.2 2.2 6.7 2.2 12.25C2.2 16.69 5.01 20.45 8.9 21.78C9.39 21.87 9.57 21.56 9.57 21.3C9.57 21.06 9.56 20.28 9.56 19.45C6.8 20.06 6.22 18.26 6.22 18.26C5.77 17.08 5.11 16.77 5.11 16.77C4.2 16.13 5.18 16.14 5.18 16.14C6.19 16.21 6.72 17.2 6.72 17.2C7.61 18.78 9.06 18.32 9.63 18.06C9.72 17.39 9.98 16.93 10.27 16.68C8.07 16.42 5.75 15.55 5.75 11.7C5.75 10.6 6.13 9.7 6.77 8.99C6.67 8.73 6.33 7.69 6.87 6.31C6.87 6.31 7.7 6.04 9.59 7.35C10.38 7.13 11.23 7.02 12.08 7.02C12.93 7.02 13.78 7.13 14.57 7.35C16.46 6.04 17.29 6.31 17.29 6.31C17.83 7.69 17.49 8.73 17.39 8.99C18.03 9.7 18.41 10.6 18.41 11.7C18.41 15.56 16.09 16.42 13.88 16.68C14.24 17 14.55 17.61 14.55 18.55C14.55 19.9 14.54 20.99 14.54 21.3C14.54 21.56 14.72 21.88 15.22 21.78C19.11 20.44 21.92 16.69 21.92 12.25C21.92 6.7 17.53 2.2 12 2.2Z"
      />
    </svg>
  );
}
function LinkedinPlatformIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path
        d="M5.4 8.1H2.7V21H5.4V8.1ZM4.05 2.5C3.18 2.5 2.5 3.2 2.5 4.05C2.5 4.92 3.18 5.6 4.05 5.6C4.92 5.6 5.6 4.92 5.6 4.05C5.6 3.2 4.92 2.5 4.05 2.5ZM21.5 13.6C21.5 9.72 19.43 7.92 16.67 7.92C14.45 7.92 13.45 9.14 12.89 10V8.1H10.2V21H12.89V14.62C12.89 12.94 13.21 11.31 15.3 11.31C17.36 11.31 17.39 13.24 17.39 14.73V21H20.08V13.92C20.08 13.81 20.08 13.7 20.08 13.6H21.5Z"
      />
    </svg>
  );
}
function InstagramPlatformIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle
        cx="17.4"
        cy="6.7"
        r="1"
        fill="currentColor"
      />
    </svg>
  );
}
function XPlatformIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <path
        d="M5 4L19 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M19 4L5 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function FacebookPlatformIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <path
        d="M13.6 21V13.2H16.2L16.6 10.2H13.6V8.3C13.6 7.4 13.9 6.8 15.1 6.8H16.7V4.1C16.4 4.1 15.5 4 14.4 4C12.1 4 10.5 5.4 10.5 8V10.2H8V13.2H10.5V21H13.6Z"
        fill="currentColor"
      />
    </svg>
  );
}
function ChannelIcon({
  icon,
}: {
  icon: ChannelIconName;
}) {
  const iconClass =
    "h-7 w-7";
  if (icon === "email") {
    return (
      <MailPlatformIcon
        className={iconClass}
      />
    );
  }
  if (icon === "github") {
    return (
      <GithubPlatformIcon
        className={iconClass}
      />
    );
  }
  if (icon === "linkedin") {
    return (
      <LinkedinPlatformIcon
        className={iconClass}
      />
    );
  }
  if (icon === "facebook") {
    return (
      <FacebookPlatformIcon
        className={iconClass}
      />
    );
  }
  if (icon === "instagram") {
    return (
      <InstagramPlatformIcon
        className={iconClass}
      />
    );
  }
  return (
    <XPlatformIcon
      className={iconClass}
    />
  );
}
function ConnectionCard({
  channel,
}: {
  channel: ConnectionPoint;
}) {
  const surfaceRef =
    useRef<HTMLDivElement | null>(null);
  const glowRef =
    useRef<HTMLDivElement | null>(null);
  const iconRef =
    useRef<HTMLDivElement | null>(null);
  const resetPointerEffect =
    () => {
      const surface =
        surfaceRef.current;
      const glow =
        glowRef.current;
      const icon =
        iconRef.current;
      if (surface) {
        surface.style.transform =
          "perspective(900px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0)";
      }
      if (glow) {
        glow.style.opacity =
          "0";
      }
      if (icon) {
        icon.style.transform =
          "translate3d(0,0,0) rotate(0deg)";
      }
    };
  const handlePointerMove =
    (
      event:
        ReactPointerEvent<HTMLDivElement>
    ) => {
      if (
        event.pointerType !==
        "mouse"
      ) {
        return;
      }
      if (
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
      ) {
        return;
      }
      const surface =
        surfaceRef.current;
      const glow =
        glowRef.current;
      const icon =
        iconRef.current;
      if (!surface) {
        return;
      }
      const rect =
        surface.getBoundingClientRect();
      const normalizedX =
        (
          event.clientX -
          rect.left
        ) /
        Math.max(
          rect.width,
          1
        );
      const normalizedY =
        (
          event.clientY -
          rect.top
        ) /
        Math.max(
          rect.height,
          1
        );
      const offsetX =
        normalizedX -
        0.5;
      const offsetY =
        normalizedY -
        0.5;
      surface.style.transform =
        `perspective(900px) rotateX(${-offsetY * 4.5}deg) rotateY(${offsetX * 5.5}deg) translate3d(0,-2px,0)`;
      if (glow) {
        glow.style.opacity =
          "1";
        glow.style.background =
          `radial-gradient(circle at ${normalizedX * 100}% ${normalizedY * 100}%, rgba(72,215,255,0.18), rgba(72,215,255,0.035) 34%, transparent 62%)`;
      }
      if (icon) {
        icon.style.transform =
          `translate3d(${offsetX * 8}px,${offsetY * 8}px,0) rotate(${offsetX * 2.2}deg)`;
      }
    };
  const content = (
    <div
      ref={surfaceRef}
      onPointerMove={
        handlePointerMove
      }
      onPointerLeave={
        resetPointerEffect
      }
      onPointerCancel={
        resetPointerEffect
      }
      className="
        contact-channel-surface
        relative
        flex
        h-full
        min-h-[210px]
        min-w-0
        flex-col
        overflow-hidden
        rounded-[20px]
        border
        border-white/[0.11]
        bg-[#0d141b]
        p-5
        transition-[transform,border-color,background-color,box-shadow]
        duration-300
        ease-out
        will-change-transform
        group-hover:border-cyan-300/35
        group-hover:bg-[#101920]
        group-hover:shadow-[0_22px_70px_rgba(0,0,0,0.28)]
        motion-reduce:transform-none
        motion-reduce:transition-colors
      "
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-300
          motion-reduce:hidden
        "
      />
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-50px]
          top-[-50px]
          h-[150px]
          w-[150px]
          rounded-full
          bg-cyan-300/[0.055]
          blur-[65px]
        "
      />
      <div
        className="
          relative
          z-10
          flex
          h-full
          min-w-0
          flex-col
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <span className="tiny-mono">
            Channel {channel.number}
          </span>
          <span
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-white/[0.10]
              bg-white/[0.025]
              text-[#7f8d96]
              transition
              duration-300
              group-hover:border-cyan-300/35
              group-hover:text-cyan-200
            "
          >
            {channel.disabled ? (
              <span
                aria-hidden="true"
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-white/35
                "
              />
            ) : (
              <ArrowUpRightIcon
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            )}
          </span>
        </div>
        <div
          className="
            mt-6
            flex
            items-center
            justify-between
            gap-5
          "
        >
          <div
            aria-hidden="true"
            className="
              relative
              h-[68px]
              w-[68px]
              shrink-0
            "
          >
            <div
              className="
                absolute
                inset-0
                rounded-[20px]
                border
                border-cyan-300/[0.18]
                bg-cyan-300/[0.025]
                transition
                duration-500
                group-hover:rotate-6
                group-hover:border-cyan-300/35
                group-hover:bg-cyan-300/[0.05]
                motion-reduce:transform-none
              "
            />
            <div
              className="
                absolute
                inset-[7px]
                rounded-[16px]
                border
                border-white/[0.09]
                bg-[#0a1117]/90
                shadow-[inset_0_0_22px_rgba(72,215,255,0.04)]
              "
            />
            <div
              ref={iconRef}
              className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                text-[#dff8ff]
                transition-transform
                duration-150
                ease-out
                will-change-transform
                group-hover:text-cyan-200
                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            >
              <ChannelIcon
                icon={channel.icon}
              />
            </div>
            <span
              className="
                absolute
                -right-1
                top-2
                h-2
                w-2
                rounded-full
                bg-cyan-300/75
                shadow-[0_0_16px_rgba(72,215,255,0.8)]
                transition
                duration-500
                group-hover:scale-125
                group-hover:bg-cyan-200
                motion-reduce:transform-none
              "
            />
          </div>
          <div
            aria-hidden="true"
            className="
              h-px
              flex-1
              bg-gradient-to-r
              from-cyan-300/20
              via-white/[0.08]
              to-transparent
              transition
              duration-500
              group-hover:from-cyan-300/45
            "
          />
        </div>
        <h3
          className="
            mt-5
            text-[22px]
            font-semibold
            tracking-[-0.025em]
            text-[#eef5f8]
          "
        >
          {channel.name}
        </h3>
        <p
          className="
            mt-3
            break-words
            font-mono
            text-[11px]
            leading-5
            tracking-[0.05em]
            text-[#a8b4bd]
          "
        >
          {channel.value}
        </p>
        <div
          className="
            mt-auto
            border-t
            border-white/[0.09]
            pt-4
          "
        >
          <span className="tiny-mono">
            {channel.status}
          </span>
        </div>
      </div>
    </div>
  );
  if (
    channel.disabled ||
    !channel.href
  ) {
    return (
      <article
        className="
          contact-channel
          group
          min-w-0
        "
        aria-label={`${channel.name} profile coming soon`}
      >
        {content}
      </article>
    );
  }
  return (
    <a
      className="
        contact-channel
        group
        block
        min-w-0
        rounded-[20px]
        outline-none
        focus-visible:ring-2
        focus-visible:ring-cyan-300/70
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#080b0f]
      "
      href={channel.href}
      target={
        channel.external
          ? "_blank"
          : undefined
      }
      rel={
        channel.external
          ? "noreferrer noopener"
          : undefined
      }
      aria-label={`Open ${channel.name}`}
    >
      {content}
    </a>
  );
}
export default function ContactSection() {
  const sectionRef =
    useRef<HTMLElement | null>(null);
  const [
    formStatus,
    setFormStatus,
  ] =
    useState<FormStatus>("idle");

  const formMounted =
    useSyncExternalStore(
      subscribeToClient,
      () => true,
      () => false
    );

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(
        "system:contact-state-change",
        {
          detail: {
            state: formStatus,
          },
        }
      )
    );
  }, [formStatus]);

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
    const ctx = gsap.context(() => {
      gsap.from(
        ".contact-header-item",
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
        ".contact-channel",
        {
          scale: 0.985,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger:
              ".contact-channel-grid",
            start: "top 88%",
          },
        }
      );
      gsap.from(
        ".contact-form-panel",
        {
          y: 26,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger:
              ".contact-form-panel",
            start: "top 90%",
          },
        }
      );
    }, section);
    return () => {
      ctx.revert();
    };
  }, []);
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (
      formStatus ===
      "submitting"
    ) {
      return;
    }
    const form =
      event.currentTarget;
    if (
      !form.reportValidity()
    ) {
      return;
    }
    const formData =
      new FormData(form);
    const identity =
      String(
        formData.get(
          "identity"
        ) ?? ""
      ).trim();
    const email =
      String(
        formData.get(
          "email"
        ) ?? ""
      ).trim();
    const message =
      String(
        formData.get(
          "message"
        ) ?? ""
      ).trim();
    const honey =
      String(
        formData.get(
          "_honey"
        ) ?? ""
      ).trim();
    setFormStatus(
      "submitting"
    );
    const controller =
      new AbortController();
    const timeout =
      window.setTimeout(
        () => {
          controller.abort();
        },
        18000
      );
    try {
      const response =
        await fetch(
          "/api/contact",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Accept:
                "application/json",
            },
            body:
              JSON.stringify(
                {
                  identity,
                  email,
                  message,
                  website:
                    honey,
                }
              ),
            signal:
              controller.signal,
          }
        );
      const result =
        await response
          .json()
          .catch(
            () => null
          ) as
          | ContactApiResponse
          | null;
      if (
        !response.ok ||
        !result?.success
      ) {
        const activationRequired =
          result?.activationRequired ===
          true;
        setFormStatus(
          activationRequired
            ? "activation"
            : "error"
        );
        window.dispatchEvent(
          new CustomEvent(
            "system:a11y-announce",
            {
              detail: {
                message:
                  activationRequired
                    ? "The contact endpoint is awaiting activation. Please use the email channel in the meantime."
                    : result?.message ||
                      "Message transmission failed. Please retry.",
              },
            }
          )
        );
        return;
      }
      form.reset();
      setFormStatus(
        "success"
      );
      window.dispatchEvent(
        new CustomEvent(
          "system:a11y-announce",
          {
            detail: {
              message:
                "Message transmitted successfully.",
            },
          }
        )
      );
    } catch (
      error
    ) {
      const isAbort =
        error instanceof
          Error &&
        error.name ===
          "AbortError";
      setFormStatus(
        "error"
      );
      window.dispatchEvent(
        new CustomEvent(
          "system:a11y-announce",
          {
            detail: {
              message:
                isAbort
                  ? "Message transmission timed out. Please retry."
                  : "Message transmission failed. Please retry.",
            },
          }
        )
      );
    } finally {
      window.clearTimeout(
        timeout
      );
    }
  };
  return (
    <section
      ref={sectionRef}
      id="contact"
      className="
        relative
        overflow-hidden
        bg-[#080b0f]
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
          top-[30%]
          h-[760px]
          w-[760px]
          max-w-full
          -translate-x-1/2
          rounded-full
          bg-cyan-300/[0.035]
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
              contact-header-item
              min-w-0
            "
          >
            <p className="system-label mb-5">
              Clearance 10 | Connection
            </p>
            <h2
              className="
                section-title
                max-w-[900px]
              "
            >
              Establish
              <br />
              connection.
            </h2>
          </div>
          <div
            className="
              contact-header-item
              min-w-0
            "
          >
            <p
              className="
                max-w-[570px]
                text-[16px]
                leading-7
                text-[#a8b4bd]
                sm:text-[17px]
                sm:leading-8
              "
            >
              Have a system to build,
              secure or improve? Open a
              channel.
            </p>
            <div
              className="
                mt-5
                flex
                items-center
                gap-3
              "
            >
              <span className="status-dot" />
              <span className="tiny-mono">
                Communication Gateway | Available
              </span>
            </div>
          </div>
        </div>
        <div
          className="
            contact-channel-grid
            grid
            min-w-0
            grid-cols-1
            gap-3
            sm:grid-cols-2
            sm:gap-4
            xl:grid-cols-3
          "
        >
          {connectionPoints.map(
            (channel) => (
              <ConnectionCard
                key={channel.name}
                channel={channel}
              />
            )
          )}
        </div>
        <div
          className="
            contact-form-panel
            mt-5
            grid
            min-w-0
            overflow-hidden
            rounded-[24px]
            border
            border-white/[0.10]
            bg-[#0b1016]
            sm:rounded-[28px]
            xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]
          "
        >
          <div
            className="
              relative
              min-w-0
              overflow-hidden
              border-b
              border-white/[0.09]
              p-5
              sm:p-6
              lg:p-8
              xl:border-b-0
              xl:border-r
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-[-100px]
                top-[-100px]
                h-[320px]
                w-[320px]
                rounded-full
                bg-cyan-300/[0.055]
                blur-[110px]
              "
            />
            <div
              className="
                relative
                z-10
              "
            >
              <p className="system-label">
                Secure Communication Gateway
              </p>
              <h3
                className="
                  mt-6
                  max-w-[520px]
                  text-[32px]
                  font-semibold
                  leading-[1.05]
                  tracking-[-0.04em]
                  text-[#eef5f8]
                  sm:text-[38px]
                  lg:text-[44px]
                "
              >
                Open a channel.
              </h3>
              <p
                className="
                  mt-5
                  max-w-[500px]
                  text-[15px]
                  leading-7
                  text-[#a8b4bd]
                  sm:text-[16px]
                "
              >
                Send project context,
                technical questions or
                collaboration details
                through the communication
                interface.
              </p>
              <div
                className="
                  mt-8
                  grid
                  gap-3
                  sm:grid-cols-2
                  xl:grid-cols-1
                "
              >
                <div
                  className="
                    rounded-[16px]
                    border
                    border-white/[0.10]
                    bg-white/[0.025]
                    p-4
                  "
                >
                  <p className="tiny-mono">
                    Channel State
                  </p>
                  <p
                    className="
                      mt-2
                      text-[13px]
                      font-medium
                      text-cyan-200
                    "
                  >
                    Available
                  </p>
                </div>
                <div
                  className="
                    rounded-[16px]
                    border
                    border-white/[0.10]
                    bg-white/[0.025]
                    p-4
                  "
                >
                  <p className="tiny-mono">
                    Response Route
                  </p>
                  <p
                    className="
                      mt-2
                      text-[13px]
                      font-medium
                      text-[#c2cbd0]
                    "
                  >
                    Return Channel
                  </p>
                </div>
              </div>
            </div>
          </div>
        {formMounted ? (
          <form
            onSubmit={handleSubmit}
            aria-busy={
              formStatus ===
              "submitting"
            }
            className="
              min-w-0
              p-5
              sm:p-6
              lg:p-8
            "
          >
            <div
              aria-hidden="true"
              className="
                absolute
                left-[-10000px]
                top-auto
                h-px
                w-px
                overflow-hidden
              "
            >
              <label>
                Website
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>
            <div
              className="
                grid
                min-w-0
                gap-5
                sm:grid-cols-2
              "
            >
              <label
                className="
                  block
                  min-w-0
                "
              >
                <span className="system-label">
                  Identity
                </span>
                <input
                  type="text"
                  name="identity"
                  required
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                  placeholder="Your name"
                  className="
                    mt-3
                    min-h-[52px]
                    w-full
                    min-w-0
                    rounded-[14px]
                    border
                    border-white/[0.12]
                    bg-[#0e151c]
                    px-4
                    text-[15px]
                    text-[#eef5f8]
                    outline-none
                    transition
                    placeholder:text-[#64727b]
                    focus:border-cyan-300/45
                    focus:bg-[#101920]
                  "
                />
              </label>
              <label
                className="
                  block
                  min-w-0
                "
              >
                <span className="system-label">
                  Return Channel
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="
                    mt-3
                    min-h-[52px]
                    w-full
                    min-w-0
                    rounded-[14px]
                    border
                    border-white/[0.12]
                    bg-[#0e151c]
                    px-4
                    text-[15px]
                    text-[#eef5f8]
                    outline-none
                    transition
                    placeholder:text-[#64727b]
                    focus:border-cyan-300/45
                    focus:bg-[#101920]
                  "
                />
              </label>
            </div>
            <label
              className="
                mt-5
                block
                min-w-0
              "
            >
              <span className="system-label">
                Transmission
              </span>
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={5000}
                rows={7}
                placeholder="Project context, technical question or collaboration details"
                className="
                  mt-3
                  w-full
                  min-w-0
                  resize-y
                  rounded-[14px]
                  border
                  border-white/[0.12]
                  bg-[#0e151c]
                  px-4
                  py-4
                  text-[15px]
                  leading-7
                  text-[#eef5f8]
                  outline-none
                  transition
                  placeholder:text-[#64727b]
                  focus:border-cyan-300/45
                  focus:bg-[#101920]
                "
              />
            </label>
            <div
              className="
                mt-6
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <button
                type="submit"
                disabled={
                  formStatus ===
                  "submitting"
                }
                className="
                  primary-btn
                  w-full
                  disabled:cursor-wait
                  disabled:opacity-60
                  sm:w-auto
                  sm:min-w-[190px]
                "
              >
                {formStatus ===
                "submitting"
                  ? "Transmitting"
                  : "Transmit Message"}
                <span
                  aria-hidden="true"
                  className="ml-3"
                >
                  →
                </span>
              </button>
              <div
                className="
                  min-w-0
                  sm:text-right
                "
              >
                <div
                role="status"
                aria-live="polite"
              >
                {formStatus ===
                "success" ? (
                  <>
                    <p
                      className="
                        font-mono
                        text-[10px]
                        font-semibold
                        tracking-[0.11em]
                        text-cyan-300
                        uppercase
                      "
                    >
                      Transmission | Delivered
                    </p>
                    <p
                      className="
                        mt-1
                        text-[12px]
                        text-[#8f9ca5]
                      "
                    >
                      Message received. Return channel confirmed.
                    </p>
                  </>
                ) : formStatus ===
                  "activation" ? (
                  <>
                    <p
                      className="
                        font-mono
                        text-[10px]
                        font-semibold
                        tracking-[0.11em]
                        text-amber-300
                        uppercase
                      "
                    >
                      Transmission | Activation Required
                    </p>
                    <p
                      className="
                        mt-1
                        text-[12px]
                        text-[#8f9ca5]
                      "
                    >
                      The contact endpoint is awaiting activation. Please use the email channel in the meantime.
                    </p>
                  </>
                ) : formStatus ===
                  "error" ? (
                  <>
                    <p
                      className="
                        font-mono
                        text-[10px]
                        font-semibold
                        tracking-[0.11em]
                        text-red-300
                        uppercase
                      "
                    >
                      Transmission | Failed
                    </p>
                    <p
                      className="
                        mt-1
                        text-[12px]
                        text-[#8f9ca5]
                      "
                    >
                      Message could not be delivered. Please retry.
                    </p>
                  </>
                ) : formStatus ===
                  "submitting" ? (
                  <p className="tiny-mono">
                    Transmission | In Progress
                  </p>
                ) : (
                  <p className="tiny-mono">
                    Endpoint | Secure Route Ready
                  </p>
                )}
              </div>
              </div>
            </div>
          </form>
        ) : (
          <div
            aria-hidden="true"
            className="
              flex
              min-h-[520px]
              min-w-0
              items-center
              justify-center
              p-5
              sm:p-6
              lg:p-8
            "
          >
            <div
              className="
                w-full
                max-w-[520px]
                rounded-[18px]
                border
                border-white/[0.08]
                bg-white/[0.02]
                p-5
              "
            >
              <div
                className="
                  h-2
                  w-28
                  rounded-full
                  bg-cyan-300/10
                "
              />
              <div
                className="
                  mt-5
                  h-12
                  rounded-[14px]
                  bg-white/[0.025]
                "
              />
              <div
                className="
                  mt-4
                  h-12
                  rounded-[14px]
                  bg-white/[0.025]
                "
              />
              <div
                className="
                  mt-4
                  h-40
                  rounded-[14px]
                  bg-white/[0.025]
                "
              />
            </div>
          </div>
        )}
        </div>
        <div
          className="
            mt-12
            border-t
            border-white/[0.09]
            pt-8
          "
        >
          <div
            className="
              grid
              min-w-0
              gap-8
              md:grid-cols-2
              md:items-end
            "
          >
            <div>
              <p className="system-label">
                Session Complete
              </p>
              <p
                className="
                  mt-4
                  max-w-[650px]
                  text-[22px]
                  font-medium
                  leading-8
                  tracking-[-0.02em]
                  text-[#eef5f8]
                  sm:text-[26px]
                "
              >
                You reached the end of
                the public clearance
                route.
              </p>
            </div>
            <div
              className="
                md:text-right
              "
            >
              <p className="tiny-mono">
                System | Online
              </p>
              <p className="tiny-mono mt-2">
                Clearance | Public
              </p>
              <p className="tiny-mono mt-2">
                Session | Secure
              </p>
            </div>
          </div>
          <div
            className="
              mt-10
              flex
              flex-col
              gap-3
              border-t
              border-white/[0.08]
              pt-6
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <p className="tiny-mono">
              The Clearance Protocol
            </p>
            <p
              className="
                text-[13px]
                text-[#89969e]
              "
            >
              Cybersecurity Product Engineer
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}