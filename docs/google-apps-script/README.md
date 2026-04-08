# Google Apps Script

Ce dossier contient un exemple complet de Web App Google Apps Script à brancher sur la landing page.

## Étapes de configuration

1. Créez un Google Sheet dédié aux inscriptions.
2. Copiez l'identifiant du fichier dans l'URL du tableur.
3. Ouvrez Apps Script depuis ce Google Sheet.
4. Collez le contenu de `Code.gs` dans votre projet Apps Script.
5. Remplacez les constantes suivantes :
   - `SPREADSHEET_ID`
   - `SHEET_NAME`
   - `SUPPORT_EMAIL`
   - `SPEED_RECRUITING_CONTACT_EMAIL`
   - `ADMIN_NOTIFICATION_EMAILS`
6. Déployez le script en tant que `Web app`.
7. Choisissez `Exécuter en tant que : Moi`.
8. Choisissez `Qui a accès : Toute personne disposant du lien`.
9. Copiez l'URL de déploiement dans `NEXT_PUBLIC_APPS_SCRIPT_URL`.

## Pourquoi le frontend envoie `text/plain`

Le frontend envoie un JSON brut avec le header `Content-Type: text/plain;charset=utf-8`.
Cette approche évite le préflight CORS qui pose souvent problème avec les Web Apps Google Apps Script appelées directement depuis un navigateur.

## Colonnes créées automatiquement

Le script initialise la feuille avec les colonnes suivantes :

- Timestamp
- ID unique
- Nom
- Société
- Fonction
- Email
- Type participant
- Type session
- Session choisie
- Jour session
- Horaire session
- Lieu session
- Sujet proposé table ronde
- Souhaite recruter
- Postes recherchés
- Nombre de postes
- Profil recherché
- Fiche de poste à transmettre
- Présence
- Commentaire
- QR / check-in futur
- Source

## Personnalisation rapide

- Adaptez le contenu de `buildEmailContent_` pour reprendre votre ton officiel.
- Remplacez les emails de contact par les bonnes adresses FIM.
- Les notifications administrateur partent via `ADMIN_NOTIFICATION_EMAILS`.
- Pour une seule adresse admin, utilisez par exemple :
  `var ADMIN_NOTIFICATION_EMAILS = ["contact@fim.mg"];`
- Pour plusieurs administrateurs :
  `var ADMIN_NOTIFICATION_EMAILS = ["contact@fim.mg", "rh@fim.mg"];`
- Ajoutez ensuite un traitement QR/check-in en réutilisant `registrationId`.
