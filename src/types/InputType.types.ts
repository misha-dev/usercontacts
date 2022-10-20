import React from "react";
import { PersonType } from "./ContactType";

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

export type InputType = InputTypeFormik & { handler: useFormType; inputRef?: React.RefObject<HTMLInputElement> };

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
  phoneInputRef: React.RefObject<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setDirty: React.Dispatch<React.SetStateAction<boolean>>;
} & HandlerState<string>;
