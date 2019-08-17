import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  listMovies = () => {
    console.log(this.state.movies);
  };

  render() {
    return (
      <div>
        <h1>Movies</h1>
        <ul>
          {this.state.movies.map(movie => (
            <li key={movie._id}>{movie.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Movies;
