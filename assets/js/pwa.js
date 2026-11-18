(() => {
  if (!("serviceWorker" in navigator)) return;
  const workerPath = location.pathname.includes("/pages/") ? "../sw.js" : "sw.js";
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(workerPath).catch(error => {
      console.warn("PWA service worker registration failed:", error);
    });
  });
})();
