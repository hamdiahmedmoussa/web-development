import { createContext, useContext, useState, type ReactNode } from "react";
import { parfums } from "../data/parfums";
import type { Article, Parfum } from "../types";

/*
  LE CONTEXTE DE COMMANDE
  Plusieurs composants éloignés ont besoin des mêmes informations :
  le carrousel, la boîte et la barre du bas ouvrent tous le formulaire.
  Au lieu de passer ces données de parent en enfant (« prop drilling »),
  on les place dans un contexte : tout composant peut les lire avec useCommande().
*/
interface ValeurCommande {
  /** Ce qu'on est en train de commander (null = formulaire fermé). */
  article: Article | null;
  ouvrir: (article: Article) => void;
  fermer: () => void;
  /** Le parfum affiché dans le carrousel : la barre du bas le propose. */
  parfumCourant: Parfum;
  setParfumCourant: (parfum: Parfum) => void;
}

const Contexte = createContext<ValeurCommande | null>(null);

export function CommandeProvider({ children }: { children: ReactNode }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [parfumCourant, setParfumCourant] = useState<Parfum>(parfums[0]);

  return (
    <Contexte.Provider
      value={{ article, ouvrir: setArticle, fermer: () => setArticle(null), parfumCourant, setParfumCourant }}
    >
      {children}
    </Contexte.Provider>
  );
}

export function useCommande(): ValeurCommande {
  const valeur = useContext(Contexte);
  if (!valeur) throw new Error("useCommande doit être utilisé dans <CommandeProvider>.");
  return valeur;
}
