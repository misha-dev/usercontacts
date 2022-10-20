import { InputType } from "../../../../types/InputType.types";
import { FormInput } from "../FormInput";

import cl from "./FormInputWithValidation.module.scss";

export const FormInputWithValidation = ({ text, type, id, name, required, handler, inputRef }: InputType) => {
  return (
    <div className={cl.inputWrapper}>
      <FormInput inputRef={inputRef} handler={handler} required={required} id={id} name={name} type={type} text={text} />
      {handler.valid.error && !handler.dirty ? null : <div className={cl.registerFormError}>{handler.valid.error}</div>}
    </div>
  );
};
