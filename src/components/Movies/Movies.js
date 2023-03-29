import React, { useEffect, useRef } from 'react';
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
  const [initialMovies, setInitialMovies] = React.useState([]);

  useEffect(() => {
    if (localStorage.getItem('filtredMovies')) {
      setFiltredMovies(JSON.parse(localStorage.getItem('filtredMovies')));
    } 
    if (localStorage.getItem('query')) {
      setSearchQeury(localStorage.getItem('query'));
    } 
    if (localStorage.getItem('isShort')) {
      setIsShortMovies(JSON.parse(localStorage.getItem('isShort')));
    } 
  }, [])


  useEffect(() => {
    if (filtredMovies.length === 0 && searchQeury) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [filtredMovies.length, searchQeury]);

  function onFilterMovies(movies, query, short) {
    const filtredMoviesData = short
      ? filterByDuration(filterMovies(allMovies, query))
      : filterMovies(movies, query);
    setFiltredMovies(filtredMoviesData);
    console.log(filtredMoviesData);
    localStorage.setItem('filtredMovies', JSON.stringify(filtredMoviesData));
  }

  function onShortFilterMovies() {
    setIsShortMovies(!isShortMovies);
    localStorage.setItem('isShort', !isShortMovies);
    onFilterMovies(allMovies, searchQeury, !isShortMovies);
  }

  function onSearchMovies(query) {
    setIsLoading(true);
    setSearchQeury(query);
    localStorage.setItem('query', query);
    if (!localStorage.getItem('allMovies')) {
      moviesApi
        .getMovies(query)
        .then((movies) => {
          localStorage.setItem('allMovies', JSON.stringify(movies));
          setIsRequestErr(false);
          setAllMovies(movies);
        })
        .catch((error) => {
          setIsRequestErr(true);
          console.log(error);
        });
    } else if (allMovies.length === 0) {
      setIsRequestErr(false);
      setAllMovies(JSON.parse(localStorage.getItem('allMovies')));
    }
    localStorage.setItem('filtredMovies', JSON.stringify(filtredMovies));
    setIsLoading(false);
    onFilterMovies(allMovies, query, isShortMovies);
  }

  return (
    <section className="movies">
      <SearchForm
        onSearchMovies={onSearchMovies}
        isShortMovies={isShortMovies}
        onFilter={onShortFilterMovies}
        query={searchQeury}
        setQuery={setSearchQeury}
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
