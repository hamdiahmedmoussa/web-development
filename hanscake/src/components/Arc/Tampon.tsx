import { motion, useReducedMotion } from "motion/react";

/*
  Un tampon rond façon étiquette des années 70, qui tourne lentement.
  Le texte suit un cercle grâce à <textPath> : on écrit le long d'un chemin SVG.
*/
export function Tampon() {
  const reduit = useReducedMotion();
  return (
    <motion.svg
      className="arc__tampon"
      viewBox="0 0 120 120"
      aria-hidden="true"
      animate={reduit ? undefined : { rotate: 360 }}
      transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
    >
      <defs>
        <path id="cercle-tampon" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
      </defs>
      <circle cx="60" cy="60" r="58" fill="var(--accent)" />
      <text fontSize="11.5" fontWeight="600" letterSpacing="2.4" fill="var(--sur-accent)">
        <textPath href="#cercle-tampon">FAIT MAIN ✦ RUE DE ROME ✦ DJIBOUTI ✦</textPath>
      </text>
      <text x="60" y="68" textAnchor="middle" fontSize="24" fontStyle="italic" fontFamily="var(--police-titre)" fill="var(--sur-accent)">
        H'C
      </text>
    </motion.svg>
  );
}
