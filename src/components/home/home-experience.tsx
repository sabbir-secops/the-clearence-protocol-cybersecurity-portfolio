"use client";

import {
  useEffect,
  useState,
} from "react";

import Navbar from "@/components/navigation/navbar";

import AccessibilityController from "@/components/system/accessibility-controller";
import CinematicSequence from "@/components/system/cinematic-sequence";
import GlobalTerminal from "@/components/system/global-terminal";
import PerformanceController from "@/components/system/performance-controller";
import ResponsiveQa from "@/components/system/responsive-qa";
import SectionTransitionLayer from "@/components/system/section-transition-layer";
import SoundSystem from "@/components/system/sound-system";
import SystemEnvironment from "@/components/system/system-environment";

import BootScreen from "@/components/sections/boot-screen";
import HeroSection from "@/components/sections/hero-section";
import IdentitySection from "@/components/sections/identity-section";
import OperatingPrincipleSection from "@/components/sections/operating-principle-section";
import CapabilityNetworkSection from "@/components/sections/capability-network-section";
import SecurityDomainSection from "@/components/sections/security-domain-section";
import ProjectArchiveSection from "@/components/sections/project-archive-section";
import InfrastructureSection from "@/components/sections/infrastructure-section";
import SearchPerformanceSection from "@/components/sections/search-performance-section";
import ResearchIntelligenceSection from "@/components/sections/research-intelligence-section";
import ClassifiedSection from "@/components/sections/classified-section";
import ContactSection from "@/components/sections/contact-section";

export default function HomeExperience() {
  const [
    systemEntered,
    setSystemEntered,
  ] =
    useState(false);

  useEffect(() => {
    const body =
      document.body;

    const html =
      document.documentElement;

    const previousBodyOverflow =
      body.style.overflow;

    const previousHtmlOverflow =
      html.style.overflow;

    const previousBodyOverscroll =
      body.style.overscrollBehavior;

    if (
      !systemEntered
    ) {
      body.style.overflow =
        "hidden";

      html.style.overflow =
        "hidden";

      body.style.overscrollBehavior =
        "none";
    } else {
      body.style.overflow =
        "";

      html.style.overflow =
        "";

      body.style.overscrollBehavior =
        "";
    }

    return () => {
      body.style.overflow =
        previousBodyOverflow;

      html.style.overflow =
        previousHtmlOverflow;

      body.style.overscrollBehavior =
        previousBodyOverscroll;
    };
  }, [
    systemEntered,
  ]);

  const unlockSystem =
    () => {
      setSystemEntered(
        true
      );

      window.requestAnimationFrame(
        () => {
          window.dispatchEvent(
            new CustomEvent(
              "system:entered"
            )
          );
        }
      );
    };

  return (
    <div
      className="
        relative
        isolate
        min-h-screen
        min-w-0
        overflow-x-clip
        bg-[#080b0f]
        text-[#e9f1f7]
      "
    >
      <PerformanceController />

      <ResponsiveQa />

      <AccessibilityController
        enabled={
          systemEntered
        }
      />

      <SoundSystem />

      <CinematicSequence />

      <GlobalTerminal
        enabled={
          systemEntered
        }
      />

      <SystemEnvironment
        enabled={
          systemEntered
        }
      />

      {systemEntered && (
        <SectionTransitionLayer />
      )}

      <BootScreen
        onUnlock={
          unlockSystem
        }
      />

      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
        className="
          min-w-0
          outline-none
        "
      >
        <HeroSection
          active={
            systemEntered
          }
        />

        <IdentitySection />

        <OperatingPrincipleSection />

        <CapabilityNetworkSection />

        <SecurityDomainSection />

        <ProjectArchiveSection />

        <InfrastructureSection />

        <SearchPerformanceSection />

        <ResearchIntelligenceSection />

        <ClassifiedSection />

        <ContactSection />
      </main>
    </div>
  );
}