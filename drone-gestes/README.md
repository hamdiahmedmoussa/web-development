# Drone piloté par les gestes · simulateur

La webcam filme ta main, **MediaPipe** repère ses 21 points, le programme reconnaît le geste
et pilote un drone en 3D. Tout tourne dans le navigateur : l'image de la caméra n'est envoyée nulle part.

React, TypeScript, Vite, Three.js (`@react-three/fiber`), MediaPipe Hand Landmarker.

## Lancer

```bash
npm install      # copie aussi le moteur MediaPipe dans public/mediapipe
npm run dev      # http://localhost:5173, puis « Activer la caméra »
npm test         # 15 tests : gestes, stabilisation, simulation
```

La caméra ne fonctionne que sur `localhost` ou une adresse en `https://` (règle des navigateurs).

## Les gestes

| Geste | Action |
|---|---|
| ✋ Main ouverte | Décoller, puis rester sur place |
| ✋ inclinée (plus de 12°) | Aller à gauche ou à droite (vitesse maximale à 40°) |
| ☝️ Index levé | Monter |
| ✌️ Deux doigts | Descendre |
| ✊ Poing fermé | Atterrir |

Clavier : `Entrée` décoller, flèches pour se déplacer, **`Espace` = atterrissage d'urgence**.

## Sécurité (déjà prévue pour un vrai drone)

- **Poing fermé** : accepté plus vite que les autres gestes (0,08 s au lieu de 0,2 s).
- **Main perdue** plus de 0,8 s : atterrissage automatique.
- **Espace** ou le bouton rouge : atterrissage d'urgence, prioritaire sur tout.
- Un geste vu sur une seule image (erreur de détection) est ignoré.

## Comment c'est organisé

| Fichier | Rôle |
|---|---|
| `src/gestes/reconnaitre.ts` | 21 points → geste → commande (doigts tendus, inclinaison de la main) |
| `src/gestes/stabiliser.ts` | Confirme les gestes dans le temps, détecte la main perdue |
| `src/gestes/useCamera.ts` | Webcam + MediaPipe, dessine les points de la main |
| `src/drone/simulateur.ts` | Le drone : phases (posé, décollage, vol, atterrissage), inertie, limites de la pièce |
| `src/pilotage.ts` | État partagé et **règles de priorité** (urgence > clavier > main perdue > main) |
| `src/scene/Scene.tsx` | La pièce et le drone en 3D |

Les réglages (angles, délais, vitesses) sont des constantes en haut de chaque fichier.

## Étape suivante : un vrai drone (DJI Tello)

Le navigateur ne peut pas parler directement au Tello (il utilise le protocole UDP).
Il faudra un petit programme Python sur le PC (bibliothèque `djitellopy`) qui reçoit la commande
et l'envoie au drone avec `send_rc_control(lateral, avant, vertical, rotation)`.
Les modules `gestes/` se réutilisent tels quels.
