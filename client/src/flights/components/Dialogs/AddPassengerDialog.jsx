import React, { useState } from "react";

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Dialog,
} from "@mui/material";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";

import { useCartContext } from "../../../shared/context/cart-context";

const AddPassengerDialog = (props) => {
  const { onClose, selectedValue, open } = props;
  const [adultCounter, setAdultCounter] = useState(0);
  const [babyCounter, setBabyCounter] = useState(0);
  const { setCart, cart } = useCartContext();

  const handleChangeAdult = (value) => {
    if (value === "inc") {
      setAdultCounter(adultCounter + 1);
    } else {
      if (adultCounter !== 0) {
        setAdultCounter(adultCounter - 1);
      }
    }
  };

  const handleChangeBaby = (value) => {
    if (value === "inc") {
      setBabyCounter(babyCounter + 1);
    } else {
      if (babyCounter !== 0) {
        setBabyCounter(babyCounter - 1);
      }
    }
  };

  const handleClose = () => {
    const passengers = {
      adultCounter: adultCounter,
      babyCounter: babyCounter,
    };
    const newCart = [...cart];
    newCart[passengers] = passengers;
    setCart(newCart);
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    const passengers = {
      adultCounter: adultCounter,
      babyCounter: babyCounter,
    };
    const newCart = [...cart];
    newCart[passengers] = passengers;
    setCart(newCart);
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <PersonIcon
        sx={{ m: "auto", fontSize: "40px", mt: 2, color: "#40505e" }}
      />

      <List sx={{ pt: 0, mt: 3 }}>
        <ListItem autoFocus>
          <ListItemAvatar>
            <Avatar
              onClick={() => handleChangeAdult("dec")}
              sx={{
                cursor: "pointer",
                bgcolor: adultCounter === 0 ? "#b7c1c9" : "#628de0",
              }}
            >
              <RemoveIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={adultCounter} sx={{ mr: 1 }} />
          <ListItemText primary="Adult / child" />
          <ListItemAvatar>
            <Avatar
              onClick={() => handleChangeAdult("inc")}
              sx={{ ml: 2, cursor: "pointer", bgcolor: "#628de0" }}
            >
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
        </ListItem>

        <ListItem autoFocus>
          <ListItemAvatar>
            <Avatar
              onClick={() => handleChangeBaby("dec")}
              sx={{
                cursor: "pointer",
                bgcolor: babyCounter === 0 ? "#b7c1c9" : "#628de0",
              }}
            >
              <RemoveIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={babyCounter} sx={{ mr: 1 }} />
          <ListItemText primary="Baby" secondary="under 2 years" />
          <ListItemAvatar>
            <Avatar
              onClick={() => handleChangeBaby("inc")}
              sx={{ ml: 2, cursor: "pointer", bgcolor: "#628de0" }}
            >
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
        </ListItem>
        <ListItem autoFocus>
          <Button
            sx={{ m: "auto", mt: 1, width: "50%" }}
            variant="outlined"
            onClick={() => handleListItemClick(babyCounter + adultCounter)}
          >
            OK
          </Button>
        </ListItem>
      </List>
    </Dialog>
  );
};

export default AddPassengerDialog;
