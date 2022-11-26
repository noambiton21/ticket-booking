import React from "react";
import {Avatar, Button, Grid, Paper, TextField} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const paperStayle={padding:20, height:'100vh',width:280,margin:"20px auto"}
const avatarStyle={backgroundColor:'#1442b3'}
const textFieldEmailStyle = {margin:"5px auto"}
const textFieldStyle = {margin:"10px auto"}
const buttonStyle = {margin:"60px auto"}


const Register= (props)=>{
  

    return(
        <Grid>
        <Paper elevation={10} style={paperStayle}>
          <Grid align = 'center'>
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon>
            </LockOutlinedIcon>
            </Avatar>
          </Grid>
          <h2>Register</h2>
          <TextField id="outlined-basic" label="Email" placeholder="Enter email" style={textFieldEmailStyle} fullWidth/>
          <TextField id="outlined-basic" label="Password" placeholder="Enter password" type = "password" style={textFieldStyle} fullWidth/>
          <TextField id="outlined-basic" label="Repassword" placeholder="Enter Repassword" type = "password" style={textFieldStyle} fullWidth/>
          
          <TextField id="outlined-basic" label="Date of birthday" placeholder="Enter Date of birthday" style={textFieldStyle} fullWidth/>
          <TextField id="outlined-basic" label="Passport number" placeholder="Enter passport number" style={textFieldStyle} fullWidth/>
          <input type="file" />
          <Button type ="sumbit" color="primary" variant="contained" style={buttonStyle} fullWidth>Register</Button>
          <Button onClick={props.switchToLogIn}>You already have an account? switch to sign in</Button>
        </Paper>
      </Grid>
    )

}

export default Register;