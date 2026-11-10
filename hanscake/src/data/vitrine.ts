import type { Patisserie } from "../types";

/*
  Pâtisseries de la section « En vitrine ».
  EXEMPLES : à remplacer par les vraies pâtisseries et leurs photos.
  Pour ajouter une photo : la placer dans public/images/vitrine/
  puis écrire par exemple  photo: "/images/vitrine/fraisier.webp".
*/
export const vitrine: Patisserie[] = [
  {
    nom: "Fraisier",
    description: "Génoise légère, crème mousseline et fraises fraîches.",
    couleurs: ["#f6c1cf", "#c2255c"],
  },
  {
    nom: "Éclair au chocolat",
    description: "Pâte à choux dorée, crème au chocolat noir, glaçage brillant.",
    couleurs: ["#8a5a3c", "#2e1a12"],
  },
  {
    nom: "Tarte au citron",
    description: "Pâte sablée croquante, crème de citron, meringue dorée.",
    couleurs: ["#fbe9a0", "#d9a520"],
  },
  {
    nom: "Mille-feuille",
    description: "Trois couches de feuilletage caramélisé et crème vanille.",
    couleurs: ["#f5e9d7", "#c98a3d"],
  },
];
