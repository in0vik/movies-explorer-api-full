import React from 'react';
import { filmDurationConverter } from '../../utils/utils';
import './MoviesCard.scss';

function MoviesCard({ card, isSavedFilms, onSaveFilm, onDeleteFilm, savedMovies, isSaved }) {
  function onDelete() {
    if (isSavedFilms) {
      onDeleteFilm(savedMovies.find((m) => m._id === String(card._id))._id);
    } else {
      onDeleteFilm(savedMovies.find((m) => m.movieId === String(card.id))._id);
    }
  }

  function onLike() {
    if (isSaved) {
      onDelete();
      isSaved = false;
    } else {
      isSaved = true;
      onSaveFilm(card);
    }
  }

  return (
    <section className="movies-card">
      <div className="movies-card__info-wrap">
        <p className="movies-card__title">{card.nameEN}</p>
        <p className="movies-card__duration">{filmDurationConverter(card.duration)}</p>
        {isSavedFilms ? (
          <button
            className="movies-card__button movies-card__delete-button"
            onClick={onDelete}></button>
        ) : (
          <button
            className={`movies-card__button movies-card__save-button${isSaved ? '_active' : ''}`}
            onClick={onLike}></button>
        )}
      </div>
      <a href={card.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="movies-card__image"
          src={isSavedFilms ? card.image : `https://api.nomoreparties.co${card.image.url}`}
          alt={card.nameEN}
        />
      </a>
    </section>
  );
}

export default MoviesCard;
