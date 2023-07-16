import { ButtonType } from "types";

import cl from "./GradientButton.module.scss";

export const GradientButton = ({ type, text, disabled }: ButtonType) => {
  return (
    <button disabled={disabled} type={type} className={cl.gradientButton}>
      {text}
    </button>
  );
};
