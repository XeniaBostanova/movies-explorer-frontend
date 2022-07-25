import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
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
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {

  const history = useHistory();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [registerErrorMessage, setRegisterErrorMessage] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [profileMessage, setProfileMessage] = useState('');

  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    tokenCheck();
  }, [loggedIn])

  useEffect(() => {
    mainApi.getSavedMovies()
      .then((savedMoviesData) => {
        localStorage.setItem('savedMoviesStorage', JSON.stringify(savedMoviesData));
        setSavedMovies(JSON.parse(localStorage.getItem('savedMoviesStorage')));
      })
      .catch((err) => console.log(err));
  }, [currentUser])

  function handleRegisterSubmit(userData) {
    mainApi.register(userData)
      .then(() => {
        handleLoginSubmit({
          email: userData.email,
          password: userData.password
        });
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setRegisterErrorMessage('Пользователь с таким email уже существует');
        } else {
          setRegisterErrorMessage('При регистрации пользователя произошла ошибка');
        }
      });
  }

  function handleLoginSubmit(user) {
    mainApi.authorize(user)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch((err) => {
        if (err === 'Ошибка: 401') {
          setLoginErrorMessage('Неправильный логин или пароль');
        } else {
          setLoginErrorMessage('При авторизации пользователя произошла ошибка');
        }
      })
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {;
      mainApi.getUserInfo(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res);
            history.push(location);
          }
        })
        .catch((err) => console.log(err))
    }
  }

  function handleUpdateUser(user) {
    const token = localStorage.getItem('jwt');
    mainApi.editProfile(user, token)
      .then((newUser) => {
        setLoggedIn(true);
        setCurrentUser(newUser);
        localStorage.setItem('name', newUser.name);
        localStorage.setItem('email', newUser.email);
        setProfileMessage('Профиль успешно обновлен!');
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setProfileMessage('Пользователь с таким email уже существует');
        } else {
          setProfileMessage('При обновлении профиля произошла ошибка');
        }
      })
  }

  function handleSaveMovie(movie) {
    mainApi.saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies((movies) => [newMovie, ...movies]);
      })
      .catch((err) => console.log(err))
  }

  function handleDeleteMovie(movie) {
    mainApi.deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((movies) => movies.filter((m) => m._id !== movie._id));
      })
      .catch((err) => console.log(err))
  }

  function handleUserSignOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('request');
    localStorage.removeItem('checkboxStatus');
    localStorage.removeItem('initialMovies');
    localStorage.removeItem('moviesStorage');
    setLoggedIn(false);
    setCurrentUser({});
    history.push('/');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header loggedIn={loggedIn} />

        <Switch>
            <Route exact path="/">
              <Main />
            </Route>

            <ProtectedRoute
              path="/movies"
              component={Movies}
              loggedIn={loggedIn}
              savedMovies={savedMovies}
              onSaveMovie={handleSaveMovie}
              onDeleteMovie={handleDeleteMovie}
            />

            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              loggedIn={loggedIn}
              savedMovies={savedMovies}
              onDeleteMovie={handleDeleteMovie}
            />

            <ProtectedRoute
              path="/profile"
              component={Profile}
              loggedIn={loggedIn}
              onUpdateUser={handleUpdateUser}
              profileMessage={profileMessage}
              onSignOut={handleUserSignOut}
            />

            <Route path="/signup">
                <Register 
                  onRegister={handleRegisterSubmit}
                  registerErrorMessage={registerErrorMessage}
                />
            </Route>

            <Route path="/signin">
                <Login 
                  onLogin={handleLoginSubmit}
                  loginErrorMessage={loginErrorMessage}
                /> 
            </Route>

            <Route path="*">
              <NotFoundPage /> 
            </Route>

          </Switch>

          <Route exact path={["/", "/movies", "/saved-movies"]}>
            <Footer />
          </Route>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
