import { capitalize } from "@mui/material";
import { BiDownArrow } from "react-icons/bi";


import { PersonType, SelectInputType } from "types";

import cl from "./SelectInput.module.scss";

export const SelectInput = ({ id, name, options, required, value, setValue }: SelectInputType) => {
  return (
    <div className={cl.mainWrapper}>
      <select
        className={cl.selectInput}
        value={value}
        onChange={(e) => {
          setValue(e.target.value as PersonType);
        }}
        required={required}
        name={name}
        id={id}
      >
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {capitalize(option)}
            </option>
          );
        })}
      </select>
      <BiDownArrow className={cl.arrow} />
    </div>
  );
};
