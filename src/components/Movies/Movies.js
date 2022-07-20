import React, { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import {moviesApi} from '../../utils/MoviesApi';

function Movies({loggedIn}) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    moviesApi.getMovies()
      .then((movies) => {
        setMovies(movies);
      })
      .catch((err) => console.log(err));
  }, [loggedIn])

  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList 
        movies={movies}
      />
    </section>
  )
}

export default Movies;