import { LinkType } from "../../../../types/LinkType.types";

import cl from "./WhiteLink.module.scss";

export const WhiteLink = ({ link, text }: LinkType) => {
  return (
    <div className={cl.whiteLink}>
      <a target="_blank" href={link} rel="noreferrer">
        {text}
      </a>
    </div>
  );
};
