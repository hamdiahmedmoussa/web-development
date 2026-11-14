import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState, type KeyboardEvent } from "react";
import { useReservation } from "../../context/ReservationContext";
import { themes } from "../../data/galerie";
import { Visuel } from "../Visuel/Visuel";
import "./Galerie.css";

/*
  NOS RÉALISATIONS
  Des onglets par thème ; un toucher sur une photo ouvre la demande de rendez-vous
  avec ce style déjà noté (« Je veux ce style »).
*/
export function Galerie() {
  const [actif, setActif] = useState(0);
  const { ouvrir } = useReservation();
  const reduit = useReducedMotion();
  const base = useId();
  const theme = themes[actif];

  function clavier(e: KeyboardEvent) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const n = (actif + (e.key === "ArrowRight" ? 1 : -1) + themes.length) % themes.length;
    setActif(n);
    document.getElementById(`${base}-onglet-${n}`)?.focus();
  }

  return (
    <section id="realisations" className="galerie" aria-labelledby="titre-galerie">
      <div className="conteneur">
        <h2 id="titre-galerie" className="titre-section">
          Nos réalisations
        </h2>
        <p className="intro-section">Un style vous plaît ? Touchez-le, nous vous proposons un rendez-vous.</p>

        <div className="galerie__onglets" role="tablist" aria-label="Thèmes" onKeyDown={clavier}>
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

        <div id={`${base}-panneau`} role="tabpanel" aria-labelledby={`${base}-onglet-${actif}`}>
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
                    onClick={() => ouvrir({ type: "style", theme: theme.nom, modele: photo.description })}
                  >
                    <Visuel chemin={`/images/galerie/${photo.fichier}`} alt="" />
                    <span className="galerie__legende">{photo.description}</span>
                    <span className="galerie__action">Je veux ce style</span>
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
