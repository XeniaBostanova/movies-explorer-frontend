import React, { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import moviesFilter from '../../utils/MoviesFilter'

function SavedMovies({savedMovies, onDeleteMovie}) {
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [request, setRequest] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState(false);
  
  const [preloader, setPreloader] = useState(false);
  const [isSearchDone, setIsSearchDone] = useState(false);

  function handleSearchSavedMovie(request, checkboxStatus) {
    launchPreloader();
    const searchResult = moviesFilter(savedMovies, request, checkboxStatus);
    setFilteredSavedMovies(searchResult);
    setRequest(request);
    setCheckboxStatus(checkboxStatus);
    setIsSearchDone(true);
  }

  function launchPreloader() {
    setPreloader(true);
    setTimeout(() => setPreloader(false), 700);
  }

  useEffect(() => {
    if (filteredSavedMovies.length > 0) {
      const searchResult = moviesFilter(savedMovies, request, checkboxStatus);
      setFilteredSavedMovies(searchResult);
    }
  }, [savedMovies]);

  return (
    <section className="saved-movies">
      <SearchForm 
        onSearch={handleSearchSavedMovie}
      />
      {preloader
        ? <div className="saved-movies__preloader-container">
            <Preloader /> 
          </div>
        : isSearchDone
          ? filteredSavedMovies.length > 0
            ? <MoviesCardList 
                movies={filteredSavedMovies}
                savedMovies={savedMovies}
                onDeleteMovie={onDeleteMovie}
              />
            : (
              <div className="saved-movies__span">
                <span className="saved-movies__span-item">Ничего не найдено</span>
              </div>
            )
          : (
            <MoviesCardList 
                movies={savedMovies}
                savedMovies={savedMovies}
                onDeleteMovie={onDeleteMovie}
              />
            )
      }
      
    </section>
  )
}

export default SavedMovies;
