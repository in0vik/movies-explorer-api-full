import React, { useEffect } from 'react';
import { DESKTOP_BREAKPOINT, DESKTOP_MOVIES_ON_PAGE, MOBILE_BREAKPOINT, MOBILE_MOVIES_ON_PAGE, SMALL_SCREEN_MOVIES_ON_PAGE, TABLET_BREAKPOINT, TABLET_MOVIES_ON_PAGE } from '../../utils/constants';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.scss';

function MoviesCardList({
  cards,
  onSaveFilm,
  onDeleteFilm,
  savedMovies,
  isSavedFilms,
  isLoading,
  isNotFound,
}) {
  const [numberOfVisibleMovies, setNumberOfVisibleMovies] = React.useState(0);
  const TIMEOUT_DELAY = 500;
  function numberOfMovies() {
    const display = window.innerWidth;
    if (display > DESKTOP_BREAKPOINT) {
      setNumberOfVisibleMovies(DESKTOP_MOVIES_ON_PAGE);
    } else if (display > TABLET_BREAKPOINT) {
      setNumberOfVisibleMovies(TABLET_MOVIES_ON_PAGE);
    } else if (display > MOBILE_BREAKPOINT) {
      setNumberOfVisibleMovies(MOBILE_MOVIES_ON_PAGE);
    } else if (display < MOBILE_BREAKPOINT) {
      setNumberOfVisibleMovies(SMALL_SCREEN_MOVIES_ON_PAGE);
    }
  }

  function addMoreMovies() {
    const display = window.innerWidth;
    if (display > DESKTOP_BREAKPOINT) {
      setNumberOfVisibleMovies(numberOfVisibleMovies + DESKTOP_MOVIES_ON_PAGE);
    } else if (display > TABLET_BREAKPOINT) {
      setNumberOfVisibleMovies(numberOfVisibleMovies + TABLET_MOVIES_ON_PAGE);
    } else if (display > MOBILE_BREAKPOINT) {
      setNumberOfVisibleMovies(numberOfVisibleMovies + MOBILE_MOVIES_ON_PAGE);
    } else if (display < MOBILE_BREAKPOINT) {
      setNumberOfVisibleMovies(numberOfVisibleMovies + SMALL_SCREEN_MOVIES_ON_PAGE);
    }
  }

  useEffect(() => {
    numberOfMovies();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('resize', numberOfMovies);
    }, TIMEOUT_DELAY);
    return () => window.removeEventListener('resize', numberOfMovies);
  });

  function getSavedMovieCard(savedMovies, card) {
    return savedMovies.find((m) => m.movieId === String(card.id));
  }

  return isLoading ? (
    <Preloader />
  ) : (
    <section className="movies-card-list">
      {isNotFound && <p className="movies-card-list__not-found">Nothing found</p>}
      <div className="movies-card-list__wrap">
        {cards.slice(0, numberOfVisibleMovies).map((card) => (
          <MoviesCard
            key={isSavedFilms ? card._id : card.id}
            card={card}
            cards={cards}
            isSavedFilms={isSavedFilms}
            onSaveFilm={onSaveFilm}
            onDeleteFilm={onDeleteFilm}
            isSaved={getSavedMovieCard(savedMovies, card)}
            savedMovies={savedMovies}
          />
        ))}
      </div>
      {cards.length > numberOfVisibleMovies && (
        <button className="button movies-card-list__more-button" onClick={addMoreMovies}>
          More
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
