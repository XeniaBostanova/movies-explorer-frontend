import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h5 className="portfolio__title">Портфолио</h5>
      <div className="portfolio__container">
        <p className="portfolio__item">Статичный сайт</p>
        <a href="https://xeniabostanova.github.io/how-to-learn" rel="noopener noreferrer" target="_blank"><div className="portfolio__link"></div></a>
      </div>
      <div className="portfolio__container">
        <p className="portfolio__item">Адаптивный сайт</p>
        <a href="https://xeniabostanova.github.io/russian-travel/" rel="noopener noreferrer" target="_blank"><div className="portfolio__link"></div></a>
      </div>
      <div className="portfolio__container">
        <p className="portfolio__item">Одностраничное приложение</p>
        <a href="https://github.com/XeniaBostanova/react-mesto-auth" rel="noopener noreferrer" target="_blank"><div className="portfolio__link"></div></a>
      </div>
    </section>
  )
}

export default Portfolio;