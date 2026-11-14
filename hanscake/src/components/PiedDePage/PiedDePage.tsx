import { config } from "../../config";
import { lienMaps, resumerHoraires } from "../../lib/horaires";
import { IconeFacebook, IconeInstagram, IconeItineraire, IconeTelephone, IconeTiktok, IconeWhatsApp } from "../Icones/Icones";
import { Statut } from "./Statut";
import "./PiedDePage.css";

/** Boutiques (état ouvert / fermé, horaires, itinéraire), contact, réseaux et mention de maquette. */
export function PiedDePage() {
  return (
    <footer className="pied" id="boutiques">
      <div className="conteneur">
        <p className="pied__logo">
          Han's <span>Cake</span> <small>Pâtisserie & Café</small>
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
                <IconeItineraire />
                Y aller
              </a>
            </div>
          ))}

          <div>
            <h2 className="pied__titre">Nous joindre</h2>
            {/* Chaque contact : son icône, puis ce qu'on y trouve vraiment (numéro, identifiant) */}
            <ul className="pied__contacts">
              <li>
                <a href={`https://wa.me/${config.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <IconeWhatsApp />
                  <span>
                    <strong>{config.telephoneAffiche.replace("+253 ", "")}</strong>
                    <small>Commandes sur WhatsApp</small>
                  </span>
                </a>
              </li>
              <li>
                <a href={`tel:+${config.whatsapp}`}>
                  <IconeTelephone />
                  <span>
                    <strong>Appeler la boutique</strong>
                    <small>{config.telephoneAffiche}</small>
                  </span>
                </a>
              </li>
              {config.reseaux.map((r) => {
                const Icone = { instagram: IconeInstagram, facebook: IconeFacebook, tiktok: IconeTiktok }[r.reseau];
                return (
                  <li key={r.lien}>
                    <a href={r.lien} target="_blank" rel="noopener noreferrer">
                      <Icone />
                      <span>
                        <strong>{r.pseudo}</strong>
                        <small>Nos derniers gâteaux sur {r.reseau === "tiktok" ? "TikTok" : r.reseau[0].toUpperCase() + r.reseau.slice(1)}</small>
                      </span>
                    </a>
                  </li>
                );
              })}
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
