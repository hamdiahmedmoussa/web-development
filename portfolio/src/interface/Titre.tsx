/** Un titre de section : numéro en petites capitales, puis serif droit + un mot en italique. */
interface Props {
  numero: string;
  titre: string;
  italique: string;
}

export function Titre({ numero, titre, italique }: Props) {
  return (
    <header className="titre">
      <p className="mono">({numero})</p>
      <h2>
        {titre} <em>{italique}</em>
      </h2>
    </header>
  );
}
