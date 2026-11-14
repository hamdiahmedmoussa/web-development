import type { Horaires } from "./types";

/*
  RÉGLAGES DU SALON
  Quand Diva Salon donne ses vraies informations, on modifie ce fichier et data/.
  Ce qui est marqué « À CONFIRMER » vient d'une recherche en ligne ou est un exemple.
*/
export const config = {
  nom: "Diva Salon",
  estUneMaquette: true,

  /** Ce qui distingue le salon : réservé aux femmes (bio Instagram et Facebook). */
  promesse: "Réservé aux femmes",

  /**
   * Numéro qui REÇOIT les demandes de rendez-vous.
   * Pendant la démonstration : le numéro professionnel de Hamdi.
   * Pour le vrai site : le numéro WhatsApp du salon.
   */
  whatsappRendezVous: "25377583719",
  /** Numéro du salon affiché sur le site. À CONFIRMER : inconnu pour l'instant. */
  telephoneSalon: "",

  /** Fuseau horaire : l'état « ouvert » est juste même pour une visiteuse à l'étranger. */
  fuseau: "Africa/Djibouti",

  /** Adresse : Bawadi Mall (publication Facebook du salon). HORAIRES = EXEMPLE À CONFIRMER. */
  salon: {
    adresse: "Bawadi Mall, Djibouti",
    recherche: "Diva Salon, Bawadi Mall, Djibouti",
    horaires: {
      0: ["09:00", "20:00"],
      1: ["09:00", "20:00"],
      2: ["09:00", "20:00"],
      3: ["09:00", "20:00"],
      4: ["09:00", "20:00"],
      5: ["15:00", "20:00"],
      6: ["09:00", "20:00"],
    } as Horaires,
  },

  reseaux: [
    { reseau: "instagram", pseudo: "@divasalondjibouti", lien: "https://www.instagram.com/divasalondjibouti/" },
    { reseau: "facebook", pseudo: "Diva Salon", lien: "https://www.facebook.com/divasalondjibouti/" },
  ] as { reseau: "instagram" | "facebook"; pseudo: string; lien: string }[],
};
