import axios from "axios";
import config from "../config.json";
// import { defaultHeaders } from "../utils/auth";

export const login = async (email, password) => {
  return axios
    .post(`${config.apiUrl}/users/login`, {
      email,
      password,
    })
    .then((res) => res.data);
};

export const register = async (
  email,
  password,
  firstName,
  lastName,
  dateOfBirth
) => {
  return axios
    .post(`${config.apiUrl}/users/register`, {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
    })
    .then((res) => res.data);
};

// export const getUser = async () => {
//   return axios
//     .get(`${config.apiUrl}/user`, {
//       headers: defaultHeaders(),
//     })
//     .then((res) => res.data);
// };
