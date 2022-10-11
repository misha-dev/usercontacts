import { BiSearch } from "react-icons/bi";
import cl from "./SearchInput.module.scss";

export const SearchInput = () => {
  return (
    <div className={cl.mainWrapper}>
      <div className={cl.inputWrapper}>
        <input type="text" />
        <BiSearch className={cl.searchLogo}/>
        <div className={cl.placeholder}>Search</div>
      </div>
    </div>
  );
};
