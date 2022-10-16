import { InputType } from "../../../types/InputType.types";

import cl from "./FormInput.module.scss";
export const FormInput = ({ text, type, id, name, required, value, setValue, onBlur, onChange, inputRef }: InputType) => {
  return (
    <input
      ref={inputRef ? inputRef : null}
      onBlur={onBlur}
      value={value}
      onKeyDown={(e) => {
        if (type === "tel" && ["Backspace", "Delete"].includes(e.key) && value.replace(/[\D]/g, "").length === 1) {
          setValue("");
        }
      }}
      onChange={onChange}
      required={required}
      id={id}
      name={name}
      type={type}
      placeholder={text}
      className={cl.loginInput}
    />
  );
};
