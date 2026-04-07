"use client";

import { useState } from "react";
import { Footer } from "@/components/footer";
import { FAQSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero-section";
import { InfoSection } from "@/components/info-section";
import { PresentationSection } from "@/components/presentation-section";
import { ProgramSection } from "@/components/program-section";
import { RegistrationForm } from "@/components/registration-form";
import type { Session } from "@/lib/types";

type LandingPageProps = {
  sessions: Session[];
};

export function LandingPage({ sessions }: LandingPageProps) {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const selectedSession =
    sessions.find((session) => session.id === selectedSessionId) ?? null;

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleSelectSession(session: Session) {
    setSelectedSessionId(session.id);
    requestAnimationFrame(() => scrollToSection("inscription"));
  }

  function handleFormSessionChange(sessionId: string | null) {
    setSelectedSessionId(sessionId);
  }

  return (
    <main className="overflow-x-hidden">
      <div className="relative">
        <HeroSection
          onExploreProgram={() => scrollToSection("programme")}
          onRegister={() => scrollToSection("inscription")}
        />
        <PresentationSection />
      </div>

      <div className="relative bg-fim-sand text-slate-950">
        <ProgramSection
          sessions={sessions}
          selectedSessionId={selectedSessionId}
          onSelectSession={handleSelectSession}
        />
        <RegistrationForm
          sessions={sessions}
          selectedSession={selectedSession}
          onSessionChange={handleFormSessionChange}
        />
        <InfoSection />
        <FAQSection />
        <Footer />
      </div>
    </main>
  );
}
