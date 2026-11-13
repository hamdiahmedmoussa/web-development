import { config } from "../../config";
import { avis } from "../../data/avis";
import "./Avis.css";

/**
 * Avis clients : uniquement de vrais avis fournis par la pâtisserie (data/avis.ts).
 * Sans avis, rien n'est affiché sur le vrai site ; la maquette montre un emplacement
 * clairement marqué, jamais de faux avis.
 */
export function Avis() {
  if (avis.length === 0 && !config.estUneMaquette) return null;

  return (
    <section className="avis" aria-labelledby="titre-avis">
      <div className="conteneur">
        <h2 id="titre-avis" className="avis__titre">
          Ce qu'en disent les clients
        </h2>

        {avis.length > 0 ? (
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
        ) : (
          <div className="avis__emplacement">
            <p>
              <strong>Emplacement des avis clients.</strong> Ici s'afficheront 3 ou 4 vrais avis de clients de Han'sCake
              (Google, Facebook ou WhatsApp), fournis par la pâtisserie avec l'accord des clients.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
