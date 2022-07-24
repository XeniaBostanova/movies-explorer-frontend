function MoviesFilter(movies, request, checkboxStatus) {
  let moviesFilter = movies;
  let result;

  if (checkboxStatus) {
    moviesFilter = moviesFilter.filter((movie) => movie.duration <= 40);
  }

  result = moviesFilter.filter((movie) => {
    return movie.nameRU.toLowerCase().includes(request.toLowerCase());
  })
  return result;
}

export default MoviesFilter;