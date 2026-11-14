/*
  L'HORLOGE DE L'INTRO
  Tous les éléments de l'intro (caméra, particules, interface) comptent le temps
  depuis le même moment : l'ouverture de la page. Ils restent ainsi synchronisés.
*/
const debut = performance.now();

export const horloge = {
  /** Secondes écoulées depuis l'ouverture de la page. */
  depuisDebut: () => (performance.now() - debut) / 1000,
};

/** Courbe douce (accélère puis ralentit), bornée entre 0 et 1. */
export function lisse(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
