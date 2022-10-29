import { capitalize, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

import { PersonType } from "../../types/ContactType";

import cl from "./ContactsFilter.module.scss";


type props = {
  filterTypes: Array<PersonType>;
  typeSelected: PersonType | null;
  setType: React.Dispatch<React.SetStateAction<PersonType | null>>;
};

export const ContactsFilter = ({ filterTypes, typeSelected, setType }: props) => {
  return (
    <div>
      <Stack mt={"30px"} mb={"20px"} direction={"row"} alignItems="center" justifyContent="center">
        <ToggleButtonGroup
          onChange={(e, updatedFilter) => {
            setType(updatedFilter);
          }}
          color="success"
          aria-label="contactsFilters"
          value={typeSelected}
          exclusive
          size="medium"
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
