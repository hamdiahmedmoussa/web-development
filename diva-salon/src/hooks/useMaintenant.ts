import { useEffect, useState } from "react";

/** L'heure actuelle, mise à jour chaque minute (pour « Ouvert / Fermé »). */
export function useMaintenant(): Date {
  const [maintenant, setMaintenant] = useState(() => new Date());
  useEffect(() => {
    const minuteur = window.setInterval(() => setMaintenant(new Date()), 60_000);
    return () => window.clearInterval(minuteur);
  }, []);
  return maintenant;
}
