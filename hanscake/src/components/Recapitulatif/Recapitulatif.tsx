import { config } from "../../config";
import { categories, optionChoisie } from "../../data/options";
import type { GateauChoisi } from "../../types";
import { Scene } from "../Scene/Scene";
import "./Recapitulatif.css";

interface RecapitulatifProps {
  gateau: GateauChoisi;
  onCommander: () => void;
}

/** Le gâteau terminé, la liste des choix et le bouton de commande. */
export function Recapitulatif({ gateau, onCommander }: RecapitulatifProps) {
  return (
    <section className="section recap" aria-labelledby="titre-recap">
      <div className="conteneur recap__grille">
        <div className="recap__scene">
          {/* progression = 1 : le gâteau est affiché complet. */}
          <Scene gateau={gateau} progression={1} />
        </div>

        <div>
          <p className="surtitre">Votre création</p>
          <h2 id="titre-recap" className="section__titre">
            Il est prêt à être commandé
          </h2>

          <dl className="recap__liste">
            {categories.map((categorie) => (
              <div key={categorie.id} className="recap__ligne">
                <dt>{categorie.titre.replace(/^(La|Le) /, "")}</dt>
                <dd>
                  <span className="recap__pastille" style={{ background: optionChoisie(gateau, categorie.id).couleur }} />
                  {optionChoisie(gateau, categorie.id).nom}
                </dd>
              </div>
            ))}
          </dl>

          <p className="recap__prix">
            À partir de {config.prixDepart} pour {config.partsMinimum} parts. Prix confirmé sur WhatsApp.
          </p>
          <button type="button" className="bouton" onClick={onCommander}>
            Commander ce gâteau
          </button>
        </div>
      </div>
    </section>
  );
}
