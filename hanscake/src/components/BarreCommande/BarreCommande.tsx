import { formaterPrix } from "../../config";
import { useCommande } from "../../context/CommandeContext";
import "./BarreCommande.css";

/** Barre fixée en bas de l'écran : « Commander » toujours à portée de pouce. */
export function BarreCommande() {
  const { parfumCourant, ouvrir } = useCommande();

  return (
    <div className="barre">
      <div className="conteneur barre__contenu">
        <p className="barre__texte">
          <span className="barre__pastille" style={{ background: parfumCourant.fond }} aria-hidden="true" />
          <span>
            <strong>{parfumCourant.nom}</strong>
            <span className="barre__prix">dès {formaterPrix(parfumCourant.prix)}</span>
          </span>
        </p>
        <button type="button" className="bouton" onClick={() => ouvrir({ type: "gateau", parfum: parfumCourant })}>
          Commander
        </button>
      </div>
    </div>
  );
}
