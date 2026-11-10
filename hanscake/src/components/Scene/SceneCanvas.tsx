import { useEffect, useRef, useState } from "react";
import { optionChoisie } from "../../data/options";
import { useMouvementReduit } from "../../hooks/useMouvementReduit";
import type { SceneProps } from "../../types";
import { calculerApparitions } from "./apparitions";
import { dessinerGateau } from "./dessin";

/** Option A : le gâteau dessiné dans un <canvas>. */
export function SceneCanvas({ gateau, progression }: SceneProps) {
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const [taille, setTaille] = useState({ largeur: 0, hauteur: 0 });
  const mouvementReduit = useMouvementReduit();

  // On suit la taille affichée du canvas (elle change quand on tourne le téléphone).
  useEffect(() => {
    const canvas = refCanvas.current;
    if (!canvas) return;
    const observateur = new ResizeObserver(([entree]) => {
      setTaille({ largeur: entree.contentRect.width, hauteur: entree.contentRect.height });
    });
    observateur.observe(canvas);
    return () => observateur.disconnect();
  }, []);

  // On redessine dès qu'un choix, la progression ou la taille change.
  useEffect(() => {
    const canvas = refCanvas.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || taille.largeur === 0) return;

    // Sur les écrans très denses (téléphones), on dessine avec plus de pixels
    // pour un rendu net, sans dépasser ×2 pour rester rapide.
    const densite = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(taille.largeur * densite);
    canvas.height = Math.round(taille.hauteur * densite);
    ctx.setTransform(densite, 0, 0, densite, 0, 0);

    const decor = optionChoisie(gateau, "decor");
    dessinerGateau(
      ctx,
      taille.largeur,
      taille.hauteur,
      {
        genoise: optionChoisie(gateau, "genoise").couleur,
        creme: optionChoisie(gateau, "creme").couleur,
        glacage: optionChoisie(gateau, "glacage").couleur,
        decor: decor.couleur,
        typeDecor: decor.id,
      },
      calculerApparitions(progression, mouvementReduit),
    );
  }, [gateau, progression, taille, mouvementReduit]);

  // Un canvas est une image : on la décrit pour les lecteurs d'écran.
  const description =
    `Gâteau : génoise ${optionChoisie(gateau, "genoise").nom}, ` +
    `${optionChoisie(gateau, "creme").nom}, glaçage ${optionChoisie(gateau, "glacage").nom}, ` +
    `décor ${optionChoisie(gateau, "decor").nom}.`;

  return <canvas ref={refCanvas} className="scene__media" role="img" aria-label={description} />;
}
