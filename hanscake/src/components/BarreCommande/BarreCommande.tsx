import { categories, optionChoisie } from "../../data/options";
import type { GateauChoisi } from "../../types";
import "./BarreCommande.css";

interface BarreCommandeProps {
  gateau: GateauChoisi;
  onCommander: () => void;
}

/** Barre fixée en bas de l'écran : le bouton « Commander » est toujours à portée de pouce. */
export function BarreCommande({ gateau, onCommander }: BarreCommandeProps) {
  const resume = categories.map((categorie) => optionChoisie(gateau, categorie.id).nom).join(" · ");

  return (
    <div className="barre-commande">
      <div className="conteneur barre-commande__contenu">
        <p className="barre-commande__texte">
          <strong>Votre gâteau</strong>
          <span className="barre-commande__resume">{resume}</span>
        </p>
        <button type="button" className="bouton" onClick={onCommander}>
          Commander
        </button>
      </div>
    </div>
  );
}
