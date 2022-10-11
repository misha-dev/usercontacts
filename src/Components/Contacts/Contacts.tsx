import { SearchInput } from "../Utils/SearchInput/SearchInput";
import cl from "./Contacts.module.scss";

export const Contacts = () => {
  return (
    <div className={cl.mainWrapper}>
      <SearchInput />
    </div>
  );
};
