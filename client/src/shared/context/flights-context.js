import { createContext, useContext } from "react";

export const FlightsContext = createContext({
  flights: [],
  setFlights: () => null,
});

export const useFlightsContext = () => useContext(FlightsContext);
