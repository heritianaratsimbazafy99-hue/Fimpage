import { CheckCircle2, MailCheck, Ticket } from "lucide-react";
import { CTAButton } from "@/components/cta-button";
import type { Session, SubmissionResult } from "@/lib/types";

type SuccessStateProps = {
  result: SubmissionResult;
  session: Session;
  participantName: string;
  participantEmail: string;
  onReset: () => void;
};

const confettiPieces = [
  { left: "10%", color: "bg-fim-orange", delay: "0s" },
  { left: "22%", color: "bg-sky-400", delay: "0.3s" },
  { left: "34%", color: "bg-emerald-400", delay: "0.6s" },
  { left: "46%", color: "bg-white", delay: "0.2s" },
  { left: "58%", color: "bg-fim-orange", delay: "0.8s" },
  { left: "70%", color: "bg-sky-300", delay: "0.1s" },
  { left: "82%", color: "bg-emerald-300", delay: "0.4s" },
];

export function SuccessState({
  result,
  session,
  participantName,
  participantEmail,
  onReset,
}: SuccessStateProps) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-fim-blue via-[#0b2f63] to-fim-ink p-7 text-white shadow-spotlight sm:p-9">
      {confettiPieces.map((piece) => (
        <span
          key={`${piece.left}-${piece.delay}`}
          className={`absolute top-0 h-4 w-2 rounded-full ${piece.color} animate-confetti`}
          style={{ left: piece.left, animationDelay: piece.delay }}
        />
      ))}

      <div className="relative">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-fim-orange">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.26em] text-fim-mist">
          Confirmation d&apos;inscription
        </p>
        <h3 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
          Merci {participantName}, votre place est bien réservée.
        </h3>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-100/80">
          {result.demoMode
            ? "Le parcours fonctionne actuellement en mode démonstration. Une fois l’URL Google Apps Script configurée, chaque soumission sera automatiquement enregistrée dans Google Sheets et confirmée par email."
            : result.message}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5">
            <div className="flex items-center gap-2 text-fim-mist">
              <Ticket className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.22em]">Référence</span>
            </div>
            <p className="mt-3 text-lg font-semibold">{result.registrationId}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5">
            <div className="flex items-center gap-2 text-fim-mist">
              <MailCheck className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.22em]">Email</span>
            </div>
            <p className="mt-3 text-lg font-semibold">{participantEmail}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-fim-mist">Session</p>
            <p className="mt-3 text-lg font-semibold">{session.title}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CTAButton onClick={onReset} variant="light" size="lg">
            Inscrire une autre personne
          </CTAButton>
          <CTAButton href="#programme" variant="secondary" size="lg">
            Revenir au programme
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
