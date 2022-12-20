import React, { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

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

const skills = ["html", "css"];

const SearchFlightCard = () => {
  const [departureDate, setDepartureDate] = useState(dayjs());
  const [returnDate, setReturnDate] = useState(dayjs());
  const [isOneWay, setIsOneWay] = useState(false);
  const [value, setValue] = useState(null);

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));

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

  function valuetext(value) {
    return `${value} Stops`;
  }
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
            width: 200,
            position: "absolute",
            top: "5px",
            right: "10px",
            mr: 2,
          }}
        >
          <Typography gutterBottom>Stops</Typography>
          <Slider
            aria-label="Stops"
            defaultValue={0}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={4}
          />
        </Box>
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
              options={skills}
              renderInput={(params) => (
                <TextField sx={{ width: 200 }} {...params} label="Origin" />
              )}
              value={value}
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
              options={skills}
              renderInput={(params) => (
                <TextField
                  sx={{ width: 200 }}
                  {...params}
                  label="Destination"
                />
              )}
              value={value}
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
