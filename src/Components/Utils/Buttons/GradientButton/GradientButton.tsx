import { ButtonType } from "../../../../types/ButtonType.types";

import cl from "./GradientButton.module.scss";

export const GradientButton = ({ text, fontSize, type }: ButtonType) => {
  return (
    <button type={type} style={{ fontSize: `${fontSize}rem` }} className={cl.gradientButton}>
      {text}
    </button>
  );
};
