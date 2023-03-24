import React, { useEffect } from 'react';
import { filterByDuration, filterMovies } from '../../utils/utils';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.scss';

function SavedMovies({ savedMovies, onDeleteFilm }) {
  const [isShortMovies, setIsShortMovies] = React.useState(false);
  const [filtredMovies, setFiltredMovies] = React.useState([]);
  const [searchQeury, setSearchQeury] = React.useState('');
  const [isNotFound, setIsNotFound] = React.useState(false);

  useEffect(() => {
    if (filtredMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [filtredMovies]);

  useEffect(() => {
    setFiltredMovies(
      isShortMovies
        ? filterByDuration(filterMovies(savedMovies, searchQeury))
        : filterMovies(savedMovies, searchQeury)
    );
  }, [savedMovies, isShortMovies, searchQeury]);

  function onSearchMovies(query) {
    setSearchQeury(query);
  }

  function onFilterMovies() {
    setIsShortMovies(!isShortMovies);
  }

  return (
    <section className="saved-movies">
      <SearchForm
        onSearchMovies={onSearchMovies}
        isShortMovies={isShortMovies}
        onFilter={onFilterMovies}
        isSavedFilms={true}
      />
      <MoviesCardList
        cards={filtredMovies}
        onDeleteFilm={onDeleteFilm}
        savedMovies={savedMovies.reverse()}
        isSavedFilms={true}
        isNotFound={isNotFound}
      />
    </section>
  );
}

export default SavedMovies;
