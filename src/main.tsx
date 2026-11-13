import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("No se encontró el elemento #root");
}

if (
  import.meta.env.DEV &&
  window.location.pathname !== "/" &&
  !window.location.hash
) {
  window.history.replaceState(null, "", `/#${window.location.pathname}`);
}

createRoot(rootElement).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
