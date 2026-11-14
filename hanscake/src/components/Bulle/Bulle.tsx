import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useState } from "react";
import { useCommande } from "../../context/CommandeContext";
import "./Bulle.css";

/*
  LA BULLE « UN GÂTEAU POUR QUAND ? »
  À la place d'une barre « Commander » collée en bas (le réflexe de tous les sites
  marchands), une petite bulle de message, comme sur WhatsApp : c'est par là que
  Han'sCake prend vraiment ses commandes.
  Elle apparaît une fois l'ouverture passée, et se cache près du bas de page,
  où les coordonnées prennent le relais.
*/
export function Bulle() {
  const { ouvrir, parfumCourant, article } = useCommande();
  const reduit = useReducedMotion();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const finDePage = document.documentElement.scrollHeight - window.innerHeight - y < 420;
    setVisible(y > window.innerHeight * 0.7 && !finDePage);
  });

  return (
    <AnimatePresence>
      {visible && !article && (
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
