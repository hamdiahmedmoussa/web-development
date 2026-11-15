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

En ligne : https://web-development.hamdiahmedmoussa.workers.dev (Cloudflare Workers, construit depuis `main`,
dossier `hanscake`). Pour publier : fusionner la branche de travail dans `main`.

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

## Projets d'ingénierie : dépôt séparé `hamdiahmedmoussa/engineering-project`

- Branche de travail : **`claude/projets-ingenierie`** (contient tout ; `claude/drone-gestes` = ancienne).
- `compteur-energie/` : ESP32 + pince SCT-013-030, tableau de bord web servi par l'ESP32 (W, kWh, FDJ selon
  le tarif saisi), mode simulation, tests des calculs en C++. Pas encore compilé pour ESP32 (outils Arduino
  inaccessibles depuis cette session) : premier téléversement à faire par Hamdi. Suite prévue : PZEM-004T.
- `suivi-solaire/` : ESP32 + INA219 + DS18B20, production, perte due à la chaleur, puissance à 25 °C,
  courbe du jour, repère de nettoyage (poussière). Même style d'interface que le compteur (sable, terre cuite, phrases).
- Interfaces des projets ESP32 : chaleureuses et douces (demande de Hamdi), pas de tableau de bord sombre générique.
- `coupure-clim/` : ESP32 + LED et récepteur infrarouge (IRremoteESP8266, protocole selon la marque) + radar LD2410 + DHT22.
  Aucun 220 V. Règles testées (pièce vide 15 min, jamais la nuit 22 h-7 h, éco 24 °C une fois, alerte surchauffe).
- `bras-gestes/` : bras + main à 5 doigts (9 servos) : React + MediaPipe (points image + 3D) → Web Serial (USB) → ESP32 → PCA9685.
  Doigts = somme des angles des articulations (3D), poignet = rotation type poignée de porte.
  Limites en double (reglages.ts et limites.h), un test vérifie qu'elles sont identiques ; l'ESP32 refuse tout hors limites.
- `station-meteo/` : ESP32 + BME280 + PMS5003 (réveillé 30 s / 5 min), ressenti NOAA, niveaux PM EPA 2024, tendance pression.
- Les 5 projets prévus sont faits (code + tests ; aucun encore compilé pour ESP32 ni testé avec du vrai matériel).
- Sécurité (`SECURITE.md`, `commun/securite.h` recopié par `outils/verifier-securite.sh`) : Digest auth sur chaque page,
  compilation refusée avec mots de passe d'exemple, en-tête X-Tableau contre CSRF (clim). Projets cyber suivants :
  détecteur d'arnaques SMS. Règle : jamais sans autorisation écrite.
- `labo-ot/` : poste électrique simulé (Modbus écrit à la main, Python sans dépendance), pare-feu Modbus
  (regles.py), supervision web soft, démo d'attaque bornée (--labo, IP privées). 13 tests. Suite : version ESP32 + Raspberry Pi.
- `drone-gestes/` : simulateur de drone piloté par les gestes
  (webcam + MediaPipe + 3D, 15 tests). Suite : vrai drone DJI Tello via un pont Python (`djitellopy`).
  Vérifier la réglementation drones à Djibouti avant achat.
- Ce dépôt-ci (`web-development`) reste réservé aux sites web.

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
