import { createContext, useContext, useState, type ReactNode } from "react";
import type { Demande } from "../types";

/*
  LE CONTEXTE DE RÉSERVATION
  La liste des prestations, la galerie et la bulle ouvrent toutes le même formulaire.
  Le contexte leur donne accès à « demande » (ce qu'on réserve) et à ouvrir / fermer.
*/
interface Valeur {
  demande: Demande | null;
  ouvrir: (demande: Demande) => void;
  fermer: () => void;
}

const Contexte = createContext<Valeur | null>(null);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [demande, setDemande] = useState<Demande | null>(null);
  return (
    <Contexte.Provider value={{ demande, ouvrir: setDemande, fermer: () => setDemande(null) }}>{children}</Contexte.Provider>
  );
}

// oxlint-disable-next-line react/only-export-components
export function useReservation(): Valeur {
  const valeur = useContext(Contexte);
  if (!valeur) throw new Error("useReservation doit être utilisé dans <ReservationProvider>.");
  return valeur;
}
