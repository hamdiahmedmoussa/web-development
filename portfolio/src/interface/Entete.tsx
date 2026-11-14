/*
  LE LOGO ET LE MENU, TOUJOURS VISIBLES
  Le lien de la section affichée à l'écran devient doré. Pour savoir quelle section
  est à l'écran, on utilise un IntersectionObserver : le navigateur nous prévient
  quand une section traverse le milieu de l'écran.
*/
import { useEffect, useState } from "react";
import { menu, moi } from "../data";

export function Entete({ visible }: { visible: boolean }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) if (e.isIntersecting) setActive(e.target.id);
      },
      // Seule une fine bande au milieu de l'écran compte.
      { rootMargin: "-50% 0px -50% 0px" },
    );
    document.querySelectorAll("main section[id]").forEach((s) => observateur.observe(s));
    return () => observateur.disconnect();
  }, []);

  return (
    <header className={`entete ${visible ? "est-visible" : ""}`}>
      <a href="#accueil" className="logo" aria-label={`${moi.prenom}, retour en haut`}>
        {moi.initiale}
        <span>.</span>
      </a>
      <nav aria-label="Sections">
        <ul>
          {menu.map((m) => (
            <li key={m.id}>
              <a href={`#${m.id}`} aria-current={active === m.id ? "true" : undefined}>
                {m.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
