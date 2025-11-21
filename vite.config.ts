import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

/**
 * Vite config with PWA plugin
 *
 * Notes:
 * - Mantém outras configurações do seu projeto
 * - A opção `registerType: 'autoUpdate'` mantém o SW atualizado automaticamente
 */

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png"
      ],
      manifest: {
        name: "Repsol Invest",
        short_name: "Repsol",
        description: "Investimentos com rendimento diário — Repsol Invest",
        theme_color: "#ff6600",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/assets/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "/assets/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
      workbox: {
        // caching rules: precache build assets + runtime caching for API and images
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/repsol-backend-complete.onrender.com\/api\/.*$/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 // 1 hour
              },
              networkTimeoutSeconds: 10
            }
          },
          {
            urlPattern: /\/assets\/.*\.(png|jpg|jpeg|svg|webp)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "assets-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true, // ativa SW em dev para testes locais (remover se preferir)
      }
    })
  ],
  server: {
    fs: { allow: [".."] }
  }
});
