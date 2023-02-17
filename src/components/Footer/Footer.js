import React from "react";
import './Footer.scss';
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__description">Yandex.Praktikum training project х BeatFilm.</p>
      <div className="footer__info-block">
        <p className="footer__year">© 2020</p>
        <nav className="footer__social-block">
            <p className="footer__company-name">Yandex.Praktikum</p>
            <Link className="footer__github link" to="https://github.com/in0vik">Github</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;