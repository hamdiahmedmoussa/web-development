import { config } from "../../config";
import { useMaintenant } from "../../hooks/useMaintenant";
import { etatBoutique } from "../../lib/horaires";
import type { Horaires } from "../../types";

/**
 * L'état de la boutique, dit simplement : « Ouvert jusqu'à 21 h », « Nous rouvrons demain à 7 h ».
 * Pas de pastille ni de point vert : une phrase, comme la pancarte sur la porte.
 */
export function Statut({ horaires, compact = false }: { horaires: Horaires; compact?: boolean }) {
  const etat = etatBoutique(horaires, useMaintenant(), config.fuseau);
  return <span className={compact ? "statut statut--compact" : "statut"}>{etat.phrase}</span>;
}
