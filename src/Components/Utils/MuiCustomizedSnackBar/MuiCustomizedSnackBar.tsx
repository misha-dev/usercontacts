import { Alert, AlertProps, Snackbar } from "@mui/material";
import { AlertColor } from "@mui/material/Alert";
import React, { forwardRef } from "react";

type props = {
  message: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  autoHide: number;
  severity: AlertColor;
};

const SnackBarAlert = forwardRef<HTMLDivElement, AlertProps>(function SnackBarAlert(props, ref) {
  return <Alert elevation={6} ref={ref} {...props} />;
});
export const MuiCustomizedSnackBar = ({ message, open, setOpen, autoHide, severity }: props) => {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <Snackbar
      anchorOrigin={{
        horizontal: "center",
        vertical: "top",
      }}
      autoHideDuration={autoHide}
      open={open}
      onClose={handleClose}
    >
      <SnackBarAlert sx={{ minWidth: 250, fontSize: "1rem" }} onClose={handleClose} severity={severity}>
        {message}
      </SnackBarAlert>
    </Snackbar>
  );
};
