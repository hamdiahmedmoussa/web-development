import { motion, useReducedMotion } from "motion/react";
import type { Ingredient as TypeIngredient } from "../../types";
import { Visuel } from "../Visuel/Visuel";

/*
  Un ingrédient qui flotte autour du gâteau.
  Chaque position a son emplacement, sa taille et son rythme :
  des durées différentes évitent que tout bouge en même temps (effet « robot »).
*/
const POSITIONS = [
  { top: "4%", left: "6%", taille: "22%", duree: 5.2, rotation: -14 },
  { top: "8%", left: "74%", taille: "18%", duree: 6.1, rotation: 18 },
  { top: "64%", left: "2%", taille: "16%", duree: 5.7, rotation: 10 },
  { top: "60%", left: "78%", taille: "20%", duree: 6.6, rotation: -20 },
];

export function Ingredient({ ingredient, position }: { ingredient: TypeIngredient; position: number }) {
  const reduit = useReducedMotion();
  const p = POSITIONS[position % POSITIONS.length];

  return (
    <motion.div
      className="ingredient"
      style={{ top: p.top, left: p.left, width: p.taille, rotate: p.rotation }}
      // Flottement : monte, redescend, en boucle (désactivé si « moins d'animations »).
      animate={reduit ? undefined : { y: [0, -14, 0], rotate: [p.rotation, p.rotation + 8, p.rotation] }}
      transition={{ duration: p.duree, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <Visuel chemin={`/images/ingredients/${ingredient.fichier}`} alt="" />
    </motion.div>
  );
}
