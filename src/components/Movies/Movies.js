import React, { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import {moviesApi} from '../../utils/MoviesApi';

function Movies({savedMovies, onSaveMovie, onDeleteMovie}) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const moviesList = JSON.parse(localStorage.getItem('moviesStorage'));
    if (moviesList) {
      setMovies(movies);
    }
  }, [])

  function handleSearchMovie() {
    moviesApi.getMovies()
      .then((movies) => {
        setMovies(movies);
        localStorage.setItem('moviesStorage', JSON.stringify(movies));
      })
      .catch((err) => console.log(err));
  }

  return (
    <section className="movies">
      <SearchForm 
        onSearch={handleSearchMovie}
      />
      <MoviesCardList 
        movies={movies}
        savedMovies={savedMovies}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}
      />
    </section>
  )
}

export default Movies;