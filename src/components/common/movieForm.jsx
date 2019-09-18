import React, { Component } from "react";

const MovieForm = ({ match, history }) => {
  const movieId = match.params.id;

  return (
    <div>
      <h1>Movie Form: {movieId}</h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/movies")}
      >
        Save
      </button>
    </div>
  );
};

export default MovieForm;
