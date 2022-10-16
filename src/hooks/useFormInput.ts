import { useEffect, useRef, useState } from "react";

import { formatRussianNumber } from "../Utils/formatRussianNumber";
type validationsType = { [key: string]: number | RegExp };
export const useValidation = (value: string, validations: validationsType) => {
  const [error, setError] = useState("");
  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          value.length < validations[validation] ? setError(`Should be at least ${validations[validation]} letters!`) : setError("");
          break;

        case "phoneValid":
          (validations[validation] as RegExp).test(value) ? setError("") : setError("Enter correct phone number!");
          break;
      }
    }
  }, [value]);

  return { error };
};

export const useFormInput = (initialValue: string, validations: validationsType, type: "text" | "tel") => {
  const [value, setValue] = useState("");
  const phoneInputRef = useRef<HTMLInputElement>(null);
  // for setting cursor after deleting in the middle of input
  const [selectionStartPhone, setSelectionStart] = useState(0);

  useEffect(() => {
    phoneInputRef.current?.setSelectionRange(selectionStartPhone, selectionStartPhone);
  }, [selectionStartPhone]);
  const [dirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);
  const onBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setDirty(true);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      if ((/^[a-zA-Zа-яА-Я](\w\w*)*/g.test(value) && value.length <= 12) || value === "") {
        setValue(value);
      }
    }
  };

  return { value, setValue, dirty, valid, onBlur, phoneInputRef, onChange, setDirty };
};
