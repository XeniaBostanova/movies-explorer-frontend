import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useFormWithValidation } from '../../utils/validation';
import './Auth.css';

function Login({isLoading, onLogin}) {
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
  const disabled = !isValid || isLoading;

  useEffect(() => {
    resetForm({}, {}, false);
  }, [resetForm]);


  function handleSubmit(e) {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    onLogin(values);
  }

  return(
    <section className="auth">
    <Link to="/" className="auth__logo">
      <img src={logo} alt="Логотип" />
    </Link>
    <h2 className="auth__title">Рады видеть!</h2>
    <form className="auth__form" onSubmit={handleSubmit}>
      <div className="auth__container">
        <label htmlFor="email-input" className="auth__label">E-mail</label>
        <input 
          id="email-input"
          type="email"
          name="email"
          value={values.email || ''}
          onChange={handleChange}
          className="auth__form-item auth__form-item_type_email"
          pattern = "^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"
          required />
        <span className="auth__input-error">{errors.email || ''}</span>
        <label htmlFor="password-input" className="auth__label">Пароль</label>
        <input 
          id="password-input"
          type="password"
          name="password"
          value={values.password || ''}
          onChange={handleChange}
          className="auth__form-item auth__form-item_type_password"
          minLength="8" maxLength="50"
          required />
        <span className="auth__input-error">{errors.password || ''}</span>
        <button disabled={disabled} type="submit" className="auth__button auth__button_type_login">Войти</button>
      </div>
    </form>
    <p className="auth__subtitle">Еще не зарегистрированы? 
     <Link to="/signup" className="auth__link"> Регистрация</Link>
    </p>
  </section>
  )
}

export default Login;