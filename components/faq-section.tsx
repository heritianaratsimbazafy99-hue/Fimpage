const faqItems = [
  {
    question: "L’inscription est-elle obligatoire ?",
    answer:
      "Elle est fortement recommandée pour anticiper la capacité des espaces et mieux préparer l’accueil des participants.",
  },
  {
    question: "Puis-je participer à plusieurs sessions ?",
    answer:
      "Oui. La structure est prévue pour multiplier les inscriptions et garder un suivi clair dans Google Sheets.",
  },
  {
    question: "Comment vais-je recevoir la confirmation ?",
    answer:
      "Le flux cible prévoit un email automatique envoyé via Google Workspace après l’enregistrement par Google Apps Script.",
  },
  {
    question: "Comment transmettre mes besoins pour le speed recruiting ?",
    answer:
      "Le formulaire prévoit déjà les champs utiles pour préciser les postes, le volume, le profil recherché et l’envoi éventuel d’une fiche de poste.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="section-shell py-16 sm:py-20">
      <div className="light-panel p-6 sm:p-8 lg:p-10">
        <span className="eyebrow border-slate-200 bg-white text-fim-blue">FAQ</span>
        <div className="mt-5 grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <h2 className="section-title">Les réponses clés avant de vous inscrire.</h2>
            <p className="section-copy mt-5">
              Une FAQ courte, directe et parfaitement adaptée à une landing page
              d’événement pour rassurer sans surcharger le parcours.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4"
              >
                <summary className="cursor-pointer list-none text-lg font-semibold text-slate-950">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

