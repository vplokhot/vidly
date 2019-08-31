import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./like";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1
  };

  handleMovieDelete = movieId => {
    const updatedMovies = this.state.movies.filter(
      movie => movie._id !== movieId
    );
    this.setState({
      movies: updatedMovies
    });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  resetMovies = () => {
    this.setState({ movies: getMovies() });
  };

  render() {
    const { length } = this.state.movies;
    const { currentPage, pageSize, movies: allMovies } = this.state;
    if (length === 0)
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
    const movies = paginate(allMovies, currentPage, pageSize);

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
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
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
          <Pagination
            itemsCount={length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }

  // render() {
  //   return (
  //     <div className="container">
  //       <h1>Movies</h1>
  //       {this.renderMovies()}
  //     </div>
  //   );
  // }
}

export default Movies;
