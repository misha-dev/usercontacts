import { ChangeEvent } from "react";

export type LoginButtonType = {
  text: string;
  type: "password" | "email" | "text";
  value: string;
  onChange: (e: ChangeEvent<any>) => void;
};
