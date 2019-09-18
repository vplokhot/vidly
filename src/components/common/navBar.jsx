import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Vidly
      </Link>
      <NavLink className="nav-item nav-link" to="/movies">
        Movies
      </NavLink>
      <NavLink className="nav-item nav-link" to="/customers">
        Customers
      </NavLink>
      <NavLink className="nav-item nav-link" to="Rentals">
        Rentals
      </NavLink>
    </nav>
  );
};

export default NavBar;
