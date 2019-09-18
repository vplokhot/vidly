import React from "react";
import "./App.css";
import Movies from "./components/movies";
import NavBar from "./components/common/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./components/notFound";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import MovieForm from "./components/common/movieForm";
function App() {
  return (
    <div className="App">
      <NavBar />

      <main className="container">
        <Switch>
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/404" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/404" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
