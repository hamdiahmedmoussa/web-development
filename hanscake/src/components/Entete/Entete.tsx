import { config } from "../../config";
import { autreVersion, VERSIONS } from "../../version";
import { Statut } from "../PiedDePage/Statut";
import "./Entete.css";

/**
 * En-tête : une fine ligne de texte pour la maquette, puis le logo et l'état de la boutique.
 * Plus de pastilles empilées : deux lignes légères, même sur téléphone.
 */
export function Entete() {
  return (
    <header className="entete">
      {config.estUneMaquette && (
        <p className="entete__maquette">
          Maquette de démonstration, site non officiel.{" "}
          {/* Pour la présentation au client : passer d'une proposition à l'autre */}
          <a href={`?version=${autreVersion}`}>Voir la version {VERSIONS[autreVersion]}</a>
        </p>
      )}
      <div className="entete__ligne">
        {/* Logo provisoire en texte : remplacer par public/images/logo/logo.png */}
        <a className="entete__logo" href="#haut" aria-label={`${config.nom}, retour en haut`}>
          Han's<span>Cake</span>
        </a>
        {/* État de la boutique principale ; un clic mène aux boutiques en bas de page */}
        <a href="#boutiques" className="entete__statut">
          <Statut horaires={config.boutiques[0].horaires} compact />
        </a>
      </div>
    </header>
  );
}
