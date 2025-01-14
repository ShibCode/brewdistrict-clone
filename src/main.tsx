import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Leva } from "leva";

createRoot(document.getElementById("root")!).render(
  <>
    <Leva hidden />
    <App />
  </>
);
