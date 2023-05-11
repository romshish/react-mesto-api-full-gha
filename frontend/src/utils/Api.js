class Api {
  constructor(config) {
    this._url = config.url;
  }

  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then((res) => {
        return this._checkState(res)
      })
  };

  getCardsFromApi() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then((res) => {
        return this._checkState(res)
      })
  };

  getAllNeededData() {
    return Promise.all([this.getUserInfo(), this.getCardsFromApi()])
  }

  updateProfile(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })
      .then((res) => {
        return this._checkState(res)
      })
  };

  addCards(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })
      .then((res) => {
        return this._checkState(res)
      })
  };

  deleteCard(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        return this._checkState(res)
      })
  };

  changeLikeCardStatus(cardId, isUnLiked) {
    const token = localStorage.getItem('jwt');
    if (isUnLiked) {
      return fetch(`${this._url}cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((res) => {
          return this._checkState(res)
        })
    } else {
      return fetch(`${this._url}cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((res) => {
          return this._checkState(res)
        })
    }
  };

  updateProfileAvatar(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })
      .then((res) => {
        return this._checkState(res)
      })
  };

  _checkState(result) {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Ошибка ${result.status}`);
  }
}

export const api = new Api({
  url: 'http://api.romshish.students.nomoredomains.monster/',
  // url: 'http://localhost:3001/',
  // headers: {
  //   'Content-Type': 'application/json',
  //   Authorization: '9ca94fef-76cd-4b73-8a46-eb5793e0762e'
  // }
});


