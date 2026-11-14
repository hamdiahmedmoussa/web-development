import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { useReservation } from "../../context/ReservationContext";
import "./Bulle.css";

/*
  LA BULLE « UN RENDEZ-VOUS ? »
  Une petite bulle de message, comme sur WhatsApp, à la place d'une barre
  « Réserver » collée en bas. Elle se cache quand un bouton est déjà visible
  à l'écran, et près du bas de page.
*/
export function Bulle() {
  const { demande } = useReservation();
  const reduit = useReducedMotion();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  // Nombre de boutons de la page actuellement à l'écran (« Commander celui-ci », etc.)
  const [boutonsVisibles, setBoutonsVisibles] = useState(0);

  // IntersectionObserver : prévient quand un élément entre ou sort de l'écran.
  // Si un vrai bouton est déjà visible, la bulle s'efface pour ne pas le cacher.
  useEffect(() => {
    const visibles = new Set<Element>();
    const observateur = new IntersectionObserver((entrees) => {
      for (const e of entrees) {
        if (e.isIntersecting) visibles.add(e.target);
        else visibles.delete(e.target);
      }
      setBoutonsVisibles(visibles.size);
    });
    document.querySelectorAll("main .bouton").forEach((b) => observateur.observe(b));
    return () => observateur.disconnect();
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    const finDePage = document.documentElement.scrollHeight - window.innerHeight - y < 420;
    setVisible(y > window.innerHeight * 0.7 && !finDePage);
  });

  return (
    <AnimatePresence>
      {visible && !demande && boutonsVisibles === 0 && (
        // La bulle mène à la carte des prestations : c'est là qu'on choisit quoi réserver.
        <motion.a
          className="bulle"
          href="#prestations"
          initial={reduit ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduit ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
        >
          <span className="bulle__avatar" aria-hidden="true">
            D
          </span>
          <span className="bulle__texte">
            <strong>Un rendez-vous ?</strong>
            <span>Dites-nous quand, nous confirmons sur WhatsApp.</span>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
