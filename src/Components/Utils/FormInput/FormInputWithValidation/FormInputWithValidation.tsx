import { ErrorMessage } from "formik";

import { LoginInputType } from "../../../../types/InputType.types";
import { LoginInput } from "../FormInput";

import cl from "./FormInputWithValidation.module.scss";

export const FormInputWithValidation = ({ text, type, id, name, required }: LoginInputType) => {
  return (
    <div className={cl.inputWrapper}>
      <LoginInput required={required} id={id} name={name} type={type} text={text} />
      <ErrorMessage component="div" className={cl.registerFormError} name={name} />
    </div>
  );
};
