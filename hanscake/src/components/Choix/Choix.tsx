import type { Option } from "../../types";
import "./Choix.css";

interface ChoixProps {
  /** Nom du groupe de boutons radio (un par étape). */
  nom: string;
  /** Question lue par les lecteurs d'écran. */
  legende: string;
  options: Option[];
  /** id de l'option actuellement choisie. */
  valeur: string;
  onChoisir: (optionId: string) => void;
}

/**
 * Trois choix présentés comme des cartes. Ce sont de vrais boutons radio :
 * ils fonctionnent au clavier (Tab puis flèches) sans code supplémentaire.
 */
export function Choix({ nom, legende, options, valeur, onChoisir }: ChoixProps) {
  return (
    <fieldset className="choix">
      <legend className="visuellement-cache">{legende}</legend>
      {options.map((option) => (
        <label key={option.id} className="choix__option">
          <input
            type="radio"
            name={nom}
            value={option.id}
            checked={option.id === valeur}
            onChange={() => onChoisir(option.id)}
          />
          <span className="choix__carte">
            <span className="choix__pastille" style={{ background: option.couleur }} />
            <span className="choix__nom">{option.nom}</span>
          </span>
        </label>
      ))}
    </fieldset>
  );
}
