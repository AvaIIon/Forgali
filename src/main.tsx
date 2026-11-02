import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { captureAdClick } from "@/lib/adClick";
import { initPinterestTag } from "@/lib/pinterest";

// Before anything renders: an ad click lands with ?gclid= / ?epik= on this very load.
captureAdClick();
initPinterestTag();

createRoot(document.getElementById("root")!).render(<App />);
