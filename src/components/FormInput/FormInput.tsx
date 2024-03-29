

import { InputType } from "types";

import cl from "./FormInput.module.scss";
export const FormInput = ({ text, type, id, name, required, handler }: InputType) => {
  return (
    <input
      ref={handler.inputRef}
      onBlur={handler.onBlur}
      value={handler.value}
      onKeyDown={(e) => {
        if (type === "tel" && ["Backspace", "Delete"].includes(e.key) && handler.value.replace(/[\D]/g, "").length === 1) {
          handler.setValue("");
        }
      }}
      onChange={handler.onChange}
      required={required}
      id={id}
      name={name}
      type={type}
      placeholder={text}
      className={cl.loginInput}
      autoComplete={"off"}
      autoCorrect={"off"}
      autoCapitalize={"off"}
    />
  );
};
