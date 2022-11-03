import CloseIcon from "@mui/icons-material/Close";
import { debounce } from "@mui/material/utils";
import React, { useCallback, useRef } from "react";
import { BiSearch } from "react-icons/bi";

import { IconButton } from "@mui/material";

import cl from "./SearchInput.module.scss";

type props = {
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchInput = ({ setSearchString }: props) => {
  const inputSearchStringRef = useRef<HTMLInputElement>(null!);
  const debouncedSetSearchString = useCallback(
    debounce((str: string) => {
      setSearchString(str);
    }, 200),
    [],
  );

  return (
    <div className={cl.mainWrapper}>
      <div className={cl.inputWrapper}>
        <input
          formNoValidate
          ref={inputSearchStringRef}
          onChange={(e) => {
            debouncedSetSearchString(e.target.value);
          }}
          required
          aria-label="search"
          type="text"
          autoComplete={"off"}
          autoCorrect={"off"}
          autoCapitalize={"off"}
        />
        <BiSearch className={cl.searchLogo} />
        <div className={cl.placeholder}>Search</div>
        <IconButton
          onClick={(e) => {
            setSearchString("");
            inputSearchStringRef.current.value = "";
            inputSearchStringRef.current.focus();
          }}
          disableRipple
          aria-label="resetInput"
          sx={{ padding: "5px" }}
          className={cl.closeButton}
        >
          <CloseIcon sx={{ fontSize: "1.3rem" }} />
        </IconButton>
      </div>
    </div>
  );
};
