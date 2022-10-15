import { Field } from "formik";

import { InputTypeFormik } from "../../../types/InputType.types";

import cl from "./FormInput.module.scss";
export const FormInputFormik = ({ text, type, id, name, required }: InputTypeFormik) => {
  return <Field required={required} id={id} name={name} type={type} placeholder={text} className={cl.loginInput} />;
};
