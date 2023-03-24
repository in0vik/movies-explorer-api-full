import React, { useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.scss';

function MoviesCardList({ cards, onSaveFilm, onDeleteFilm, savedMovies, isSavedFilms, isLoading, isNotFound }) {
  const [numberOfVisibleMovies, setNumberOfVisibleMovies] = React.useState(0);

  function numberOfMovies() {
    const display = window.innerWidth;
    if (display > 800) {
      setNumberOfVisibleMovies(15);
    } else if (display > 480) {
      setNumberOfVisibleMovies(12);
    } else if (display > 340) {
      setNumberOfVisibleMovies(8);
    } else if (display < 340) {
      setNumberOfVisibleMovies(5);
    }
  }

  function addMoreMovies() {
    const display = window.innerWidth;
    if (display > 800) {
      setNumberOfVisibleMovies(numberOfVisibleMovies + 15);
    } else if (display > 480) {
      setNumberOfVisibleMovies(numberOfVisibleMovies + 12);
    } else if (display > 340) {
      setNumberOfVisibleMovies(numberOfVisibleMovies + 8);
    } else if (display < 340) {
      setNumberOfVisibleMovies(numberOfVisibleMovies + 5);
    }
  }

  useEffect(() => {
    numberOfMovies();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('resize', numberOfMovies);
    },500)
    return () => window.removeEventListener('resize', numberOfMovies);
  });

  function getSavedMovieCard(savedMovies, card) {
    return savedMovies.find((m) => m.movieId === String(card.id));
  }

  return (
    isLoading ? <Preloader /> : <section className="movies-card-list">
      
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
