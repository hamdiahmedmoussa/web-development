import { motion, useReducedMotion } from "motion/react";

interface Props {
  lien: string;
  prenom: string;
  retour: () => void;
}

/*
  Confirmation en « verre dépoli » (glassmorphism) :
  un panneau semi-transparent qui floute ce qu'il y a derrière (backdrop-filter),
  un cercle qui grandit, puis une coche qui se dessine trait par trait.

  Le dessin de la coche : Motion anime « pathLength » de 0 à 1,
  c'est-à-dire la part du trait SVG déjà tracée.

  Pourquoi un bouton « Ouvrir WhatsApp » plutôt qu'une ouverture automatique ?
  Les navigateurs bloquent les fenêtres ouvertes sans clic direct de l'utilisateur.
  Un vrai lien cliqué fonctionne partout, même sur iPhone.
*/
export function ConfirmationVerre({ lien, prenom, retour }: Props) {
  const reduit = useReducedMotion();
  const d = (secondes: number) => (reduit ? 0 : secondes);

  return (
    <motion.div
      className="verre"
      role="status"
      initial={reduit ? { opacity: 0 } : { opacity: 0, scale: 0.9, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: d(0.45), ease: "easeOut" }}
    >
      <div className="verre__halo" aria-hidden="true" />

      <svg className="verre__coche" viewBox="0 0 96 96" width="96" height="96" aria-hidden="true">
        <motion.circle
          cx="48"
          cy="48"
          r="44"
          fill="rgba(60, 207, 122, 0.16)"
          stroke="var(--vert-ok)"
          strokeWidth="3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: d(0.15) }}
          style={{ transformOrigin: "center" }}
        />
        <motion.path
          d="M28 50 L42 63 L69 34"
          fill="none"
          stroke="var(--vert-ok)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: reduit ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: d(0.45), delay: d(0.45), ease: "easeOut" }}
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: reduit ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: d(0.7), duration: d(0.35) }}
      >
        <h2 id="titre-commande" className="verre__titre">
          Commande prête à envoyer
        </h2>
        <p className="verre__texte">
          Merci {prenom.trim()} ! WhatsApp va s'ouvrir avec votre message déjà écrit. Il ne reste qu'à appuyer sur
          Envoyer.
        </p>
        <a className="bouton verre__bouton" href={lien} target="_blank" rel="noopener noreferrer">
          Ouvrir WhatsApp
        </a>
        <button type="button" className="verre__retour" onClick={retour}>
          Modifier ma commande
        </button>
      </motion.div>
    </motion.div>
  );
}
