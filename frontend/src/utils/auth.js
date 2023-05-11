export const BASE_URL = 'http://localhost:3001/';
// export const BASE_URL = 'https://auth.nomoreparties.co/';

export const register = (password, email) => {
  return fetch(`${BASE_URL}sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then((response) => {
      try {
        if (response.ok) {
          return response.json();
        }
      } catch (e) {
        return e;
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}sign-in`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((response => response.json()))
    .then((data) => {
        localStorage.setItem('jwt', data.token);
        return data;
      })
    .catch(err => console.log(err))
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(res => res.json())
    .then((data) => {
      return data;
    })
}
