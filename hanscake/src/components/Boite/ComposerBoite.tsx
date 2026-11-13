import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { config, formaterPrix } from "../../config";
import { useCommande } from "../../context/CommandeContext";
import { vitrine } from "../../data/vitrine";
import { totalBoite } from "../../lib/whatsapp";
import type { Patisserie } from "../../types";
import { Visuel } from "../Visuel/Visuel";
import "./ComposerBoite.css";

/*
  COMPOSEZ VOTRE BOÎTE
  Le client ajoute 3 pâtisseries (on peut prendre deux fois la même).
  Chaque choix reçoit un identifiant unique (« cle ») : React et Motion savent
  ainsi quelle pâtisserie animer quand on en retire une, même s'il y a des doublons.
  « layout » : quand une pâtisserie est retirée, les autres glissent à leur nouvelle place.
*/
interface Choix {
  cle: number;
  patisserie: Patisserie;
}

let compteur = 0;

export function ComposerBoite() {
  const [choix, setChoix] = useState<Choix[]>([]);
  const { ouvrir } = useCommande();
  const reduit = useReducedMotion();
  const taille = config.tailleBoite;
  const pleine = choix.length >= taille;
  const restants = taille - choix.length;
  const patisseries = choix.map((c) => c.patisserie);

  function ajouter(p: Patisserie) {
    if (!pleine) setChoix((liste) => [...liste, { cle: compteur++, patisserie: p }]);
  }

  function retirer(cle: number) {
    setChoix((liste) => liste.filter((c) => c.cle !== cle));
  }

  return (
    <section id="boite" className="boite" aria-labelledby="titre-boite">
      <div className="conteneur boite__grille">
        <div>
          <h2 id="titre-boite" className="boite__titre">
            Une boîte de trois
          </h2>
          <p className="boite__intro">Prenez {taille} pâtisseries, même deux fois la même. Nous les mettons en boîte pour vous.</p>

          <ul className="boite__liste">
            {vitrine.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  className="boite__ajout"
                  onClick={() => ajouter(p)}
                  disabled={pleine}
                  style={{ background: p.couleur, color: p.encre }}
                >
                  <span className="boite__ajout-image">
                    <Visuel chemin={`/images/vitrine/${p.id}`} alt="" />
                  </span>
                  <span className="boite__ajout-nom">{p.nom}</span>
                  <span className="boite__ajout-prix">{formaterPrix(p.prix)}</span>
                  <span className="boite__plus" aria-hidden="true">
                    +
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="boite__panneau">
          {/* La boîte : 3 cases. Les pâtisseries choisies y tombent. */}
          <LayoutGroup>
            <div className="boite__carton" aria-label={`Votre boîte : ${choix.length} sur ${taille}`} role="group">
              <div className="boite__couvercle" aria-hidden="true" />
              <ul className="boite__cases">
                <AnimatePresence mode="popLayout">
                  {choix.map((c) => (
                    <motion.li
                      key={c.cle}
                      layout={!reduit}
                      className="boite__case boite__case--pleine"
                      initial={reduit ? false : { y: -120, opacity: 0, scale: 0.6, rotate: -10 }}
                      animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                      exit={reduit ? { opacity: 0 } : { y: -80, opacity: 0, scale: 0.6 }}
                      transition={{ type: "spring", stiffness: 380, damping: 24 }}
                      style={{ background: c.patisserie.couleur }}
                    >
                      <button
                        type="button"
                        className="boite__retirer"
                        onClick={() => retirer(c.cle)}
                        aria-label={`Retirer ${c.patisserie.nom}`}
                      >
                        <Visuel chemin={`/images/vitrine/${c.patisserie.id}`} alt="" />
                        <span aria-hidden="true">×</span>
                      </button>
                    </motion.li>
                  ))}
                  {Array.from({ length: restants }, (_, i) => (
                    <motion.li key={`vide-${i}`} layout={!reduit} className="boite__case" aria-hidden="true" />
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          </LayoutGroup>

          <div className="boite__resume" aria-live="polite">
            <p className="boite__total">
              Total <strong>{formaterPrix(totalBoite(patisseries))}</strong>
            </p>
            <p className="boite__etat">
              {pleine ? "Votre boîte est complète." : `Encore ${restants} à choisir.`}
            </p>
          </div>
          <button
            type="button"
            className="bouton boite__commander"
            disabled={!pleine}
            onClick={() => ouvrir({ type: "boite", patisseries })}
          >
            Commander la boîte
          </button>
        </div>
      </div>
    </section>
  );
}
