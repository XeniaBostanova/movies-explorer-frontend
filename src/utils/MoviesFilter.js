function MoviesFilter(movies, request, checkboxStatus) {
  let moviesFilter = movies;
  let result;

  if (checkboxStatus) {
    moviesFilter = moviesFilter.filter((movie) => movie.duration <= 40);
  }

  result = moviesFilter.filter((movie) => {
    return movie.nameRU.toLowerCase().indexOf(request.toLowerCase()) !== -1;
  })
  return result;
}

export default MoviesFilter;