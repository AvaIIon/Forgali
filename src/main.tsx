import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { captureAdClick } from "@/lib/adClick";

// Before anything renders: an ad click lands with ?gclid= on this very load.
captureAdClick();

createRoot(document.getElementById("root")!).render(<App />);
