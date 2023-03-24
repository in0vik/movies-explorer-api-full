import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.scss';

function SearchForm({ onSearchMovies, isShortMovies, onFilter, isSavedFilms }) {
  const [query, setQuery] = React.useState('');
  const [isQueryEmpty, setIsQueryEmpty] = React.useState(false);
  function handleChangeQuery(e) {
    setIsQueryEmpty(false);
    setQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isSavedFilms) {
      onSearchMovies(query);
    }
    if (query.trim().length === 0) {
      setIsQueryEmpty(true);
      if (isShortMovies) {
        onSearchMovies(query);
      }
    } else {
      setIsQueryEmpty(false);
      onSearchMovies(query);
    }
  }

  return (
    <>
      <section className="search-form">
        <form className="search-form__form" onSubmit={handleSubmit} noValidate>
          <input
            className={`search-form__input ${isQueryEmpty && !isSavedFilms && !isShortMovies ? 'search-form__input-error' : ''}`}
            onChange={handleChangeQuery}
            type="text"
            placeholder={isQueryEmpty && !isShortMovies && !isSavedFilms ? 'Enter keyword' : 'Film'}
            required
          />
          <button className="button search-form__button"></button>
          <div className="search-form__separator"></div>
          <FilterCheckbox isShortMovies={isShortMovies} onFilter={onFilter} />
        </form>
      </section>
    </>
  );
}

export default SearchForm;
