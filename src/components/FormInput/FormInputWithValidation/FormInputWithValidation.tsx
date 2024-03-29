import { InputType } from "types";

import { FormInput } from "../FormInput";

import cl from "./FormInputWithValidation.module.scss";

export const FormInputWithValidation = ({ text, type, id, name, required, handler }: InputType) => {
  return (
    <div className={cl.inputWrapper}>
      <FormInput handler={handler} required={required} id={id} name={name} type={type} text={text} />
      {handler.valid.error && !handler.dirty ? null : <div className={cl.registerFormError}>{handler.valid.error}</div>}
    </div>
  );
};
