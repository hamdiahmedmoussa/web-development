/*
  RÉGLAGES DE LA PÂTISSERIE
  Quand Han'sCake donne ses vraies informations, on modifie ce fichier
  et le dossier data/, jamais les composants.
*/
import type { Horaires } from "./types";

export const config = {
  nom: "Han'sCake",
  /**
   * Site de démonstration (présenté avec l'accord de Han'sCake) : affiche une ligne honnête
   * en bas de page et dans l'aperçu de commande. Mettre false pour un vrai site client.
   */
  estUneMaquette: true,

  /** La signature en bas de page : qui a créé le site, et comment le joindre. */
  createur: {
    nom: "Hamdi",
    whatsapp: "25377583719",
    message: "Bonjour Hamdi, j'ai vu le site de Han'sCake. Je voudrais un site pour mon commerce.",
  },

  /**
   * Numéro WhatsApp qui reçoit les commandes : indicatif + numéro, sans « + » ni espaces.
   * Pour tes essais et la démonstration, mets TON numéro : sinon chaque test
   * envoie une vraie commande à la pâtisserie.
   */
  whatsapp: "25377525293",
  telephoneAffiche: "+253 77 52 52 93",

  /**
   * Numéro qui REÇOIT les commandes du formulaire.
   * Pendant la démonstration : le numéro professionnel de Hamdi (77 58 37 19),
   * pour que la commande test arrive sur son téléphone devant le gérant.
   * Pour le vrai site : remettre le numéro de la pâtisserie, "25377525293".
   */
  whatsappCommandes: "25377583719",

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
  /**
   * Réseaux sociaux : chacun avec son icône et l'identifiant affiché à côté.
   * Leurs publications montrent aussi une page Facebook « Han's Cake » et un compte TikTok :
   * ajoute-les ici quand tu auras leurs adresses exactes, par exemple
   * { reseau: "facebook", pseudo: "Han's Cake", lien: "https://www.facebook.com/…" },
   */
  reseaux: [
    { reseau: "instagram", pseudo: "@hanscake.cafeteria", lien: "https://www.instagram.com/hanscake.cafeteria/" },
  ] as { reseau: "instagram" | "facebook" | "tiktok"; pseudo: string; lien: string }[],
};

/** 3500 → « 3 500 FDJ » */
export function formaterPrix(montant: number): string {
  return `${montant.toLocaleString("fr-FR").replace(/ | /g, " ")} ${config.devise}`;
}
