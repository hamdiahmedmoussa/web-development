import type { Theme } from "../types";

/*
  LA GALERIE : de vrais gâteaux de Han'sCake, tirés de leur compte Instagram
  (hanscake.cafeteria), rangés par occasion.
  ⚠️ Avant toute mise en ligne publique : demander l'accord de la pâtisserie
  (et des familles, quand un prénom d'enfant est écrit sur le gâteau).
  Photo : public/images/galerie/<fichier>.webp
*/
export const themes: Theme[] = [
  {
    id: "enfants",
    nom: "Anniversaire enfant",
    texte: "Son héros préféré, son prénom et son âge : nous le faisons en pâte à sucre.",
    photos: [
      { fichier: "enfant-mario", description: "Gâteau Mario à deux étages" },
      { fichier: "enfant-spiderman", description: "Gâteau Spider-Man" },
      { fichier: "enfant-vaiana", description: "Gâteau Vaiana, l'océan et les fleurs" },
      { fichier: "enfant-cars", description: "Gâteau Cars à trois étages" },
      { fichier: "enfant-chateau", description: "Château de princesse" },
      { fichier: "enfant-chantier", description: "Gâteau chantier avec pelleteuse et camion" },
    ],
  },
  {
    id: "anniversaires",
    nom: "Anniversaire adulte",
    texte: "Fleurs, dorures et le prénom écrit sur le plateau, pour 20 ans comme pour 40.",
    photos: [
      { fichier: "anniv-couronne", description: "Gâteau rouge, couronne dorée et roses" },
      { fichier: "anniv-or-rouge", description: "Gâteau or et rouge aux roses" },
      { fichier: "anniv-soeur-en-or", description: "Gâteau noir et or, « Tu es une sœur en or »" },
      { fichier: "anniv-fleur", description: "Gâteau noir à fleur rose" },
    ],
  },
  {
    id: "mariages",
    nom: "Mariage et fiançailles",
    texte: "Gâteaux à étages et fleurs en sucre. Au-delà de 24 parts, écrivez-nous quelques jours avant.",
    photos: [
      { fichier: "mariage-roses", description: "Pièce à étages et guirlande de roses" },
      { fichier: "mariage-blanc-dore", description: "Gâteau blanc à étages, motifs dorés" },
      { fichier: "mariage-deux-tons", description: "Gâteau à étages blanc et chocolat" },
      { fichier: "mariage-bleu", description: "Gâteau bleu à trois étages et roses" },
      { fichier: "mariage-couple", description: "Gâteau blanc avec figurine des mariés" },
    ],
  },
  {
    id: "naissance",
    nom: "40e jour et naissance",
    texte: "Pour la fête du 40e jour ou l'arrivée du bébé, avec son prénom.",
    photos: [
      { fichier: "40e-lune", description: "Ourson sur la lune, 40e jour" },
      { fichier: "40e-mickey", description: "Gâteau Mickey à deux étages, 40e jour" },
      { fichier: "40e-ourson", description: "Ourson et étoiles, 40e jour" },
      { fichier: "40e-elephant", description: "Éléphant et ballons bleus" },
    ],
  },
  {
    id: "diplomes",
    nom: "Diplôme et fin d'année",
    texte: "La toque, le diplôme roulé et les félicitations écrites sur le gâteau.",
    photos: [
      { fichier: "diplome-felicitations", description: "Gâteau noir et rouge, toque et diplôme" },
      { fichier: "diplome-2022", description: "Gâteau félicitations, promotion 2022" },
      { fichier: "diplome-chocolat", description: "Gâteau coulure de chocolat et toque" },
      { fichier: "diplome-toque", description: "Toque et rose rouge" },
    ],
  },
  {
    id: "fetes",
    nom: "Ramadan et Aïd",
    texte: "Boîtes de douceurs à offrir et gâteaux pour la table de fête. Ces jours-là, tout le monde commande en même temps : prenez de l'avance.",
    photos: [
      { fichier: "aid-boite", description: "Boîte de douceurs de l'Aïd" },
      { fichier: "aid-douceurs", description: "Plateau de douceurs assorties" },
      { fichier: "ramadan-coran", description: "Gâteau en crème, jeune fille et Coran" },
    ],
  },
];
