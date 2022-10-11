import { Field } from "formik";

import { LoginInputTypeFormik } from "../../../types/InputType.types";

import cl from "./FormInput.module.scss";
export const FormInputFormik = ({ text, type, id, name, required }: LoginInputTypeFormik) => {
  return <Field required={required} id={id} name={name} type={type} placeholder={text} className={cl.loginInput} />;
};
