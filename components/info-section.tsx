import { Mail, MapPin, ShieldCheck, Ticket } from "lucide-react";

const infoCards = [
  {
    icon: MapPin,
    title: "Lieu",
    copy: "CCI Ivato, Antananarivo. Le lieu précis de chaque session est rappelé sur sa carte programme.",
  },
  {
    icon: Ticket,
    title: "Participation",
    copy: "L’inscription est recommandée pour faciliter l’accueil, même si l’accès aux ateliers, conférences et tables rondes est gratuit après votre entrée à la FIM.",
  },
  {
    icon: ShieldCheck,
    title: "Confirmation",
    copy: "Un email de confirmation vous est envoyé après validation de votre demande d’inscription.",
  },
];

export function InfoSection() {
  return (
    <section className="section-shell py-16 sm:py-20">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="light-panel p-6 sm:p-8">
          <span className="eyebrow border-slate-200 bg-white text-fim-blue">
            Informations pratiques
          </span>
          <h2 className="section-title mt-5">
            Tout ce qu’il faut pour participer sereinement.
          </h2>
          <p className="section-copy mt-5">
            Retrouvez ici les repères utiles avant votre venue pour profiter
            pleinement des ateliers, conférences, tables rondes et créneaux de
            speed recruiting proposés pendant la FIM.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {infoCards.map(({ icon: Icon, title, copy }) => (
              <article
                key={title}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-fim-blue text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-spotlight sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-fim-mist">
            Avant votre venue
          </p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-100/80">
            <p>Présentez-vous quelques minutes avant le début du créneau choisi.</p>
            <p>Vous pouvez réserver plusieurs sessions selon les disponibilités.</p>
            <p>
              Pour le speed recruiting, préparez si possible vos besoins de
              recrutement et les profils recherchés.
            </p>
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                <Mail className="h-5 w-5 text-fim-orange" />
              </div>
              <div>
                <p className="text-sm font-semibold">Contact inscription</p>
                <p className="text-sm text-slate-200/70">
                  heritiana.ratsimbazafy99@gmail.com
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-200/75">
              Pour toute question relative aux inscriptions ou à votre
              participation, contactez l’équipe en charge du programme.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
