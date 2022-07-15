import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Auth.css';

function Login() {
  return(
    <section className="auth">
    <Link to="/" className="auth__logo">
      <img src={logo} alt="Логотип" />
    </Link>
    <h2 className="auth__title">Рады видеть!</h2>
    <form className="auth__form">
      <div className="auth__container">
        <label htmlFor="email-input" className="auth__label">E-mail</label>
        <input id="email-input" type="email" name="email" className="auth__form-item auth__form-item_type_email" minLength="4" maxLength="40" required />
        <span className="auth__input-error email-input-error"></span>
        <label htmlFor="password-input" className="auth__label">Пароль</label>
        <input id="password-input" type="password" name="password" className="auth__form-item auth__form-item_type_password" minLength="8" maxLength="50" required />
        <span className="auth__input-error password-input-error"></span>
        <button type="submit" className="auth__button auth__button_type_login">Войти</button>
      </div>
    </form>
    <p className="auth__subtitle">Еще не зарегистрированы? 
     <Link to="/signup" className="auth__link"> Регистрация</Link>
    </p>
  </section>
  )
}

export default Login;