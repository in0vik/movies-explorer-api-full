import React from 'react';
import './NavTab.scss';
import { HashLink as Link } from 'react-router-hash-link';

function NavTab() {
  return (
    <div className="nav-tab">
      <Link className="button nav-tab__button" to="#aboutproject">
        About Project
      </Link>
      <Link className="button nav-tab__button" to="#techs">
        Techs
      </Link>
      <Link className="button nav-tab__button" to="#aboutme">
        About Me
      </Link>
    </div>
  );
}

export default NavTab;
