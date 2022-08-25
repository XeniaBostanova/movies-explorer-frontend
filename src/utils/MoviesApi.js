import { MOVIES_URL } from './constants';

class MoviesApi {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(this._getResponseData)
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: `${MOVIES_URL}`,
});
