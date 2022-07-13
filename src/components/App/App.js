import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../Auth/Login';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Auth/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import './App.css';
import Header from '../Header/Header';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
          <Route exact path="/">
            <Main />
            <Footer />
          </Route>

          <Route path="/movies">
            <Movies />
            <Footer />
          </Route>

          <Route path="/saved-movies">
            <SavedMovies />
            <Footer />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/signup">
            <Register /> 
          </Route>

          <Route path="/signin">
            <Login /> 
          </Route>

          <Route path="*">
            <NotFoundPage /> 
          </Route>

        </Switch>

    </div>
  );
}

export default App;
