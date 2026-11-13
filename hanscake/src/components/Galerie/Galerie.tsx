import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { useCommande } from "../../context/CommandeContext";
import { themes } from "../../data/galerie";
import { Visuel } from "../Visuel/Visuel";
import "./Galerie.css";

/*
  LA GALERIE PAR OCCASION
  C'est le vrai métier de Han'sCake : des gâteaux personnalisés en pâte à sucre.
  Des onglets choisissent l'occasion ; un clic sur une photo ouvre la commande
  avec ce modèle déjà noté. Le client envoie ensuite la photo sur WhatsApp.

  Les onglets suivent le modèle « tablist » : flèches gauche/droite au clavier,
  et les lecteurs d'écran annoncent l'onglet choisi.
*/
export function Galerie() {
  const [actif, setActif] = useState(0);
  const { ouvrir } = useCommande();
  const reduit = useReducedMotion();
  const base = useId();
  const theme = themes[actif];

  function clavier(e: React.KeyboardEvent) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const n = (actif + (e.key === "ArrowRight" ? 1 : -1) + themes.length) % themes.length;
    setActif(n);
    document.getElementById(`${base}-onglet-${n}`)?.focus();
  }

  return (
    <section id="galerie" className="galerie" aria-labelledby="titre-galerie">
      <div className="conteneur">
        <h2 id="titre-galerie" className="galerie__titre">
          C'est pour quoi ?
        </h2>
        <p className="galerie__intro">
          De vrais gâteaux sortis de notre atelier. Touchez celui qui vous plaît : nous en faisons un à votre nom.
        </p>

        <div className="galerie__onglets" role="tablist" aria-label="Occasions" onKeyDown={clavier}>
          {themes.map((t, i) => (
            <button
              key={t.id}
              id={`${base}-onglet-${i}`}
              type="button"
              role="tab"
              className="galerie__onglet"
              aria-selected={i === actif}
              aria-controls={`${base}-panneau`}
              tabIndex={i === actif ? 0 : -1}
              onClick={() => setActif(i)}
            >
              {t.nom}
            </button>
          ))}
        </div>

        <div id={`${base}-panneau`} role="tabpanel" aria-labelledby={`${base}-onglet-${actif}`} className="galerie__panneau">
          <p className="galerie__texte">{theme.texte}</p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={theme.id}
              className="galerie__photos"
              initial={{ opacity: 0, y: reduit ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {theme.photos.map((photo) => (
                <li key={photo.fichier}>
                  <button
                    type="button"
                    className="galerie__photo"
                    onClick={() => ouvrir({ type: "sur-mesure", theme: theme.nom, modele: photo.description })}
                  >
                    <Visuel chemin={`/images/galerie/${photo.fichier}`} alt="" />
                    <span className="galerie__legende">{photo.description}</span>
                    <span className="galerie__action">Je veux celui-ci</span>
                  </button>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
