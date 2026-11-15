/*
  RECONNAÎTRE UN GESTE À PARTIR DES 21 POINTS DE LA MAIN

  MediaPipe donne 21 points par main, numérotés toujours de la même façon :
    0 = poignet
    1-4 = pouce, 5-8 = index, 9-12 = majeur, 13-16 = annulaire, 17-20 = auriculaire
  Pour chaque doigt : la base (MCP), deux articulations (PIP, DIP), puis le bout (TIP).
  Exemple pour l'index : 5 = base, 6 = PIP, 8 = bout.

  Les coordonnées vont de 0 à 1 dans l'image : x vers la droite, y vers le BAS.

  Ce fichier ne dépend ni de la caméra ni du drone : on peut le tester seul,
  et le réutiliser tel quel pour piloter un vrai drone.
*/

export interface Point {
  x: number;
  y: number;
}

export type Geste =
  | "aucun" // pas de main à l'écran
  | "ouverte" // ✋ les 4 doigts tendus : décoller, puis rester sur place ou se déplacer en inclinant la main
  | "poing" // ✊ tous les doigts pliés : ATTERRIR
  | "index" // ☝️ seul l'index tendu : monter
  | "victoire" // ✌️ index + majeur tendus : descendre
  | "inconnu"; // une autre position de la main : le drone reste sur place

export const NOMS_GESTES: Record<Geste, string> = {
  aucun: "Aucune main",
  ouverte: "Main ouverte",
  poing: "Poing fermé",
  index: "Index levé",
  victoire: "Deux doigts (V)",
  inconnu: "Geste non reconnu",
};

/** Ce que le drone doit faire. Chaque valeur va de -1 à 1. */
export interface Commande {
  /** +1 = monter à fond, -1 = descendre à fond. */
  vertical: number;
  /** +1 = aller à droite à fond, -1 = à gauche. */
  lateral: number;
  /** Demande de décollage (main ouverte quand le drone est posé). */
  decoller: boolean;
  /** Demande d'atterrissage (poing fermé, ou main perdue). */
  atterrir: boolean;
}

export const COMMANDE_NEUTRE: Commande = { vertical: 0, lateral: 0, decoller: false, atterrir: false };

function distance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/**
 * Un doigt est tendu si son bout est nettement plus loin du poignet que son articulation du milieu.
 * On compare des DISTANCES (et pas « le bout est plus haut ») : ça marche même si la main est inclinée.
 */
function doigtTendu(main: Point[], pip: number, bout: number): boolean {
  return distance(main[0], main[bout]) > distance(main[0], main[pip]) * 1.15;
}

/** Les 4 doigts (sans le pouce, difficile à lire de face) : tendu ou non. */
export function doigtsTendus(main: Point[]) {
  return {
    index: doigtTendu(main, 6, 8),
    majeur: doigtTendu(main, 10, 12),
    annulaire: doigtTendu(main, 14, 16),
    auriculaire: doigtTendu(main, 18, 20),
  };
}

export function reconnaitre(main: Point[] | null): Geste {
  if (!main || main.length < 21) return "aucun";
  const d = doigtsTendus(main);
  const nombre = [d.index, d.majeur, d.annulaire, d.auriculaire].filter(Boolean).length;

  if (nombre === 4) return "ouverte";
  if (nombre === 0) return "poing";
  if (d.index && nombre === 1) return "index";
  if (d.index && d.majeur && nombre === 2) return "victoire";
  return "inconnu";
}

/**
 * Inclinaison de la main, en degrés : 0 = main droite, positif = penchée vers la droite DE L'UTILISATEUR.
 * On mesure l'angle de la ligne poignet → base du majeur.
 * La caméra voit la main comme dans un miroir : ce qui est à droite pour l'utilisateur
 * est à gauche dans l'image (x plus petit). D'où le signe moins.
 */
export function inclinaison(main: Point[]): number {
  const dx = main[9].x - main[0].x;
  const dy = main[0].y - main[9].y; // y va vers le bas dans l'image : on inverse pour que « haut » soit positif
  return -(Math.atan2(dx, dy) * 180) / Math.PI;
}

/** En dessous de cet angle, on considère la main droite : pas de déplacement (évite les dérives). */
export const ZONE_MORTE = 12;
/** À partir de cet angle, le drone se déplace à pleine vitesse. */
export const ANGLE_MAX = 40;

/** Transforme un angle en vitesse latérale de -1 à 1, avec la zone morte au centre. */
export function angleVersVitesse(angle: number): number {
  const a = Math.abs(angle);
  if (a < ZONE_MORTE) return 0;
  const v = Math.min(1, (a - ZONE_MORTE) / (ANGLE_MAX - ZONE_MORTE));
  return Math.sign(angle) * v;
}

/** Le geste (et l'inclinaison de la main) deviennent une commande pour le drone. */
export function versCommande(geste: Geste, main: Point[] | null): Commande {
  switch (geste) {
    case "ouverte":
      return { ...COMMANDE_NEUTRE, decoller: true, lateral: main ? angleVersVitesse(inclinaison(main)) : 0 };
    case "index":
      return { ...COMMANDE_NEUTRE, vertical: 1 };
    case "victoire":
      return { ...COMMANDE_NEUTRE, vertical: -1 };
    case "poing":
      return { ...COMMANDE_NEUTRE, atterrir: true };
    default:
      return COMMANDE_NEUTRE;
  }
}
