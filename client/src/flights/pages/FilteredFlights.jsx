import React from "react";

import { Card, Box, Typography } from "@mui/material";

import DisplayFlightCard from "../components/Cards/DisplayFlightCard";

const flight = {
  from: "BLR",
  originAirport: "Kempegowda International",
  to: "DEL",
  destinationAirport: "Indira Gandhi International",
};

const FilteredFlights = () => {
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
              {flight.from}
            </Typography>
            <Typography variant="caption">{flight.originAirport}l</Typography>
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
                {flight.to}
              </Typography>
              <Typography variant="caption">
                {flight.destinationAirport}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <DisplayFlightCard />
    </Card>
  );
};

export default FilteredFlights;
