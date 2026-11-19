import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlFiles = [
  "index.html",
  ...fs.readdirSync(path.join(root, "pages")).filter(name => name.endsWith(".html")).map(name => `pages/${name}`)
];
const jsFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && full.endsWith(".js")) jsFiles.push(full);
  }
}
walk(path.join(root, "assets", "js"));
jsFiles.push(path.join(root, "sw.js"));

let checkedRefs = 0;
for (const relative of htmlFiles) {
  const file = path.join(root, relative);
  const source = fs.readFileSync(file, "utf8");
  const ids = [...source.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${relative}: duplicate HTML id`);

  for (const match of source.matchAll(/\b(?:src|href)=["']([^"']+)["']/g)) {
    const ref = match[1];
    if (/^(?:https?:|mailto:|tel:|#|data:|javascript:)/i.test(ref)) continue;
    const localPath = decodeURIComponent(ref.split(/[?#]/, 1)[0]);
    if (!localPath) continue;
    const resolved = path.resolve(path.dirname(file), localPath);
    assert.ok(fs.existsSync(resolved), `${relative}: missing local reference ${ref}`);
    checkedRefs++;
  }
}

for (const file of jsFiles) {
  const result = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
  assert.equal(result.status, 0, `${path.relative(root, file)} syntax error:\n${result.stderr}`);
}

for (const relative of ["manifest.webmanifest", "vercel.json"]) {
  JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
}

const appCore = fs.readFileSync(path.join(root, "assets", "js", "app-core.js"), "utf8");
assert.ok(appCore.includes("SIDEBAR_SCROLL_KEY"), "Sidebar scroll persistence key is missing");
assert.ok(appCore.includes("sessionStorage.setItem(SIDEBAR_SCROLL_KEY"), "Sidebar scroll position is not saved");
assert.ok(appCore.includes("sessionStorage.getItem(SIDEBAR_SCROLL_KEY"), "Sidebar scroll position is not restored");
assert.ok(appCore.includes("window.addEventListener('pageshow', restoreSidebarPosition)"),
  "Sidebar scroll restoration must also handle browser pageshow/back-forward cache");

const worker = fs.readFileSync(path.join(root, "sw.js"), "utf8");
for (const required of [
  "/assets/js/data/knowledge.js",
  "/assets/js/data/bank-nasehat.js",
  "/assets/css/modules/nasihat.css",
  "/assets/fonts/AsistenNaskh.ttf"
]) {
  assert.ok(worker.includes(required), `Service Worker shell missing ${required}`);
}

const encyclopedia = fs.readFileSync(path.join(root, "pages", "ensiklopedia.html"), "utf8");
assert.ok(!/class=["']nav-item knowledge-nav active["']/.test(encyclopedia),
  "Encyclopedia category links must not all be statically active");

assert.ok(fs.existsSync(path.join(root, "tests", "sidebar-scroll-smoke.mjs")), "Sidebar scroll regression test is missing");
console.log(`Static validation passed: ${htmlFiles.length} HTML pages, ${jsFiles.length} JavaScript files, ${checkedRefs} local references.`);
