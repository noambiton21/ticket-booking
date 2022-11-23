import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import { Stack, Autocomplete } from "@mui/material";
import AddPassengerDialog from "../Dialogs/AddPassengerDialog";

const skills = ["html", "css"];

const SearchFlightCard = () => {
  const [departureDate, setDepartureDate] = useState(dayjs());
  const [returnDate, setReturnDate] = useState(dayjs());
  const [value, setValue] = useState(null);

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

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
        pt: 4,
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
        <Box sx={{ display: "flex", alightItems: "center", ml: 2, mr: 1 }}>
          <FlightTakeoffIcon sx={{ m: "auto" }} />
          <Stack spacing={2} width="200px">
            <Autocomplete
              options={skills}
              renderInput={(params) => (
                <TextField
                  sx={{ m: 1, width: 200 }}
                  {...params}
                  label="Origin"
                />
              )}
              value={value}
            />
          </Stack>
        </Box>
        <Box sx={{ display: "flex", alightItems: "center", ml: 1, mr: 1 }}>
          <FlightLandIcon sx={{ m: "auto" }} />
          <Stack spacing={2} width="200px">
            <Autocomplete
              options={skills}
              renderInput={(params) => (
                <TextField
                  sx={{ m: 1, width: 200 }}
                  {...params}
                  label="Destination"
                />
              )}
              value={value}
            />
          </Stack>
        </Box>

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
        <Box sx={{ display: "flex", alightItems: "center", ml: 2 }}>
          <PersonOutlineIcon sx={{ m: "auto" }} />

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
            />
          </div>
        </Box>
      </Box>
    </Card>
  );
};

export default SearchFlightCard;
