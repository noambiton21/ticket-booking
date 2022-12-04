import React from "react";
import airplane from "../../img/airplane.jpg";
import SearchFlightCard from "../components/Cards/SearchFlightCard";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/material";

const HomePage = () => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div style={{ textAlign: "center" }}>
      {isMobileView ? (
        <h3>Find And Book Your Flight</h3>
      ) : (
        <h1>Find And Book Your Flight</h1>
      )}

      <Box
        component="img"
        sx={{
          display: isMobileView ? "none" : "",
          width: "50%",
        }}
        alt="Airplane img"
        src={airplane}
      />

      <SearchFlightCard />
      <h6>NY-TRAVEL SUPPORT</h6>
    </div>
  );
};

export default HomePage;
