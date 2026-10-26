const state = {
  home: { score: 0, yellow: 0, red: 0 },
  away: { score: 0, yellow: 0, red: 0 }
};

function addGoal(team) {
  state[team].score++;
  document.getElementById(`score-${team}`).textContent = state[team].score;
  showGoal();
}

function addCard(team, type) {
  state[team][type]++;
  updateCards(team);
}

function updateCards(team) {
  const display = document.getElementById(`cards-${team}`);
  display.innerHTML = '';
  for (let i = 0; i < state[team].yellow; i++) {
    const chip = document.createElement('div');
    chip.className = 'card-chip card-chip--yellow';
    display.appendChild(chip);
  }
  for (let i = 0; i < state[team].red; i++) {
    const chip = document.createElement('div');
    chip.className = 'card-chip card-chip--red';
    display.appendChild(chip);
  }
}

let goalTimer = null;
function showGoal() {
  const banner = document.getElementById('goal-banner');
  banner.classList.add('visible');
  clearTimeout(goalTimer);
  goalTimer = setTimeout(() => banner.classList.remove('visible'), 2500);
}

function reset() {
  ['home', 'away'].forEach(team => {
    state[team] = { score: 0, yellow: 0, red: 0 };
    document.getElementById(`score-${team}`).textContent = 0;
    document.getElementById(`cards-${team}`).innerHTML = '';
  });
  const banner = document.getElementById('goal-banner');
  banner.classList.remove('visible');
  clearTimeout(goalTimer);
}

document.getElementById('score-home').addEventListener('click', () => addGoal('home'));
document.getElementById('score-away').addEventListener('click', () => addGoal('away'));

document.querySelectorAll('.action-btn').forEach(btn => {
  btn.addEventListener('click', () => addCard(btn.dataset.team, btn.dataset.action));
});

document.getElementById('reset-btn').addEventListener('click', reset);
