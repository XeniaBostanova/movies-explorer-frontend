import React, { useEffect } from 'react';
import { useFormWithValidation } from '../../utils/validation';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Auth.css';

function Register({isLoading, onRegister, message}) {
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
  const disabled = !isValid || isLoading;

  useEffect(() => {
    resetForm({}, {}, false);
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
  }

  return (
    <section className="auth">
      <Link to="/" className="auth__logo">
        <img src={logo} alt="Логотип" />
      </Link>
      <h2 className="auth__title">Добро пожаловать!</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__container">
          <label htmlFor="name-input" className="auth__label">Имя</label>
          <input
            id="name-input"
            type="text"
            name="name"
            value={values.name || ''}
            onChange={handleChange}
            className="auth__form-item auth__form-item_type_name"
            minLength="2" maxLength="40" required />
            <span className="auth__input-error">{errors.name || ''}</span>
          <label htmlFor="email-input" className="auth__label">E-mail</label>
          <input
            id="email-input"
            type="email"
            name="email"
            value={values.email || ''}
            onChange={handleChange}
            className="auth__form-item auth__form-item_type_email"
            required />
          <span className="auth__input-error">{errors.email || ''}</span>
          <label htmlFor="password-input" className="auth__label">Пароль</label>
          <input
            id="password-input"
            type="password"
            name="password"
            value={values.password|| ''}
            onChange={handleChange}
            className="auth__form-item auth__form-item_type_password"
            minLength="8" maxLength="50" required />
          <span className="auth__input-error">{errors.password || ''}</span>
          <span className="auth__message-error">{message}</span>
          <button disabled={disabled} type="submit" className="auth__button">Зарегистрироваться</button>
        </div>
      </form>
      <p className="auth__subtitle">Уже зарегистрированы? 
       <Link to="/signin" className="auth__link"> Войти</Link>
      </p>
    </section>
  )
}

export default Register;