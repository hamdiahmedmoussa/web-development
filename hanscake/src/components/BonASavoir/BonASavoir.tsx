import { config } from "../../config";
import "./BonASavoir.css";

/**
 * Les réponses aux questions que les clients posent toujours :
 * prix, délai, acompte, boîte, bougies. Moins d'allers-retours sur WhatsApp.
 */
export function BonASavoir() {
  return (
    <section className="section bon-a-savoir" aria-labelledby="titre-bon-a-savoir">
      <div className="conteneur">
        <p className="surtitre">Avant de commander</p>
        <h2 id="titre-bon-a-savoir" className="section__titre">
          Bon à savoir
        </h2>
        {config.estUneMaquette && <p className="etiquette-exemple">Informations à confirmer</p>}

        <ul className="bon-a-savoir__liste">
          {config.bonASavoir.map((info) => (
            <li key={info.titre} className="bon-a-savoir__carte">
              <h3>{info.titre}</h3>
              <p>{info.texte}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
