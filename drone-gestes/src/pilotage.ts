/*
  L'ÉTAT DU PILOTAGE, PARTAGÉ ENTRE LA CAMÉRA, LE CLAVIER ET LA SCÈNE 3D
  La caméra et la scène 3D tournent environ 60 fois par seconde. Plutôt que de passer
  par React (qui redessinerait tout à chaque fois), elles lisent et écrivent ici directement.
  L'affichage des informations (altitude, geste…) relit cet objet quelques fois par seconde.
*/
import { COMMANDE_NEUTRE, type Commande, type Geste } from "./gestes/reconnaitre";
import { droneAuSol, type Drone } from "./drone/simulateur";

export const pilotage = {
  /** Commande issue de la main (caméra). */
  commandeMain: COMMANDE_NEUTRE as Commande,
  /** Commande issue du clavier, quand une touche est appuyée (sinon null). */
  commandeClavier: null as Commande | null,
  gesteConfirme: "aucun" as Geste,
  /** La caméra tourne-t-elle ? (la sécurité « main perdue » ne s'applique qu'avec la caméra) */
  cameraActive: false,
  mainPerdue: false,
  /** Atterrissage d'urgence demandé (Espace ou bouton) : reste actif jusqu'à ce que le drone soit posé. */
  urgence: false,
  drone: droneAuSol() as Drone,
};

/** La commande réellement envoyée au drone, avec les règles de sécurité en premier. */
export function commandeFinale(): Commande {
  if (pilotage.urgence) return { ...COMMANDE_NEUTRE, atterrir: true };
  if (pilotage.commandeClavier) return pilotage.commandeClavier;
  if (pilotage.cameraActive && pilotage.mainPerdue) return { ...COMMANDE_NEUTRE, atterrir: true };
  return pilotage.commandeMain;
}
