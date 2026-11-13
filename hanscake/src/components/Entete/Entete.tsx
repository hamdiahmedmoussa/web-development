import { config } from "../../config";
import { autreVersion, VERSIONS } from "../../version";
import { Statut } from "../PiedDePage/Statut";
import "./Entete.css";

/** Logo, mention « maquette » et lien vers l'autre version de la démo. */
export function Entete() {
  return (
    <header className="entete">
      {/* Logo provisoire en texte : remplacer par public/images/logo/logo.png */}
      <a className="entete__logo" href="#haut" aria-label={`${config.nom}, retour en haut`}>
        Han's<span>Cake</span>
      </a>
      <div className="entete__demo">
        {/* État de la boutique principale ; un clic mène aux boutiques en bas de page */}
        <a href="#boutiques" className="entete__statut">
          <Statut horaires={config.boutiques[0].horaires} compact />
        </a>
      {config.estUneMaquette && (
        <>
          <p className="entete__mention">Maquette de démonstration, site non officiel</p>
          {/* Pour la présentation au client : passer d'une proposition à l'autre */}
          <a className="entete__version" href={`?version=${autreVersion}`}>
            Voir la version {VERSIONS[autreVersion]}
          </a>
        </>
      )}
      </div>
    </header>
  );
}
