import { LoginInputType } from "../../../types/InputType.types";

import cl from "./FormInput.module.scss";
export const FormInput = ({ text, type, id, name, required, value, setValue }: LoginInputType) => {
  return (
    <input
      value={value}
      onKeyDown={(e) => {
        if (type === "tel" && ["Backspace", "Delete"].includes(e.key) && value.replace(/[\D]/g, "").length === 1) {
          setValue("");
        }
      }}
      onChange={(e) => {
        let value = e.target.value;
        const lastChar = value[value.length - 1];
        if (type === "tel") {
          let formattedInputValue = "";
          value = value.replace(/[\D]/g, "");
          if (value.length <= 12) {
            if (!value) {
              setValue("");
            } else {
              if (["7", "8", "9"].includes(value[0])) {
                if (value[0] === "9") {
                  value = "7" + value;
                }
                const firstSymbols = value[0] === "8" ? "8" : "+7";
                formattedInputValue = firstSymbols + " ";

                if (value.length > 1) {
                  formattedInputValue += "(" + value.substring(1, 4);
                }

                if (value.length >= 5) {
                  formattedInputValue += ") " + value.substring(4, 7);
                }

                if (value.length >= 8) {
                  formattedInputValue += "-" + value.substring(7, 9);
                }

                if (value.length >= 10) {
                  formattedInputValue += "-" + value.substring(9, 11);
                }
                setValue(formattedInputValue);
              } else {
                setValue(`+${value.substring(0, 16)}`);
              }
            }
          }
        } else {
          if ((/^[a-zA-Z]/g.test(value) && value.length <= 12 && /\w\w*/.test(lastChar)) || value === "") {
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
