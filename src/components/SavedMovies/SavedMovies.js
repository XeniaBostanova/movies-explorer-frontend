import React, { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import moviesFilter from '../../utils/MoviesFilter';

function SavedMovies({savedMovies, onDeleteMovie}) {
  const [request, setRequest] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isSearchDone, setIsSearchDone] = useState(false);
  const [preloader, setPreloader] = useState(false);

  function handleSearchSavedMovie(request, checkboxStatus) {
    launchPreloader();
    const searchResult = moviesFilter(savedMovies, request, checkboxStatus);
    setFilteredMovies(searchResult);
    setRequest(request);
    setCheckboxStatus(checkboxStatus);
    setIsSearchDone(true);
  }

  function launchPreloader() {
    setPreloader(true);
    setTimeout(() => setPreloader(false), 700);
  }

  useEffect(() => {
    if (filteredMovies.length > 0) {
      const searchResult = moviesFilter(savedMovies, request, checkboxStatus);
      setFilteredMovies(searchResult);
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
          ? filteredMovies.length > 0
            ? <MoviesCardList 
                movies={filteredMovies}
                savedMovies={savedMovies}
                onDeleteMovie={onDeleteMovie}
              />
            : 
              <div className="saved-movies__span">
                <span className="saved-movies__span-item">Ничего не найдено</span>
              </div>
          : <MoviesCardList 
              movies={savedMovies}
              savedMovies={savedMovies}
              onDeleteMovie={onDeleteMovie}
            />
      }
      
    </section>
  )
}

export default SavedMovies;
