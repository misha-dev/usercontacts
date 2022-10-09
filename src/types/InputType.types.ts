export type LoginInputType = {
  text: string;
  type: "password" | "email" | "text" | "tel";
  id: string;
  name: string;
  required: boolean;
};
