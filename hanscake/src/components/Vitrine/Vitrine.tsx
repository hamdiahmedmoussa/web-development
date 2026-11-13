import { motion, useReducedMotion } from "motion/react";
import { formaterPrix } from "../../config";
import { vitrine } from "../../data/vitrine";
import { Visuel } from "../Visuel/Visuel";
import "./Vitrine.css";

/*
  LA VITRINE, COMME L'ARDOISE DU COMPTOIR
  Une liste avec les prix alignés à droite et des pointillés entre le nom et le prix,
  comme une carte de boutique. Cela change le rythme après les sections en cartes.
*/
export function Vitrine() {
  const reduit = useReducedMotion();

  return (
    <section id="vitrine" className="vitrine" aria-labelledby="titre-vitrine">
      <div className="conteneur vitrine__grille">
        <div className="vitrine__entete">
          <h2 id="titre-vitrine" className="vitrine__titre">
            Au comptoir, sans commander
          </h2>
          <p className="vitrine__intro">Ce que vous trouvez chaque jour dans notre vitrine, rue de Rome. Prix à la pièce.</p>
        </div>

        <ul className="vitrine__liste">
          {vitrine.map((p) => (
            <motion.li key={p.id} className="vitrine__ligne" initial="repos" whileHover="survol">
              {/* La pastille de couleur porte la photo ; au survol, la photo se soulève. */}
              <span className="vitrine__pastille" style={{ background: p.couleur }}>
                <motion.span
                  className="vitrine__visuel"
                  variants={{ repos: { y: 0, scale: 1 }, survol: reduit ? {} : { y: -10, scale: 1.12 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Visuel chemin={`/images/vitrine/${p.id}`} alt="" />
                </motion.span>
              </span>
              <span className="vitrine__texte">
                <span className="vitrine__haut">
                  <strong className="vitrine__nom">{p.nom}</strong>
                  <span className="vitrine__points" aria-hidden="true" />
                  <span className="vitrine__prix">{formaterPrix(p.prix)}</span>
                </span>
                <span className="vitrine__description">{p.description}</span>
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
