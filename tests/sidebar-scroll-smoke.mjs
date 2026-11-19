import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = fs.readFileSync(path.join(root, "assets", "js", "app-core.js"), "utf8");
const start = source.indexOf("const SIDEBAR_SCROLL_KEY =");
const end = source.indexOf("window.addEventListener('DOMContentLoaded', () => {", start);
assert.ok(start >= 0 && end > start, "Could not locate sidebar persistence implementation");
const implementation = source.slice(start, end);

function createEnvironment(pathname, storage) {
  const navListeners = {};
  const windowListeners = {};
  const nav = {
    scrollTop: 0,
    scrollHeight: 1000,
    clientHeight: 300,
    addEventListener(type, handler) { navListeners[type] = handler; }
  };
  const sandbox = {
    URL,
    JSON,
    Number,
    Math,
    Promise,
    document: {
      querySelector(selector) { return selector === ".sidebar-nav" ? nav : null; },
      fonts: { ready: Promise.resolve() }
    },
    sessionStorage: {
      getItem(key) { return storage.has(key) ? storage.get(key) : null; },
      setItem(key, value) { storage.set(key, value); },
      removeItem(key) { storage.delete(key); }
    },
    requestAnimationFrame(callback) { callback(); },
    window: {
      location: {
        href: `https://example.test${pathname}`,
        pathname,
        origin: "https://example.test"
      },
      addEventListener(type, handler) { windowListeners[type] = handler; }
    }
  };
  vm.runInNewContext(`${implementation}\ninitSidebarScrollPersistence();`, sandbox);
  return { nav, navListeners, windowListeners };
}

const storage = new Map();
const firstPage = createEnvironment("/index.html", storage);
firstPage.nav.scrollTop = 365;

const destinationLink = {
  href: "https://example.test/pages/wali.html",
  target: "_self"
};
firstPage.navListeners.click({
  target: { closest(selector) { return selector === "a.nav-item[href]" ? destinationLink : null; } },
  defaultPrevented: false,
  button: 0,
  metaKey: false,
  ctrlKey: false,
  shiftKey: false,
  altKey: false
});

assert.ok(storage.size > 0, "Sidebar position was not saved before navigation");

const nextPage = createEnvironment("/pages/wali.html", storage);
nextPage.windowListeners.pageshow();
await new Promise(resolve => setImmediate(resolve));

assert.equal(nextPage.nav.scrollTop, 365, "Sidebar position was not restored on destination page");
assert.equal(storage.size, 0, "Restored sidebar state should be removed after use");

// A stale position must not be applied to a different destination.
storage.set("asisten-penghulu.sidebar-scroll.v1", JSON.stringify({
  scrollTop: 200,
  destination: "/pages/mahar.html"
}));
const unrelatedPage = createEnvironment("/pages/iddah.html", storage);
unrelatedPage.windowListeners.pageshow();
await new Promise(resolve => setImmediate(resolve));
assert.equal(unrelatedPage.nav.scrollTop, 0, "Stale sidebar position was applied to the wrong page");
assert.equal(storage.size, 0, "Stale sidebar state should be discarded");

console.log("Sidebar scroll smoke test passed: position saves, restores, and rejects stale destinations.");
