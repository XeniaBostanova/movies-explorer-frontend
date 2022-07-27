import { SHORT_FILM } from "./constants";

function MoviesFilter(movies, request, checkboxStatus) {
  let moviesFilter = movies;
  let result;

  if (checkboxStatus) {
    moviesFilter = moviesFilter.filter((movie) => movie.duration <= SHORT_FILM);
  }

  result = moviesFilter.filter((movie) => {
    return movie.nameRU.toLowerCase().includes(request.toLowerCase());
  })
  return result;
}

export default MoviesFilter;