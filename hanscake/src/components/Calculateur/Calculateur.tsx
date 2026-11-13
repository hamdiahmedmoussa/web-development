import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { config, formaterPrix } from "../../config";
import { useCommande } from "../../context/CommandeContext";
import { parfums } from "../../data/parfums";
import { conseillerParts } from "../../lib/calcul";
import "./Calculateur.css";

/**
 * « Combien d'invités ? » → taille de gâteau conseillée et prix estimé.
 * Répond à la question que la pâtisserie reçoit sans arrêt sur WhatsApp.
 */
export function Calculateur() {
  const [invites, setInvites] = useState(12);
  const [parfumId, setParfumId] = useState(parfums[0].id);
  const { ouvrir } = useCommande();
  const idInvites = useId();
  const idParfum = useId();

  const parfum = parfums.find((p) => p.id === parfumId)!;
  const conseil = conseillerParts(invites, config.choixParts, parfum.prix, config.partsMinimum);
  const plusGrand = Math.max(...config.choixParts);

  return (
    <section id="calculateur" className="calculateur" aria-labelledby="titre-calculateur">
      <div className="conteneur calculateur__grille">
        <div>
          <h2 id="titre-calculateur" className="calculateur__titre">
            Combien d'invités ?
          </h2>
          <p className="calculateur__intro">C'est la question que vous nous posez le plus. Bougez le curseur.</p>
        </div>

        <div className="calculateur__panneau">
          <label className="calculateur__champ" htmlFor={idInvites}>
            <span>Invités</span>
            <output className="calculateur__nombre" htmlFor={idInvites}>
              {invites}
            </output>
          </label>
          <input
            id={idInvites}
            className="calculateur__curseur"
            type="range"
            min={1}
            max={40}
            value={invites}
            onChange={(e) => setInvites(Number(e.target.value))}
          />

          <label className="calculateur__champ" htmlFor={idParfum}>
            <span>Parfum</span>
          </label>
          <select id={idParfum} className="calculateur__select" value={parfumId} onChange={(e) => setParfumId(e.target.value)}>
            {parfums.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nom}
              </option>
            ))}
          </select>

          {/* aria-live : le résultat est lu à voix haute quand il change */}
          <div className="calculateur__resultat" aria-live="polite">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={`${conseil.parts}-${conseil.prix}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {conseil.parts ? (
                  <>
                    <p className="calculateur__taille">
                      Gâteau de <strong>{conseil.parts} parts</strong>
                    </p>
                    <p className="calculateur__prix">
                      Environ {formaterPrix(conseil.prix!)} <span>(estimation, prix confirmé sur WhatsApp)</span>
                    </p>
                  </>
                ) : (
                  <p className="calculateur__taille">
                    Plus de {plusGrand} invités : nous préparons plusieurs gâteaux. Demandez-nous sur WhatsApp.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            className="bouton"
            onClick={() => ouvrir({ type: "gateau", parfum, parts: conseil.parts ?? plusGrand })}
          >
            Commander ce gâteau
          </button>
        </div>
      </div>
    </section>
  );
}
