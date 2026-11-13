import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { faq } from "../../data/faq";
import "./FAQ.css";

/*
  Accordéon : chaque question est un bouton. aria-expanded indique aux lecteurs
  d'écran si la réponse est ouverte ; Motion anime la hauteur de 0 à « auto ».
*/
export function FAQ() {
  const [ouverte, setOuverte] = useState<number | null>(0);

  return (
    <section id="questions" className="faq" aria-labelledby="titre-faq">
      <div className="conteneur faq__grille">
        <h2 id="titre-faq" className="faq__titre">
          Avant de commander
        </h2>
        <div className="faq__liste">
          {faq.map((item, i) => (
            <Question
              key={item.question}
              {...item}
              ouverte={ouverte === i}
              basculer={() => setOuverte(ouverte === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface QuestionProps {
  question: string;
  reponse: string;
  ouverte: boolean;
  basculer: () => void;
}

function Question({ question, reponse, ouverte, basculer }: QuestionProps) {
  const id = useId();
  const reduit = useReducedMotion();

  return (
    <div className="faq__item">
      <h3>
        <button type="button" className="faq__question" aria-expanded={ouverte} aria-controls={id} onClick={basculer}>
          {question}
          <motion.span className="faq__signe" aria-hidden="true" animate={{ rotate: ouverte ? 45 : 0 }}>
            +
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {ouverte && (
          <motion.div
            id={id}
            className="faq__reponse"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduit ? 0 : 0.3, ease: "easeOut" }}
          >
            <p>{reponse}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
