import type { Parfum } from "../types";

/*
  Les gâteaux du carrousel. EXEMPLES À CONFIRMER (parfums et prix).
  Images attendues :
   - le gâteau : public/images/parfums/<id>.png
   - les ingrédients : public/images/ingredients/<fichier>.png
*/
export const parfums: Parfum[] = [
  {
    id: "chocolat-framboise",
    nom: "Chocolat framboise",
    motGeant: "Chocolat",
    description: "Génoise au cacao, ganache fondante et framboises fraîches. Le gâteau du film.",
    prix: 3500,
    fond: "#e2557a",
    encre: "#2a0d16",
    ingredients: [
      { fichier: "framboise", nom: "Framboise" },
      { fichier: "copeau-chocolat", nom: "Copeau de chocolat" },
      { fichier: "framboise", nom: "Framboise" },
      { fichier: "feuille-menthe", nom: "Feuille de menthe" },
    ],
  },
  {
    id: "vanille-fraise",
    nom: "Vanille fraise",
    motGeant: "Vanille",
    description: "Génoise vanille, chantilly légère et fraises coupées le matin même.",
    prix: 3500,
    fond: "#f7d3cb",
    encre: "#5c1f2c",
    ingredients: [
      { fichier: "fraise", nom: "Fraise" },
      { fichier: "gousse-vanille", nom: "Gousse de vanille" },
      { fichier: "creme-fouettee", nom: "Crème fouettée" },
      { fichier: "fraise", nom: "Fraise" },
    ],
  },
  {
    id: "pistache",
    nom: "Pistache",
    motGeant: "Pistache",
    description: "Crème de pistache torréfiée, éclats croquants et une pointe de fleur d'oranger.",
    prix: 4000,
    fond: "#b5cc8a",
    encre: "#1e3312",
    ingredients: [
      { fichier: "pistache-eclat", nom: "Éclats de pistache" },
      { fichier: "feuille-menthe", nom: "Feuille de menthe" },
      { fichier: "pistache-eclat", nom: "Éclats de pistache" },
    ],
  },
  {
    id: "red-velvet",
    nom: "Red velvet",
    motGeant: "Velvet",
    description: "Génoise rouge veloutée, crème au fromage frais et cerises confites.",
    prix: 4000,
    fond: "#8e1b2c",
    encre: "#fde9e3",
    ingredients: [
      { fichier: "cerise", nom: "Cerise" },
      { fichier: "creme-fouettee", nom: "Crème" },
      { fichier: "cerise", nom: "Cerise" },
    ],
  },
  {
    id: "caramel",
    nom: "Caramel noisette",
    motGeant: "Caramel",
    description: "Caramel au beurre salé qui coule sur les bords, noisettes torréfiées.",
    prix: 3500,
    fond: "#e4a24c",
    encre: "#3a1d06",
    ingredients: [
      { fichier: "caramel-morceau", nom: "Morceau de caramel" },
      { fichier: "noisette", nom: "Noisette" },
      { fichier: "noisette", nom: "Noisette" },
      { fichier: "caramel-morceau", nom: "Morceau de caramel" },
    ],
  },
];
