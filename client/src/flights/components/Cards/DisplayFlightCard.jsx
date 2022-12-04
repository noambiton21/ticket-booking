import React from "react";
import { Box, Button, Typography, Divider } from "@mui/material";

const flightsDetails = [
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
  },
];

const airlines = {
  lufthansa: {
    airline: "lufthansa",
    src: "https://beebom.com/wp-content/uploads/2018/12/Lufthansa-Logo.jpg",
    style: {
      height: "51px",
    },
    label: "rgb(13, 28, 83)",
  },
  qatar: {
    airline: "qatar",
    src: "https://beebom.com/wp-content/uploads/2015/02/airline-logos-qatar-e1424574584611.png",
    style: {
      height: "26px",
      margin: "26px 16px",
    },
    label: "rgb(90, 5, 49)",
  },
  swiss: {
    airline: "swiss",
    src: "https://beebom.com/wp-content/uploads/2015/02/airline-logos-swiss.png",
    style: {
      height: "23px",
      margin: "29px 12px",
    },
    label: "rgb(230, 26, 56)",
  },
  singapore: {
    airline: "singapore",
    src: "https://beebom.com/wp-content/uploads/2018/12/Singapore-Airlines-logo.jpg",
    style: {
      height: "46px",
      margin: "22px 15px",
    },
    label: "rgb(252, 178, 50)",
  },
};

const DisplayFlightCard = () => {
  return (
    <Box>
      {flightsDetails.map((flight) => (
        <Box key={flight.id}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 1,
              m: 1,
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            <Box>
              <img
                style={airlines[flight.airline].style}
                src={airlines[flight.airline].src}
              />
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="caption">{flight.originCity}</Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {flight.departureTime}
              </Typography>
              <Typography variant="caption">{flight.departureDate}</Typography>
            </Box>

            <Box>
              <img
                style={{
                  width: "30px",
                  height: "26px",
                  marginTop: "22px",
                  marginLeft: "16px",
                  marginRight: "16px",
                }}
                src="https://github.com/pizza3/asset/blob/master/airplane2.png?raw=true"
              />
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="caption">{flight.landingCity}</Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {flight.landingTime}
              </Typography>
              <Typography variant="caption">{flight.landingDate}</Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="caption">Price</Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {flight.price + "$"}
              </Typography>
              <Typography variant="caption">For all Passengers</Typography>
            </Box>
          </Box>

          <Box sx={{}}>
            <Button size="small">Continue to select seats</Button>
          </Box>

          <Divider />
        </Box>
      ))}
    </Box>
  );
};

export default DisplayFlightCard;
