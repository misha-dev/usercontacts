import { LoginInputType } from "../../../types/InputType.types";

import cl from "./FormInput.module.scss";
export const LoginInput = ({ text, type, id, name, required, fieldProps }: LoginInputType) => {
  return <input  required={required} {...fieldProps}  id={id} name={name}  type={type} placeholder={text} className={cl.loginInput} />;
};
