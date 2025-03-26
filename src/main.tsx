import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Leva } from "leva";
import ModelProvider from "./context/ModelProvider.tsx";
import AppProvider from "./context/AppProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <Leva hidden />
    <AppProvider>
      <ModelProvider>
        <App />
      </ModelProvider>
    </AppProvider>
  </>,
);
