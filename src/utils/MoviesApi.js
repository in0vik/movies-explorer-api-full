import { checkResponse } from './utils';

const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

function getMovies() {
  return fetch(BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => checkResponse(response));
}

export { getMovies };
