"use client";

import { useState } from "react";
import { Filter, Sparkles } from "lucide-react";
import { SessionCard } from "@/components/session-card";
import type { Session, SessionType } from "@/lib/types";

type ProgramSectionProps = {
  sessions: Session[];
  selectedSessionId: string | null;
  onSelectSession: (session: Session) => void;
};

export function ProgramSection({
  sessions,
  selectedSessionId,
  onSelectSession,
}: ProgramSectionProps) {
  const [activeType, setActiveType] = useState<SessionType | "Toutes">("Toutes");
  const [activeDay, setActiveDay] = useState<
    Session["dayKey"] | "Tous"
  >("Tous");

  function getStartMinutes(time: string) {
    const startTime = time.split(" - ")[0] ?? "00:00";
    const [hours, minutes] = startTime.split(":").map(Number);
    return hours * 60 + minutes;
  }

  const dayFilters: Array<Session["dayKey"] | "Tous"> = [
    "Tous",
    ...Array.from(new Set(sessions.map((session) => session.dayKey))),
  ];
  const visibleSessions = sessions
    .filter((session) => {
      const typeMatch = activeType === "Toutes" || session.type === activeType;
      const dayMatch = activeDay === "Tous" || session.dayKey === activeDay;
      return typeMatch && dayMatch;
    })
    .sort((left, right) => {
      if (left.dateIso !== right.dateIso) {
        return left.dateIso.localeCompare(right.dateIso);
      }

      const leftStart = getStartMinutes(left.time);
      const rightStart = getStartMinutes(right.time);

      if (leftStart !== rightStart) {
        return leftStart - rightStart;
      }

      return left.title.localeCompare(right.title);
    });

  return (
    <section id="programme" className="section-shell py-16 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_0.28fr] lg:items-end">
        <div>
          <span className="eyebrow border-slate-200 bg-white text-fim-blue">
            Programme
          </span>
          <h2 className="section-title mt-5">
            Ateliers, conférences, tables rondes et speed recruiting en un seul parcours.
          </h2>
          <p className="section-copy mt-5">
            Parcourez les sessions annoncées, filtrez par format ou par jour,
            puis confirmez votre participation au créneau qui vous convient.
          </p>
        </div>

        <div className="light-panel p-6">
          <div className="flex items-center gap-3 text-fim-blue">
            <Sparkles className="h-5 w-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.22em]">
              À retenir
            </p>
          </div>
          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <p>
              <span className="font-semibold text-slate-950">{sessions.length} sessions</span>{" "}
              annoncées à ce jour pendant la FIM.
            </p>
            <p>
              Les badges distinguent immédiatement les ateliers, conférences,
              tables rondes et créneaux de speed recruiting.
            </p>
            <p>
              Sélectionnez un format, un jour, puis réservez votre participation
              directement en ligne.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 text-slate-500">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">
              Filtrez le programme par type ou par jour.
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {(
              ["Toutes", "Atelier", "Conférence", "Table ronde", "Speed recruiting"] as const
            ).map(
              (value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setActiveType(value)}
                  className={[
                    "rounded-full px-4 py-2 text-sm font-semibold transition",
                    activeType === value
                      ? "bg-slate-950 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                  ].join(" ")}
                >
                  {value}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {dayFilters.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => setActiveDay(day)}
              className={[
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                activeDay === day
                  ? "border-fim-blue bg-fim-blue text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300",
              ].join(" ")}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleSessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              selected={selectedSessionId === session.id}
              onRegister={onSelectSession}
            />
          ))}
        </div>

        {visibleSessions.length === 0 ? (
          <div className="mt-8 rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600">
            Aucun créneau ne correspond à ce filtre pour l’instant.
          </div>
        ) : null}
      </div>
    </section>
  );
}
