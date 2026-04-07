var SPREADSHEET_ID = "REPLACE_WITH_SPREADSHEET_ID";
var SHEET_NAME = "Inscriptions";
var EVENT_NAME = "FIM 2026";
var EVENT_LOCATION = "CCI Ivato, Antananarivo";
var SUPPORT_EMAIL = "inscription@fim.mg";
var SPEED_RECRUITING_CONTACT_EMAIL = "recrutement@fim.mg";

var SHEET_HEADERS = [
  "Timestamp",
  "ID unique",
  "Nom",
  "Société",
  "Fonction",
  "Email",
  "Type participant",
  "Type session",
  "Session choisie",
  "Jour session",
  "Horaire session",
  "Lieu session",
  "Sujet proposé table ronde",
  "Souhaite recruter",
  "Postes recherchés",
  "Nombre de postes",
  "Profil recherché",
  "Fiche de poste à transmettre",
  "Présence",
  "Commentaire",
  "QR / check-in futur",
  "Source",
];

function doGet() {
  return jsonOutput_({
    success: true,
    message: "FIM registration endpoint ready",
  });
}

function doPost(e) {
  try {
    var payload = parsePayload_(e);
    validatePayload_(payload);

    var sheet = getOrCreateSheet_();
    ensureHeaders_(sheet);

    var now = new Date();
    var registrationId = buildRegistrationId_(now);

    appendRegistration_(sheet, payload, registrationId, now);
    sendConfirmationEmail_(payload, registrationId);

    return jsonOutput_({
      success: true,
      registrationId: registrationId,
      message:
        "Votre inscription a bien été enregistrée. Un email de confirmation vient d'être envoyé.",
    });
  } catch (error) {
    return jsonOutput_({
      success: false,
      message:
        error && error.message
          ? error.message
          : "Une erreur est survenue lors du traitement de l'inscription.",
    });
  }
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error("Aucune donnée reçue.");
  }

  var payload = JSON.parse(e.postData.contents);

  return {
    nom: sanitizeString_(payload.nom),
    societe: sanitizeString_(payload.societe),
    fonction: sanitizeString_(payload.fonction),
    email: sanitizeString_(payload.email).toLowerCase(),
    typeParticipant: sanitizeString_(payload.typeParticipant),
    typeSession: sanitizeString_(payload.typeSession),
    session: sanitizeString_(payload.session),
    sessionId: sanitizeString_(payload.sessionId),
    sessionJour: sanitizeString_(payload.sessionJour),
    sessionHoraire: sanitizeString_(payload.sessionHoraire),
    sessionLieu: sanitizeString_(payload.sessionLieu),
    sujetTableRonde: sanitizeString_(payload.sujetTableRonde),
    souhaiteRecruter: sanitizeString_(payload.souhaiteRecruter),
    postesRecherches: sanitizeString_(payload.postesRecherches),
    nombrePostes: sanitizeString_(payload.nombrePostes),
    profilRecherche: sanitizeString_(payload.profilRecherche),
    fichePoste: sanitizeString_(payload.fichePoste),
    source: sanitizeString_(payload.source),
  };
}

function validatePayload_(payload) {
  var requiredFields = [
    ["nom", "Le nom est requis."],
    ["societe", "La société est requise."],
    ["fonction", "La fonction est requise."],
    ["email", "L'email est requis."],
    ["typeParticipant", "Le type de participant est requis."],
    ["typeSession", "Le type de session est requis."],
    ["session", "La session choisie est requise."],
    ["sessionId", "L'identifiant de session est requis."],
  ];

  for (var i = 0; i < requiredFields.length; i += 1) {
    var fieldName = requiredFields[i][0];
    var errorMessage = requiredFields[i][1];

    if (!payload[fieldName]) {
      throw new Error(errorMessage);
    }
  }

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(payload.email)) {
    throw new Error("L'adresse email fournie n'est pas valide.");
  }

  if (payload.typeSession === "Speed recruiting" && !payload.souhaiteRecruter) {
    throw new Error("Le champ 'Souhaitez-vous recruter ?' est requis.");
  }

  if (payload.typeSession === "Speed recruiting" && payload.souhaiteRecruter === "Oui") {
    if (!payload.postesRecherches || !payload.nombrePostes || !payload.profilRecherche) {
      throw new Error(
        "Les besoins de recrutement doivent être précisés pour le speed recruiting.",
      );
    }
  }
}

function getOrCreateSheet_() {
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  return sheet;
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(SHEET_HEADERS);
    return;
  }

  var headerRange = sheet.getRange(1, 1, 1, SHEET_HEADERS.length);
  var currentHeaders = headerRange.getValues()[0];

  if (currentHeaders.join("||") !== SHEET_HEADERS.join("||")) {
    headerRange.setValues([SHEET_HEADERS]);
  }
}

function appendRegistration_(sheet, payload, registrationId, now) {
  sheet.appendRow([
    now,
    registrationId,
    payload.nom,
    payload.societe,
    payload.fonction,
    payload.email,
    payload.typeParticipant,
    payload.typeSession,
    payload.session,
    payload.sessionJour,
    payload.sessionHoraire,
    payload.sessionLieu,
    payload.sujetTableRonde,
    payload.souhaiteRecruter,
    payload.postesRecherches,
    payload.nombrePostes,
    payload.profilRecherche,
    payload.fichePoste,
    "",
    "",
    registrationId,
    payload.source || "fim-landing-v1",
  ]);
}

function buildRegistrationId_(now) {
  var timezone = Session.getScriptTimeZone() || "Indian/Antananarivo";
  var stamp = Utilities.formatDate(now, timezone, "yyyyMMdd-HHmmss");
  var shortUuid = Utilities.getUuid().split("-")[0].toUpperCase();
  return "FIM-" + stamp + "-" + shortUuid;
}

function sendConfirmationEmail_(payload, registrationId) {
  var emailContent = buildEmailContent_(payload, registrationId);

  GmailApp.sendEmail(payload.email, emailContent.subject, emailContent.textBody, {
    htmlBody: emailContent.htmlBody,
    name: EVENT_NAME,
    replyTo: SUPPORT_EMAIL,
  });
}

function buildEmailContent_(payload, registrationId) {
  var isSpeedRecruiting = payload.typeSession === "Speed recruiting";
  var subject = isSpeedRecruiting
    ? EVENT_NAME + " - Confirmation de votre inscription speed recruiting"
    : EVENT_NAME + " - Confirmation de votre inscription";

  var speedText =
    isSpeedRecruiting
      ? "\n\nPour préparer le speed recruiting, vous pouvez transmettre vos besoins de recrutement ou vos fiches de poste à " +
        SPEED_RECRUITING_CONTACT_EMAIL +
        "."
      : "";

  var textBody =
    "Bonjour " +
    payload.nom +
    ",\n\n" +
    "Votre inscription a bien été enregistrée pour la session suivante :\n" +
    "- Session : " +
    payload.session +
    "\n" +
    "- Jour : " +
    payload.sessionJour +
    "\n" +
    "- Horaire : " +
    payload.sessionHoraire +
    "\n" +
    "- Lieu : " +
    payload.sessionLieu +
    "\n" +
    "- Référence : " +
    registrationId +
    "\n\n" +
    "Lieu de l'événement : " +
    EVENT_LOCATION +
    "\n" +
    "Support : " +
    SUPPORT_EMAIL +
    speedText +
    "\n\nÀ très bientôt,\nL'équipe " +
    EVENT_NAME;

  var speedHtml = isSpeedRecruiting
    ? '<p style="margin:24px 0 0;color:#0f172a;font-size:15px;line-height:1.7;">Pour préparer le speed recruiting, vous pouvez transmettre vos besoins de recrutement ou vos fiches de poste à <a href="mailto:' +
      SPEED_RECRUITING_CONTACT_EMAIL +
      '" style="color:#0d4ba6;font-weight:600;text-decoration:none;">' +
      SPEED_RECRUITING_CONTACT_EMAIL +
      "</a>.</p>"
    : "";

  var htmlBody =
    '<div style="font-family:Aptos,Segoe UI,sans-serif;background:#f8f4ee;padding:32px;">' +
    '<div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #e5e7eb;">' +
    '<div style="padding:28px 32px;background:linear-gradient(135deg,#08214a,#0d4ba6);color:#ffffff;">' +
    '<p style="margin:0;font-size:12px;letter-spacing:0.3em;text-transform:uppercase;opacity:0.72;">' +
    EVENT_NAME +
    "</p>" +
    '<h1 style="margin:12px 0 0;font-size:30px;line-height:1.1;">Inscription confirmée</h1>' +
    "</div>" +
    '<div style="padding:28px 32px;color:#0f172a;">' +
    "<p style=\"margin:0 0 18px;font-size:16px;line-height:1.7;\">Bonjour " +
    payload.nom +
    ", votre inscription a bien été enregistrée.</p>" +
    '<div style="border:1px solid #e2e8f0;border-radius:18px;padding:18px 20px;background:#f8fafc;">' +
    '<p style="margin:0 0 10px;font-weight:700;">' +
    payload.session +
    "</p>" +
    '<p style="margin:0;font-size:14px;line-height:1.8;color:#475569;">' +
    payload.sessionJour +
    " · " +
    payload.sessionHoraire +
    " · " +
    payload.sessionLieu +
    "</p>" +
    '<p style="margin:12px 0 0;font-size:14px;line-height:1.8;color:#475569;">Référence : <strong>' +
    registrationId +
    "</strong></p>" +
    "</div>" +
    '<p style="margin:24px 0 0;font-size:15px;line-height:1.7;color:#334155;">Lieu de l’événement : ' +
    EVENT_LOCATION +
    "<br>Support : " +
    SUPPORT_EMAIL +
    "</p>" +
    speedHtml +
    '<p style="margin:24px 0 0;font-size:15px;line-height:1.7;color:#334155;">À très bientôt,<br>L’équipe ' +
    EVENT_NAME +
    "</p>" +
    "</div></div></div>";

  return {
    subject: subject,
    textBody: textBody,
    htmlBody: htmlBody,
  };
}

function jsonOutput_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function sanitizeString_(value) {
  return value ? String(value).trim() : "";
}

