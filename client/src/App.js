import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import MainNevigation from "./shared/components/Navigation/MainNevigation";
import HomePage from "./flights/pages/HomePage";

function App() {
  const routes = (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/flights" exact>
        <HomePage />
      </Route>

      <Redirect to="/" />
    </Switch>
  );

  return (
    <Router>
      <MainNevigation />
      <main>{routes}</main>
    </Router>
  );
}

export default App;
