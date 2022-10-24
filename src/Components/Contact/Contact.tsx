import familyIcon from "../../imgs/familyIcon.png";
import { ContactType } from "../../types/ContactType";

import cl from "./Contact.module.scss";

export const Contact = ({ id, fullName, phone, type }: ContactType) => {
  return (
    <div className={cl.contactWrapper}>
      <div className={cl.iconFullName}>
        <img className={cl.typeIcon} src={familyIcon} alt="" />
        <div className={cl.fullName}>{fullName}</div>
      </div>

      <div className={cl.phoneNumber}>{phone}</div>
    </div>
  );
};
