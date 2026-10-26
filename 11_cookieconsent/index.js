// ===================================================
// ARCADE COOKIE CONSENT — Pac-Man Edition
// ===================================================

const cookieBanner = document.getElementById("cookie-banner");
const stage = document.getElementById("stage");
const pacman = document.getElementById("pacman");
const ghost = document.getElementById("ghost");
const dotsRow = document.getElementById("dotsRow");
const scoreEl = document.getElementById("score");
const acceptBtn = document.getElementById("cookie-accept");
const declineBtn = document.getElementById("cookie-decline");
const toggleSettingsBtn = document.getElementById("toggle-settings");
const prefsPanel = document.getElementById("prefs-panel");
const savePrefsBtn = document.getElementById("save-prefs");
const prefInputs = Array.from(prefsPanel.querySelectorAll("input[type=checkbox]"));

const CATEGORY_KEYS = ["necessary", "functional", "analytics", "marketing"];

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let score = 0;

function setScore(value) {
  score = value;
  scoreEl.textContent = String(score).padStart(3, "0");
}

function spawnBubble(text, x, isNope) {
  const bubble = document.createElement("span");
  bubble.className = isNope ? "waka nope" : "waka";
  bubble.textContent = text;
  bubble.style.left = `${x}px`;
  bubble.style.top = "0px";
  stage.appendChild(bubble);
  setTimeout(() => bubble.remove(), 650);
}

function disableAllControls(disabled) {
  acceptBtn.disabled = disabled;
  declineBtn.disabled = disabled;
  savePrefsBtn.disabled = disabled;
  toggleSettingsBtn.disabled = disabled;
}

function finishConsent(consent) {
  localStorage.setItem("cookieConsent", JSON.stringify(consent));
  cookieBanner.classList.add("closing");
  setTimeout(() => {
    cookieBanner.classList.add("hidden");
  }, 500);
}

/**
 * Laat Pac-Man langs elk koekje lopen. Categorieën in `enabledKeys`
 * worden opgegeten (score + WAKA), de rest wordt overgeslagen (grijs + NOPE).
 */
async function runCookieRun(enabledKeys) {
  disableAllControls(true);

  const dots = Array.from(dotsRow.querySelectorAll(".cookie-dot"));

  if (prefersReducedMotion) {
    dots.forEach((dot) => {
      const key = dot.dataset.key;
      dot.classList.add(enabledKeys.has(key) ? "eaten" : "skipped");
    });
    setScore(dots.filter((d) => enabledKeys.has(d.dataset.key)).length);
    return;
  }

  pacman.classList.add("chomping");

  for (const dot of dots) {
    const key = dot.dataset.key;
    const stageRect = stage.getBoundingClientRect();
    const dotRect = dot.getBoundingClientRect();
    const targetLeft =
      dotRect.left - stageRect.left + dotRect.width / 2 - pacman.offsetWidth / 2;

    pacman.style.left = `${targetLeft}px`;
    await sleep(400);

    if (enabledKeys.has(key)) {
      dot.classList.add("eaten");
      setScore(score + 1);
      spawnBubble("WAKA!", targetLeft, false);
    } else {
      dot.classList.add("skipped");
      spawnBubble("NOPE", targetLeft, true);
    }
    await sleep(150);
  }

  pacman.classList.remove("chomping");
  stage.classList.add("cleared");
  await sleep(400);
}

function readPreferences() {
  const enabled = new Set(["necessary"]);
  prefInputs.forEach((input) => {
    if (input.checked) enabled.add(input.dataset.key);
  });
  return enabled;
}

function enabledSetToConsent(enabledKeys) {
  const consent = { timestamp: new Date().toISOString() };
  CATEGORY_KEYS.forEach((key) => {
    consent[key] = enabledKeys.has(key);
  });
  return consent;
}

async function acceptAll() {
  const enabledKeys = new Set(CATEGORY_KEYS);
  prefInputs.forEach((input) => {
    if (!input.disabled) input.checked = true;
  });
  await runCookieRun(enabledKeys);
  finishConsent(enabledSetToConsent(enabledKeys));
}

async function declineAll() {
  disableAllControls(true);
  prefInputs.forEach((input) => {
    if (!input.disabled) input.checked = false;
  });

  if (prefersReducedMotion) {
    finishConsent(enabledSetToConsent(new Set(["necessary"])));
    return;
  }

  ghost.classList.add("flee");
  pacman.classList.add("turn-away");
  await sleep(600);
  finishConsent(enabledSetToConsent(new Set(["necessary"])));
}

async function savePreferences() {
  const enabledKeys = readPreferences();
  await runCookieRun(enabledKeys);
  finishConsent(enabledSetToConsent(enabledKeys));
}

function togglePrefsPanel() {
  const isOpen = !prefsPanel.classList.contains("hidden");
  prefsPanel.classList.toggle("hidden", isOpen);
  toggleSettingsBtn.setAttribute("aria-expanded", String(!isOpen));
}

acceptBtn.addEventListener("click", acceptAll);
declineBtn.addEventListener("click", declineAll);
toggleSettingsBtn.addEventListener("click", togglePrefsPanel);
savePrefsBtn.addEventListener("click", savePreferences);

// Toon de banner alleen als er nog geen keuze is opgeslagen
window.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("cookieConsent")) {
    setTimeout(() => {
      cookieBanner.classList.remove("hidden");
    }, 500);
  }
});
