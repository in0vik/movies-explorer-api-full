import { useCallback, useState } from "react";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const filmDurationConverter = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}m`;
}

function filterMovies(movies, query) {
  if (!query) {
    return movies
  }
  const moviesByQuery = movies.filter((movie) => {
    const movieRU = String(movie.nameRU).toLowerCase().trim();
    const movieEN = String(movie.nameEN).toLowerCase().trim();
    const searchQeury = String(query).toLowerCase().trim();
    return movieRU.indexOf(searchQeury) !== -1 || movieEN.indexOf(searchQeury) !== -1;
  });
  return moviesByQuery;
}

function filterByDuration(movies) {
  return movies.filter((movie) => movie.duration <= 40);
}
function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}

export {
  checkResponse,
  filmDurationConverter,
  filterByDuration,
  filterMovies,
  useFormWithValidation,
}