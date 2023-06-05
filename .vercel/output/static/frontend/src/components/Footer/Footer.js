import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__description">Yandex.Praktikum diploma project х BeatFilm.</p>
      <div className="footer__info-block">
        <p className="footer__year">© 2020</p>
        <nav className="footer__social-block">
          <p className="footer__company-name">Ilya Novik</p>
          <a
            href="https://github.com/in0vik"
            target="_blank"
            rel="noreferrer"
            className="footer__github link">
            Github
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
