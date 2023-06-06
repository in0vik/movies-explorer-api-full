import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.scss';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__text">Page not found</p>
      <button className="button not-found__button" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}

export default NotFound;
