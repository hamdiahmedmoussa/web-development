import { useState } from "react";
import "./Visuel.css";

interface VisuelProps {
  /** Chemin sans extension, ex. "/images/parfums/pistache". */
  chemin: string;
  alt: string;
  className?: string;
  /** true pour l'image principale visible dès l'arrivée (pas de chargement différé). */
  prioritaire?: boolean;
  /** true : n'affiche rien si l'image manque (pour les décorations, comme les ingrédients). */
  discret?: boolean;
}

/*
  Affiche une image de public/images/, ou un emplacement marqué si elle manque.

  Ordre d'essai :
   1. <chemin>.webp  (créé par « npm run images », beaucoup plus léger)
   2. <chemin>.png   (le fichier que tu fournis)
   3. un cadre en pointillés qui affiche le nom du fichier attendu
*/
const EXTENSIONS = [".webp", ".png"];

export function Visuel({ chemin, alt, className = "", prioritaire = false, discret = false }: VisuelProps) {
  const [essai, setEssai] = useState(0);

  if (essai >= EXTENSIONS.length) {
    if (discret) return null;
    const fichier = chemin.split("/").pop();
    return (
      <div className={`visuel-manquant ${className}`} role="img" aria-label={alt}>
        <span>
          {fichier}.png
          <small>{chemin.replace(/^\//, "public/").replace(/\/[^/]+$/, "/")}</small>
        </span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={chemin + EXTENSIONS[essai]}
      alt={alt}
      // « lazy » : l'image n'est téléchargée que lorsqu'elle approche de l'écran.
      loading={prioritaire ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      onError={() => setEssai((n) => n + 1)}
    />
  );
}
