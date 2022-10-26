import { Alert, AlertProps, Snackbar, SnackbarOrigin } from "@mui/material";
import { AlertColor } from "@mui/material/Alert";
import React, { forwardRef } from "react";

type props = {
  message: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  autoHide: number;
  severity: AlertColor;
  originOfSnackbar: SnackbarOrigin;
};

const SnackBarAlert = forwardRef<HTMLDivElement, AlertProps>(function SnackBarAlert(props, ref) {
  return <Alert elevation={6} ref={ref} {...props} />;
});
export const MuiCustomizedSnackbar = ({ message, open, setOpen, autoHide, severity, originOfSnackbar }: props) => {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <Snackbar anchorOrigin={originOfSnackbar} autoHideDuration={autoHide} open={open} onClose={handleClose}>
      <SnackBarAlert sx={{  fontSize: "1rem" }} onClose={handleClose} severity={severity}>
        {message}
      </SnackBarAlert>
    </Snackbar>
  );
};
