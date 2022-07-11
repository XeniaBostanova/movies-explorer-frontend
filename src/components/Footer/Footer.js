import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h4 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
      <div className="footer__container">
        <p className="footer__copyright">&copy;{new Date().getFullYear()}</p>
        <div className="footer__list">
          <a href="https://practicum.yandex.ru" className="footer__link" rel="noopener noreferrer" target="_blank">Яндекс.Практикум</a>
          <a href="https://github.com" className="footer__link" rel="noopener noreferrer" target="_blank">Github</a>
          <a href="https://www.linkedin.com" className="footer__link" rel="noopener noreferrer" target="_blank">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;