import React from 'react';
import './Promo.css';
import landingLogo from '../../images/landing-logo.svg';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a href="#aboutProject"><button type="button" className="promo__button">Узнать больше</button></a>
      </div>
      <img src={landingLogo} alt="Лого учебного проекта" className="promo__logo" />
    </section>
  )
}

export default Promo;