import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { formaterPrix } from "../../config";
import { useCommande } from "../../context/CommandeContext";
import { parfums } from "../../data/parfums";
import { vitrine } from "../../data/vitrine";
import { Visuel } from "../Visuel/Visuel";
import { Tampon } from "./Tampon";
import "./Arc.css";

/*
  OUVERTURE : L'ARC RÉTRO
  Tous les gâteaux et toutes les pâtisseries, posés sur un grand arc en 3D
  qui tourne doucement. On peut le faire tourner au doigt ou à la souris,
  et il tourne aussi quand on fait défiler la page.

  Le principe :
  - « decalage » est un nombre qui avance en continu (1 = une carte de plus).
  - Pour chaque carte, on calcule son angle sur l'arc à partir de ce nombre.
  - Avec l'angle, un peu de trigonométrie donne sa position (x, z) et sa rotation.
    Les cartes des bords sont plus proches de nous, donc plus grandes : c'est ce
    qui donne l'effet « vu de l'intérieur d'un cylindre ».
*/

interface Carte {
  cle: string;
  nom: string;
  prix: number;
  fond: string;
  encre: string;
  image: string;
  /** Parfum du carrousel (index), ou pâtisserie de la vitrine (undefined). */
  indexParfum?: number;
}

// On alterne gâteaux et pâtisseries pour mélanger les couleurs.
const cartes: Carte[] = [];
for (let i = 0; i < Math.max(parfums.length, vitrine.length); i++) {
  const g = parfums[i];
  const p = vitrine[i];
  if (g) cartes.push({ cle: g.id, nom: g.nom, prix: g.prix, fond: g.fond, encre: g.encre, image: `/images/parfums/${g.id}`, indexParfum: i });
  if (p) cartes.push({ cle: p.id, nom: p.nom, prix: p.prix, fond: p.couleur, encre: p.encre, image: `/images/vitrine/${p.id}` });
}

const N = cartes.length;
const PAS = 17; // degrés entre deux cartes
const VITESSE = 0.18; // cartes par seconde quand l'arc tourne tout seul

export function Arc() {
  const reduit = useReducedMotion();
  const { choisirParfum } = useCommande();
  const refSection = useRef<HTMLElement>(null);
  const refScene = useRef<HTMLDivElement>(null);
  const [rayon, setRayon] = useState(600);
  const [pause, setPause] = useState(false);

  // Le rayon de l'arc suit la largeur de l'écran.
  useEffect(() => {
    const scene = refScene.current;
    if (!scene) return;
    const obs = new ResizeObserver(() => {
      // Même calcul que la largeur des cartes dans Arc.css : clamp(132px, 15vw, 190px).
      const largeurCarte = Math.min(190, Math.max(132, window.innerWidth * 0.15));
      // On choisit le rayon pour que deux cartes voisines ne se chevauchent presque pas.
      setRayon((largeurCarte * 1.12) / Math.sin((PAS * Math.PI) / 180));
    });
    obs.observe(scene);
    return () => obs.disconnect();
  }, []);

  // 1. Rotation automatique (arrêtée au survol, pendant un glissement, ou si « moins d'animations »).
  const auto = useMotionValue(0);
  useAnimationFrame((_, delta) => {
    if (reduit || pause) return;
    auto.set(auto.get() + (delta / 1000) * VITESSE);
  });

  // 2. Rotation au doigt / à la souris.
  const glisse = useMotionValue(0);

  // 3. Rotation au défilement : 3 cartes de plus quand on quitte l'ouverture.
  const { scrollYProgress } = useScroll({ target: refSection, offset: ["start start", "end start"] });

  // Le décalage final additionne les trois.
  const decalage = useTransform(() => auto.get() + glisse.get() + scrollYProgress.get() * 3);

  return (
    <section ref={refSection} className="arc" aria-labelledby="titre-arc">
      <div className="arc__soleil" aria-hidden="true" />
      <div className="arc__grain" aria-hidden="true" />

      <div className="conteneur arc__entete">
        <h1 id="titre-arc" className="arc__titre">
          Votre gâteau pour demain, commandé ce soir
        </h1>
        <p className="arc__texte">
          Choisissez le parfum, le nombre de parts et le prénom à écrire dessus. La commande arrive sur notre WhatsApp, vous passez la chercher rue de Rome.
        </p>
        <div className="arc__actions">
          <a className="bouton" href="#parfums">
            Choisir mon gâteau
          </a>
          <a className="arc__lien" href="#boite">
            Composer une boîte
          </a>
        </div>
      </div>

      <motion.div
        ref={refScene}
        className="arc__scene"
        onHoverStart={() => setPause(true)}
        onHoverEnd={() => setPause(false)}
        // onPan : suit le doigt sans déplacer l'élément lui-même.
        onPanStart={() => setPause(true)}
        onPan={(_, info) => glisse.set(glisse.get() - info.delta.x / 140)}
        onPanEnd={() => setPause(false)}
        style={{ touchAction: "pan-y" }}
      >
        <ul className="arc__liste">
          {cartes.map((carte, i) => (
            <CarteArc
              key={carte.cle}
              carte={carte}
              index={i}
              decalage={decalage}
              rayon={rayon}
              onChoisir={() => {
                if (carte.indexParfum !== undefined) choisirParfum(carte.indexParfum);
              }}
            />
          ))}
        </ul>
      </motion.div>

      <Tampon />
    </section>
  );
}

interface CarteArcProps {
  carte: Carte;
  index: number;
  decalage: MotionValue<number>;
  rayon: number;
  onChoisir: () => void;
}

function CarteArc({ carte, index, decalage, rayon, onChoisir }: CarteArcProps) {
  // Position relative de la carte sur l'arc, ramenée entre -N/2 et +N/2 (l'arc boucle).
  const relatif = useTransform(decalage, (d) => {
    let r = (index - d) % N;
    if (r < -N / 2) r += N;
    if (r >= N / 2) r -= N;
    return r;
  });

  const transform = useTransform(relatif, (r) => {
    const angle = r * PAS;
    const rad = (angle * Math.PI) / 180;
    const x = rayon * Math.sin(rad);
    const z = rayon * (1 - Math.cos(rad)); // les bords avancent vers nous
    return `translate3d(${x}px, 0, ${z}px) rotateY(${-angle}deg)`;
  });
  // Les cartes trop sur le côté disparaissent en fondu.
  const opacite = useTransform(relatif, (r) => Math.max(0, Math.min(1, (5.2 - Math.abs(r)) / 1.2)));
  const zIndex = useTransform(relatif, (r) => Math.round(Math.abs(r) * 10));

  // Une carte invisible ne doit pas recevoir le clic ni le focus clavier.
  const [visible, setVisible] = useState(true);
  useMotionValueEvent(opacite, "change", (o) => setVisible(o > 0.05));

  const lien = carte.indexParfum !== undefined ? "#parfums" : "#vitrine";

  return (
    <motion.li className="arc__carte" style={{ transform, opacity: opacite, zIndex, pointerEvents: visible ? "auto" : "none" }}>
      <a
        href={lien}
        className="arc__lien-carte"
        onClick={onChoisir}
        tabIndex={visible ? 0 : -1}
        aria-hidden={!visible}
        style={{ background: carte.fond, color: carte.encre }}
      >
        <span className="arc__rayures" aria-hidden="true" />
        <span className="arc__disque" aria-hidden="true" />
        <Visuel className="arc__image" chemin={carte.image} alt="" />
        <span className="arc__etiquette">
          <strong>{carte.nom}</strong>
          <span>{formaterPrix(carte.prix)}</span>
        </span>
      </a>
    </motion.li>
  );
}
