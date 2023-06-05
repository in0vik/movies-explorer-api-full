import { API_URL } from '../config/config';
import { checkResponse } from './utils';

const register = (email, password, name) =>
  fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  }).then((response) => checkResponse(response));

const authorize = (email, password) =>
  fetch(`${API_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(checkResponse);

const getUserInfo = () =>
  fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then(checkResponse);

const getUserContent = (token) =>
  fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);

const setUserInfo = (data) =>
  fetch(`${API_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    }),
  }).then(checkResponse);

const getMovies = () =>
  fetch(`${API_URL}/movies`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then(checkResponse);

const postMovie = (data) =>
  fetch(`${API_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: `https://api.nomoreparties.co/${data.image.url}`,
      trailerLink: data.trailerLink,
      thumbnail: `https://api.nomoreparties.co/${data.image.previewUrl.split(' ')[data.id - 1]}`,
      movieId: data.id.toString(),
      nameRU: data.nameRU,
      nameEN: data.nameEN,
    }),
  }).then(checkResponse);

const deleteMovie = (id) =>
  fetch(`${API_URL}/movies/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then(checkResponse);

export {
  API_URL,
  register,
  authorize,
  getUserInfo,
  getUserContent,
  setUserInfo,
  getMovies,
  postMovie,
  deleteMovie,
};
