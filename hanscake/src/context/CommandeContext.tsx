import { createContext, useContext, useState, type ReactNode } from "react";
import { parfums } from "../data/parfums";
import type { Article, Parfum } from "../types";

/*
  LE CONTEXTE DE COMMANDE
  Plusieurs composants éloignés partagent les mêmes informations :
   - l'arc d'ouverture, le carrousel et la barre du bas montrent le même parfum ;
   - le carrousel, la boîte et la barre du bas ouvrent le formulaire.
  Au lieu de passer ces données de parent en enfant (« prop drilling »),
  on les place dans un contexte : tout composant peut les lire avec useCommande().
*/
interface ValeurCommande {
  /** Ce qu'on est en train de commander (null = formulaire fermé). */
  article: Article | null;
  ouvrir: (article: Article) => void;
  fermer: () => void;
  /** Parfum affiché dans le carrousel, et de quel côté il est arrivé (+1 ou -1). */
  indexParfum: number;
  direction: number;
  parfumCourant: Parfum;
  choisirParfum: (index: number) => void;
}

const Contexte = createContext<ValeurCommande | null>(null);

export function CommandeProvider({ children }: { children: ReactNode }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [[indexParfum, direction], setParfum] = useState<[number, number]>([0, 0]);

  function choisirParfum(nouvel: number) {
    // Le modulo fait boucler : après le dernier parfum, on revient au premier.
    const n = (nouvel + parfums.length) % parfums.length;
    setParfum(([ancien]) => [n, nouvel > ancien ? 1 : -1]);
  }

  return (
    <Contexte.Provider
      value={{
        article,
        ouvrir: setArticle,
        fermer: () => setArticle(null),
        indexParfum,
        direction,
        parfumCourant: parfums[indexParfum],
        choisirParfum,
      }}
    >
      {children}
    </Contexte.Provider>
  );
}

// Le hook vit à côté du Provider qu'il lit : c'est le schéma habituel en React.
// oxlint-disable-next-line react/only-export-components
export function useCommande(): ValeurCommande {
  const valeur = useContext(Contexte);
  if (!valeur) throw new Error("useCommande doit être utilisé dans <CommandeProvider>.");
  return valeur;
}
