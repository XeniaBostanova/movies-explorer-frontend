import React, { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import {moviesApi} from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import moviesFilter from '../../utils/MoviesFilter';

function Movies({savedMovies, onSaveMovie, onDeleteMovie}) {
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

  const moreButtonClassName = moreButtonVisibility ? `movies__button` : `movies__more-button movies__button_hidden`;
  const currentViewport = document.documentElement.clientWidth;

  useEffect(() => {
    if (localStorage.getItem('moviesStorage')) {
      const initialSearch = JSON.parse(localStorage.getItem('moviesStorage'));
      const searchResult = moviesFilter(initialSearch, request, checkboxStatus);

      setFilteredMovies(searchResult);
      setIsSearchDone(true);
    }
  }, [])

  function launchPreloader() {
    setPreloader(true);
    setTimeout(() => setPreloader(false), 700);
  }

  const handleSearchMovie = (request, checkboxStatus) => {
    launchPreloader();
    setRenderedMovies([]);
    setRequest(request);
    setCheckboxStatus(checkboxStatus);

    const initialMoviesInLocalStorage = JSON.parse(localStorage.getItem('initialMovies'));

    if (!initialMoviesInLocalStorage) {
      setPreloader(true);
      moviesApi.getMovies()
        .then((data) => {
          setInitialMovies(data);
          localStorage.setItem('initialMovies', JSON.stringify(data));
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

  useEffect(() => {
    if (currentViewport <= 480) {
      setFirstResults(5);
      setMoreResults(2);
    } else if (currentViewport <= 768) {
      setFirstResults(8);
      setMoreResults(2);
    } else if (currentViewport > 768) {
      setFirstResults(12);
      setMoreResults(8);
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

  function renderMovies() {
    setRenderedMovies((state) => filteredMovies.slice(0, state.length + moreResults));
  }

  useEffect(() => {
    if (renderedMovies.length === filteredMovies.length) {
      setMoreButtonVisibility(false);
    }
  }, [renderedMovies, filteredMovies]);

  return (
    <section className="movies">
      <SearchForm 
        onSearch={handleSearchMovie}
      />
       {preloader 
        ? <Preloader /> 
        : isSearchDone
          ? renderedMovies.length > 0
            ? <MoviesCardList 
              movies={renderedMovies}
              savedMovies={savedMovies}
              onSaveMovie={onSaveMovie}
              onDeleteMovie={onDeleteMovie}
              />
            : (!preloader ?
              <div className="movies__span">
                <span className="movies__span-item">Ничего не найдено</span>
              </div>
              :
              <div className="movies__span"> 
                <span className="movies__span-item">{searchStatus}</span>
              </div>
            )
          : ("")
      }
      <div className="movies__btn-section">
        <button onClick={renderMovies} className={moreButtonClassName} type="button">Ещё</button>
      </div>
    </section>
  )
}

export default Movies;
