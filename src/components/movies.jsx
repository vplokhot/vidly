import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleMovieDelete = movieId => {
    const updatedMovies = this.state.movies.filter(
      movie => movie._id !== movieId
    );
    this.setState({
      movies: updatedMovies
    });
  };

  resetMovies = () => {
    this.setState({ movies: getMovies() });
  };

  renderMovies = () => {
    if (this.state.movies.length === 0)
      return (
        <div>
          "No movies available."
          <button
            className="btn btn-info"
            onClick={() => {
              this.resetMovies();
            }}
          >
            Reset
          </button>
        </div>
      );

    return (
      <div className="container">
        <p>Showing {this.state.movies.length} available movies.</p>
        <div className="movieList">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Stock</th>
                <th scope="col">Rate</th>
                {/* empty table header for visual consistency; 
                    table margins are uneven without it
                */}
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {this.state.movies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <button
                      onClick={() => {
                        this.handleMovieDelete(movie._id);
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="container">
        <h1>Movies</h1>
        {this.renderMovies()}
      </div>
    );
  }
}

export default Movies;
