import { useState } from "react";
import React from "react";
import { Avatar, Button, Grid, Paper, TextField, Box } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Register from "./Register";

const paperStyle = { padding: 20, margin: "auto" };
const avatarStyle = { backgroundColor: "#1442b3" };
const textFieldEmailStyle = { margin: "5px auto" };
const textFieldPasswordStyle = { margin: "20px auto" };
const buttonSigInStyle = { margin: "30px auto" };
const buttonSignUpStyle = { margin: "10px auto" };

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);

  const isLoggedInHandler = () => {
    setIsLoginMode(!isLoginMode);
  };

  let result;
  if (!isLoginMode) {
    result = (
      <Grid>
        <Paper style={paperStyle}>
          <Box sx={{ width: "70%", m: "auto" }}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon></LockOutlinedIcon>
              </Avatar>
            </Grid>
            <h2 style={{ textAlign: "center" }}>Sign in</h2>
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
              style={textFieldPasswordStyle}
              fullWidth
            />
            <Button
              color="primary"
              variant="contained"
              style={buttonSigInStyle}
              fullWidth
            >
              Sign in
            </Button>
            <Button
              onClick={isLoggedInHandler}
              color="primary"
              style={buttonSignUpStyle}
              fullWidth
            >
              Create an account
            </Button>
          </Box>
        </Paper>
      </Grid>
    );
    return result;
  } else {
    return <Register switchToLogIn={isLoggedInHandler} />;
  }
};
export default Login;
