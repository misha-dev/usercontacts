type baseParams = {
  id: string;
  name: string;
  required: boolean;
};

type stateHandler<T> = { value: T; setValue: React.Dispatch<React.SetStateAction<T>> };

export type LoginInputTypeFormik = {
  text: string;
  type: "password" | "email" | "text" | "tel";
} & baseParams;

export type LoginInputType = LoginInputTypeFormik & stateHandler<string>;

export type SelectInputType = {
  options: Array<string>;
} & baseParams &
  stateHandler<string>;
