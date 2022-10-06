import { FieldInputProps } from "formik";

export type LoginInputType = {
  text: string;
  type: "password" | "email" | "text";
  id: string;
  name: string;
  required: boolean;
  fieldProps: FieldInputProps<any>;
};
