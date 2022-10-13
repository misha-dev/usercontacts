import { LoginInputType } from "../../../types/InputType.types";

import cl from "./FormInput.module.scss";
export const FormInput = ({ text, type, id, name, required, value, setValue }: LoginInputType) => {
  return (
    <input
      value={value}
      onChange={(e) => {
        const value = e.target.value;
        const matchDeleting = [8, 127];
        if (type === "tel") {
          console.log(value);

          if ((/[0-9]/g.test(value) && value.length <= 12) || value === "") {
            setValue(value);
          }
          // if ((lastCharacterCharCode >= 48 && lastCharacterCharCode <= 57) || matchDeleting.includes(lastCharacterCharCode) || lastCharacterCharCode === 43 || value === "") {
          //   setValue(value);
          // }
        } else {
          if ((/^[a-zA-Z].*/g.test(value) && value.length <= 12) || value === "") {
            setValue(value);
          }
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
