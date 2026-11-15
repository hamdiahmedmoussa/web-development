/*
  LE CLAVIER : pour tester sans caméra, et comme commande de secours.
    Entrée = décoller · ↑ ↓ = monter / descendre · ← → = gauche / droite
    Espace = ATTERRISSAGE D'URGENCE (toujours prioritaire)
*/
import { useEffect } from "react";
import { COMMANDE_NEUTRE } from "./gestes/reconnaitre";
import { pilotage } from "./pilotage";

const TOUCHES = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter"];

export function useClavier() {
  useEffect(() => {
    const appuyees = new Set<string>();

    const recalculer = () => {
      if (appuyees.size === 0) {
        pilotage.commandeClavier = null;
        return;
      }
      pilotage.commandeClavier = {
        ...COMMANDE_NEUTRE,
        decoller: appuyees.has("Enter"),
        vertical: (appuyees.has("ArrowUp") ? 1 : 0) - (appuyees.has("ArrowDown") ? 1 : 0),
        lateral: (appuyees.has("ArrowRight") ? 1 : 0) - (appuyees.has("ArrowLeft") ? 1 : 0),
      };
    };

    const bas = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        pilotage.urgence = true;
        return;
      }
      if (!TOUCHES.includes(e.key)) return;
      e.preventDefault();
      appuyees.add(e.key);
      recalculer();
    };
    const haut = (e: KeyboardEvent) => {
      appuyees.delete(e.key);
      recalculer();
    };
    // Si la fenêtre perd le focus, on relâche tout (sinon une touche resterait « appuyée »).
    const perdu = () => {
      appuyees.clear();
      recalculer();
    };

    window.addEventListener("keydown", bas);
    window.addEventListener("keyup", haut);
    window.addEventListener("blur", perdu);
    return () => {
      window.removeEventListener("keydown", bas);
      window.removeEventListener("keyup", haut);
      window.removeEventListener("blur", perdu);
    };
  }, []);
}
