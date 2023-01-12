import { useState, useContext } from "react";
import React from "react";
import { Avatar, Button, Grid, Paper, TextField, Box } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Register from "./Register";
import { login } from "../../services/user.service";
import { AuthContext } from "../../shared/context/auth-context";

const paperStyle = { padding: 20, margin: "auto" };
const avatarStyle = { backgroundColor: "#1442b3" };
const textFieldEmailStyle = { margin: "5px auto" };
const textFieldPasswordStyle = { margin: "20px auto" };
const buttonSigInStyle = { margin: "30px auto" };
const buttonSignUpStyle = { margin: "10px auto" };

const Login = (props) => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLoggedInHandler = () => {
    setIsLoginMode(!isLoginMode);
  };

  const handleChangeEmail = (newValue) => {
    setEmail(newValue.target.value);
  };
  const handleChangePassword = (newValue) => {
    setPassword(newValue.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    login(email, password).then((responseData) => {
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
    });
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
              onChange={handleChangeEmail}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              placeholder="Enter password"
              type="password"
              style={textFieldPasswordStyle}
              fullWidth
              onChange={handleChangePassword}
            />
            <Button
              color="primary"
              variant="contained"
              style={buttonSigInStyle}
              fullWidth
              onClick={handleSubmitForm}
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
    return (
      <Register
        switchToLogIn={isLoggedInHandler}
        closeDialog={props.closeDialog}
      />
    );
  }
};
export default Login;
