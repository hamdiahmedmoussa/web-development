import type { Parfum } from "../types";

/*
  Les gâteaux du carrousel : ceux qu'on voit dans le réfrigérateur de la boutique
  et sur le compte Instagram hanscake.cafeteria.
  NOMS EXACTS ET PRIX À CONFIRMER avec la pâtisserie.
  Photo : public/images/parfums/<id>.webp

  Ingrédients flottants : facultatifs. Ajoute par exemple
  { fichier: "pistache", nom: "Pistache" } et la photo détourée
  public/images/ingredients/pistache.png : elle apparaîtra autour du gâteau.
*/
export const parfums: Parfum[] = [
  {
    id: "chocolat-miroir",
    nom: "Chocolat glaçage miroir",
    motGeant: "Chocolat",
    description: "Le gâteau de notre vitrine : crème au chocolat, glaçage qui coule sur les bords, plaque Han's Cake sur le dessus.",
    prix: 3500,
    fond: "#6b4434",
    encre: "#fbeee4",
    ingredients: [],
  },
  {
    id: "moka",
    nom: "Moka",
    motGeant: "Moka",
    description: "Crème au café, coulure de chocolat et rosaces, avec une fraise sur le dessus.",
    prix: 3500,
    fond: "#d8bd9c",
    encre: "#3a2414",
    ingredients: [],
  },
  {
    id: "dubai-chocolate",
    nom: "Dubai chocolate",
    motGeant: "Dubaï",
    description: "La nouveauté de la maison, inspirée du chocolat de Dubaï : chocolat et pistache, en couches.",
    prix: 4000,
    fond: "#a3c27a",
    encre: "#1e3312",
    ingredients: [],
  },
  {
    id: "kitkat",
    nom: "Kit Kat",
    motGeant: "Kit Kat",
    description: "Chocolat, rosaces de crème et barres Kit Kat sur le dessus.",
    prix: 4000,
    fond: "#c8102e",
    encre: "#fff3e8",
    ingredients: [],
  },
];
