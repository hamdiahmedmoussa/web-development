/*
  Petites icônes dessinées en SVG (aucune bibliothèque à télécharger).
  « currentColor » : elles prennent la couleur du texte autour d'elles.
  aria-hidden : le texte à côté suffit aux lecteurs d'écran.
*/
const base = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function IconeWhatsApp() {
  return (
    <svg {...base}>
      {/* la bulle ronde avec sa petite pointe en bas à gauche */}
      <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z" />
      {/* le combiné de téléphone à l'intérieur */}
      <path d="M9.2 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.6 1.5c.1.2 0 .5-.1.7l-.5.6c.6 1.2 1.6 2.2 2.8 2.8l.6-.5c.2-.2.5-.2.7-.1l1.5.6c.3.1.4.3.4.5v.5c0 .3-.1.6-.6.8-.7.3-1.6.3-2.6-.2a9 9 0 0 1-4.2-4.2c-.5-1-.5-1.9-.2-2.6z" />
    </svg>
  );
}

export function IconeInstagram() {
  return (
    <svg {...base}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function IconeTelephone() {
  return (
    <svg {...base}>
      <path d="M6.5 3.5h2.2c.4 0 .7.2.8.6l1 3.2c.1.3 0 .7-.3.9l-1.6 1.2a12 12 0 0 0 6 6l1.2-1.6c.2-.3.6-.4.9-.3l3.2 1c.4.1.6.4.6.8v2.2c0 1-.8 1.8-1.8 1.8A16.3 16.3 0 0 1 4.7 5.3c0-1 .8-1.8 1.8-1.8z" />
    </svg>
  );
}

export function IconeFacebook() {
  return (
    <svg {...base}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="M15.5 8h-1.6c-1.2 0-1.9.7-1.9 1.9V20.5M10 12.5h5" />
    </svg>
  );
}

export function IconeTiktok() {
  return (
    <svg {...base}>
      <path d="M14 3.5v11.2a3.6 3.6 0 1 1-3.6-3.6M14 3.5c.4 2.4 2.2 4.1 4.6 4.3" />
    </svg>
  );
}

export function IconeItineraire() {
  return (
    <svg {...base}>
      <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}
