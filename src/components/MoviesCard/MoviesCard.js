import React from 'react';
import './MoviesCard.css';

function MoviesCard({movie}) {
  return (
    <div className="movie">
      <div className="movie__main-container">
        <div className="movie__container">
          <h2 className="movie__title">{movie.nameRU}</h2>
          <p className="movie__duration">{movie.duration}</p>
        </div>
        <button type="button" className="movie__save-button movie__save-button_active"></button>  
      </div>
      <img src={movie.image} alt={movie.nameRU} className="movie__image" />
    </div>
  )
}

export default MoviesCard;