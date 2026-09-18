/* The shelf itself. Order is how I mean to read them. */

const SITE = {
  githubUser: "16Haroon",
  repo: "my-reading-log",
  branch: "main",
  progressFile: "progress.json"
};

const SHELF = [
  { id: "shoe-dog", title: "Shoe Dog", author: "Phil Knight", prior: true },
  { id: "seven-habits", title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey", prior: true },
  { id: "rich-dad", title: "Rich Dad Poor Dad", author: "Robert T. Kiyosaki", prior: true },
  { id: "mans-search", title: "Man’s Search for Meaning", author: "Viktor E. Frankl", prior: true },
  { id: "lateral-thinking", title: "Lateral Thinking", author: "Edward de Bono", prior: true },

  { id: "48-laws", title: "The 48 Laws of Power", author: "Robert Greene" },
  { id: "how-to-win-friends", title: "How to Win Friends & Influence People", author: "Dale Carnegie" },
  { id: "rosie-project", title: "The Rosie Project", author: "Graeme Simsion" },
  { id: "beautiful-mind", title: "How to Have a Beautiful Mind", author: "Edward de Bono" },
  { id: "courage-disliked", title: "The Courage to Be Disliked", author: "Ichiro Kishimi & Fumitake Koga" },
  { id: "courage-happy", title: "The Courage to Be Happy", author: "Ichiro Kishimi & Fumitake Koga" },
  { id: "babylon", title: "The Richest Man in Babylon", author: "George S. Clason" },
  { id: "think-grow-rich", title: "Think and Grow Rich", author: "Napoleon Hill" },
  { id: "blue-castle", title: "The Blue Castle", author: "L.M. Montgomery" },
  { id: "the-prince", title: "The Prince", author: "Niccolò Machiavelli" },
  { id: "lessons-history", title: "The Lessons of History", author: "Will & Ariel Durant" },
  { id: "rational-optimist", title: "The Rational Optimist", author: "Matt Ridley" },
  { id: "beginning-infinity", title: "The Beginning of Infinity", author: "David Deutsch" },
  { id: "fooled-randomness", title: "Fooled by Randomness", author: "Nassim Nicholas Taleb" },
  { id: "black-swan", title: "The Black Swan", author: "Nassim Nicholas Taleb" },
  { id: "bed-procrustes", title: "The Bed of Procrustes", author: "Nassim Nicholas Taleb" },
  { id: "antifragile", title: "Antifragile", author: "Nassim Nicholas Taleb" },
  { id: "skin-in-the-game", title: "Skin in the Game", author: "Nassim Nicholas Taleb" },
  { id: "pride-prejudice", title: "Pride and Prejudice", author: "Jane Austen" },
  { id: "persuasion", title: "Persuasion", author: "Jane Austen" },
  { id: "moveable-feast", title: "A Moveable Feast", author: "Ernest Hemingway" }
];

function esc(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[ch]));
}

function statusOf(book, progress) {
  if (book.prior) return "done";
  return (progress.status && progress.status[book.id]) || "queue";
}

function queued(progress) {
  return SHELF.filter((book) => !book.prior);
}

function nowReading(progress) {
  const reading = queued(progress).find((book) => statusOf(book, progress) === "reading");
  if (reading) return reading;
  return queued(progress).find((book) => statusOf(book, progress) !== "done") || null;
}

function nextUp(progress) {
  const current = nowReading(progress);
  const unread = queued(progress).filter((book) => statusOf(book, progress) !== "done");
  if (!current) return unread[0] || null;
  return unread.find((book) => book.id !== current.id) || null;
}

function finished(progress) {
  return SHELF.filter((book) => statusOf(book, progress) === "done");
}

function upcoming(progress) {
  const current = nowReading(progress);
  return queued(progress).filter((book) => {
    const status = statusOf(book, progress);
    if (status === "done") return false;
    if (current && book.id === current.id) return false;
    return true;
  });
}

function snapshot(progress) {
  const now = nowReading(progress);
  return {
    updated: new Date().toISOString(),
    status: progress.status || {},
    now_reading: now ? { id: now.id, title: now.title, author: now.author } : null
  };
}

function bookRow(book, extra) {
  return (
    '<div class="book-row" data-id="' + esc(book.id) + '">' +
      "<div><em>" + esc(book.title) + "</em><small>" + esc(book.author) + "</small></div>" +
      (extra || "") +
    "</div>"
  );
}

function fillCard(id, book, emptyText) {
  const root = document.getElementById(id);
  if (!book) {
    root.innerHTML = '<div class="label">' + emptyText.label + "</div><h2>" + emptyText.title + "</h2>";
    return;
  }
  root.innerHTML =
    '<div class="label">' + emptyText.label + "</div>" +
    "<h2>" + esc(book.title) + "</h2>" +
    '<div class="by">' + esc(book.author) + "</div>";
}

function renderShelf(progress, owner) {
  const now = nowReading(progress);
  const next = nextUp(progress);

  document.getElementById("dock-line").textContent = now ? now.title : "One book at a time";

  fillCard("now", now, { label: "Now reading", title: "Nothing on the desk." });
  fillCard("next", next, { label: "Next up", title: "The shelf is clear." });

  const read = finished(progress);
  document.getElementById("read-list").innerHTML = read.length
    ? read.map((book) => bookRow(book)).join("")
    : '<div class="book-row"><div><em>None yet.</em></div></div>';

  const rest = document.getElementById("upcoming-list");
  rest.innerHTML = upcoming(progress).map((book) => {
    const actions = owner
      ? '<div class="row-actions">' +
          '<button type="button" data-set="reading">Reading</button>' +
          '<button type="button" data-set="done">Done</button>' +
        "</div>"
      : '<span class="pill">Up next</span>';
    return bookRow(book, actions);
  }).join("");

  if (now && owner) {
    const nowActions =
      '<div class="row-actions" style="margin-top:16px">' +
        '<button type="button" class="on" data-id="' + esc(now.id) + '" data-set="done">Mark done</button>' +
      "</div>";
    document.getElementById("now").insertAdjacentHTML("beforeend", nowActions);
  }
}
