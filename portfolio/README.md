# Portfolio de Hamdi · « un univers »

Portfolio sur une seule page : le visiteur traverse une scène 3D (étoiles, mer de nuages, poussière dorée).
La caméra avance au rythme du défilement, et chaque section est une « station » dans la scène.

React, Vite, TypeScript, Three.js (`@react-three/fiber`), effets lumineux (`@react-three/postprocessing`),
défilement fluide (Lenis), CSS simple.

## Lancer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Où modifier quoi

| Je veux changer… | Fichier |
|---|---|
| Mon nom, sous-titre, menu, titres des sections | `src/data.ts` |
| Les deux mots de l'intro (PORTFOLIO → HAMDI) | `intro` dans `src/data.ts` |
| Les moments de l'intro (secondes) | `TEMPS` dans `src/scene/MotEnParticules.tsx` |
| Le trajet de la caméra | `STATIONS` dans `src/scene/Camera.tsx` |
| Couleurs et polices | `src/styles/base.css` |
| Nombre de particules (ordinateur / téléphone) | `src/appareil.ts` et les `combien(…)` |

## Comment marche l'intro

1. `scene/echantillonner.ts` écrit le mot dans un canvas invisible et récupère la position des pixels « encrés ».
2. Chaque particule reçoit trois positions : dans la brume, dans « PORTFOLIO », dans « HAMDI ».
3. Le shader de `scene/MotEnParticules.tsx` passe de l'une à l'autre, avec un petit retard différent
   pour chaque particule (effet de sable).

## Téléphone et accessibilité

- Téléphone ou petit processeur : particules divisées par 3, sans halo ni grain (`src/appareil.ts`).
- « Réduire les animations » activé : pas d'intro, pas de mouvement de caméra, le nom s'affiche directement.

## Avancement

- [x] Étape 1 : scène (étoiles, brume, poussière), défilement fluide, menu, barre de progression, viseur
- [x] Étape 2 : intro « PORTFOLIO » → « HAMDI » en particules
- [ ] Étape 3 : accueil (photo dans la fumée) et portail du manifeste
- [ ] Étape 4 : projets (panneaux de verre sous projecteur)
- [ ] Étapes 5 à 8 : compétences, parcours, certifications ou apprentissages, contact, mise en ligne
