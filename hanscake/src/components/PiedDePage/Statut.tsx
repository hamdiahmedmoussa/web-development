import { config } from "../../config";
import { useMaintenant } from "../../hooks/useMaintenant";
import { etatBoutique } from "../../lib/horaires";
import type { Horaires } from "../../types";

/** Pastille « Ouvert, ferme à 21 h » ou « Fermé, ouvre demain à 7 h ». */
export function Statut({ horaires, compact = false }: { horaires: Horaires; compact?: boolean }) {
  const etat = etatBoutique(horaires, useMaintenant(), config.fuseau);
  return (
    <span className={`statut ${etat.ouvert ? "statut--ouvert" : "statut--ferme"} ${compact ? "statut--compact" : ""}`}>
      <span className="statut__point" aria-hidden="true" />
      {etat.ouvert ? "Ouvert" : "Fermé"}, {etat.detail}
    </span>
  );
}
