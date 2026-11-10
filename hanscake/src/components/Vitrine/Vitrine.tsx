import { config } from "../../config";
import { vitrine } from "../../data/vitrine";
import "./Vitrine.css";

/** Quelques pâtisseries de la boutique : photo, nom, description. */
export function Vitrine() {
  return (
    <section className="section" aria-labelledby="titre-vitrine">
      <div className="conteneur">
        <p className="surtitre">Tous les jours en boutique</p>
        <h2 id="titre-vitrine" className="section__titre">
          En vitrine
        </h2>
        <p className="section__intro">Nos pâtisseries du moment, préparées chaque matin.</p>

        <ul className="vitrine__liste">
          {vitrine.map((patisserie) => (
            <li key={patisserie.nom} className="vitrine__carte">
              {patisserie.photo ? (
                // loading="lazy" : la photo n'est téléchargée que lorsqu'on s'en approche.
                <img className="vitrine__photo" src={patisserie.photo} alt={patisserie.nom} loading="lazy" width="400" height="300" />
              ) : (
                <div
                  className="vitrine__photo vitrine__photo--provisoire"
                  style={{ background: `linear-gradient(135deg, ${patisserie.couleurs[0]}, ${patisserie.couleurs[1]})` }}
                  aria-hidden="true"
                >
                  <span>Photo à venir</span>
                </div>
              )}
              <div className="vitrine__texte">
                <h3>{patisserie.nom}</h3>
                <p>{patisserie.description}</p>
                {config.estUneMaquette && <span className="etiquette-exemple">Exemple</span>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
