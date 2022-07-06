import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile() {
  return(
    <section className="profile">
      <h2 className="profile__title">Привет, User!</h2>  {/*Вставить user.name*/}
      <form className="profile__form">
        <div className="profile__container">
          <label htmlFor="name-input" className="profile__label">Имя</label>
          <input id="name-input" type="text" name="name" className="profile__form-item profile__form-item_type_name" minLength="2" maxLength="40" required />
        </div>
        <div className="profile__container">
          <label htmlFor="email-input" className="profile__label">E-mail</label>
          <input id="email-input" type="email" name="email" className="profile__form-item profile__form-item_type_email" minLength="4" maxLength="40" required />
        </div>
      </form>
      <p className="profile__submit">Редактировать</p>
      <Link to="/" className="profile__link">Выйти из аккаунта</Link>
    </section>
  )
}

export default Profile;