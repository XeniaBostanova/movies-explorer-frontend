import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({movies}) {
  return (
    <section className="movies-container">
      <ul className="movies-list">
        {
          movies.map(movie => (
            <MoviesCard
              movie={movie}
              key={movie._id || movie.id}
            />
          ))
        }
      </ul>  
      <button className="movies-list__button" type="button">Ещё</button>
    </section>
  )
}

export default MoviesCardList;