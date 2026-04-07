import { Mail, MapPin, ShieldCheck, Ticket } from "lucide-react";

const infoCards = [
  {
    icon: MapPin,
    title: "Lieu",
    copy: "CCI Ivato, Antananarivo. Les espaces peuvent varier selon le format et le créneau choisi.",
  },
  {
    icon: Ticket,
    title: "Participation",
    copy: "L’inscription est recommandée pour sécuriser votre place, surtout sur les formats courts ou à jauge maîtrisée.",
  },
  {
    icon: ShieldCheck,
    title: "Accès & suivi",
    copy: "La structure prévoit déjà un identifiant futur pour gérer check-in, présence et évolution QR code.",
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
            Cette base est volontairement simple à maintenir. Les contenus sont
            structurés pour intégrer ensuite vos liens, captures, coordonnées
            officielles et détails logistiques réels.
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
            Conseils
          </p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-100/80">
            <p>Privilégiez une inscription par session pour garder un suivi propre.</p>
            <p>Les exposants et recruteurs peuvent préparer leurs besoins en amont.</p>
            <p>
              Les confirmations email sont prévues via Google Workspace dès que
              le Web App Apps Script est configuré.
            </p>
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                <Mail className="h-5 w-5 text-fim-orange" />
              </div>
              <div>
                <p className="text-sm font-semibold">Contact à remplacer</p>
                <p className="text-sm text-slate-200/70">inscription@fim.mg</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-200/75">
              Ce bloc est prêt à accueillir vos coordonnées officielles, vos
              mentions pratiques et un lien de support si nécessaire.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
