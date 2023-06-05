import './Portfolio.scss';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Portfolio</h2>
      <div className="portfolio__list">
        <a
          href="https://nochatgptbot.t.me"
          target="_blank"
          rel="noreferrer"
          className="link portfolio__item">
          NodeJS Telegram bot
        </a>
        <a
          href="https://startups.family"
          target="_blank"
          rel="noreferrer"
          className="link portfolio__item">
          Adaptive site
        </a>
        <a
          href="https://mesto.fly.dev"
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
