import { config } from "../../config";
import { autreVersion, VERSIONS } from "../../version";
import "./Entete.css";

/** Logo, mention « maquette » et lien vers l'autre version de la démo. */
export function Entete() {
  return (
    <header className="entete">
      {/* Logo provisoire en texte : remplacer par public/images/logo/logo.png */}
      <a className="entete__logo" href="#haut" aria-label={`${config.nom}, retour en haut`}>
        Han's<span>Cake</span>
      </a>
      {config.estUneMaquette && (
        <div className="entete__demo">
          <p className="entete__mention">Maquette de démonstration, site non officiel</p>
          {/* Pour la présentation au client : passer d'une proposition à l'autre */}
          <a className="entete__version" href={`?version=${autreVersion}`}>
            Voir la version {VERSIONS[autreVersion]}
          </a>
        </div>
      )}
    </header>
  );
}
