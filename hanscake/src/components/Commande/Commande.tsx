import { useEffect, useRef, useState, type FormEvent } from "react";
import { config } from "../../config";
import { categories, optionChoisie } from "../../data/options";
import { creerLienWhatsApp, creerMessage, dateMinimum } from "../../lib/whatsapp";
import type { GateauChoisi, InfosCommande } from "../../types";
import "./Commande.css";

interface CommandeProps {
  ouverte: boolean;
  gateau: GateauChoisi;
  onFermer: () => void;
}

const infosVides: InfosCommande = {
  prenom: "",
  date: "",
  heure: "",
  parts: config.partsMinimum,
  inscription: "",
};

/**
 * Fenêtre de commande. On utilise la balise <dialog> du navigateur : elle gère
 * toute seule la touche Échap, le fond assombri et le clavier qui reste
 * « enfermé » dans la fenêtre tant qu'elle est ouverte.
 */
export function Commande({ ouverte, gateau, onFermer }: CommandeProps) {
  const refDialogue = useRef<HTMLDialogElement>(null);
  const [infos, setInfos] = useState<InfosCommande>(infosVides);
  // Première date possible, calculée une seule fois à l'affichage du composant.
  const [dateMin] = useState(() => dateMinimum(new Date(), config.delaiJours));

  // On ouvre ou ferme la fenêtre quand la valeur « ouverte » change.
  useEffect(() => {
    const dialogue = refDialogue.current;
    if (!dialogue) return;
    if (ouverte && !dialogue.open) dialogue.showModal();
    if (!ouverte && dialogue.open) dialogue.close();
  }, [ouverte]);

  /** Met à jour un seul champ du formulaire. */
  function modifier<Champ extends keyof InfosCommande>(champ: Champ, valeur: InfosCommande[Champ]) {
    setInfos((anciennes) => ({ ...anciennes, [champ]: valeur }));
  }

  function envoyer(evenement: FormEvent) {
    // Par défaut, un formulaire recharge la page : on l'en empêche.
    evenement.preventDefault();
    const message = creerMessage(config.nom, gateau, infos);
    const lien = creerLienWhatsApp(config.whatsapp, message);
    // Si le navigateur bloque le nouvel onglet, on ouvre le lien dans l'onglet actuel.
    const onglet = window.open(lien, "_blank", "noopener");
    if (!onglet) window.location.href = lien;
    onFermer();
  }

  const resume = categories.map((categorie) => optionChoisie(gateau, categorie.id).nom).join(" · ");

  return (
    <dialog ref={refDialogue} className="commande" aria-labelledby="titre-commande" onClose={onFermer}>
      <form className="commande__formulaire" onSubmit={envoyer}>
        <div className="commande__entete">
          <h2 id="titre-commande">Votre commande</h2>
          <button type="button" className="commande__fermer" onClick={onFermer} aria-label="Fermer">
            ×
          </button>
        </div>

        <p className="commande__resume">{resume}</p>

        <label className="champ">
          Prénom
          <input
            type="text"
            required
            autoComplete="given-name"
            value={infos.prenom}
            onChange={(e) => modifier("prenom", e.target.value)}
          />
        </label>

        <div className="commande__ligne">
          <label className="champ">
            Date de retrait
            <input
              type="date"
              required
              min={dateMin}
              value={infos.date}
              onChange={(e) => modifier("date", e.target.value)}
            />
          </label>

          <label className="champ">
            Heure
            <input type="time" required value={infos.heure} onChange={(e) => modifier("heure", e.target.value)} />
          </label>
        </div>

        <label className="champ">
          Nombre de parts
          <select value={infos.parts} onChange={(e) => modifier("parts", Number(e.target.value))}>
            {config.choixParts.map((parts) => (
              <option key={parts} value={parts}>
                {parts} parts
              </option>
            ))}
          </select>
        </label>

        <label className="champ">
          Texte à écrire sur le gâteau (facultatif)
          <input
            type="text"
            maxLength={40}
            placeholder="Joyeux anniversaire…"
            value={infos.inscription}
            onChange={(e) => modifier("inscription", e.target.value)}
          />
        </label>

        <button type="submit" className="bouton commande__envoyer">
          Envoyer sur WhatsApp
        </button>
        <p className="commande__note">
          WhatsApp s'ouvre avec votre message déjà écrit. Il ne reste qu'à l'envoyer : la pâtisserie vous confirme le
          prix et l'acompte.
        </p>
      </form>
    </dialog>
  );
}
