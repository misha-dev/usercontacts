import { CircularProgress } from "@mui/material";

import cl from "./LoaderCircle.module.scss";

export const LoaderCircle = ({ size }: { size: number }) => {
  return (
    <div className={cl.loaderWrapper}>
      <CircularProgress size={`${size}rem`} className={cl.loader} color="success" />
    </div>
  );
};
