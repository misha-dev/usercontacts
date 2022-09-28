import { Outlet } from "react-router-dom";
import cl from "./Layout.module.scss";

export const Layout = () => {
  return (
    <div className={cl.mainContent}>
      <Outlet />
    </div>
  );
};
