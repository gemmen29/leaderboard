export default class LeaderboardHelper {
  static gameID = '';

  static baseURL =
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

  static createGame() {
    fetch(`${LeaderboardHelper.baseURL}/games/`, {
      method: 'POST',
      body: JSON.stringify({
        name: 'My cool new game',
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        [, , , LeaderboardHelper.gameID] = data.result.split(' ');
      });
  }

  static async addNewScore(username, score, refresh) {
    await fetch(
      `${LeaderboardHelper.baseURL}/games/${LeaderboardHelper.gameID}/scores`,
      {
        method: 'POST',
        body: JSON.stringify({
          user: username,
          score,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
      .then((response) => response.json())
      .then(() => {
        refresh();
      });
  }

  static async getAllScores() {
    return fetch(
      `${LeaderboardHelper.baseURL}/games/${LeaderboardHelper.gameID}/scores`,
    )
      .then((response) => response.json())
      .then((data) => data.result);
  }
}
