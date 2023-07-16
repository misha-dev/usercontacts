

import { HeaderType } from "types";

import cl from "./GradientHeader.module.scss";

export const GradientHeader = ({ text }: HeaderType) => {
  return <div className={cl.header}>{text}</div>;
};
