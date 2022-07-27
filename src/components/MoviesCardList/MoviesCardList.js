import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  movies,
  savedMovies,
  onSaveMovie,
  onDeleteMovie,
  preloader,
  isSearchDone,
  onRenderMovies,
  moreButtonVisibility,
  }) {

  const moreButtonClassName = moreButtonVisibility ? `movies-list__button` : `movies-list__more-button movies-list__button_hidden`;

  return (
    <section className="movies-container">
      <ul className="movies-list">
        {
          movies.map(movie => (
            <MoviesCard
              movie={movie}
              key={movie._id || movie.id}
              savedMovies={savedMovies}
              onSaveMovie={onSaveMovie}
              onDeleteMovie={onDeleteMovie}
            />
          ))
        }
      </ul>
      {!preloader ? isSearchDone
          ? <div className="movies-list__btn-section">
              <button onClick={onRenderMovies} className={moreButtonClassName} type="button">Ещё</button>
            </div>
          : ("")
        : ("")
        }
    </section>
  )
}

export default MoviesCardList;