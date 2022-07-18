
class MainApi {
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

  register = (name, email, password) => {
    return fetch(`${this._baseUrl}/sign-up`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    })
    .then(this._getResponseData)
  }
  
  authorize = (email, password) => {
    return fetch(`${this._baseUrl}/sign-in`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(this._getResponseData)
  }
  
  // getContent = () => {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
  //     }
  //   })
  //   .then(getResponseData)
  // } 
}

export const mainApi = new MainApi({
  baseUrl: 'https://api.diploma.movies.nomoredomains.xyz',
});