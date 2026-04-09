import Image from "next/image";
import { ArrowDown, CalendarDays, Sparkles, Ticket } from "lucide-react";
import { BrandLockup } from "@/components/brand-lockup";
import { CTAButton } from "@/components/cta-button";

type HeroSectionProps = {
  onExploreProgram: () => void;
  onRegister: () => void;
};

export function HeroSection({
  onExploreProgram,
  onRegister,
}: HeroSectionProps) {
  return (
    <section className="section-shell pb-8 pt-6 sm:pb-10 sm:pt-8">
      <div className="mb-5 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-3 text-sm text-white/80 backdrop-blur lg:flex-row lg:items-center lg:justify-between lg:p-4">
        <BrandLockup priority className="lg:max-w-[42rem]" />

        <div className="flex flex-col gap-3 lg:items-end">
          <p className="px-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
            Plateforme officielle d&apos;inscription
          </p>
          <nav className="flex flex-wrap gap-2 text-sm">
            <CTAButton href="#programme" variant="secondary" size="md">
              Programme
            </CTAButton>
            <CTAButton href="#inscription" variant="secondary" size="md">
              Inscription
            </CTAButton>
            <CTAButton href="#faq" variant="secondary" size="md">
              FAQ
            </CTAButton>
          </nav>
        </div>
      </div>

      <div className="mb-5 flex items-start gap-3 rounded-[1.75rem] border border-fim-orange/25 bg-gradient-to-r from-fim-orange/18 via-white/8 to-transparent px-4 py-4 text-sm text-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.12)] backdrop-blur sm:items-center sm:px-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/14 text-fim-orange">
          <Ticket className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-fim-mist/85">
            Information participation
          </p>
          <p className="mt-1 text-sm leading-6 text-white/90 sm:text-[0.96rem]">
            La participation aux ateliers, aux conférences et aux tables rondes est
            <span className="font-semibold text-white"> gratuite</span> une
            fois votre entrée à la FIM effectuée.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-fim-ink shadow-spotlight">
        <Image
          src="/images/fim-poster.jpg"
          alt="Affiche FIM 2026 Madagascar en mouvement"
          fill
          priority
          className="object-cover object-center opacity-30 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-hero-mesh" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 grid-overlay opacity-15" />
        <div className="absolute -left-20 top-20 h-60 w-60 rounded-full bg-fim-orange/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />

        <div className="relative grid gap-10 px-6 py-12 sm:px-10 sm:py-14 lg:grid-cols-[1.12fr_0.88fr] lg:px-12 lg:py-16">
          <div className="flex flex-col justify-center">
            <span className="eyebrow mb-6 w-fit">
              <Sparkles className="h-4 w-4" />
              FIM 2026 · CCI Ivato
            </span>

            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.02] text-white sm:text-5xl lg:text-7xl">
              Inscription Ateliers, Conférences &amp; Tables Rondes FIM
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-100/90 sm:text-xl">
              Réservez votre place aux sessions proposées pendant la Foire
              Internationale de Madagascar du{" "}
              <span className="font-semibold text-white">
                7 au 10 mai 2026
              </span>
              . Découvrez le programme, choisissez vos temps forts et validez
              votre participation en quelques secondes.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton onClick={onExploreProgram} size="lg" className="gap-2">
                Voir le programme
                <ArrowDown className="h-4 w-4" />
              </CTAButton>
              <CTAButton onClick={onRegister} variant="secondary" size="lg">
                Je m&apos;inscris
              </CTAButton>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { value: "4 jours", label: "d’animations business et inspiration" },
                { value: "4 formats", label: "ateliers, conférences, tables rondes, speed recruiting" },
                { value: "Places limitées", label: "inscription conseillée selon les sessions" },
              ].map((item) => (
                <div
                  key={item.value}
                  className="rounded-[1.5rem] border border-white/10 bg-white/10 px-4 py-4 backdrop-blur"
                >
                  <p className="text-lg font-semibold text-white">{item.value}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-200/75">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-stretch lg:justify-end">
            <div className="glass-panel relative w-full overflow-hidden p-6 sm:p-7">
              <div className="absolute right-8 top-8 h-24 w-24 rounded-full border border-white/10 bg-white/5 blur-sm" />
              <div className="absolute bottom-8 left-8 h-28 w-28 animate-drift rounded-full bg-fim-orange/10 blur-3xl" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
                  <CalendarDays className="h-4 w-4 text-fim-orange" />
                  07 - 10 mai 2026
                </div>

                <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-200/60">
                    Informations clés
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-100/80">
                    <li>Sessions ouvertes pendant la FIM du 7 au 10 mai 2026 à la CCI Ivato.</li>
                    <li>Inscriptions accessibles aux visiteurs, exposants et recruteurs.</li>
                    <li>Ateliers, conférences et tables rondes gratuits après votre entrée à la FIM.</li>
                    <li>Confirmation envoyée par email après validation de votre demande.</li>
                  </ul>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-200/60">
                      Au programme
                    </p>
                    <p className="mt-3 text-xl font-semibold text-white">
                      Ateliers, conférences, tables rondes et speed recruiting
                    </p>
                  </div>
                  <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-200/60">
                      Participation
                    </p>
                    <p className="mt-3 text-xl font-semibold text-white">
                      Ateliers, conférences et tables rondes gratuits après entrée à la FIM
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-[1.75rem] border border-white/10 bg-gradient-to-r from-fim-orange/20 to-transparent p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-fim-mist">
                    Participation en ligne
                  </p>
                  <p className="mt-3 text-base leading-7 text-white/90">
                    Choisissez vos créneaux, complétez vos informations et
                    confirmez votre venue directement depuis cette page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
