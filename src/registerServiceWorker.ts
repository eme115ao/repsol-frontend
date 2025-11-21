// src/registerServiceWorker.ts
export function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").then((reg) => {
        console.log("Service worker registrado:", reg);

        // Checa atualizações de SW e força atualização quando disponível
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed") {
              // Se já existia um controle anterior, há nova versão disponível
              if (navigator.serviceWorker.controller) {
                // notifica user (opcional): aqui apenas log
                console.log("Nova versão disponível — recarregue para atualizar.");
              } else {
                console.log("Conteúdo em cache para uso offline.");
              }
            }
          });
        });
      }).catch((err) => {
        console.error("Falha no registo do service worker:", err);
      });
    });
  }
}

export function unregisterServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((regs) => {
      for (const reg of regs) reg.unregister();
    });
  }
}
