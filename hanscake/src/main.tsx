import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Police des titres, hébergée avec le site (pas d'appel à Google Fonts).
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "./styles/variables.css";
import "./styles/global.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
