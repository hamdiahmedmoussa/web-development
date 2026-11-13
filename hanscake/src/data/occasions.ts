import type { Occasion } from "../types";

/*
  Les grandes occasions de fête à Djibouti, avec le gâteau conseillé.
  Le parfum conseillé est un EXEMPLE : à ajuster avec la pâtisserie.
*/
export const occasions: Occasion[] = [
  {
    id: "anniversaire",
    nom: "Anniversaire",
    texte: "Le prénom écrit sur le gâteau, et les bougies que vous apportez.",
    parfumId: "chocolat-framboise",
    emoji: "🎂",
    couleur: "#f6c1cf",
    encre: "#4a1420",
  },
  {
    id: "mariage",
    nom: "Mariage",
    texte: "Pour beaucoup d'invités, nous préparons plusieurs gâteaux : parlons-en sur WhatsApp.",
    parfumId: "vanille-fraise",
    emoji: "💍",
    couleur: "#f3e6cf",
    encre: "#4a3110",
  },
  {
    id: "naissance",
    nom: "Naissance",
    texte: "Un gâteau tout doux pour accueillir le bébé et recevoir la famille.",
    parfumId: "vanille-fraise",
    emoji: "🍼",
    couleur: "#cfe3f2",
    encre: "#12324a",
  },
  {
    id: "aid",
    nom: "Aïd",
    texte: "Pistache et fleur d'oranger pour la table de fête. Commandez tôt : ces jours-là sont très demandés.",
    parfumId: "pistache",
    emoji: "🌙",
    couleur: "#cfe0b4",
    encre: "#1e3312",
  },
  {
    id: "fin-annee",
    nom: "Fin d'année scolaire",
    texte: "Pour fêter les résultats avec la classe ou la famille.",
    parfumId: "caramel",
    emoji: "🎓",
    couleur: "#f6d49a",
    encre: "#3a1d06",
  },
];
