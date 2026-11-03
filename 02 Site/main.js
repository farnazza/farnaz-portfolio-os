// Set these once and every page picks them up.
const EMAIL = "";               // ⚠️ your email address, e.g. "name@example.com"
const RESUME = "";              // ⚠️ path to your resume PDF, e.g. "assets/resume.pdf"

document.documentElement.classList.add("js");

// Email and resume links
const missing = [];
document.querySelectorAll("[data-email]").forEach((a) => {
  if (!EMAIL) return missing.push("email");
  const subject = a.dataset.subject ? `?subject=${encodeURIComponent(a.dataset.subject)}` : "";
  a.href = `mailto:${EMAIL}${subject}`;
});
document.querySelectorAll("[data-resume]").forEach((a) => {
  if (!RESUME) return missing.push("resume");
  a.href = RESUME;
});
const note = document.querySelector("[data-config-note]");
if (note && missing.length) {
  note.textContent = `⚠️ Not set yet in main.js: ${[...new Set(missing)].join(" and ")}.`;
  note.hidden = false;
}

// Scroll reveal: cards slide in vertically as they enter the screen
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: "0px 0px -10% 0px" });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-in"));
}

// Case study: highlight the section in view
const tocLinks = document.querySelectorAll(".cs__toc a");
if (tocLinks.length && "IntersectionObserver" in window) {
  const byId = new Map([...tocLinks].map((a) => [a.hash.slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      tocLinks.forEach((a) => a.classList.remove("is-active"));
      byId.get(e.target.id)?.classList.add("is-active");
    });
  }, { rootMargin: "-20% 0px -70% 0px" });
  byId.forEach((_, id) => {
    const el = document.getElementById(id);
    if (el) spy.observe(el);
  });
}
