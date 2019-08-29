import React, { Component } from "react";

const Like = props => {
  let heartClass = "fa fa-heart";
  // If the movie isn't "liked" render the open heart icon
  if (!props.liked) {
    heartClass += "-o";
  }

  return (
    <i
      onClick={props.onClick}
      className={heartClass}
      style={{
        cursor: "pointer"
      }}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
