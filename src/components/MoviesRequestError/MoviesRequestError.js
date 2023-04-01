import React from 'react';
import './MoviesRequestError.scss';

function MoviesRequestError() {
  return (
    <section className="movies-request-error">
      <p className="movies-request-error__text">
        An error occurred during the request. There may be a problem with the connection or the
        server is unavailable. Wait a while and try again
      </p>
    </section>
  );
}

export default MoviesRequestError;
