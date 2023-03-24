import React from 'react';
import './Header.scss';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import { NavLink } from 'react-router-dom';

function Header({ isLoggedIn }) {

  return (
    <>
      {!isLoggedIn ? (
        <header className="header">
          <Link className="header__logo" to="/">
            <img src={logo} alt="logo" />
          </Link>
          <nav className="header__navigation-logged-out">
            <ul className="header__navigation-list header__navigation-list_type_main-nav">
              <li className="header__registration-button">
                <Link className="link header__navigation-link  " to="/signup">
                  Registration
                </Link>
              </li>
              <li className="header__login-button">
                <Link className="link header__navigation-link" to="/signin">
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      ) : (
        <header className="header">
          <Link className="header__logo" to="/">
            <img src={logo} alt="logo" />
          </Link>
          <Navigation/>
          <nav className="header__navigation">
            <ul className="header__navigation-list header__navigation-list_type_profile">
              <li className="header__navigation-item">
                <NavLink
                  className={({ isActive }) => isActive ? 'link header__navigation-link header__navigation-link_active' : 'link header__navigation-link'} 
                  to="/movies">
                  Films
                </NavLink>
              </li>
              <li className="header__navigation-item">
                <NavLink
                  className={({ isActive }) => isActive ? 'link header__navigation-link header__navigation-link_active' : 'link header__navigation-link'}
                  to="/saved-movies"
                  >
                  Saved films
                </NavLink>
              </li>
            </ul>

            <ul className="header__navigation-list header__navigation-list_type_main-nav">
              <li className="header__profile-button">
                <Link className="header__navigation-link link" to="/profile">
                  Account
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      )}
    </>
  );
}

export default Header;
