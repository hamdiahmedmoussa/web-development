import { avis } from "../../data/avis";
import "./Avis.css";

/**
 * Avis clients : uniquement de vrais avis fournis par la pâtisserie (data/avis.ts).
 * Tant que la liste est vide, la section n'est pas affichée. Jamais de faux avis.
 */
export function Avis() {
  // Sans vrais avis, la section n'apparaît pas du tout (ni sur le site, ni dans la maquette).
  if (avis.length === 0) return null;

  return (
    <section className="avis" aria-labelledby="titre-avis">
      <div className="conteneur">
        <h2 id="titre-avis" className="avis__titre">
          Ce qu'en disent les clients
        </h2>
        <ul className="avis__liste">
          {avis.map((a) => (
            <li key={a.prenom + a.texte} className="avis__carte">
              <blockquote>« {a.texte} »</blockquote>
              <p className="avis__auteur">
                {a.prenom}, sur {a.source}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
