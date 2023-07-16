import React from "react";

import { PersonType } from "./ContactType.types";

type baseParams = {
  id: string;
  name: string;
  required: boolean;
};

type HandlerState<T> = { value: T; setValue: React.Dispatch<React.SetStateAction<T>> };

export type InputTypeFormik = {
  text: string;
  type: "password" | "email" | "text" | "tel";
} & baseParams;

export type InputType = InputTypeFormik & { handler: useFormType };

export type SelectInputType = {
  options: Array<PersonType>;
} & baseParams &
  HandlerState<PersonType>;

export type useFormType = {
  dirty: boolean;
  valid: {
    error: string;
  };
  onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setDirty: React.Dispatch<React.SetStateAction<boolean>>;
  inputRef: React.RefObject<HTMLInputElement>;
} & HandlerState<string>;
