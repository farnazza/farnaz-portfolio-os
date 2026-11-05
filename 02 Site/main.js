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

// Motion cards: still frame until hovered or scrolling; never plays with reduced motion
const cardVideos = document.querySelectorAll(".card__video");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (cardVideos.length) {
  const inView = new Set();
  const hovered = new Set();
  let scrollTimer = 0;
  const play = (v) => { if (!reduceMotion.matches) v.play().catch(() => {}); };
  const pause = (v) => { if (!hovered.has(v)) v.pause(); };

  cardVideos.forEach((v) => {
    const card = v.closest(".card");
    card.addEventListener("mouseenter", () => { hovered.add(v); play(v); });
    card.addEventListener("mouseleave", () => { hovered.delete(v); v.pause(); });
    card.addEventListener("focus", () => { hovered.add(v); play(v); });
    card.addEventListener("blur", () => { hovered.delete(v); v.pause(); });
  });

  if ("IntersectionObserver" in window) {
    const watch = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) inView.add(e.target);
        else { inView.delete(e.target); pause(e.target); }
      });
    });
    cardVideos.forEach((v) => watch.observe(v));
  }

  window.addEventListener("scroll", () => {
    inView.forEach(play);
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => inView.forEach(pause), 600);
  }, { passive: true });

  reduceMotion.addEventListener?.("change", () => {
    if (reduceMotion.matches) cardVideos.forEach((v) => v.pause());
  });
}

// Case study cover: plays while in view; never plays with reduced motion
const coverVideo = document.querySelector(".cs__video");
if (coverVideo && "IntersectionObserver" in window) {
  new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !reduceMotion.matches) coverVideo.play().catch(() => {});
      else coverVideo.pause();
    });
  }).observe(coverVideo);
  reduceMotion.addEventListener?.("change", () => {
    if (reduceMotion.matches) coverVideo.pause();
  });
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

// Process timeline: steps slide in, numbers count up, the line fills with scroll
const steps = document.querySelectorAll(".step");
const stepList = document.querySelector(".steps");
if (steps.length && "IntersectionObserver" in window) {
  const countUp = (el) => {
    const end = Number(el.dataset.count);
    if (reduceMotion.matches || !end) return;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / 900, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const seen = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-seen");
      e.target.querySelectorAll("[data-count]").forEach(countUp);
      seen.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px -15% 0px" });
  steps.forEach((s) => seen.observe(s));

  const fill = () => {
    const r = stepList.getBoundingClientRect();
    const mid = window.innerHeight / 2;
    const p = Math.min(Math.max((mid - r.top) / r.height, 0), 1);
    stepList.style.setProperty("--fill", p.toFixed(3));
    steps.forEach((s) => s.classList.toggle("is-on", s.getBoundingClientRect().top < mid));
  };
  window.addEventListener("scroll", fill, { passive: true });
  window.addEventListener("resize", fill);
  fill();
}
