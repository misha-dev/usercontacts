import { LoginButtonType } from "../../../types/ButtonType.types";

import cl from "./LoginButton.module.scss";
export const LoginButton = ({ text, type, onChange }: LoginButtonType) => {
  return <input onChange={onChange} type={type} placeholder={text} className={cl.loginButton} />;
};
