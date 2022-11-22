import React from "react";
import "./App.css";

import MainNevigation from "./shared/components/Navigation/MainNevigation";
import main from "./img/main.jpg";
import SearchFlightCard from "./shared/components/Cards/SearchFlightCard";

function App() {
  return (
    <div className="App">
      <MainNevigation />
      <div
        style={{
          backgroundImage: `url(${main})`,
          height: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <SearchFlightCard />
      </div>
    </div>
  );
}

export default App;
