import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import HomePage from "./flights/pages/HomePage";
import FilteredFlights from "./flights/pages/FilteredFlights";
import Seats from "./flights/components/seats/Seats";
import Tickets from "./flights/components/payment/Tickets";
import CustomizeRows from "./flights/components/seats/customize/CustomizeRows";
import { FlightsContext } from "./shared/context/flights-context";

const dbFlights = [
  {
    id: "0",
    airline: "qatar",
    originCity: "Bengaluru",
    departureTime: "16:59",
    departureDate: "June 17",
    landingCity: "New Delhi",
    landingTime: "19:00",
    landingDate: "June 17",
    price: 100,
    rows: 6,
    cols: 6,
    seats: {
      A: [0, 0, 0, 0, 0, 0],
      B: [0, 0, 0, 0, 0, 0],
      C: [0, 0, 0, 0, 0, 0],
      D: [0, 0, 0, 0, 0, 0],
      E: [0, 0, 0, 0, 0, 0],
      F: [0, 0, 0, 0, 0, 0],
      G: [0, 0, 0, 0, 0, 0],
    },
  },
  {
    id: "2",
    airline: "swiss",
    originCity: "Bengaluru",
    departureTime: "16:59",
    departureDate: "June 17",
    landingCity: "New Delhi",
    landingTime: "19:00",
    landingDate: "June 17",
    price: 100,
    rows: 6,
    cols: 6,
    seats: {
      A: [0, 0, 0, 0, 0, 0],
      B: [0, 0, 0, 0, 0, 0],
      C: [0, 0, 0, 0, 0, 0],
      D: [0, 0, 0, 0, 0, 0],
      E: [0, 0, 0, 0, 0, 0],
      F: [0, 0, 0, 0, 0, 0],
      G: [0, 0, 0, 0, 0, 0],
    },
  },
];

function App() {
  const [flights, setFlights] = useState(dbFlights);

  const routes = (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/flights" exact>
        <FilteredFlights />
      </Route>
      <Route path="/flights/:id" exact>
        <Seats />
      </Route>
      <Route path="/flights/customize/:id" exact>
        <CustomizeRows />
      </Route>
      <Route path="/payment" exact>
        <Tickets />
      </Route>
      <Redirect to="/" />
    </Switch>
  );

  return (
    <Router>
      <MainNavigation />
      <FlightsContext.Provider value={{ flights, setFlights }}>
        <main>{routes}</main>
      </FlightsContext.Provider>
    </Router>
  );
}
export default App;
