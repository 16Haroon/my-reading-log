/* Personal editor. The live page is read-only unless this browser
   holds a fine-grained GitHub token for this repo. The token never
   goes into git. */

const TOKEN_KEY = "my-reading-log.token";

let progress = { status: { "48-laws": "reading" } };
let progressSha = null;
let dockTimer = 0;

function token() {
  return localStorage.getItem(TOKEN_KEY) || "";
}

function isOwner() {
  return Boolean(token());
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

function api(path, options) {
  const headers = Object.assign({
    Accept: "application/vnd.github+json",
    Authorization: "Bearer " + token()
  }, (options && options.headers) || {});
  return fetch("https://api.github.com" + path, Object.assign({}, options, { headers }));
}

function toBase64(text) {
  return btoa(unescape(encodeURIComponent(text)));
}

async function loadProgress() {
  try {
    const res = await fetch(SITE.progressFile + "?t=" + Date.now());
    if (res.ok) progress = await res.json();
  } catch (err) {
    // file:// or a missing copy — keep the default
  }

  if (!token()) return;
  try {
    const res = await api(
      "/repos/" + SITE.githubUser + "/" + SITE.repo + "/contents/" + SITE.progressFile
    );
    if (!res.ok) return;
    const file = await res.json();
    progressSha = file.sha;
    if (file.content) {
      progress = JSON.parse(decodeURIComponent(escape(atob(file.content.replace(/\n/g, "")))));
    }
  } catch (err) {
    setNote("Could not reach GitHub");
  }
}

async function saveProgress() {
  if (!token()) {
    setNote("This browser is not signed in");
    return;
  }
  const body = snapshot(progress);
  const content = toBase64(JSON.stringify(body, null, 2) + "\n");
  const res = await api(
    "/repos/" + SITE.githubUser + "/" + SITE.repo + "/contents/" + SITE.progressFile,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Update what I’m reading",
        content: content,
        sha: progressSha,
        branch: SITE.branch
      })
    }
  );
  if (!res.ok) {
    setNote("Save failed");
    return;
  }
  const saved = await res.json();
  progressSha = saved.content && saved.content.sha;
  progress = body;
  setNote("Saved");
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
  document.getElementById("token-input").focus();
}

function closeGate() {
  document.getElementById("gate").classList.remove("open");
}

async function unlock() {
  const value = document.getElementById("token-input").value.trim();
  if (!value) return;
  localStorage.setItem(TOKEN_KEY, value);
  const res = await api("/repos/" + SITE.githubUser + "/" + SITE.repo);
  if (!res.ok) {
    localStorage.removeItem(TOKEN_KEY);
    setNote("Token was rejected");
    return;
  }
  closeGate();
  await loadProgress();
  render();
  setNote("Welcome back");
}

function bind() {
  document.getElementById("thats-me").addEventListener("click", openGate);
  document.getElementById("gate-cancel").addEventListener("click", closeGate);
  document.getElementById("gate-save").addEventListener("click", unlock);
  document.getElementById("save-btn").addEventListener("click", () => saveProgress());
  document.getElementById("sign-out").addEventListener("click", () => {
    localStorage.removeItem(TOKEN_KEY);
    render();
    setNote("Signed out");
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
