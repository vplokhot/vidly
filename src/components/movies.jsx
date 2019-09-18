import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";
import Pagination from "./pagination";
import ListGroup from "./listGroup";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: "",
    sortColumn: {
      path: "title",
      order: "asc"
    }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres
    });
  }

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

  handleGenreSelect = genre => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1
    });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleSort = sortColumn => {
    this.setState({
      sortColumn
    });
  };

  resetMovies = () => {
    this.setState({ movies: getMovies() });
  };

  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      selectedGenre,
      sortColumn
    } = this.state;

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
        : allMovies;
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: movies };
  };

  render() {
    const { length } = this.state.movies;
    const { currentPage, pageSize, genres, sortColumn } = this.state;
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
    const { totalCount, data: movies } = this.getPagedData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} available movies.</p>
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            sortColumn={sortColumn}
            onDelete={this.handleMovieDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
