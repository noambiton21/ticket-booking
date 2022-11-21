import React from "react";
import {Avatar, Button, Grid, Paper, TextField} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const login = () => {

  const paperStayle={padding:20, height:'70vh',width:280,margin:"20px auto"}
  const avatarStyle={backgroundColor:'#1442b3'}
  const textFieldEmailStyle = {margin:"5px auto"}
  const textFieldPaswordStyle = {margin:"20px auto"}
  const buttonStyle = {margin:"170px auto"}
  

  return (
      <Grid>
        <Paper elevation={10} style={paperStayle}>
          <Grid align = 'center'>
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon>
            </LockOutlinedIcon>
            </Avatar>
          </Grid>
          <h2>Sign in</h2>
          <TextField id="outlined-basic" label="Email" placeholder="Enter email" style={textFieldEmailStyle} fullWidth/>
          <TextField id="outlined-basic" label="Password" placeholder="Enter password" type = "password" style={textFieldPaswordStyle} fullWidth/>
          <Button type ="sumbit" color="primary" variant="contained" style={buttonStyle} fullWidth>Sign in</Button>
        </Paper>
      </Grid>
  )
}

export default login