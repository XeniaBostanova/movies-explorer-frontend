import React, { useCallback, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './MoviesCard.css';
import {MOVIES_URL} from '../../utils/constants';

function MoviesCard({movie,savedMovies, onSaveMovie, onDeleteMovie}) {
  const [isActiveSaveButton, setIsActiveSaveButton] = useState(false);

  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;

  const movieSaveButtonClassName = `movie__save-button ${isActiveSaveButton && 'movie__save-button_active'}`;

  const findSavedMovie = savedMovies.find((item) => item.movieId === movie.movieId);
  const activateSaveButton = useCallback(() => {
    if (findSavedMovie) {
      setIsActiveSaveButton(true);
    } else {
      setIsActiveSaveButton(false);
    }
  }, [movie.movieId, savedMovies]);

  useEffect(() => {
    activateSaveButton();
  }, [activateSaveButton]);

  function onClickUrl(url) {
    return () => window.open(url, '_blank', 'noopener,noreferrer');
  }

  function handleSaveMovie() {
    if (!isActiveSaveButton) {
      onSaveMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${MOVIES_URL}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `${MOVIES_URL}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      });
      setIsActiveSaveButton(true);
    } else {
      onDeleteMovie(findSavedMovie);
      setIsActiveSaveButton(false);
    }
  }

  function handleDeleteMovie() {
    onDeleteMovie(movie);
  }

  return (
    <li className="movie">
      <div className="movie__main-container">
        <div className="movie__container">
          <h2 className="movie__title">{movie.nameRU}</h2>
          <p className="movie__duration">{hours !==0 ? `${hours}ч` : ""} {minutes !==0 ? `${minutes}м` : ""}</p>
        </div>
        <Switch>
          <Route path='/movies'>
            <button
              type="button"
              onClick={handleSaveMovie}
              className={movieSaveButtonClassName}>
            </button>  
          </Route>

          <Route path='/saved-movies'>
            <button
              type="button"
              onClick={handleDeleteMovie}
              className="movie__save-button movie__delete-button">
            </button>
          </Route>
        </Switch>
        
      </div>
      <img src={`${MOVIES_URL}${movie.image.url}`} alt={movie.nameRU} onClick={onClickUrl(`${movie.trailerLink}`)} className="movie__image" />
    </li>
  )
}

export default MoviesCard;