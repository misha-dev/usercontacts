import { ButtonType } from "../../../../types/ButtonType.types";

import cl from "./GradientButton.module.scss";

export const GradientButton = ({ text, type }: ButtonType) => {
  return (
    <button type={type} className={cl.gradientButton}>
      {text}
    </button>
  );
};
