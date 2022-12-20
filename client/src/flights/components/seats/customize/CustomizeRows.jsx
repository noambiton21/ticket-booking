import { useState, useEffect, useContext } from "react";
import { Button, TextField } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import styles from "./Customize.module.scss";
import { useFlightsContext } from "../../../../shared/context/flights-context";

const CustomizeRows = () => {
  const { flights, setFlights } = useFlightsContext();
  const history = useHistory();
  const params = useParams();
  const flightId = params.id;

  const flight = flights.find((flight) => flight.id == parseInt(flightId));

  const [seatDetails, setSeatDetails] = useState(flight?.seats || {});
  const [row, setRow] = useState(flight?.rows || 0);
  const [column, setColumn] = useState(flight?.cols || 0);

  useEffect(() => {
    clearSelectedSeats();
  }, []);

  useEffect(() => {
    handleSubmit();
  }, [row, column]);

  const clearSelectedSeats = () => {
    let newMovieSeatDetails = { ...seatDetails };
    for (let key in seatDetails) {
      seatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 2) {
          seatDetails[key][seatIndex] = 0;
        }
      });
    }
    return newMovieSeatDetails;
  };

  const handleSubmit = () => {
    let newSeatObject = {};
    let key;
    for (let i = 0; i < column; i++) {
      if (i < 26) {
        key = String.fromCharCode(65 + i);
      } else {
        let character = String.fromCharCode(64 + i / 25);
        key = `${character}${String.fromCharCode(64 + (i % 25))}`;
      }
      newSeatObject[key] = Array(row)
        .fill(0)
        .map((_, i) => {
          if (seatDetails && seatDetails[key] && seatDetails[key][i]) {
            return seatDetails[key][i];
          } else {
            return 0;
          }
        });
    }
    console.log(seatDetails);
    setSeatDetails(newSeatObject);
  };

  const handleSaveSetup = async () => {
    let movieIndex = flights.findIndex((mov) => mov.id == parseInt(flightId));
    if (movieIndex !== -1 && setFlights) {
      flights[movieIndex].seats = seatDetails;
      setFlights(flights);
      history.push("/flights");
    }
  };

  const RenderInputFields = () => {
    return (
      <div className={styles.inputContainer}>
        <form className={styles.inputHolder}>
          <TextField
            id="row"
            type="number"
            label="Row"
            variant="outlined"
            size="small"
            className={styles.inputField}
            name="row"
            value={row}
            onChange={(e) => setRow(parseInt(e.target.value) || 0)}
          />
          <TextField
            id="outlined-basic"
            type="number"
            label="Column"
            variant="outlined"
            size="small"
            className={styles.inputField}
            value={column}
            onChange={(e) => setColumn(parseInt(e.target.value) || 0)}
          />
          <Button
            onClick={handleSaveSetup}
            variant="contained"
            className={styles.saveSetUpButton}
          >
            Save Setup
          </Button>
        </form>
      </div>
    );
  };

  const onSeatClick = (seatValue, rowIndex, key) => {
    if (seatDetails) {
      if (seatValue === 1) {
        return;
      } else if (seatValue === 0) {
        seatDetails[key][rowIndex] = 3;
      } else {
        seatDetails[key][rowIndex] = 0;
      }
    }
    setSeatDetails({ ...seatDetails });
  };

  /**
   * 0 - Not booked
   * 1 - Booked
   * 2 - Selected
   * 3 - Blocked
   */
  const getClassNameForSeats = (seatValue) => {
    let dynamicClass;
    if (seatValue === 0) {
      // Not booked
      dynamicClass = styles.seatNotBooked;
    } else if (seatValue === 1) {
      // booked
      dynamicClass = styles.seatBooked;
    } else if (seatValue === 2) {
      // Seat Selected
      dynamicClass = styles.seatSelected;
    } else {
      // Seat Blocked
      dynamicClass = styles.seatBlocked;
    }
    return `${styles.seats} ${dynamicClass}`;
  };

  const RenderSeats = () => {
    let seatArray = [];
    for (let key in seatDetails) {
      let colValue = seatDetails[key].map((seatValue, rowIndex) => (
        <span key={`${key}.${rowIndex}`} className={styles.seatsHolder}>
          {rowIndex === 0 && <span className={styles.colName}>{key}</span>}
          <span
            className={getClassNameForSeats(seatValue)}
            onClick={() => onSeatClick(seatValue, rowIndex, key)}
          >
            {rowIndex + 1}
          </span>
          {seatDetails && rowIndex === seatDetails[key].length - 1 && (
            <>
              <br />
              <br />
            </>
          )}
        </span>
      ));
      seatArray.push(colValue);
    }
    return <div className={styles.seatsLeafContainer}>{seatArray}</div>;
  };

  if (!flight) return <div>loading...</div>;
  return (
    <>
      <div className={styles.seatsContainer}>
        <h1>{flight.name}</h1>
        {RenderInputFields()}
        <p className={styles.header}>
          Select Seats to be <b className={styles.headerBlockedText}>Blocked</b>
        </p>
        {seatDetails && <RenderSeats />}
      </div>
    </>
  );
};

export default CustomizeRows;
