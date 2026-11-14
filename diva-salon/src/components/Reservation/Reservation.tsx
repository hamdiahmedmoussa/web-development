import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { config } from "../../config";
import { useReservation } from "../../context/ReservationContext";
import { aujourdhuiISO, creerLienWhatsApp, creerMessage } from "../../lib/whatsapp";
import type { Demande, InfosRendezVous } from "../../types";
import "./Reservation.css";

/*
  LA DEMANDE DE RENDEZ-VOUS
  Une fenêtre <dialog> (Échap pour fermer, clavier gardé à l'intérieur).
  1. La cliente choisit le jour et le moment (matin, après-midi, fin de journée) :
     le salon confirme l'heure exacte, comme aujourd'hui sur WhatsApp.
  2. On lui montre le message tel qu'il va partir, dans une bulle verte.
*/
export function Reservation() {
  const { demande, fermer } = useReservation();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (demande && !d.open) d.showModal();
    if (!demande && d.open) d.close();
  }, [demande]);

  return (
    <dialog
      ref={ref}
      className="reservation"
      aria-labelledby="titre-reservation"
      onClose={fermer}
      onClick={(e) => e.target === e.currentTarget && fermer()}
    >
      {demande && <Contenu key={JSON.stringify(demande)} demande={demande} fermer={fermer} />}
    </dialog>
  );
}

const MOMENTS = [
  { valeur: "matin", nom: "Matin" },
  { valeur: "apres-midi", nom: "Après-midi" },
  { valeur: "soir", nom: "Fin de journée" },
];

function Contenu({ demande, fermer }: { demande: Demande; fermer: () => void }) {
  const reduit = useReducedMotion();
  const [infos, setInfos] = useState<InfosRendezVous>({ prenom: "", date: "", moment: "apres-midi", note: "" });
  const [dateMin] = useState(() => aujourdhuiISO(new Date()));
  const [message, setMessage] = useState<string | null>(null);

  function modifier<C extends keyof InfosRendezVous>(champ: C, valeur: InfosRendezVous[C]) {
    setInfos((a) => ({ ...a, [champ]: valeur }));
  }

  function valider(e: FormEvent) {
    e.preventDefault();
    setMessage(creerMessage(demande, infos));
  }

  const titre = demande.type === "prestation" ? demande.prestation : demande.modele;

  return (
    <div className="reservation__carte">
      <button type="button" className="reservation__fermer" onClick={fermer} aria-label="Fermer">
        ×
      </button>

      <AnimatePresence mode="wait" initial={false}>
        {message ? (
          <motion.div key="apercu" className="apercu" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 id="titre-reservation" className="apercu__titre">
              Voici ce que vous allez nous envoyer
            </h2>
            <div className="apercu__conversation">
              <p className="apercu__contact">
                <span aria-hidden="true">D</span>
                {config.nom}
              </p>
              <motion.p
                className="apercu__bulle"
                initial={reduit ? { opacity: 0 } : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
              >
                {message}
              </motion.p>
            </div>
            <a
              className="bouton apercu__envoyer"
              href={creerLienWhatsApp(config.whatsappRendezVous, message)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Envoyer sur WhatsApp
            </a>
            <button type="button" className="apercu__retour" onClick={() => setMessage(null)}>
              Modifier ma demande
            </button>
          </motion.div>
        ) : (
          <motion.form key="formulaire" className="reservation__formulaire" onSubmit={valider} exit={{ opacity: 0 }}>
            <p className="reservation__sur-titre">{demande.type === "prestation" ? demande.categorie : `Style · ${demande.theme}`}</p>
            <h2 id="titre-reservation" className="reservation__titre">
              {titre}
            </h2>

            <label className="champ">
              Prénom
              <input required autoComplete="given-name" value={infos.prenom} onChange={(e) => modifier("prenom", e.target.value)} />
            </label>

            <label className="champ">
              Quel jour ?
              <input type="date" required min={dateMin} value={infos.date} onChange={(e) => modifier("date", e.target.value)} />
            </label>

            <fieldset className="champ champ--moments">
              <legend>Plutôt…</legend>
              <div>
                {MOMENTS.map((m) => (
                  <label key={m.valeur} className="moment">
                    <input
                      type="radio"
                      name="moment"
                      value={m.valeur}
                      checked={infos.moment === m.valeur}
                      onChange={() => modifier("moment", m.valeur)}
                    />
                    <span>{m.nom}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="champ">
              Une précision ? (facultatif)
              <textarea
                rows={2}
                maxLength={200}
                placeholder="Cheveux longs, mariage le 30…"
                value={infos.note}
                onChange={(e) => modifier("note", e.target.value)}
              />
            </label>

            <button type="submit" className="bouton">
              Préparer ma demande
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
