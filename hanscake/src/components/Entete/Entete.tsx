import { config } from "../../config";
import "./Entete.css";

/** Logo et mention « maquette », posés en haut du film. */
export function Entete() {
  return (
    <header className="entete">
      {/* Logo provisoire en texte : remplacer par public/images/logo/logo.png */}
      <a className="entete__logo" href="#haut" aria-label={`${config.nom}, retour en haut`}>
        Han's<span>Cake</span>
      </a>
      {config.estUneMaquette && <p className="entete__mention">Maquette de démonstration, site non officiel</p>}
    </header>
  );
}
