import { config } from "../../config";
import { Statut } from "../PiedDePage/Statut";
import "./Entete.css";

/**
 * En-tête : le logo et l'état de la boutique, comme sur un vrai site.
 * (La version Cinéma reste accessible avec ?version=cinema, sans lien visible.)
 */
export function Entete() {
  return (
    <header className="entete">
      <div className="entete__ligne">
        {/* Logo provisoire en texte : remplacer par public/images/logo/logo.png */}
        <a className="entete__logo" href="#haut" aria-label={`${config.nom}, retour en haut`}>
          Han's <span>Cake</span>
        </a>
        {/* État de la boutique principale ; un clic mène aux boutiques en bas de page */}
        <a href="#boutiques" className="entete__statut">
          <Statut horaires={config.boutiques[0].horaires} compact />
        </a>
      </div>
    </header>
  );
}
