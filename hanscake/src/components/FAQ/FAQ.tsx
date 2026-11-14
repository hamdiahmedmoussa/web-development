import { faq } from "../../data/faq";
import "./FAQ.css";

/*
  « BON À SAVOIR »
  Les réponses sont courtes : on les affiche toutes, comme l'affichette posée
  sur le comptoir, au lieu de les cacher derrière des « + » à ouvrir un par un.
  Une liste de définitions (<dl>) : chaque question <dt> suivie de sa réponse <dd>.
*/
export function FAQ() {
  return (
    <section id="questions" className="faq" aria-labelledby="titre-faq">
      <div className="conteneur faq__grille">
        <h2 id="titre-faq" className="faq__titre">
          Bon à savoir
        </h2>
        <dl className="faq__liste">
          {faq.map((item) => (
            <div key={item.question} className="faq__item">
              <dt>{item.question}</dt>
              <dd>{item.reponse}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
