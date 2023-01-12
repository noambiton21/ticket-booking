import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Login from "../Login";

const LoginDialog = (props) => {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Login closeDialog={handleClose} />
    </Dialog>
  );
};

export default LoginDialog;
