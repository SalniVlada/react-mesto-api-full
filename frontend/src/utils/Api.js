class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers; 
  }

  _getHeaders() {
    let currentHeaders = this.headers;
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      currentHeaders['Authorization'] = `Bearer ${jwt}`
    }
    return currentHeaders;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  // единый блок GET
  _executeGetRequest(path) {
    return fetch(this.baseUrl + path, {
      headers: this._getHeaders()
    })
    .then(this._checkResponse);
  }

 //загрузка информации о пользователи
  getUserInfo() {
    return this._executeGetRequest('/users/me');
  }

  // загрузка карточек
  getInitialCards() {
    return this._executeGetRequest('/cards');
  }

  // единый блок PATCH
  _executePatchRequest(path, data) {
    return fetch(this.baseUrl + path, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  // редактирование профиля
  patchUserInfo(data) {
    return this._executePatchRequest('/users/me', data);
  }

  // редактирование аватара
  patchUserAvatar(data) {
    return this._executePatchRequest('/users/me/avatar', data);
  }

  // добавление новой каточки
  postCard({name, link}) {
    return fetch(this.baseUrl + '/cards', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._checkResponse);
  }

  // удиный блок DELETE
  _executeDeleteRequest(path) {
    return fetch(this.baseUrl + path, {
      method: 'DELETE',
      headers: this._getHeaders()
    })
    .then(this._checkResponse);
  }

  // удаление карточки
  deleteCard(cardId) {
    return this._executeDeleteRequest('/cards/' + cardId);
  }

  //"удаление" лайка
  deleteLikes(cardId) {
    return this._executeDeleteRequest('/cards/' + cardId + '/likes');
  }

  // лайк карточки
  putLikes(cardId) {
    return fetch(this.baseUrl + '/cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: this.headers
    })
    .then(this._checkResponse);
  }

  // регистрация
  signUp({password, email}) {
    return fetch(this.baseUrl + '/signup', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
    .then(this._checkResponse);
  }

  // авторизация
  signIn({password, email}) {
    return fetch(this.baseUrl + '/signin', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
    .then(this._checkResponse);
  }

  // проверка и получение пользователя по токену
  getUserAuth(token) {
    return fetch(this.baseUrl + '/users/me', {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._checkResponse);
  }

}

export const api = new Api({
  baseUrl: 'https://api.salnivlada.nomoredomains.sbs',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;

export const auth = new Api({
  baseUrl: 'https://api.salnivlada.nomoredomains.sbs',
  headers: {
    'Content-Type': 'application/json'
  }
});
