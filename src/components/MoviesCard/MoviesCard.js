import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({movie}) {
  return (
    <div className="movie">
      <div className="movie__main-container">
        <div className="movie__container">
          <h2 className="movie__title">{movie.nameRU}</h2>
          <p className="movie__duration">{movie.duration}</p>
        </div>
        <Switch>
          <Route path='/movies'>
            <button type="button" className="movie__save-button movie__save-button_active"></button>  
          </Route>

          <Route path='/saved-movies'>
            <button type="button" className="movie__save-button movie__delete-button"></button>
          </Route>
        </Switch>
        
      </div>
      <img src={movie.image} alt={movie.nameRU} className="movie__image" />
    </div>
  )
}

export default MoviesCard;