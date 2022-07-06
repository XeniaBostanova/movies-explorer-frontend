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

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <Route path="/movies">
            <Movies />
          </Route>

          <Route path="/saved-movies">
            <SavedMovies />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/sign-up">
            <Register /> 
          </Route>

          <Route path="/sign-in">
            <Login /> 
          </Route>

          <Route path="*">
            <NotFoundPage /> 
          </Route>
          
          {/* <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route> */}

        </Switch>

    </div>
  );
}

export default App;
