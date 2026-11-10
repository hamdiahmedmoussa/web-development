import "./BandeauDemo.css";

/** Mention affichée tant que le site est une maquette (voir config.estUneMaquette). */
export function BandeauDemo() {
  return (
    <p className="bandeau-demo" role="note">
      Maquette de démonstration · site non officiel
    </p>
  );
}
