import { Link } from "react-router-dom";



import { LinkType } from "types";

import cl from "./SimpleLink.module.scss";

export const SimpleLink = ({ text, link }: LinkType) => {
  return (
    <Link to={link} className={cl.loginLink}>
      {text}
    </Link>
  );
};
