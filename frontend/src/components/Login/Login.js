import React from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useFormWithValidation } from '../../utils/utils';
import { EMAIL_REGEX } from '../../utils/constants';

function Login({ isLoading, onAuth, isRequestErr, setIsRequestErr }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  function handleSubmit(e) {
    e.preventDefault();
    setIsRequestErr(false);
    onAuth({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <section className="login">
      <Link className="login__logo-link" to="/">
        <img className="login__logo" src={logo} alt="Logo" />
      </Link>
      <h2 className="login__title">Good to see you!</h2>
      <form className="login__form" onSubmit={handleSubmit} noValidate>
        <fieldset className="login__form-fieldset" disabled={isLoading}>
          <div className="login__form-item">
            <label className="login__form-label">E-mail</label>
            <input
              className="login__form-input"
              type="email"
              name="email"
              onChange={handleChange}
              required
              minLength="4"
              maxLength="320"
              pattern={EMAIL_REGEX}
              value={values.email || ''}
            />
            <span className="login__input-error">{errors.email}</span>
          </div>
          <div className="login__form-item">
            <label className="login__form-label">Password</label>
            <input
              className="login__form-input"
              onChange={handleChange}
              type="password"
              name="password"
              required
              minLength="2"
              maxLength="320"
              value={values.password || ''}
            />
            <span className="login__input-error">{errors.password}</span>
          </div>
          <div className="login__request-error">{isRequestErr ? 'Request error' : ''}</div>
          <button
            className={`button login__form-button ${!isValid || isLoading && 'login__form-button_disabled'}`}
            disabled={!isValid}>
            Login
          </button>
          <p className="login__text">
            Not registered yet?{' '}
            <Link className="link login__registration-link" to="/signup">
              Registration
            </Link>
          </p>
        </fieldset>
      </form>
    </section>
  );
}

export default Login;
