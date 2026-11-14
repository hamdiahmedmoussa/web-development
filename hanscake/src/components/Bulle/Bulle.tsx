import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { useCommande } from "../../context/CommandeContext";
import "./Bulle.css";

/*
  LA BULLE « UN GÂTEAU POUR QUAND ? »
  À la place d'une barre « Commander » collée en bas (le réflexe de tous les sites
  marchands), une petite bulle de message, comme sur WhatsApp : c'est par là que
  Han'sCake prend vraiment ses commandes.
  Elle apparaît une fois l'ouverture passée, se cache quand un bouton de commande
  est déjà visible à l'écran, et près du bas de page, où les coordonnées prennent le relais.
*/
export function Bulle() {
  const { ouvrir, parfumCourant, article } = useCommande();
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
      {visible && !article && boutonsVisibles === 0 && (
        <motion.button
          type="button"
          className="bulle"
          onClick={() => ouvrir({ type: "gateau", parfum: parfumCourant })}
          initial={reduit ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduit ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
        >
          <span className="bulle__avatar" aria-hidden="true">
            H'C
          </span>
          <span className="bulle__texte">
            <strong>Un gâteau pour quand ?</strong>
            <span>Dites-nous, nous répondons sur WhatsApp.</span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
