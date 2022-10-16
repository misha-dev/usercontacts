import { InputFormType } from "../../../../types/InputType.types";
import { FormInput } from "../FormInput";

import cl from "./FormInputWithValidation.module.scss";

export const FormInputWithValidation = ({ text, type, id, name, required, value, setValue, onBlur, valid, onChange, dirty, inputRef }: InputFormType) => {
  return (
    <div className={cl.inputWrapper}>
      <FormInput inputRef={inputRef} onChange={onChange} onBlur={onBlur} value={value} setValue={setValue} required={required} id={id} name={name} type={type} text={text} />
      {valid.error && !dirty ? null : <div className={cl.registerFormError}>{valid.error}</div>}
    </div>
  );
};
