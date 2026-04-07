# FIM Registration Landing Page

Landing page d'inscription moderne pour la Foire Internationale de Madagascar, construite avec Next.js, Tailwind CSS et une intégration légère prévue vers Google Sheets via Google Apps Script.

## Ce que le projet contient

- une one-page responsive orientée inscription
- un programme visuel avec cartes sessions
- un formulaire sur mesure avec logique conditionnelle
- un mode démonstration local si l'URL Apps Script n'est pas encore branchée
- un exemple complet de script Google Apps Script pour Google Sheets + GmailApp

## Stack

- Next.js App Router
- React
- Tailwind CSS
- Déploiement cible : Vercel
- Backend léger cible : Google Apps Script Web App

## Lancer le projet

```bash
npm install
npm run dev
```

Le site sera disponible sur `http://localhost:3000`.

## Variables d'environnement

Créez un fichier `.env.local` à partir de `.env.example` :

```bash
cp .env.example .env.local
```

Puis remplacez :

```env
NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/REPLACE_WITH_YOUR_WEB_APP_ID/exec
```

Tant que cette variable n'est pas définie, le formulaire reste utilisable en mode démo visuel.

## Structure utile

- `app/page.tsx` : point d'entrée de la page
- `components/` : sections et composants UI réutilisables
- `data/sessions.ts` : données mock élégantes, déjà proches du programme réel
- `lib/registration.ts` : validation et soumission vers Apps Script
- `docs/google-apps-script/Code.gs` : script backend léger prêt à adapter

## Adaptation aux contenus finaux

Le projet a été structuré pour remplacer facilement les données mock par vos contenus réels :

- remplacez les sessions dans `data/sessions.ts`
- ajoutez vos logos, liens et contacts officiels
- ajustez les textes du hero et des blocs d'information
- injectez ensuite les données issues de votre fichier Excel ou d'une version nettoyée

Une partie du programme actuel a déjà été inspirée du fichier Excel fourni :

- conférences / workshops
- tables rondes
- speed recruiting
- ateliers Smilebox

## Google Apps Script

Les instructions détaillées se trouvent ici :

- `docs/google-apps-script/README.md`
- `docs/google-apps-script/Code.gs`

## Déploiement Vercel

Le projet est prêt pour un déploiement classique :

```bash
npm run build
```

Ensuite :

1. importez le repo sur Vercel
2. configurez `NEXT_PUBLIC_APPS_SCRIPT_URL`
3. reliez le projet à votre futur sous-domaine, par exemple `inscription.fim.mg`

