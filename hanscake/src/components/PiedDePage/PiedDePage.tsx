import { config } from "../../config";
import { lienMaps, resumerHoraires } from "../../lib/horaires";
import { IconeFacebook, IconeInstagram, IconeItineraire, IconeTelephone, IconeTiktok, IconeWhatsApp } from "../Icones/Icones";
import { Statut } from "./Statut";
import "./PiedDePage.css";

/** Année du copyright, calculée une seule fois au chargement de la page. */
const ANNEE = new Date().getFullYear();

/** Boutiques (état ouvert / fermé, horaires, itinéraire), contact, réseaux, puis la signature du créateur. */
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

        <div className="pied__bas">
          <p>
            © {ANNEE} {config.nom} · Pâtisserie & Café, Djibouti
          </p>
          {/* La signature : un clic ouvre WhatsApp avec un message déjà prêt pour Hamdi. */}
          <a
            className="signature"
            href={`https://wa.me/${config.createur.whatsapp}?text=${encodeURIComponent(config.createur.message)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Site conçu et développé par <span className="signature__nom">{config.createur.nom}</span>
          </a>
        </div>

        {config.estUneMaquette && (
          <p className="pied__mention">
            Site de démonstration, présenté avec l'accord de {config.nom}. Les demandes envoyées par le formulaire
            arrivent chez son créateur : pour une vraie commande, écrivez directement à la boutique au{" "}
            {config.telephoneAffiche}.
          </p>
        )}
      </div>
    </footer>
  );
}
