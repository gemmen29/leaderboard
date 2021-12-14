import './style.css';

import LeaderboardHelper from './LeaderboardHelper';

const leaderboardUL = document.querySelector('.leader-board');
leaderboardUL.textContent = 'Leaderboard is Empty...';

// create game
LeaderboardHelper.createGame();

// add event to refresh btn
const creatListItemForEachLeaderboard = (name, score) => {
  const leaderboardItem = document.createElement('li');
  leaderboardItem.classList.add(
    'py-1',
    'px-2',
    'fs-5',
    'text-start',
  );
  leaderboardItem.textContent = `${name}: ${score}`;
  return leaderboardItem;
};

const refreshBtn = document.querySelector('.refresh-btn');
refreshBtn.addEventListener('click', async () => {
  const scores = await LeaderboardHelper.getAllScores();

  if (scores.length === 0) return;

  scores.sort((a, b) => b.score - a.score);
  leaderboardUL.innerHTML = '';
  scores.forEach((score) => {
    leaderboardUL.appendChild(
      creatListItemForEachLeaderboard(score.user, score.score),
    );
  });
});

// Submit form
const addNewScoreForm = document.querySelector('#add-new-score-form');

addNewScoreForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = addNewScoreForm.username.value.trim();
  const score = addNewScoreForm.score.value.trim();
  if (username !== '' || score !== '') {
    await LeaderboardHelper.addNewScore(username, score, () => refreshBtn.click());
  }
  addNewScoreForm.username.value = '';
  addNewScoreForm.score.value = '';
});
