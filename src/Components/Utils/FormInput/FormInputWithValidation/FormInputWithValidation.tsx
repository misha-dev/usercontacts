import { useFormInput } from "../../../../hooks/useFormInput";
import { InputFormType } from "../../../../types/InputType.types";
import { FormInput } from "../FormInput";

import cl from "./FormInputWithValidation.module.scss";

export const FormInputWithValidation = ({ text, type, id, name, required, value, setValue }: InputFormType) => {
  let validationRules = {};

  switch (name) {
    case "name":
      validationRules = { minLength: 3 };
      break;
    case "phoneNumber":
      validationRules = { phoneValid: /((\+7|8) \(\d{3}\) \d{3}-\d{2}-\d{2})|(\+\d{7,16})/g };
      break;
    default:
      break;
  }

  const nameInput = useFormInput(value, validationRules);

  return (
    <div className={cl.inputWrapper}>
      <FormInput onBlur={nameInput.onBlur} value={value} setValue={setValue} required={required} id={id} name={name} type={type} text={text} />
      {nameInput.valid.error && !nameInput.dirty ? null : <div className={cl.registerFormError}>{nameInput.valid.error}</div>}
    </div>
  );
};
