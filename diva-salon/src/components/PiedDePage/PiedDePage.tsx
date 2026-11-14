import { config } from "../../config";
import { lienMaps, resumerHoraires } from "../../lib/horaires";
import { IconeFacebook, IconeInstagram, IconeItineraire, IconeTelephone, IconeWhatsApp } from "../Icones/Icones";
import { Statut } from "./Statut";
import "./PiedDePage.css";

/** Le salon (adresse, horaires, itinéraire) et les contacts, chacun avec son icône. */
export function PiedDePage() {
  const s = config.salon;
  return (
    <footer id="salon" className="pied">
      <div className="conteneur">
        <p className="pied__logo">
          Diva <span>Salon</span>
        </p>

        <div className="pied__grille">
          <div className="pied__bloc">
            <h2 className="pied__titre">Le salon</h2>
            <Statut />
            <address>{s.adresse}</address>
            <ul className="pied__liste">
              {resumerHoraires(s.horaires).map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <a className="pied__maps" href={lienMaps(s.recherche)} target="_blank" rel="noopener noreferrer">
              <IconeItineraire />
              Y aller
            </a>
          </div>

          <div>
            <h2 className="pied__titre">Nous joindre</h2>
            <ul className="pied__contacts">
              <li>
                <a href={`https://wa.me/${config.whatsappRendezVous}`} target="_blank" rel="noopener noreferrer">
                  <IconeWhatsApp />
                  <span>
                    <strong>Rendez-vous sur WhatsApp</strong>
                    <small>Réponse dans la journée</small>
                  </span>
                </a>
              </li>
              {config.telephoneSalon && (
                <li>
                  <a href={`tel:${config.telephoneSalon.replace(/\s/g, "")}`}>
                    <IconeTelephone />
                    <span>
                      <strong>Appeler le salon</strong>
                      <small>{config.telephoneSalon}</small>
                    </span>
                  </a>
                </li>
              )}
              {config.reseaux.map((r) => {
                const Icone = r.reseau === "instagram" ? IconeInstagram : IconeFacebook;
                return (
                  <li key={r.lien}>
                    <a href={r.lien} target="_blank" rel="noopener noreferrer">
                      <Icone />
                      <span>
                        <strong>{r.pseudo}</strong>
                        <small>{r.reseau === "instagram" ? "Nos dernières réalisations" : "Notre page Facebook"}</small>
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
            Maquette de démonstration, site non officiel. Réalisée par Hamdi pour présenter une idée de site à Diva Salon.
            Prestations, horaires et photos sont à confirmer avec le salon.
          </p>
        )}
      </div>
    </footer>
  );
}
