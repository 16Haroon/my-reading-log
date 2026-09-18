/* Personal editor. Visitors see the shelf. This browser can
   unlock the buttons after That’s me. */

const GATE_KEY = "my-reading-log.gate";
const PROGRESS_KEY = "my-reading-log.progress";
const PASS_SHA = "27f9d8e9dbfdc2bf3806229730fb826e898fcc07f54b554d8553539f8c81f7c9";

let progress = { status: { "48-laws": "reading" } };
let dockTimer = 0;

function isOwner() {
  return localStorage.getItem(GATE_KEY) === "ok";
}

function setNote(text) {
  const line = document.getElementById("dock-line");
  if (!line) return;
  const now = nowReading(progress);
  clearTimeout(dockTimer);
  if (!text) {
    line.textContent = now ? now.title : "One book at a time";
    return;
  }
  line.textContent = text;
  dockTimer = setTimeout(() => {
    const current = nowReading(progress);
    line.textContent = current ? current.title : "One book at a time";
  }, 2800);
}

async function sha256Hex(text) {
  const bytes = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

function sameHex(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function loadProgress() {
  try {
    const res = await fetch(SITE.progressFile + "?t=" + Date.now());
    if (res.ok) progress = await res.json();
  } catch (err) {
    // file:// or a missing copy — keep the default
  }

  if (!isOwner()) return;
  try {
    const local = localStorage.getItem(PROGRESS_KEY);
    if (local) progress = JSON.parse(local);
  } catch (err) {
    // ignore a broken local copy
  }
}

function saveProgress() {
  if (!isOwner()) {
    setNote("That’s me first");
    return;
  }
  const body = snapshot(progress);
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(body));
  progress = body;
  setNote("Saved on this computer");
}

function applyStatus(id, value) {
  if (!progress.status) progress.status = {};
  if (value === "reading") {
    Object.keys(progress.status).forEach((key) => {
      if (progress.status[key] === "reading") delete progress.status[key];
    });
    progress.status[id] = "reading";
  } else if (value === "done") {
    progress.status[id] = "done";
    const hasReading = Object.values(progress.status).some((s) => s === "reading");
    if (!hasReading) {
      const nxt = queued(progress).find((book) => statusOf(book, progress) !== "done");
      if (nxt) progress.status[nxt.id] = "reading";
    }
  }
  render();
}

function render() {
  document.body.classList.toggle("is-owner", isOwner());
  renderShelf(progress, isOwner());
}

function openGate() {
  document.getElementById("gate").classList.add("open");
  document.getElementById("password-input").focus();
}

function closeGate() {
  document.getElementById("gate").classList.remove("open");
}

async function unlock() {
  const value = document.getElementById("password-input").value;
  if (!value) return;
  const hex = await sha256Hex(value);
  if (!sameHex(hex, PASS_SHA)) {
    setNote("Not that");
    return;
  }
  localStorage.setItem(GATE_KEY, "ok");
  document.getElementById("password-input").value = "";
  closeGate();
  await loadProgress();
  render();
  setNote("Welcome back");
}

function bind() {
  document.getElementById("thats-me").addEventListener("click", openGate);
  document.getElementById("gate-cancel").addEventListener("click", closeGate);
  document.getElementById("gate-save").addEventListener("click", unlock);
  document.getElementById("password-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") unlock();
  });
  document.getElementById("save-btn").addEventListener("click", () => saveProgress());
  document.getElementById("sign-out").addEventListener("click", () => {
    localStorage.removeItem(GATE_KEY);
    loadProgress().then(() => {
      render();
      setNote("Signed out");
    });
  });

  document.body.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-set]");
    if (!btn || !isOwner()) return;
    const row = btn.closest("[data-id]");
    const id = btn.getAttribute("data-id") || (row && row.getAttribute("data-id"));
    if (!id) return;
    applyStatus(id, btn.getAttribute("data-set"));
    saveProgress();
  });
}

async function start() {
  bind();
  await loadProgress();
  render();
}

start();
