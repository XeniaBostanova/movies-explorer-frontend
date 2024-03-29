import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory, useLocation, Redirect } from 'react-router-dom';
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
import { moviesApi } from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import moviesFilter from '../../utils/MoviesFilter'
import { DESKTOP_MORE, DESKTOP_RESULT, DESKTOP_WIDTH, MOBILE_MORE, MOBILE_RESULT, MOBILE_WIDTH, TABLET_MORE, TABLET_RESULT } from '../../utils/constants';
import ErrorPopup from '../ErrorPopup/ErrorPopup';

function App() {

  const history = useHistory();
  const location = useLocation();
  const currentViewport = document.documentElement.clientWidth;

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [registerErrorMessage, setRegisterErrorMessage] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [profileMessage, setProfileMessage] = useState('');

  const [initialMovies, setInitialMovies] = useState([]);
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [request, setRequest] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState(false);
  
  const [preloader, setPreloader] = useState(false);
  const [searchStatus, setSearchStatus] = useState('');
  const [isSearchDone, setIsSearchDone] = useState(false);
    
  const [firstResults, setFirstResults] = useState(0);
  const [moreResults, setMoreResults] = useState(0);
  const [moreButtonVisibility, setMoreButtonVisibility] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);

  const [errorPopupIsOpen, setErrorPopupIsOpen] = useState(false);

  useEffect(() => {
    tokenCheck();
  }, [loggedIn])

  useEffect(() => {
    if (localStorage.getItem('moviesStorage')) {
      const initialSearch = JSON.parse(localStorage.getItem('moviesStorage'));
      const searchResult = moviesFilter(initialSearch, request, checkboxStatus);

      setFilteredMovies(searchResult);
      setIsSearchDone(true);
    }
  }, [currentUser])

  useEffect(() => {
    if (loggedIn) {
      mainApi.getSavedMovies()
      .then((savedMoviesData) => {
        setSavedMovies(savedMoviesData.filter((m) => m.owner === currentUser._id));
      })
      .catch(() => setErrorPopupIsOpen(true));
    }
  }, [loggedIn])

  //Функционал Регистрация/Логин/Профиль

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
        .catch(() => setErrorPopupIsOpen(true))
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

  //Функционал Фильмы

  function launchPreloader() {
    setPreloader(true);
    setTimeout(() => setPreloader(false), 700);
  }

  function handleSearchMovie(request, checkboxStatus) {
    launchPreloader();
    setRenderedMovies([]);
    setRequest(request);
    setCheckboxStatus(checkboxStatus);

    const initialMoviesInLocalStorage = JSON.parse(localStorage.getItem('initialMovies'));

    if (!initialMoviesInLocalStorage) {
      setPreloader(true);
      moviesApi.getMovies()
        .then((moviesData) => {
          setInitialMovies(moviesData);
          localStorage.setItem('initialMovies', JSON.stringify(moviesData));
        })
        .catch(() => {
          setSearchStatus('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
        })
        .finally(() => {
          setPreloader(false);
        })
    } else {
      setInitialMovies(initialMoviesInLocalStorage);
    }
  }
  
  useEffect(() => {
    if (initialMovies.length > 0) {
      const moviesStorage = moviesFilter(initialMovies, request, checkboxStatus);
      
      localStorage.setItem('moviesStorage', JSON.stringify(moviesStorage));
      localStorage.setItem('request', request);
      localStorage.setItem('checkboxStatus', checkboxStatus);

      setFilteredMovies(moviesStorage);
      setIsSearchDone(true);
    }
  }, [initialMovies, request, checkboxStatus]);

  function renderMovies() {
    setRenderedMovies((state) => filteredMovies.slice(0, state.length + moreResults));
  }

  useEffect(() => {
    if (renderedMovies.length === filteredMovies.length) {
      setMoreButtonVisibility(false);
    }
  }, [renderedMovies, filteredMovies]);

  //Функционал сохранение/удаление

  function handleSaveMovie(movie) {
    mainApi.saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies((movies) => [newMovie, ...movies]);
      })
      .catch(() => setErrorPopupIsOpen(true))
  }

  function handleDeleteMovie(movie) {
    mainApi.deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((movies) => movies.filter((m) => m._id !== movie._id));
      })
      .catch(() => setErrorPopupIsOpen(true))
  }

  //Изменение ширины экрана и показ кол-ва карточек

  useEffect(() => {
    if (currentViewport <= MOBILE_WIDTH) {
      setFirstResults(MOBILE_RESULT);
      setMoreResults(MOBILE_MORE);
    } else if (currentViewport <= DESKTOP_WIDTH) {
      setFirstResults(TABLET_RESULT);
      setMoreResults(TABLET_MORE);
    } else if (currentViewport > DESKTOP_WIDTH) {
      setFirstResults(DESKTOP_RESULT);
      setMoreResults(DESKTOP_MORE);
    }
  }, [currentViewport]);
    
  useEffect(() => {
    if (filteredMovies.length > 0) {
      if (filteredMovies.length > firstResults) {  
        setRenderedMovies(filteredMovies.slice(0, firstResults));
        setMoreButtonVisibility(true);
      } else {
        setRenderedMovies(filteredMovies);
      }
    }
  }, [filteredMovies, firstResults]);

  //Выход из системы

  function handleUserSignOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('request');
    localStorage.removeItem('checkboxStatus');
    localStorage.removeItem('initialMovies');
    localStorage.removeItem('moviesStorage');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    setInitialMovies([]);
    setSavedMovies([]);
    setFilteredMovies([]);
    setRequest('');
    setCheckboxStatus(false);
    setLoggedIn(false);
    setCurrentUser({});
    history.push('/');
  }

  function closeErrorPopup() {
    setErrorPopupIsOpen(false);
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
              onSearch={handleSearchMovie}
              preloader={preloader}
              isSearchDone={isSearchDone}
              searchStatus={searchStatus}
              renderedMovies={renderedMovies}
              savedMovies={savedMovies}
              onSaveMovie={handleSaveMovie}
              onDeleteMovie={handleDeleteMovie}
              moreButtonVisibility={moreButtonVisibility}
              onRenderMovies={renderMovies}
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
              {loggedIn ? <Redirect to='/' /> :
                <Register 
                  onRegister={handleRegisterSubmit}
                  registerErrorMessage={registerErrorMessage}
                />
              }  
            </Route>

            <Route path="/signin">
              {loggedIn ? <Redirect to='/' /> :
                <Login 
                  onLogin={handleLoginSubmit}
                  loginErrorMessage={loginErrorMessage}
                />
              }  
            </Route>

            <Route path="*">
              <NotFoundPage /> 
            </Route>

          </Switch>

          <Route exact path={["/", "/movies", "/saved-movies"]}>
            <Footer />
          </Route>

          <ErrorPopup 
            isOpen={errorPopupIsOpen}
            onClose={closeErrorPopup}
          />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
