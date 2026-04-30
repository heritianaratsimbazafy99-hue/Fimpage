import type {
  RegistrationErrors,
  RegistrationFormValues,
  RegistrationPayload,
  Session,
  SubmissionResult,
} from "@/lib/types";

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL?.trim() ?? "";

export const hasAppsScriptEndpoint = Boolean(APPS_SCRIPT_URL);

export function createInitialRegistrationForm(
  session?: Session | null,
): RegistrationFormValues {
  return {
    nom: "",
    societe: "",
    fonction: "",
    email: "",
    typeParticipant: "Visiteur",
    typeSession: session?.type ?? "",
    sessionId: session?.id ?? "",
    sujetTableRonde: "",
    souhaiteRecruter: "",
    postesRecherches: "",
    nombrePostes: "",
    profilRecherche: "",
    fichePoste: "",
    chercheUnPoste: "",
    cvATransmettre: "",
    postesCherchesVisiteur: "",
    informationComplementaire: "",
  };
}

export function validateRegistrationForm(
  values: RegistrationFormValues,
  sessions: Session[],
): RegistrationErrors {
  const errors: RegistrationErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const selectedSession = sessions.find((session) => session.id === values.sessionId);

  if (!values.nom.trim()) errors.nom = "Le nom est requis.";
  if (!values.societe.trim()) errors.societe = "La société est requise.";
  if (!values.fonction.trim()) errors.fonction = "La fonction est requise.";
  if (!values.email.trim()) {
    errors.email = "L'email est requis.";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Veuillez saisir un email valide.";
  }

  if (!values.typeSession) errors.typeSession = "Choisissez un type de session.";
  if (!values.sessionId) {
    errors.sessionId = "Sélectionnez une session.";
  } else if (!selectedSession) {
    errors.sessionId = "La session choisie n'est pas valide.";
  }

  if (
    values.typeSession &&
    selectedSession &&
    values.typeSession !== selectedSession.type
  ) {
    errors.sessionId = "La session ne correspond pas au type choisi.";
  }

  if (values.typeSession === "Speed recruiting" && !values.souhaiteRecruter) {
    if (values.typeParticipant === "Exposant") {
      errors.souhaiteRecruter = "Merci d'indiquer si vous recrutez.";
    }
  }

  if (
    values.typeSession === "Speed recruiting" &&
    values.typeParticipant === "Exposant" &&
    values.souhaiteRecruter === "Oui"
  ) {
    if (!values.postesRecherches.trim()) {
      errors.postesRecherches = "Précisez les postes recherchés.";
    }
    if (!values.nombrePostes.trim()) {
      errors.nombrePostes = "Indiquez le nombre de postes.";
    }
    if (!values.profilRecherche.trim()) {
      errors.profilRecherche = "Décrivez le profil recherché.";
    }
    if (!values.fichePoste) {
      errors.fichePoste = "Merci de préciser si vous transmettrez une fiche de poste.";
    }
  }

  if (values.typeSession === "Speed recruiting" && values.typeParticipant === "Visiteur") {
    if (!values.chercheUnPoste) {
      errors.chercheUnPoste = "Merci d'indiquer si vous cherchez un poste.";
    }

    if (values.chercheUnPoste === "Oui") {
      if (!values.cvATransmettre) {
        errors.cvATransmettre =
          "Merci d'indiquer si vous avez un curriculum vitae à transmettre.";
      }
      if (!values.postesCherchesVisiteur.trim()) {
        errors.postesCherchesVisiteur = "Précisez les postes que vous recherchez.";
      }
    }
  }

  return errors;
}

export function buildRegistrationPayload(
  values: RegistrationFormValues,
  sessions: Session[],
): RegistrationPayload {
  const selectedSession = sessions.find((session) => session.id === values.sessionId);

  if (!selectedSession || !values.typeSession) {
    throw new Error("Impossible de préparer l'inscription sans session valide.");
  }

  return {
    nom: values.nom.trim(),
    societe: values.societe.trim(),
    fonction: values.fonction.trim(),
    email: values.email.trim(),
    typeParticipant: values.typeParticipant,
    typeSession: values.typeSession,
    session: selectedSession.title,
    sessionId: selectedSession.id,
    sessionJour: selectedSession.dayLabel,
    sessionHoraire: selectedSession.time,
    sessionLieu: selectedSession.location,
    sujetTableRonde: values.sujetTableRonde.trim(),
    souhaiteRecruter: values.souhaiteRecruter,
    postesRecherches: values.postesRecherches.trim(),
    nombrePostes: values.nombrePostes.trim(),
    profilRecherche: values.profilRecherche.trim(),
    fichePoste: values.fichePoste,
    chercheUnPoste: values.chercheUnPoste,
    cvATransmettre: values.cvATransmettre,
    postesCherchesVisiteur: values.postesCherchesVisiteur.trim(),
    informationComplementaire: values.informationComplementaire.trim(),
    source: "fim-landing-v1",
  };
}

export async function submitRegistration(
  payload: RegistrationPayload,
): Promise<SubmissionResult> {
  if (!hasAppsScriptEndpoint) {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    return {
      success: true,
      registrationId: `DEMO-${Date.now().toString().slice(-6)}`,
      message:
        "Mode démonstration actif. Configurez NEXT_PUBLIC_APPS_SCRIPT_URL pour activer Google Sheets et l'email réel.",
      demoMode: true,
    };
  }

  const response = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  const rawResponse = await response.text();
  let parsedResponse: {
    success?: boolean;
    message?: string;
    registrationId?: string;
  } = {};

  try {
    parsedResponse = JSON.parse(rawResponse);
  } catch {
    throw new Error("Réponse Apps Script illisible. Vérifiez la Web App déployée.");
  }

  if (!response.ok || !parsedResponse.success) {
    throw new Error(
      parsedResponse.message ??
        "La soumission a échoué. Vérifiez la configuration du script Google.",
    );
  }

  return {
    success: true,
    registrationId: parsedResponse.registrationId ?? `INSCRIPTION-${Date.now()}`,
    message:
      parsedResponse.message ??
      "Votre inscription a bien été enregistrée. Un email de confirmation va vous être envoyé.",
    demoMode: false,
  };
}
