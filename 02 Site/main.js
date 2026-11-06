// Set these once and every page picks them up.
const EMAIL = "farnaz.za@icloud.com"; // shown in the contact form's error message
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
const stepLists = document.querySelectorAll(".steps");
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
    // The timeline is split into several lists between sections; each line fills on its own
    const mid = window.innerHeight / 2;
    stepLists.forEach((list) => {
      const r = list.getBoundingClientRect();
      const p = Math.min(Math.max((mid - r.top) / r.height, 0), 1);
      list.style.setProperty("--fill", p.toFixed(3));
    });
    steps.forEach((s) => s.classList.toggle("is-on", s.getBoundingClientRect().top < mid));
  };
  window.addEventListener("scroll", fill, { passive: true });
  window.addEventListener("resize", fill);
  fill();
}

// Hero card stack: the front card slides away and goes to the back every 3 s.
// Pauses on hover and keyboard focus; never moves with reduced motion.
const hstack = document.querySelector(".hstack");
if (hstack) {
  const cards = [...hstack.querySelectorAll(".hstack__card")];
  let order = cards.map((_, i) => i);
  let paused = false;
  const lay = () => order.forEach((k, i) => {
    const c = cards[k];
    c.style.zIndex = cards.length - i;
    c.style.opacity = i > 3 ? 0 : 1;
    c.style.pointerEvents = "";
    // Each card behind sits 25% of the card width further right, so part of its image shows
    const step = hstack.offsetWidth * 0.25;
    c.style.transform = `translateX(${i * step}px) scale(${1 - i * 0.07})`;
  });
  // Caption under the stack: tag, title and short description of the front card; arrows move through the projects (founder, 6 Nov 2026)
  const cap = hstack.querySelector(".hcap");
  const showCap = () => {
    const c = cards[order[0]];
    cap.classList.add("is-fading");
    setTimeout(() => {
      cap.querySelector(".hcap__tag").textContent = c.dataset.tag;
      cap.querySelector(".hcap__title").textContent = c.dataset.title;
      cap.querySelector(".hcap__problem").textContent = c.dataset.problem;
      cap.querySelector("[data-count]").textContent = `${order[0] + 1} / ${cards.length}`;
      cap.classList.remove("is-fading");
    }, reduceMotion.matches ? 0 : 200);
  };
  lay();
  showCap();
  window.addEventListener("resize", lay);
  const go = (d) => { if (d > 0) order.push(order.shift()); else order.unshift(order.pop()); lay(); showCap(); };
  cap.querySelector("[data-next]").addEventListener("click", () => go(1));
  cap.querySelector("[data-prev]").addEventListener("click", () => go(-1));
  // Hover or focus a card: it comes to the front and opens to the full stack width
  const open = (k) => {
    paused = true;
    order = [...order.slice(order.indexOf(k)), ...order.slice(0, order.indexOf(k))];
    lay(); showCap();
    cards.forEach((c, i) => c.classList.toggle("is-open", i === k));
    cards.forEach((c, i) => { if (i !== k) { c.style.opacity = 0; c.style.pointerEvents = "none"; } });
  };
  const close = () => {
    paused = false;
    cards.forEach((c) => c.classList.remove("is-open"));
    lay();
  };
  if (window.matchMedia("(hover: hover)").matches) {
    cards.forEach((c, k) => c.addEventListener("mouseenter", () => open(k)));
    hstack.addEventListener("mouseleave", close);
  }
  hstack.addEventListener("focusin", (e) => { const k = cards.indexOf(e.target); if (k > -1) open(k); });
  hstack.addEventListener("focusout", (e) => { if (!hstack.contains(e.relatedTarget)) close(); });
}

// Story cards: "Read more" opens the rest of the card in place
document.querySelectorAll(".story-card__toggle").forEach((b) => {
  b.addEventListener("click", () => {
    const card = b.closest(".story-card");
    const open = card.classList.toggle("is-open");
    b.setAttribute("aria-expanded", open);
    b.textContent = open ? "Read less" : "Read more";
  });
});

// About me string: a winding line with one loop, drawn as you scroll; when the line reaches a dot, that entry and its details fade in and stay.
// Desktop labels alternate left and right; on phones the line is a gentle vertical path with labels on one side.
const track = document.querySelector(".tl__track");
if (track) {
  const svg = track.querySelector(".tl__line");
  const [line, probe] = svg.querySelectorAll("path");
  const items = [...track.querySelectorAll(".tl__item")];
  const narrow = window.matchMedia("(max-width: 720px)");
  // Logos load after layout; re-measure once they have their size
  track.querySelectorAll("img").forEach((img) => img.addEventListener("load", () => build()));
  let len = 0;
  let marks = [];
  const build = () => {
    const W = track.clientWidth;
    const phone = narrow.matches;
    let pts, H;
    // Phones: entries flow one under another, details included; the line follows the dots
    track.classList.toggle("is-flow", phone);
    if (phone) {
      track.style.height = "";
      items.forEach((it) => { it.classList.remove("tl__item--left"); it.style.top = it.style.left = it.style.right = ""; });
      const tr = track.getBoundingClientRect();
      pts = items.map((it) => {
        const r = it.querySelector(".tl__dot").getBoundingClientRect();
        return [r.left + r.width / 2 - tr.left, r.top + r.height / 2 - tr.top];
      });
      H = track.offsetHeight;
    } else {
      const gap = 250;
      const top = 300;
      pts = items.map((_, i) => [W * (i % 2 ? 0.64 : 0.36), top + i * gap]);
      H = top + (items.length - 1) * gap + 160;
      track.style.height = `${H}px`;
    }
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    let d;
    if (phone) {
      d = `M ${pts[0][0]} 0 L ${pts[0][0]} ${pts[0][1]}`;
    } else {
      // In from the top, one loop, then down to the first dot
      const qx = W * 0.5, qy = 170;
      d = `M ${W * 0.6} 0 C ${W * 0.58} 70 ${qx + 30} 120 ${qx} ${qy} a 60 60 0 0 0 -120 0 a 60 60 0 0 0 120 0 C ${qx - 30} ${qy + 60} ${pts[0][0] + 80} ${pts[0][1] - 80} ${pts[0][0]} ${pts[0][1]}`;
    }
    const parts = [d];
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1];
      const [x1, y1] = pts[i];
      const g = y1 - y0;
      d += phone
        ? ` C ${x0 + (i % 2 ? 12 : -8)} ${y0 + g * 0.5} ${x1 + (i % 2 ? -8 : 12)} ${y1 - g * 0.5} ${x1} ${y1}`
        : ` C ${x0} ${y0 + g * 0.6} ${x1} ${y1 - g * 0.6} ${x1} ${y1}`;
      parts.push(d);
    }
    const [lx, ly] = pts[pts.length - 1];
    d += phone ? ` L ${lx} ${H}` : ` C ${lx} ${ly + 80} ${W * 0.5} ${H - 60} ${W * 0.5} ${H}`;
    line.setAttribute("d", d);
    len = line.getTotalLength();
    marks = parts.map((p) => { probe.setAttribute("d", p); return probe.getTotalLength(); });
    line.style.strokeDasharray = len;
    if (!phone) items.forEach((it, i) => {
      const [x, y] = pts[i];
      const left = i % 2 === 0;
      it.classList.toggle("tl__item--left", left);
      it.style.top = `${y - 23}px`;
      it.style.left = left ? "auto" : `${x - 15}px`;
      it.style.right = left ? `${W - x - 15}px` : "auto";
    });
    draw();
  };
  const draw = () => {
    if (reduceMotion.matches) {
      line.style.strokeDashoffset = 0;
      items.forEach((it) => it.classList.add("is-in"));
      return;
    }
    const r = track.getBoundingClientRect();
    // At the bottom of the page the line finishes, so the last entry always appears
    const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    const p = atEnd ? 1 : Math.min(Math.max((window.innerHeight * 0.75 - r.top) / r.height, 0), 1);
    const drawn = len * p;
    line.style.strokeDashoffset = len - drawn;
    items.forEach((it, i) => { if (marks[i] <= drawn + 1) it.classList.add("is-in"); });
  };
  build();
  window.addEventListener("resize", build);
  window.addEventListener("scroll", draw, { passive: true });

}

// Contact form (founder, 6 Nov 2026): checks fields on blur and on submit, sends to Formspree with fetch so the
// visitor stays on the page. Without JavaScript the form posts normally. The Formspree ID is in the form's action.
document.querySelectorAll("[data-cform]").forEach((form) => {
  form.noValidate = true;
  const done = form.nextElementSibling;
  const send = form.querySelector(".cform__send");
  const sendLabel = send.querySelector(".cta__label");
  const fail = form.querySelector(".cform__fail");
  const fields = [...form.querySelectorAll("input[required], textarea[required]")];
  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  const MSG = {
    name: "Please add your name.",
    email: "Please add your email, so I can reply.",
    emailBad: "This email looks incomplete. Check it has an @ and an ending like .com.",
    message: "Please write a short message.",
  };
  const errorFor = (f) => {
    const v = f.value.trim();
    if (!v) return MSG[f.name];
    if (f.name === "email" && !isEmail(v)) return MSG.emailBad;
    return "";
  };
  const check = (f) => {
    const msg = errorFor(f);
    const err = document.getElementById(f.getAttribute("aria-describedby"));
    err.textContent = msg;
    err.hidden = !msg;
    f.classList.toggle("is-error", !!msg);
    if (msg) f.setAttribute("aria-invalid", "true"); else f.removeAttribute("aria-invalid");
    return !msg;
  };
  fields.forEach((f) => {
    f.addEventListener("blur", () => { if (f.value.trim() || f.classList.contains("is-error")) check(f); });
    f.addEventListener("input", () => {
      f.classList.toggle("is-filled", !!f.value.trim());
      if (f.classList.contains("is-error")) check(f);
    });
  });

  // A case study request link can pass its own subject, e.g. contact.html?subject=Full case study request: …
  const subject = new URLSearchParams(location.search).get("subject");
  if (subject) form.querySelector('[name="_subject"]').value = subject.slice(0, 120);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const bad = fields.filter((f) => !check(f));
    if (bad.length) { bad[0].focus(); return; }
    fail.hidden = true;
    send.disabled = true;
    sendLabel.textContent = "Sending…";
    try {
      const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(res.status);
      form.classList.add("is-leaving");
      setTimeout(() => {
        form.hidden = true;
        done.hidden = false;
        done.focus({ preventScroll: true });
      }, reduceMotion.matches ? 0 : 300);
    } catch {
      fail.innerHTML = "";
      const mail = EMAIL ? Object.assign(document.createElement("a"), { href: `mailto:${EMAIL}`, textContent: EMAIL }) : document.createTextNode("⚠️ [MY EMAIL]");
      const text = document.createElement("span");
      text.append("Something went wrong. Please try again, or email me directly at ", mail, ".");
      fail.append(text);
      fail.hidden = false;
      send.disabled = false;
      sendLabel.textContent = "Send message";
    }
  });
});

// The insight card fades and lifts in once, the first time it scrolls into view
const insight = document.querySelector(".insight");
if (insight) {
  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { insight.classList.add("is-in"); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(insight);
  } else insight.classList.add("is-in");
}

