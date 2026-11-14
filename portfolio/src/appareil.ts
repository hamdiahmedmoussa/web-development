/*
  CE QUE L'APPAREIL PEUT AFFICHER
  Sur téléphone (ou petit processeur), on divise les particules par 3 et on coupe
  les effets lumineux les plus lourds : le site doit rester fluide sur une connexion
  et un téléphone moyens.
*/
const petitEcran = window.matchMedia("(max-width: 760px)").matches;
const petitProcesseur = (navigator.hardwareConcurrency ?? 8) <= 4;

export const appareil = {
  leger: petitEcran || petitProcesseur,
  mouvementReduit: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  /** Souris précise : on affiche le viseur. Pas sur un écran tactile. */
  pointeurFin: window.matchMedia("(pointer: fine)").matches,
};

/** Nombre de particules selon l'appareil. */
export function combien(normal: number): number {
  return appareil.leger ? Math.round(normal / 3) : normal;
}
