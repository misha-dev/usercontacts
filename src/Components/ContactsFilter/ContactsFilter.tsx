import { capitalize, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

import { ContactType } from "../../types/ContactType";

type props = {
  filterTypes: Array<string>;
  typeSelected: ContactType | null;
  setType: React.Dispatch<React.SetStateAction<ContactType | null>>;
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
            <ToggleButton key={i} value={filterType}>
              {capitalize(filterType) + `${filterType === "family" ? "" : "s"}`}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>
    </div>
  );
};
