# Han'sCake · site démo

Maquette de démonstration (site **non officiel**) pour la pâtisserie Han'sCake, à Djibouti.
Le client compose son gâteau en faisant défiler la page, puis envoie sa commande par WhatsApp.

Technique : React, Vite, TypeScript, CSS simple. Pas de base de données, pas de paiement en ligne.

## Lancer le site

```bash
npm install     # une seule fois : installe les outils
npm run dev     # lance le site sur http://localhost:5173
npm test        # vérifie le message WhatsApp
npm run build   # prépare la version finale dans dist/
```

Pour le voir sur ton téléphone (même Wi-Fi) : `npm run dev -- --host`, puis ouvre l'adresse « Network » affichée.

## Où modifier quoi

| Je veux changer… | Fichier |
|---|---|
| Numéro WhatsApp, prix, horaires, adresse, réseaux, « Bon à savoir » | `src/config.ts` |
| Parfums, crèmes, glaçages, décors | `src/data/options.ts` |
| Pâtisseries « En vitrine » et leurs photos | `src/data/vitrine.ts` |
| Couleurs et polices | `src/styles/variables.css` |
| Retirer la mention « Maquette » | `estUneMaquette: false` dans `src/config.ts`, et la ligne `robots` dans `index.html` |

## Organisation du code

```
src/
├─ App.tsx              assemble la page et garde en mémoire le gâteau composé
├─ config.ts            réglages de la pâtisserie
├─ types.ts             formes des données (TypeScript)
├─ data/                options du gâteau, pâtisseries en vitrine
├─ hooks/               mesure du défilement, « moins d'animations »
├─ lib/whatsapp.ts      message de commande et lien wa.me (avec tests)
├─ styles/              variables et styles communs
└─ components/
   ├─ Accueil/          premier écran
   ├─ Atelier/          gâteau fixé à l'écran + les 4 étapes
   ├─ Scene/            le gâteau : dessin (canvas) ou vidéo
   ├─ Etape/ Choix/     une étape et ses trois choix
   ├─ Recapitulatif/    gâteau terminé + bouton de commande
   ├─ BarreCommande/    bouton « Commander » toujours visible
   ├─ Commande/         formulaire qui ouvre WhatsApp
   ├─ BonASavoir/       prix, délai, acompte, boîte, bougies
   ├─ Vitrine/ PiedDePage/ BandeauDemo/
```

## Passer du gâteau dessiné à une vidéo

1. Placer la vidéo dans `public/video/gateau.mp4` (courte, sans son, moins de 3 Mo).
2. Dans `src/config.ts`, écrire `modeScene: "video"`.

Le reste du site ne change pas : `Scene.tsx` choisit entre `SceneCanvas` et `SceneVideo`.

## Mettre en ligne sur Vercel

1. Créer un compte sur vercel.com avec GitHub.
2. « Add New… » → « Project » → choisir le dépôt `web-development`.
3. **Root Directory : `hanscake`** (le site est dans ce sous-dossier).
4. Laisser les autres réglages (Vercel reconnaît Vite) et cliquer sur « Deploy ».

Chaque `git push` sur la branche choisie met ensuite le site à jour.

## À vérifier avant de montrer la démo

- [ ] Le site s'ouvre sur ton téléphone et le gâteau se construit en défilant.
- [ ] Chaque choix change bien le gâteau et le récapitulatif.
- [ ] « Commander » ouvre WhatsApp avec le bon message, vers le bon numéro.
- [ ] Le lien du téléphone dans le pied de page fonctionne.
- [ ] La mention « Maquette de démonstration » est visible.
- [ ] Test Lighthouse (Chrome → Inspecter → Lighthouse → Mobile).

## Contenu encore provisoire

Logo, photos, parfums, horaires, adresse et réseaux sont des **exemples** à remplacer.
Le prix (3 500 FDJ, 8 parts minimum) et les règles de commande sont à confirmer avec la pâtisserie.
