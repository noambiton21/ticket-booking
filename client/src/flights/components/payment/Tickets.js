import { useState, useEffect, useContext } from "react";

import { useLocation, useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import styles from "./Payment.module.scss";
import { useFlightsContext } from "../../../shared/context/flights-context";
import { AuthContext } from "../../../shared/context/auth-context";
import { updateSeatsFlight } from "../../../services/flight.service";

const Tickets = () => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();
  const { flights, setFlights } = useFlightsContext();
  const [seconds, setSeconds] = useState(5);
  const [isTimerCompleted, setIsTimerCompleted] = useState(false);
  let flightSeatDetails = {};
  let bookingChargePerTicket = 20,
    ticketCost,
    bookingFee,
    totalCost;
  const { flightId, seatDetails } = location.state;
  console.log(flightId);

  const flight = flights.find((flight) => flight._id == flightId);
  if (seatDetails) {
    flightSeatDetails = JSON.parse(seatDetails);
  }

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setIsTimerCompleted(true);
    }
  });

  const computeSelectedSeats = () => {
    let selectedSeats = [];
    for (let key in flightSeatDetails) {
      flightSeatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 2) {
          selectedSeats.push(`${key}${seatIndex + 1}`);
        }
      });
    }
    return selectedSeats;
  };

  const RenderSeatDetails = ({ selectedSeats }) => {
    ticketCost = selectedSeats.length * (flight?.price || 0);
    return (
      <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>
          {selectedSeats.join(", ")} ({selectedSeats.length} Tickets)
        </div>
        <div className={styles.seatCost}>Dollar.{ticketCost}</div>
      </div>
    );
  };

  const RenderBookingCharge = ({ selectedSeats }) => {
    bookingFee = selectedSeats.length * bookingChargePerTicket;
    return (
      <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>Booking Charge</div>
        <div className={styles.seatCost}>Dollar.{bookingFee}</div>
      </div>
    );
  };

  const RenderTotalCharge = ({ selectedSeats }) => {
    totalCost = ticketCost + bookingFee;
    return (
      <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>Total</div>
        <div className={styles.seatCost}>Dollar.{totalCost}</div>
      </div>
    );
  };

  const modifiedSeatValue = () => {
    let newTicketSeatDetails = { ...flightSeatDetails };
    for (let key in flightSeatDetails) {
      flightSeatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 2) {
          flightSeatDetails[key][seatIndex] = 1;
        }
      });
    }
    return newTicketSeatDetails;
  };

  const onConfirmButtonClick = async () => {
    let flightIndex = flights.findIndex((flight) => flight._id == flightId);
    if (flightIndex != -1 && setFlights) {
      flights[flightIndex].seats = modifiedSeatValue();
      console.log(flights);

      updateSeatsFlight(flights[flightIndex].seats, flightId, auth.token);

      setFlights(flights);
      history.push("/flights");
    }
  };

  const RenderConfirmButton = () => {
    return (
      <div className={styles.paymentButtonContainer}>
        <Button
          variant="contained"
          disabled={!isTimerCompleted}
          className={styles.paymentButton}
          onClick={onConfirmButtonClick}
        >
          {isTimerCompleted
            ? "Confirm Booking"
            : `Confirm Booking (${seconds})`}
        </Button>
      </div>
    );
  };

  const RenderCard = () => {
    let selectedSeats = computeSelectedSeats();

    if (!flight) return <div>loading...</div>;
    return (
      <div className={styles.card}>
        <div className={styles.cardTitleContainer}>
          {/* <Link
            href={{
              pathname: `/seats/${flight?.id}`,
              query: {
                seats: isTimerCompleted ? null : JSON.stringify(seatDetails),
              },
            }}
          >
            <ArrowBackIcon />
          </Link> */}
          <div className={styles.cardTitle}>BOOKING SUMMARY</div>
        </div>
        <p className={styles.movieName}>{flight.name}</p>
        <RenderSeatDetails selectedSeats={selectedSeats} />
        <RenderBookingCharge selectedSeats={selectedSeats} />
        <hr className={styles.hrStyle} />
        <RenderTotalCharge selectedSeats={selectedSeats} />
        <RenderConfirmButton />
      </div>
    );
  };

  return (
    <>
      <div className={styles.container}>
        <RenderCard />
      </div>
    </>
  );
};

export default Tickets;
