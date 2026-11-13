import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react";
import { useRef, type RefObject } from "react";
import type { Ingredient as TypeIngredient } from "../../types";
import { Visuel } from "../Visuel/Visuel";

/*
  UN INGRÉDIENT QUI FLOTTE AUTOUR DU GÂTEAU

  Trois mouvements superposés, chacun sur sa propre « couche » :
  1. Entrée / sortie (couche extérieure) : quand on change de parfum, l'ingrédient
     est aspiré vers le centre du gâteau, puis le nouvel ingrédient en jaillit.
  2. Répulsion (couche extérieure, x/y) : il s'écarte du doigt ou de la souris,
     comme repoussé par un aimant.
  3. Flottement (couche intérieure) : il monte et descend doucement, en boucle.
*/
const POSITIONS = [
  { top: "4%", left: "6%", taille: "22%", duree: 5.2, rotation: -14 },
  { top: "8%", left: "74%", taille: "18%", duree: 6.1, rotation: 18 },
  { top: "64%", left: "2%", taille: "16%", duree: 5.7, rotation: 10 },
  { top: "60%", left: "78%", taille: "20%", duree: 6.6, rotation: -20 },
];

// Le centre du gâteau, d'où les ingrédients sortent et où ils retournent.
const CENTRE = { left: "41%", top: "41%", scale: 0, opacity: 0 };

const RAYON = 170; // distance (px) à partir de laquelle le pointeur repousse
const FORCE = 70; // écart maximum (px)

interface Props {
  ingredient: TypeIngredient;
  position: number;
  /** Position du pointeur (souris ou doigt) dans la fenêtre, mise à jour par le carrousel. */
  pointeur: RefObject<{ x: number; y: number }>;
}

export function Ingredient({ ingredient, position, pointeur }: Props) {
  const reduit = useReducedMotion();
  const p = POSITIONS[position % POSITIONS.length];
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // À chaque image : on calcule l'écart voulu, puis on s'en rapproche de 10 % (mouvement doux).
  useAnimationFrame(() => {
    const el = ref.current;
    if (!el || reduit) return;
    const r = el.getBoundingClientRect();
    const dx = pointeur.current.x - (r.left + r.width / 2 - x.get());
    const dy = pointeur.current.y - (r.top + r.height / 2 - y.get());
    const distance = Math.hypot(dx, dy);
    let cibleX = 0;
    let cibleY = 0;
    if (distance < RAYON && distance > 0) {
      const force = (RAYON - distance) / RAYON;
      cibleX = (-dx / distance) * force * FORCE;
      cibleY = (-dy / distance) * force * FORCE;
    }
    x.set(x.get() + (cibleX - x.get()) * 0.1);
    y.set(y.get() + (cibleY - y.get()) * 0.1);
  });

  const delai = position * 0.06;

  return (
    <motion.div
      ref={ref}
      className="ingredient"
      style={{ width: p.taille, x, y }}
      initial={reduit ? { left: p.left, top: p.top } : CENTRE}
      animate={{ left: p.left, top: p.top, scale: 1, opacity: 1 }}
      exit={reduit ? { opacity: 0 } : CENTRE}
      transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.12 + delai }}
      aria-hidden="true"
    >
      <motion.div
        style={{ rotate: p.rotation }}
        animate={reduit ? undefined : { y: [0, -14, 0], rotate: [p.rotation, p.rotation + 8, p.rotation] }}
        transition={{ duration: p.duree, repeat: Infinity, ease: "easeInOut" }}
      >
        <Visuel chemin={`/images/ingredients/${ingredient.fichier}`} alt="" />
      </motion.div>
    </motion.div>
  );
}
