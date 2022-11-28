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
  Button,
  Card,
  Box,
  Stack,
  Autocomplete,
  TextField,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const skills = ["html", "css"];

const SearchFlightCard = () => {
  const [departureDate, setDepartureDate] = useState(dayjs());
  const [returnDate, setReturnDate] = useState(dayjs());
  const [value, setValue] = useState(null);

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));

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
        width: "63vw",
        pt: 5,
        pb: 4,
        margin: "auto",
        backgroundColor: "F9F9F9",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alightItems: "center",
            m: "auto",
          }}
        >
          <FlightTakeoffIcon
            sx={{ m: "auto", display: isMobileView ? "none" : "" }}
          />
          <Stack spacing={1} width="200px">
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
          }}
        >
          <FlightLandIcon
            sx={{ m: "auto", display: isMobileView ? "none" : "" }}
          />
          <Stack spacing={1} width="200px">
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

            <DesktopDatePicker
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

          <div>
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
          </div>
        </Box>
        <Box sx={{ m: "auto" }}>
          <Link style={{ textDecoration: "none" }} to="/flights">
            <Button sx={{ width: "20", height: 55 }} variant="outlined">
              FIND ME A FLIGHT
            </Button>
          </Link>
        </Box>
      </Box>
    </Card>
  );
};

export default SearchFlightCard;
