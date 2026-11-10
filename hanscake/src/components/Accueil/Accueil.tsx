import { config } from "../../config";
import "./Accueil.css";

/** Premier écran : logo, accroche et invitation à défiler. */
export function Accueil() {
  return (
    <header className="accueil">
      <div className="conteneur accueil__contenu">
        {/* Logo provisoire en texte, à remplacer par le vrai logo. */}
        <p className="accueil__logo">{config.nom}</p>
        <p className="surtitre">Pâtisserie · Djibouti</p>

        <h1 className="accueil__titre">
          Votre gâteau, <em>composé par vous</em>.
        </h1>
        <p className="accueil__texte">
          Choisissez la génoise, la crème, le glaçage et le décor. Nous le préparons, vous venez le chercher.
        </p>
        <p className="accueil__prix">
          À partir de {config.prixDepart} · {config.partsMinimum} parts
        </p>

        <a className="bouton" href="#atelier">
          Composer mon gâteau
        </a>
      </div>

      <a className="accueil__defiler" href="#atelier">
        Faites défiler
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </a>
    </header>
  );
}
