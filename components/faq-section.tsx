const faqItems = [
  {
    question: "L’inscription est-elle obligatoire ?",
    answer:
      "Elle est fortement recommandée pour anticiper la capacité des espaces et mieux préparer l’accueil des participants.",
  },
  {
    question: "Puis-je réserver plusieurs sessions ?",
    answer:
      "Oui, vous pouvez réserver plusieurs créneaux en fonction des disponibilités et de votre agenda pendant la Foire Internationale de Madagascar.",
  },
  {
    question: "Comment vais-je recevoir la confirmation ?",
    answer:
      "Une confirmation vous est envoyée par email à l’adresse renseignée lors de votre inscription.",
  },
  {
    question: "Que dois-je renseigner pour le speed recruiting ?",
    answer:
      "Le formulaire vous permet de préciser vos besoins de recrutement, les postes recherchés, le nombre de postes, le profil attendu et l’envoi éventuel d’une fiche de poste.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="section-shell py-16 sm:py-20">
      <div className="light-panel p-6 sm:p-8 lg:p-10">
        <span className="eyebrow border-slate-200 bg-white text-fim-blue">
          Questions fréquentes
        </span>
        <div className="mt-5 grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <h2 className="section-title">Les réponses clés avant de vous inscrire.</h2>
            <p className="section-copy mt-5">
              Les informations essentielles pour réserver votre place en toute
              simplicité et préparer votre venue pendant la Foire Internationale de Madagascar.
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
