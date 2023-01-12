import React from "react";

import { Card, Box, Typography } from "@mui/material";
import DisplayFlightCard from "../components/Cards/DisplayFlightCard";
import { useFlightsContext } from "../../shared/context/flights-context";

const FilteredFlights = () => {
  const {
    filteredFlights,
    setFilteredFlights,
    returnFlights,
    setReturnFlights,
  } = useFlightsContext();
  console.log(filteredFlights);

  if (!(filteredFlights.length != 0)) {
    return <h1 style={{ textAlign: "center" }}>There is no flights to show</h1>;
  }

  if (returnFlights.length > 0) {
    return (
      <div>
        <Card sx={{ m: "auto", width: "40vw", mt: 5 }}>
          <Box sx={{ backgroundColor: "#24354f", p: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
                m: 1,

                borderRadius: 1,
              }}
            >
              <Box sx={{ textAlign: "center", color: "#ffff" }}>
                <Typography variant="caption">From</Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {filteredFlights[0].fromAirPortCode}
                </Typography>
                <Typography variant="caption">
                  {filteredFlights[0].originCity}l
                </Typography>
              </Box>
              <Box
                style={{
                  marginTop: "15px",
                }}
              >
                <img
                  style={{ width: "30px", color: "#ffff" }}
                  src="https://github.com/pizza3/asset/blob/master/airplane2.png?raw=true"
                />
              </Box>
              <Box>
                <Box sx={{ textAlign: "center", color: "#ffff" }}>
                  <Typography variant="caption">To</Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {filteredFlights[0].toAirPortCode}
                  </Typography>
                  <Typography variant="caption">
                    {filteredFlights[0].landingCity}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <DisplayFlightCard flightsToDisplay={filteredFlights} />
        </Card>
        <Card sx={{ m: "auto", width: "40vw", mt: 5 }}>
          <Box sx={{ backgroundColor: "#24354f", p: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
                m: 1,

                borderRadius: 1,
              }}
            >
              <Box sx={{ textAlign: "center", color: "#ffff" }}>
                <Typography variant="caption">From</Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {returnFlights[0].fromAirPortCode}
                </Typography>
                <Typography variant="caption">
                  {returnFlights[0].originCity}l
                </Typography>
              </Box>
              <Box
                style={{
                  marginTop: "15px",
                }}
              >
                <img
                  style={{ width: "30px", color: "#ffff" }}
                  src="https://github.com/pizza3/asset/blob/master/airplane2.png?raw=true"
                />
              </Box>
              <Box>
                <Box sx={{ textAlign: "center", color: "#ffff" }}>
                  <Typography variant="caption">To</Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {returnFlights[0].toAirPortCode}
                  </Typography>
                  <Typography variant="caption">
                    {returnFlights[0].landingCity}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <DisplayFlightCard flightsToDisplay={returnFlights} />
        </Card>
      </div>
    );
  }
  return (
    <Card sx={{ m: "auto", width: "40vw", mt: 5 }}>
      <Box sx={{ backgroundColor: "#24354f", p: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 1,
            m: 1,

            borderRadius: 1,
          }}
        >
          <Box sx={{ textAlign: "center", color: "#ffff" }}>
            <Typography variant="caption">From</Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {filteredFlights[0].fromAirPortCode}
            </Typography>
            <Typography variant="caption">
              {filteredFlights[0].originCity}l
            </Typography>
          </Box>
          <Box
            style={{
              marginTop: "15px",
            }}
          >
            <img
              style={{ width: "30px", color: "#ffff" }}
              src="https://github.com/pizza3/asset/blob/master/airplane2.png?raw=true"
            />
          </Box>
          <Box>
            <Box sx={{ textAlign: "center", color: "#ffff" }}>
              <Typography variant="caption">To</Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {filteredFlights[0].toAirPortCode}
              </Typography>
              <Typography variant="caption">
                {filteredFlights[0].landingCity}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <DisplayFlightCard flightsToDisplay={filteredFlights} />
    </Card>
  );
};

export default FilteredFlights;
