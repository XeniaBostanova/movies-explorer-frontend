import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header() {
  return (
    
    <Switch>
      <Route exact path="/">
        <header className="header header__main">
          <Link to="/" className="header__logo">
            <img src={logo} alt="Логотип" />
          </Link>
          <Navigation />
        </header>  
      </Route>
    
      <Route exact path="/(profile|movies|saved-movies)">
        <header className="header">
          <Link to="/" className="header__logo">
            <img src={logo} alt="Логотип" />
          </Link>
          <Navigation />
        </header>
      </Route>
    </Switch>

);
}

export default Header;