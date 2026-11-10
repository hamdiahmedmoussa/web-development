import { useRef } from "react";
import { categories } from "../../data/options";
import { useProgressionDefilement } from "../../hooks/useProgressionDefilement";
import type { CategorieId, GateauChoisi } from "../../types";
import { Etape } from "../Etape/Etape";
import { etapeActive } from "../Scene/apparitions";
import { Scene } from "../Scene/Scene";
import "./Atelier.css";

interface AtelierProps {
  gateau: GateauChoisi;
  onChoisir: (categorie: CategorieId, optionId: string) => void;
}

/**
 * Le cœur du site : le gâteau reste fixé à l'écran pendant que les quatre
 * étapes défilent. La progression du défilement fait apparaître les couches.
 */
export function Atelier({ gateau, onChoisir }: AtelierProps) {
  const refEtapes = useRef<HTMLDivElement>(null);
  const progression = useProgressionDefilement(refEtapes);
  const numeroActif = etapeActive(progression);

  return (
    <section id="atelier" className="atelier" aria-labelledby="titre-atelier">
      <div className="conteneur atelier__entete">
        <p className="surtitre">L'atelier</p>
        <h2 id="titre-atelier" className="section__titre">
          Composez votre gâteau
        </h2>
        <p className="section__intro">Quatre étapes, trois choix à chaque fois. Le gâteau se construit sous vos yeux.</p>
      </div>

      <div className="atelier__grille">
        <div className="atelier__scene">
          <Scene gateau={gateau} progression={progression} />
        </div>

        <div className="atelier__etapes" ref={refEtapes}>
          {categories.map((categorie, index) => (
            <Etape
              key={categorie.id}
              categorie={categorie}
              numero={index + 1}
              total={categories.length}
              active={index === numeroActif}
              choix={gateau[categorie.id]}
              onChoisir={(optionId) => onChoisir(categorie.id, optionId)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
