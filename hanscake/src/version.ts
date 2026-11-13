/*
  QUELLE VERSION AFFICHER ?
  Deux maquettes partagent le même code :
   - "cinema" : ambiance sombre, ouverture par le film ;
   - "retro"  : ambiance années 70, ouverture par l'arc de gâteaux.
  On choisit par l'adresse : ?version=retro ou ?version=cinema.
  Pratique pour la démonstration : un seul lien, deux propositions.
*/
export type Version = "cinema" | "retro";

export const VERSIONS: Record<Version, string> = {
  cinema: "Cinéma",
  retro: "Rétro",
};

/** Version utilisée quand l'adresse ne précise rien. */
const PAR_DEFAUT: Version = "cinema";

function lireVersion(): Version {
  const demandee = new URLSearchParams(window.location.search).get("version");
  return demandee === "retro" || demandee === "cinema" ? demandee : PAR_DEFAUT;
}

export const version: Version = lireVersion();
export const autreVersion: Version = version === "cinema" ? "retro" : "cinema";
