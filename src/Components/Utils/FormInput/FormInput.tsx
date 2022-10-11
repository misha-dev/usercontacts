import { LoginInputType } from "../../../types/InputType.types";

import cl from "./FormInput.module.scss";
export const FormInput = ({ text, type, id, name, required, value, setValue }: LoginInputType) => {
  return (
    <input
      value={value}
      onChange={(e) => {
        if (type === "tel") {
          setValue(e.target.value);
        } else {
          setValue(e.target.value);
        }
      }}
      required={required}
      id={id}
      name={name}
      type={type}
      placeholder={text}
      className={cl.loginInput}
    />
  );
};
