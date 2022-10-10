import { Field } from "formik";

import { LoginInputType } from "../../../types/InputType.types";

import cl from "./FormInput.module.scss";
export const FormInput = ({ text, type, id, name, required }: LoginInputType) => {
  return <Field required={required} id={id} name={name} type={type} placeholder={text} className={cl.loginInput} />;
};
