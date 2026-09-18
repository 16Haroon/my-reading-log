/* The shelf itself. Order is how I mean to read them. */

const SITE = {
  githubUser: "16Haroon",
  repo: "my-reading-log",
  branch: "main",
  progressFile: "progress.json"
};

const CATEGORIES = [
  { id: "people", label: "People" },
  { id: "mind", label: "Mind" },
  { id: "work", label: "Work and drive" },
  { id: "lives", label: "Lives" },
  { id: "history", label: "History" },
  { id: "stories", label: "Stories" },
  { id: "poems", label: "Poems and lines" }
];

const SHELF = [
  { id: "unforgettable", title: "Make Yourself Unforgettable", author: "Dale Carnegie", prior: true, category: "people" },
  { id: "stop-worrying", title: "How to Stop Worrying and Start Living", author: "Dale Carnegie", prior: true, category: "people" },
  { id: "science-likability", title: "The Science of Likability", author: "Patrick King", prior: true, category: "people" },
  { id: "body-language", title: "The Dictionary of Body Language", author: "Joe Navarro", prior: true, category: "people" },
  { id: "confident-mind", title: "The Confident Mind", author: "Dr. Nate Zinsser", prior: true, category: "people" },
  { id: "art-ruthless", title: "The Art of Being Ruthless", author: "Michael Sloan", prior: true, category: "people" },
  { id: "seven-habits", title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey", prior: true, category: "people" },

  { id: "subconscious-mind", title: "The Power of Your Subconscious Mind", author: "Joseph Murphy", prior: true, category: "mind" },
  { id: "last-loa", title: "The Last Law of Attraction Book You’ll Ever Need to Read", author: "Andrew Kap", prior: true, category: "mind" },
  { id: "mindset", title: "Mindset: The New Psychology of Success", author: "Carol S. Dweck", prior: true, category: "mind" },
  { id: "subtle-art", title: "The Subtle Art of Not Giving a ****", author: "Mark Manson", prior: true, category: "mind" },
  { id: "thinking-clearly", title: "The Art of Thinking Clearly", author: "Rolf Dobelli", prior: true, category: "mind" },
  { id: "how-to-focus", title: "How to Focus", author: "Thich Nhat Hanh", prior: true, category: "mind" },
  { id: "without-conscience", title: "Without Conscience", author: "Robert D. Hare", prior: true, category: "mind" },
  { id: "think-de-bono", title: "Think! Before It’s Too Late", author: "Edward de Bono", prior: true, category: "mind" },
  { id: "lateral-thinking", title: "Lateral Thinking", author: "Edward de Bono", prior: true, category: "mind" },
  { id: "control-your-mind", title: "Control Your Mind and Master Your Feelings", author: "Eric Robertson", prior: true, category: "mind" },
  { id: "art-letting-go", title: "The Art of Letting Go", author: "Damoon Gavrani", prior: true, category: "mind" },
  { id: "managing-oneself", title: "Managing Oneself", author: "Peter F. Drucker", prior: true, category: "mind" },
  { id: "successful-think", title: "How Successful People Think", author: "John C. Maxwell", prior: true, category: "mind" },
  { id: "mans-search", title: "Man’s Search for Meaning", author: "Viktor E. Frankl", prior: true, category: "mind" },
  { id: "future-you", title: "The Future You", author: "David Johnson", prior: true, category: "mind" },

  { id: "cant-hurt-me", title: "Can’t Hurt Me", author: "David Goggins", prior: true, category: "work" },
  { id: "never-finished", title: "Never Finished", author: "David Goggins", prior: true, category: "work" },
  { id: "discipline-freedom", title: "Discipline Equals Freedom", author: "Jocko Willink", prior: true, category: "work" },
  { id: "do-hard-things", title: "Do Hard Things", author: "Steve Magness", prior: true, category: "work" },
  { id: "mental-toughness", title: "Mental Toughness", author: "Brian J. Leader", prior: true, category: "work" },
  { id: "one-percent-rule", title: "The 1% Rule", author: "Tommy Baker", prior: true, category: "work" },
  { id: "compound-effect", title: "The Compound Effect", author: "Darren Hardy", prior: true, category: "work" },
  { id: "start-with-why", title: "Start with Why", author: "Simon Sinek", prior: true, category: "work" },
  { id: "outliers", title: "Outliers: The Story of Success", author: "Malcolm Gladwell", prior: true, category: "work" },
  { id: "rich-dad", title: "Rich Dad Poor Dad", author: "Robert T. Kiyosaki", prior: true, category: "work" },

  { id: "shoe-dog", title: "Shoe Dog", author: "Phil Knight", prior: true, category: "lives" },
  { id: "grinding-it-out", title: "Grinding It Out", author: "Ray Kroc", prior: true, category: "lives" },
  { id: "greenlights", title: "Greenlights", author: "Matthew McConaughey", prior: true, category: "lives" },
  { id: "tesla-imagination", title: "Nikola Tesla: Imagination and the Man That Invented the 20th Century", author: "Sean Patrick", prior: true, category: "lives" },
  { id: "ice-man", title: "The Ice Man: Confessions of a Mafia Contract Killer", author: "Philip Carlo", prior: true, category: "lives" },
  { id: "glass-castle", title: "The Glass Castle", author: "Jeannette Walls", prior: true, category: "lives" },
  { id: "superhuman", title: "Superhuman: Life at the Extremes of Our Capacity", author: "Rowan Hooper", prior: true, category: "lives" },
  { id: "malcolm-x", title: "The Autobiography of Malcolm X", author: "Malcolm X and Alex Haley", prior: true, category: "lives" },

  { id: "womans-hour", title: "The Woman’s Hour: The Great Fight to Win the Vote", author: "Elaine Weiss", prior: true, category: "history" },

  { id: "pride-prejudice", title: "Pride and Prejudice", author: "Jane Austen", prior: true, category: "stories" },
  { id: "my-antonia", title: "My Ántonia", author: "Willa Cather", prior: true, category: "stories" },
  { id: "forty-rules-love", title: "The Forty Rules of Love", author: "Elif Shafak", prior: true, category: "stories" },
  { id: "nineteen-eighty-four", title: "Nineteen Eighty-Four", author: "George Orwell", prior: true, category: "stories" },
  { id: "kite-runner", title: "The Kite Runner", author: "Khaled Hosseini", prior: true, category: "stories" },
  { id: "great-gatsby", title: "The Great Gatsby", author: "F. Scott Fitzgerald", prior: true, category: "stories" },

  { id: "seagull-poems", title: "The Seagull Book of Poems", author: "edited by Joseph Kelly", prior: true, category: "poems" },
  { id: "dance-first", title: "Dance First. Think Later.", author: "Kathryn Petras and Ross Petras", prior: true, category: "poems" },
  { id: "nothing-worth-more", title: "Nothing Is Worth More Than This Day.", author: "Kathryn Petras and Ross Petras", prior: true, category: "poems" },
  { id: "sing-lifeboats", title: "Don’t Forget to Sing in the Lifeboats", author: "Kathryn Petras and Ross Petras", prior: true, category: "poems" },
  { id: "always-impossible", title: "It Always Seems Impossible Until It’s Done.", author: "Kathryn Petras and Ross Petras", prior: true, category: "poems" },

  { id: "48-laws", title: "The 48 Laws of Power", author: "Robert Greene" },
  { id: "how-to-win-friends", title: "How to Win Friends & Influence People", author: "Dale Carnegie" },
  { id: "rosie-project", title: "The Rosie Project", author: "Graeme Simsion" },
  { id: "beautiful-mind", title: "How to Have a Beautiful Mind", author: "Edward de Bono" },
  { id: "courage-disliked", title: "The Courage to Be Disliked", author: "Ichiro Kishimi and Fumitake Koga" },
  { id: "courage-happy", title: "The Courage to Be Happy", author: "Ichiro Kishimi and Fumitake Koga" },
  { id: "babylon", title: "The Richest Man in Babylon", author: "George S. Clason" },
  { id: "think-grow-rich", title: "Think and Grow Rich", author: "Napoleon Hill" },
  { id: "blue-castle", title: "The Blue Castle", author: "L.M. Montgomery" },
  { id: "the-prince", title: "The Prince", author: "Niccolò Machiavelli" },
  { id: "lessons-history", title: "The Lessons of History", author: "Will Durant and Ariel Durant" },
  { id: "rational-optimist", title: "The Rational Optimist", author: "Matt Ridley" },
  { id: "beginning-infinity", title: "The Beginning of Infinity", author: "David Deutsch" },
  { id: "fooled-randomness", title: "Fooled by Randomness", author: "Nassim Nicholas Taleb" },
  { id: "black-swan", title: "The Black Swan", author: "Nassim Nicholas Taleb" },
  { id: "bed-procrustes", title: "The Bed of Procrustes", author: "Nassim Nicholas Taleb" },
  { id: "antifragile", title: "Antifragile", author: "Nassim Nicholas Taleb" },
  { id: "skin-in-the-game", title: "Skin in the Game", author: "Nassim Nicholas Taleb" },
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

function nextUpList(progress, count) {
  const current = nowReading(progress);
  return queued(progress)
    .filter((book) => {
      const status = statusOf(book, progress);
      if (status === "done" || status === "reading") return false;
      if (current && book.id === current.id) return false;
      return true;
    })
    .slice(0, count);
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

function renderShelf(progress, owner) {
  const now = nowReading(progress);
  const next = nextUpList(progress, 3);

  document.getElementById("dock-line").textContent = now ? now.title : "One book at a time";

  const nowRoot = document.getElementById("now");
  if (!now) {
    nowRoot.innerHTML = '<div class="label">Now reading</div><h2>Nothing on the desk.</h2>';
  } else {
    nowRoot.innerHTML =
      '<div class="label">Now reading</div>' +
      "<h2>" + esc(now.title) + "</h2>" +
      '<div class="by">' + esc(now.author) + "</div>";
  }

  const nextRoot = document.getElementById("next");
  if (!next.length) {
    nextRoot.innerHTML = '<div class="label">Next</div><h2>The shelf is clear.</h2>';
  } else {
    nextRoot.innerHTML =
      '<div class="label">Next</div>' +
      next.map((book) => bookRow(book)).join("");
  }

  const read = finished(progress);
  document.getElementById("read-list").innerHTML = CATEGORIES.map((cat) => {
    const books = read.filter((book) => book.category === cat.id);
    if (!books.length) return "";
    return (
      '<details class="cat">' +
        "<summary>" + esc(cat.label) + "<span>" + books.length + "</span></summary>" +
        books.map((book) => bookRow(book)).join("") +
      "</details>"
    );
  }).join("");

  const rest = document.getElementById("upcoming-list");
  rest.innerHTML = upcoming(progress).map((book) => {
    const actions = owner
      ? '<div class="row-actions">' +
          '<button type="button" data-set="reading">Reading</button>' +
          '<button type="button" data-set="done">Done</button>' +
        "</div>"
      : "";
    return bookRow(book, actions);
  }).join("");

  if (now && owner) {
    document.getElementById("now").insertAdjacentHTML(
      "beforeend",
      '<div class="row-actions" style="margin-top:12px">' +
        '<button type="button" class="on" data-id="' + esc(now.id) + '" data-set="done">Mark done</button>' +
      "</div>"
    );
  }
}
