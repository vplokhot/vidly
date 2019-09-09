export function genreFilter(movies, genre) {
  console.log("genre", genre);
  if (genre === "All") {
    return movies;
  }
  const genreMovies = movies.filter(movie => movie.genre.name === genre);
  return genreMovies;
}
