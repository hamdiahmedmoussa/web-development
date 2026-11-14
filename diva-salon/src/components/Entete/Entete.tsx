import { config } from "../../config";
import { Statut } from "../PiedDePage/Statut";
import "./Entete.css";

/** Une ligne fine pour la maquette, puis le nom du salon et l'état de la boutique. */
export function Entete() {
  return (
    <header className="entete">
      {config.estUneMaquette && <p className="entete__maquette">Maquette de démonstration, site non officiel.</p>}
      <div className="entete__ligne conteneur">
        <a className="entete__logo" href="#haut">
          Diva <span>Salon</span>
        </a>
        <a href="#salon" className="entete__statut">
          <Statut compact />
        </a>
      </div>
    </header>
  );
}
