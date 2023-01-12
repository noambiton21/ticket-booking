import React, { useContext } from "react";
import airplane from "../../img/airplane.jpg";
import SearchFlightCard from "../components/Cards/SearchFlightCard";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/material";
import { AuthContext } from "../../shared/context/auth-context";
import AddFlight from "../components/AddFlight/AddFlight";

const HomePage = () => {
  const auth = useContext(AuthContext);
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));

  if (auth.userId === "63a174c8007936dd1bef7414") {
    return (
      <div style={{ textAlign: "center" }}>
        <Box
          component="img"
          sx={{
            display: isMobileView ? "none" : "",
            width: "50%",
            mt: 2,
          }}
          alt="Airplane img"
          src={airplane}
        />
        <h3>Add new flight</h3>
        <AddFlight />
      </div>
    );
  }

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
