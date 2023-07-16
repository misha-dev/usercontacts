import { ErrorMessage } from "formik";



import { InputTypeFormik } from "types";

import { FormInputFormik } from "../FormInputFormik";

import cl from "./FormInputWithValidation.module.scss";

export const FormInputWithValidationFormik = ({ text, type, id, name, required }: InputTypeFormik) => {
  return (
    <div className={cl.inputWrapper}>
      <FormInputFormik required={required} id={id} name={name} type={type} text={text} />
      <ErrorMessage component="div" className={cl.registerFormError} name={name} />
    </div>
  );
};
