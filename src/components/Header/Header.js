import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../images/logo.svg';
import account from '../../images/account.svg'
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    }
  
  return (
    
    <Switch>
      <Route exact path="/">
        <header className="header header__main">
          <Link to="/" className="header__logo">
            <img src={logo} alt="Логотип" />
          </Link>
          <div className={!isMenuOpen ? 'header__open-button' : 'header__close-button'} onClick={toggleBurgerMenu} />
          <div className={`header__menu ${isMenuOpen ?'header__menu_opened' : ''}`}>
          
            <div className="header__container">
              <Link to='/sign-up' className="header__sign">
                <p className="header__text">Регистрация</p>
              </Link>
              <Link to='/sign-in' className="header__sign">
                <p className="header__text">Войти</p>
              </Link>
            </div>
          </div>
        </header>  
      </Route>
    
      <Route path="/(profile|movies|saved-movies)">
        <header className="header">
          <Link to="/" className="header__logo">
            <img src={logo} alt="Логотип" />
          </Link>
          <div className={!isMenuOpen ? 'header__open-button' : 'header__close-button'} onClick={toggleBurgerMenu} />
          <div className={`header__menu ${isMenuOpen ?'header__menu_opened' : ''}`}>
            <div className="header__container">
              <Link to='/movies' className="header__item">
                <p>Фильмы</p>
              </Link> 
              <Link to='/saved-movies' className="header__item">
                <p>Сохраненные фильмы</p>
              </Link>
            </div>
            <div className="header__container">
              <Link to='/profile' className="header__account">
                <p>Аккаунт</p>
              </Link>
              <Link to='/profile' className="header__image">
                <img src={account} alt="Аккаунт" />
              </Link>
            </div>
          </div>  
        </header>
      </Route>
    </Switch>

);
}

export default Header;