import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { LogoutButton } from "../Utils/Buttons/LogoutButton/LogoutButton";

import cl from "./Layout.module.scss";

export const Layout = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <div className={cl.mainContent}>
      {user.id && (
        <div className={cl.menuWrapper}>
          <LogoutButton text="Logout" type="button" />
        </div>
      )}
      <Outlet />
    </div>
  );
};
