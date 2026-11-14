/*
  LE VISEUR : un cercle fin avec un point, qui suit la souris avec un léger retard.
  On le déplace directement (style.transform) au lieu de passer par React :
  c'est beaucoup plus fluide.
*/
import { useEffect, useRef } from "react";

export function Viseur() {
  const cercle = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cibleX = window.innerWidth / 2;
    let cibleY = window.innerHeight / 2;
    let x = cibleX;
    let y = cibleY;
    let image = 0;

    const surSouris = (e: PointerEvent) => {
      cibleX = e.clientX;
      cibleY = e.clientY;
    };
    const boucle = () => {
      // On parcourt 15 % du chemin restant à chaque image : effet de flottement.
      x += (cibleX - x) * 0.15;
      y += (cibleY - y) * 0.15;
      if (cercle.current) cercle.current.style.transform = `translate(${x}px, ${y}px)`;
      image = requestAnimationFrame(boucle);
    };
    window.addEventListener("pointermove", surSouris);
    image = requestAnimationFrame(boucle);
    return () => {
      window.removeEventListener("pointermove", surSouris);
      cancelAnimationFrame(image);
    };
  }, []);

  return (
    <div ref={cercle} className="viseur" aria-hidden="true">
      <span />
    </div>
  );
}
