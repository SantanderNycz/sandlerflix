import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { I18nProvider } from "@/i18n/I18nContext";
import { SelectionProvider } from "@/context/SelectionContext";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Elemento #root não encontrado");

createRoot(rootEl).render(
  <StrictMode>
    <ErrorBoundary>
      <I18nProvider>
        <SelectionProvider>
          <App />
        </SelectionProvider>
      </I18nProvider>
    </ErrorBoundary>
  </StrictMode>,
);
