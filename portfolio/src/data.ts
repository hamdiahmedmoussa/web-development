/*
  TOUT LE CONTENU DU PORTFOLIO
  Pour changer un texte, un lien ou une section : c'est ici, jamais dans les composants.
*/

export const moi = {
  prenom: "Hamdi",
  /** Lettre du logo en haut à gauche (« H. »). */
  initiale: "H",
  sousTitre: "Étudiant en Électricité & Énergie · Développeur web",
  /** Micro-texte en bas à droite de l'accueil. */
  domaines: ["Web", "Énergie", "Interfaces"],
  ville: "Djibouti",
  annee: 2026,
};

/** Les deux mots de l'intro : le premier se forme, puis se transforme en second. */
export const intro = {
  mot1: "PORTFOLIO",
  mot2: "HAMDI",
};

/** Le menu en haut à droite. Chaque « id » correspond à une section de la page. */
export const menu = [
  { id: "projets", label: "Projets" },
  { id: "competences", label: "Compétences" },
  { id: "parcours", label: "Parcours" },
  { id: "contact", label: "Contact" },
];

/** Les sections, dans l'ordre. Le numéro s'affiche en petit devant le titre : (02), (03)… */
export const sections = [
  { id: "projets", numero: "02", titre: "Projets", italique: "choisis" },
  { id: "competences", numero: "03", titre: "La", italique: "boîte à outils" },
  { id: "parcours", numero: "05", titre: "Le", italique: "parcours" },
  { id: "contact", numero: "07", titre: "Construisons", italique: "quelque chose" },
];
