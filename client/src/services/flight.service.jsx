import axios from "axios";
import config from "../config.json";
import { defaultHeaders } from "../utils/auth";

export const addNewFlight = async (data, token) => {
  return axios
    .post(`http://localhost:1337/api/flights/addFlight`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {});
};

export const getFlights = () => {
  return axios.get(`${config.apiUrl}/flights/flights`).then((res) => res.data);
};

export const updateSeatsFlight = async (seats, flightId, token) => {
  return axios
    .put(
      `${config.apiUrl}/flights/updateSeats`,
      {
        seats,
        flightId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {});
};

export const deleteFlight = async (flightId, token) => {
  return axios
    .delete(`${config.apiUrl}/flights/deleteFlight`, {
      data: {
        flightId,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
