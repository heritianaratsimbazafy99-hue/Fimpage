import { CalendarRange, MailCheck, MousePointerClick } from "lucide-react";

const highlights = [
  {
    icon: CalendarRange,
    title: "Consultez le programme",
    copy:
      "Repérez rapidement les sessions qui vous concernent pendant la FIM et visualisez leur format d’un seul coup d’œil.",
  },
  {
    icon: MousePointerClick,
    title: "Réservez votre place",
    copy:
      "Un clic sur une carte suffit pour préremplir le formulaire avec la session choisie et accélérer l’inscription.",
  },
  {
    icon: MailCheck,
    title: "Recevez la confirmation",
    copy:
      "Chaque inscription est pensée pour être enregistrée dans Google Sheets puis confirmée automatiquement par email.",
  },
];

export function PresentationSection() {
  return (
    <section className="section-shell pb-16 pt-6 sm:pb-20">
      <div className="glass-panel overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div>
            <span className="eyebrow">Présentation</span>
            <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Une page d’inscription pensée pour transformer l’intérêt en
              participation réelle.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200/80">
              Les sessions se déroulent pendant la FIM à la CCI Ivato.
              L’inscription est recommandée pour mieux anticiper les places
              disponibles. Certaines séquences sont pensées pour les visiteurs,
              d’autres pour les exposants, recruteurs ou partenaires qui veulent
              préparer leurs échanges en amont.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {highlights.map(({ icon: Icon, title, copy }) => (
              <article
                key={title}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-fim-orange">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-200/75">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
