import { useEffect, useState } from "react";
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

export const useFormInput = (value: string, validations: validationsType) => {
  const [dirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);
  const onBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setDirty(true);
  };

  return { dirty, valid, onBlur };
};
