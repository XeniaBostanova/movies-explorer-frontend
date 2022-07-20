import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import account from '../../images/account.svg'
import './Navigation.css';

function Navigation({loggedIn}) {
  return (
    <nav className="nav">
      {!loggedIn ? (         
        <>
          <nav className="nav__container">
            <Link to='/signup' className="nav__sign">
              <p className="nav__text">Регистрация</p>
            </Link>
            <Link to='/signin' className="nav__sign">
              <p className="nav__text">Войти</p>
            </Link>
          </nav>
        </>
      ) : (
        <>  
          <nav className="nav__container nav__container_desktop">
            <div className="nav__item-container">
              <NavLink to='/movies' className="nav__item" activeClassName="nav__item_active">Фильмы</NavLink> 
              <NavLink to='/saved-movies' className="nav__item" activeClassName="nav__item_active">Сохраненные фильмы</NavLink>
            </div>
            <div className="nav__account-container">
              <Link to='/profile' className="nav__account">Аккаунт</Link>
              <Link to='/profile' className="nav__image">
                <img src={account} alt="Аккаунт" />
              </Link>
            </div>
          </nav> 

          <div className="nav-burger">
            <input id="nav__toggle" type="checkbox" />
            <label className="nav__btn" htmlFor="nav__toggle">
              <span></span>
            </label>
            <nav className="nav__container__mobile">
              <div className="nav__item-container">
                <Link to='/' className="nav__item">Главная</Link>
                <NavLink to='/movies' className="nav__item" activeClassName="nav__item_active">Фильмы</NavLink> 
                <NavLink to='/saved-movies' className="nav__item" activeClassName="nav__item_active">Сохраненные фильмы</NavLink>
              </div>
              <div className="nav__account-container"> 
                <Link to='/profile' className="nav__account">Аккаунт</Link>
                <Link to='/profile' className="nav__image">
                  <img src={account} alt="Аккаунт" />
                </Link>
              </div>  
            </nav>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navigation;