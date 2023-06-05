import { MOVIES_API_URL } from '../config/config';
import { checkResponse } from './utils';

function getMovies() {
  return fetch(MOVIES_API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => checkResponse(response));
}

export { getMovies };
