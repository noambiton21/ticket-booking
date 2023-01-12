import React, { useState, useContext } from "react";
import {
  Box,
  TextField,
  Card,
  Button,
  Stack,
  Autocomplete,
} from "@mui/material";
import dayjs from "dayjs";
import { addNewFlight } from "../../../services/flight.service";

import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AuthContext } from "../../../shared/context/auth-context";
import airlines from "../../../airlinesDB.json";

const AddFlight = () => {
  const auth = useContext(AuthContext);
  const [departureDate, setDepartureDate] = useState(dayjs());
  const [returnDate, setReturnDate] = useState(dayjs());
  const [airline, setAirline] = useState(null);
  const [originCity, setOriginCity] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [landingCity, setLandingCity] = useState("");
  const [landingTime, setLandingTime] = useState("");
  const [price, setPrice] = useState("");
  const [originCode, setOriginCode] = useState("");
  const [destinationCode, setDestinationCode] = useState("");

  const airlinesOptions = airlines.map((obj) => obj.name);

  const handleChangeDestCode = (newValue) => {
    setDestinationCode(newValue.target.value);
  };

  const handleChangOriginCode = (newValue) => {
    setOriginCode(newValue.target.value);
  };

  const handleChangeAirline = (newValue) => {
    setAirline(newValue.target.value);
  };
  const handleChangeOriginCity = (newValue) => {
    setOriginCity(newValue.target.value);
  };
  const handleChangeDepartureTime = (newValue) => {
    setDepartureTime(newValue.target.value);
  };
  const handleChangeLandingCity = (newValue) => {
    setLandingCity(newValue.target.value);
  };
  const handleChangeLandingTime = (newValue) => {
    setLandingTime(newValue.target.value);
  };
  const handleChangePrice = (newValue) => {
    setPrice(newValue.target.value);
  };
  const handleChangeDepartureDate = (newValue) => {
    setDepartureDate(newValue);
    // setDepartureDate(date.toLocaleDateString("en-GB"));
  };
  const handleChangeReturnDate = (newValue) => {
    // const date = Date(newValue);
    setReturnDate(newValue);
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const data = {
      airline: airline,
      originCity: originCity,
      departureTime: departureTime,
      departureDate: departureDate,
      landingCity: landingCity,
      landingTime: landingTime,
      landingDate: returnDate,
      price: price,
      fromAirPortCode: originCode,
      toAirPortCode: destinationCode,
    };
    addNewFlight(data, auth.token);
    alert("done");
  };
  return (
    <Card sx={{ width: "70%", margin: "auto" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: " auto auto auto",
          gridGap: "20px",
          p: 5,
          maxWidth: "90%",
          margin: "auto",
        }}
      >
        <Stack spacing={2}>
          <Autocomplete
            options={airlinesOptions}
            renderInput={(params) => <TextField {...params} label="Airline" />}
            value={airline}
            onChange={(event, newValue) => {
              setAirline(newValue);
            }}
          />
        </Stack>
        <TextField
          id="outlined-basic"
          label="Origin"
          variant="outlined"
          onChange={handleChangeOriginCity}
        />
        <TextField
          id="outlined-basic"
          label="Destination"
          variant="outlined"
          onChange={handleChangeLandingCity}
        />
        <TextField
          id="outlined-basic"
          label="Origin Airport Code"
          variant="outlined"
          onChange={handleChangOriginCode}
        />
        <TextField
          id="outlined-basic"
          label="Destination Airport Code"
          variant="outlined"
          onChange={handleChangeDestCode}
        />
        <TextField
          id="outlined-basic"
          label="Departure Time"
          variant="outlined"
          onChange={handleChangeDepartureTime}
        />

        <TextField
          id="outlined-basic"
          label="Landing Time"
          variant="outlined"
          onChange={handleChangeLandingTime}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Departure"
            inputFormat="DD/MM/YYYY"
            value={departureDate}
            onChange={handleChangeDepartureDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Return"
            inputFormat="DD/MM/YYYY"
            value={returnDate}
            onChange={handleChangeReturnDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          id="outlined-basic"
          label="Price per seat"
          variant="outlined"
          onChange={handleChangePrice}
        />
        <Button
          variant="contained"
          sx={{
            height: "40px",
            marginTop: "10px",
            background: "#f84464",
            marginLeft: "10px",
          }}
          onClick={handleSubmitForm}
        >
          ADD THIS FLIGHT
        </Button>
      </Box>
    </Card>
  );
};

export default AddFlight;
