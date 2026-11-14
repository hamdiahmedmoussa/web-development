import { motion, useReducedMotion } from "motion/react";
import { config } from "../../config";

interface Props {
  message: string;
  lien: string;
  retour: () => void;
}

/*
  APERÇU DU MESSAGE
  Au lieu d'une animation « succès » comme dans toutes les applications, on montre
  au client EXACTEMENT ce qui va partir : son message, dans une bulle verte,
  comme dans WhatsApp. Il relit, puis il envoie. C'est honnête et rassurant.

  Pourquoi un lien plutôt qu'une ouverture automatique de WhatsApp ?
  Les navigateurs bloquent les fenêtres qui s'ouvrent sans clic direct.
*/
export function ApercuMessage({ message, lien, retour }: Props) {
  const reduit = useReducedMotion();

  return (
    <motion.div
      className="apercu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduit ? 0 : 0.2 }}
    >
      <h2 id="titre-commande" className="apercu__titre">
        Voici ce que vous allez nous envoyer
      </h2>

      {/* Une conversation WhatsApp miniature */}
      <div className="apercu__conversation">
        <p className="apercu__contact">
          <span aria-hidden="true">H'C</span>
          {config.nom}
        </p>
        <motion.p
          className="apercu__bulle"
          initial={reduit ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 26, delay: reduit ? 0 : 0.1 }}
        >
          {message}
        </motion.p>
      </div>

      <a className="bouton apercu__envoyer" href={lien} target="_blank" rel="noopener noreferrer">
        Envoyer sur WhatsApp
      </a>
      <button type="button" className="apercu__retour" onClick={retour}>
        Modifier ma commande
      </button>
    </motion.div>
  );
}
