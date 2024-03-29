import { capitalize, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";


import { PersonType } from "types";
import { useMatchMedia } from "hooks";

import cl from "./ContactsFilter.module.scss";

type props = {
  filterTypes: Array<PersonType>;
  typeSelected: PersonType | null;
  setType: React.Dispatch<React.SetStateAction<PersonType | null>>;
};

export const ContactsFilter = ({ filterTypes, typeSelected, setType }: props) => {
  const { isMobile } = useMatchMedia();

  return (
    <div>
      <Stack className={cl.filterButtonsWrapper} direction={"row"} alignItems="center" justifyContent="center">
        <ToggleButtonGroup
          onChange={(e, updatedFilter) => {
            setType(updatedFilter);
          }}
          color="success"
          aria-label="contactsFilters"
          value={typeSelected}
          exclusive
          size={isMobile ? "small" : "medium"}
        >
          {filterTypes.map((filterType, i) => (
            <ToggleButton className={cl.filterButton} key={i} value={filterType}>
              {capitalize(filterType) + `${filterType === "family" ? "" : "s"}`}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>
    </div>
  );
};
