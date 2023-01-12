import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Button } from "@mui/material";
import styles from "./Seats.module.scss";
import { useFlightsContext } from "../../../shared/context/flights-context";
import { AuthContext } from "../../../shared/context/auth-context";

const Seats = () => {
  const auth = useContext(AuthContext);
  const { flights } = useFlightsContext();
  const params = useParams();
  const flightId = params.id;

  let selectedSeats = [];
  // const { id, seats } = useParams();
  const flight = flights.find((flight) => flight._id == flightId);

  console.log(flight);

  const [seatDetails, setSeatDetails] = useState(flight?.seats || {});

  const clearSelectedSeats = () => {
    let newFlightSeatDetails = { ...seatDetails };
    for (let key in seatDetails) {
      seatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 2) {
          seatDetails[key][seatIndex] = 0;
        }
      });
    }
    setSeatDetails(newFlightSeatDetails);
  };

  const onSeatClick = (seatValue, rowIndex, key) => {
    if (seatDetails) {
      if (seatValue === 1 || seatValue === 3) {
        return;
      } else if (seatValue === 0) {
        seatDetails[key][rowIndex] = 2;
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
          {rowIndex == 0 && <span className={styles.colName}>{key}</span>}
          <span
            className={getClassNameForSeats(seatValue)}
            onClick={() => onSeatClick(seatValue, rowIndex, key)}
          >
            {rowIndex + 1}
          </span>
          {seatDetails && rowIndex == seatDetails[key].length - 1 && (
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

  const RenderPaymentButton = () => {
    selectedSeats = [];
    for (let key in seatDetails) {
      seatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue == 2) {
          selectedSeats.push(`${key}${seatIndex + 1}`);
        }
      });
    }
    if (selectedSeats.length) {
      return (
        <Link
          to={{
            pathname: `/payment`,
            state: {
              flightId: flight?._id,
              seatDetails: JSON.stringify(seatDetails),
            },
          }}
        >
          <div className={styles.paymentButtonContainer}>
            <Button
              variant="contained"
              href="#contained-buttons"
              className={styles.paymentButton}
            >
              Pay {selectedSeats.length * (flight?.price || 0)}$.
            </Button>
          </div>
        </Link>
      );
    } else {
      return <></>;
    }
  };

  if (!flight) return <div>loading...</div>;
  return (
    <>
      {auth.isLoggedIn ? (
        <>
          <h3 className={styles.title}>CHOOSE YOUR SEATS</h3>
          <div className={styles.seatsContainer}>
            {seatDetails && <RenderSeats />}
            <RenderPaymentButton />
          </div>
        </>
      ) : (
        <h3 className={styles.title}>YOU MUST LOG IN TO SELECT A SEAT!</h3>
      )}
    </>
  );
};

export default Seats;
