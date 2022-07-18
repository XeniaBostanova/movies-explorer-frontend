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
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
    })
      .then(this._getResponseData)
  }

  postMovie(data) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._getResponseData)
  }

  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._getResponseData)
  }

  // changeLikeCardStatus(id, isLiked) {
  //   const methodName = (isLiked ? "PUT" : "DELETE");
  //     return fetch(`${this._baseUrl}/cards/${id}/likes`, {
  //       method: methodName,
  //       headers: this._headers,
  //     })
  //       .then(this._getResponseData)
  // }

}

export const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});
