import { config } from "../../config";
import { useMaintenant } from "../../hooks/useMaintenant";
import { etatBoutique } from "../../lib/horaires";

/** L'état du salon, dit simplement : « Ouvert jusqu'à 20 h », « Nous rouvrons demain à 9 h ». */
export function Statut({ compact = false }: { compact?: boolean }) {
  const etat = etatBoutique(config.salon.horaires, useMaintenant(), config.fuseau);
  return <span className={compact ? "statut statut--compact" : "statut"}>{etat.phrase}</span>;
}
