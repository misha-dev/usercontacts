import { LinkType } from "../../../../types/LinkType.types";

import cl from "./SimpleLink.module.scss";

export const SimpleLink = ({ text, link }: LinkType) => {
  return (
    <a className={cl.loginLink} href={link}>
      {text}
    </a>
  );
};
