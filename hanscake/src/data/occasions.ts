import type { Occasion } from "../types";

/*
  Les grandes occasions de fête à Djibouti, avec le gâteau conseillé.
  Le parfum conseillé est un EXEMPLE : à ajuster avec la pâtisserie.
*/
export const occasions: Occasion[] = [
  {
    id: "anniversaire",
    nom: "Anniversaire",
    texte: "Nous écrivons le prénom dessus. Les bougies chiffres, apportez-les : nous n'en vendons pas.",
    parfumId: "chocolat-framboise",
    couleur: "#f6c1cf",
    encre: "#4a1420",
  },
  {
    id: "mariage",
    nom: "Mariage",
    texte: "Au-delà de 24 parts, nous faisons plusieurs gâteaux. Écrivez-nous quelques jours avant.",
    parfumId: "vanille-fraise",
    couleur: "#f3e6cf",
    encre: "#4a3110",
  },
  {
    id: "naissance",
    nom: "Naissance",
    texte: "Pour les visites de la famille, quand tout le monde passe voir le bébé.",
    parfumId: "vanille-fraise",
    couleur: "#cfe3f2",
    encre: "#12324a",
  },
  {
    id: "aid",
    nom: "Aïd",
    texte: "Ces jours-là, tout le monde commande en même temps. Prenez un jour d'avance de plus.",
    parfumId: "pistache",
    couleur: "#cfe0b4",
    encre: "#1e3312",
  },
  {
    id: "fin-annee",
    nom: "Fin d'année scolaire",
    texte: "Pour la fête de la classe ou pour fêter les résultats à la maison.",
    parfumId: "caramel",
    couleur: "#f6d49a",
    encre: "#3a1d06",
  },
];
