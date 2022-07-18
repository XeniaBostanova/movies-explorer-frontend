import React, { useState } from 'react';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
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
import { mainApi } from '../../utils/MainApi';

function App() {

  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);

  function handleRegisterSubmit(name, email, password) {
    mainApi.register(name, email, password)
      .then(() => {
        handleLoginSubmit();
      })
      .catch((err) => {
        
      })
  }

  function handleLoginSubmit(email, password) {
    mainApi.authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch((err) => {

      })
  }

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
            {loggedIn ? <Redirect to="/" /> :
              <Register 
                onRegister={handleRegisterSubmit}
              />
            }  
          </Route>

          <Route path="/signin">
            {loggedIn ? <Redirect to="/" /> :
              <Login 
                onLogin={handleLoginSubmit}
              /> 
            }  
          </Route>

          <Route path="*">
            <NotFoundPage /> 
          </Route>

        </Switch>

    </div>
  );
}

export default App;
