import { useEffect, useRef, useState } from "react";

import { LoginInputType } from "../../../types/InputType.types";
import { formatRussianNumber } from "../../../Utils/formatRussianNumber";

import cl from "./FormInput.module.scss";
export const FormInput = ({ text, type, id, name, required, value, setValue }: LoginInputType) => {
  const phoneInputRef = useRef<HTMLInputElement>(null);
  // for setting cursor after deleting in the middle of input
  const [selectionStart, setSelectionStart] = useState(0);

  useEffect(() => {
    phoneInputRef.current?.setSelectionRange(selectionStart, selectionStart);
  }, [selectionStart]);
  return (
    <input
      ref={phoneInputRef}
      value={value}
      onKeyDown={(e) => {
        if (type === "tel" && ["Backspace", "Delete"].includes(e.key) && value.replace(/[\D]/g, "").length === 1) {
          setValue("");
        }
      }}
      onChange={(e) => {
        const value = e.target.value;
        const selectionPointer = e.target.selectionStart;
        if (type === "tel") {
          const phoneValue = value.replace(/[\D]/g, "");
          if (value.length !== selectionPointer) {
            const event = e.nativeEvent as InputEvent;

            if ((event.data && !/\D/g.test(event.data) && phoneValue.length <= 11) || event.data === null) {
              const v = formatRussianNumber(phoneValue);

              if (v && selectionPointer) {
                setValue(v);
                setSelectionStart(selectionPointer);
              }
              return;
            }
          }

          if (!phoneValue) {
            setValue("");
          } else {
            const isRussian = ["7", "8", "9"].includes(phoneValue[0]);
            if (isRussian) {
              const russianNumber = formatRussianNumber(phoneValue);
              if (russianNumber) {
                setValue(russianNumber);
              }
            } else if (phoneValue.length <= 16 && !isRussian) {
              setValue(`+${phoneValue}`);
            }
          }
        } else {
          if ((/^[a-zA-Z](\w\w*)*/g.test(value) && value.length <= 12) || value === "") {
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
