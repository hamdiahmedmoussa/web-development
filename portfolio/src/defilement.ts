/*
  LE DÉFILEMENT, PARTAGÉ ENTRE LA PAGE ET LA SCÈNE 3D
  Lenis rend le défilement fluide (avec de l'inertie). À chaque mouvement, on écrit
  la progression (0 = haut de page, 1 = bas de page) dans l'objet « defilement ».
  La caméra 3D lit cet objet à chaque image : pas besoin de passer par React,
  ce qui évite de redessiner les composants 60 fois par seconde.
*/
import Lenis from "lenis";

export const defilement = {
  /** 0 en haut de la page, 1 tout en bas. */
  progression: 0,
};

/** Position de la souris, de -1 à 1 sur chaque axe (pour la parallaxe). */
export const souris = { x: 0, y: 0 };

function mettreAJour(y: number) {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  defilement.progression = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
  // La barre fine sur le bord droit lit cette variable CSS.
  document.documentElement.style.setProperty("--progression", String(defilement.progression));
}

/** Démarre le défilement fluide. Renvoie une fonction qui l'arrête. */
export function demarrerDefilement(mouvementReduit: boolean): () => void {
  const surSouris = (e: PointerEvent) => {
    souris.x = (e.clientX / window.innerWidth) * 2 - 1;
    souris.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", surSouris);

  // Mouvement réduit demandé : défilement normal du navigateur, sans inertie.
  if (mouvementReduit) {
    const surDefilement = () => mettreAJour(window.scrollY);
    window.addEventListener("scroll", surDefilement, { passive: true });
    surDefilement();
    return () => {
      window.removeEventListener("scroll", surDefilement);
      window.removeEventListener("pointermove", surSouris);
    };
  }

  const lenis = new Lenis({ autoRaf: true, lerp: 0.08, anchors: true });
  lenis.on("scroll", () => mettreAJour(lenis.scroll));
  mettreAJour(0);
  return () => {
    lenis.destroy();
    window.removeEventListener("pointermove", surSouris);
  };
}
