import { createContext, useContext } from "react";

export const FlightsContext = createContext({
  flights: [],
  setFlights: () => null,
  filteredFlights: [],
  setFilteredFlights: () => null,
  returnFlights: [],
  setReturnFlights: () => null,
});

export const useFlightsContext = () => useContext(FlightsContext);
