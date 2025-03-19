import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Leva } from "leva";
import ModelProvider from "./context/ModelProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <Leva hidden />
    <ModelProvider>
      <App />
    </ModelProvider>
  </>,
);
