import React from 'react';
import './Register.scss';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/utils';

function Register({ isLoading, onRegister, isRequestErr, setIsRequestErr }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  function handleSubmit(e) {
    e.preventDefault();
    setIsRequestErr(false);
    onRegister({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  }

  return (
    <section className="register">
      <Link className="register__logo-link" to="/">
        <img className="register__logo" src={logo} alt="Logo" />
      </Link>
      <h2 className="register__title">Welcome!</h2>
      <form className="register__form" onSubmit={handleSubmit} noValidate>
        <fieldset className="register__form-fieldset" disabled={isLoading}>
          <div className="register__form-item">
            <label className="register__form-label">Name</label>
            <input
              className="register__form-input"
              type="text"
              name="name"
              onChange={handleChange}
              required
              minLength="2"
              maxLength="30"
              pattern="^[a-zA-Z]+$"
              value={values.name || ''}
            />
            <span className="register__input-error">{errors.name}</span>
          </div>
          <div className="register__form-item">
            <label className="register__form-label">E-mail</label>
            <input
              className="register__form-input"
              type="email"
              name="email"
              onChange={handleChange}
              required
              minLength="4"
              maxLength="320"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              value={values.email || ''}
            />
            <span className="register__input-error">{errors.email}</span>
          </div>
          <div className="register__form-item">
            <label className="register__form-label">Password</label>
            <input
              className="register__form-input"
              onChange={handleChange}
              type="password"
              name="password"
              required
              minLength="2"
              maxLength="320"
              value={values.password || ''}
            />
            <span className="register__input-error">{errors.password}</span>
          </div>
          <div className="register__request-error">
            {isRequestErr ? 'Request error or user already exists' : ''}
          </div>
          <button
            className={`button register__form-button ${
              !isValid || isLoading && 'register__form-button_disabled'
            }`}
            disabled={!isValid}>
            Register
          </button>
          <p className="register__text">
            Already registered?{' '}
            <Link className="link register__registration-link" to="/signin">
              Login
            </Link>
          </p>
        </fieldset>
      </form>
    </section>
  );
}

export default Register;
