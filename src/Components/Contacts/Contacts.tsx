import { AiOutlinePlus } from "react-icons/ai";
import { SearchInput } from "../Utils/SearchInput/SearchInput";
import cl from "./Contacts.module.scss";

export const Contacts = () => {
  return (
    <div className={cl.mainWrapper}>
      <SearchInput />
      <div className={cl.addContact}>
        <div className={cl.addContactButton}>
          <AiOutlinePlus className={cl.plus} />
        </div>
      </div>
    </div>
  );
};
