import type { Patisserie } from "../types";

/*
  Les classiques de la maison. Prix = EXEMPLES À CONFIRMER.
  Image attendue : public/images/vitrine/<id>.png
*/
export const vitrine: Patisserie[] = [
  {
    id: "fraisier",
    nom: "Fraisier",
    description: "Génoise, crème mousseline, fraises fraîches.",
    prix: 600,
    couleur: "#f4b6c2",
    encre: "#4a1420",
  },
  {
    id: "millefeuille",
    nom: "Millefeuille vanille",
    description: "Feuilletage caramélisé, crème pâtissière.",
    prix: 500,
    couleur: "#f1d9a7",
    encre: "#4a3110",
  },
  {
    id: "tarte-citron",
    nom: "Tarte citron meringuée",
    description: "Pâte sablée, crème de citron, meringue dorée.",
    prix: 500,
    couleur: "#f5e27a",
    encre: "#3d3605",
  },
  {
    id: "eclair-chocolat",
    nom: "Éclair au chocolat",
    description: "Pâte à choux, crémeux chocolat noir.",
    prix: 400,
    couleur: "#8a5a44",
    encre: "#fbeee4",
  },
  {
    id: "paris-brest",
    nom: "Paris-brest",
    description: "Couronne de choux, crème pralinée aux noisettes.",
    prix: 600,
    couleur: "#d9a066",
    encre: "#3a210a",
  },
  {
    id: "opera",
    nom: "Opéra",
    description: "Biscuit au café, ganache, glaçage miroir.",
    prix: 600,
    couleur: "#4a3029",
    encre: "#f7e3cf",
  },
];
