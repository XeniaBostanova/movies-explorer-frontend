import React, {useContext, useEffect, useState} from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';

function Profile({onUpdateUser, onSignOut}) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [isCurrentName, setIsCurrentName] = useState(currentUser.name);
  const [email, setEmail] = useState('');
  const [isCurrentEmail, setIsCurrentEmail] = useState(currentUser.email);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email)
  }, [currentUser])

  useEffect(() =>{
    const localStorageName = localStorage.getItem('name');
    if (localStorageName) {
      setIsCurrentName(localStorageName);
    }
    const localStorageEmail = localStorage.getItem('email');
    if (localStorageEmail) {
      setIsCurrentEmail(localStorageEmail);
    }
  }, [handleSubmit]);

  function handleNameChange(e) {
    setName(e.target.value);
    if (isCurrentName !== name && !e.target.validationMessage) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    if (isCurrentEmail !== email && !e.target.validationMessage) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      email,
    });
  }

  return(
    <section className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__form">
        <div className="profile__container">
          <label htmlFor="name-input" className="profile__label">Имя</label>
          <input 
            id="name-input"
            type="text"
            name="name"
            value={name || ''}
            onChange={handleNameChange}
            className="profile__form-item profile__form-item_type_name"
            minLength="2" maxLength="40" required>{currentUser.name}</input>
        </div>
        <div className="profile__container">
          <label htmlFor="email-input" className="profile__label">E-mail</label>
          <input 
            id="email-input"
            type="email"
            name="email"
            value={email || ''}
            onChange={handleEmailChange}
            className="profile__form-item profile__form-item_type_email"
            required>{currentUser.email}</input>
        </div>
      </form>
      <p 
        className="profile__submit"
        onSubmit={handleSubmit}
        disabled={disabled}>Редактировать</p>
      <p className="profile__link" onClick={onSignOut}>Выйти из аккаунта</p>
    </section>
  )
}

export default Profile;