import { ErrorMessage } from "formik";

import { LoginInputTypeFormik } from "../../../../types/InputType.types";
import { FormInputFormik } from "../FormInputFormik";

import cl from "./FormInputWithValidation.module.scss";

export const FormInputWithValidationFormik = ({ text, type, id, name, required }: LoginInputTypeFormik) => {
  return (
    <div className={cl.inputWrapper}>
      <FormInputFormik required={required} id={id} name={name} type={type} text={text} />
      <ErrorMessage component="div" className={cl.registerFormError} name={name} />
    </div>
  );
};
