// Les « formes » des données du site Diva Salon.

/** Horaires : jour (0 = dimanche … 6 = samedi) → [ouverture, fermeture] ou null. */
export type Horaires = Record<number, [string, string] | null>;

/** Une prestation du salon. */
export interface Prestation {
  nom: string;
  detail: string;
}

/** Une catégorie de prestations (Coiffure, Ongles…). */
export interface Categorie {
  id: string;
  nom: string;
  prestations: Prestation[];
}

/** Un thème de la galerie et ses photos. */
export interface Theme {
  id: string;
  nom: string;
  texte: string;
  photos: { fichier: string; description: string }[];
}

/**
 * Ce que la cliente réserve : une prestation de la liste,
 * ou un style vu dans la galerie (« Je veux ce style »).
 */
export type Demande = { type: "prestation"; categorie: string; prestation: string } | { type: "style"; theme: string; modele: string };

/** Ce que la cliente saisit dans le formulaire. */
export interface InfosRendezVous {
  prenom: string;
  /** AAAA-MM-JJ */
  date: string;
  /** "matin", "apres-midi" ou "soir" */
  moment: string;
  note: string;
}
