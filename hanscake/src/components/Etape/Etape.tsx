import type { Categorie } from "../../types";
import { Choix } from "../Choix/Choix";
import "./Etape.css";

interface EtapeProps {
  categorie: Categorie;
  numero: number;
  total: number;
  /** true quand cette étape est celle en cours de défilement. */
  active: boolean;
  /** id de l'option choisie pour cette étape. */
  choix: string;
  onChoisir: (optionId: string) => void;
}

/** Une étape de la composition : un titre, une phrase et trois choix. */
export function Etape({ categorie, numero, total, active, choix, onChoisir }: EtapeProps) {
  const idTitre = `etape-${categorie.id}`;

  return (
    <section className={active ? "etape etape--active" : "etape"} aria-labelledby={idTitre}>
      <p className="surtitre">
        Étape {numero} sur {total}
      </p>
      <h3 id={idTitre} className="etape__titre">
        {categorie.titre}
      </h3>
      <p className="etape__texte">{categorie.texte}</p>
      <Choix
        nom={categorie.id}
        legende={`Choisissez : ${categorie.titre.toLowerCase()}`}
        options={categorie.options}
        valeur={choix}
        onChoisir={onChoisir}
      />
    </section>
  );
}
