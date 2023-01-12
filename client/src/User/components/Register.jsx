import React, { useState, useContext } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { register } from "../../services/user.service";
import { AuthContext } from "../../shared/context/auth-context";

import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const paperStyle = {
  padding: 20,
  margin: "auto",
};
const avatarStyle = { backgroundColor: "#1442b3" };
const textFieldEmailStyle = { margin: "5px auto" };
const textFieldStyle = { margin: "10px auto" };
const buttonStyleRegister = { margin: "20px auto" };

const Register = (props) => {
  const auth = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [user, setUser] = useState({});

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeDateOfBirth = (newValue) => {
    setDateOfBirth(newValue);
  };

  const handleChangeFirstName = (newValue) => {
    setFirstName(newValue.target.value);
  };
  const handleChangeLastName = (newValue) => {
    setLastName(newValue.target.value);
  };

  const handleChangeEmail = (newValue) => {
    setEmail(newValue.target.value);
  };
  const handleChangePassword = (newValue) => {
    setPassword(newValue.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    register(email, password, firstName, lastName, dateOfBirth).then(
      (responseData) => {
        auth.login(
          responseData.userId,
          responseData.token,
          responseData.firstName
        );
        setUser(responseData);
        console.log(responseData);
        if (responseData.token) {
          props.closeDialog();
        }
      }
    );
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Box sx={{ width: "70%", m: "auto" }}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon></LockOutlinedIcon>
            </Avatar>
          </Grid>
          <h2 style={{ textAlign: "center" }}>Register</h2>
          <TextField
            id="outlined-basic"
            label="First Name"
            placeholder="First Name"
            style={textFieldStyle}
            fullWidth
            onChange={handleChangeFirstName}
          />
          <TextField
            id="outlined-basic"
            label="Last Name"
            placeholder="Last Name"
            style={textFieldStyle}
            fullWidth
            onChange={handleChangeLastName}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            placeholder="Enter email"
            style={textFieldEmailStyle}
            fullWidth
            onChange={handleChangeEmail}
          />
          <FormControl
            style={textFieldStyle}
            sx={{ width: "100%" }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={handleChangePassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/DD/YYYY"
              value={dateOfBirth}
              onChange={handleChangeDateOfBirth}
              renderInput={(params) => (
                <TextField sx={{ width: "100%", mt: 1 }} {...params} />
              )}
            />
          </LocalizationProvider>
          <Button
            color="primary"
            variant="contained"
            style={buttonStyleRegister}
            fullWidth
            onClick={handleSubmitForm}
          >
            Register
          </Button>
          <Button onClick={props.switchToLogIn}>
            You already have an account? switch to sign in
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Register;
