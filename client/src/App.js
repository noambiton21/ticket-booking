import React, { useState } from "react";
import "./App.css";

import MainNevigation from "./shared/components/Navigation/MainNevigation";

import airplane from "./img/airplane.jpg";
import SearchFlightCard from "./shared/components/Cards/SearchFlightCard";

function App() {
  return (
    <div className="App">
      <MainNevigation />

      <h1>Find And Book Your Flight</h1>
      <img src={airplane}></img>
      <SearchFlightCard />
      <h6>NY-TRAVEL SUPPORT</h6>
    </div>
  );
}

export default App;
