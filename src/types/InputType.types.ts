import { ChangeEvent } from "react";

export type LoginInputType = {
  text: string;
  type: "password" | "email" | "text";
  value: string;
  onChange: (e: ChangeEvent<any>) => void;
  id: string;
  name: string;
  required: boolean;
  onBlur: (e: React.FocusEvent<any, Element>) => void;
};
