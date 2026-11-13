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
    titre: "Un gâteau, du bol à la boîte",
    texte: "Faites défiler : voici comment nous préparons le chocolat framboise, rue de Rome.",
  },
  {
    debut: 0.8,
    fin: 7.9,
    poids: 2.2,
    titre: "Œufs, beurre, chocolat",
    texte: "Rien d'autre dans le bol. Pas de préparation en sachet.",
  },
  {
    debut: 7.9,
    fin: 13.3,
    poids: 1.9,
    titre: "Dans le moule",
    texte: "La pâte est versée d'un coup, elle se lisse toute seule.",
  },
  {
    debut: 13.3,
    fin: 14.5,
    poids: 1.2,
    titre: "Au four",
    texte: "Il gonfle, il craque un peu sur le dessus. C'est bon signe.",
  },
  {
    debut: 14.5,
    fin: 24.1,
    poids: 2.6,
    titre: "Glaçage, framboises",
    texte: "Le glaçage coule sur les bords, les framboises vont dessus. Il ne reste qu'à l'emporter.",
  },
];
