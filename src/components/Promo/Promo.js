import React from 'react';
import './Promo.css';
import landingLogo from '../../images/landing-logo.svg';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <button type="button" className="promo__button">Узнать больше</button>
      </div>
      <a href="#aboutProject"><img src={landingLogo} alt="Лого учебного проекта" className="promo__logo" /></a>
    </section>
  )
}

export default Promo;