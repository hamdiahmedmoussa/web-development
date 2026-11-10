import { config } from "../../config";
import "./PiedDePage.css";

/** Adresse, horaires, téléphone et réseaux sociaux. */
export function PiedDePage() {
  return (
    <footer className="pied">
      <div className="conteneur pied__grille">
        {config.boutiques.map((boutique) => (
          <div key={boutique.adresse}>
            <h2 className="pied__titre">{boutique.nom}</h2>
            <address className="pied__adresse">{boutique.adresse}</address>
            <ul className="pied__liste">
              {boutique.horaires.map((ligne) => (
                <li key={ligne}>{ligne}</li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="pied__titre">Nous joindre</h2>
          <ul className="pied__liste">
            <li>
              <a href={`tel:+${config.whatsapp}`}>{config.telephoneAffiche}</a>
            </li>
            <li>
              <a href={`https://wa.me/${config.whatsapp}`} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
            {config.reseaux.map((reseau) => (
              <li key={reseau.nom}>
                <a href={reseau.lien}>{reseau.nom}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {config.estUneMaquette && (
        <p className="conteneur pied__mention">
          Maquette de démonstration, site non officiel. Adresse, horaires, produits et réseaux sont des exemples à
          confirmer.
        </p>
      )}
    </footer>
  );
}
