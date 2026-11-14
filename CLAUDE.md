# Notes du projet (à lire au début de chaque session)

## Qui et pourquoi

- Hamdi, étudiant à Djibouti, développeur web débutant (HTML, CSS, JS, React, TypeScript avec Vite).
  Travaille en **français**. Veut **comprendre le code** : expliquer simplement chaque choix.
- Objectif : décrocher des missions web payées auprès de commerces de Djibouti, puis en freelance
  (Upwork, Fiverr, Malt). Modèle visé : site + fiche Google + **abonnement mensuel** (revenus récurrents).
- Les démos envoient les commandes au numéro professionnel de Hamdi (voir `config.ts` de chaque projet).
- Branche de travail : `claude/bonsoir-dfiqdz` (ne pas toucher `main`). Un commit par étape, puis push.
- Sur son PC (Windows, Git Bash / VS Code) : `git pull`, puis `npm install`, puis `npm run dev`.

## Règles de style décidées avec Hamdi

- **Pas de design générique « fait par une IA »** : pas de slogans vides, pas d'emojis décoratifs,
  pas de pastilles partout, pas d'animations partout (un seul moment fort par page).
- Textes concrets, tirés des **vrais faits** du commerce. Une seule voix : « **nous** ».
- Jamais de faux avis, de produits inventés présentés comme réels, ni de liens morts.
- Pensé téléphone d'abord, accessible (clavier, contrastes, `prefers-reduced-motion`), léger (WebP).
- CSS simple (pas Tailwind), Motion (`motion/react`) pour les animations.

## Projet 1 : `hanscake/` (pâtisserie Han'sCake) · le plus avancé

Faits vérifiés :
- Pâtisserie & Café, **deux boutiques** : rue de Rome et Cité Saoudi (inaugurée le 15 mai 2022).
- Instagram : @hanscake.cafeteria. Téléphone boutique : +253 77 52 52 93.
- Vrai métier : **gâteaux personnalisés en pâte à sucre** (héros d'enfants, prénom, âge),
  mariages à étages, 40e jour, diplômes, douceurs de l'Aïd.
- Règles (conversation WhatsApp réelle) : 8 parts minimum à 3 500 FDJ, commande la veille,
  paiement CAC + capture d'écran, carton fourni, pas de bougies chiffres, pas de fondant au chocolat.
- Le gâteau « chocolat perles dorées » (photo « Diwali ») est **à eux** : seul prix vérifié (8 parts, 3 500 FDJ).
- **Ne jamais publier leur numéro CAC.**

Le site :
- Deux versions : **Rétro** par défaut (arc 3D de leurs gâteaux), **Cinéma** avec `?version=cinema`
  (film, qui n'est PAS tourné chez eux).
- Sections : galerie par occasion (« Je veux celui-ci »), « Dans notre frigo aujourd'hui »,
  calculateur de parts, vitrine en ardoise, boîte de trois, « Bon à savoir », boutiques (ouvert/fermé,
  Google Maps), contacts avec icônes, bulle « Un gâteau pour quand ? », aperçu du message WhatsApp.
- Photos recadrées depuis leur Instagram (accord à demander avant mise en ligne publique).
- `config.whatsappCommandes` = numéro de Hamdi pendant la démo ; remettre `25377525293` pour le vrai site.
- À confirmer avec eux : noms et prix des gâteaux, horaires, adresse Cité Saoudi, liens Facebook/TikTok, logo.

Prospection : Han'sCake n'a pas acheté, mais **a accepté que Hamdi montre le site comme exemple** (portfolio, prospection) : c'est aussi une publicité pour eux.

## Projet 2 : `diva-salon/` (salon de beauté)

- Faits vérifiés : **réservé aux femmes**, au **Bawadi Mall**, Instagram @divasalondjibouti (~1 500 abonnés), Facebook « Diva Salon ».
- Identité : prune, henné, or ; titres Gloock ; motif de henné qui se dessine à l'ouverture.
- Sections : prestations à réserver d'un toucher, réalisations par thème (« Je veux ce style »),
  demande de rendez-vous (jour + matin / après-midi / fin de journée), aperçu WhatsApp, bon à savoir, salon.
- Manque : **photos** (Hamdi doit envoyer des captures de leur Instagram), liste exacte des prestations,
  horaires, téléphone. Aucun prix affiché volontairement.

## Projet 3 : `portfolio/` (portfolio de Hamdi)

- Scène 3D (Three.js via @react-three/fiber) : étoiles, mer de nuages, poussière, caméra pilotée par le défilement (Lenis).
- Intro : « PORTFOLIO » en particules dorées → « HAMDI ». Noir bleuté + or pâle ; Instrument Serif, Inter, JetBrains Mono.
- Faites : étapes 1 et 2. À venir : accueil + photo, manifeste, projets (Han'sCake, Diva Salon), compétences,
  parcours, contact. Chiffres et certifications : uniquement des vrais.
- Contenu dans `src/data.ts`. Téléphone : particules ÷ 3, sans effets lourds.

## Autres prospects repérés (à vérifier avant contact)

- Pâtisseries : Sweet Home Bakery (@shbakery_253), La Maison Sucrée (Facebook), L'Ô Délices, Le Fournil, Le Moulin.
- Restaurants : L'Atypique (@atypique_djibouti). Concurrence à connaître : DJIBMENU (menus), BALAAN (réservation).
- Restaurants connus (à vérifier : site ? Instagram ?) : La Chaumière (place du 27-Juin), Chez Marco, Les Sept Frères (yéménite), Janateyn, Sushi-Do, Allo Pizza (livraison). Exclu : Melting Pot (a un site, meltingpotdj.com).
- Salles de sport : Moulk Center, Olympus Gym. Traiteurs : demander des recommandations à Han'sCake.
- Exclus (ont déjà un site) : Bunna House, Naan-STOP.

## Prochaines étapes

1. Restaurants : vérifier les candidats, choisir le premier, adapter une démo (carte + commande/réservation WhatsApp).
2. Diva Salon : récupérer les photos, puis préparer l'aperçu et le message.
3. Offre écrite : `offre/offre.md` (3 formules 35 000 / 60 000 / 100 000 FDJ, 3 abonnements 2 500 / 5 000 / 15 000 FDJ). Reste : version image une page pour WhatsApp.
