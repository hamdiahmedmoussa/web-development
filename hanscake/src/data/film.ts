import type { EtapeFilm } from "../types";

/*
  Les étapes du film, reprises de la démo de référence.
  « poids » règle combien de défilement chaque étape occupe.
*/
export const etapesFilm: EtapeFilm[] = [
  {
    debut: 0,
    fin: 0.8,
    poids: 1.1,
    titre: "Fait sous vos yeux",
    texte: "Des œufs au gâteau fini, suivez chaque étape en faisant défiler la page.",
  },
  {
    debut: 0.8,
    fin: 7.9,
    poids: 2.2,
    titre: "De vrais ingrédients",
    texte: "Des œufs, du beurre, du vrai chocolat. Tout ce qui entre dans le bol, vous pourriez le nommer.",
  },
  {
    debut: 7.9,
    fin: 13.3,
    poids: 1.9,
    titre: "Une pâte lisse",
    texte: "Versée d'un seul geste, elle remplit le moule jusqu'à former un miroir de chocolat.",
  },
  {
    debut: 13.3,
    fin: 14.5,
    poids: 1.2,
    titre: "Le four fait le reste",
    texte: "Le gâteau gonfle, se craquelle un peu, et sort encore fumant.",
  },
  {
    debut: 14.5,
    fin: 24.1,
    poids: 2.6,
    titre: "La touche de fête",
    texte: "Un glaçage qui coule, des framboises par-dessus. Le gâteau est prêt.",
  },
];
