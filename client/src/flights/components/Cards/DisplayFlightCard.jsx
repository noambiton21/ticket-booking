import React, { useState, useContext } from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import Seats from "../seats/Seats";
import { AuthContext } from "../../../shared/context/auth-context";
import { useFlightsContext } from "../../../shared/context/flights-context";
import airlinesDB from "../../../airlinesDB.json";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteFlight } from "../../../services/flight.service";

const DisplayFlightCard = (props) => {
  const auth = useContext(AuthContext);
  const { filteredFlights } = useFlightsContext();
  const [buttonSeats, setButtonSeats] = useState(false);

  const findAirlinePic = (airline) => {
    const airlineObject = airlinesDB.find((obj) => obj.name === airline);
    return airlineObject.logo;
  };

  const deleteFlightFromDB = (e, flightId) => {
    e.preventDefault();
    if (window.confirm("Are you sure that you want to delete this flight?")) {
      deleteFlight(flightId, auth.token);
    }
  };

  const btnHandler = () => {
    setButtonSeats(true);
  };

  return (
    <Box>
      {props.flightsToDisplay.map((flight) => (
        <Box key={flight._id}>
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
            {auth.userId === "63a174c8007936dd1bef7414" ? (
              <DeleteForeverIcon
                onClick={(e) => deleteFlightFromDB(e, flight._id)}
              />
            ) : null}
            <Box>
              <img src={findAirlinePic(flight.airline)} />
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

          <Box>
            <Link
              to={{
                pathname: `/flights/${flight._id}`,
              }}
            >
              <Button size="small">Continue to select seats</Button>
            </Link>
          </Box>
          {auth.userId === "63a174c8007936dd1bef7414" ? (
            <Box>
              <Link
                to={{
                  pathname: `/flights/customize/${flight._id}`,
                }}
              >
                <Button size="small">Customize seats flight</Button>
              </Link>
            </Box>
          ) : null}

          <Divider />
        </Box>
      ))}
    </Box>
  );
};

//   return (
//     <Box>
//       {flightsDetails.map((flight) => (
//         <Box key={flight.id}>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               p: 1,
//               m: 1,
//               bgcolor: "background.paper",
//               borderRadius: 1,
//             }}
//           >
//             <Box>
//               <img
//                 style={airlines[flight.airline].style}
//                 src={airlines[flight.airline].src}
//               />
//             </Box>
//             <Box sx={{ textAlign: "center" }}>
//               <Typography variant="caption">{flight.originCity}</Typography>
//               <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//                 {flight.departureTime}
//               </Typography>
//               <Typography variant="caption">{flight.departureDate}</Typography>
//             </Box>

//             <Box>
//               <img
//                 style={{
//                   width: "30px",
//                   height: "26px",
//                   marginTop: "22px",
//                   marginLeft: "16px",
//                   marginRight: "16px",
//                 }}
//                 src="https://github.com/pizza3/asset/blob/master/airplane2.png?raw=true"
//               />
//             </Box>
//             <Box sx={{ textAlign: "center" }}>
//               <Typography variant="caption">{flight.landingCity}</Typography>
//               <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//                 {flight.landingTime}
//               </Typography>
//               <Typography variant="caption">{flight.landingDate}</Typography>
//             </Box>
//             <Box sx={{ textAlign: "center" }}>
//               <Typography variant="caption">Price</Typography>
//               <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//                 {flight.price + "$"}
//               </Typography>
//               <Typography variant="caption">For all Passengers</Typography>
//             </Box>
//           </Box>

//           <Box>
//             <Link
//               to={{
//                 pathname: `/flights/${flight.id}`,
//               }}
//             >
//               <Button size="small">Continue to select seats</Button>
//             </Link>
//           </Box>
//           {auth.userId === "63a174c8007936dd1bef7414" ? (
//             <Box>
//               <Link
//                 to={{
//                   pathname: `/flights/customize/${flight.id}`,
//                 }}
//               >
//                 <Button size="small">Customize seats flight</Button>
//               </Link>
//             </Box>
//           ) : null}

//           <Divider />
//         </Box>
//       ))}
//     </Box>
//   );
// };

export default DisplayFlightCard;
