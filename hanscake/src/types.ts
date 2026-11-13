// Les « formes » des données. TypeScript vérifie qu'on les respecte partout.

/** Une étape du film : ses temps dans la vidéo et ses textes. */
export interface EtapeFilm {
  /** Début et fin de l'étape dans la vidéo, en secondes. */
  debut: number;
  fin: number;
  /** Part de défilement donnée à cette étape (plus c'est grand, plus elle dure). */
  poids: number;
  titre: string;
  texte: string;
}

/** Un ingrédient qui flotte autour d'un gâteau du carrousel. */
export interface Ingredient {
  /** Nom du fichier dans public/images/ingredients/, sans extension. */
  fichier: string;
  nom: string;
}

/** Un gâteau du carrousel. */
export interface Parfum {
  id: string;
  nom: string;
  /** Mot géant affiché derrière le gâteau. */
  motGeant: string;
  description: string;
  prix: number;
  /** Couleur de fond de l'écran et couleur du texte posé dessus. */
  fond: string;
  encre: string;
  ingredients: Ingredient[];
}

/** Une pâtisserie de la vitrine. */
export interface Patisserie {
  id: string;
  nom: string;
  description: string;
  prix: number;
  couleur: string;
  encre: string;
}

/** Ce que le client commande : un gâteau du carrousel ou une boîte de pâtisseries. */
/** Ce que le client commande : un gâteau (avec un nombre de parts conseillé) ou une boîte. */
export type Article = { type: "gateau"; parfum: Parfum; parts?: number } | { type: "boite"; patisseries: Patisserie[] };

/** Horaires d'une boutique : jour (0 = dimanche … 6 = samedi) → [ouverture, fermeture] ou null. */
export type Horaires = Record<number, [string, string] | null>;

/** Une occasion de fête et le gâteau qu'on conseille pour elle. */
export interface Occasion {
  id: string;
  nom: string;
  texte: string;
  /** id du parfum conseillé (voir data/parfums.ts) */
  parfumId: string;
  couleur: string;
  encre: string;
}

/** Un avis client. Uniquement de VRAIS avis, fournis par la pâtisserie. */
export interface Avis {
  prenom: string;
  texte: string;
  /** Où l'avis a été donné : Google, Facebook, WhatsApp… */
  source: string;
}

/** Ce que le client saisit dans le formulaire. */
export interface InfosCommande {
  prenom: string;
  /** AAAA-MM-JJ, format du champ <input type="date"> */
  date: string;
  /** HH:MM */
  heure: string;
  parts: number;
  inscription: string;
}
