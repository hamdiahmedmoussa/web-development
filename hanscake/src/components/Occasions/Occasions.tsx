import { useCommande } from "../../context/CommandeContext";
import { occasions } from "../../data/occasions";
import { parfums } from "../../data/parfums";
import "./Occasions.css";

/**
 * Les occasions de fête : une carte par occasion avec le gâteau conseillé.
 * « Voir ce gâteau » règle le carrousel sur ce parfum et y fait défiler la page.
 */
export function Occasions() {
  const { choisirParfum } = useCommande();

  return (
    <section id="occasions" className="occasions" aria-labelledby="titre-occasions">
      <div className="conteneur">
        <h2 id="titre-occasions" className="occasions__titre">
          C'est pour quoi ?
        </h2>
        <p className="occasions__intro">Dites-nous la fête, on vous dit quel gâteau prendre.</p>

        <ul className="occasions__liste">
          {occasions.map((o) => {
            const index = parfums.findIndex((p) => p.id === o.parfumId);
            const parfum = parfums[index];
            return (
              <li key={o.id} className="occasions__carte" style={{ background: o.couleur, color: o.encre }}>
                <h3 className="occasions__nom">{o.nom}</h3>
                <p className="occasions__texte">{o.texte}</p>
                <p className="occasions__conseil">
                  Notre conseil : <strong>{parfum.nom}</strong>
                </p>
                <a className="occasions__lien" href="#parfums" onClick={() => choisirParfum(index)}>
                  Voir ce gâteau
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
