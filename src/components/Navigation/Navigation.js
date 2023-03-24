import React, { useState } from 'react';
import './Navigation.scss';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


function Navigation() {
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  function handleBurgerSwitch() {
    setIsBurgerOpened(!isBurgerOpened);
  }
  return (
    <div className="navigation">
      <input id="menu-button" className="navigation__menu-toggle" type="checkbox" checked={isBurgerOpened} readOnly onClick={handleBurgerSwitch}/>
      <label className="navigation__menu-button" onClick={handleBurgerSwitch}>
        <span className="navigation__menu-elements"></span>
      </label>
      <div className="navigation__overlay">
        <div className="navigation__link-wrap">
          <NavLink
            to="/"
            onClick={handleBurgerSwitch}
            className={({ isActive }) =>
              isActive ? 'link navigation__link navigation__link_active' : 'link navigation__link'
            }>
            Main
          </NavLink>
          <NavLink
            to="/movies"
            onClick={handleBurgerSwitch}
            className={({ isActive }) =>
              isActive ? 'link navigation__link navigation__link_active' : 'link navigation__link'
            }>
            Films
          </NavLink>
          <NavLink
            to="/saved-movies"
            onClick={handleBurgerSwitch}
            className={({ isActive }) =>
              isActive ? 'link navigation__link navigation__link_active' : 'link navigation__link'
            }>
            Saved films
          </NavLink>
        </div>
        <Link className="button navigation__profile-button" to="/profile">
          Profile
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
