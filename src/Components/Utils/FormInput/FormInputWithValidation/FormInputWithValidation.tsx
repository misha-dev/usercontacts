import { LoginInputType } from "../../../../types/InputType.types";
import { FormInput } from "../FormInput";

import cl from "./FormInputWithValidation.module.scss";

export const FormInputWithValidation = ({ text, type, id, name, required, value, setValue }: LoginInputType) => {
  return (
    <div className={cl.inputWrapper}>
      <FormInput value={value} setValue={setValue} required={required} id={id} name={name} type={type} text={text} />
    </div>
  );
};
