import type { Patisserie } from "../types";

/*
  Pâtisseries à la pièce, vues sur le compte Instagram hanscake.cafeteria.
  NOMS EXACTS ET PRIX À CONFIRMER. Photo : public/images/vitrine/<id>.webp
*/
export const vitrine: Patisserie[] = [
  {
    id: "dubai-chocolate",
    nom: "Part de Dubai chocolate",
    description: "Chocolat et pistache en couches, la nouveauté de la maison.",
    prix: 700,
    couleur: "#c9dca8",
    encre: "#1e3312",
  },
  {
    id: "trois-chocolats",
    nom: "Mousse trois chocolats",
    description: "Noir, lait et blanc, sur un biscuit fin.",
    prix: 600,
    couleur: "#8a5a44",
    encre: "#fbeee4",
  },
  {
    id: "cheesecake-oreo",
    nom: "Cheesecake Oreo",
    description: "Crème au fromage et biscuits Oreo.",
    prix: 600,
    couleur: "#e9e4dc",
    encre: "#2b2120",
  },
  {
    id: "cheesecake-chocolat",
    nom: "Chocolate cheesecake",
    description: "En verrine, avec une fraise enrobée de chocolat.",
    prix: 500,
    couleur: "#f4c6cf",
    encre: "#4a1420",
  },
  {
    id: "mousse-coco",
    nom: "Coconut mousse",
    description: "Mousse à la noix de coco, servie dans une coque.",
    prix: 500,
    couleur: "#f3e7d3",
    encre: "#4a3110",
  },
  {
    id: "eclairs",
    nom: "Éclair",
    description: "Pâte à choux et crème, parfums du jour.",
    prix: 400,
    couleur: "#e8b77a",
    encre: "#3a210a",
  },
];
