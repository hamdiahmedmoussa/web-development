# Han'sCake · site démo « marque premium »

Maquette de démonstration (site **non officiel**) pour la pâtisserie Han'sCake, rue de Rome, Djibouti.
Le visiteur suit la fabrication d'un gâteau en faisant défiler un film, choisit son parfum, compose
une boîte de pâtisseries, puis envoie sa commande sur WhatsApp, déjà rédigée.

React, Vite, TypeScript, Motion (`motion/react`), CSS simple. Pas de base de données ni de paiement en ligne.

## Deux versions dans le même site

| Version | Adresse | Ouverture | Ambiance |
|---|---|---|---|
| **Cinéma** (par défaut) | `/` ou `/?version=cinema` | le film au défilement | sombre : brun, crème, framboise ; titres Bodoni Moda |
| **Rétro** | `/?version=retro` | l'arc 3D de tous les gâteaux | années 70 : vanille, chocolat, cerise, menthe ; titres Fraunces, contours épais |

Un bouton en haut de page permet de passer de l'une à l'autre pendant la présentation.
Les couleurs de chaque version sont dans `src/styles/variables.css`, les touches rétro dans
`src/styles/retro.css`, et le choix de la version dans `src/version.ts`.

## Lancer le site

```bash
npm install       # une seule fois
npm run dev       # http://localhost:5173
npm run images    # convertit les PNG de public/images/ en WebP (plus légers)
npm test          # vérifie les messages WhatsApp
npm run build     # version finale dans dist/
```

Sur ton téléphone (même Wi-Fi) : `npm run dev -- --host`, puis ouvre l'adresse « Network ».

## Les sections

| # | Section | Composant |
|---|---|---|
| 1 | Ouverture : arc rétro en 3D avec tous les gâteaux et pâtisseries (ou le film, au choix) | `components/Arc`, `components/Film` |
| 2 | Carrousel des parfums (ingrédients aspirés puis rejaillis, répulsion du pointeur, gâteau qui s'incline, vermicelles) | `components/Carrousel` |
| 2b | Galerie de vrais gâteaux par occasion, commande « comme celui-ci » | `components/Galerie` |
| 2c | Calculateur de parts | `components/Calculateur` |
| 3 | Vitrine | `components/Vitrine` |
| 4 | Composez votre boîte | `components/Boite` |
| 4b | Avis clients (vrais avis seulement) | `components/Avis` |
| 5 | Questions fréquentes | `components/FAQ` |
| 6 | Commande + confirmation en verre dépoli | `components/Commande` |
| 7 | Boutiques (ouvert / fermé, Google Maps), contact | `components/PiedDePage` |

Bulle « Un gâteau pour quand ? » en bas à droite : `components/Bulle`.

## Où modifier quoi

| Je veux changer… | Fichier |
|---|---|
| Numéro WhatsApp, horaires, adresse, réseaux | `src/config.ts` |
| Version affichée par défaut | `PAR_DEFAUT` dans `src/version.ts` |
| Textes et temps du film | `src/data/film.ts` |
| Parfums du carrousel (couleurs, prix, ingrédients) | `src/data/parfums.ts` |
| Pâtisseries de la vitrine et de la boîte | `src/data/vitrine.ts` |
| Questions fréquentes | `src/data/faq.ts` |
| Galerie par occasion | `src/data/galerie.ts` |
| Avis clients (vrais avis uniquement) | `src/data/avis.ts` |
| Horaires de chaque boutique, lien Maps | `boutiques` dans `src/config.ts` |
| Couleurs générales et polices | `src/styles/variables.css` |

⚠️ Pour tes essais, mets **ton** numéro dans `config.whatsapp` : sinon chaque test envoie une vraie
commande à la pâtisserie.

## Images

Les photos viennent du compte Instagram de la pâtisserie (**hanscake.cafeteria**) et de son réfrigérateur
de vitrine, recadrées et converties en WebP (716 Ko pour 39 photos).

| Dossier | Contenu |
|---|---|
| `public/images/galerie/` | gâteaux personnalisés par occasion (voir `src/data/galerie.ts`) |
| `public/images/parfums/` | gâteaux du carrousel (voir `src/data/parfums.ts`) |
| `public/images/vitrine/` | pâtisseries à la pièce (voir `src/data/vitrine.ts`) |
| `public/images/boutique/` | devanture et réfrigérateur |
| `public/images/ingredients/` | facultatif : PNG détourés qui flottent autour des gâteaux |

⚠️ Avant toute mise en ligne publique, demander l'accord de Han'sCake pour ces photos
(et des familles quand un prénom d'enfant est écrit sur le gâteau).
Une image manquante affiche un cercle en pointillés avec le nom du fichier attendu.
`npm run images` convertit en WebP les nouveaux PNG déposés.

## Le film

- `public/hanscake-film.mp4` (1280 px, 4,4 Mo) pour l'ordinateur.
- `public/hanscake-film-mobile.mp4` (854 px, 2,6 Mo) pour le téléphone.
- `hanscake-debut.jpg` s'affiche pendant le chargement, `hanscake-fin.jpg` si le film ne peut pas être lu
  ou si le visiteur a demandé moins d'animations.

Une vidéo avance de façon fluide au défilement seulement si elle contient beaucoup d'« images clés ».
Les deux fichiers ont été réencodés ainsi. Pour remplacer le film, utilise les mêmes commandes :

```bash
ffmpeg -i nouveau.mp4 -an -c:v libx264 -preset slow -crf 27 -g 6 -keyint_min 6 -sc_threshold 0 \
  -pix_fmt yuv420p -movflags +faststart public/hanscake-film.mp4
ffmpeg -i nouveau.mp4 -an -vf scale=854:-2 -c:v libx264 -preset slow -crf 28 -g 4 -keyint_min 4 \
  -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart public/hanscake-film-mobile.mp4
```

Les temps des étapes (0,8 s, 7,9 s, 13,3 s, 14,5 s, 24,1 s) se règlent dans `src/data/film.ts`.

## Mettre en ligne sur Vercel

1. vercel.com → connexion avec GitHub → **Add New… → Project** → dépôt `web-development`.
2. **Root Directory : `hanscake`**.
3. Choisir la branche à déployer, puis **Deploy**.

## Contenu provisoire

Parfums, prix (sauf 3 500 FDJ pour 8 parts), horaires et réseaux sont des exemples à confirmer.
Les règles de la FAQ viennent d'une vraie conversation avec la pâtisserie. Le numéro CAC n'est
volontairement pas publié.
