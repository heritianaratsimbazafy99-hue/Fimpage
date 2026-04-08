import { CalendarRange, MailCheck, MousePointerClick } from "lucide-react";

const highlights = [
  {
    icon: CalendarRange,
    title: "Consultez le programme",
    copy:
      "Repérez rapidement les sessions qui vous intéressent et retrouvez leurs informations essentielles en un coup d’œil.",
  },
  {
    icon: MousePointerClick,
    title: "Réservez votre place",
    copy:
      "Sélectionnez votre créneau, renseignez vos informations et confirmez votre participation en quelques instants.",
  },
  {
    icon: MailCheck,
    title: "Recevez la confirmation",
    copy:
      "Un email de confirmation vous est envoyé après validation de votre inscription.",
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
              Préparez votre venue et réservez les sessions qui vous intéressent.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200/80">
              Pendant la FIM, plusieurs espaces accueilleront des workshops, des
              tables rondes et des temps de speed recruiting. Certaines sessions
              s’adressent au grand public professionnel, d’autres sont
              particulièrement utiles aux exposants, recruteurs et partenaires.
              L’inscription permet d’organiser l’accueil et de vous confirmer
              votre participation dans les meilleures conditions.
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
