import { BiDownArrow } from "react-icons/bi";

import { SelectInputType } from "../../../../types/InputType.types";

import cl from "./SelectInput.module.scss";

export const SelectInput = ({ id, name, options, required, value, setValue }: SelectInputType) => {
  return (
    <div className={cl.mainWrapper}>
      <select
        className={cl.selectInput}
        value={value}
        onChange={(e) => {
          
          setValue(e.target.value);
        }}
        required={required}
        name={name}
        id={id}
      >
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      <BiDownArrow className={cl.arrow} />
    </div>
  );
};
