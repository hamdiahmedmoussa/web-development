# Han'sCake · site démo « marque premium »

Maquette de démonstration (site **non officiel**) pour la pâtisserie Han'sCake, rue de Rome, Djibouti.
Le visiteur suit la fabrication d'un gâteau en faisant défiler un film, choisit son parfum, compose
une boîte de pâtisseries, puis envoie sa commande sur WhatsApp, déjà rédigée.

React, Vite, TypeScript, Motion (`motion/react`), CSS simple. Pas de base de données ni de paiement en ligne.

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
| 2 | Carrousel des parfums | `components/Carrousel` |
| 3 | Vitrine | `components/Vitrine` |
| 4 | Composez votre boîte | `components/Boite` |
| 5 | Questions fréquentes | `components/FAQ` |
| 6 | Commande + confirmation en verre dépoli | `components/Commande` |
| 7 | Pied de page | `components/PiedDePage` |

Barre « Commander » fixée en bas : `components/BarreCommande`.

## Où modifier quoi

| Je veux changer… | Fichier |
|---|---|
| Numéro WhatsApp, horaires, adresse, réseaux | `src/config.ts` |
| Ouverture en arc ou en film | `ouverture` dans `src/config.ts` |
| Textes et temps du film | `src/data/film.ts` |
| Parfums du carrousel (couleurs, prix, ingrédients) | `src/data/parfums.ts` |
| Pâtisseries de la vitrine et de la boîte | `src/data/vitrine.ts` |
| Questions fréquentes | `src/data/faq.ts` |
| Couleurs générales et polices | `src/styles/variables.css` |

⚠️ Pour tes essais, mets **ton** numéro dans `config.whatsapp` : sinon chaque test envoie une vraie
commande à la pâtisserie.

## Images à fournir

PNG à fond transparent. Tant qu'une image manque, le site affiche un cercle en pointillés
avec le nom du fichier attendu. Après avoir ajouté des images, lance `npm run images`.

| Dossier | Fichiers |
|---|---|
| `public/images/parfums/` (≈ 1000 × 1000) | `chocolat-framboise.png`, `vanille-fraise.png`, `pistache.png`, `red-velvet.png`, `caramel.png` |
| `public/images/ingredients/` (≈ 300 × 300) | `framboise.png`, `copeau-chocolat.png`, `feuille-menthe.png`, `fraise.png`, `gousse-vanille.png`, `creme-fouettee.png`, `pistache-eclat.png`, `cerise.png`, `caramel-morceau.png`, `noisette.png` |
| `public/images/vitrine/` (≈ 700 × 700) | `fraisier.png`, `millefeuille.png`, `tarte-citron.png`, `eclair-chocolat.png`, `paris-brest.png`, `opera.png` |
| `public/images/logo/` | `logo.png` (pas encore branché : le logo est écrit en texte) |

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
