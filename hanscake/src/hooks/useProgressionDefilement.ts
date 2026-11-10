import { useEffect, useState, type RefObject } from "react";

/**
 * Mesure où en est le défilement à l'intérieur d'un élément.
 * Renvoie un nombre entre 0 (l'élément arrive) et 1 (on l'a entièrement parcouru).
 *
 * Principe : on imagine une ligne horizontale dans l'écran (au milieu sur grand
 * écran, un peu plus bas sur téléphone car le gâteau occupe le haut). La
 * progression, c'est la part de l'élément déjà passée au-dessus de cette ligne.
 */
export function useProgressionDefilement(ref: RefObject<HTMLElement | null>): number {
  const [progression, setProgression] = useState(0);

  useEffect(() => {
    let image = 0; // numéro de l'image d'animation en attente (0 = aucune)

    const mesurer = () => {
      image = 0;
      const element = ref.current;
      if (!element) return;

      const cadre = element.getBoundingClientRect();
      const grandEcran = window.matchMedia("(min-width: 900px)").matches;
      const ligne = window.innerHeight * (grandEcran ? 0.5 : 0.65);
      const valeur = Math.min(1, Math.max(0, (ligne - cadre.top) / cadre.height));

      // On ne redessine que si la valeur a vraiment changé.
      setProgression((ancienne) => (Math.abs(ancienne - valeur) > 0.002 ? valeur : ancienne));
    };

    // Le défilement déclenche beaucoup d'événements : on mesure au plus
    // une fois par image affichée (requestAnimationFrame) pour rester fluide.
    const planifier = () => {
      if (!image) image = requestAnimationFrame(mesurer);
    };

    mesurer();
    window.addEventListener("scroll", planifier, { passive: true });
    window.addEventListener("resize", planifier);
    return () => {
      window.removeEventListener("scroll", planifier);
      window.removeEventListener("resize", planifier);
      cancelAnimationFrame(image);
    };
  }, [ref]);

  return progression;
}
