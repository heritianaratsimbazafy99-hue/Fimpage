import { ArrowRight, CalendarDays, MapPin, Users } from "lucide-react";
import { CTAButton } from "@/components/cta-button";
import { SessionTypeBadge } from "@/components/session-type-badge";
import type { Session } from "@/lib/types";

type SessionCardProps = {
  session: Session;
  selected: boolean;
  onRegister: (session: Session) => void;
};

export function SessionCard({
  session,
  selected,
  onRegister,
}: SessionCardProps) {
  return (
    <article
      className={[
        "group flex h-full flex-col rounded-[1.75rem] border bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_65px_rgba(15,23,42,0.12)]",
        selected
          ? "border-fim-blue ring-2 ring-fim-blue/20"
          : "border-slate-200/80 hover:border-slate-300",
      ].join(" ")}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-fim-blue">{session.dayLabel}</p>
          <h3 className="text-2xl font-semibold leading-tight text-slate-950">
            {session.title}
          </h3>
        </div>
        <SessionTypeBadge type={session.type} />
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-600">{session.description}</p>

      {session.details?.length ? (
        <div className="mt-4 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
          <p className="font-semibold text-slate-950">Détails</p>
          <ul className="mt-2 space-y-2 leading-6">
            {session.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-6 grid gap-3 text-sm text-slate-600">
        <div className="flex items-start gap-3">
          <CalendarDays className="mt-0.5 h-4 w-4 text-fim-orange" />
          <span>{session.time}</span>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-4 w-4 text-fim-orange" />
          <span>{session.location}</span>
        </div>
        <div className="flex items-start gap-3">
          <Users className="mt-0.5 h-4 w-4 text-fim-orange" />
          <span>{session.audience}</span>
        </div>
      </div>

      <div className="mt-6 rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
        <p className="font-semibold text-slate-950">{session.host}</p>
        {session.speaker ? (
          <p className="mt-1 leading-6">
            <span className="font-medium text-slate-950">Intervenant(s) :</span>{" "}
            {session.speaker}
          </p>
        ) : null}
        <p className="mt-1">{session.capacityNote}</p>
      </div>

      <div className="mt-6 flex flex-1 items-end">
        <CTAButton
          onClick={() => onRegister(session)}
          className="w-full gap-2"
          size="lg"
        >
          Je m&apos;inscris
          <ArrowRight className="h-4 w-4" />
        </CTAButton>
      </div>
    </article>
  );
}
