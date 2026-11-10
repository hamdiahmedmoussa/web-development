// Les « formes » des données du site. TypeScript vérifie qu'on les respecte partout.

/** Les quatre étapes de la composition du gâteau. */
export type CategorieId = "genoise" | "creme" | "glacage" | "decor";

/** Un choix possible dans une étape (ex. : génoise au chocolat). */
export interface Option {
  id: string;
  nom: string;
  /** Couleur utilisée pour dessiner cette option sur le gâteau. */
  couleur: string;
}

/** Une étape : son titre, son texte et ses trois options. */
export interface Categorie {
  id: CategorieId;
  titre: string;
  texte: string;
  options: Option[];
}

/**
 * Le gâteau composé par le client : pour chaque étape, l'id de l'option choisie.
 * Exemple : { genoise: "chocolat", creme: "chantilly", ... }
 */
export type GateauChoisi = Record<CategorieId, string>;

/** Une pâtisserie de la section « En vitrine ». */
export interface Patisserie {
  nom: string;
  description: string;
  /** Chemin de la photo (dans public/images/vitrine). Vide = pas encore de photo. */
  photo?: string;
  /** Couleurs du visuel provisoire affiché tant qu'il n'y a pas de photo. */
  couleurs: [string, string];
}

/** Ce que le client saisit dans le formulaire de commande. */
export interface InfosCommande {
  prenom: string;
  /** Date de retrait au format AAAA-MM-JJ (celui du champ <input type="date">). */
  date: string;
  /** Heure de retrait au format HH:MM. */
  heure: string;
  parts: number;
  /** Texte à écrire sur le gâteau (facultatif). */
  inscription: string;
}

/**
 * Ce que reçoit la scène du gâteau, qu'elle soit dessinée (canvas) ou filmée (vidéo).
 * Les deux versions respectent ce même « contrat » : c'est ce qui permet de passer
 * de l'une à l'autre sans toucher au reste du site.
 */
export interface SceneProps {
  gateau: GateauChoisi;
  /** Avancement dans les quatre étapes : 0 = début, 1 = gâteau terminé. */
  progression: number;
}
