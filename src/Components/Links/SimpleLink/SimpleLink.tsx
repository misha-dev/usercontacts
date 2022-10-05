import { LinkType } from "../../../types/LinkType.types";

import cl from "./SimpleLink.module.scss";

export const SimpleLink = ({ text, fontSize, link }: LinkType) => {
  return (
    <a className={cl.loginLink} href={link} style={{ fontSize: `${fontSize}rem` }}>
      {text}
    </a>
  );
};
