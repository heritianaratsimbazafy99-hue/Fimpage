"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { LoaderCircle, Send, Sparkles } from "lucide-react";
import { CTAButton } from "@/components/cta-button";
import { SuccessState } from "@/components/success-state";
import {
  buildRegistrationPayload,
  createInitialRegistrationForm,
  hasAppsScriptEndpoint,
  submitRegistration,
  validateRegistrationForm,
} from "@/lib/registration";
import type {
  RegistrationErrors,
  RegistrationFormValues,
  Session,
  SubmissionResult,
} from "@/lib/types";

type RegistrationFormProps = {
  sessions: Session[];
  selectedSession: Session | null;
  onSessionChange: (sessionId: string | null) => void;
};

type SuccessfulSubmission = {
  result: SubmissionResult;
  session: Session;
  participantName: string;
  participantEmail: string;
};

type FieldProps = {
  label: string;
  name: string;
  children: ReactNode;
  error?: string;
  hint?: string;
};

function Field({ label, name, children, error, hint }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-800">{label}</span>
      {children}
      {hint ? <p className="mt-2 text-xs text-slate-500">{hint}</p> : null}
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </label>
  );
}

const inputClasses =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-fim-blue focus:ring-4 focus:ring-fim-blue/10";

export function RegistrationForm({
  sessions,
  selectedSession,
  onSessionChange,
}: RegistrationFormProps) {
  const [formValues, setFormValues] = useState<RegistrationFormValues>(() =>
    createInitialRegistrationForm(selectedSession),
  );
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [submission, setSubmission] = useState<SuccessfulSubmission | null>(null);

  useEffect(() => {
    if (!selectedSession) return;

    setFormValues((current) => ({
      ...current,
      typeSession: selectedSession.type,
      sessionId: selectedSession.id,
      souhaiteRecruter:
        selectedSession.type === "Speed recruiting"
          ? current.souhaiteRecruter || "Oui"
          : current.souhaiteRecruter,
    }));
    setErrors((current) => ({
      ...current,
      typeSession: undefined,
      sessionId: undefined,
    }));
  }, [selectedSession]);

  const visibleSessions = sessions.filter((session) =>
    formValues.typeSession ? session.type === formValues.typeSession : true,
  );
  const selectedSessionFromForm =
    sessions.find((session) => session.id === formValues.sessionId) ?? null;

  function updateField<Key extends keyof RegistrationFormValues>(
    field: Key,
    value: RegistrationFormValues[Key],
  ) {
    setFormValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleTypeSessionChange(value: RegistrationFormValues["typeSession"]) {
    setServerError("");
    setFormValues((current) => ({
      ...current,
      typeSession: value,
      sessionId:
        current.sessionId &&
        sessions.find(
          (session) => session.id === current.sessionId && session.type === value,
        )
          ? current.sessionId
          : "",
      souhaiteRecruter: value === "Speed recruiting" ? current.souhaiteRecruter || "Oui" : "",
      postesRecherches: value === "Speed recruiting" ? current.postesRecherches : "",
      nombrePostes: value === "Speed recruiting" ? current.nombrePostes : "",
      profilRecherche: value === "Speed recruiting" ? current.profilRecherche : "",
      fichePoste: value === "Speed recruiting" ? current.fichePoste : "",
      sujetTableRonde: value === "Table ronde" ? current.sujetTableRonde : "",
    }));

    if (!value || selectedSession?.type !== value) {
      onSessionChange(null);
    }
  }

  function handleSessionSelection(sessionId: string) {
    const nextSession = sessions.find((session) => session.id === sessionId) ?? null;
    updateField("sessionId", sessionId);

    if (nextSession) {
      updateField("typeSession", nextSession.type);
      if (nextSession.type === "Speed recruiting" && !formValues.souhaiteRecruter) {
        updateField("souhaiteRecruter", "Oui");
      }
    }

    onSessionChange(nextSession?.id ?? null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError("");

    const validationErrors = validateRegistrationForm(formValues, sessions);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = buildRegistrationPayload(formValues, sessions);
      const result = await submitRegistration(payload);

      if (!selectedSessionFromForm) {
        throw new Error("La session sélectionnée est introuvable.");
      }

      setSubmission({
        result,
        session: selectedSessionFromForm,
        participantName: formValues.nom,
        participantEmail: formValues.email,
      });
      setFormValues(createInitialRegistrationForm(selectedSessionFromForm));
      setErrors({});
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Une erreur inattendue s'est produite lors de l'inscription.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submission) {
    return (
      <section id="inscription" className="section-shell py-16 sm:py-20">
        <SuccessState
          result={submission.result}
          session={submission.session}
          participantName={submission.participantName}
          participantEmail={submission.participantEmail}
          onReset={() => {
            setSubmission(null);
            setServerError("");
          }}
        />
      </section>
    );
  }

  return (
    <section id="inscription" className="section-shell py-16 sm:py-20">
      <div className="overflow-hidden rounded-[2.5rem] bg-slate-950 text-white shadow-spotlight">
        <div className="grid lg:grid-cols-[0.86fr_1.14fr]">
          <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,106,43,0.28),_transparent_36%),linear-gradient(180deg,_#08214a,_#041329)] px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div className="absolute -right-16 top-12 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -left-10 bottom-12 h-40 w-40 rounded-full bg-fim-orange/20 blur-3xl" />

            <div className="relative">
              <span className="eyebrow">
                <Sparkles className="h-4 w-4" />
                Formulaire d&apos;inscription
              </span>
              <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
                Confirmez votre participation en quelques instants.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-100/80">
                Sélectionnez votre session, complétez vos coordonnées et validez
                votre inscription. Un email de confirmation vous sera adressé
                après enregistrement.
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-fim-mist">
                    Session sélectionnée
                  </p>
                  {selectedSessionFromForm ? (
                    <>
                      <p className="mt-3 text-2xl font-semibold">
                        {selectedSessionFromForm.title}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-100/75">
                        {selectedSessionFromForm.dayLabel} · {selectedSessionFromForm.time} ·{" "}
                        {selectedSessionFromForm.location}
                      </p>
                    </>
                  ) : (
                      <p className="mt-3 text-base leading-7 text-slate-100/75">
                      Choisissez votre session depuis le programme ou
                      sélectionnez directement le créneau souhaité dans le
                      formulaire.
                    </p>
                  )}
                </div>

                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-fim-mist">
                    Après validation
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-100/75">
                    <li>Votre demande d’inscription est enregistrée.</li>
                    <li>Un email de confirmation vous est envoyé.</li>
                    <li>L’équipe peut vous recontacter si nécessaire.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white px-6 py-8 text-slate-950 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div className="mb-6 flex flex-col gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  Inscription en ligne
                </p>
                <p className="text-sm text-slate-500">
                  Les champs évoluent selon le type de session choisi.
                </p>
              </div>
              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                Confirmation par email
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Nom" name="nom" error={errors.nom}>
                  <input
                    value={formValues.nom}
                    onChange={(event) => updateField("nom", event.target.value)}
                    className={inputClasses}
                    name="nom"
                    placeholder="Votre nom complet"
                  />
                </Field>

                <Field label="Société" name="societe" error={errors.societe}>
                  <input
                    value={formValues.societe}
                    onChange={(event) => updateField("societe", event.target.value)}
                    className={inputClasses}
                    name="societe"
                    placeholder="Entreprise / structure"
                  />
                </Field>

                <Field label="Fonction" name="fonction" error={errors.fonction}>
                  <input
                    value={formValues.fonction}
                    onChange={(event) => updateField("fonction", event.target.value)}
                    className={inputClasses}
                    name="fonction"
                    placeholder="Ex. Responsable RH"
                  />
                </Field>

                <Field label="Email" name="email" error={errors.email}>
                  <input
                    type="email"
                    value={formValues.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    className={inputClasses}
                    name="email"
                    placeholder="vous@entreprise.com"
                  />
                </Field>

                <Field
                  label="Type de participant"
                  name="typeParticipant"
                  error={errors.typeParticipant}
                >
                  <select
                    value={formValues.typeParticipant}
                    onChange={(event) =>
                      updateField(
                        "typeParticipant",
                        event.target.value as RegistrationFormValues["typeParticipant"],
                      )
                    }
                    className={inputClasses}
                    name="typeParticipant"
                  >
                    <option value="Visiteur">Visiteur</option>
                    <option value="Exposant">Exposant</option>
                  </select>
                </Field>

                <Field
                  label="Type de session"
                  name="typeSession"
                  error={errors.typeSession}
                >
                  <select
                    value={formValues.typeSession}
                    onChange={(event) =>
                      handleTypeSessionChange(
                        event.target.value as RegistrationFormValues["typeSession"],
                      )
                    }
                    className={inputClasses}
                    name="typeSession"
                  >
                    <option value="">Choisir un format</option>
                    <option value="Atelier">Atelier</option>
                    <option value="Conférence">Conférence</option>
                    <option value="Table ronde">Table ronde</option>
                    <option value="Speed recruiting">Speed recruiting</option>
                  </select>
                </Field>
              </div>

              <Field
                label="Session choisie"
                name="sessionId"
                error={errors.sessionId}
                hint="Choisissez le créneau que vous souhaitez réserver."
              >
                <select
                  value={formValues.sessionId}
                  onChange={(event) => handleSessionSelection(event.target.value)}
                  className={inputClasses}
                  name="sessionId"
                >
                  <option value="">Sélectionner une session</option>
                  {visibleSessions.map((session) => (
                    <option key={session.id} value={session.id}>
                      {session.dayKey} · {session.time} · {session.title}
                    </option>
                  ))}
                </select>
              </Field>

              {formValues.typeSession === "Table ronde" ? (
                <Field
                  label="Voulez-vous proposer un sujet / une thématique ?"
                  name="sujetTableRonde"
                  error={errors.sujetTableRonde}
                >
                  <textarea
                    value={formValues.sujetTableRonde}
                    onChange={(event) =>
                      updateField("sujetTableRonde", event.target.value)
                    }
                    className={`${inputClasses} min-h-[120px] resize-y`}
                    name="sujetTableRonde"
                    placeholder="Optionnel: partagez la thématique que vous aimeriez voir abordée."
                  />
                </Field>
              ) : null}

              {formValues.typeSession === "Speed recruiting" ? (
                <div className="grid gap-5 rounded-[1.75rem] border border-emerald-100 bg-emerald-50/60 p-5 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
                      Informations complémentaires speed recruiting
                    </p>
                  </div>

                  <Field
                    label="Souhaitez-vous recruter ?"
                    name="souhaiteRecruter"
                    error={errors.souhaiteRecruter}
                  >
                    <select
                      value={formValues.souhaiteRecruter}
                      onChange={(event) =>
                        updateField(
                          "souhaiteRecruter",
                          event.target.value as RegistrationFormValues["souhaiteRecruter"],
                        )
                      }
                      className={inputClasses}
                      name="souhaiteRecruter"
                    >
                      <option value="">Choisir</option>
                      <option value="Oui">Oui</option>
                      <option value="Non">Non</option>
                    </select>
                  </Field>

                  <Field
                    label="Souhaitez-vous transmettre une fiche de poste ?"
                    name="fichePoste"
                    error={errors.fichePoste}
                  >
                    <select
                      value={formValues.fichePoste}
                      onChange={(event) =>
                        updateField(
                          "fichePoste",
                          event.target.value as RegistrationFormValues["fichePoste"],
                        )
                      }
                      className={inputClasses}
                      name="fichePoste"
                    >
                      <option value="">Choisir</option>
                      <option value="Oui">Oui</option>
                      <option value="Non">Non</option>
                    </select>
                  </Field>

                  <Field
                    label="Quels postes recherchez-vous ?"
                    name="postesRecherches"
                    error={errors.postesRecherches}
                  >
                    <input
                      value={formValues.postesRecherches}
                      onChange={(event) =>
                        updateField("postesRecherches", event.target.value)
                      }
                      className={inputClasses}
                      name="postesRecherches"
                      placeholder="Ex. commerciaux, techniciens, RH"
                    />
                  </Field>

                  <Field
                    label="Nombre de postes"
                    name="nombrePostes"
                    error={errors.nombrePostes}
                  >
                    <input
                      value={formValues.nombrePostes}
                      onChange={(event) =>
                        updateField("nombrePostes", event.target.value)
                      }
                      className={inputClasses}
                      name="nombrePostes"
                      placeholder="Ex. 3"
                    />
                  </Field>

                  <div className="md:col-span-2">
                    <Field
                      label="Profil recherché"
                      name="profilRecherche"
                      error={errors.profilRecherche}
                    >
                      <textarea
                        value={formValues.profilRecherche}
                        onChange={(event) =>
                          updateField("profilRecherche", event.target.value)
                        }
                        className={`${inputClasses} min-h-[120px] resize-y`}
                        name="profilRecherche"
                        placeholder="Compétences, expérience, niveau, disponibilité, langues, etc."
                      />
                    </Field>
                  </div>
                </div>
              ) : null}

              {serverError ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {serverError}
                </div>
              ) : null}

              {!hasAppsScriptEndpoint ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  Le projet fonctionne déjà visuellement. Pour activer le flux
                  réel Google Sheets + email, ajoutez la variable{" "}
                  <code className="font-semibold">NEXT_PUBLIC_APPS_SCRIPT_URL</code>.
                </div>
              ) : null}

              <CTAButton
                type="submit"
                size="lg"
                className="w-full gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer mon inscription
                    <Send className="h-4 w-4" />
                  </>
                )}
              </CTAButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
