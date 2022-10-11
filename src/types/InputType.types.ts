export type LoginInputTypeFormik = {
  text: string;
  type: "password" | "email" | "text" | "tel";
  id: string;
  name: string;
  required: boolean;
};

export type LoginInputType = LoginInputTypeFormik & { value: string; setValue: React.Dispatch<React.SetStateAction<string>> };
