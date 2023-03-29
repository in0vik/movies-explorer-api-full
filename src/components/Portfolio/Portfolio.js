import React from 'react';
import './Portfolio.scss';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Portfolio</h2>
      <div className="portfolio__list">
        <a
          href="https://startups.family"
          target="_blank"
          rel="noreferrer"
          className="link portfolio__item">
          Static site
        </a>
        <a
          href="https://in0vik.github.io/traveling"
          target="_blank"
          rel="noreferrer"
          className="link portfolio__item">
          Adaptive site
        </a>
        <a
          href="https://whereis.nomoredomainsclub.ru"
          target="_blank"
          rel="noreferrer"
          className="link portfolio__item">
          Single Page Application
        </a>
      </div>
    </section>
  );
}

export default Portfolio;
