import { config } from "../../config";
import { lienMaps, resumerHoraires } from "../../lib/horaires";
import { Statut } from "./Statut";
import "./PiedDePage.css";

/** Boutiques (état ouvert / fermé, horaires, itinéraire), contact, réseaux et mention de maquette. */
export function PiedDePage() {
  return (
    <footer className="pied" id="boutiques">
      <div className="conteneur">
        <p className="pied__logo">
          Han's<span>Cake</span> <small>Pâtisserie & Café</small>
        </p>

        <div className="pied__grille">
          {config.boutiques.map((b) => (
            <div key={b.nom} className="pied__boutique">
              <h2 className="pied__titre">{b.nom}</h2>
              <Statut horaires={b.horaires} />
              <address className="pied__adresse">{b.adresse}</address>
              <ul className="pied__liste">
                {resumerHoraires(b.horaires).map((ligne) => (
                  <li key={ligne}>{ligne}</li>
                ))}
              </ul>
              <a className="pied__maps" href={lienMaps(b.recherche)} target="_blank" rel="noopener noreferrer">
                Itinéraire dans Google Maps
              </a>
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
              {config.reseaux.map((r) => (
                <li key={r.nom}>
                  <a href={r.lien}>{r.nom}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {config.estUneMaquette && (
          <p className="pied__mention">
            Maquette de démonstration, site non officiel. Réalisée par Hamdi pour présenter une idée de site à Han'sCake.
            Photos, parfums, prix et horaires sont des exemples à confirmer.
          </p>
        )}
      </div>
    </footer>
  );
}
