import type { Categorie, CategorieId, GateauChoisi, Option } from "../types";

/*
  Les quatre étapes et leurs options.
  EXEMPLES À CONFIRMER : à remplacer par les parfums et décors réellement proposés.
  Pour ajouter ou changer une option, on modifie seulement ce fichier.
*/
export const categories: Categorie[] = [
  {
    id: "genoise",
    titre: "La génoise",
    texte: "Tout commence par une base moelleuse, cuite le matin même.",
    options: [
      { id: "vanille", nom: "Vanille", couleur: "#e8c98a" },
      { id: "chocolat", nom: "Chocolat", couleur: "#6b3f26" },
      { id: "red-velvet", nom: "Red velvet", couleur: "#a3293d" },
    ],
  },
  {
    id: "creme",
    titre: "La crème",
    texte: "Entre deux génoises, une crème généreuse pour le fondant.",
    options: [
      { id: "chantilly", nom: "Chantilly vanille", couleur: "#fff4dc" },
      { id: "ganache", nom: "Ganache chocolat", couleur: "#3b2014" },
      { id: "framboise", nom: "Crème framboise", couleur: "#ef8fae" },
    ],
  },
  {
    id: "glacage",
    titre: "Le glaçage",
    texte: "Un glaçage brillant qui coule doucement sur les bords.",
    options: [
      { id: "chocolat-noir", nom: "Chocolat noir", couleur: "#2e1a12" },
      { id: "ivoire", nom: "Vanille ivoire", couleur: "#f7eedd" },
      { id: "caramel", nom: "Caramel", couleur: "#c98a3d" },
    ],
  },
  {
    id: "decor",
    titre: "Le décor",
    texte: "La touche finale, celle qui fait dire « waouh » à l'ouverture de la boîte.",
    options: [
      { id: "framboises", nom: "Framboises fraîches", couleur: "#d6336c" },
      { id: "copeaux", nom: "Copeaux de chocolat", couleur: "#4a2a1a" },
      { id: "perles", nom: "Perles dorées", couleur: "#e3b866" },
    ],
  },
];

/** Le gâteau affiché au départ : la première option de chaque étape. */
export const gateauParDefaut: GateauChoisi = {
  genoise: "vanille",
  creme: "chantilly",
  glacage: "chocolat-noir",
  decor: "framboises",
};

/** Retrouve l'option choisie pour une étape (ex. : la génoise du gâteau). */
export function optionChoisie(gateau: GateauChoisi, categorieId: CategorieId): Option {
  const categorie = categories.find((c) => c.id === categorieId)!;
  return categorie.options.find((o) => o.id === gateau[categorieId]) ?? categorie.options[0];
}
