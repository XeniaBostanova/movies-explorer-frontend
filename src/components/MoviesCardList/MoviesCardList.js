import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({movies, savedMovies, onSaveMovie, onDeleteMovie}) {
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
    </section>
  )
}

export default MoviesCardList;