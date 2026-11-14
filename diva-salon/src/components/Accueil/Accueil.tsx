import { config } from "../../config";
import { Henne } from "./Henne";
import "./Accueil.css";

/** Premier écran : la promesse du salon (entre femmes, au Bawadi Mall) et le motif de henné. */
export function Accueil() {
  return (
    <section id="haut" className="accueil" aria-labelledby="titre-accueil">
      <div className="conteneur accueil__grille">
        <div>
          <p className="accueil__promesse">{config.promesse}, au Bawadi Mall</p>
          <h1 id="titre-accueil" className="accueil__titre">
            Un moment rien que pour vous
          </h1>
          <p className="accueil__texte">
            Coiffure, ongles, maquillage et henné, entre femmes. Choisissez ce que vous voulez, nous vous confirmons l'heure
            sur WhatsApp.
          </p>
          <div className="accueil__actions">
            <a className="bouton" href="#prestations">
              Prendre rendez-vous
            </a>
            <a className="accueil__lien" href="#realisations">
              Voir nos réalisations
            </a>
          </div>
        </div>
        <Henne />
      </div>
    </section>
  );
}
