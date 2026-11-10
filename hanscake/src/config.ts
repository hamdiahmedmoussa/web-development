/*
  RÉGLAGES DU SITE
  Tout ce qui dépend de la pâtisserie est ici. Quand Han'sCake fournit ses vraies
  informations, on modifie ce fichier (et le dossier data/), pas les composants.

  Les lignes marquées « À CONFIRMER » sont des exemples ou des informations
  à faire valider par la pâtisserie avant la mise en ligne officielle.
*/

export const config = {
  nom: "Han'sCake",

  /** true = on affiche « Maquette de démonstration, site non officiel ». */
  estUneMaquette: true,

  /**
   * Comment le gâteau est affiché :
   * - "canvas" : gâteau dessiné (option A)
   * - "video"  : vidéo qui avance avec le défilement (option B)
   */
  modeScene: "canvas" as "canvas" | "video",
  /** Fichier de la vidéo pour l'option B (à placer dans public/video/). */
  videoScene: "/video/gateau.mp4",

  /**
   * Numéro WhatsApp qui reçoit les commandes : indicatif du pays + numéro,
   * sans « + » ni espaces. Astuce pour la démonstration : mets TON numéro ici,
   * la commande arrivera sur ton téléphone devant le gérant.
   */
  whatsapp: "25377525293",
  telephoneAffiche: "+253 77 52 52 93",

  /** Prix et règles de commande. À CONFIRMER avec la pâtisserie. */
  prixDepart: "3 500 FDJ",
  partsMinimum: 8,
  choixParts: [8, 10, 12, 15, 20, 30],
  /** Nombre de jours minimum entre la commande et le retrait. */
  delaiJours: 1,

  /** Boutiques. EXEMPLE À CONFIRMER (il y en a plusieurs : ajouter les autres ici). */
  boutiques: [
    {
      nom: "Han'sCake",
      adresse: "Rue de Rome, Djibouti",
      horaires: ["Samedi à jeudi : 7 h – 21 h", "Vendredi : 15 h – 21 h"],
    },
  ],

  /** Réseaux sociaux. EXEMPLE : remplacer « # » par les vrais liens. */
  reseaux: [
    { nom: "Facebook", lien: "#" },
    { nom: "Instagram", lien: "#" },
  ],

  /** Section « Bon à savoir ». À CONFIRMER avec la pâtisserie. */
  bonASavoir: [
    {
      titre: "Prix",
      texte: "À partir de 3 500 FDJ pour un gâteau de 8 parts. Le prix final est confirmé sur WhatsApp.",
    },
    {
      titre: "Délai",
      texte: "Commandez au plus tard la veille du retrait.",
    },
    {
      titre: "Acompte",
      texte: "Un acompte de 50 % lance la préparation. Le reste se règle au retrait.",
    },
    {
      titre: "Inscription",
      texte: "Un prénom ou un message peut être écrit sur le gâteau, sans supplément.",
    },
    {
      titre: "Boîte",
      texte: "Chaque gâteau est remis dans une boîte en carton.",
    },
    {
      titre: "Bougies",
      texte: "Nous n'avons pas de bougies en chiffres : pensez à apporter les vôtres.",
    },
  ],
};
