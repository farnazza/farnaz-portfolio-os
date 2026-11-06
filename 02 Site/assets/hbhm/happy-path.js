// Her Body, Her Mind happy path: pick the workshop, reserve, sign up, see the confirmation.
// Nothing is sent or stored. Finishing a step softly lights up the next panel (and scrolls to it on phones).
(() => {
  const root = document.getElementById("hbhm-hp");
  if (!root) return;
  const $ = (s, el = root) => el.querySelector(s);
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  const narrow = matchMedia("(max-width: 720px)");
  const cells = [...root.querySelectorAll(".hp-cell")];
  const status = $("[data-hp-status]");
  const NAMES = ["Find a workshop", "Check it fits", "Reserve your place", "Know what happens next"];

  // Cells fade and lift in as they come into view
  if ("IntersectionObserver" in window && !still.matches) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.style.transitionDelay = `${(cells.indexOf(e.target) % 2) * 100}ms`;
      e.target.classList.add("is-in");
      io.unobserve(e.target);
    }), { threshold: 0.15 });
    cells.forEach((c) => io.observe(c));
  } else cells.forEach((c) => c.classList.add("is-in"));

  // Move the story on: mark this step done, light up the next one, announce it
  const goTo = (n) => {
    cells.forEach((c, i) => {
      c.classList.toggle("is-done", i < n - 1);
      c.classList.toggle("is-next", i === n - 1);
    });
    status.textContent = `Step ${n} of 4: ${NAMES[n - 1]}.`;
    const cell = cells[n - 1];
    if (narrow.matches) cell.scrollIntoView({ behavior: still.matches ? "auto" : "smooth", block: "start" });
    return cell;
  };

  // 1 · Pick the workshop: panel 1 opens its event detail in place (as in the prototype); "All workshops" goes back
  const pick = $("[data-hp-pick]");
  const list = $("[data-hp-list]"), detail = $("[data-hp-detail]");
  const panel1 = $(".hp-panel", cells[0]);
  const swap = (from, to, focusEl) => {
    from.hidden = true;
    to.hidden = false;
    panel1.scrollTop = 0;
    to.classList.add("is-entering");
    requestAnimationFrame(() => requestAnimationFrame(() => to.classList.remove("is-entering")));
    focusEl.focus({ preventScroll: true });
  };
  pick.addEventListener("click", () => {
    swap(list, detail, $("[data-hp-detail-title]"));
    goTo(2);
  });
  $("[data-hp-back]").addEventListener("click", () => swap(detail, list, pick));

  // 2 · Reserve your place (from the detail in panel 1 or in panel 2)
  root.querySelectorAll("[data-hp-reserve]").forEach((b) => b.addEventListener("click", () => {
    goTo(3);
    setTimeout(() => $("#hp-fn").focus({ preventScroll: !narrow.matches }), narrow.matches && !still.matches ? 500 : 0);
  }));

  // 3 · Sign up: design system errors, shown only after a first try, cleared as she types
  const form = $("[data-hp-form]");
  const fn = $("#hp-fn"), em = $("#hp-em"), fnErr = $("#hp-fn-err"), emHint = $("#hp-em-hint");
  const optin = $("[data-hp-optin]"), optHelp = $("#hp-opt-help");
  const HINT = emHint.textContent;
  const OPT = [optHelp.textContent, "We’ll ask you to confirm by email first. Your booking works either way."];
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  let tried = false;
  const check = () => {
    const nameMsg = fn.value.trim() ? "" : "Enter your first name so we know what to call you.";
    const v = em.value.trim();
    const mailMsg = !v ? "Enter your email so we can send you the details." : EMAIL.test(v) ? "" : "This email looks incomplete. Check it has an @ and a part like .com.";
    fnErr.textContent = nameMsg; fnErr.hidden = !nameMsg;
    fn.parentElement.classList.toggle("is-error", !!nameMsg);
    if (nameMsg) fn.setAttribute("aria-invalid", "true"); else fn.removeAttribute("aria-invalid");
    emHint.textContent = mailMsg || HINT;
    emHint.classList.toggle("is-error", !!mailMsg);
    em.parentElement.classList.toggle("is-error", !!mailMsg);
    if (mailMsg) em.setAttribute("aria-invalid", "true"); else em.removeAttribute("aria-invalid");
    return !nameMsg && !mailMsg;
  };
  [fn, em].forEach((i) => i.addEventListener("input", () => { if (tried) check(); }));
  optin.addEventListener("change", () => { optHelp.textContent = OPT[+optin.checked]; });

  // 4 · You're signed up: her name and her choice carry over
  const doneTitle = $("[data-hp-done-title]");
  const optNote = $("[data-hp-optin-note]");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    tried = true;
    if (!check()) { (fn.getAttribute("aria-invalid") ? fn : em).focus(); return; }
    doneTitle.textContent = `You’re signed up, ${fn.value.trim()}`;
    optNote.hidden = !optin.checked;
    const cell = goTo(4);
    cells[3].classList.add("is-done");
    $(".hp-panel", cell).scrollTop = 0;
    setTimeout(() => doneTitle.focus({ preventScroll: !narrow.matches }), narrow.matches && !still.matches ? 500 : 0);
  });

  // Restart: everything back to the start
  $("[data-hp-restart]").addEventListener("click", () => {
    form.reset(); tried = false;
    fnErr.hidden = true; fn.parentElement.classList.remove("is-error"); fn.removeAttribute("aria-invalid");
    emHint.textContent = HINT; emHint.classList.remove("is-error"); em.parentElement.classList.remove("is-error"); em.removeAttribute("aria-invalid");
    optHelp.textContent = OPT[0];
    doneTitle.textContent = "You’re signed up";
    optNote.hidden = true;
    detail.hidden = true; list.hidden = false;
    cells.forEach((c) => { c.classList.remove("is-next", "is-done"); $(".hp-panel", c).scrollTop = 0; });
    status.textContent = "Restarted. Step 1 of 4: Find a workshop.";
    if (narrow.matches) cells[0].scrollIntoView({ behavior: still.matches ? "auto" : "smooth", block: "start" });
    pick.focus({ preventScroll: !narrow.matches });
  });
})();

// Hero panel: the first workshop card opens its event detail in place, as in the prototype; "All workshops" goes back.
// "Reserve your place" there moves on to the sign-up panel of the happy path further down.
(() => {
  const hero = document.getElementById("hbhm-hero");
  if (!hero) return;
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  const panel = hero.querySelector(".hp-panel");
  const list = hero.querySelector("[data-hero-list]"), detail = hero.querySelector("[data-hero-detail]");
  const pick = hero.querySelector("[data-hero-pick]");
  const swap = (from, to, focusEl) => {
    from.hidden = true;
    to.hidden = false;
    panel.scrollTop = 0;
    to.classList.add("is-entering");
    requestAnimationFrame(() => requestAnimationFrame(() => to.classList.remove("is-entering")));
    focusEl.focus({ preventScroll: true });
  };
  pick.addEventListener("click", () => swap(list, detail, hero.querySelector("[data-hero-detail-title]")));
  hero.querySelector("[data-hero-back]").addEventListener("click", () => swap(detail, list, pick));
  hero.querySelector("[data-hero-reserve]").addEventListener("click", () => {
    const signup = document.querySelector('#hbhm-hp [data-hp-step="3"]');
    if (!signup) return;
    signup.scrollIntoView({ behavior: still.matches ? "auto" : "smooth", block: "center" });
    setTimeout(() => document.getElementById("hp-fn").focus({ preventScroll: true }), still.matches ? 0 : 600);
  });
})();
