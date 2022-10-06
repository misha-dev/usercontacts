import { LoginInputType } from "../../../types/InputType.types";

import cl from "./FormInput.module.scss";
export const LoginInput = ({ text, type, onChange, id, name, value, required, onBlur }: LoginInputType) => {
  return <input onBlur={onBlur} required={required} value={value} id={id} name={name} onChange={onChange} type={type} placeholder={text} className={cl.loginInput} />;
};
