const btnEl = document.querySelector(".btn")
const inputEl = document.getElementById("input")
const copyIconEl = document.querySelector(".fa-copy")
const alertContainerEl = document.getElementById("alert-container")
const strengthBarEl = document.getElementById("strength-bar")
const strengthLabelEl = document.getElementById("strength-label")
const chkUpper = document.getElementById("chk-upper")
const chkNumbers = document.getElementById("chk-numbers")
const chkSymbols = document.getElementById("chk-symbols")

const CHARS_LOWER   = "abcdefghijklmnopqrstuvwxyz";
const CHARS_UPPER   = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CHARS_NUMBERS = "0123456789";
const CHARS_SYMBOLS = "!@#$%^&*+_?:(){}[]";

btnEl.addEventListener("click", () => {
    createPassword()
})

function handleCopy() {
    copyPassword()
    if (inputEl.value) {
        alertContainerEl.classList.add("active")
        setTimeout(() => {
            alertContainerEl.classList.remove("active")
        }, 2000)
    }
}

copyIconEl.addEventListener("click", handleCopy)

copyIconEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        handleCopy()
    }
})

function buildCharset() {
    let chars = CHARS_LOWER;
    if (chkUpper.checked)   chars += CHARS_UPPER;
    if (chkNumbers.checked) chars += CHARS_NUMBERS;
    if (chkSymbols.checked) chars += CHARS_SYMBOLS;
    return chars;
}

function createPassword() {
    const chars = buildCharset();
    const passwordLength = 14;
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        const randomNum = Math.floor(Math.random() * chars.length);
        password += chars[randomNum];
    }
    animatePassword(password, chars);
}

function animatePassword(finalPassword, chars) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        inputEl.value = finalPassword;
        updateStrength(finalPassword);
        return;
    }

    const steps = 14;
    let step = 0;

    const interval = setInterval(() => {
        let display = "";
        const locked = Math.floor((step / steps) * finalPassword.length);
        for (let i = 0; i < finalPassword.length; i++) {
            if (i < locked) {
                display += finalPassword[i];
            } else {
                display += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        inputEl.value = display;
        inputEl.classList.remove("generating");
        void inputEl.offsetWidth;
        inputEl.classList.add("generating");

        step++;
        if (step > steps) {
            clearInterval(interval);
            inputEl.value = finalPassword;
            updateStrength(finalPassword);
        }
    }, 50);
}

function updateStrength(password) {
    let score = 0;
    if (/[a-z]/.test(password))      score++;
    if (/[A-Z]/.test(password))      score++;
    if (/[0-9]/.test(password))      score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const levels = [
        null,
        { label: "Zwak",       width: "25%",  color: "#e74c3c" },
        { label: "Matig",      width: "50%",  color: "#e67e22" },
        { label: "Goed",       width: "75%",  color: "#f1c40f" },
        { label: "Sterk",      width: "100%", color: "#2ecc71" },
    ];

    const level = levels[score];
    strengthBarEl.style.width = level.width;
    strengthBarEl.style.backgroundColor = level.color;
    strengthLabelEl.textContent = level.label;
    strengthLabelEl.style.color = level.color;
}

function copyPassword() {
    inputEl.select();
    inputEl.setSelectionRange(0, 9999);
    navigator.clipboard.writeText(inputEl.value)
    alertContainerEl.innerText = "Gekopieerd!"
}
