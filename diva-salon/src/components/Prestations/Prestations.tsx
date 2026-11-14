import { useReservation } from "../../context/ReservationContext";
import { categories } from "../../data/prestations";
import "./Prestations.css";

/*
  LA CARTE DES PRESTATIONS
  Présentée comme la carte imprimée posée à l'accueil d'un salon :
  une colonne par catégorie, et chaque ligne se réserve d'un toucher.
*/
export function Prestations() {
  const { ouvrir } = useReservation();

  return (
    <section id="prestations" className="prestations" aria-labelledby="titre-prestations">
      <div className="conteneur">
        <h2 id="titre-prestations" className="titre-section">
          Ce que nous faisons
        </h2>
        <p className="intro-section">Touchez une prestation pour demander un rendez-vous.</p>

        <div className="prestations__carte">
          {categories.map((c) => (
            <div key={c.id} className="prestations__categorie">
              <h3>{c.nom}</h3>
              <ul>
                {c.prestations.map((p) => (
                  <li key={p.nom}>
                    <button
                      type="button"
                      onClick={() => ouvrir({ type: "prestation", categorie: c.nom, prestation: p.nom })}
                    >
                      <span className="prestations__nom">{p.nom}</span>
                      <span className="prestations__detail">{p.detail}</span>
                      <span className="prestations__action" aria-hidden="true">
                        Réserver
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
