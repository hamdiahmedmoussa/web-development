/**
 * Transforme la progression du défilement (0 → 1) en quatre nombres
 * « apparition » (0 → 1), un par couche : génoise, crème, glaçage, décor.
 *
 * Chaque étape occupe un quart du défilement. Une couche commence à apparaître
 * un peu avant son étape et finit peu après, pour que le gâteau soit prêt
 * quand le client lit les choix.
 */
export function calculerApparitions(progression: number, mouvementReduit: boolean): number[] {
  return [0, 1, 2, 3].map((etape) => {
    const t = (progression * 4 - etape + 0.25) / 0.5;
    // Sans animation : la couche est soit absente, soit entièrement en place.
    if (mouvementReduit) return t > 0 ? 1 : 0;
    return Math.min(1, Math.max(0, t));
  });
}

/** Numéro de l'étape en cours (0 à 3) pour une progression donnée. */
export function etapeActive(progression: number): number {
  return Math.min(3, Math.floor(progression * 4));
}
