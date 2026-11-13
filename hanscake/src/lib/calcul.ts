/*
  CALCULATEUR DE PARTS
  « Combien d'invités ? » → la taille de gâteau à commander et un prix estimé.
  Le prix est une ESTIMATION proportionnelle au prix de base (8 parts) :
  la pâtisserie confirme toujours le prix exact sur WhatsApp.
*/
export interface Conseil {
  /** Taille conseillée, choisie parmi les tailles proposées. null = au-delà de la plus grande. */
  parts: number | null;
  /** Prix estimé, arrondi à la centaine. */
  prix: number | null;
}

export function conseillerParts(invites: number, tailles: number[], prixBase: number, partsBase: number): Conseil {
  const triees = [...tailles].sort((a, b) => a - b);
  // La plus petite taille qui suffit pour tout le monde.
  const parts = triees.find((t) => t >= invites) ?? null;
  if (parts === null) return { parts: null, prix: null };
  const prix = Math.round(((prixBase * parts) / partsBase) / 100) * 100;
  return { parts, prix };
}
