import type { Theme } from "../types";

/*
  LES RÉALISATIONS DU SALON
  Photos attendues dans public/images/galerie/<fichier>.png (ou .webp).
  À récupérer depuis leur Instagram (@divasalondjibouti), avec leur accord
  avant toute mise en ligne publique.
*/
export const themes: Theme[] = [
  {
    id: "coiffure",
    nom: "Coiffures",
    texte: "Brushing, couleurs, tresses : montrez-nous ce qui vous plaît, nous le reproduisons.",
    photos: [
      { fichier: "coiffure-1", description: "Brushing volume" },
      { fichier: "coiffure-2", description: "Coloration et mèches" },
      { fichier: "coiffure-3", description: "Tresses" },
      { fichier: "coiffure-4", description: "Coiffure de soirée" },
    ],
  },
  {
    id: "mariee",
    nom: "Mariées",
    texte: "Coiffure, maquillage et henné pour le grand jour. Réservez quelques semaines avant.",
    photos: [
      { fichier: "mariee-1", description: "Maquillage de mariée" },
      { fichier: "mariee-2", description: "Coiffure de mariée" },
      { fichier: "mariee-3", description: "Henné de mariée" },
    ],
  },
  {
    id: "ongles",
    nom: "Ongles",
    texte: "Manucure, pose de gel et décors : envoyez-nous la photo du modèle que vous voulez.",
    photos: [
      { fichier: "ongles-1", description: "Pose gel nude" },
      { fichier: "ongles-2", description: "Ongles décorés" },
      { fichier: "ongles-3", description: "French manucure" },
    ],
  },
  {
    id: "henne",
    nom: "Henné",
    texte: "Motifs fins ou chargés, pour les fêtes, les mariages et l'Aïd.",
    photos: [
      { fichier: "henne-1", description: "Henné mains, motifs fins" },
      { fichier: "henne-2", description: "Henné mains et pieds" },
      { fichier: "henne-3", description: "Henné floral" },
    ],
  },
];
