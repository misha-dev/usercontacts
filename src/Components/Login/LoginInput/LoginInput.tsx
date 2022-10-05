import { LoginInputType } from "../../../types/InputType.types";

import cl from "./LoginInput.module.scss";
export const LoginButton = ({ text, type, onChange }: LoginInputType) => {
  return <input onChange={onChange} type={type} placeholder={text} className={cl.loginButton} />;
};
