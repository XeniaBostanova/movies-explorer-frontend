import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h5 className="portfolio__title">Портфолио</h5>
      <ul className="portfolio__container">
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://xeniabostanova.github.io/how-to-learn" target="_blank" rel="noopener noreferrer">
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://xeniabostanova.github.io/russian-travel" target="_blank" rel="noopener noreferrer">
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://xeniabostanova.github.io/react-mesto-auth" target="_blank" rel="noopener noreferrer">
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;