/*
  RÉGLAGES DE LA PÂTISSERIE
  Quand Han'sCake donne ses vraies informations, on modifie ce fichier
  et le dossier data/, jamais les composants.
*/
import type { Horaires } from "./types";

export const config = {
  nom: "Han'sCake",
  estUneMaquette: true,

  /**
   * Numéro WhatsApp qui reçoit les commandes : indicatif + numéro, sans « + » ni espaces.
   * Pour tes essais et la démonstration, mets TON numéro : sinon chaque test
   * envoie une vraie commande à la pâtisserie.
   */
  whatsapp: "25377525293",
  telephoneAffiche: "+253 77 52 52 93",

  devise: "FDJ",
  partsMinimum: 8,
  choixParts: [8, 10, 12, 16, 20, 24],
  /** Jours minimum entre la commande et le retrait (« la veille au minimum »). */
  delaiJours: 1,
  /** Nombre de pâtisseries dans une boîte. */
  tailleBoite: 3,

  /**
   * Boutiques : il y en a plusieurs, ajoute-les ici. HORAIRES = EXEMPLES À CONFIRMER.
   * horaires : pour chaque jour (0 = dimanche … 6 = samedi), [ouverture, fermeture]
   * au format "HH:MM", ou null si la boutique est fermée ce jour-là.
   * recherche : ce que Google Maps doit chercher pour trouver la boutique.
   */
  boutiques: [
    {
      nom: "Han'sCake, rue de Rome",
      adresse: "Rue de Rome, Djibouti",
      recherche: "Han'sCake, Rue de Rome, Djibouti",
      horaires: {
        0: ["07:00", "21:00"],
        1: ["07:00", "21:00"],
        2: ["07:00", "21:00"],
        3: ["07:00", "21:00"],
        4: ["07:00", "21:00"],
        5: ["15:00", "21:00"], // vendredi
        6: ["07:00", "21:00"],
      } as Horaires,
    },
    {
      // Deuxième boutique, inaugurée le 15 mai 2022 (affiche Instagram). ADRESSE ET HORAIRES À CONFIRMER.
      nom: "Han'sCake, Cité Saoudi",
      adresse: "Cité Saoudi, Djibouti",
      recherche: "Han's Cake, Cité Saoudi, Djibouti",
      horaires: {
        0: ["07:00", "21:00"],
        1: ["07:00", "21:00"],
        2: ["07:00", "21:00"],
        3: ["07:00", "21:00"],
        4: ["07:00", "21:00"],
        5: ["15:00", "21:00"],
        6: ["07:00", "21:00"],
      } as Horaires,
    },
  ],
  /** Fuseau horaire des boutiques : l'état « ouvert » est juste même pour un visiteur à l'étranger. */
  fuseau: "Africa/Djibouti",

  /** Réseaux sociaux : remplacer « # » par les vrais liens. */
  reseaux: [
    // Ajouter Facebook ici quand on aura l'adresse exacte de leur page.
    { nom: "Instagram", lien: "https://www.instagram.com/hanscake.cafeteria/" },
  ],
};

/** 3500 → « 3 500 FDJ » */
export function formaterPrix(montant: number): string {
  return `${montant.toLocaleString("fr-FR").replace(/ | /g, " ")} ${config.devise}`;
}
