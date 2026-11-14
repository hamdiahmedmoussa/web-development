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
    // Le seul gâteau dont le prix est vérifié : commandé à la pâtisserie, 8 parts, 3 500 FDJ.
    // Photo envoyée par la pâtisserie elle-même comme modèle.
    id: "chocolat-perles",
    nom: "Chocolat perles dorées",
    description: "Ganache brillante, carrés de chocolat et perles dorées. Le prénom de votre choix écrit au centre.",
    prix: 3500,
    fond: "#4e2d20",
    encre: "#f6e3c4",
    ingredients: [],
  },
  {
    id: "chocolat-miroir",
    nom: "Chocolat glaçage miroir",
    description: "Le gâteau de notre vitrine : crème au chocolat, glaçage qui coule sur les bords, plaque Han's Cake sur le dessus.",
    prix: 3500,
    fond: "#6b4434",
    encre: "#fbeee4",
    ingredients: [],
  },
  {
    id: "moka",
    nom: "Moka",
    description: "Crème au café, coulure de chocolat et rosaces, avec une fraise sur le dessus.",
    prix: 3500,
    fond: "#d8bd9c",
    encre: "#3a2414",
    ingredients: [],
  },
  {
    id: "dubai-chocolate",
    nom: "Dubai chocolate",
    description: "La nouveauté de la maison, inspirée du chocolat de Dubaï : chocolat et pistache, en couches.",
    prix: 4000,
    fond: "#a3c27a",
    encre: "#1e3312",
    ingredients: [],
  },
  {
    id: "kitkat",
    nom: "Kit Kat",
    description: "Chocolat, rosaces de crème et barres Kit Kat sur le dessus.",
    prix: 4000,
    fond: "#c8102e",
    encre: "#fff3e8",
    ingredients: [],
  },
];
