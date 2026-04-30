export type SessionType =
  | "Atelier"
  | "Conférence"
  | "Table ronde"
  | "Speed recruiting";

export interface Session {
  id: string;
  slug: string;
  type: SessionType;
  dayKey: "Jeudi" | "Vendredi" | "Samedi" | "Dimanche";
  dayLabel: string;
  dateIso: string;
  time: string;
  title: string;
  description: string;
  location: string;
  host: string;
  speaker?: string;
  details?: string[];
  audience: string;
  capacityNote: string;
}

export interface RegistrationFormValues {
  nom: string;
  societe: string;
  fonction: string;
  email: string;
  typeParticipant: "Visiteur" | "Exposant";
  typeSession: SessionType | "";
  sessionId: string;
  sujetTableRonde: string;
  souhaiteRecruter: "Oui" | "Non" | "";
  postesRecherches: string;
  nombrePostes: string;
  profilRecherche: string;
  fichePoste: "Oui" | "Non" | "";
  chercheUnPoste: "Oui" | "Non" | "";
  cvATransmettre: "Oui" | "Non" | "";
  postesCherchesVisiteur: string;
  informationComplementaire: string;
}

export interface RegistrationPayload {
  nom: string;
  societe: string;
  fonction: string;
  email: string;
  typeParticipant: "Visiteur" | "Exposant";
  typeSession: SessionType;
  session: string;
  sessionId: string;
  sessionJour: string;
  sessionHoraire: string;
  sessionLieu: string;
  sujetTableRonde: string;
  souhaiteRecruter: string;
  postesRecherches: string;
  nombrePostes: string;
  profilRecherche: string;
  fichePoste: string;
  chercheUnPoste: string;
  cvATransmettre: string;
  postesCherchesVisiteur: string;
  informationComplementaire: string;
  source: string;
}

export interface SubmissionResult {
  success: boolean;
  registrationId: string;
  message: string;
  demoMode: boolean;
}

export type RegistrationErrors = Partial<Record<keyof RegistrationFormValues, string>>;
