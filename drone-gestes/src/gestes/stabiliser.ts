/*
  STABILISER LES GESTES ET APPLIQUER LES RÈGLES DE SÉCURITÉ

  La caméra analyse environ 30 images par seconde. Sur une image, la détection peut
  se tromper (un doigt mal vu, une main floue). Si on obéissait à chaque image,
  le drone tremblerait. Donc :
   - un nouveau geste n'est accepté que s'il est vu pendant DUREE_CONFIRMATION ;
   - SAUF le poing (atterrir) : accepté plus vite, car c'est le geste de sécurité ;
   - si la main disparaît plus de DELAI_MAIN_PERDUE, on demande l'atterrissage.
*/
import type { Geste } from "./reconnaitre";

/** Temps pendant lequel un geste doit rester identique pour être accepté (secondes). */
export const DUREE_CONFIRMATION = 0.2;
/** Le poing (atterrir) est accepté plus vite : la sécurité passe avant le confort. */
export const DUREE_CONFIRMATION_POING = 0.08;
/** Main absente plus longtemps que ça → atterrissage automatique (secondes). */
export const DELAI_MAIN_PERDUE = 0.8;

export interface EtatStabilisateur {
  /** Le geste confirmé, celui qu'on applique au drone. */
  confirme: Geste;
  /** Le geste vu en ce moment, pas encore confirmé. */
  candidat: Geste;
  /** Depuis quand on voit le candidat (secondes). */
  depuis: number;
  /** Dernier moment où une main a été vue (secondes). */
  derniereMain: number;
  /** Vrai si l'atterrissage a été déclenché parce que la main a disparu. */
  mainPerdue: boolean;
}

export function nouvelEtat(maintenant: number): EtatStabilisateur {
  return { confirme: "aucun", candidat: "aucun", depuis: maintenant, derniereMain: maintenant, mainPerdue: false };
}

/** Met à jour l'état avec le geste vu sur la nouvelle image. Renvoie un NOUVEL état. */
export function stabiliser(etat: EtatStabilisateur, vu: Geste, maintenant: number): EtatStabilisateur {
  const suivant = { ...etat };

  if (vu !== "aucun") {
    suivant.derniereMain = maintenant;
    suivant.mainPerdue = false;
  } else if (maintenant - etat.derniereMain > DELAI_MAIN_PERDUE) {
    suivant.mainPerdue = true;
  }

  if (vu !== etat.candidat) {
    suivant.candidat = vu;
    suivant.depuis = maintenant;
  }

  const attente = suivant.candidat === "poing" ? DUREE_CONFIRMATION_POING : DUREE_CONFIRMATION;
  if (maintenant - suivant.depuis >= attente) suivant.confirme = suivant.candidat;

  return suivant;
}
