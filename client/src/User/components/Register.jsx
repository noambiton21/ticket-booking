import React from "react";
import { Avatar, Button, Grid, Paper, TextField } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const paperStayle = {
  padding: 20,
  width: 280,
  margin: "auto",
};
const avatarStyle = { backgroundColor: "#1442b3" };
const textFieldEmailStyle = { margin: "5px auto" };
const textFieldStyle = { margin: "10px auto" };
const buttonStyleRegister = { margin: "20px auto" };

const Register = (props) => {
  return (
    <Grid>
      <Paper style={paperStayle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon></LockOutlinedIcon>
          </Avatar>
        </Grid>
        <h2>Register</h2>
        <TextField
          id="outlined-basic"
          label="Email"
          placeholder="Enter email"
          style={textFieldEmailStyle}
          fullWidth
        />
        <TextField
          id="outlined-basic"
          label="Password"
          placeholder="Enter password"
          type="password"
          style={textFieldStyle}
          fullWidth
        />
        <TextField
          id="outlined-basic"
          label="RePassword"
          placeholder="Enter RePassword"
          type="password"
          style={textFieldStyle}
          fullWidth
        />

        <TextField
          id="outlined-basic"
          label="Date of birthday"
          placeholder="Enter Date of birthday"
          style={textFieldStyle}
          fullWidth
        />
        <TextField
          id="outlined-basic"
          label="Passport number"
          placeholder="Enter passport number"
          style={textFieldStyle}
          fullWidth
        />
        <input type="file" />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={buttonStyleRegister}
          fullWidth
        >
          Register
        </Button>
        <Button onClick={props.switchToLogIn}>
          You already have an account? switch to sign in
        </Button>
      </Paper>
    </Grid>
  );
};

export default Register;
