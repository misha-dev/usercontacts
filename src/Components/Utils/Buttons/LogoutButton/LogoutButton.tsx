import { useAppDispatch } from "../../../../store/hooks";
import { logOut } from "../../../../store/userSlice";
import { ButtonType } from "../../../../types/ButtonType.types";
import cl from "./LogoutButton.module.scss";

export const LogoutButton = ({ text, type }: ButtonType) => {
  const dispatch = useAppDispatch();
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    localStorage.clear();
    dispatch(logOut());
  };
  return (
    <button onClick={onClick} type={type} className={cl.logoutButton}>
      {text}
    </button>
  );
};
