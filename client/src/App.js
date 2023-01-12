import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useAuth } from "./shared/hooks/auth-hook";
import { AuthContext } from "./shared/context/auth-context";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import HomePage from "./flights/pages/HomePage";
import SearchFlightCard from "./flights/components/Cards/SearchFlightCard";
import FilteredFlights from "./flights/pages/FilteredFlights";
import Seats from "./flights/components/seats/Seats";
import Tickets from "./flights/components/payment/Tickets";
import CustomizeRows from "./flights/components/seats/customize/CustomizeRows";
import { FlightsContext } from "./shared/context/flights-context";
import { getFlights } from "./services/flight.service";
import { CartContext } from "./shared/context/cart-context";

function App() {
  const { token, login, logout, userId, userFirstName } = useAuth();
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getFlights().then((allFlights) => {
      setFlights(allFlights);
      console.log(allFlights);
    });
  }, []);

  const routes = (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/flights" exact>
        <FilteredFlights />
      </Route>
      <Route path="/search" exact>
        <div>
          <h1 style={{ textAlign: "center", padding: "20px" }}>
            Search your flight
          </h1>
          <SearchFlightCard />
        </div>
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
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        userFirstName: userFirstName,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <CartContext.Provider value={{ cart, setCart }}>
          <FlightsContext.Provider
            value={{
              flights,
              setFlights,
              filteredFlights,
              setFilteredFlights,
              returnFlights,
              setReturnFlights,
            }}
          >
            <main>{routes}</main>
          </FlightsContext.Provider>
        </CartContext.Provider>
      </Router>
    </AuthContext.Provider>
  );
}
export default App;
