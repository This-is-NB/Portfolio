import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

const rootElement = document.querySelector("#app");

if (!(rootElement instanceof HTMLElement)) {
  throw new Error('The application root element "#app" was not found.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
