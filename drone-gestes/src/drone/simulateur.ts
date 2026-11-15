/*
  LA SIMULATION DU DRONE

  Le drone a quatre états :
    posé → (décollage) → en vol → (atterrissage) → posé

  À chaque image, on appelle mettreAJour() avec la commande et le temps écoulé (dt).
  Le drone n'obéit pas instantanément : sa vitesse rejoint progressivement la vitesse
  demandée (comme un vrai drone, qui a une inertie). Il reste dans la « pièce » :
  il ne peut ni sortir par les côtés, ni monter au-delà du plafond.

  Ce fichier est indépendant de l'affichage 3D : on peut le tester seul.
  Pour un vrai drone (Tello), c'est la commande qu'on enverra, pas cette simulation.
*/
import type { Commande } from "../gestes/reconnaitre";

export type Phase = "pose" | "decollage" | "vol" | "atterrissage";

export const NOMS_PHASES: Record<Phase, string> = {
  pose: "Posé",
  decollage: "Décollage",
  vol: "En vol",
  atterrissage: "Atterrissage",
};

export interface Drone {
  phase: Phase;
  /** Position horizontale (mètres), 0 = centre de la pièce. */
  x: number;
  /** Altitude (mètres), 0 = au sol. */
  altitude: number;
  /** Vitesses actuelles (mètres par seconde). */
  vx: number;
  vy: number;
}

/** Limites de la pièce et performances du drone simulé. */
export const PIECE = {
  demiLargeur: 3, // le drone reste entre -3 m et +3 m
  plafond: 2.5,
  altitudeDecollage: 1, // le décollage monte à 1 m, puis rend la main
};
export const VITESSE = {
  laterale: 1.5, // m/s à pleine inclinaison
  verticale: 0.8, // m/s
  decollage: 0.6,
  atterrissage: 0.5,
  /** Plus c'est grand, plus le drone réagit vite (inertie plus faible). */
  reactivite: 4,
};

export function droneAuSol(): Drone {
  return { phase: "pose", x: 0, altitude: 0, vx: 0, vy: 0 };
}

const borner = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Avance la simulation de dt secondes. Renvoie un NOUVEL état du drone. */
export function mettreAJour(drone: Drone, commande: Commande, dt: number): Drone {
  const d = { ...drone };

  // 1. Changements de phase. L'atterrissage est prioritaire sur tout le reste.
  if (commande.atterrir && (d.phase === "vol" || d.phase === "decollage")) d.phase = "atterrissage";
  else if (commande.decoller && d.phase === "pose") d.phase = "decollage";

  // 2. Vitesse visée selon la phase.
  let cibleVx = 0;
  let cibleVy = 0;
  switch (d.phase) {
    case "pose":
      return { ...d, vx: 0, vy: 0, altitude: 0 };
    case "decollage":
      cibleVy = VITESSE.decollage;
      break;
    case "atterrissage":
      cibleVy = -VITESSE.atterrissage;
      break;
    case "vol":
      cibleVx = commande.lateral * VITESSE.laterale;
      cibleVy = commande.vertical * VITESSE.verticale;
      break;
  }

  // 3. Inertie : la vitesse rejoint la cible progressivement.
  const k = 1 - Math.exp(-VITESSE.reactivite * dt);
  d.vx += (cibleVx - d.vx) * k;
  d.vy += (cibleVy - d.vy) * k;

  // 4. Déplacement, sans sortir de la pièce.
  d.x = borner(d.x + d.vx * dt, -PIECE.demiLargeur, PIECE.demiLargeur);
  d.altitude = borner(d.altitude + d.vy * dt, 0, PIECE.plafond);
  if (Math.abs(d.x) === PIECE.demiLargeur) d.vx = 0;

  // 5. Fin du décollage ou de l'atterrissage.
  if (d.phase === "decollage" && d.altitude >= PIECE.altitudeDecollage) d.phase = "vol";
  if (d.phase === "atterrissage" && d.altitude <= 0) return { ...d, phase: "pose", altitude: 0, vx: 0, vy: 0 };
  // En vol, si on descend jusqu'au sol, on se pose.
  if (d.phase === "vol" && d.altitude <= 0.02 && d.vy < 0) return { ...d, phase: "pose", altitude: 0, vx: 0, vy: 0 };

  return d;
}
