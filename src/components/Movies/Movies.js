import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import Preloader from '../Preloader/Preloader';

function Movies({onSearch, preloader, isSearchDone, searchStatus, renderedMovies, savedMovies, onSaveMovie, onDeleteMovie, moreButtonVisibility, onRenderMovies}) {
  const moreButtonClassName = moreButtonVisibility ? `movies__button` : `movies__more-button movies__button_hidden`;

  return (
    <section className="movies">
      <SearchForm 
        onSearch={onSearch}
      />
       {preloader 
        ? <div className="movies__preloader-container">
            <Preloader /> 
          </div>
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
        {!preloader ? isSearchDone
          ? <div className="movies__btn-section">
              <button onClick={onRenderMovies} className={moreButtonClassName} type="button">Ещё</button>
            </div>
          : ("")
        : ("")
        }
      
    </section>
  )
}

export default Movies;
