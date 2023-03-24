import React, { useEffect } from 'react';
import './Movies.scss';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import * as moviesApi from '../../utils/MoviesApi';
import MoviesRequestError from '../MoviesRequestError/MoviesRequestError';
import { filterByDuration, filterMovies } from '../../utils/utils';

function Movies({ onSaveFilm, onDeleteFilm, savedMovies }) {
  const [allMovies, setAllMovies] = React.useState([]);
  const [filtredMovies, setFiltredMovies] = React.useState([]);
  const [isShortMovies, setIsShortMovies] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRequestErr, setIsRequestErr] = React.useState(false);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [searchQeury, setSearchQeury] = React.useState('');

  useEffect(() => {
    setFiltredMovies(
      isShortMovies
        ? filterByDuration(filterMovies(allMovies, searchQeury))
        : filterMovies(allMovies, searchQeury)
    );
    
  }, [allMovies, isShortMovies, searchQeury]);

  useEffect(() => {
    if (filtredMovies.length === 0 && searchQeury) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [filtredMovies.length, searchQeury])

  function onFilterMovies() {
    setIsShortMovies(!isShortMovies);
  }

  function onSearchMovies(query) {
    setIsLoading(true);
    setSearchQeury(query);
    moviesApi
      .getMovies(query)
      .then((movies) => {
        setIsRequestErr(false);
        setAllMovies(movies);
      })
      .catch((error) => {
        setIsRequestErr(true);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <section className="movies">
      <SearchForm
        onSearchMovies={onSearchMovies}
        isShortMovies={isShortMovies}
        onFilter={onFilterMovies}
      />
      {isRequestErr ? (
        <MoviesRequestError />
      ) : (
        <MoviesCardList
          cards={filtredMovies}
          isLoading={isLoading}
          onSaveFilm={onSaveFilm}
          onDeleteFilm={onDeleteFilm}
          savedMovies={savedMovies}
          isNotFound={isNotFound}
        />
      )}
    </section>
  );
}

export default Movies;
