const fighters = ["🐉", "🐥", "🐊", "💩", "🦍", "🐢", "🐩", "🦭", "🦀", "🐝", "🤖", "🐘", "🐸", "🕷", "🐆", "🦕", "🦁"]

const fighter1El  = document.getElementById("fighter1")
const fighter2El  = document.getElementById("fighter2")
const resultEl    = document.getElementById("result")
const fightButton = document.getElementById("fightButton")

fightButton.addEventListener("click", function() {
    const i1 = Math.floor(Math.random() * fighters.length)
    const i2 = Math.floor(Math.random() * fighters.length)

    fighter1El.textContent = fighters[i1]
    fighter2El.textContent = fighters[i2]

    // Herstart animaties
    fighter1El.classList.remove("slide-in-left", "slide-in-right")
    fighter2El.classList.remove("slide-in-left", "slide-in-right")
    resultEl.classList.remove("pop")
    void fighter1El.offsetWidth // force reflow

    fighter1El.classList.add("slide-in-left")
    fighter2El.classList.add("slide-in-right")

    // Toon winnaar na de animatie
    setTimeout(() => {
        const roll = Math.random()
        if (roll < 0.45) {
            resultEl.textContent = fighters[i1] + " wint! 🏆"
        } else if (roll < 0.9) {
            resultEl.textContent = fighters[i2] + " wint! 🏆"
        } else {
            resultEl.textContent = "🤝 Gelijkspel!"
        }
        resultEl.classList.add("pop")
    }, 500)
})
