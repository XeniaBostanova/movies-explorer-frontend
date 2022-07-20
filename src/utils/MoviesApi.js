import { MOVIES_URL } from './constants';

class MoviesApi {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  get _headers() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
    }
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      headers: this._headers,
    })
      .then(this._getResponseData)
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: `${MOVIES_URL}`,
});
