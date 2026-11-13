import type { CSSProperties } from "react";

/*
  Une pluie légère de vermicelles de sucre, derrière le gâteau.
  Tout est en CSS (une animation par vermicelle) : rien à calculer en JavaScript.
  Les valeurs « au hasard » sont fixes (calculées une fois) pour que l'affichage
  soit le même à chaque chargement. Désactivée si « moins d'animations ».
*/
const COULEURS = ["#fff4e6", "#ffd23f", "#ff8fb1", "#8fd1c1", "#5a2e1f"];

const VERMICELLES = Array.from({ length: 22 }, (_, i) => ({
  gauche: (i * 37) % 100, // réparti sur toute la largeur
  delai: (i * 0.73) % 8,
  duree: 7 + ((i * 1.7) % 5),
  rotation: (i * 47) % 180,
  couleur: COULEURS[i % COULEURS.length],
}));

export function Vermicelles() {
  return (
    <div className="vermicelles" aria-hidden="true">
      {VERMICELLES.map((v, i) => (
        <span
          key={i}
          style={
            {
              left: `${v.gauche}%`,
              background: v.couleur,
              animationDelay: `-${v.delai}s`,
              animationDuration: `${v.duree}s`,
              "--rotation": `${v.rotation}deg`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
