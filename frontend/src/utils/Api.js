class Api {
    constructor({ baseUrl }) {
      this.baseUrl = baseUrl;
    }

    _getHeaders() {
      return {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    }

    _checkResult(res) {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    };
  
    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, { headers: this._getHeaders() })
          .then(this._checkResult);
    }

    getUserInfoValues() {
        return fetch(`${this.baseUrl}/users/me`, { headers: this._getHeaders() })
            .then(this._checkResult);
    }

    editProfile({ name, about }) {
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._getHeaders(),
        body: JSON.stringify({
          name: name,
          about: about,
        })
      })
      .then(this._checkResult);
    }

    addNewCard({ name, link }) {
      return fetch(`${this.baseUrl}/cards`, {
        method: 'POST',
        headers: this._getHeaders(),
        body: JSON.stringify({
          name: name,
          link: link,
        })
      })
          .then(this._checkResult);
    }

    handleDeleteCard(id) {
      return fetch(`${this.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: this._getHeaders(),
      })
          .then(this._checkResult);
    }

    toogleStateLike(id, state) {
      return fetch(`${this.baseUrl}/cards/${id}/likes`, {
        method: state,
        headers: this._getHeaders(),
        })
          .then(this._checkResult);
    }

    editAvatar(link) {
      return fetch(`${this.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._getHeaders(),
        body: JSON.stringify({
          avatar: link,
        })
      })
      .then(this._checkResult);
    }

    getAllData() {
      return Promise.all([this.getUserInfoValues(), this.getInitialCards()]);
    }
  }

  export const api = new Api({
    baseUrl: 'http://127.0.0.1:3001',
  });
  
 

  