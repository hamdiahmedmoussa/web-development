import { motion, useReducedMotion } from "motion/react";
import { formaterPrix } from "../../config";
import { vitrine } from "../../data/vitrine";
import { Visuel } from "../Visuel/Visuel";
import "./Vitrine.css";

/** Les classiques de la maison : une carte colorée par pâtisserie. */
export function Vitrine() {
  const reduit = useReducedMotion();

  return (
    <section id="vitrine" className="vitrine" aria-labelledby="titre-vitrine">
      <div className="conteneur">
        <h2 id="titre-vitrine" className="vitrine__titre">
          Au comptoir, sans commander
        </h2>
        <p className="vitrine__intro">Ce qu'on trouve en vitrine rue de Rome. Prix à la pièce.</p>

        <ul className="vitrine__grille">
          {vitrine.map((p) => (
            // whileHover : l'image se soulève quand la souris passe sur la carte.
            <motion.li
              key={p.id}
              className="vitrine__carte"
              style={{ background: p.couleur, color: p.encre }}
              initial="repos"
              whileHover="survol"
            >
              <motion.div
                className="vitrine__visuel"
                variants={{ repos: { y: 0, scale: 1 }, survol: reduit ? {} : { y: -14, scale: 1.05 } }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Visuel chemin={`/images/vitrine/${p.id}`} alt={p.nom} />
              </motion.div>
              <h3 className="vitrine__nom">{p.nom}</h3>
              <p className="vitrine__description">{p.description}</p>
              <p className="vitrine__prix">{formaterPrix(p.prix)}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
