import React, {useContext, useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/validation';
import './Profile.css';

function Profile({onUpdateUser, profileMessage, onSignOut}) {
  const location = useLocation();

  const currentUser = useContext(CurrentUserContext);
  const { values, setValues, errors, setErrors, handleChange, isValid, setIsValid } = useFormWithValidation();

  const [profileMessageText, setProfileMessageText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (values.name === currentUser.name || values.email === currentUser.email) {
      setIsValid(false);
    } else {
      onUpdateUser({
        name: values.name,
        email: values.email,
      });
    }
  }

  const handleChangeName = (e) => {
    if (e.target.value === currentUser.name || e.target.value === currentUser.email) {
      setIsValid(false);
      setErrors({
        errors: errors.name, 
        [e.target.name]: 'Имя должно отличаться от текущего'
      })
    } else {
      handleChange(e);
    }
  };

  const handleChangeEmail = (e) => {
    if (e.target.value === currentUser.name || e.target.value === currentUser.email) {
      setIsValid(false);
      setErrors({
        errors: errors.name, 
        [e.target.name]: 'Email должен отличаться от текущего'
      });
    } else {
      handleChange(e);
    }
  };

  useEffect(() => {
    setProfileMessageText(profileMessage);
  }, [profileMessage]);

  useEffect(() => {
    setProfileMessageText('');
  }, [location]);

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email
    });
    setIsValid(false);
  }, [currentUser, setValues])

  return(
    <section className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__form" onSubmit={handleSubmit}>
        <div className="profile__container">
          <label htmlFor="name-input" className="profile__label">Имя</label>
          <input 
            id="name-input"
            type="text"
            name="name"
            value={values.name || ''}
            onChange={handleChangeName}
            pattern="^[а-яА-Яa-zA-ZЁё\-\s]*$"
            className="profile__form-item profile__form-item_type_name"
            minLength="2" maxLength="40" required  />
        </div>
        <span className="profile__input-error">{errors.name || ''}</span>
        <div className="profile__container">
          <label htmlFor="email-input" className="profile__label">E-mail</label>
          <input 
            id="email-input"
            type="email"
            name="email"
            value={values.email || ''}
            onChange={handleChangeEmail}
            pattern = "^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"
            className="profile__form-item profile__form-item_type_email"
            required />
        </div>
        <span className="profile__input-error">{errors.email || ''}</span>
        <span className="profile__message-error">{profileMessageText}</span>
        <button
          type="submit"
          className="profile__submit"
          disabled={!isValid}>Редактировать</button>
      </form>
      <p className="profile__link" onClick={onSignOut}>Выйти из аккаунта</p>
    </section>
  )
}

export default Profile;