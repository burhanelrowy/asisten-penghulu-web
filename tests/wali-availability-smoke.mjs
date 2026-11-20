import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const core = fs.readFileSync(path.join(root, 'assets', 'js', 'app-core.js'), 'utf8');
const waliHtml = fs.readFileSync(path.join(root, 'pages', 'wali.html'), 'utf8');

const nodes = new Map();
function makeNode(value = '') {
  const attributes = new Map();
  const classes = new Set();
  return {
    value,
    innerText: '',
    textContent: '',
    innerHTML: '',
    className: '',
    classList: {
      toggle(name, force) {
        if (force === undefined ? !classes.has(name) : force) classes.add(name);
        else classes.delete(name);
      },
      add(...names) { names.forEach(name => classes.add(name)); },
      remove(...names) { names.forEach(name => classes.delete(name)); },
      contains(name) { return classes.has(name); }
    },
    setAttribute(name, value) { attributes.set(name, String(value)); },
    getAttribute(name) { return attributes.get(name) ?? null; }
  };
}

const inputDefaults = {
  akadGroomName: 'Ahmad Fauzi bin Abdullah',
  akadBrideName: 'Fatimah Azzahra binti Ridwan',
  akadWaliName: 'Ridwan bin Hasan',
  akadWaliStatus: 'ayah',
  akadMaharDetail: 'uang tunai Rp1.000.000',
  akadPayMode: 'tunai'
};
const document = {
  getElementById(id) {
    if (!nodes.has(id)) nodes.set(id, makeNode(inputDefaults[id] ?? ''));
    return nodes.get(id);
  },
  querySelector() { return null; },
  querySelectorAll() { return []; }
};
const context = vm.createContext({
  document,
  window: { addEventListener() {}, location: { pathname: '/pages/wali.html', href: 'https://example.test/pages/wali.html', origin: 'https://example.test' } },
  console,
  URL,
  URLSearchParams,
  localStorage: { setItem() {}, getItem() { return null; } },
  sessionStorage: { setItem() {}, getItem() { return null; }, removeItem() {} },
  requestAnimationFrame(callback) { callback(); },
  setTimeout() {},
  clearTimeout() {},
  navigator: {}
});
vm.runInContext(core, context, { filename: 'app-core.js' });
const waliData = fs.readFileSync(path.join(root, 'assets', 'js', 'data', 'wali-data.js'), 'utf8');
vm.runInContext(waliData, context, { filename: 'wali-data.js' });

// Legal guidance must distinguish unknown whereabouts from a known but absent wali.
const unknown = context.getWaliAvailabilityGuidance('unknown');
assert.equal(unknown.type, 'unknown');
assert.match(unknown.title, /Tidak Diketahui/);
assert.match(unknown.notes, /Pasal 13 ayat \(5\) huruf c jo\. ayat \(7\)/);
assert.match(unknown.notes, /bermeterai/);
assert.match(unknown.notes, /2 \(dua\) orang saksi/);

const pending = context.getWaliAvailabilityGuidance('pending');
assert.equal(pending.type, 'pending');
assert.match(pending.explanation, /belum dapat disimpulkan/i);
assert.match(pending.notes, /Pasal 12 ayat \(5\)/);
assert.equal(context.getWaliAvailabilityGuidance('known'), null);
assert.equal(vm.runInContext('waliAnswers.qLocation', context), 'pending');

// Status control updates its selected state accessibly.
context.setWaliLocationStatus('unknown');
assert.equal(nodes.get('btn-location-unknown').getAttribute('aria-pressed'), 'true');
assert.equal(nodes.get('btn-location-known').getAttribute('aria-pressed'), 'false');
assert.equal(vm.runInContext('waliAnswers.qLocation', context), 'unknown');
context.setWaliLocationStatus('known');
assert.equal(vm.runInContext('waliAnswers.qLocation', context), 'known');

// An unknown/pending whereabouts result must stop at the current wali; it must not auto-skip.
let modalCalls = 0;
context.showWaliResultModal = () => { modalCalls += 1; };
context.setWaliLocationStatus('unknown');
const currentBeforeUnknown = vm.runInContext('currentWaliIndex', context);
context.evaluateCurrentWali();
assert.equal(vm.runInContext('currentWaliIndex', context), currentBeforeUnknown);
assert.equal(nodes.get('waliResultTitle').textContent, 'Keberadaan Wali Tidak Diketahui');
assert.equal(modalCalls, 1);
context.setWaliLocationStatus('pending');
context.evaluateCurrentWali();
assert.equal(vm.runInContext('currentWaliIndex', context), currentBeforeUnknown);
assert.equal(nodes.get('waliResultTitle').textContent, 'Keberadaan Wali Belum Terverifikasi');
assert.equal(modalCalls, 2);

// Wali page exposes all three statuses and clearly distinguishes presence/taukil.
assert.match(waliHtml, /setWaliLocationStatus\('known'\)/);
assert.match(waliHtml, /setWaliLocationStatus\('unknown'\)/);
assert.match(waliHtml, /setWaliLocationStatus\('pending'\)/);
assert.match(waliHtml, /kemungkinan taukil wali/i);

// Generate qabul text and check Indonesian, Latin, and Arabic outputs.
context.renderAkadScripts();
assert.equal(
  nodes.get('textKabulStdId').innerText,
  '"Saya terima nikah dan kawinnya Fatimah Azzahra binti Ridwan untuk diri saya sendiri dengan maskawin tersebut dibayar tunai."'
);
assert.match(nodes.get('textKabulFullId').innerText, /untuk diri saya sendiri dengan maskawin uang tunai Rp1\.000\.000 dibayar tunai/);
assert.match(nodes.get('textKabulStdLatin').innerText, /li-nafsii/);
assert.match(nodes.get('textKabulFullLatin').innerText, /li-nafsii/);
assert.match(nodes.get('textKabulStdAr').innerText, /لِنَفْسِي/);
assert.match(nodes.get('textKabulFullAr').innerText, /لِنَفْسِي/);

nodes.get('akadPayMode').value = 'hutang';
context.renderAkadScripts();
assert.match(nodes.get('textKabulStdId').innerText, /dibayar hutang/);
assert.match(nodes.get('textKabulFullId').innerText, /dibayar hutang/);

console.log('Wali availability and qabul smoke tests passed.');
