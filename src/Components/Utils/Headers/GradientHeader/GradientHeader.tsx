import { HeaderType } from "../../../../types/headerType.types";

import cl from "./GradientHeader.module.scss";

export const GradientHeader = ({ text }: HeaderType) => {
  return <div className={cl.header}>{text}</div>;
};
