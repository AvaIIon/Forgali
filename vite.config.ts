import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { readFileSync } from "fs";
import { componentTagger } from "lovable-tagger";

// Per-build id written by scripts/generate-build-id.mjs (npm prebuild). The
// plugin below stamps it into index.html's <meta name="forgali-build">, and
// middleware.ts embeds the same value, so the edge only trusts a shell from
// its own deployment. Falls back to the committed "local" for plain
// `vite build` runs, which stamp and bundle the same value anyway.
const BUILD_ID: string = (() => {
  try {
    const parsed = JSON.parse(readFileSync(path.resolve(__dirname, "src/data/build-id.json"), "utf-8"));
    return typeof parsed?.id === "string" && parsed.id ? parsed.id : "local";
  } catch {
    return "local";
  }
})();

const buildStamp = () => ({
  name: "forgali-build-stamp",
  transformIndexHtml: (html: string) => html.replace("%FORGALI_BUILD%", BUILD_ID),
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api/images': {
        target: 'https://bedsmart.ca',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/images/, ''),
        secure: true,
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // Remove Cross-Origin-Resource-Policy restrictions by setting headers
            proxyReq.setHeader('Referer', 'https://bedsmart.ca/');
            proxyReq.setHeader('Origin', 'https://bedsmart.ca');
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            // Remove Cross-Origin-Resource-Policy header from response
            delete proxyRes.headers['cross-origin-resource-policy'];
            // Allow all origins for images
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
            proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, HEAD, OPTIONS';
            proxyRes.headers['Access-Control-Allow-Headers'] = '*';
          });
        },
      },
    },
  },
  plugins: [react(), buildStamp(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
