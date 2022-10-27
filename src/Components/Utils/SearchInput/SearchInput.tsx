import { debounce } from "@mui/material/utils";
import React, { useCallback } from "react";
import { BiSearch } from "react-icons/bi";

import cl from "./SearchInput.module.scss";

type props = {
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchInput = ({ searchString, setSearchString }: props) => {
  const debouncedSetSearchString = useCallback(
    debounce((str: string) => {
      setSearchString(str);
    }),
    []
  );

  return (
    <div className={cl.mainWrapper}>
      <div className={cl.inputWrapper}>
        <input
          onChange={(e) => {
            debouncedSetSearchString(e.target.value);
          }}
          required
          type="text"
        />
        <BiSearch className={cl.searchLogo} />
        <div className={cl.placeholder}>Search</div>
      </div>
    </div>
  );
};
