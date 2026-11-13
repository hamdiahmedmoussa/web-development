import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react";
import type { CSSProperties, KeyboardEvent } from "react";
import { config, formaterPrix } from "../../config";
import { useCommande } from "../../context/CommandeContext";
import { parfums } from "../../data/parfums";
import { Visuel } from "../Visuel/Visuel";
import { Ingredient } from "./Ingredient";
import "./Carrousel.css";

/*
  LE CARROUSEL DES PARFUMS
  Un écran par gâteau. Quand on change de parfum :
   - le fond glisse vers la nouvelle couleur (Motion anime backgroundColor) ;
   - AnimatePresence fait SORTIR l'ancien gâteau et ENTRER le nouveau.
     Sans AnimatePresence, React supprimerait l'ancien instantanément, sans animation.
   - « direction » (+1 ou -1) indique de quel côté le gâteau arrive.
*/

// Une transition « ressort » : naturelle, légèrement amortie.
const ressort = { type: "spring", stiffness: 260, damping: 30 } as const;

export function Carrousel() {
  // Le parfum affiché est rangé dans le contexte : l'arc d'ouverture peut aussi le choisir.
  const { ouvrir, indexParfum: index, direction, choisirParfum } = useCommande();
  const reduit = useReducedMotion();
  const parfum = parfums[index];

  const allerA = choisirParfum;

  // Glissement du doigt : au-delà de 60 px ou d'un geste rapide, on change de gâteau.
  function finGlisse(_: unknown, info: PanInfo) {
    if (info.offset.x < -60 || info.velocity.x < -400) allerA(index + 1);
    else if (info.offset.x > 60 || info.velocity.x > 400) allerA(index - 1);
  }

  function clavier(e: KeyboardEvent) {
    if (e.key === "ArrowRight") allerA(index + 1);
    if (e.key === "ArrowLeft") allerA(index - 1);
  }

  const distance = reduit ? 0 : 340;

  return (
    <motion.section
      id="parfums"
      className="carrousel"
      aria-roledescription="carrousel"
      aria-label="Nos gâteaux"
      onKeyDown={clavier}
      animate={{ backgroundColor: parfum.fond, color: parfum.encre }}
      initial={false}
      transition={{ duration: reduit ? 0 : 0.6, ease: "easeInOut" }}
      // Variables CSS utilisées par les boutons et vignettes de cette section.
      style={{ "--fond": parfum.fond, "--encre": parfum.encre } as CSSProperties}
    >
      <h2 className="visuellement-cache">Nos gâteaux</h2>

      <div className="carrousel__scene">
        {/* Le mot géant, derrière le gâteau */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.p
            key={parfum.motGeant}
            className="carrousel__mot"
            aria-hidden="true"
            custom={direction}
            initial={{ opacity: 0, x: direction * distance * 0.5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * distance * 0.5 }}
            transition={{ duration: reduit ? 0 : 0.5 }}
          >
            {parfum.motGeant}
          </motion.p>
        </AnimatePresence>

        {/* Le gâteau et ses ingrédients : on peut le faire glisser au doigt */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={parfum.id}
            className="carrousel__gateau"
            custom={direction}
            initial={{ x: direction * distance, opacity: 0, rotate: direction * 12 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            exit={{ x: -direction * distance, opacity: 0, rotate: -direction * 12 }}
            transition={reduit ? { duration: 0 } : ressort}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={finGlisse}
          >
            {parfum.ingredients.map((ingredient, i) => (
              <Ingredient key={i} ingredient={ingredient} position={i} />
            ))}
            {/* Les éléments flottants sont décoratifs : on décrit le gâteau en une phrase. */}
            <GateauImage id={parfum.id} nom={parfum.nom} />
          </motion.div>
        </AnimatePresence>

        <button type="button" className="carrousel__fleche carrousel__fleche--gauche" onClick={() => allerA(index - 1)} aria-label="Gâteau précédent">
          <Fleche />
        </button>
        <button type="button" className="carrousel__fleche carrousel__fleche--droite" onClick={() => allerA(index + 1)} aria-label="Gâteau suivant">
          <Fleche />
        </button>
      </div>

      <div className="conteneur carrousel__infos">
        {/* aria-live : les lecteurs d'écran annoncent le nouveau parfum */}
        <div aria-live="polite">
          <h3 className="carrousel__nom">{parfum.nom}</h3>
          <p className="carrousel__description">{parfum.description}</p>
        </div>
        <div className="carrousel__achat">
          <p className="carrousel__prix">
            {formaterPrix(parfum.prix)} <span>{config.partsMinimum} parts</span>
          </p>
          <button type="button" className="bouton bouton--encre" onClick={() => ouvrir({ type: "gateau", parfum })}>
            Commander
          </button>
        </div>

        <div className="carrousel__vignettes" role="group" aria-label="Choisir un parfum">
          {parfums.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className="carrousel__vignette"
              style={{ background: p.fond }}
              aria-pressed={i === index}
              aria-label={p.nom}
              onClick={() => i !== index && allerA(i)}
            >
              <span>{p.nom}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function GateauImage({ id, nom }: { id: string; nom: string }) {
  return <Visuel className="carrousel__image" chemin={`/images/parfums/${id}`} alt={`Gâteau ${nom}`} />;
}

function Fleche() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
