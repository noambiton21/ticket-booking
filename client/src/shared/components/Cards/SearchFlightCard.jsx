import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const SearchFlightCard = () => {
  const [departureDate, setDepartureDate] = useState(dayjs());
  const [returnDate, setReturnDate] = useState(dayjs());

  const handleChangeDepartureDate = (newValue) => {
    setDepartureDate(newValue);
  };
  const handleChangeReturnDate = (newValue) => {
    setReturnDate(newValue);
  };
  return (
    <Card
      sx={{
        width: "65vw",
        pt: 8,
        pb: 8,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "F9F9F9",
      }}
    >
      <Box sx={{ flexWrap: "wrap" }}>
        <TextField
          id="outlined-basic"
          label="Origin"
          variant="outlined"
          sx={{ m: 1 }}
        />
        <TextField
          id="outlined-basic"
          label="Destination"
          variant="outlined"
          sx={{ m: 1 }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Departure"
            inputFormat="DD/MM/YYYY"
            value={departureDate}
            onChange={handleChangeDepartureDate}
            renderInput={(params) => <TextField sx={{ m: 1 }} {...params} />}
          />
          <DesktopDatePicker
            label="Return"
            inputFormat="DD/MM/YYYY"
            value={returnDate}
            onChange={handleChangeReturnDate}
            renderInput={(params) => <TextField sx={{ m: 1 }} {...params} />}
          />
        </LocalizationProvider>
        <TextField
          sx={{ float: "left", ml: 5, mt: 4 }}
          id="outlined-name"
          label="Age"
          type="number"
          value={"1"}
        />
      </Box>
    </Card>
  );
};

export default SearchFlightCard;
