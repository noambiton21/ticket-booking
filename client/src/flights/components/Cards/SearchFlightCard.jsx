import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useFlightsContext } from "../../../shared/context/flights-context";

import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";

import AddPassengerDialog from "../Dialogs/AddPassengerDialog";

import {
  Switch,
  Button,
  Card,
  Box,
  Stack,
  Autocomplete,
  TextField,
  FormControlLabel,
  Typography,
  Slider,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const SearchFlightCard = () => {
  const [departureDate, setDepartureDate] = useState(dayjs());
  const [returnDate, setReturnDate] = useState(dayjs());
  const [isOneWay, setIsOneWay] = useState(false);
  const { flights, setFilteredFlights, returnFlights, setReturnFlights } =
    useFlightsContext();
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [listOriginCity, setListOriginCity] = useState([]);
  const [listLandingCity, setListLandingCity] = useState([]);

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));

  function getValuesForKey(objects, key) {
    const names = objects.map((object) => object[key]);
    return [...new Set(names)];
  }

  useEffect(() => {
    if (flights) {
      setListOriginCity(getValuesForKey(flights, "originCity"));
      setListLandingCity(getValuesForKey(flights, "landingCity"));
    }
  }, [flights]);

  function filterFlights() {
    const flightDate = new Date(departureDate).toLocaleDateString("en-GB");

    const filteredFlights = flights.filter((flight) => {
      return (
        flight.originCity === selectedOrigin &&
        flight.departureDate === flightDate &&
        flight.landingCity === selectedDeparture
      );
    });
    if (filteredFlights) {
      setFilteredFlights(filteredFlights);
    } else {
      alert("there is no flights");
    }
    if (!isOneWay) {
      const returnFlightDate = new Date(returnDate).toLocaleDateString("en-GB");
      setReturnFlights(
        flights.filter((flight) => {
          return (
            flight.originCity === selectedDeparture &&
            flight.departureDate === returnFlightDate &&
            flight.landingCity === selectedOrigin
          );
        })
      );
    }
    console.log(filteredFlights);
  }

  const handleChangeIsOneWay = (event) => {
    setIsOneWay(event.target.checked);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleChangeDepartureDate = (newValue) => {
    setDepartureDate(newValue);
  };
  const handleChangeReturnDate = (newValue) => {
    setReturnDate(newValue);
  };

  return (
    <Card
      sx={{
        position: "relative",
        width: "70%",
        maxWidth: "1100px",
        pt: 5,
        pb: 4,
        margin: "auto",
        backgroundColor: "F9F9F9",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "90%",
          margin: "30px auto auto auto",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alightItems: "center",
            m: "auto",
            mb: isMobileView ? 1.5 : "auto",
          }}
        >
          <FlightTakeoffIcon
            sx={{ m: "auto", display: isMobileView ? "none" : "" }}
          />
          <Stack spacing={2} width="200px">
            <Autocomplete
              options={listOriginCity}
              renderInput={(params) => (
                <TextField sx={{ width: 200 }} {...params} label="Origin" />
              )}
              value={selectedOrigin}
              onChange={(event, newValue) => {
                setSelectedOrigin(newValue);
              }}
            />
          </Stack>
        </Box>
        <Box
          sx={{
            display: "flex",
            alightItems: "center",
            m: "auto",
            mb: isMobileView ? 1.5 : "auto",
          }}
        >
          <FlightLandIcon
            sx={{ m: "auto", display: isMobileView ? "none" : "" }}
          />
          <Stack spacing={2} width="200px">
            <Autocomplete
              options={listLandingCity}
              renderInput={(params) => (
                <TextField
                  sx={{ width: 200 }}
                  {...params}
                  label="Destination"
                />
              )}
              value={selectedDeparture}
              onChange={(event, newValue) => {
                setSelectedDeparture(newValue);
              }}
            />
          </Stack>
        </Box>

        <Box sx={{ m: "auto" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Departure"
              inputFormat="DD/MM/YYYY"
              value={departureDate}
              onChange={handleChangeDepartureDate}
              renderInput={(params) => (
                <TextField sx={{ m: 1, width: 200 }} {...params} />
              )}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ m: "auto" }}>
          <FormControlLabel
            sx={{ position: "absolute", top: "10px", left: "20px" }}
            control={
              <Switch checked={isOneWay} onChange={handleChangeIsOneWay} />
            }
            label="One Way?"
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              disabled={isOneWay ? true : false}
              label="Return"
              inputFormat="DD/MM/YYYY"
              value={returnDate}
              onChange={handleChangeReturnDate}
              renderInput={(params) => (
                <TextField sx={{ m: 1, width: 200 }} {...params} />
              )}
            />
          </LocalizationProvider>
        </Box>
        <Box
          sx={{
            display: "flex",
            alightItems: "center",
            m: "auto",
          }}
        >
          <PersonOutlineIcon
            sx={{ m: "auto", display: isMobileView ? "none" : "" }}
          />

          <Box>
            <TextField
              sx={{ width: 200, m: 1 }}
              id="outlined-name"
              label="Passengers"
              type="number"
              onClick={handleClickOpen}
              value={selectedValue}
            />

            <AddPassengerDialog
              selectedValue={selectedValue}
              open={open}
              onClose={handleClose}
              sx={{ display: isMobileView ? "none" : "" }}
            />
          </Box>
        </Box>
        <Box sx={{ m: "auto" }}>
          <Link style={{ textDecoration: "none" }} to="/flights">
            <Button
              variant="contained"
              sx={{
                height: "40px",
                marginTop: "10px",
                background: "#f84464",
                marginLeft: "10px",
              }}
              onClick={filterFlights}
            >
              FIND ME A FLIGHT
            </Button>
          </Link>
        </Box>
      </Box>
    </Card>
  );
};

export default SearchFlightCard;
