import { TravelProvider } from "./context/TravelContext.jsx";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <TravelProvider>
    <App />
  </TravelProvider>
);
