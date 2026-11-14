import type { Categorie } from "../types";

/*
  Les prestations du salon. EXEMPLES À CONFIRMER avec Diva Salon :
  la bio dit seulement « salon de beauté et coiffure ». Pas de prix inventés :
  le salon les donne sur WhatsApp tant qu'on n'a pas sa vraie carte.
*/
export const categories: Categorie[] = [
  {
    id: "coiffure",
    nom: "Coiffure",
    prestations: [
      { nom: "Brushing", detail: "Lisse ou avec du volume" },
      { nom: "Coupe et soin", detail: "Shampooing, coupe, brushing" },
      { nom: "Coloration", detail: "Couleur, mèches ou balayage" },
      { nom: "Lissage", detail: "Lissage durable, cheveux brillants" },
      { nom: "Tresses et nattes", detail: "Fines, épaisses, avec ou sans rajouts" },
    ],
  },
  {
    id: "ongles",
    nom: "Ongles",
    prestations: [
      { nom: "Manucure", detail: "Mains, avec ou sans vernis" },
      { nom: "Pédicure", detail: "Pieds, soin et vernis" },
      { nom: "Pose d'ongles", detail: "Gel ou capsules, décor au choix" },
    ],
  },
  {
    id: "maquillage",
    nom: "Maquillage",
    prestations: [
      { nom: "Maquillage de soirée", detail: "Pour un mariage, une fête, une sortie" },
      { nom: "Maquillage de mariée", detail: "Avec essai avant le jour J" },
    ],
  },
  {
    id: "henne",
    nom: "Henné",
    prestations: [
      { nom: "Henné mains", detail: "Motifs fins ou chargés" },
      { nom: "Henné mains et pieds", detail: "Pour les fêtes et l'Aïd" },
      { nom: "Henné de mariée", detail: "La veille ou l'avant-veille du mariage" },
    ],
  },
  {
    id: "soins",
    nom: "Soins et épilation",
    prestations: [
      { nom: "Soin du visage", detail: "Nettoyage et hydratation" },
      { nom: "Épilation", detail: "Visage ou corps" },
    ],
  },
];
