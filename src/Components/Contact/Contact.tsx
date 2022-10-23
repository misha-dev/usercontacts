import { ContactType } from "../../types/ContactType";

import cl from "./Contact.module.scss";

export const Contact = ({id, fullName, phone, type} : ContactType) => {

  return <div className={cl.contactWrapper}>Contact</div>;
};
