import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

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
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
