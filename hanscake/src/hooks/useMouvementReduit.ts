import { useEffect, useState } from "react";

const REQUETE = "(prefers-reduced-motion: reduce)";

/**
 * Renvoie true si la personne a demandé « moins d'animations » dans les réglages
 * de son téléphone ou de son ordinateur. On respecte alors ce choix.
 */
export function useMouvementReduit(): boolean {
  const [reduit, setReduit] = useState(() => window.matchMedia(REQUETE).matches);

  useEffect(() => {
    const media = window.matchMedia(REQUETE);
    const mettreAJour = () => setReduit(media.matches);
    media.addEventListener("change", mettreAJour);
    return () => media.removeEventListener("change", mettreAJour);
  }, []);

  return reduit;
}
