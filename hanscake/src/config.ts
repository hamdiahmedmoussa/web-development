/*
  RÉGLAGES DE LA PÂTISSERIE
  Quand Han'sCake donne ses vraies informations, on modifie ce fichier
  et le dossier data/, jamais les composants.
*/
export const config = {
  nom: "Han'sCake",
  estUneMaquette: true,

  /**
   * Section d'ouverture :
   * - "arc"  : tous les gâteaux et pâtisseries sur un arc rétro en 3D
   * - "film" : le film qui avance avec le défilement
   */
  ouverture: "arc" as "arc" | "film",

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

  /** Boutiques : il y en a plusieurs, à compléter. Horaires = EXEMPLE À CONFIRMER. */
  boutiques: [
    {
      nom: "Han'sCake, rue de Rome",
      adresse: "Rue de Rome, Djibouti",
      horaires: ["Samedi au jeudi : 7 h à 21 h", "Vendredi : 15 h à 21 h"],
    },
  ],

  /** Réseaux sociaux : remplacer « # » par les vrais liens. */
  reseaux: [
    { nom: "Facebook", lien: "#" },
    { nom: "Instagram", lien: "#" },
  ],
};

/** 3500 → « 3 500 FDJ » */
export function formaterPrix(montant: number): string {
  return `${montant.toLocaleString("fr-FR").replace(/ | /g, " ")} ${config.devise}`;
}
