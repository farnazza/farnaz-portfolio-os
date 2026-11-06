// Her Body, Her Mind bento: each tile's interaction. Copy and states come from the design system export.
(() => {
  const root = document.getElementById("hbhm-ds");
  if (!root) return;
  const $ = (s, el = root) => el.querySelector(s);
  const $$ = (s, el = root) => [...el.querySelectorAll(s)];
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  const SLOW = 600;
  const later = (fn, ms) => (still.matches ? fn() : setTimeout(fn, ms));
  const show = (el, on) => el.classList.toggle("is-off", !on);

  // Tiles fade up as they come into view
  const tiles = $$(".hb-tile");
  if ("IntersectionObserver" in window && !still.matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.style.transitionDelay = `${(tiles.indexOf(e.target) % 4) * 80}ms`;
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      });
    }, { threshold: 0.15 });
    tiles.forEach((t) => io.observe(t));
  } else tiles.forEach((t) => t.classList.add("is-in"));

  // 1 · Logo layers
  const logo = $(".hb-logo");
  logo.addEventListener("click", () => {
    const on = logo.getAttribute("aria-pressed") !== "true";
    logo.setAttribute("aria-pressed", on);
    logo.setAttribute("aria-label", on ? "Logo construction: put the layers back" : "Logo construction: lift the layers apart");
  });

  // 2 · Typography: cycle each font's weights
  const styles = [
    ["heading", 400, "normal", "Fraunces Regular · Headings"],
    ["heading", 400, "italic", "Fraunces Italic · Emotional lines"],
    ["heading", 600, "normal", "Fraunces SemiBold · Headings"],
    ["body", 400, "normal", "Inter Regular · Body and interface"],
    ["body", 500, "normal", "Inter Medium · Labels and emphasis"],
    ["body", 600, "normal", "Inter SemiBold · Subheadings"],
  ];
  let ti = 0;
  const spec = $(".hb-type__specimen"), tname = $(".hb-type__name");
  $(".hb-type").addEventListener("click", () => {
    ti = (ti + 1) % styles.length;
    const [fam, w, st, name] = styles[ti];
    spec.classList.add("is-swap");
    later(() => {
      Object.assign(spec.style, { fontFamily: `var(--font-${fam})`, fontWeight: w, fontStyle: st });
      tname.textContent = name;
      spec.classList.remove("is-swap");
    }, 300);
  });

  // 3 · Palette: details, contrast against the current page background, copy the hex
  const lum = (hex) => {
    const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  const pageBg = () => (root.dataset.theme === "dark" ? "#1E1B16" : "#FFF8F1");
  const swatches = $$(".hb-swatch");
  const info = $(".hb-pal__info");
  const fillPal = (sw) => {
    $(".hb-pal__name", info).textContent = sw.dataset.name;
    $(".hb-pal__hex", info).textContent = sw.dataset.hex;
    $(".hb-pal__token", info).textContent = sw.dataset.token;
    $(".hb-pal__role", info).textContent = sw.dataset.role;
    $(".hb-pal__ratio strong", info).textContent = `${ratio(sw.dataset.hex, pageBg()).toFixed(1)}:1`;
    $(".hb-pal__ratio span", info).textContent = `on the ${root.dataset.theme === "dark" ? "dark" : "light"} page background (${pageBg()})`;
  };
  fillPal(swatches[0]);
  swatches.forEach((sw) => sw.addEventListener("click", () => {
    swatches.forEach((s) => s.setAttribute("aria-pressed", s === sw));
    fillPal(sw);
    const done = $(".hb-pal__copied", info);
    if (navigator.clipboard) navigator.clipboard.writeText(sw.dataset.hex).then(() => { done.textContent = `${sw.dataset.hex} copied`; }, () => { done.textContent = ""; });
  }));

  // 4 · Brand personality
  const traits = $$(".hb-trait");
  let pi = 0;
  const goTrait = (d) => {
    show(traits[pi], false);
    pi = (pi + d + traits.length) % traits.length;
    show(traits[pi], true);
    $(".hb-pager__count").textContent = `${pi + 1} of ${traits.length}`;
  };
  $(".hb-pager__prev").addEventListener("click", () => goTrait(-1));
  $(".hb-pager__next").addEventListener("click", () => goTrait(1));

  // 5 · Voice and tone
  $$(".hb-say").forEach((b) => b.addEventListener("click", () => {
    const on = b.getAttribute("aria-pressed") !== "true";
    b.setAttribute("aria-pressed", on);
    show($(".hb-say__instead", b), !on);
    show($(".hb-say__say", b), on);
  }));

  // 6 · Tags
  $$(".hb-tile--tags .hb-tag").forEach((t) => t.addEventListener("click", () => {
    const on = t.getAttribute("aria-pressed") !== "true";
    t.setAttribute("aria-pressed", on);
    t.classList.toggle("is-selected", on);
  }));

  // 7 · Event card states (design system export)
  const icons = Object.fromEntries([...$("#hb-ev-icons").content.children].map((s) => [s.dataset.k, s.innerHTML]));
  const EV = {
    open: { badge: "highlight", label: "2 places left", icon: "check", when: "Thu 27 Nov, 6:00 PM · Werkraum Mitte", extra: "From €10, paid on the day" },
    full: { badge: "brand", label: "Full", when: "Thu 27 Nov, 6:00 PM · Werkraum Mitte", extra: "This one is full. New dates go out on Telegram first.",
      notice: ["brand", "This one is full", "New dates go out on Telegram first."] },
    moved: { badge: "info", label: "Moved", when: '<s class="hb-event__old"><span class="hb-sr">Was </span>Thu 20 Nov</s> <span class="hb-sr">Now </span>Thu 27 Nov, 6:00 PM · Werkraum Mitte', extra: "From €10, paid on the day",
      notice: ["info", "This workshop has a new date", "It has moved to Thursday 27 November, same time and place."] },
    cancelled: { badge: "error", label: "Cancelled", when: "Thu 27 Nov, 6:00 PM · Werkraum Mitte", extra: "From €10, paid on the day", cancelled: true,
      notice: ["error", "This workshop is cancelled", "Everyone who signed up gets an email."] },
  };
  const card = $(".hb-eventp"), notice = $(".hb-ev__notice");
  const noticeIcon = { brand: "full", info: "moved", error: "cancelled" };
  $$('input[name="hb-ev"]').forEach((r) => r.addEventListener("change", () => {
    const s = EV[r.value];
    const badge = $(".hb-badge", card);
    badge.className = `hb-badge hb-badge--${s.badge}`;
    badge.innerHTML = `${s.icon ? icons[s.icon] : ""}<span>${s.label}</span>`;
    $(".hb-ev__when", card).innerHTML = s.when;
    $(".hb-ev__extra", card).textContent = s.extra;
    $(".hb-card__title", card).classList.toggle("is-cancelled", !!s.cancelled);
    notice.classList.add("is-swap");
    later(() => {
      notice.hidden = !s.notice;
      if (s.notice) {
        const [kind, title, body] = s.notice;
        notice.className = `hb-notice hb-ev__notice hb-notice--${kind} is-swap`;
        $(".hb-notice__icon", notice).innerHTML = icons[noticeIcon[kind]];
        $(".hb-notice__title", notice).textContent = title;
        $(".hb-notice__body", notice).textContent = body;
        requestAnimationFrame(() => requestAnimationFrame(() => notice.classList.remove("is-swap")));
      }
    }, notice.hidden ? 0 : 300);
  }));

  // 8 + 9 · Sign-up form, then "You're signed up". No backend: a valid form always succeeds.
  const form = $(".hb-form"), done = $(".hb-done");
  const fn = $("#hb-fn"), em = $("#hb-em"), fnErr = $("#hb-fn-err"), emHint = $("#hb-em-hint");
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const HINT = emHint.textContent;
  let tried = false;
  const check = () => {
    const nameMsg = fn.value.trim() ? "" : "Enter your first name so we know what to call you.";
    const v = em.value.trim();
    const mailMsg = !v ? "Enter your email so we can send you the details." : EMAIL.test(v) ? "" : "This email looks incomplete. Check it has an @ and a part like .com.";
    fnErr.textContent = nameMsg; fnErr.hidden = !nameMsg;
    fn.parentElement.classList.toggle("is-error", !!nameMsg);
    fn.setAttribute("aria-invalid", !!nameMsg);
    emHint.textContent = mailMsg || HINT;
    emHint.classList.toggle("is-error", !!mailMsg);
    em.parentElement.classList.toggle("is-error", !!mailMsg);
    em.setAttribute("aria-invalid", !!mailMsg);
    return !nameMsg && !mailMsg;
  };
  [fn, em].forEach((i) => i.addEventListener("input", () => { if (tried) check(); }));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    tried = true;
    if (!check()) { (fn.getAttribute("aria-invalid") === "true" ? fn : em).focus(); return; }
    show(form, false);
    later(() => { show(done, true); $("h3", done).focus({ preventScroll: true }); }, SLOW / 2);
  });
  $(".hb-again").addEventListener("click", () => {
    form.reset(); tried = false;
    [fn, em].forEach((i) => { i.parentElement.classList.remove("is-error"); i.removeAttribute("aria-invalid"); });
    fnErr.hidden = true; emHint.textContent = HINT; emHint.classList.remove("is-error");
    show(done, false);
    later(() => { show(form, true); fn.focus({ preventScroll: true }); }, SLOW / 2);
  });

  // 10 · List item: one selected row
  const rows = $$(".hb-listbox .hb-list");
  rows.forEach((r) => r.addEventListener("click", () => rows.forEach((x) => x.setAttribute("aria-pressed", x === r && r.getAttribute("aria-pressed") !== "true"))));

  // 11 · Dark mode for the whole bento
  $$('input[name="hb-theme"]').forEach((r) => r.addEventListener("change", () => {
    root.dataset.theme = r.value;
    fillPal($('.hb-swatch[aria-pressed="true"]'));
  }));
})();
