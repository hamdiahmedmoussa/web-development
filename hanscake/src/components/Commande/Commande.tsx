import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { config, formaterPrix } from "../../config";
import { useCommande } from "../../context/CommandeContext";
import { creerLienWhatsApp, creerMessage, dateMinimum, resumerBoite, totalBoite } from "../../lib/whatsapp";
import type { Article, InfosCommande } from "../../types";
import { ConfirmationVerre } from "./ConfirmationVerre";
import "./Commande.css";

/*
  LA COMMANDE
  <dialog> est la fenêtre native du navigateur : elle gère la touche Échap,
  le fond assombri et garde le clavier à l'intérieur tant qu'elle est ouverte.

  Deux « phases » :
   - "formulaire" : le client remplit ses informations ;
   - "confirmation" : la carte se transforme (animation en verre dépoli)
     et propose d'ouvrir WhatsApp avec le message prêt.
*/
export function Commande() {
  const { article, fermer } = useCommande();
  const refDialogue = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = refDialogue.current;
    if (!d) return;
    if (article && !d.open) d.showModal();
    if (!article && d.open) d.close();
  }, [article]);

  return (
    <dialog
      ref={refDialogue}
      className="commande"
      aria-labelledby="titre-commande"
      onClose={fermer}
      // Un clic sur le fond assombri (en dehors de la carte) ferme la fenêtre.
      onClick={(e) => e.target === e.currentTarget && fermer()}
    >
      {/* key : un nouveau formulaire vierge à chaque nouvel article */}
      {article && <Contenu key={JSON.stringify(article)} article={article} fermer={fermer} />}
    </dialog>
  );
}

function Contenu({ article, fermer }: { article: Article; fermer: () => void }) {
  const reduit = useReducedMotion();
  const [infos, setInfos] = useState<InfosCommande>({
    prenom: "",
    date: "",
    heure: "",
    // Si le calculateur a conseillé une taille, on la pré-remplit.
    parts: article.type === "gateau" && article.parts ? article.parts : config.partsMinimum,
    inscription: "",
    idee: "",
  });
  const [dateMin] = useState(() => dateMinimum(new Date(), config.delaiJours));
  const [lien, setLien] = useState<string | null>(null);

  function modifier<C extends keyof InfosCommande>(champ: C, valeur: InfosCommande[C]) {
    setInfos((anciennes) => ({ ...anciennes, [champ]: valeur }));
  }

  function valider(e: FormEvent) {
    e.preventDefault(); // un formulaire rechargerait la page sinon
    setLien(creerLienWhatsApp(config.whatsapp, creerMessage(article, infos)));
  }

  const estGateau = article.type === "gateau";
  const estSurMesure = article.type === "sur-mesure";

  return (
    // layout : quand le contenu change de taille, la carte s'adapte en douceur.
    <motion.div className="commande__carte" layout={!reduit} transition={{ type: "spring", stiffness: 260, damping: 28 }}>
      <button type="button" className="commande__fermer" onClick={fermer} aria-label="Fermer">
        ×
      </button>

      <AnimatePresence mode="wait" initial={false}>
        {lien ? (
          <ConfirmationVerre key="ok" lien={lien} prenom={infos.prenom} retour={() => setLien(null)} />
        ) : (
          <motion.form
            key="formulaire"
            className="commande__formulaire"
            onSubmit={valider}
            exit={reduit ? { opacity: 0 } : { opacity: 0, scale: 0.94, filter: "blur(6px)" }}
            transition={{ duration: 0.25 }}
          >
            <h2 id="titre-commande" className="commande__titre">
              {estGateau ? article.parfum.nom : estSurMesure ? article.theme : "Votre boîte"}
            </h2>
            <p className="commande__resume">
              {estGateau
                ? `Gâteau à partir de ${formaterPrix(article.parfum.prix)} pour ${config.partsMinimum} parts.`
                : estSurMesure
                  ? `Modèle : ${article.modele}. Le prix dépend du décor : nous vous le donnons sur WhatsApp.`
                  : `${resumerBoite(article.patisseries).join(", ")}. Total ${formaterPrix(totalBoite(article.patisseries))}.`}
            </p>

            <label className="champ">
              Prénom
              <input
                required
                autoComplete="given-name"
                value={infos.prenom}
                onChange={(e) => modifier("prenom", e.target.value)}
              />
            </label>

            <div className="commande__ligne">
              <label className="champ">
                Date de retrait
                <input type="date" required min={dateMin} value={infos.date} onChange={(e) => modifier("date", e.target.value)} />
              </label>
              <label className="champ">
                Heure
                <input type="time" required value={infos.heure} onChange={(e) => modifier("heure", e.target.value)} />
              </label>
            </div>

            {estSurMesure && (
              <label className="champ">
                Votre idée (personnage, couleurs, âge…)
                <textarea
                  rows={3}
                  maxLength={300}
                  placeholder="Spider-Man, 6 ans, rouge et bleu"
                  value={infos.idee}
                  onChange={(e) => modifier("idee", e.target.value)}
                />
              </label>
            )}

            {(estGateau || estSurMesure) && (
              <>
                <label className="champ">
                  Nombre de parts
                  <select value={infos.parts} onChange={(e) => modifier("parts", Number(e.target.value))}>
                    {config.choixParts.map((n) => (
                      <option key={n} value={n}>
                        {n} parts
                      </option>
                    ))}
                  </select>
                </label>
                <label className="champ">
                  Inscription sur le gâteau (facultatif)
                  <input
                    maxLength={40}
                    placeholder="Joyeux anniversaire Amina"
                    value={infos.inscription}
                    onChange={(e) => modifier("inscription", e.target.value)}
                  />
                </label>
              </>
            )}

            <p className="commande__note">Commande la veille au minimum. Paiement par CAC, numéro donné sur WhatsApp.</p>
            <button type="submit" className="bouton">
              Préparer ma commande
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
