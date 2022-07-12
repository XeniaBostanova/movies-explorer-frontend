import React from 'react';
import './MoviesCardList.css';
import {movies} from '../../utils/movies'
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
  return (
    <section className="movies-container">
      <div className="movies-list">
        {
          movies.map(movie => (
            <MoviesCard
              movie={movie}
              key={movie._id || movie.id}
            />
          ))
        }
      </div>  
      <button className="movies-list__button" type="button">Ещё</button>
    </section>
  )
}

export default MoviesCardList;